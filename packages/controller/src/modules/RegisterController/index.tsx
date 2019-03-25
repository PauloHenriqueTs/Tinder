import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { RegisterResponse, Mutation, MutationRegisterArgs } from "../../types";

interface Props {
  children: (data: {
    submit: (values: MutationRegisterArgs) => Promise<RegisterResponse | null>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, Mutation, MutationRegisterArgs>
> {
  submit = async (values: MutationRegisterArgs) => {
    console.log(values);
    const response = await this.props.mutate({
      variables: values
    });
    console.log("response: ", response);
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
  Mutation,
  MutationRegisterArgs
>(registerMutation)(C);
