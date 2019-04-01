import { ResolverMap } from "../../../utils/graphql-utils";
import { Message } from "../../../entity/Messages";
import { PUBSUB_NEW_MESSAGE } from "../../../constants";

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: async (_, { message }, { session, pubsub }) => {
      const dbMessage = await Message.create({
        ...message,
        userId: session.userId
      }).save();

      pubsub.publish(PUBSUB_NEW_MESSAGE, {
        newMessage: dbMessage
      });

      return true;
    }
  }
};
