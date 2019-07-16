import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity("messages")
export class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column("text")
  text: string;

  @Field(() => String)
  @Column("uuid")
  userId: string;

  @Field(() => String)
  @Column("uuid")
  matcheId: string;

  @Field()
  @Column({ nullable: true })
  date: Date;
}
