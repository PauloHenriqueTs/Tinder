import gql from "graphql-tag";

export const createMatche = gql`
  query ViewMatche($id: String!) {
    viewMatche(id: $id) {
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
