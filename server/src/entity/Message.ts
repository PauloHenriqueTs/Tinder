import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  text: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  matcheId: string;

  @Column({ nullable: true })
  date: Date;
}
