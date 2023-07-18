import { render } from "@testing-library/react";
import Button from "../button";

test("button renders, does not throw", () => {
  render(<Button>Confirm</Button>);
});
