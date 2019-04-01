import gql from "graphql-tag";

export const createMatche = gql`
  subscription NewMessageSubscription($matcheId: String!) {
    newMessage(matcheId: $matcheId) {
      text
      user {
        id
        email
      }
      matcheId
    }
  }
`;
