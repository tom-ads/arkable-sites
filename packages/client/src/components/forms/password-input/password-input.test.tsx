import { render } from "@testing-library/react";
import { FormPasswordInput } from ".";

test("password input renders, does not throw", () => {
  render(<FormPasswordInput name="test" />);
});
