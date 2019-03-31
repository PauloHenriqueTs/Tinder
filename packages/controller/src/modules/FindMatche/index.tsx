import { graphql } from "react-apollo";

import { FindMatchesDocument, FindMatchesQuery, Matches } from "../../types";

export interface WithFindMatches {
  matches: Matches[];
  loading: boolean;
}

export const withFindmatches = graphql<
  any,
  FindMatchesQuery,
  {},
  WithFindMatches
>(FindMatchesDocument, {
  props: ({ data }) => {
    let matches: Matches[] = [];

    if (data && !data.loading && data.findMatches) {
      matches = data.findMatches;
    }

    return {
      matches,
      loading: data ? data.loading : false
    };
  }
});
