import { processUpload } from "../../../utils/processUpload";
import { Matches } from "../../../entity/Matches";
import { MutationResolvers } from "../../../types";

const resolvers: MutationResolvers.Resolvers = {
  createMatche: async (_, { input }, { session }) => {
    const { picture, ...data } = input;

    const isMatche = await Matches.findOne({
      where: { userId: session.userId }
    });
    const pictureUrl = picture ? await processUpload(picture) : "";
    if (isMatche === undefined) {
      const matche = await Matches.create({
        ...data,
        pictureUrl,
        userId: session.userId
      }).save();
      if (matche) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
