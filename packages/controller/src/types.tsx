type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type CreateMatcheInput = {
  name: Scalars["String"];
  picture?: Maybe<Scalars["Upload"]>;
  description: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
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
  createMatche: Scalars["Boolean"];
  login: LoginResponse;
  logout: Scalars["Boolean"];
  register: RegisterResponse;
};

export type MutationCreateMatcheArgs = {
  input: CreateMatcheInput;
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
export type CreateMatcheMutationVariables = {
  picture?: Maybe<Scalars["Upload"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};

export type CreateMatcheMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createMatche"
>;

export type LoginMutationMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutationMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResponse" } & {
    errors: Maybe<
      Array<{ __typename?: "Error" } & Pick<Error, "message" | "path">>
    >;
    user: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
  };
};

export type LogoutMutationMutationVariables = {};

export type LogoutMutationMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MeQueryQueryVariables = {};

export type MeQueryQuery = { __typename?: "Query" } & {
  me: Maybe<{ __typename?: "User" } & Pick<User, "id" | "email">>;
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

export const CreateMatcheDocument = gql`
  mutation CreateMatche(
    $picture: Upload
    $name: String!
    $description: String!
    $latitude: Float!
    $longitude: Float!
  ) {
    createMatche(
      input: {
        picture: $picture
        name: $name
        description: $description
        latitude: $latitude
        longitude: $longitude
      }
    )
  }
`;

export class CreateMatcheComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateMatcheMutation,
      CreateMatcheMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateMatcheMutation, CreateMatcheMutationVariables>
        mutation={CreateMatcheDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateMatcheProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateMatcheMutation, CreateMatcheMutationVariables>
> &
  TChildProps;
export type CreateMatcheMutationFn = ReactApollo.MutationFn<
  CreateMatcheMutation,
  CreateMatcheMutationVariables
>;
export function withCreateMatche<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateMatcheMutation,
        CreateMatcheMutationVariables,
        CreateMatcheProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateMatcheMutation,
    CreateMatcheMutationVariables,
    CreateMatcheProps<TChildProps>
  >(CreateMatcheDocument, operationOptions);
}
export const LoginMutationDocument = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      errors {
        message
        path
      }
      user {
        id
        email
      }
    }
  }
`;

export class LoginMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      LoginMutationMutation,
      LoginMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        LoginMutationMutation,
        LoginMutationMutationVariables
      >
        mutation={LoginMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutationMutation, LoginMutationMutationVariables>
> &
  TChildProps;
export type LoginMutationMutationFn = ReactApollo.MutationFn<
  LoginMutationMutation,
  LoginMutationMutationVariables
>;
export function withLoginMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutationMutation,
        LoginMutationMutationVariables,
        LoginMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutationMutation,
    LoginMutationMutationVariables,
    LoginMutationProps<TChildProps>
  >(LoginMutationDocument, operationOptions);
}
export const LogoutMutationDocument = gql`
  mutation LogoutMutation {
    logout
  }
`;

export class LogoutMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      LogoutMutationMutation,
      LogoutMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        LogoutMutationMutation,
        LogoutMutationMutationVariables
      >
        mutation={LogoutMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    LogoutMutationMutation,
    LogoutMutationMutationVariables
  >
> &
  TChildProps;
export type LogoutMutationMutationFn = ReactApollo.MutationFn<
  LogoutMutationMutation,
  LogoutMutationMutationVariables
>;
export function withLogoutMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutationMutation,
        LogoutMutationMutationVariables,
        LogoutMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LogoutMutationMutation,
    LogoutMutationMutationVariables,
    LogoutMutationProps<TChildProps>
  >(LogoutMutationDocument, operationOptions);
}
export const MeQueryDocument = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

export class MeQueryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQueryQuery, MeQueryQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQueryQuery, MeQueryQueryVariables>
        query={MeQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQueryQuery, MeQueryQueryVariables>
> &
  TChildProps;
export function withMeQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQueryQuery,
        MeQueryQueryVariables,
        MeQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    MeQueryQuery,
    MeQueryQueryVariables,
    MeQueryProps<TChildProps>
  >(MeQueryDocument, operationOptions);
}
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