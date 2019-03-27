import { processUpload } from "../../../utils/processUpload";
import { Matches } from "../../../entity/Matches";

const resolvers: any = {
  createMatche: async (_: any, { input }: { input: any }, { session }: any) => {
    // isAuthenticated(session);
    const { picture, ...data } = input;

    const pictureUrl = await processUpload(picture);
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
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
