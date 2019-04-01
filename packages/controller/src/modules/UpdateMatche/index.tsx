import * as React from "react";

import { Mutation, MutationFn } from "react-apollo";
import {
  UpdateMatcheMutation,
  UpdateMatcheMutationVariables,
  UpdateMatcheDocument
} from "../../types";

export interface WithUpdateListing {
  updateListing: MutationFn<
    UpdateMatcheMutation,
    UpdateMatcheMutationVariables
  >;
}

interface Props {
  children: (data: WithUpdateListing) => JSX.Element | null;
}

export class UpdateMatche extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<UpdateMatcheMutation, UpdateMatcheMutationVariables>
        mutation={UpdateMatcheDocument}
      >
        {mutate => {
          return children({
            updateListing: mutate
          });
        }}
      </Mutation>
    );
  }
}
