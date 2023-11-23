import { Form } from ".";
import { FormInput } from "../input";

describe("<Form />", () => {
  it("mounts without throwing", () => {
    cy.mount(<Form>{() => <></>}</Form>);
  });

  it("applies the default values to form element", () => {
    cy.mount(
      <Form<{ test: string }> defaultValues={{ test: "test" }}>
        {() => <FormInput name="test" />}
      </Form>
    );

    cy.get("input").should("have.attr", "name", "test");

    cy.get("input").should("have.value", "test");
  });

  it("sets errors passed in from the query errors", () => {
    // cy.mount(
    //   <Form<{ test: string }> errors={{ test: [{ }] }}>
    //     {() => <FormInput name="test" />}
    //   </Form>
    // );

    cy.get("input").should("have.attr", "name", "test");

    cy.get("input").should("have.value", "test");

    cy.get("input").should("have.class", "border-red-500");
  });
});
