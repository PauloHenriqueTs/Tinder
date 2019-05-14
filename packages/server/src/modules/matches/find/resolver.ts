import { ResolverMap } from "../../../utils/graphql-utils";
import { Matches } from "../../../entity/Matches";
import { Not, In } from "typeorm";

const resolvers: ResolverMap = {
  Matches: {
    pictureUrl: (parent, _, { url }) =>
      parent.pictureUrl && `${url}/images/${parent.pictureUrl}`,
    user: ({ userId }, _, { userLoader }) => userLoader.load(userId)
  },
  Query: {
    findMatches: async (_, __, { req }) => {
      const me = await Matches.findOne({
        where: { userId: req.session!.userId }
      });
      if (me) {
        if (me.deslikes.length > 0) {
          return Matches.findOne({
            where: {
              id: Not(In(me.deslikes)),
              userId: Not(me.userId)
            }
          });
        } else {
          return Matches.findOne();
        }
      }
      return null;
    }
  }
};

export default resolvers;
