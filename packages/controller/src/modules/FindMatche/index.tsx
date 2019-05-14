import * as React from "react";

import { Query } from "react-apollo";
import {
  FindMatchesQuery,
  FindMatchesQueryVariables,
  FindMatchesDocument,
  Matches
} from "../../types";

export interface WithFindMatche {
  matches: Matches | null;
  loading: boolean;
}

interface Props {
  children: (data: WithFindMatche) => JSX.Element | null;
}

export class FindMatche extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Query<FindMatchesQuery, FindMatchesQueryVariables>
        query={FindMatchesDocument}
      >
        {({ data, loading }) => {
          let matches: Matches | null = null;

          if (data && data.findMatches) {
            matches = data.findMatches;
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
