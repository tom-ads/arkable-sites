import { ArkoraIcon } from "@/components/icons";
import { H1 } from "@/components/typography/heading";
import { LoginForm } from "@/app/_features/auth/components/forms/login-form";
import { Metadata } from "next";
import { getCsrfToken } from "next-auth/react";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const csrfToken = await getCsrfToken();

  return (
    <div className="flex flex-col justify-center min-h-screen py-8">
      {/* Heading */}
      <div className="mb-20">
        <div className="flex items-center justify-center gap-x-4">
          <ArkoraIcon className="w-[90px]" />
          <H1>Arkable</H1>
        </div>
      </div>

      {/* Content */}
      <LoginForm />
    </div>
  );
}
