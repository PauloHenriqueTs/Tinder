import gql from "graphql-tag";

export const NewMessagesSubscription = gql`
  subscription newMessage($matcheid: String!) {
    newMessage(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
