import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    matcheuser: (_, { matcheid }) => User.findOne({ where: { id: matcheid } })
  }
};
