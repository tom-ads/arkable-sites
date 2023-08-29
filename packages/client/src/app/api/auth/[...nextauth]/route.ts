import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import gql from "graphql-tag";

const makeClient = () => {
  return createClient({
    url: "http://localhost:3001/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        forename
        surname
        email
      }
      token {
        access_token
      }
    }
  }
`;

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data, error } = await getClient().mutation(LOGIN_MUTATION, {
          input: {
            email: credentials?.email,
            password: credentials?.password,
          },
        });
        console.log(data);
        if (error?.message) {
          throw new Error(error?.message);
        }

        return data;
      },
    }),
  ],
  callbacks: {
    signIn({ user }) {
      return !!user;
    },
    jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
});

export { handler as GET, handler as POST };
