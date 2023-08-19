import { render } from "@testing-library/react";
import { Form } from ".";
import { CombinedError } from "urql";

type TestFields = {
  name: string;
  email: string;
};

test("form renders, does not throw", () => {
  render(<Form<TestFields> onSubmit={() => {}}>{() => <div></div>}</Form>);
});
