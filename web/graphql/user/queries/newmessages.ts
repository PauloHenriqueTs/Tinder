import { gql } from "apollo-boost";

export const MessagesQuery = gql`
  query messages($matcheid: String!) {
    messages(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
