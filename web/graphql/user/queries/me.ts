import { gql } from "apollo-boost";

export const meQuery = gql`
  query Me {
    me {
      id
      email
      name
      pictureUrl
      bio
      lastMessage
      like
      deslike
      matches {
        User {
          id
          email
          name
          pictureUrl
          bio
          lastMessage
          like
          deslike
        }
        lastMessage
      }
    }
  }
`;
