import * as React from "react";
import { adopt } from "react-adopt";
import { Query } from "react-apollo";
import { FindMatcherUserQuery } from "../../graphql/user/queries/findmatching";
import { MatcheView } from "../view/MatcheView";
import DeslikeButton from "../view/DeslikeButton";
import LikeButton from "../view/LikeButton";
import {
  FindmatcheruserComponent,
  FindmatcheruserProps,
  FindUserDocument,
  FindUserProps,
  FindUserComponent
} from "../../generated/apolloComponents";

interface IAppProps {
  size: string;
}

interface RenderProps {
  FindMatcherQuery: FindmatcheruserProps;
  FindMatcherSubscription: FindUserProps;
}

export class MatchesController extends React.PureComponent<IAppProps> {
  render() {
    const Composed = adopt<RenderProps, {}>({
      FindMatcherQuery: ({ render }) => (
        <FindmatcheruserComponent>{render}</FindmatcheruserComponent>
      ),
      FindMatcherSubscription: ({ render }) => (
        <FindUserComponent>{render}</FindUserComponent>
      )
    });

    return (
      <Composed>
        {({ FindMatcherSubscription, FindMatcherQuery }) => {
          console.log(FindMatcherSubscription.loading);
          return <div />;
        }}
      </Composed>
    );
    /* return (
      <FindUserComponent>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :</p>;
          if (data!.finduser)
            return (
              <LikeComponent>
                {like => {
                  return (
                    <DeslikeComponent>
                      {deslike => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              marginTop: "15px",
                              flexDirection: "column"
                            }}
                          >
                            <MatcheView
                              user={data!.finduser}
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
                        );
                      }}
                    </DeslikeComponent>
                  );
                }}
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
      </FindUserComponent>
    );*/
  }
}
