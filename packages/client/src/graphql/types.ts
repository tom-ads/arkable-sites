export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  country?: Maybe<Scalars['String']['output']>;
  county?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  line_1?: Maybe<Scalars['String']['output']>;
  line_2?: Maybe<Scalars['String']['output']>;
  postcode?: Maybe<Scalars['String']['output']>;
  town_or_city?: Maybe<Scalars['String']['output']>;
};

export type Listing = {
  __typename?: 'Listing';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Session>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Mutations = {
  __typename?: 'Mutations';
  root?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  listing?: Maybe<Listing>;
  root?: Maybe<Scalars['String']['output']>;
  searchPostcode: Array<Address>;
  session?: Maybe<Session>;
};


export type QueryListingArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchPostcodeArgs = {
  postcode: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  forename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isHost: Scalars['Boolean']['output'];
  password: Scalars['String']['output'];
  surname: Scalars['String']['output'];
};
