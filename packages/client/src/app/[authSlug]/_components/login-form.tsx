"use client";

import Button from "@/components/button";
import FormControl from "@/components/control";
import Form from "@/components/form";
import FormInput from "@/components/input";
import FormPasswordInput from "@/components/password-input";

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
