import * as Types from '../../../../../graphql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SearchPostcodeQueryVariables = Types.Exact<{
  postcode: Types.Scalars['String']['input'];
}>;


export type SearchPostcodeQuery = { __typename?: 'Query', searchPostcode: Array<{ __typename?: 'Address', id?: string | null, line_1?: string | null, line_2?: string | null, town_or_city?: string | null, county?: string | null, postcode?: string | null, country?: string | null }> };


export const SearchPostcodeDocument = gql`
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

export function useSearchPostcodeQuery(options: Omit<Urql.UseQueryArgs<SearchPostcodeQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchPostcodeQuery, SearchPostcodeQueryVariables>({ query: SearchPostcodeDocument, ...options });
};