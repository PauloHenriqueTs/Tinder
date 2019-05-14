import gql from "graphql-tag";

export const updateMatche = gql`
  mutation DesLike($matcheId: String!) {
    deslike(matcheId: $matcheId)
  }
`;
