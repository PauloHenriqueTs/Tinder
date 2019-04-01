import * as React from "react";
import { Mutation, MutationFn } from "react-apollo";

import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  CreateMessageDocument
} from "../../types";

export interface WithCreateMessage {
  createMessage: MutationFn<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >;
}

interface Props {
  children: (data: WithCreateMessage) => JSX.Element | null;
}
export class CreateMessage extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<CreateMessageMutation, CreateMessageMutationVariables>
        mutation={CreateMessageDocument}
      >
        {mutate => {
          return children({
            createMessage: mutate
          });
        }}
      </Mutation>
    );
  }
}
