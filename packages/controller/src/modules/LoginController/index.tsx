import * as React from "react";
import {
  graphql,
  ChildMutateProps,
  withApollo,
  WithApolloClient
} from "react-apollo";

import {
  LoginMutationDocument,
  LoginMutationMutationVariables,
  LoginMutationMutation
} from "../../types";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  onSessionId?: (sessionId: string) => void;
  children: (data: {
    submit: (
      values: LoginMutationMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    WithApolloClient<Props>,
    LoginMutationMutation,
    LoginMutationMutationVariables
  >
> {
  submit = async (values: LoginMutationMutationVariables) => {
    console.log(values);

    const response = await this.props.mutate({
      variables: values
    });

    if (response && response.data && response.data.login) {
      if (response.data.login.errors) {
        return normalizeErrors(response.data.login.errors);
      }
      if (response.data.login.user && response.data.login.user.id) {
        if (this.props.onSessionId) {
          this.props.onSessionId(response.data.login.user.id);
        }
      }
    }

    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

export const LoginController = graphql<
  Props,
  LoginMutationMutation,
  LoginMutationMutationVariables
>(LoginMutationDocument)(withApollo<Props>(C as any));
