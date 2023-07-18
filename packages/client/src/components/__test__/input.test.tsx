import { render } from "@testing-library/react";
import FormInput from "../input";

test("input renders, does not throw", () => {
  render(<FormInput name="test" />);
});
