import { RedisPubSub } from "graphql-redis-subscriptions";
import * as session from "express-session";
import { redis } from "../../redis";
import { Request, Response } from "express";
import { genSchema } from "../genSchema";
import { matchesLoader } from "../../loaders/matchesLoader";
import { ApolloError, ApolloServer } from "apollo-server-express";
import { RedisClient } from "redis";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";

const RedisStore = require("connect-redis")(session);

const schema = genSchema() as any;

export const corsconfig = {
  credentials: true,
  origin:
    process.env.NODE_ENV === "test"
      ? "*"
      : (process.env.FRONTEND_HOST as string)
};

export const port = process.env.PORT || 4000;

export const pubsub = new RedisPubSub(
  process.env.NODE_ENV === "production"
    ? {
        connection: process.env.REDIS_URL as any
      }
    : {}
);

export const sessionOption: session.SessionOptions = {
  store: new RedisStore({
    client: (redis as any) as RedisClient
  }),
  name: "qid",
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
  }
};

export const server = new ApolloServer({
  schema,
  context: ({ req, res }: Express) => ({
    req,
    res,
    session: req ? req.session : undefined,
    url: req ? req.protocol + "://" + req.get("host") : "",
    matchesLoader: matchesLoader(),
    pubsub,
    redis
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

export interface Express {
  req: Request;
  res: Response;
}
