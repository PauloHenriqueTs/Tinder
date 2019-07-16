import {
  Ctx,
  Mutation,
  Query,
  Resolver,
  Arg,
  PubSub,
  Publisher,
  ResolverFilterData,
  Root,
  Args,
  Subscription
} from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/Context";
import { Matches } from "../../entity/Matches";
import { Message } from "../../entity/Message";
import { PUBSUB_NEW_MESSAGE } from "../shared/constants";
import { MessageInput } from "./Message.input";
import { NewMessagePayload } from "./NewMessagePayload";
import { NewMessageArgs } from "./NewMessageArgs";
import { MessageType } from "./Message.type";

@Resolver(User)
export class UserResolver {
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ): Promise<{}> {
    return new Promise(res => {
      console.log(ctx.req);
      ctx.req.session
        ? ctx.req.session.destroy((err: any) => {
            console.log(err);
            res(!!err);
          })
        : res(true);
    });
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null | undefined> {
    const { userId = "" } = ctx.req.session || {};
    console.log(ctx.req.session);
    return userId ? User.findOne(userId) : null;
  }
  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("name") name: string
  ): Promise<User> {
    const user = await User.create({
      email,
      name
    }).save();

    return user;
  }
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    ctx.req.session!.userId = user.id;
    console.log(ctx.req.session);
    return user;
  }

  @Query(() => [User], { nullable: true })
  async find(): Promise<User[]> {
    return User.find({});
  }
  @Mutation(() => String, { nullable: true })
  async like(
    @Arg("first_like_userid") first_like_userid: string,
    @Arg("last_like_userid") last_like_userid: string
  ): Promise<string | null> {
    await Matches.create({
      first_like_userid,
      last_like_userid
    }).save();

    return null;
  }

  @Mutation(() => Boolean)
  async createMessage(
    @Arg("text") text: string,
    @Arg("userid") userId: string,
    @Arg("matcheid") matcheId: string,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    const dbMessage = await Message.create({
      text,
      userId,
      matcheId
    }).save();

    ctx.pubsub.publish(PUBSUB_NEW_MESSAGE, {
      newMessage: dbMessage
    });
    return true;
  }

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
    console.log(matcheId);
    return {
      text: newMessage.text,
      date: new Date(newMessage.dateString), // limitation of Redis payload serialization
      userId: newMessage.userId,
      matcheId: matcheId
    };
  }
}
