"use client";

import { UrqlProvider } from "@urql/next";
import { Provider } from "jotai";
import { makeClient, ssr } from "./_helpers/client";

export const client = makeClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      <Provider>{children}</Provider>
    </UrqlProvider>
  );
}
