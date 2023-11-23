import * as Types from '../../../../../graphql/types';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SessionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SessionQuery = { __typename?: 'Query', session?: { __typename?: 'Session', user?: { __typename?: 'User', forename: string, surname: string, email: string } | null } | null };


export const SessionDocument = gql`
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

export function useSessionQuery(options?: Omit<Urql.UseQueryArgs<SessionQueryVariables>, 'query'>) {
  return Urql.useQuery<SessionQuery, SessionQueryVariables>({ query: SessionDocument, ...options });
};