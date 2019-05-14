import * as React from "react";

import { Mutation } from "react-apollo";
import {
  LikeMutationFn,
  LikeDocument,
  LikeMutation,
  LikeMutationVariables
} from "../../types";

export interface Withlike {
  Like: LikeMutationFn;
}

interface Props {
  children: (data: Withlike) => JSX.Element | null;
}

export class LikeController extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<LikeMutation, LikeMutationVariables> mutation={LikeDocument}>
        {mutate => {
          return children({
            Like: mutate
          });
        }}
      </Mutation>
    );
  }
}
