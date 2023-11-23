import { LoginForm } from "./login-form";
import { MockProviders } from "@/cypress/utils/mock-providers";

describe("<LoginForm />", () => {
  it("should mounts", () => {
    cy.mount(
      <MockProviders>
        <LoginForm />
      </MockProviders>
    );
  });

  it("should render correct fields", () => {
    cy.mount(
      <MockProviders>
        <LoginForm />
      </MockProviders>
    );

    cy.get("form").should("exist");
    cy.get("input[name=email]").should("exist");
    cy.get("input[name=password]").should("exist");
    cy.get("button[type=submit]").should("exist");
  });

  describe("Functionality", () => {
    const email = "test@example.com";
    const password = "password";

    beforeEach(() => {
      cy.mount(
        <MockProviders>
          <LoginForm />
        </MockProviders>
      );

      cy.get("input[name=email]").as("emailField");
      cy.get("input[name=password]").as("passwordField");
    });

    it("should display required validation errors, when attempting to submit without filled fields", () => {
      cy.get("form").submit();

      cy.get("@emailField").should("have.class", "border-red-900");
      cy.get("@passwordField").should("have.class", "border-red-900");

      cy.contains("Valid email is required");
      cy.contains("Password is required");
    });

    it("should display invalid email validation error, when attempting to submit with an invalid email", () => {
      cy.get("@emailField").type("invalid-email");

      cy.get("form").submit();

      cy.get("@emailField").should("have.class", "border-red-900");

      cy.contains("Valid email is required");
    });

    it("should only display password validation error, when attempting to submit with an invalid password", () => {
      cy.get("@emailField").type(email);

      cy.get("form").submit();

      cy.get("@passwordField").should("have.class", "border-red-900");

      cy.contains("Password is required");
    });

    it("should only display email validation error, when attempting to submit with an invalid email", () => {
      cy.get("@passwordField").type(password);

      cy.get("form").submit();

      cy.get("@emailField").should("have.class", "border-red-900");

      cy.contains("Valid email is required");
    });
  });
});
