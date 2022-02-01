describe('React Twitter', () => {
  it('Page can be opened', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Sign In').click();
    cy.get('.form-control').eq(0).type('Juan');
    cy.get('.form-control').eq(1).type('123456789');
    cy.get('.btn-primary').click().last();
    cy.request('POST', 'http://localhost:3001/api/users/signin');
    cy.request('GET', 'http://localhost:3000/tweets');
  });
});
