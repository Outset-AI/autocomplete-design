describe("Basic: ", () => {
  it("continue and reset button should exist", () => {
    cy.visit("http://localhost:3000");

    cy.get("button")
      .contains("Continue", { matchCase: false })
      .should("be.visible");
    cy.get("button")
      .contains("Reset Form", { matchCase: false })
      .should("be.visible");
  });

  it("there must be 5 inputs on the page", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").should("have.length", 5);
  });

  it("pressing reset form button should reset form", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("123 University Ave");
    cy.wait(1000);
    cy.get("button").contains("Reset Form", { matchCase: false }).click();

    cy.verifyInput(0, "");
    cy.verifyInput(1, "");
    cy.verifyInput(2, "");
    cy.verifyInput(4, "");
  });
});


describe("Autocomplete: ", () => {
  it("a single result for street should autofill that field", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("632");

    cy.verifyInput(0, "632 Broadway Ave.");
  });

  it("a single result for full address should autofill all fields", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("123 University Ave");

    cy.verifyInput(1, "CA");
    cy.verifyInput(2, "San Diego");
    cy.verifyInput(3, "90210");
    cy.verifyInput(4, "United States");
  });

  it("typing unique postal code should autofill other parts of the form", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(3).type("95014");

    cy.verifyInput(0, "1043 Richmond Av.");
    cy.verifyInput(1, "TX");
    cy.verifyInput(2, "Huston");
    cy.verifyInput(4, "United States");
  });

  it("typing non-exist value for postal code should not autofill", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(3).type("19104");

    cy.verifyInput(0, "");
    cy.verifyInput(1, "");
    cy.verifyInput(2, "");
    cy.verifyInput(4, "");
  });

  it("typing non-exist value for street should not autofill", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(1).type("620 Brooklyn St");

    cy.verifyInput(0, "");
    cy.verifyInput(2, "");
    cy.verifyInput(3, "");
    cy.verifyInput(4, "");
  });
})


describe("Validation: ", () => {
  it("empty street address should throw error when attempting to submit", () => {
    cy.visit("http://localhost:3000");

    cy.get("button").contains("Continue", { matchCase: false }).click();

    cy.contains("The street address can't be blank.");
  });

  it("empty postal code should throw error when attempting to submit", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("123 University Ave.");
    cy.wait(1000);
    cy.get("input").eq(3).clear();
    cy.wait(1000);
    cy.get("form").submit();
    cy.wait(1000);

    cy.contains("The postal code can't be blank.");
  });

  it("invalid address combination should not succeed", () => {
    cy.visit("http://localhost:3000");

    cy.get("input").eq(0).type("123 University Ave");
    cy.wait(1000);

    cy.get("input").eq(4).type("Canada");
    cy.wait(1000);

    cy.get("button").contains("Continue", { matchCase: false }).click();

    cy.get("input")
      .eq(4)
      .invoke("prop", "validationMessage")
      .should("equal", "Please match the requested format.");
  });
})