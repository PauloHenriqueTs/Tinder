import { ResolverMap } from "../../../types/graphql-utils";
import { Message } from "../../../entity/Message";
import { In } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    messages: async (_, { matcheId }, { session }) => {
      const { userId } = session;
      return Message.find({
        where: {
          userId: In([userId, matcheId]),
          matcheId: In([userId, matcheId])
        }
      });
    }
  }
};
