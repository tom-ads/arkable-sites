import { render } from "@testing-library/react";
import Button from ".";

test("button renders, does not throw", () => {
  render(<Button>Confirm</Button>);
});
