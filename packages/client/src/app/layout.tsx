import { Inter } from "next/font/google";

import "@/css/globals.css";
import Providers from "./provider";
import { ReactChild } from "@/types/react-child";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const inter = Inter({ subsets: ["latin"] });

// const makeClient = () => {
//   return createClient({
//     url: "http://localhost:8080/graphql",
//     exchanges: [cacheExchange, fetchExchange],
//   });
// };

// export const { getClient } = registerUrql(makeClient);

export default function RootLayout({ children }: ReactChild) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
