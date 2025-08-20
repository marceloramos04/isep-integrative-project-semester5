describe('RegisterPatientComponent', () => {
  beforeEach(() => {
    // Visitar a página onde o componente está renderizado
    cy.visit('admin-view/register-patients'); // Substitua pelo caminho correto da rota

  });

  it('should register a new patient successfully', () => {
    // Preencher o campo "First Name"
    cy.get('[formControlName="firstName"]').type('John');
    // Preencher o campo "Last Name"
    cy.get('[formControlName="lastName"]').type('Doe');
    // Preencher o campo "Phone Number"
    // cy.get('[formControlName="phoneNumber"]', { timeout: 50000 }).type('1234567890'
    cy.get('#phone-field', { timeout: 50000 }).type('1234567890'
      // , {force: true}
    );
    // Preencher o campo "Email"
    cy.get('[formControlName="email"]').type('john.doe@example.com');
    // Preencher o campo "Emergency Contact"
    // cy.get('[formControlName="emergencyContact"]', { timeout: 50000 }).type('0987654321'
    cy.get('#emergency-field', { timeout: 50000 }).type('0987654321', {force: true});
    // Selecionar a data de nascimento
    cy.get('[formControlName="dateOfBirth"]').type('1990-01-01'); // Formato dependente da implementação
    // Selecionar o gênero
    cy.get('mat-select[formControlName="gender"]').click();
    cy.get('mat-option').contains('Male').click();

    // Submeter o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se a submissão foi bem-sucedida
    cy.contains('Patient added successfully').should('be.visible');
  });

  it('should display validation errors if the form is incomplete', () => {
    // Submeter o formulário vazio
    cy.get('button[type="submit"]').click();

    // Verificar mensagens de erro para cada campo obrigatório
    cy.contains('First name is required').should('be.visible');
    cy.contains('Last name is required').should('be.visible');
    cy.contains('Phone Number is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Emergency contact is required').should('be.visible');
    cy.contains('Specialization is required').should('be.visible'); // Para o campo Gender
  });
});
