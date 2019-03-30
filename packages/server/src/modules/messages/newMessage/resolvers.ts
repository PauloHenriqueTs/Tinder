import { withFilter } from "graphql-yoga";

import { ResolverMap } from "../../../utils/graphql-utils";

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("PUBSUB_NEW_MESSAGE "),
        (payload, variables) => {
          return payload.newMessage.matchesId === variables.matchesId;
        }
      )
    }
  }
};
