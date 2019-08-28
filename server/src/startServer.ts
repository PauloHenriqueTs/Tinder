import "reflect-metadata";
require("dotenv-safe").config();
import * as express from "express";
import * as session from "express-session";
import * as passport from "passport";
import * as typeorm from "typeorm";
import { Container } from "typedi";
import * as cors from "cors";
import { redis } from "./redis";
import { createTypeormConn } from "./utils/createTypeormConn";
import { confirmEmail } from "./routes/confirmEmail";
import { createTestConn } from "./testUtils/createTestConn";
import {
  server,
  sessionOption,
  port,
  corsconfig
} from "./utils/shared/constants";
import {
  FacebookStrategy,
  FacebookAuth,
  FacebookRedirectAuth
} from "./utils/passport/facebookPassport";
import { createServer } from "http";

export const startServer = async (): Promise<void> => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
  }

  typeorm.useContainer(Container);

  const app = express();

  app.set("trust proxy", 1);

  app.use(cors(corsconfig));

  app.use((req, _, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
      try {
        const qid = authorization.split(" ")[1];
        req.headers.cookie = `qid=${qid}`;
      } catch {
        console.log("error");
      }
    }

    return next();
  });

  app.use(session(sessionOption));

  passport.use(FacebookStrategy);

  app.use(passport.initialize());

  app.get("/auth/facebook", FacebookAuth);

  app.get("/oauth/facebook", FacebookAuth, FacebookRedirectAuth);

  app.use("/images", express.static("images"));

  app.get("/confirm/:id", confirmEmail);

  if (process.env.NODE_ENV === "test") {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }

  server.applyMiddleware({ app, cors: corsconfig }); // app is from an existing express app

  const httpServer = createServer(app);

  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:4000${server.subscriptionsPath}`
    );
  });
};
