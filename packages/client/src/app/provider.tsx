"use client";

import { UrqlProvider } from "@urql/next";
import { cacheExchange, createClient, fetchExchange, ssrExchange } from "urql";

const ssr = ssrExchange();
const client = createClient({
  url: "http://localhost:8080/graphql",
  exchanges: [cacheExchange, ssr, fetchExchange],
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
