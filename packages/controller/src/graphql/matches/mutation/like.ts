import gql from "graphql-tag";

export const updateMatche = gql`
  mutation Like($matcheId: String!) {
    like(matcheId: $matcheId)
  }
`;
