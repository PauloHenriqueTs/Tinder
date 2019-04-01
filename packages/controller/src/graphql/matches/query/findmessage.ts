import gql from "graphql-tag";

export const viewMessages = gql`
  query ViewMessages($matcheId: String!) {
    messages(matcheId: $matcheId) {
      text
      user {
        id
        email
      }
      matcheId
    }
  }
`;
