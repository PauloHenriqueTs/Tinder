import gql from "graphql-tag";

export const loginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      errors {
        message
        path
      }
      user {
        id
        email
      }
    }
  }
`;
