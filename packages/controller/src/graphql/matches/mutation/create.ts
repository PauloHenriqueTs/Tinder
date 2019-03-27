import gql from "graphql-tag";

export const createMatche = gql`
  mutation CreateMatche(
    $picture: Upload
    $name: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createMatche(
      input: {
        picture: $picture
        name: $name
        description: $description
        latitude: $latitude
        longitude: $longitude
      }
    )
  }
`;
