"use client";

import FormControl from "@/components/control";
import Form from "@/components/form";
import FormInput from "@/components/input";

type FormFields = {
  email: string;
  password: string;
};

export default function LoginForm(): JSX.Element {
  const handleSubmit = () => {};

  return (
    <Form<FormFields> onSubmit={handleSubmit}>
      {({ formState: { errors } }) => (
        <>
          <FormControl>
            <FormInput name="email" isError={!!errors?.email?.message} />
          </FormControl>
          <FormControl>
            <FormInput name="email" isError={!!errors?.email?.message} />
          </FormControl>
        </>
      )}
    </Form>
  );
}
