import { gql } from "@urql/core";

export const ADDRESS_SEARCH_QUERY = gql`
  query searchPostcode($postcode: String!) {
    searchPostcode(postcode: $postcode) {
      id
      line_1
      line_2
      town_or_city
      county
      postcode
      country
    }
  }
`;
