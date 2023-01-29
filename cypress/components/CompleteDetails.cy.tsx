import CompleteDetails from "src/components/auth/CompleteDetails";
import Wrapper from "../fixtures/Wrapper";

describe("<CreateAccount />", () => {
  beforeEach(() => {
    // mounting the component before every test
    cy.mount(
      // the wrapper component wrap the main component with an instance of BrowserRouter
      <Wrapper>
        <CompleteDetails
          phone="2349017241037"
          country={{ code: "+234", dial_code: "", name: "Nigeria" }}
        />
      </Wrapper>
    );
  });

  it("It renders", () => {
    cy.contains("Complete Details", { matchCase: false }).should("exist");
  });
});
