import React from "react";
import { ButtonLink } from "./index";

describe("<ButtonLink />", () => {
  it("mounts without throwing", () => {
    cy.mount(<ButtonLink href="/login">Click Link</ButtonLink>);
  });

  it("link contains the passed in href", () => {
    cy.mount(<ButtonLink href="/login">Click Link</ButtonLink>);

    cy.get("a").should("have.attr", "href", "/login");
  });
});
