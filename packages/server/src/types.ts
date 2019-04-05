export type Maybe<T> = T | null;

export interface CreateMatcheInput {
  name: string;

  picture?: Maybe<Upload>;

  description: string;

  latitude: number;

  longitude: number;

  likes: string[];

  deslikes: string[];

  itsMatch: string[];
}

export interface UpdateMatcheInput {
  name: string;

  picture?: Maybe<Upload>;

  description: string;

  latitude: number;

  longitude: number;

  likes: string[];

  deslikes: string[];

  itsMatch: string[];
}

export interface MessageInput {
  text: string;

  matcheId: string;
}

export interface LoginInput {
  email: string;

  password: string;
}

export interface RegisterInput {
  email: string;

  password: string;
}

export type Upload = any;
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { MyContext } from "./context";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    findMatches?: FindMatchesResolver<Matches[], TypeParent, TContext>;

    findme?: FindmeResolver<Maybe<Matches>, TypeParent, TContext>;

    findtalk?: FindtalkResolver<Maybe<FindTalkOutput>, TypeParent, TContext>;

    viewMatche?: ViewMatcheResolver<Maybe<Matches>, TypeParent, TContext>;

    messages?: MessagesResolver<Message[], TypeParent, TContext>;

    me?: MeResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type FindMatchesResolver<
    R = Matches[],
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type FindmeResolver<
    R = Maybe<Matches>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type FindtalkResolver<
    R = Maybe<FindTalkOutput>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type ViewMatcheResolver<
    R = Maybe<Matches>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, ViewMatcheArgs>;
  export interface ViewMatcheArgs {
    id: string;
  }

  export type MessagesResolver<
    R = Message[],
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, MessagesArgs>;
  export interface MessagesArgs {
    matcheId: string;
  }

  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MatchesResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = Matches> {
    id?: IdResolver<string, TypeParent, TContext>;

    name?: NameResolver<string, TypeParent, TContext>;

    pictureUrl?: PictureUrlResolver<Maybe<string>, TypeParent, TContext>;

    description?: DescriptionResolver<string, TypeParent, TContext>;

    latitude?: LatitudeResolver<number, TypeParent, TContext>;

    longitude?: LongitudeResolver<number, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;

    likes?: LikesResolver<Maybe<string[]>, TypeParent, TContext>;

    deslikes?: DeslikesResolver<Maybe<string[]>, TypeParent, TContext>;

    itsMatch?: ItsMatchResolver<Maybe<string[]>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type NameResolver<
    R = string,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type PictureUrlResolver<
    R = Maybe<string>,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type DescriptionResolver<
    R = string,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type LatitudeResolver<
    R = number,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type LongitudeResolver<
    R = number,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type LikesResolver<
    R = Maybe<string[]>,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type DeslikesResolver<
    R = Maybe<string[]>,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type ItsMatchResolver<
    R = Maybe<string[]>,
    Parent = Matches,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>;

    email?: EmailResolver<string, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type EmailResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace FindTalkOutputResolvers {
  export interface Resolvers<
    TContext = MyContext,
    TypeParent = FindTalkOutput
  > {
    talk?: TalkResolver<Maybe<(Maybe<Matches>)[]>, TypeParent, TContext>;

    nottalk?: NottalkResolver<Maybe<(Maybe<Matches>)[]>, TypeParent, TContext>;
  }

  export type TalkResolver<
    R = Maybe<(Maybe<Matches>)[]>,
    Parent = FindTalkOutput,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type NottalkResolver<
    R = Maybe<(Maybe<Matches>)[]>,
    Parent = FindTalkOutput,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MessageResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = Message> {
    text?: TextResolver<string, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;

    matcheId?: MatcheIdResolver<string, TypeParent, TContext>;
  }

  export type TextResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MatcheIdResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    createMatche?: CreateMatcheResolver<boolean, TypeParent, TContext>;

    deslike?: DeslikeResolver<boolean, TypeParent, TContext>;

    like?: LikeResolver<boolean, TypeParent, TContext>;

    updateMatche?: UpdateMatcheResolver<boolean, TypeParent, TContext>;

    createMessage?: CreateMessageResolver<boolean, TypeParent, TContext>;

    login?: LoginResolver<LoginResponse, TypeParent, TContext>;

    logout?: LogoutResolver<boolean, TypeParent, TContext>;

    register?: RegisterResolver<RegisterResponse, TypeParent, TContext>;
  }

  export type CreateMatcheResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, CreateMatcheArgs>;
  export interface CreateMatcheArgs {
    input: CreateMatcheInput;
  }

  export type DeslikeResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, DeslikeArgs>;
  export interface DeslikeArgs {
    matcheId: string;
  }

  export type LikeResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, LikeArgs>;
  export interface LikeArgs {
    matcheId: string;
  }

  export type UpdateMatcheResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, UpdateMatcheArgs>;
  export interface UpdateMatcheArgs {
    MatcheId: string;

    input: UpdateMatcheInput;
  }

  export type CreateMessageResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, CreateMessageArgs>;
  export interface CreateMessageArgs {
    message: MessageInput;
  }

  export type LoginResolver<
    R = LoginResponse,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, LoginArgs>;
  export interface LoginArgs {
    input: LoginInput;
  }

  export type LogoutResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type RegisterResolver<
    R = RegisterResponse,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, RegisterArgs>;
  export interface RegisterArgs {
    input: RegisterInput;
  }
}

export namespace LoginResponseResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = LoginResponse> {
    errors?: ErrorsResolver<Maybe<Error[]>, TypeParent, TContext>;

    user?: UserResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type ErrorsResolver<
    R = Maybe<Error[]>,
    Parent = LoginResponse,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = LoginResponse,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace ErrorResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = Error> {
    path?: PathResolver<string, TypeParent, TContext>;

    message?: MessageResolver<string, TypeParent, TContext>;
  }

  export type PathResolver<
    R = string,
    Parent = Error,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessageResolver<
    R = string,
    Parent = Error,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<
    TContext = MyContext,
    TypeParent = RegisterResponse
  > {
    errors?: ErrorsResolver<Maybe<Error[]>, TypeParent, TContext>;
  }

  export type ErrorsResolver<
    R = Maybe<Error[]>,
    Parent = RegisterResponse,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    newMessage?: NewMessageResolver<Message, TypeParent, TContext>;
  }

  export type NewMessageResolver<
    R = Message,
    Parent = {},
    TContext = MyContext
  > = SubscriptionResolver<R, Parent, TContext, NewMessageArgs>;
  export interface NewMessageArgs {
    matcheId: string;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  MyContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  MyContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  MyContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<Upload, any> {
  name: "Upload";
}

export type IResolvers<TContext = MyContext> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  Matches?: MatchesResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  FindTalkOutput?: FindTalkOutputResolvers.Resolvers<TContext>;
  Message?: MessageResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  LoginResponse?: LoginResponseResolvers.Resolvers<TContext>;
  Error?: ErrorResolvers.Resolvers<TContext>;
  RegisterResponse?: RegisterResponseResolvers.Resolvers<TContext>;
  Subscription?: SubscriptionResolvers.Resolvers<TContext>;
  Upload?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  findMatches: Matches[];

  findme?: Maybe<Matches>;

  findtalk?: Maybe<FindTalkOutput>;

  viewMatche?: Maybe<Matches>;

  messages: Message[];

  me?: Maybe<User>;
}

export interface Matches {
  id: string;

  name: string;

  pictureUrl?: Maybe<string>;

  description: string;

  latitude: number;

  longitude: number;

  user: User;

  likes?: Maybe<string[]>;

  deslikes?: Maybe<string[]>;

  itsMatch?: Maybe<string[]>;
}

export interface User {
  id: string;

  email: string;
}

export interface FindTalkOutput {
  talk?: Maybe<(Maybe<Matches>)[]>;

  nottalk?: Maybe<(Maybe<Matches>)[]>;
}

export interface Message {
  text: string;

  user: User;

  matcheId: string;
}

export interface Mutation {
  createMatche: boolean;

  deslike: boolean;

  like: boolean;

  updateMatche: boolean;

  createMessage: boolean;

  login: LoginResponse;

  logout: boolean;

  register: RegisterResponse;
}

export interface LoginResponse {
  errors?: Maybe<Error[]>;

  user?: Maybe<User>;
}

export interface Error {
  path: string;

  message: string;
}

export interface RegisterResponse {
  errors?: Maybe<Error[]>;
}

export interface Subscription {
  newMessage: Message;
}

// ====================================================
// Arguments
// ====================================================

export interface ViewMatcheQueryArgs {
  id: string;
}
export interface MessagesQueryArgs {
  matcheId: string;
}
export interface CreateMatcheMutationArgs {
  input: CreateMatcheInput;
}
export interface DeslikeMutationArgs {
  matcheId: string;
}
export interface LikeMutationArgs {
  matcheId: string;
}
export interface UpdateMatcheMutationArgs {
  MatcheId: string;

  input: UpdateMatcheInput;
}
export interface CreateMessageMutationArgs {
  message: MessageInput;
}
export interface LoginMutationArgs {
  input: LoginInput;
}
export interface RegisterMutationArgs {
  input: RegisterInput;
}
export interface NewMessageSubscriptionArgs {
  matcheId: string;
}
