// eslint-disable-next-line import/no-extraneous-dependencies
import "cypress-file-upload";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (username) => {
  cy.visit("http://localhost:3000/signin");
  cy.get("#username").type(username);
  cy.get("#password").type("test1234");
  cy.get("[data-testid=submit-btn]").click();
  // cy.request("POST", "/api/users/signin", {
  //   username,
  //   password: "test1234",
  // }).then((response) => {
  //   window.localStorage.setItem("token", response.body.meta.token);
  // });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
