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

export type Mutation = {
  register: RegisterResponse;
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
