import { render } from "@testing-library/react";
import { FormControl } from ".";

test("control renders, does not throw", () => {
  render(<FormControl>Control</FormControl>);
});
