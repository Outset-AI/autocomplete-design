Cypress.Commands.add("verifyInput", (position, value) => {
  cy.get("input").eq(position).should("have.value", value);
});

Cypress.Screenshot.defaults({
  capture: "fullPage",
});
