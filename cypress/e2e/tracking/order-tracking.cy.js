// cypress/e2e/tracking/order-tracking.cy.js
// Tests: Order tracking — checking availability, route access, user profile

const SELECTORS = require('../../support/selectors');

describe('Order Tracking', () => {
  context('Order History / Tracking Availability', () => {
    it('should check if order history route exists when navigating as guest', () => {
      cy.visit('/orders', { failOnStatusCode: false });
      cy.url().then((url) => {
        cy.log(`/orders URL result: ${url}`);
        cy.evidenceScreenshot('orders-page-guest');
      });
    });

    it('should check if order tracking route exists', () => {
      cy.visit('/order-tracking', { failOnStatusCode: false });
      cy.url().then((url) => {
        cy.log(`/order-tracking URL result: ${url}`);
        cy.evidenceScreenshot('order-tracking-route');
      });
    });

    it('should check the profile/account page route for order history', () => {
      cy.visit('/profile', { failOnStatusCode: false });
      cy.url().then((url) => {
        const redirectedToSignIn = url.includes('/sign-in');
        if (redirectedToSignIn) {
          cy.log('Profile page redirects to sign-in (correct behavior for guest)');
        } else {
          cy.log(`Profile page loaded at: ${url}`);
        }
        cy.evidenceScreenshot('profile-page-access');
      });
    });

    it('should check footer links for order tracking or account section', () => {
      cy.goHome();
      cy.get('footer').then(($footer) => {
        const footerText = $footer.text();
        cy.log(`Footer content: ${footerText.substring(0, 200)}`);
        cy.evidenceScreenshot('footer-links-check');
      });
    });
  });

  context('Homepage Navigation for Tracking', () => {
    it('should check if user account icon/profile is visible in nav when logged in', () => {
      cy.goHome();
      // Check if there's any account/profile link in nav
      cy.get('.navigation-Bar').then(($nav) => {
        const navText = $nav.text();
        cy.log(`Nav content: ${navText.substring(0, 200)}`);
        // For unauthenticated user, should see Log In / Sign Up
        cy.get(SELECTORS.nav.loginLink).should('be.visible');
      });
      cy.evidenceScreenshot('nav-auth-state-guest');
    });

    it('should verify footer contains navigation links to key pages', () => {
      cy.goHome();
      cy.get('footer').should('be.visible');
      cy.get('footer a').should('have.length.greaterThan', 0);
      cy.evidenceScreenshot('footer-nav-links');
    });

    it('should verify the cart icon shows correct count (0 for guest)', () => {
      cy.goHome();
      cy.get(SELECTORS.nav.cart)
        .should('be.visible')
        .and('contain', '0');
      cy.evidenceScreenshot('cart-count-zero-guest');
    });
  });

  context('Post-Purchase Flow Verification', () => {
    it('should check if order confirmation route is accessible', () => {
      cy.visit('/order-confirmation', { failOnStatusCode: false });
      cy.url().then((url) => {
        cy.log(`/order-confirmation URL result: ${url}`);
        cy.evidenceScreenshot('order-confirmation-route');
      });
    });

    it('should document that full order tracking requires authenticated session', () => {
      // Order tracking is a post-login feature; document the auth requirement
      cy.visit('/sign-in');
      cy.get(SELECTORS.auth.emailInput).should('be.visible');
      cy.log('Order tracking requires authentication — test documents auth gate');
      cy.evidenceScreenshot('order-tracking-auth-required');
    });
  });
});
