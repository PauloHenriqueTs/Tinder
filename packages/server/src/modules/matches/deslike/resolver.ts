import { Matches } from "../../../entity/Matches";
import { ResolverMap } from "../../../utils/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    deslike: async (_, { matcheId }, { session }) => {
      const matche = await Matches.findOne({
        where: { id: matcheId }
      });
      const matcheuser = await Matches.findOne({
        where: { userId: session.userId }
      });
      if (matche && matcheuser) {
        if (session.userId !== undefined) {
          if (!matche.deslikes.includes(session.userId)) {
            matche.deslikes.push(session.userId);
          }
        }
        if (!matcheuser.deslikes.includes(matcheId)) {
          matcheuser.deslikes.push(matcheId);
        }

        await Matches.update(
          {
            id: matcheId
          },
          {
            ...matche
          }
        );
        await Matches.update(
          {
            userId: session.userId
          },
          {
            ...matcheuser
          }
        );

        return true;
      }

      return false;
    }
  }
};
