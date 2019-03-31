import { Query } from "react-apollo";

import {
  Matches,
  ViewMatcheDocument,
  ViewMatcheQuery,
  ViewMatcheQueryVariables
} from "../../types";
import * as React from "react";

export interface WithViewMatche {
  matches: Matches | null;
  loading: boolean;
}
interface Props {
  matcheId: string;
  children: (data: WithViewMatche) => JSX.Element | null;
}
export class ViewMatche extends React.PureComponent<Props> {
  render() {
    const { children, matcheId } = this.props;
    return (
      <Query<ViewMatcheQuery, ViewMatcheQueryVariables>
        query={ViewMatcheDocument}
        variables={{ id: matcheId }}
      >
        {({ data, loading }) => {
          let matches: Matches | null = null;

          if (data && data.viewMatche) {
            matches = data.viewMatche;
          }

          return children({
            matches,
            loading
          });
        }}
      </Query>
    );
  }
}
