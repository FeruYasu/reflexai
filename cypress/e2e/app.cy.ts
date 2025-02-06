describe('Make a conversation with the bot', () => {
  describe('Starts a new simulation', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/chat-message', (req) => {
        req.reply({
          statusCode: 200,
          body: {
            userMessage: { content: 'Hello!', sender: 'USER', id: 'test-user-message' },
            botMessage: { content: 'Hello, how can I assist you?', sender: 'BOT', id: 'test-bot-message' }
          }
        });
      }).as('postChatMessage');
    });

    it('should navigate to the correct page when Start Simulation is clicked', () => {
      cy.visit('/');
      
      cy.get('div[class*="flex w-96 flex-col rounded bg-white p-4"]')
        .first()
        .within(() => {
          cy.contains('button', 'Start Simulation').click();
        });

        cy.wait(2000);
        cy.location('pathname').should('include', '/chat/');
    })

    it('should send a message and receive a message from the bot', () => {
      cy.get('input[placeholder="Send a message..."]').type('Hello!');
      cy.get('#send-button').click();
      cy.wait('@postChatMessage');
      
      cy.contains('Hello!').should('exist');
      cy.contains('Hello, how can I assist you?').should('exist');
    })
  })
})