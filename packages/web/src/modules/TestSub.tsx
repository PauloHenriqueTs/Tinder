import * as React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const SUB = gql`
  subscription {
    newMessage(matcheId: "bce7b204-7584-4a6f-b72e-07f4068b0688") {
      matcheId
      text
      user {
        id
        email
      }
    }
  }
`;

export class TestSub extends React.PureComponent {
  render() {
    return (
      <Subscription subscription={SUB}>
        {data => {
          console.log(data);
          return null;
        }}
      </Subscription>
    );
  }
}
