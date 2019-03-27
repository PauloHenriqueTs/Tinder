import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Matches extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text") pictureUrl: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("double precision") latitude: number;

  @Column("double precision") longitude: number;

  @Column("uuid") userId: string;

  @OneToOne(() => User, user => user.matches)
  user: User;
}
