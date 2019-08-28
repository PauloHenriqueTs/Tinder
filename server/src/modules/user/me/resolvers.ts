import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  User: {
    matches: ({ id }, __, { matchesLoader }) => matchesLoader.load(id)
  },
  Query: {
    me: async (_, __, { session }) => {
      return User.findOne({ where: { id: session.userId } });
    }
  }
};
