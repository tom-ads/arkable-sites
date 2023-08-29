import { Client, cacheExchange, createClient, fetchExchange } from "urql/core";

let _client: Client | null = null;

export const getServerUrqlClient = () => {
  if (!_client) {
    _client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_API_BASE_URL!,
      requestPolicy: "cache-and-network",
      exchanges: [cacheExchange, fetchExchange],
    });
  }
  const client = _client;
  return { client };
};
