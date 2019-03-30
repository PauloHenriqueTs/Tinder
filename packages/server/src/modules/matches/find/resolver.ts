import { ResolverMap } from "../../../utils/graphql-utils";
import { Matches } from "../../../entity/Matches";

const resolvers: ResolverMap = {
  Matches: {
    pictureUrl: (parent, _, { url }) =>
      parent.pictureUrl && `${url}/images/${parent.pictureUrl}`,
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    findMatches: async () => {
      return Matches.find();
    }
  }
};

export default resolvers;
