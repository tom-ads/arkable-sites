import { render } from "@testing-library/react";
import FormControl from "../forms/control";

test("control renders, does not throw", () => {
  render(<FormControl>Control</FormControl>);
});
