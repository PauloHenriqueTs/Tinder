import { ResolverMap } from "../../../utils/graphql-utils";
import { Matches } from "../../../entity/Matches";

export const resolvers: ResolverMap = {
  Query: {
    viewMatche: async (_, { id }) => {
      return Matches.findOne({ where: { id } });
    }
  }
};
