"use client";

import {
  Form,
  FormControl,
  FormErrorMessage,
  FormInput,
  FormPasswordInput,
} from "@/components/forms";
import { z } from "zod";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { LoginInput } from "@/graphql/types";
import { useLoginMutation } from "@/app/_features/auth/api/mutations/login.generated";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export function LoginForm(): JSX.Element {
  const router = useRouter();

  const [{ error: loginError }, login] = useLoginMutation();

  const handleSubmit = async (formValues: LoginInput) => {
    const response = await login({ input: formValues });

    if (!response?.error) {
      router.push("/dashboard");
    }
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
            {!!errors.password?.message && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
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
