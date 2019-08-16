import gql from "graphql-tag";

export const NewMessagesSubscription = gql`
  subscription NewMessages($matcheid: String!) {
    newMessages(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
