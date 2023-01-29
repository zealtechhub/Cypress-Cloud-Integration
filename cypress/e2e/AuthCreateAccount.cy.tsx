import Auth from "src/pages/Auth";
import Wrapper from "../fixtures/Wrapper";

describe("Authentication Component", () => {
  beforeEach(() => {
    // see: https://on.cypress.io/mounting-react
    cy.visit("localhost:3000");
  });

  it("renders", () => {
    cy.get(".note").contains(
      "If you are creating a new account, Terms & Conditions and Privacy policy apllies"
    );
  });

  it("Continue button is disabled when in input box is empty", () => {
    cy.get("button[type=submit]").should("be.disabled");
  });

  describe("Select Country Modal", () => {
    it("It pops out country selector modal when the select is clicked", () => {
      cy.get(".select-toggler").click();
      cy.get(".select-country-wrapper").should("exist");
    });

    it("it select country when a country when it is clicked", () => {
      cy.get(".select-toggler")
        .click()
        .then(() => {
          cy.contains("Algeria").click();
          cy.get(".select-country-wrapper").should("not.exist");
          cy.get(".select-toggler").should("contain.text", "213");
        });
    });
  });

  describe("Input functions in connection with the continue button", () => {
    it("Phone number formatted", () => {
      cy.get("input").type("09017241037");
      cy.get("input").then((element) => {
        expect(element.val()).equal("0901 724 1037");
      });
    });

    it("It's navigate user to complete details when continue button is clicked", () => {
      cy.get("input").type("09017241037");
      cy.get("button[type=submit]").click();
    });
  });
});
