import gql from "graphql-tag";

export const createMatche = gql`
  query FindMatches {
    findMatches {
      id
      name
      pictureUrl
      description
      latitude
      longitude
      user {
        id
        email
      }
    }
  }
`;
