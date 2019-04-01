import gql from "graphql-tag";

export const updateMatche = gql`
  mutation UpdateMatche($matcheId: String!, $input: UpdateMatcheInput!) {
    updateMatche(MatcheId: $matcheId, input: $input)
  }
`;
