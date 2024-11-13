describe('Appointments page should be visible', () => {
  it('should work as expected', () => {
    cy.visit('http://localhost:3000/login');
    // @ts-ignore
    cy.loginByGoogleApi('http://localhost:3000/dashboard/appointments');
  });
});
