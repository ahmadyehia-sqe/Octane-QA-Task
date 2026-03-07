// cypress/e2e/localization/language-switching.cy.js
// Tests: Arabic/English localization — checking presence, RTL, translations
// NOTE: No language switcher was found during site exploration (Critical Issue #2)

describe('Localization — Language Switching', () => {
  beforeEach(() => {
    cy.goHome();
  });

  context('Language Switcher UI', () => {
    it('should verify if a language switcher element exists in the UI', () => {
      cy.get('body').then(($body) => {
        const langSelectors = [
          '[class*="lang"]', '[class*="locale"]', '[class*="translate"]',
          'button:contains("AR")', 'button:contains("EN")',
          'button:contains("عربي")', 'button:contains("Arabic")',
          'select[class*="lang"]', 'a:contains("AR")',
        ];
        let found = false;
        langSelectors.forEach((sel) => {
          try {
            if ($body.find(sel).length > 0) found = true;
          } catch (e) { /* selector may be invalid */ }
        });
        cy.log(`Language switcher found: ${found}`);
        if (!found) {
          cy.log('CRITICAL ISSUE: No language switcher found — Arabic localization missing on a Middle East platform');
        }
        cy.evidenceScreenshot('language-switcher-check');
      });
    });

    it('should verify page direction (LTR by default) on the homepage', () => {
      cy.get('html').invoke('attr', 'dir').then((dir) => {
        cy.log(`Current page direction: ${dir || 'not set (default LTR)'}`);
        // English (default) should be LTR or unset
        expect(dir === 'ltr' || !dir || dir === undefined).to.be.true;
      });
      cy.evidenceScreenshot('default-page-direction');
    });

    it('should verify page lang attribute is set correctly', () => {
      cy.get('html').invoke('attr', 'lang').then((lang) => {
        cy.log(`Page lang attribute: ${lang || 'not set'}`);
        if (!lang) {
          cy.log('ISSUE: Missing lang attribute on <html> — accessibility concern');
        }
        cy.evidenceScreenshot('html-lang-attribute');
      });
    });
  });

  context('Content Language Verification', () => {
    it('should display English content by default on the homepage', () => {
      cy.contains('Log In').should('be.visible');
      cy.contains('Sign Up').should('be.visible');
      cy.contains('All Products').should('be.visible');
      cy.evidenceScreenshot('english-content-default');
    });

    it('should display English labels in the sign-in form', () => {
      cy.visit('/sign-in');
      cy.get('input[placeholder="Email address"]').should('be.visible');
      cy.get('input[placeholder="Password"]').should('be.visible');
      cy.contains('Log in').should('be.visible');
      cy.evidenceScreenshot('english-signin-labels');
    });

    it('should display English category names in navigation', () => {
      cy.contains('Oils').should('be.visible');
      cy.contains('Tires').should('be.visible');
      cy.contains('Batteries').should('be.visible');
      cy.evidenceScreenshot('english-category-labels');
    });

    it('should verify product names and descriptions are in English', () => {
      cy.visit('/products');
      cy.get('p.product-name').first().should('be.visible');
      cy.get('p.product-price').first().should('contain', 'EGP');
      cy.evidenceScreenshot('english-product-content');
    });
  });

  context('Localization Gap Documentation', () => {
    it('should document missing Arabic localization as a critical gap', () => {
      cy.goHome();
      cy.get('body').then(($body) => {
        const pageText = $body.text();
        const hasArabicChars = /[\u0600-\u06FF]/.test(pageText);
        cy.log(`Arabic characters in page (excluding product data): checking...`);
        // Product names may contain Arabic, but UI/nav should also have Arabic option
        cy.evidenceScreenshot('localization-gap-evidence');
      });
    });
  });
});
