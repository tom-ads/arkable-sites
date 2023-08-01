import { render } from "@testing-library/react";
import Form from "../forms/form";
import { inputFieldValidationError } from "@/mocks/urql_mock";
import { CombinedError } from "urql";

type TestFields = {
  name: string;
  email: string;
};

test("form renders, does not throw", () => {
  render(<Form<TestFields> onSubmit={() => {}}>{() => <div></div>}</Form>);
});

test("it should display a form with query validation errors set", () => {
  render(
    <Form<TestFields>
      onSubmit={() => {}}
      error={inputFieldValidationError as CombinedError}
    >
      {() => <div></div>}
    </Form>
  );
});
