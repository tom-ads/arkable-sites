import { render } from "@testing-library/react";
import { FormInput } from ".";

test("input renders, does not throw", () => {
  render(<FormInput name="test" />);
});
