import { Redis } from "ioredis";
import * as express from "express";

export interface MyContext {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
  res: express.Response;
}
export interface Session extends Express.Session {
  userId?: string;
}
