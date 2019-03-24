import { createConnection } from "typeorm";

const dev = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "paulo",
  password: "",
  database: "tinder",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.*"],
  migrations: ["src/migration/**/*.*"],
  subscribers: ["src/subscriber/**/*.*"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};

export const createTypeormConn = async () => {
  let retries = 5;
  while (retries) {
    try {
      return createConnection(dev as any);
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return null;
};
