import { Field, ObjectType } from "type-graphql";
import { User } from "../entity/User";

@ObjectType()
export class matchesLoaderType {
  @Field(() => User, { nullable: true })
  User: User;

  @Field(() => String, { nullable: true })
  lastMessage: string | null;
}
