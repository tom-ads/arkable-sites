import { Form } from "../form";
import { FormPasswordInput } from ".";

describe("<FormPasswordInput />", () => {
  test("component mounts without throwing", () => {
    cy.mount(
      <Form<{ test: "" }>>{() => <FormPasswordInput name="test" />}</Form>
    );
  });
});
