import * as React from "react";
import { ViewMatche } from "@tinder/controller";
import { RouteComponentProps, Link } from "react-router-dom";

export class ViewMatchesConnector extends React.PureComponent<
  RouteComponentProps<{
    matcheId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { matcheId }
      }
    } = this.props;
    return (
      <ViewMatche matcheId={matcheId}>
        {data => {
          console.log(data);
          if (!data.matches) {
            return <div>...loading</div>;
          }

          return (
            <div>
              <div>{data.matches.name}</div>
              <div>
                <Link to={`/matches/${matcheId}/chat`}>chat</Link>
              </div>
              <div>
                <Link to={`/matches/${matcheId}/edit`}>edit</Link>
              </div>
            </div>
          );
        }}
      </ViewMatche>
    );
  }
}
