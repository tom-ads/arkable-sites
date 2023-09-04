import { gql } from "@urql/core";

export const SESSION_QUERY = gql`
  query Session {
    session {
      user {
        forename
        surname
        email
      }
    }
  }
`;
