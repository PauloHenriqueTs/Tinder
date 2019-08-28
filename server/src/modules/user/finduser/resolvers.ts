import { ResolverMap } from "../../../types/graphql-utils";
import { PUBSUB_USER } from "../shared/constants";

export const resolvers: ResolverMap = {
  Subscription: {
    finduser: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(PUBSUB_USER)
    }
  }
};
