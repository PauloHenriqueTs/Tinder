import { ID, Field, ArgsType } from "type-graphql";
@ArgsType()
export class NewMessageArgs {
  @Field(() => ID)
  matcheId: string;
}
