import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const FindmeMatche = gql`
  query FindMe {
    findme {
      id
      itsMatch
    }
  }
`;
export class FindMeConnector extends React.PureComponent {
  render() {
    return (
      <div>
        <Query query={FindmeMatche}>
          {({ data: { findme }, loading }) => {
            if (loading) {
              return <div>fgf</div>;
            }
            if (findme && findme.id) {
              return <div>{findme.itsMatch}</div>;
            } else {
              return <div>3</div>;
            }
          }}
        </Query>
      </div>
    );
  }
}
