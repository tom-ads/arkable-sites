import { Header } from "@/components/header";
import { PropsWithChildren } from "react";

type DashboardParops = PropsWithChildren;

export default function DashboardLayout({ children }: DashboardParops) {
  return (
    <>
      <Header />
      <main className="w-full">{children}</main>
    </>
  );
}
