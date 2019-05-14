import * as React from "react";

import { Mutation } from "react-apollo";
import {
  DesLikeMutation,
  DesLikeMutationVariables,
  DesLikeMutationFn,
  DesLikeDocument
} from "../../types";

export interface WithDeslike {
  desLike: DesLikeMutationFn;
}

interface Props {
  children: (data: WithDeslike) => JSX.Element | null;
}

export class DeslikeController extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<DesLikeMutation, DesLikeMutationVariables>
        mutation={DesLikeDocument}
      >
        {mutate => {
          return children({
            desLike: mutate
          });
        }}
      </Mutation>
    );
  }
}
