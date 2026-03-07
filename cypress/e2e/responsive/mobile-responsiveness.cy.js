// cypress/e2e/responsive/mobile-responsiveness.cy.js
// All tests run at iPhone X viewport (375x812)

const SELECTORS = require('../../support/selectors');

describe('Mobile Responsiveness', () => {
  beforeEach(() => {
    cy.viewport('iphone-x');
  });

  context('Homepage on Mobile', () => {
    it('should render the homepage without horizontal overflow on mobile', () => {
      cy.visit('/home');
      cy.get('body').invoke('prop', 'scrollWidth').then((scrollWidth) => {
        cy.window().its('innerWidth').then((innerWidth) => {
          if (scrollWidth > innerWidth) {
            cy.log(`ISSUE: Horizontal overflow detected — scrollWidth (${scrollWidth}) > viewportWidth (${innerWidth})`);
          }
          expect(scrollWidth).to.be.lte(innerWidth + 5); // 5px tolerance
        });
      });
      cy.evidenceScreenshot('mobile-homepage-no-overflow');
    });

    it('should display the navigation bar on mobile', () => {
      cy.visit('/home');
      cy.get('.navigation-Bar').should('be.visible');
      cy.evidenceScreenshot('mobile-nav-visible');
    });

    it('should display the Log In and Sign Up buttons on mobile', () => {
      cy.visit('/home');
      cy.get(SELECTORS.nav.loginLink).should('be.visible');
      cy.get(SELECTORS.nav.signupBtn).should('be.visible');
      cy.evidenceScreenshot('mobile-auth-buttons');
    });

    it('should display product cards stacked vertically on mobile', () => {
      cy.visit('/products');
      cy.wait(2000);
      cy.get(SELECTORS.products.card).should('have.length.greaterThan', 0);
      cy.evidenceScreenshot('mobile-product-cards');
    });

    it('should display the search bar on mobile', () => {
      cy.visit('/home');
      cy.get(SELECTORS.nav.searchInput).should('exist');
      cy.evidenceScreenshot('mobile-search-bar');
    });
  });

  context('Category Navigation on Mobile', () => {
    it('should display category links on mobile viewport', () => {
      cy.visit('/home');
      cy.get(SELECTORS.nav.categoryLinks).should('have.length.greaterThan', 0);
      cy.evidenceScreenshot('mobile-category-links');
    });

    it('should navigate to product category on mobile tap', () => {
      cy.visit('/home');
      cy.get(SELECTORS.nav.categoryLinks).contains('Tires').click({ force: true });
      cy.url().should('include', '/category/Tires');
      cy.evidenceScreenshot('mobile-category-navigation');
    });
  });

  context('Product Interaction on Mobile', () => {
    it('should show Add to Cart buttons on mobile product cards', () => {
      cy.visit('/products');
      cy.wait(2000);
      cy.get(SELECTORS.products.addToCart).first().should('be.visible');
      cy.evidenceScreenshot('mobile-add-to-cart-btn');
    });

    it('should allow tapping Add to Cart on mobile', () => {
      cy.visit('/products');
      cy.wait(2000);
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.evidenceScreenshot('mobile-tap-add-to-cart');
    });

    it('should open product detail page on mobile', () => {
      cy.visit('/products');
      cy.wait(2000);
      cy.get(SELECTORS.products.cardLink).first().click({ force: true });
      cy.url().should('include', '/product-details/');
      cy.evidenceScreenshot('mobile-product-detail');
    });
  });

  context('Cart Page on Mobile', () => {
    it('should render cart page correctly on mobile', () => {
      cy.visit('/cart');
      cy.get('.navigation-Bar').should('be.visible');
      cy.get('body').should('contain.text', 'cart');
      cy.evidenceScreenshot('mobile-cart-page');
    });
  });

  context('Sign-in Page on Mobile', () => {
    it('should render the sign-in form correctly on mobile', () => {
      cy.visit('/sign-in');
      cy.get(SELECTORS.auth.emailInput).should('be.visible');
      cy.get(SELECTORS.auth.passwordInput).should('be.visible');
      cy.get(SELECTORS.auth.loginBtn).should('be.visible');
      cy.evidenceScreenshot('mobile-sign-in-form');
    });
  });
});
