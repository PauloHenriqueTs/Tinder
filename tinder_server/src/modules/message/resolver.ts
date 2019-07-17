import {
  Mutation,
  Resolver,
  Arg,
  PubSub,
  Publisher,
  ResolverFilterData,
  Root,
  Args,
  Subscription,
  Query,
  Ctx
} from "type-graphql";

import { Message } from "../../entity/Message";
import { PUBSUB_NEW_MESSAGE } from "../shared/constants";
import { MessageInput } from "./Messageinput";
import { NewMessagePayload } from "./NewMessagePayload";
import { NewMessageArgs } from "./NewMessageArgs";
import { MessageType } from "./Messagetype";
import { In } from "typeorm";
import { MyContext } from "../../types/Context";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Boolean)
  async addNewMessage(
    @Arg("message") input: MessageInput,
    @PubSub(PUBSUB_NEW_MESSAGE)
    notifyAboutNewMessage: Publisher<NewMessagePayload>
  ): Promise<boolean> {
    const message: Message = await Message.create({
      text: input.text,
      userId: input.userId,
      matcheId: input.matcheId,
      date: new Date()
    }).save();
    await notifyAboutNewMessage({
      text: message.text,
      userId: message.userId,
      dateString: message.date.toISOString(),
      matcheId: input.matcheId
    });
    return true;
  }

  @Query(() => [MessageType])
  async findMessage(
    @Args() { matcheId }: NewMessageArgs,
    @Ctx() ctx: MyContext
  ): Promise<MessageType[]> {
    const userId = ctx.req.session!.userId;
    return await Message.find({
      where: {
        userId: In([userId, matcheId]),
        matcheId: In([userId, matcheId])
      }
    });
  }

  @Subscription(() => MessageType, {
    topics: PUBSUB_NEW_MESSAGE,
    filter: ({
      payload,
      args
    }: ResolverFilterData<NewMessagePayload, NewMessageArgs>) => {
      return (
        payload.matcheId === args.matcheId || payload.userId === args.matcheId
      );
    }
  })
  newMessages(
    @Root() newMessage: NewMessagePayload,
    @Args() { matcheId }: NewMessageArgs
  ): MessageType {
    return {
      text: newMessage.text,
      date: new Date(newMessage.dateString), // limitation of Redis payload serialization
      userId: newMessage.userId,
      matcheId: matcheId
    };
  }
}
