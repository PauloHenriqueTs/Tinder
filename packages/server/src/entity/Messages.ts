import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";
import { Matches } from "./Matches";

@Entity("messages")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("text") text: string;

  @Column("uuid") userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column("uuid") matcheId: string;

  @ManyToOne(() => Matches)
  Matches: Matches;
}
