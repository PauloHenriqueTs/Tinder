import { ApolloError, ApolloServer } from "apollo-server-express";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import { GraphQLError } from "graphql";

import { RedisClient } from "redis";
import "reflect-metadata";
import { buildSchema, useContainer } from "type-graphql";
import { Container } from "typedi";
import * as typeorm from "typeorm";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import * as passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { RedisPubSub } from "graphql-redis-subscriptions";

import { createTypeormConn } from "./createTypeormConn";
import { redis } from "./redis";
import { logManager } from "./utils/logManager";
import { setupErrorHandling } from "./utils/shutdown";
import { MyContext } from "./types/Context";
import { User } from "./entity/User";
import { matchesLoader } from "./loaders/matchesLoader";
import { createServer } from "http";

require("dotenv-safe").config();

const logger = logManager();
logger.info("Loading environment...");

const SESSION_SECRET = process.env.SESSION_SECRET;
const RedisStore = connectRedis(session); // connect node.req.session to redis backing store

useContainer(Container);
typeorm.useContainer(Container);

const pubsub = new RedisPubSub(
  process.env.NODE_ENV === "production"
    ? {
        connection: process.env.REDIS_URL as any
      }
    : {}
);

const startServer = async (): Promise<void> => {
  logger.info("Connecting database...");
  const conn = await createTypeormConn();
  if (conn) {
    logger.info("database connected ");
    await conn.runMigrations();
  }
  logger.info("Creating express server...");
  const app = express();

  logger.info("Creating GQL server...");
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/modules/**/resolver.*"],
      validate: false
    }),

    context: ({ req, res }: MyContext) => ({
      req,
      res,
      matchesLoader: matchesLoader(),
      pubsub
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      const errId = v4();
      console.log("errId: ", errId);
      console.log(error);

      return new GraphQLError(`Internal Error: ${errId}`);
    }
  });

  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin:
        process.env.NODE_ENV === "production"
          ? "https://www.codeponder.com"
          : "http://localhost:3000"
    })
  );

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `qid=${qid}`;
      } catch {}
    }

    return next();
  });

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: (redis as unknown) as RedisClient
    }),
    name: "qid",
    secret: SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
  };

  app.use(session(sessionOption));

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID || "",
        clientSecret: process.env.FACEBOOK_SECRET || "",
        callbackURL: "http://localhost:4000/oauth/facebook",
        profileFields: [
          "displayName",
          "name",
          "gender",
          "picture.type(large)",
          "emails"
        ]
      },
      async (accessToken, refreshToken, userProfile, cb) => {
        const profile = userProfile;
        const { email, name, picture } = profile._json;
        if (profile._json) {
          let user = await typeorm
            .getRepository(User)
            .findOne({ where: { email } });
          if (!user) {
            await User.create({
              email,
              name,
              pictureUrl: picture.data.url
            }).save();
          }
          cb(null, {
            user,
            accessToken,
            refreshToken
          });
        }
      }
    )
  );

  app.use(passport.initialize());

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", { session: false })
  );

  app.get(
    "/oauth/facebook",
    passport.authenticate("facebook", { session: false }),
    (req, res) => {
      if (req.user.user.id && req.session) {
        req.session.userId = req.user.user.id;
        req.session.accessToken = req.user.accessToken;
        req.session.refreshToken = req.user.refreshToken;
      }
      res.redirect("http://localhost:4000/graphql/");
    }
  );

  server.applyMiddleware({ app, cors: false }); // app is from an existing express app

  const httpServer = createServer(app);

  server.installSubscriptionHandlers(httpServer);

  const nodeServer = httpServer.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
    );
  });

  setupErrorHandling({
    db: getConnection(),
    redisClient: redis,
    logger: logger,
    nodeServer: nodeServer
  });
};

startServer();
