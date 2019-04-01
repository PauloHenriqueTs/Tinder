import { ResolverMap } from "../../../utils/graphql-utils";
import { PUBSUB_NEW_MESSAGE } from "../../../constants";
import { withFilter } from "apollo-server";

export const resolvers: ResolverMap = {
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator([PUBSUB_NEW_MESSAGE]),
        (payload, variables) => {
          return payload.newMessage.matcheId === variables.matcheId;
        }
      )
    }
  }
};
