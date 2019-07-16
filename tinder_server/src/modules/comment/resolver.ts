import {
  Resolver,
  Mutation,
  Arg,
  PubSub,
  Publisher,
  Subscription,
  Root,
  ResolverFilterData,
  Args
} from "type-graphql";

import { CommentInput } from "./comment.input";
import { Comment } from "./comment.type";
import { NewCommentPayload } from "./newComment.interface";
import { PUBSUB_NEW_MESSAGE } from "../shared/constants";

import { NewCommentsArgs } from "./recipe.resolver.args";

@Resolver()
export class RecipeResolver {
  @Mutation(() => Boolean)
  async addNewComment(
    @Arg("comment") input: CommentInput,
    @PubSub(PUBSUB_NEW_MESSAGE)
    notifyAboutNewComment: Publisher<NewCommentPayload>
  ): Promise<boolean> {
    const comment: Comment = {
      content: input.content,
      nickname: input.nickname,
      date: new Date()
    };
    await notifyAboutNewComment({
      content: comment.content,
      nickname: comment.nickname,
      dateString: comment.date.toISOString(),
      recipeId: input.recipeId
    });
    return true;
  }

  @Subscription(() => Comment, {
    topics: PUBSUB_NEW_MESSAGE,
    filter: ({
      payload,
      args
    }: ResolverFilterData<NewCommentPayload, NewCommentsArgs>) => {
      return payload.recipeId === args.recipeId;
    }
  })
  newComments(
    @Root() newComment: NewCommentPayload,
    @Args() { recipeId }: NewCommentsArgs
  ): Comment {
    console.log(recipeId);
    return {
      content: newComment.content,
      date: new Date(newComment.dateString), // limitation of Redis payload serialization
      nickname: newComment.nickname
    };
  }
}
