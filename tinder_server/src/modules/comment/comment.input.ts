import { Field, InputType } from "type-graphql";

import { Comment } from "./comment.type";

@InputType()
export class CommentInput implements Partial<Comment> {
  @Field(() => Number)
  recipeId: number;

  @Field({ nullable: true })
  nickname?: string;

  @Field()
  content: string;
}
