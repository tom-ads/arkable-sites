import { Client, cacheExchange, fetchExchange } from "urql";

export const urqlApi = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});
