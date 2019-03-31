import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from "apollo-server";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";

import { createTypeormConn } from "./createTypeormConn";
import { createSchema } from "./createSchema";
import { redis } from "./redis";
import { redisSessionPrefix } from "./constants";
import { userLoader } from "./loaders/UserLoader";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
// @todo move to .env
const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session);

const corsOptions = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "production"
      ? "https://www.codeponder.com"
      : "http://localhost:3000"
};

const pubsub = new PubSub();

const startServer = async () => {
  const configurations: any = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 443, hostname: "example.com" },
    development: { ssl: false, port: 4000, hostname: "localhost" }
  };
  const environment = process.env.NODE_ENV || "production";
  const config = configurations[environment];

  await createTypeormConn();

  const app = express();

  app.set("trust proxy", 1);

  app.use(cors(corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 days
      }
    })
  );
  app.use("/images", express.static("images"));

  const apollo = new ApolloServer({
    schema: createSchema(),
    context: ({ req, res }: any) => ({
      redis,
      url: req ? req.protocol + "://" + req.get("host") : "",
      session: req ? req.session : undefined,
      req,
      res,
      userLoader: userLoader(),
      pubsub
    })
  });

  apollo.applyMiddleware({
    app,
    cors: false
  });

  let server: any;
  if (config.ssl) {
    // Assumes certificates are in .ssl folder from package root. Make sure the files
    // are secured.
    server = https.createServer(
      {
        key: fs.readFileSync(`./ssl/${environment}/server.key`),
        cert: fs.readFileSync(`./ssl/${environment}/server.crt`)
      },
      app
    );
  } else {
    server = http.createServer(app);
  }
  apollo.installSubscriptionHandlers(server);

  server.listen({ port: config.port }, () =>
    console.log(
      "🚀 Server ready at",
      `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
        apollo.graphqlPath
      }`
    )
  );
};

startServer();
