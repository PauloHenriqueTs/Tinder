export type Maybe<T> = T | null;

export interface MessageInput {
  text?: Maybe<string>;

  userId: string;

  matcheId: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type DeslikeVariables = {
  matcheid: string;
};

export type DeslikeMutation = {
  __typename?: "Mutation";

  deslike: boolean;
};

export type LikeVariables = {
  matcheid: string;
};

export type LikeMutation = {
  __typename?: "Mutation";

  like: boolean;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type FindmatcheruserVariables = {};

export type FindmatcheruserQuery = {
  __typename?: "Query";

  findmatcheruser: Maybe<FindmatcheruserFindmatcheruser>;
};

export type FindmatcheruserFindmatcheruser = {
  __typename?: "User";

  id: string;

  name: string;

  pictureUrl: Maybe<string>;

  bio: Maybe<string>;
};

export type HelloVariables = {};

export type HelloQuery = {
  __typename?: "Query";

  hello: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;

  pictureUrl: Maybe<string>;

  bio: Maybe<string>;

  lastMessage: Maybe<string>;

  like: Maybe<string[]>;

  deslike: Maybe<string[]>;

  matches: Maybe<MeMatches[]>;
};

export type MeMatches = {
  __typename?: "matchesLoaderType";

  User: Maybe<MeUser>;

  lastMessage: Maybe<string>;
};

export type MeUser = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;

  pictureUrl: Maybe<string>;

  bio: Maybe<string>;

  lastMessage: Maybe<string>;

  like: Maybe<string[]>;

  deslike: Maybe<string[]>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const DeslikeDocument = gql`
  mutation Deslike($matcheid: String!) {
    deslike(matcheid: $matcheid)
  }
`;
export class DeslikeComponent extends React.Component<
  Partial<ReactApollo.MutationProps<DeslikeMutation, DeslikeVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<DeslikeMutation, DeslikeVariables>
        mutation={DeslikeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeslikeProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeslikeMutation, DeslikeVariables>
> &
  TChildProps;
export type DeslikeMutationFn = ReactApollo.MutationFn<
  DeslikeMutation,
  DeslikeVariables
>;
export function DeslikeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeslikeMutation,
        DeslikeVariables,
        DeslikeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeslikeMutation,
    DeslikeVariables,
    DeslikeProps<TChildProps>
  >(DeslikeDocument, operationOptions);
}
export const LikeDocument = gql`
  mutation Like($matcheid: String!) {
    like(matcheid: $matcheid)
  }
`;
export class LikeComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LikeMutation, LikeVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LikeMutation, LikeVariables>
        mutation={LikeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LikeProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LikeMutation, LikeVariables>
> &
  TChildProps;
export type LikeMutationFn = ReactApollo.MutationFn<
  LikeMutation,
  LikeVariables
>;
export function LikeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LikeMutation,
        LikeVariables,
        LikeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LikeMutation,
    LikeVariables,
    LikeProps<TChildProps>
  >(LikeDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const FindmatcheruserDocument = gql`
  query Findmatcheruser {
    findmatcheruser {
      id
      name
      pictureUrl
      bio
    }
  }
`;
export class FindmatcheruserComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<FindmatcheruserQuery, FindmatcheruserVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<FindmatcheruserQuery, FindmatcheruserVariables>
        query={FindmatcheruserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindmatcheruserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindmatcheruserQuery, FindmatcheruserVariables>
> &
  TChildProps;
export function FindmatcheruserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindmatcheruserQuery,
        FindmatcheruserVariables,
        FindmatcheruserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindmatcheruserQuery,
    FindmatcheruserVariables,
    FindmatcheruserProps<TChildProps>
  >(FindmatcheruserDocument, operationOptions);
}
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;
export class HelloComponent extends React.Component<
  Partial<ReactApollo.QueryProps<HelloQuery, HelloVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<HelloQuery, HelloVariables>
        query={HelloDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type HelloProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<HelloQuery, HelloVariables>
> &
  TChildProps;
export function HelloHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        HelloQuery,
        HelloVariables,
        HelloProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    HelloQuery,
    HelloVariables,
    HelloProps<TChildProps>
  >(HelloDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      name
      pictureUrl
      bio
      lastMessage
      like
      deslike
      matches {
        User {
          id
          email
          name
          pictureUrl
          bio
          lastMessage
          like
          deslike
        }
        lastMessage
      }
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
