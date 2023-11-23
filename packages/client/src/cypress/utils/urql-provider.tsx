import { makeClient, ssr } from "@/app/_helpers/client";
import { UrqlProvider } from "@urql/next";
import { ReactNode } from "react";

export const client = makeClient();

export function MockUrql({ children }: { children: ReactNode }) {
  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  );
}
