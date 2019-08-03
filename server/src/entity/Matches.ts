import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Matches extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @PrimaryColumn("uuid")
  first_like_userid: string;

  @PrimaryColumn("uuid")
  last_like_userid: string;

  @ManyToOne(() => User, user => user.first_like_user_Connection, {
    primary: true
  })
  @JoinColumn({ name: "first_like_userid" })
  first_like_user: Promise<User>;

  @ManyToOne(() => User, user => user.last_like_user_Connection, {
    primary: true
  })
  @JoinColumn({ name: "last_like_userid" })
  last_like_user: Promise<User>;
}
