describe("user authentication", () => {
  it("visits Home page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("clicks Sign In button", () => {
    cy.get('[href="/signin"]').click();
  });

  it("types username in form", () => {
    cy.get(":nth-child(1) > .form-control").type("augfor");
  });

  it("types password in form", () => {
    cy.get(":nth-child(2) > .form-control").type("12345678");
  });

  it("clicks submit button", () => {
    cy.get(".btn").click();
  });
});
