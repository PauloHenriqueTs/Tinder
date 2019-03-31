import { ResolverMap } from "../../../utils/graphql-utils";
import { PUBSUB_NEW_MESSAGE } from "../../../constants";

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub }) => {
        return pubsub.asyncIterator([PUBSUB_NEW_MESSAGE]);
      }
    }
  }
};
