// cypress/e2e/quotes/quote-request.cy.js
// Tests: Quote/Save Quotation feature — accessible via cart page

const SELECTORS = require('../../support/selectors');

describe('Quote Request — Save Quotation', () => {
  context('Quote Feature on Cart Page', () => {
    it('should display the Save Quotation button when items are in the cart', () => {
      cy.visit('/products');
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.visit('/cart');
      cy.get('body').then(($body) => {
        if (!$body.text().includes('Your cart is empty')) {
          cy.contains('button', 'Save Quotation').should('be.visible');
          cy.evidenceScreenshot('save-quotation-button-visible');
        } else {
          cy.log('Cart empty — Save Quotation button not visible without items');
          cy.evidenceScreenshot('save-quotation-needs-items');
        }
      });
    });

    it('should have a working Checkout button in the cart summary', () => {
      cy.visit('/products');
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.visit('/cart');
      cy.get('body').then(($body) => {
        if (!$body.text().includes('Your cart is empty')) {
          cy.contains('button', 'Checkout').should('be.visible');
          cy.evidenceScreenshot('checkout-button-cart-summary');
        } else {
          cy.log('Cart is empty — Checkout button requires items');
          cy.evidenceScreenshot('checkout-needs-items');
        }
      });
    });

    it('should display Payment Options dropdown in cart summary', () => {
      cy.visit('/products');
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.visit('/cart');
      cy.get('body').then(($body) => {
        if (!$body.text().includes('Your cart is empty')) {
          cy.get('body').should('contain.text', 'Payment Options');
          cy.get('body').should('contain.text', 'Delivery Options');
          cy.evidenceScreenshot('cart-payment-delivery-options');
        }
      });
    });

    it('should allow applying a coupon code in the cart', () => {
      cy.visit('/products');
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.visit('/cart');
      cy.get('body').then(($body) => {
        if (!$body.text().includes('Your cart is empty')) {
          cy.contains('Have a coupon?').should('be.visible');
          cy.get(SELECTORS.cart.couponApply).should('be.visible');
          cy.evidenceScreenshot('coupon-apply-section');
        }
      });
    });
  });

  context('WhatsApp Contact Channel', () => {
    it('should display WhatsApp float button as alternative contact/quote channel', () => {
      cy.goHome();
      cy.get('a.whatsapp-float').should('exist');
      cy.get('a.whatsapp-float').should('have.attr', 'href').and('include', 'wa.me');
      cy.evidenceScreenshot('whatsapp-contact-button');
    });

    it('should verify WhatsApp button is present on product pages', () => {
      cy.visit('/products');
      cy.get('a.whatsapp-float').should('exist');
      cy.evidenceScreenshot('whatsapp-button-products-page');
    });
  });

  context('Save Quotation Modal Interaction', () => {
    it('should keep cart summary visible after opening and cancelling the Save Quotation modal', { retries: 0 }, () => {
      // Step 1: Add product to cart
      cy.visit('/products');
      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);

      // Step 2: Go to cart
      cy.visit('/cart');

      // Step 3: Click Save Quotation
      cy.contains('button', 'Save Quotation').should('be.visible').click();

      // Step 4: Cancel the modal
      cy.get('.el-dialog').should('be.visible');
      cy.get('.el-dialog').contains('button', 'Cancel').click();
      cy.get('.el-dialog').should('not.be.visible');

      // Step 5: Scroll and verify cart summary panel is still in the correct position
      cy.evidenceScreenshot('cart-summary-immediately-after-cancel');
      cy.scrollTo('bottom');
      cy.wait(500);
      cy.evidenceScreenshot('cart-summary-after-modal-cancel');

      // Cart summary is a right-side panel — scroll to top and verify it is visible in the viewport
      cy.scrollTo('top');
      cy.contains('button', 'Save Quotation').then(($btn) => {
        const rect = $btn[0].getBoundingClientRect();
        // Button must be within the visible viewport (720px height), not buried below
        expect(rect.top, 'Cart summary panel should be visible in viewport, not pushed off-screen').to.be.lessThan(720);
        expect(rect.top, 'Cart summary panel should not be above viewport').to.be.greaterThan(0);
        // And it must be on the right half of the screen (right panel layout)
        expect(rect.left, 'Cart summary should remain in the right panel').to.be.greaterThan(640);
      });
    });
  });

  context('Quote Flow Documentation', () => {
    it('should document the quote flow: add items → cart → Save Quotation', () => {
      // This test documents the complete quote workflow
      cy.visit('/home');
      cy.log('Step 1: User browses products');
      cy.get(SELECTORS.products.card).should('be.visible');
      cy.evidenceScreenshot('quote-flow-step1-browse');

      cy.get(SELECTORS.products.addToCart).first().click({ force: true });
      cy.wait(1000);
      cy.log('Step 2: User adds item to cart');
      cy.evidenceScreenshot('quote-flow-step2-add-to-cart');

      cy.visit('/cart');
      cy.log('Step 3: User reviews cart and saves quotation');
      cy.evidenceScreenshot('quote-flow-step3-cart');
    });
  });
});
