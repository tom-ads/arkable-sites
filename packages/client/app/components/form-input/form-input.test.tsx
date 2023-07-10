import { render } from "@testing-library/react";
import FormInput from "./form-input";

test("input renders, does not throw", () => {
  render(<FormInput />);
});
