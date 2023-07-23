"use client";

import Button from "@/components/button";
import FormControl from "@/components/control";
import Form from "@/components/form";
import FormInput from "@/components/input";
import FormPasswordInput from "@/components/password-input";
import { LoginInput } from "@/gql/graphql";
import { gql, useMutation } from "urql";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
      }
    }
  }
`;

export default function LoginForm(): JSX.Element {
  const [{ fetching, error }, login] = useMutation<LoginInput>(LOGIN_MUTATION);

  const handleSubmit = async (formValues: LoginInput) => {
    await login({ input: formValues })
      .then((res) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form<LoginInput, typeof loginSchema>
      mode="onSubmit"
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
          </FormControl>

          <FormControl>
            <FormPasswordInput
              name="password"
              placeholder="Pasword"
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
