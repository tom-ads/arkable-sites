"use client";

import authAtom from "@/atoms/auth";
import Button from "@/components/button";
import FormControl from "@/components/forms/control";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/input";
import FormPasswordInput from "@/components/forms/password-input";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { gql } from "urql";
import { z } from "zod";
import { useLoginMutation } from "./login-form.generated";
import { LoginInput } from "@/graphql/types";
import FormErrorMessage from "@/components/forms/error-message";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        forename
        surname
        email
      }
    }
  }
`;

export default function LoginForm(): JSX.Element {
  const router = useRouter();

  const setAuthAtom = useSetAtom(authAtom);

  const [{ error: loginError }, login] = useLoginMutation();

  const handleSubmit = async (formValues: LoginInput) => {
    await login({ input: formValues })
      .then((res) => {
        if (res.error) return;
        if (res.data?.login?.user) {
          setAuthAtom({
            isAuthenticated: true,
            user: res.data.login.user,
          });
          router.push("/register");
        }
      })
      .catch((e) => {
        console.log(e);
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

          {/* Divider */}
          <div className="flex items-center w-full gap-x-2 mt-11">
            <div className="bg-grey-200 h-[1px] flex-grow"></div>
            <p className="text-grey-950">OR</p>
            <div className="bg-grey-200 h-[1px] flex-grow"></div>
          </div>
        </>
      )}
    </Form>
  );
}
