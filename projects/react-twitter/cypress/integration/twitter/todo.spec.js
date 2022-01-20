/// <reference types="cypress" />

describe("React Twitter app", () => {
  it("sign-in existent user and redirect to tweets page (homepage)", () => {
    cy.visit("http://localhost:3000");
    cy.get(".nav-link").last().click();

    const username = cy.get(".form-control").first();
    username.should("be.empty");
    username.type("benja");

    const password = cy.get(".form-control").last();
    password.should("be.empty");
    password.type("twitter");

    cy.get(".btn-primary").click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});
