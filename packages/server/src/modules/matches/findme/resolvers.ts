import { QueryResolvers } from "../../../types";
import { Matches } from "../../../entity/Matches";

const resolvers: QueryResolvers.Resolvers = {
  findme: async (_, __, { req }) => {
    if (!req.session!.userId) {
      return null;
    }

    const match = await Matches.findOne({
      where: { userId: req.session!.userId }
    });

    if (match) {
      return match;
    }

    return null;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
