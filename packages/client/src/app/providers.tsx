"use client";

import { UrqlProvider } from "@urql/next";
import { Provider } from "jotai";
import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";

const ssr = ssrExchange();
const client = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL!,
  exchanges: [cacheExchange, ssr, fetchExchange],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      <Provider>{children}</Provider>
    </UrqlProvider>
  );
}
