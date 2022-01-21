describe("Test auth", () => {
  it("open sign in page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign In").click();
    cy.contains("Username");
    cy.get('[id="username"]')
      .type("MichaelTest")
      .should("have.value", "MichaelTest");
    cy.contains("Password");
    cy.get('[id="password"]').type("hola123").should("have.value", "hola123");
    cy.contains('[data-testid="submit-btn"]').click();

    cy.request("POST", "http://localhost:3001/api/users/signin");
    cy.request("GET", "http://localhost:3000/tweets");
  });
});
