export interface NewCommentPayload {
  recipeId: number;
  dateString: string; // limitation of Redis payload serialization
  content: string;
  nickname?: string;
}
