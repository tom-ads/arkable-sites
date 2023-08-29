import { PropsWithChildren } from "react";

type DashboardParops = PropsWithChildren;

export default function DashboardLayout({ children }: DashboardParops) {
  return <main className="">{children}</main>;
}
