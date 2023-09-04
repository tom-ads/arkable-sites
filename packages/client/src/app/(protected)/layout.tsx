import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { getServerClient } from "../_helpers/server";
import { SESSION_QUERY } from "../_features/auth/api/queries/session";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  const response = await getServerClient().query(SESSION_QUERY, {});

  if (!response.data?.session) {
    redirect("/login");
  }

  return <>{children}</>;
}
