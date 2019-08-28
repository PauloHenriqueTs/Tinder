import * as bcrypt from "bcryptjs";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from "typeorm";
import { Matches } from "./Matches";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column("text") password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  @Column("boolean", { default: false })
  forgotPasswordLocked: boolean;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  pictureUrl: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ type: "simple-array", nullable: true })
  like: string[] = [];

  @Column({ type: "simple-array", nullable: true })
  deslike: string[] = [];

  @OneToMany(() => Matches, m => m.first_like_user)
  first_like_user_Connection: Promise<Matches[]>;

  @OneToMany(() => Matches, m => m.last_like_user)
  last_like_user_Connection: Promise<Matches[]>;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
