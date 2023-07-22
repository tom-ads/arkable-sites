"use client";

import FormControl from "@/components/control";
import Form from "@/components/form";
import FormInput from "@/components/input";
import FormPasswordInput from "@/components/password-input";

type FormFields = {
  email: string;
  password: string;
};

export default function RegisterForm(): JSX.Element {
  const handleSubmit = () => {};

  return (
    <Form<FormFields> onSubmit={handleSubmit}>
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
              placeholder="Password"
              isError={!!errors?.email?.message}
            />
          </FormControl>
        </>
      )}
    </Form>
  );
}
