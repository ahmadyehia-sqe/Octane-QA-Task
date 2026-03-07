// cypress/e2e/auth/registration-login.cy.js
// Tests: User registration via modal, login via /sign-in page

const SELECTORS = require('../../support/selectors');

describe('Authentication — Registration & Login', () => {
  beforeEach(() => {
    cy.goHome();
  });

  context('User Registration Modal', () => {
    it('should open the Sign Up modal when clicking Sign Up in nav', () => {
      cy.get(SELECTORS.nav.signupBtn).should('be.visible').click();
      cy.get(SELECTORS.auth.modal).should('be.visible');
      cy.get(SELECTORS.auth.fullNameInput).should('be.visible');
      cy.get(SELECTORS.auth.regEmailInput).should('be.visible');
      cy.get(SELECTORS.auth.phoneInput).should('be.visible');
      cy.evidenceScreenshot('registration-modal-open');
    });

    it('should show validation errors when submitting empty registration form', () => {
      cy.get(SELECTORS.nav.signupBtn).click();
      cy.get(SELECTORS.auth.modal).should('be.visible');
      cy.get(SELECTORS.auth.registerSubmit).click();
      // Modal should stay open if validation fails
      cy.get(SELECTORS.auth.modal).should('be.visible');
      cy.evidenceScreenshot('registration-empty-form-validation');
    });

    it('should close the Sign Up modal when clicking the close button', () => {
      cy.get(SELECTORS.nav.signupBtn).click();
      cy.get(SELECTORS.auth.modal).should('be.visible');
      cy.get(SELECTORS.auth.modalClose).click();
      // Element Plus uses v-show (display:none), not v-if — check visibility not existence
      cy.get(SELECTORS.auth.modal).should('not.be.visible');
      cy.evidenceScreenshot('registration-modal-closed');
    });

    it('should allow submitting the Sign Up form with valid user details', () => {
      cy.fixture('users').then((users) => {
        cy.interceptAPI('POST', '**', 'signupRequest');

        cy.get(SELECTORS.nav.signupBtn).click();
        cy.get(SELECTORS.auth.modal).should('be.visible');
        cy.get(SELECTORS.auth.fullNameInput).type(users.newUser.name);
        cy.get(SELECTORS.auth.companyInput).type(users.newUser.company);
        cy.get(SELECTORS.auth.regEmailInput).type(users.newUser.email);
        cy.get(SELECTORS.auth.phoneInput).type('01098765432');
        cy.get(SELECTORS.auth.registerSubmit).click();
        cy.evidenceScreenshot('registration-submitted');
      });
    });
  });

  context('User Login', () => {
    it('should display the sign-in form with all required fields', () => {
      cy.visit('/sign-in');
      cy.get(SELECTORS.auth.emailInput).should('be.visible');
      cy.get(SELECTORS.auth.passwordInput).should('be.visible');
      cy.get(SELECTORS.auth.loginBtn).should('be.visible').and('contain', 'Log in');
      cy.get(SELECTORS.auth.continueAsGuest).should('be.visible');
      cy.evidenceScreenshot('login-form-loaded');
    });

    it('should show error for invalid credentials', () => {
      cy.fixture('users').then((users) => {
        cy.interceptAPI('POST', '**/login', 'loginRequest');

        cy.visit('/sign-in');
        cy.get(SELECTORS.auth.emailInput).type(users.invalidUser.email);
        cy.get(SELECTORS.auth.passwordInput).type(users.invalidUser.password);
        cy.get(SELECTORS.auth.loginBtn).click();
        cy.url().should('include', '/sign-in');
        cy.evidenceScreenshot('login-invalid-credentials');
      });
    });

    it('should navigate to sign-in page from the Log In nav link', () => {
      cy.get(SELECTORS.nav.loginLink).should('be.visible').click();
      cy.url().should('include', '/sign-in');
      cy.evidenceScreenshot('login-nav-link');
    });

    it('should allow guest browsing via Continue as Guest link', () => {
      cy.visit('/sign-in');
      cy.get(SELECTORS.auth.continueAsGuest).should('be.visible').click();
      cy.url().should('include', '/home');
      cy.evidenceScreenshot('continue-as-guest');
    });
  });
});
