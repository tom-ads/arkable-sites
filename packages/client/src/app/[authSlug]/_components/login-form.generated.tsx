import * as Types from "../../../graphql/types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login?: {
    __typename?: "Session";
    user?: {
      __typename?: "User";
      id: string;
      forename: string;
      surname: string;
      email: string;
    } | null;
  } | null;
};

export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        forename
        surname
        email
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
