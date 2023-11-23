import React from "react";
import { Button } from ".";

describe("<Button />", () => {
  it("button mounts without error", () => {
    cy.mount(<Button>Test Button</Button>);
  });
});
