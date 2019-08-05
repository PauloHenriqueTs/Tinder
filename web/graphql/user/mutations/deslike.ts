import gql from "graphql-tag";

export const deslikeMutation = gql`
  mutation Deslike($matcheid: String!) {
    deslike(matcheid: $matcheid)
  }
`;
