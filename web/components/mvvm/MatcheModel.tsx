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
import MatcheViewModel from "./MatcheViewModel";

export interface MatcheModelProps {
  PickUserMutation: PickuserProps;
  FindMatcherSubscription: FindUserProps;
  LikeMutation: LikeProps;
  DeslikeMutation: DeslikeProps;
  showPerfil: boolean;
}

export interface MatcheModelState {}

export class MatcheModel extends React.Component<any, MatcheModelState> {
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
        <DeslikeComponent>
          {(deslike, result) => (render ? render({ deslike, result }) : null)}
        </DeslikeComponent>
      )
    });
    return (
      <Composed>{composed => <MatcheViewModel composed={composed} />}</Composed>
    );
  }
}
