type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Error = {
  path: Scalars["String"];
  message: Scalars["String"];
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResponse = {
  errors?: Maybe<Array<Error>>;
  user?: Maybe<User>;
};

export type Mutation = {
  login: LoginResponse;
  logout: Scalars["Boolean"];
  register: RegisterResponse;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  me?: Maybe<User>;
};

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterResponse = {
  errors?: Maybe<Array<Error>>;
};

export type User = {
  id: Scalars["ID"];
  email: Scalars["String"];
};
export type RegisterMutationMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegisterMutationMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "RegisterResponse" } & {
    errors: Maybe<
      Array<{ __typename?: "Error" } & Pick<Error, "path" | "message">>
    >;
  };
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

export const RegisterMutationDocument = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
      errors {
        path
        message
      }
    }
  }
`;

export class RegisterMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RegisterMutationMutation,
      RegisterMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RegisterMutationMutation,
        RegisterMutationMutationVariables
      >
        mutation={RegisterMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    RegisterMutationMutation,
    RegisterMutationMutationVariables
  >
> &
  TChildProps;
export type RegisterMutationMutationFn = ReactApollo.MutationFn<
  RegisterMutationMutation,
  RegisterMutationMutationVariables
>;
export function withRegisterMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutationMutation,
        RegisterMutationMutationVariables,
        RegisterMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutationMutation,
    RegisterMutationMutationVariables,
    RegisterMutationProps<TChildProps>
  >(RegisterMutationDocument, operationOptions);
}
