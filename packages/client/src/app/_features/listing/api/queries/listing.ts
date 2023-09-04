import { gql } from "@urql/core";

export const LISTING_QUERY = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      title
      description
    }
  }
`;
