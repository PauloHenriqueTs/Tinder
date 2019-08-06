import gql from "graphql-tag";

export const finduserSubscription = gql`
  subscription FindUser {
    finduser {
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
        }
        lastMessage
      }
    }
  }
`;
