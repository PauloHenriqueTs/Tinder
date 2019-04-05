import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
const findme = gql`
  query FindMe {
    findme {
      id
    }
  }
`;
export class FindMe extends React.PureComponent {
  render() {
    return (
      <Query query={findme}>
        {({ data: { findme }, loading }) => {
          console.log(findme);
          if (loading) {
            return <div>loading...</div>;
          }
          if (findme && findme.id) {
            return (
              <Redirect
                to={{
                  pathname: "/matches"
                }}
              />
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/create"
                }}
              />
            );
          }
        }}
      </Query>
    );
  }
}
