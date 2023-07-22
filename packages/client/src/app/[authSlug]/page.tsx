import { notFound } from "next/navigation";
import LoginView from "./_components/login-view";

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
