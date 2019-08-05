import * as React from "react";
import { Query } from "react-apollo";
import { FindMatcherUserQuery } from "../../graphql/user/queries/findmatching";
import { MatcheView } from "../view/MatcheView";
import DeslikeButton from "../view/DeslikeButton";
import LikeButton from "../view/LikeButton";
import { LikeComponent } from "../../generated/apolloComponents";

interface IAppProps {
  size: string;
}

export class MatchesController extends React.PureComponent<IAppProps> {
  render() {
    return (
      <Query query={FindMatcherUserQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          if (data.findmatcheruser)
            return (
              <LikeComponent>
                {like => (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "15px",
                      flexDirection: "column"
                    }}
                  >
                    <MatcheView
                      user={data.findmatcheruser}
                      size={this.props.size}
                      likeFunction={like}
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginTop: "15px"
                      }}
                    >
                      <DeslikeButton />
                      <LikeButton />
                    </div>
                  </div>
                )}
              </LikeComponent>
            );
          else
            return (
              <div
                style={{
                  display: "flex",
                  marginTop: "15px",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <p>Sorry don't find anyone near ...</p>
              </div>
            );
        }}
      </Query>
    );
  }
}
