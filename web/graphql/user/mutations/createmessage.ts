import { gql } from "apollo-boost";

export const createMessageMutation = gql`
  mutation createMessage($message: MessageInput!) {
    createMessage(message: $message)
  }
`;
