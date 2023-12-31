import { gql } from "@urql/core";

export const LOGIN_MUTATION = gql`
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
