describe('Landing page should be visible', () => {
  it('should be visible and complete', () => {
    cy.visit('http://localhost:3000/');

    // this page should contain a section with an id of hero
    cy.get('section#hero').should('exist');
    // this section should contain a title
    cy.get('section#hero h1').should('exist');
    // this section should contain a link with the text Start Free Trial
    cy.get('section#hero a').should('contain', 'Start Free Trial');

    // this page should contain a section with an id of features
    cy.get('section#features').should('exist');
    // this section should contain 6 h3 elements
    cy.get('section#features h3').should('have.length', 6);

    // // this page should contain a section with an id of demo
    // cy.get('section#demo').should('exist');
    // // this section should contain a video
    // cy.get('section#demo iframe').should('exist');

    // this page should contain a section with an id of faq
    cy.get('section#faq').should('exist');
    // this section should contain 6 h3 elements
    cy.get('section#faq h3').should('have.length', 5);

    // this page should contain a section with an id of common-issues
    cy.get('section#common-issues').should('exist');
    // this section should contain 6 h3 elements
    cy.get('section#common-issues h3').should('have.length', 6);

    // this page should contain a section with an id of testimonials
    cy.get('section#testimonials').should('exist');

    // // this page should contain a section with an id of pricing
    // cy.get('section#pricing').should('exist');
    // // this section should contain a button
    // cy.get('section#pricing button').should('exist');

    // this page should contain a footer
    cy.get('footer').should('exist');
  });
});
