"use client";

import authAtom from "@/atoms/auth";
import Button from "@/components/button";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { LoginInput } from "@/graphql/types";
import {
  Form,
  FormControl,
  FormErrorMessage,
  FormInput,
  FormPasswordInput,
} from "@/components/forms";
import { useLoginMutation } from "@/app/_features/auth/api/mutations/login.generated";
import { signIn } from "next-auth/react";

type LoginPageProps = {
  csrfToken?: string;
};

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm({ csrfToken }: LoginPageProps): JSX.Element {
  const router = useRouter();

  const setAuthAtom = useSetAtom(authAtom);

  const [{ error: loginError }, login] = useLoginMutation();

  const handleSubmit = async (formValues: LoginInput) => {
    await signIn("credentials", {
      ...formValues,
      redirect: false,
      // callbackUrl: `${window.location.origin}`,
    })
      .then((res) => {
        console.log("did login", res);
      })
      .catch((err) => {
        console.log("err login", err);
      });
  };

  return (
    <Form<LoginInput, typeof loginSchema>
      mode="onSubmit"
      error={loginError}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
    >
      {({ formState: { errors } }) => (
        <>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormControl>
            <FormInput
              name="email"
              placeholder="Email"
              isError={!!errors?.email?.message}
            />
            {!!errors.email?.message && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormPasswordInput
              name="password"
              placeholder="Password"
              isError={!!errors?.password?.message}
            />
          </FormControl>

          <FormControl className="mt-8">
            <Button type="submit" block>
              Login
            </Button>
          </FormControl>
        </>
      )}
    </Form>
  );
}
