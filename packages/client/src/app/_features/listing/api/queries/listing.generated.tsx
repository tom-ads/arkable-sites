import * as Types from '../../../../../graphql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ListingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ListingQuery = { __typename?: 'Query', listing?: { __typename?: 'Listing', title: string, description?: string | null } | null };


export const ListingDocument = gql`
    query Listing($id: ID!) {
  listing(id: $id) {
    title
    description
  }
}
    `;

export function useListingQuery(options: Omit<Urql.UseQueryArgs<ListingQueryVariables>, 'query'>) {
  return Urql.useQuery<ListingQuery, ListingQueryVariables>({ query: ListingDocument, ...options });
};