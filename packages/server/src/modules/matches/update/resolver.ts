import { ResolverMap } from "../../../utils/graphql-utils";
import { Matches } from "../../../entity/Matches";

import { processUpload } from "../../../utils/processUpload";

export const resolvers: ResolverMap = {
  Mutation: {
    updateMatche: async (_, { MatcheId, input: { picture, ...data } }) => {
      // isAuthenticated(session);
      // 1. user uploads a new picture
      if (picture) {
        data.pictureUrl = await processUpload(picture);
      }

      // 2. user remove picture
      // 3. do nothing

      await Matches.update(
        {
          id: MatcheId
        },
        {
          ...data
        }
      );

      return true;
    }
  }
};
