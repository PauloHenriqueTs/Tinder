import { Field, InputType } from "type-graphql";

import { Message } from "../../entity/Message";

@InputType()
export class MessageInput implements Partial<Message> {
  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  matcheId: string;
}
