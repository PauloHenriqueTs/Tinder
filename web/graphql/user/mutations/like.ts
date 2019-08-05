import gql from "graphql-tag";

export const likeMutation = gql`
  mutation Like($matcheid: String!) {
    like(matcheid: $matcheid)
  }
`;
