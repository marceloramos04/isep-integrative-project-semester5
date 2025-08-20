describe('PatientDetailsByDoctorComponent', () => {
  beforeEach(() => {
    cy.intercept('GET', '/Patient/*', { fixture: 'patient.json' }).as('getPatient');
    cy.intercept('GET', '/medical-records/*', { fixture: 'medical-record.json' }).as('getMedicalRecord');
    cy.visit('doctor-view/patients/202501000001');
  });

  it('should display patient details', () => {
    cy.get('#firstName').should('contain', 'Jane');
    cy.get('#lastName').should('contain', 'Doe');
    cy.get('#email').should('contain', 'jane@test.com');
    cy.get('#phone').should('contain', '2222222');
  });

  it('should display allergies tab', () => {
    cy.get('mat-tab-group').contains('Allergies').click();
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length', 2);
  });

  it('should display medical conditions tab', () => {
    cy.get('mat-tab-group').contains('Medical Conditions').click();
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length', 2);
  });

  it('should sort allergies table by name', () => {
    cy.get('mat-tab-group').contains('Allergies').click();
    cy.get('th.mat-sort-header').contains('Name').click();
    cy.get('table tbody tr:first-child td').first().should('contain', 'Milk Allergy');
  });

  it('should filter allergies', () => {
    cy.get('mat-tab-group').contains('Allergies').click();
    cy.get('input[matInput]').type('Peanut');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr td').first().should('contain', 'Peanut');
  });

  it('should filter medical conditions', () => {
    cy.get('mat-tab-group').contains('Medical Conditions').click();
    cy.get('input[matInput]').type('Diabetes');
    cy.get('table tbody tr').should('have.length', 1);
    cy.get('table tbody tr td').first().invoke('text').then((text) => {
      expect(text.trim().toLowerCase()).to.contain('diabetes');
    });
  });  
});