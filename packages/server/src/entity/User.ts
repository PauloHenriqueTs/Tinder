import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne
} from "typeorm";
import { Matches } from "./Matches";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Matches, matches => matches.user)
  matches: Matches;
}
