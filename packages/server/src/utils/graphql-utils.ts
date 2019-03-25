import { Redis } from "ioredis";
import * as express from "express";
export interface Session extends Express.Session {
  userId?: string;
}
export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
  res: express.Response;
}
