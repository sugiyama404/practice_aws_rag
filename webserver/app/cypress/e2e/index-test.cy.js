describe('Sample Tests', () => {
  it('loads the homepage', () => {
    cy.visit('/')
    cy.get('h3').contains('社内文章検索システム')
  })

  it('sending the message', () => {
    cy.visit('/');
    cy.get('input').type('Hello, Cypress!');
    cy.get('button').click();
    cy.get('p').contains('Hello, Cypress!');
  });
})
