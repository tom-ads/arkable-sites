import { render } from "@testing-library/react";
import { ButtonLink } from ".";

test("button link renders, does not throw", () => {
  render(<ButtonLink href="#">Confirm</ButtonLink>);
});
