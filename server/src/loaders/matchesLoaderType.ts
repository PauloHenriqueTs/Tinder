import { User } from "../entity/User";

export interface matchesLoaderType {
  User: User | null;

  lastMessage: string | null;
}
