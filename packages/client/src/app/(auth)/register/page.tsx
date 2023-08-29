"use client";

import Button from "@/components/button";
import { Metadata } from "next";
import { signIn } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Login",
// };

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <p>Register Page</p>
      <Button onClick={() => signIn()}>Sign In</Button>
    </main>
  );
}
