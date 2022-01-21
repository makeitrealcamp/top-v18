describe("Authentication", () => {
  beforeEach(() => {
    cy.request("POST", "/testing/clean-database");
  });
});
