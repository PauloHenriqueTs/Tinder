import * as DataLoader from "dataloader";

import { Matches } from "../entity/Matches";

import { Message } from "../entity/Message";
import { matchesLoaderType } from "./matchesLoaderType";
import { User } from "../entity/User";

export const batchMatches = async (meID: string[]) => {
  const matches = await Matches.find({
    join: {
      alias: "matches",
      innerJoinAndSelect: {
        first_like_user: "matches.first_like_user",
        last_like_user: "matches.last_like_user"
      }
    }
  });

  const messages = await Message.find();

  const MatchesMap: { [key: string]: User[] } = {};
  meID.forEach(id => {
    matches.forEach(m => {
      FindMatchesofThatUser(id, MatchesMap, m);
    });
  });

  const MatchesMap1: { [key: string]: matchesLoaderType[] } = {};
  meID.forEach(async id => {
    if (MatchesMap[id]) {
      MatchesMap[id].forEach(m => {
        const lastMessage = ReturnLastMessage(m, messages, id);

        CreateMatchesWithLastMessage(id, MatchesMap1, m, lastMessage);
      });
    }
  });

  return meID.map(id => MatchesMap1[id]);
};

export const matchesLoader = () => new DataLoader(batchMatches);

function FindMatchesofThatUser(
  id: string,
  MatchesMap: { [key: string]: User[] },
  m: Matches
): boolean {
  if (!MatchesMap[id]) {
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

function ReturnLastMessage(
  m: User,
  message: Message[],
  id: string
): Message | null {
  const matchesMessage = message.filter(mes => {
    if (mes.userId === id && mes.matcheId === m.id) {
      return mes;
    }
    if (mes.matcheId === id && mes.userId === m.id) {
      return mes;
    } else {
      return false;
    }
  });

  if (matchesMessage[0]) {
    const lastMessageDate = matchesMessage
      .map(e => e.date)
      .sort()
      .reverse()
      .shift();

    const lastMessage = matchesMessage.reduce((res, mes) => {
      if (mes.date === lastMessageDate) {
        return mes;
      } else {
        return res;
      }
    });

    return lastMessage;
  } else {
    return null;
  }
}

function CreateMatchesWithLastMessage(
  id: string,
  MatchesMap: { [key: string]: matchesLoaderType[] },
  m: User,
  lastMessage: Message | null
): boolean {
  if (lastMessage) {
    if (!MatchesMap[id]) {
      MatchesMap[id] = [{ User: m, lastMessage: lastMessage!.text }];
    } else {
      MatchesMap[id].push({ User: m, lastMessage: lastMessage!.text });
    }
  } else {
    if (!MatchesMap[id]) {
      MatchesMap[id] = [{ User: m, lastMessage: null }];
    } else {
      MatchesMap[id].push({ User: m, lastMessage: null });
    }
  }
  return true;
}
