import gql from "graphql-tag";

export const createMessage = gql`
  mutation CreateMessage($message: MessageInput!) {
    createMessage(message: $message)
  }
`;
