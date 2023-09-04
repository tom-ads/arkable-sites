import Cookies from "js-cookie";
import {
  ssrExchange,
  cacheExchange,
  fetchExchange,
  createClient,
} from "@urql/next";

const fetchCSRFToken = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/sanctum/csrf-cookie`, {
    credentials: "include",
  });

  return Cookies.get("XSRF-TOKEN");
};

export const ssr = ssrExchange();

export const makeClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL!,
    exchanges: [cacheExchange, ssr, fetchExchange],
    requestPolicy: "network-only",
    fetch: async (input, init) => {
      let csrfToken = Cookies.get("XSRF-TOKEN");
      if (!csrfToken) {
        csrfToken = await fetchCSRFToken();
      }

      init!.credentials = "include";

      init!.headers = new Headers(init!.headers);

      if (csrfToken) {
        init!.headers.set("X-XSRF-TOKEN", csrfToken);
      }

      return fetch(input, init);
    },
  });
};
