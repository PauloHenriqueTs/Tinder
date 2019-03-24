export type Maybe<T> = T | null;

export interface RegisterInput {
  username: string;

  email: string;

  password: string;
}
import { GraphQLResolveInfo } from "graphql";

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
    me?: MeResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>;

    username?: UsernameResolver<string, TypeParent, TContext>;

    email?: EmailResolver<string, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UsernameResolver<
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

export namespace MutationResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    register?: RegisterResolver<RegisterResponse, TypeParent, TContext>;
  }

  export type RegisterResolver<
    R = RegisterResponse,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, RegisterArgs>;
  export interface RegisterArgs {
    input: RegisterInput;
  }
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

export type IResolvers<TContext = MyContext> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  RegisterResponse?: RegisterResponseResolvers.Resolvers<TContext>;
  Error?: ErrorResolvers.Resolvers<TContext>;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };

// ====================================================
// Types
// ====================================================

export interface Query {
  me?: Maybe<User>;
}

export interface User {
  id: string;

  username: string;

  email: string;
}

export interface Mutation {
  register: RegisterResponse;
}

export interface RegisterResponse {
  errors?: Maybe<Error[]>;
}

export interface Error {
  path: string;

  message: string;
}

// ====================================================
// Arguments
// ====================================================

export interface RegisterMutationArgs {
  input: RegisterInput;
}
