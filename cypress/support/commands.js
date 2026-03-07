// cypress/support/commands.js
const SELECTORS = require('./selectors');

// --- Authentication ---
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/sign-in');
  cy.get(SELECTORS.auth.emailInput).should('be.visible').clear().type(email);
  cy.get(SELECTORS.auth.passwordInput).should('be.visible').clear().type(password);
  cy.get(SELECTORS.auth.loginBtn).click();
  cy.url().should('not.include', '/sign-in');
});

Cypress.Commands.add('openSignupModal', () => {
  cy.get(SELECTORS.nav.signupBtn).click();
  cy.get(SELECTORS.auth.modal).should('be.visible');
});

Cypress.Commands.add('register', (userData) => {
  cy.openSignupModal();
  cy.get(SELECTORS.auth.fullNameInput).should('be.visible').type(userData.name);
  if (userData.company) {
    cy.get(SELECTORS.auth.companyInput).type(userData.company);
  }
  cy.get(SELECTORS.auth.regEmailInput).type(userData.email);
  cy.get(SELECTORS.auth.phoneInput).type(userData.phone);
  cy.get(SELECTORS.auth.registerSubmit).click();
});

// --- Product Interactions ---
Cypress.Commands.add('addProductToCart', (productIndex = 0) => {
  cy.get(SELECTORS.products.card)
    .eq(productIndex)
    .find(SELECTORS.products.addToCart)
    .click({ force: true });
});

Cypress.Commands.add('searchProduct', (query) => {
  cy.get(SELECTORS.products.searchInput)
    .should('be.visible')
    .clear()
    .type(query);
});

// --- Cart ---
Cypress.Commands.add('goToCart', () => {
  cy.get(SELECTORS.nav.cart).click();
  cy.url().should('include', '/cart');
});

Cypress.Commands.add('verifyCartNotEmpty', () => {
  cy.get(SELECTORS.cart.item).should('have.length.greaterThan', 0);
});

// --- Navigation ---
Cypress.Commands.add('goHome', () => {
  cy.visit('/home');
  cy.url().should('include', '/home');
});

// --- Language (not implemented on site — documented as Critical Issue) ---
Cypress.Commands.add('switchLanguage', () => {
  cy.log('WARNING: Language switcher not found on this site — skipping');
});

// --- Responsive ---
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport('iphone-x');
});

Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 720);
});

// --- API Intercepts ---
Cypress.Commands.add('interceptAPI', (method, urlPattern, alias) => {
  cy.intercept(method, urlPattern).as(alias);
});

// --- Screenshots for Bug Reports ---
Cypress.Commands.add('evidenceScreenshot', (name) => {
  cy.screenshot(`evidence/${name}`, { capture: 'fullPage' });
});
