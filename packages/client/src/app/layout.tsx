import { Inter } from "next/font/google";

import "@/css/globals.css";
import Providers from "./provider";
import { ReactChild } from "@/types/react-child";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: ReactChild) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
