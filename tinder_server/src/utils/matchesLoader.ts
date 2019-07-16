import * as DataLoader from "dataloader";

import { Matches } from "../entity/Matches";

import { User } from "../entity/User";
import { Message } from "../entity/Message";

const batchMatches = async (meID: string[]) => {
  const matches = await Matches.find({
    join: {
      alias: "matches",
      innerJoinAndSelect: {
        first_like_user: "matches.first_like_user",
        last_like_user: "matches.last_like_user"
      }
    }
  });

  const MatchesMap: { [key: string]: User[] } = {};
  meID.forEach(id => {
    matches.forEach(m => {
      Find_ID_are(id, MatchesMap, m);
    });
  });
  meID.map(id =>
    MatchesMap[id].map(async m => {
      const view = await Message.find({
        where: { userId: id, matcheId: m.id }
      });
      console.log(view);
    })
  );
  return meID.map(id => MatchesMap[id]);
};

export const matchesLoader = () => new DataLoader(batchMatches);

function Find_ID_are(
  id: string,
  MatchesMap: { [key: string]: User[] },
  m: any
): any {
  if (MatchesMap[id] === undefined) {
    if (m.first_like_userid === id) {
      MatchesMap[id] = [(m as any).__last_like_user__];
    }
    if (m.last_like_userid === id) {
      MatchesMap[id] = [(m as any).__first_like_user__];
    }
  } else {
    if (m.first_like_userid === id) {
      MatchesMap[id].push((m as any).__last_like_user__);
    }
    if (m.last_like_userid === id) {
      MatchesMap[id].push((m as any).__first_like_user__);
    }
  }
  return true;
}
