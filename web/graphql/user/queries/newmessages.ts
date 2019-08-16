import { gql } from "apollo-boost";

export const FindMessagesQuery = gql`
  query FindMessages($matcheid: String!) {
    findMessage(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
