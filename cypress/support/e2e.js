// cypress/support/e2e.js
import './commands';

// Global error handling — don't fail on uncaught app errors
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Uncaught exception:', err.message);
  return false; // prevent test failure on app-side errors
});

// Log test name before each test
beforeEach(() => {
  cy.log(`**Running:** ${Cypress.currentTest.title}`);
});
