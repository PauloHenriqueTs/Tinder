import { gql } from "apollo-boost";

export const FindMatcherUserQuery = gql`
  query Findmatcheruser {
    findmatcheruser {
      id
      name
      pictureUrl
      bio
    }
  }
`;
