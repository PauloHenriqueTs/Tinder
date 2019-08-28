export type Maybe<T> = T | null;

export interface MessageInput {
  text: string;

  matcheId: string;
}

// ====================================================
// Documents
// ====================================================

export type CreateMessageVariables = {
  message: MessageInput;
};

export type CreateMessageMutation = {
  __typename?: "Mutation";

  createMessage: boolean;
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

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: LoginLogin;
};

export type LoginLogin = {
  __typename?: "LoginResponse";

  errors: Maybe<LoginErrors[]>;

  sessionId: Maybe<string>;
};

export type LoginErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: Maybe<boolean>;
};

export type PickuserVariables = {};

export type PickuserMutation = {
  __typename?: "Mutation";

  pickuser: boolean;
};

export type RegisterVariables = {
  name: string;
  email: string;
  password: string;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: Maybe<RegisterRegister[]>;
};

export type RegisterRegister = {
  __typename?: "Error";

  path: string;

  message: string;
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

  like: string[];

  deslike: string[];

  matches: Maybe<MeMatches[]>;
};

export type MeMatches = {
  __typename?: "MatchesLoader";

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

  like: string[];

  deslike: string[];
};

export type MessagesVariables = {
  matcheid: string;
};

export type MessagesQuery = {
  __typename?: "Query";

  messages: MessagesMessages[];
};

export type MessagesMessages = {
  __typename?: "Message";

  text: string;

  userId: string;

  matcheId: string;

  date: string;
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

  like: string[];

  deslike: string[];

  matches: Maybe<FindUserMatches[]>;
};

export type FindUserMatches = {
  __typename?: "MatchesLoader";

  User: Maybe<FindUserUser>;

  lastMessage: Maybe<string>;
};

export type FindUserUser = {
  __typename?: "User";

  id: string;
};

export type NewMessageVariables = {
  matcheid: string;
};

export type NewMessageSubscription = {
  __typename?: "Subscription";

  newMessage: NewMessageNewMessage;
};

export type NewMessageNewMessage = {
  __typename?: "Message";

  text: string;

  userId: string;

  matcheId: string;

  date: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const CreateMessageDocument = gql`
  mutation createMessage($message: MessageInput!) {
    createMessage(message: $message)
  }
`;
export class CreateMessageComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateMessageMutation, CreateMessageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateMessageMutation, CreateMessageVariables>
        mutation={CreateMessageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateMessageProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateMessageMutation, CreateMessageVariables>
> &
  TChildProps;
export type CreateMessageMutationFn = ReactApollo.MutationFn<
  CreateMessageMutation,
  CreateMessageVariables
>;
export function CreateMessageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateMessageMutation,
        CreateMessageVariables,
        CreateMessageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateMessageMutation,
    CreateMessageVariables,
    CreateMessageProps<TChildProps>
  >(CreateMessageDocument, operationOptions);
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
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      errors {
        path
        message
      }
      sessionId
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
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
export const RegisterDocument = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      path
      message
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
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
      like
      deslike
      matches {
        User {
          id
          email
          name
          pictureUrl
          bio
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
export const MessagesDocument = gql`
  query messages($matcheid: String!) {
    messages(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
export class MessagesComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MessagesQuery, MessagesVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MessagesQuery, MessagesVariables>
        query={MessagesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MessagesProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MessagesQuery, MessagesVariables>
> &
  TChildProps;
export function MessagesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MessagesQuery,
        MessagesVariables,
        MessagesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MessagesQuery,
    MessagesVariables,
    MessagesProps<TChildProps>
  >(MessagesDocument, operationOptions);
}
export const FindUserDocument = gql`
  subscription FindUser {
    finduser {
      id
      email
      name
      pictureUrl
      bio
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
export const NewMessageDocument = gql`
  subscription newMessage($matcheid: String!) {
    newMessage(matcheId: $matcheid) {
      text
      userId
      matcheId
      date
    }
  }
`;
export class NewMessageComponent extends React.Component<
  Partial<
    ReactApollo.SubscriptionProps<NewMessageSubscription, NewMessageVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Subscription<NewMessageSubscription, NewMessageVariables>
        subscription={NewMessageDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NewMessageProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<NewMessageSubscription, NewMessageVariables>
> &
  TChildProps;
export function NewMessageHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewMessageSubscription,
        NewMessageVariables,
        NewMessageProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NewMessageSubscription,
    NewMessageVariables,
    NewMessageProps<TChildProps>
  >(NewMessageDocument, operationOptions);
}
