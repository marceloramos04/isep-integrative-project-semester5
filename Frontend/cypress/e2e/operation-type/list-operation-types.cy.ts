describe('ListOperationTypesComponent', () => {
  beforeEach(() => {
    cy.visit('/admin-view/list-operation-types'); // Substitua pelo caminho correto para o componente
  });

  it('should load the page and display the form', () => {
    cy.get('form').should('exist');
    cy.get('#name-field').should('exist');
    cy.get('#specialization-field').should('exist');
  });

  it('should allow the user to enter a name and specialization', () => {
    cy.get('#name-field input').type('Surgery');
    cy.get('#specialization-field mat-select').click();
    cy.get('mat-option').contains('Cardiology').click();

    cy.get('#name-field input').should('have.value', 'Surgery');
    cy.get('#specialization-field mat-select').should('contain', 'Cardiology');
  });

  it('should clear the name field when the clear button is clicked', () => {
    cy.get('#name-field input').type('Surgery');
    cy.get('#name-field button').click();
    cy.get('#name-field input').should('have.value', '');
  });

  it('should clear the specialization field when the clear button is clicked', () => {
    cy.get('#specialization-field mat-select').click();
    cy.get('mat-option').contains('Cardiology').click();
    cy.get('#specialization-field button').click();
    cy.get('#specialization-field mat-select').should('not.contain', 'Cardiology');
  });

  it('should submit the form and display results', () => {
    cy.get('#name-field input').type('Surgery');
    cy.get('#specialization-field mat-select').click();
    cy.get('mat-option').contains('Cardiology').click();
    cy.get('form').submit();

    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.greaterThan', 0);
  });

  it('should navigate to the operation type details page when a row is clicked', () => {
    cy.get('form').submit();

    cy.get('table tbody #item-from-list').first().click().invoke('attr', 'data-id').then((id) => {
      cy.url().should('include', `/admin-view/operation-type-details/${id}`);
    });
  });
});