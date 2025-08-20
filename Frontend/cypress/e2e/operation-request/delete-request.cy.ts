describe('Delete Request', () => {
    beforeEach(() => {
        // Visita a página de detalhes de uma solicitação específica
        cy.visit('/doctor-view/request-details/2'); // Substitua '2' pelo ID válido
    });

    it('should display request details', () => {
        // Verifica se o título da página é exibido corretamente
        cy.get('#mat-toolbar').should('contain', 'Doctor Dashboard');

        // Valida a presença dos detalhes da solicitação usando seletores mais específicos
        cy.get('[data-cy="patient-medical-record"]').should('contain', 'Patient Medical Record Number');
        cy.get('[data-cy="patient-name"]').should('contain', 'Patient Name');
        cy.get('[data-cy="operation-type"]').should('contain', 'Operation Type Name');
        cy.get('[data-cy="priority"]').should('contain', 'Priority');
        cy.get('[data-cy="deadline"]').should('contain', 'Deadline');
    });

    it('should delete the request', () => {
        // Clica no botão de deletar
        cy.get('[data-cy="delete-button"]').click();

        // Aguarda e valida que o diálogo de confirmação aparece
        cy.get('mat-dialog-content').should('be.visible');
        cy.get('mat-dialog-content').should('contain', 'Are you sure you want to delete this operation request?');

        // Confirma a exclusão clicando no botão "Yes"
        cy.get('[data-cy="confirm-delete-button"]').click();

        // Verifica se foi redirecionado para a página de listagem
        cy.url().should('include', '/doctor-view/list-requests');

        // Valida que a mensagem de sucesso é exibida
        cy.get('body').should('contain', 'Request deleted successfully');

        // Opcional: verifica que a solicitação não está mais na lista
        cy.get('[data-cy="request-list"]').should('not.contain', 'Request ID: 2');
    });
});
