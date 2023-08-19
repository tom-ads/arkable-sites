"use client";

import FormControl from "@/components/forms/control";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/input";
import FormPasswordInput from "@/components/forms/password-input";

type FormFields = {
  email: string;
  password: string;
};

export function RegisterForm(): JSX.Element {
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
