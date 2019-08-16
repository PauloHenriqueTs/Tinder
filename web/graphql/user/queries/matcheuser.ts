import { gql } from "apollo-boost";

export const MatcheUserQuery = gql`
  query MatcheUser($matcheid: String!) {
    matcheuser(matcheid: $matcheid) {
      id
      name
      pictureUrl
    }
  }
`;
