import { Matches } from "../../../entity/Matches";
import { Message } from "../../../entity/Messages";

import { In } from "typeorm";

const resolvers: any = {
  findtalk: async (_: any, __: any, { session }: any) => {
    const match = await Matches.findOne({
      where: { userId: session!.userId }
    });

    if (match && match.itsMatch) {
      const matches = await Matches.find({ id: In(match.itsMatch) });

      const promises = matches.map(async m => {
        const test = await Message.findOne({
          where: { matcheId: m.id, userId: match.userId }
        });
        const test1 = await Message.findOne({
          where: { matcheId: match.id, userId: m.userId }
        });
        if (test || test1) {
          return m;
        }
        return null;
      });
      const value = await Promise.all(promises);
      const value2 = matches.filter(m => !value.includes(m));
      value.map(m => (m ? console.log(m!.name) : null));
      console.log("notTalk\r");
      value2.map(m => (m ? console.log(m!.name) : null));
    }

    return false;
  }
};

export default {
  Query: {
    ...resolvers
  }
};
