import { gql } from "apollo-boost";

export const FindMessagesQuery = gql`
  mutation AddNewMessage($matcheid: String!, $text: String) {
    addNewMessage(message: { matcheId: $matcheid, text: $text })
  }
`;
