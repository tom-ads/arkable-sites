"use client";

import authAtom from "@/atoms/auth";
import { useAtomValue } from "jotai";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAtomValue(authAtom);
  console.log("test", auth);

  return children;
}
