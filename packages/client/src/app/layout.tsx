import { Inter } from "next/font/google";

import "@/css/globals.css";
import Providers from "./provider";
import { PropsWithChildren } from "react";
import { extendTailwindMerge } from "tailwind-merge";

export const twMergeExtended = extendTailwindMerge({
  classGroups: {
    boxShadow: [
      { shadow: ["focus-sm", "focus-md", "focus-lg", "sm", "md", "lg"] },
    ],
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
