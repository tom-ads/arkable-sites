import { PropsWithChildren } from "react";
import { Header } from "@/components/header";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="w-full mt-[60px]">{children}</main>
    </>
  );
}
