import * as React from "react";
import { adopt } from "react-adopt";
import {
  PickuserProps,
  PickuserComponent,
  FindUserProps,
  FindUserComponent,
  LikeComponent,
  DeslikeComponent,
  LikeProps,
  DeslikeProps
} from "../../generated/apolloComponents";

export interface MatcheModelProps {
  PickUserMutation: PickuserProps;
  FindMatcherSubscription: FindUserProps;
  LikeMutation: LikeProps;
  DeslikeMutation: DeslikeProps;
}

export interface MatcheModelState {}

export class Test2 extends React.Component<any, MatcheModelState> {
  public render() {
    const Composed = adopt<MatcheModelProps, {}>({
      PickUserMutation: ({ render }) => (
        <PickuserComponent>
          {(pickuser, result) => (render ? render({ pickuser, result }) : null)}
        </PickuserComponent>
      ),
      FindMatcherSubscription: ({ render }) => (
        <FindUserComponent>{render}</FindUserComponent>
      ),
      LikeMutation: ({ render }) => (
        <LikeComponent>
          {(like, result) => (render ? render({ like, result }) : null)}
        </LikeComponent>
      ),

      DeslikeMutation: ({ render }) => (
        <DeslikeComponent>{render}</DeslikeComponent>
      )
    });
    let unsubscribe = null;
    return (
      <Composed>
        {({
          FindMatcherSubscription: { data },
          PickUserMutation: { pickuser },
          LikeMutation: { like }
        }) => {
          if (data) {
            return (
              <div>
                <div>{!data.finduser ? "waiting" : data.finduser.id}</div>
                <button
                  onClick={async () =>
                    await like({ variables: { matcheid: data.finduser.id } })
                  }
                >
                  gfgf
                </button>
              </div>
            );
          } else {
            pickuser();
            return <div>erererew</div>;
          }
        }}
      </Composed>
    );
  }
}
