import { Request, Response } from "express";
import * as DataLoader from "dataloader";

import { PubSub } from "graphql-subscriptions";

export interface MyContext {
  req: Request;
  res: Response;
  matchesLoader: DataLoader<string, any>;
  pubsub: PubSub;
}
