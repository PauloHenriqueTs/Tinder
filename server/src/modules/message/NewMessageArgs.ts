import { Field, ArgsType } from "type-graphql";
@ArgsType()
export class NewMessageArgs {
  @Field(() => String)
  matcheId: string;
}
