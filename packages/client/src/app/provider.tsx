"use client";

import { urqlApi } from "@/api";
import { Provider } from "urql";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider value={urqlApi}>{children}</Provider>;
}
