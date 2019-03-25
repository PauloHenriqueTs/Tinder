import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import {
  RegisterMutationMutation,
  RegisterMutationMutationVariables
} from "../../types";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { NormalizedErrorMap } from "../../types/NormalizedErrorMap";

interface Props {
  children: (data: {
    submit: (
      values: RegisterMutationMutationVariables
    ) => Promise<NormalizedErrorMap | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<
    Props,
    RegisterMutationMutation,
    RegisterMutationMutationVariables
  >
> {
  submit = async (values: RegisterMutationMutationVariables) => {
    const response = await this.props.mutate({
      variables: values
    });
    if (
      response &&
      response.data &&
      response.data.register &&
      response.data.register.errors
    ) {
      return normalizeErrors(response.data.register.errors);
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const registerMutation = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      errors {
        path
        message
      }
    }
  }
`;

export const RegisterController = graphql<
  Props,
  RegisterMutationMutation,
  RegisterMutationMutationVariables
>(registerMutation)(C);
