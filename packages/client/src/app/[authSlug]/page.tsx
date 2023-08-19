import { LoginView } from "@/features/auth/components/views/login-view";
import { notFound } from "next/navigation";

type AuthPageProps = {
  params: { authSlug: string };
};

export default function AuthPage({ params }: AuthPageProps) {
  const slug = params.authSlug?.toLowerCase();

  const isAuthPage = ["login", "register"].some((page) => slug.includes(page));
  if (!isAuthPage) {
    return notFound();
  }

  return <>{slug === "login" && <LoginView />}</>;
}
