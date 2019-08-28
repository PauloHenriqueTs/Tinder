import { ResolverMap } from "../../../types/graphql-utils";
import { Message } from "../../../entity/Message";
import { PUBSUB_NEW_MESSAGE } from "../shared/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    createMessage: async (_, { message }, { session, pubsub }) => {
      const userid = session.userId;
      const newMessage: Message = await Message.create({
        text: message.text,
        userId: userid,
        matcheId: message.matcheId,
        date: new Date()
      }).save();

      pubsub.publish(PUBSUB_NEW_MESSAGE, {
        newMessage
      });

      return true;
    }
  }
};
