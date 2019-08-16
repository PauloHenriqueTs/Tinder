export type Maybe<T> = T | null;

export interface MessageInput {
  text?: Maybe<string>;

  matcheId: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type AddNewMessageVariables = {
  matcheid: string;
  text?: Maybe<string>;
};

export type AddNewMessageMutation = {
  __typename?: "Mutation";

  addNewMessage: boolean;
};

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

export type PickuserVariables = {};

export type PickuserMutation = {
  __typename?: "Mutation";

  pickuser: boolean;
};

export type HelloVariables = {};

export type HelloQuery = {
  __typename?: "Query";

  hello: string;
};

export type MatcheUserVariables = {
  matcheid: string;
};

export type MatcheUserQuery = {
  __typename?: "Query";

  matcheuser: Maybe<MatcheUserMatcheuser>;
};

export type MatcheUserMatcheuser = {
  __typename?: "User";

  id: string;

  name: string;

  pictureUrl: Maybe<string>;
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

export type FindMessagesVariables = {
  matcheid: string;
};

export type FindMessagesQuery = {
  __typename?: "Query";

  findMessage: FindMessagesFindMessage[];
};

export type FindMessagesFindMessage = {
  __typename?: "MessageType";

  text: Maybe<string>;

  userId: string;

  matcheId: string;

  date: DateTime;
};

export type FindUserVariables = {};

export type FindUserSubscription = {
  __typename?: "Subscription";

  finduser: Maybe<FindUserFinduser>;
};

export type FindUserFinduser = {
  __typename?: "User";

  id: string;

  email: string;

  name: string;

  pictureUrl: Maybe<string>;

  bio: Maybe<string>;

  lastMessage: Maybe<string>;

  like: Maybe<string[]>;

  deslike: Maybe<string[]>;

  matches: Maybe<FindUserMatches[]>;
};

export type FindUserMatches = {
  __typename?: "matchesLoaderType";

  User: Maybe<FindUserUser>;

  lastMessage: Maybe<string>;
};

export type FindUserUser = {
  __typename?: "User";

  id: string;
};

export type NewMessagesVariables = {
  matcheid: string;
};

export type NewMessagesSubscription = {
  __typename?: "Subscription";

  newMessages: NewMessagesNewMessages;
};

export type NewMessagesNewMessages = {
  __typename?: "MessageType";

  text: Maybe<string>;

  userId: string;

  matcheId: string;

  date: DateTime;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const AddNewMessageDocument = gql`
  mutation AddNewMessage($matcheid: String!, $text: String) {
    addNewMessage(message: { matcheId: $matcheid, text: $text })
  }
`;
export class AddNewMessageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<AddNewMessageMutation, AddNewMessageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<AddNewMessageMutation, AddNewMessageVariables>
        mutation={AddNewMessageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AddNewMessageProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<AddNewMessageMutation, AddNewMessageVariables>
> &
  TChildProps;
export type AddNewMessageMutationFn = ReactApollo.MutationFn<
  AddNewMessageMutation,
  AddNewMessageVariables
>;
export function AddNewMessageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AddNewMessageMutation,
        AddNewMessageVariables,
        AddNewMessageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AddNewMessageMutation,
    AddNewMessageVariables,
    AddNewMessageProps<TChildProps>
  >(AddNewMessageDocument, operationOptions);
}
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
export const PickuserDocument = gql`
  mutation Pickuser {
    pickuser
  }
`;
export class PickuserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<PickuserMutation, PickuserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<PickuserMutation, PickuserVariables>
        mutation={PickuserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PickuserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<PickuserMutation, PickuserVariables>
> &
  TChildProps;
export type PickuserMutationFn = ReactApollo.MutationFn<
  PickuserMutation,
  PickuserVariables
>;
export function PickuserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PickuserMutation,
        PickuserVariables,
        PickuserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    PickuserMutation,
    PickuserVariables,
    PickuserProps<TChildProps>
  >(PickuserDocument, operationOptions);
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
export const MatcheUserDocument = gql`
  query MatcheUser($matcheid: String!) {
    matcheuser(matcheid: $matcheid) {
      id
      name
      pictureUrl
    }
  }
`;
export class MatcheUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MatcheUserQuery, MatcheUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MatcheUserQuery, MatcheUserVariables>
        query={MatcheUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MatcheUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MatcheUserQuery, MatcheUserVariables>
> &
  TChildProps;
export function MatcheUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MatcheUserQuery,
        MatcheUserVariables,
        MatcheUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MatcheUserQuery,
    MatcheUserVariables,
    MatcheUserProps<TChildProps>
  >(MatcheUserDocument, operationOptions);
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
export const FindMessagesDocument = gql`
  query FindMessages($matcheid: String!) {
    findMessage(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
export class FindMessagesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindMessagesQuery, FindMessagesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindMessagesQuery, FindMessagesVariables>
        query={FindMessagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindMessagesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindMessagesQuery, FindMessagesVariables>
> &
  TChildProps;
export function FindMessagesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindMessagesQuery,
        FindMessagesVariables,
        FindMessagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindMessagesQuery,
    FindMessagesVariables,
    FindMessagesProps<TChildProps>
  >(FindMessagesDocument, operationOptions);
}
export const FindUserDocument = gql`
  subscription FindUser {
    finduser {
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
        }
        lastMessage
      }
    }
  }
`;
export class FindUserComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<FindUserSubscription, FindUserVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<FindUserSubscription, FindUserVariables>
        subscription={FindUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindUserSubscription, FindUserVariables>
> &
  TChildProps;
export function FindUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindUserSubscription,
        FindUserVariables,
        FindUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindUserSubscription,
    FindUserVariables,
    FindUserProps<TChildProps>
  >(FindUserDocument, operationOptions);
}
export const NewMessagesDocument = gql`
  subscription NewMessages($matcheid: String!) {
    newMessages(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
export class NewMessagesComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<NewMessagesSubscription, NewMessagesVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<NewMessagesSubscription, NewMessagesVariables>
        subscription={NewMessagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NewMessagesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<NewMessagesSubscription, NewMessagesVariables>
> &
  TChildProps;
export function NewMessagesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewMessagesSubscription,
        NewMessagesVariables,
        NewMessagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NewMessagesSubscription,
    NewMessagesVariables,
    NewMessagesProps<TChildProps>
  >(NewMessagesDocument, operationOptions);
}
