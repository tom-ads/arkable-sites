import "server-only";

import { cookies } from "next/headers";
import { registerUrql } from "@urql/next/rsc";
import { cacheExchange, createClient, fetchExchange } from "@urql/core";

const getURQLServerClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL!,
    exchanges: [cacheExchange, fetchExchange],
    fetch: async (input, init) => {
      const cookieStore = cookies();

      init!.headers = new Headers({
        ...init!.headers,
        credentials: "include",
        origin: process.env.NEXT_CLIENT_URL!,
      });

      const csrf = cookieStore.get("XSRF-TOKEN");
      if (csrf) {
        init!.headers.set("X-XSRF-TOKEN", csrf.value);
      }

      const session = cookieStore.get(
        process.env.NEXT_GRAPHQL_API_SESSION_NAME!
      );
      if (session) {
        init!.headers.append("Cookie", `${session.name}=${session.value}`);
      }

      return fetch(input, init);
    },
  });
};

export const { getClient: getServerClient } = registerUrql(getURQLServerClient);
