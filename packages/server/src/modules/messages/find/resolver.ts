import { ResolverMap } from "../../../utils/graphql-utils";
import { Message } from "../../../entity/Messages";

export const resolvers: ResolverMap = {
  Message: {
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    messages: async (_, { matcheId }, { session }) => {
      return Message.find({
        where: {
          matcheId,
          userId: session.userId
        }
      });
    }
  }
};
