import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MessageType {
  @Field(() => String, { nullable: true })
  text: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  matcheId: string;

  @Field()
  date: Date;
}
