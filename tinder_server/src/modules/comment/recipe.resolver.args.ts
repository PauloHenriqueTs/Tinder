import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class NewCommentsArgs {
  @Field(() => Number)
  recipeId: number;
}
