import { Matches } from "../../../entity/Matches";
import { ResolverMap } from "../../../utils/graphql-utils";

export const resolvers: ResolverMap = {
  Mutation: {
    like: async (_, { matcheId }, { session }) => {
      const matche = await Matches.findOne({
        where: { id: matcheId }
      });
      const matcheuser = await Matches.findOne({
        where: { userId: session.userId }
      });

      if (matcheuser) {
        if (!matcheuser.likes.includes(matcheId)) {
          matcheuser.likes.push(matcheId);
        }
        await Matches.update({ userId: session.userId }, { ...matcheuser });
        if (matche) {
          if (session.userId !== undefined) {
            if (
              matcheuser.likes.includes(matcheId) &&
              matche.likes.includes(matcheuser.id)
            ) {
              if (
                !matcheuser.itsMatch.includes(matcheId) &&
                !matche.itsMatch.includes(matcheuser.id)
              ) {
                matcheuser.itsMatch.push(matcheId);

                matche.itsMatch.push(matcheuser.id);

                await Matches.update({ userId: matche.userId }, { ...matche });

                await Matches.update(
                  { userId: session.userId },
                  { ...matcheuser }
                );
              }
              return true;
            }
          }
        }
      }

      return false;
    }
  }
};
