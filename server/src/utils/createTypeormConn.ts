import { getConnectionOptions, createConnection } from "typeorm";
import { User } from "../entity/User";
import { Message } from "../entity/Message";
import { Matches } from "../entity/Matches";

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const connection =
    process.env.NODE_ENV === "production"
      ? await createConnection({
          ...connectionOptions,
          url: process.env.DATABASE_URL,
          entities: [User, Matches, Message],
          name: "default"
        } as any)
      : await createConnection({ ...connectionOptions, name: "default" });

  return connection.synchronize();
};
