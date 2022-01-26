describe("Tweets", () => {
  beforeEach(() => {
    cy.request("POST", "/testing/clean-database");
    cy.request("POST", "/api/users/signup", {
      email: "test@example.com",
      username: "test",
      name: "Test",
      lastname: "Perez",
      password: "test1234",
    });
  });

  it("should allow user to list, and create tweets", () => {
    cy.login("test");
    cy.get(".tweet").should("have.length", 0);
    cy.contains("New Tweet").click();
    cy.get("[name=content]").type("Primer Tweet");
    cy.get("[name=location]").type("Ubicación");
    cy.get('input[type="file"]').attachFile("../fixtures/chess.jpg");
    cy.contains("Submit").click();
    cy.get(".tweet").should("have.length", 1);
  });
});
