// cypress/e2e/catalog/product-browsing.cy.js
// Tests: Homepage categories, product catalog, search

const SELECTORS = require('../../support/selectors');

describe('Product Catalog — Browsing & Search', () => {
  beforeEach(() => {
    cy.goHome();
  });

  context('Homepage & Category Navigation', () => {
    it('should display category links in the navigation bar', () => {
      cy.fixture('products').then((products) => {
        products.categories.forEach((category) => {
          cy.get(SELECTORS.nav.categoryLinks).contains(category).should('be.visible');
        });
        cy.evidenceScreenshot('homepage-categories-nav');
      });
    });

    it('should display product category cards (Shop Collection section)', () => {
      cy.get(SELECTORS.products.categoryCard).should('have.length.greaterThan', 0);
      cy.get(SELECTORS.products.categoryName).first().should('be.visible');
      cy.evidenceScreenshot('homepage-category-cards');
    });

    it('should navigate to Oils category when clicking Oils link', () => {
      cy.interceptAPI('GET', '**/category/**', 'categoryRequest');
      cy.get(SELECTORS.nav.categoryLinks).contains('Oils').click();
      cy.url().should('include', '/category/Oils');
      cy.evidenceScreenshot('oils-category-page');
    });

    it('should navigate to Tires category when clicking Tires link', () => {
      cy.get(SELECTORS.nav.categoryLinks).contains('Tires').click();
      cy.url().should('include', '/category/Tires');
      cy.evidenceScreenshot('tires-category-page');
    });

    it('should navigate to Batteries category when clicking Batteries link', () => {
      cy.get(SELECTORS.nav.categoryLinks).contains('Batteries').click();
      cy.url().should('include', '/category/Batteries');
      cy.evidenceScreenshot('batteries-category-page');
    });

    it('should navigate to All Products page when clicking All Products link', () => {
      cy.get(SELECTORS.nav.categoryLinks).contains('All Products').click();
      cy.url().should('include', '/products');
      cy.evidenceScreenshot('all-products-page');
    });
  });

  context('Desktop Navigation Sidebar', () => {
    it('should display the hamburger menu button and open the sidebar on desktop', () => {
      cy.setDesktopViewport();
      cy.evidenceScreenshot('desktop-nav-before-hamburger');

      // Hamburger button should be visible on desktop
      cy.get('i.bi-list').should('be.visible').click();

      // Sidebar drawer should open after clicking
      cy.get('.el-drawer').should('be.visible');
      cy.evidenceScreenshot('desktop-nav-sidebar-open');
    });
  });

  context('Product Listing', () => {
    beforeEach(() => {
      cy.visit('/products');
    });

    it('should display product cards with name, price, and Add to Cart button', () => {
      cy.get(SELECTORS.products.card).should('have.length.greaterThan', 0);
      cy.get(SELECTORS.products.card).first().within(() => {
        cy.get(SELECTORS.products.name).should('be.visible');
        cy.get(SELECTORS.products.price).should('be.visible');
        cy.get(SELECTORS.products.addToCart).should('be.visible').and('contain', 'Add to cart');
      });
      cy.evidenceScreenshot('product-listing-cards');
    });

    it('should show product prices in EGP currency', () => {
      cy.get(SELECTORS.products.price).first().should('contain', 'EGP');
      cy.evidenceScreenshot('product-prices-currency');
    });

    it('should open product detail page when clicking on a product card', () => {
      cy.get(SELECTORS.products.cardLink).first().click();
      cy.url().should('include', '/product-details/');
      cy.evidenceScreenshot('product-detail-page');
    });
  });

  context('Product Search', () => {
    it('should display search results for a valid search term', () => {
      cy.fixture('products').then((products) => {
        cy.interceptAPI('GET', '**', 'searchRequest');
        cy.get(SELECTORS.nav.searchInput)
          .should('be.visible')
          .clear()
          .type(products.searchTerms.valid);
        cy.get(SELECTORS.products.card).should('have.length.greaterThan', 0);
        cy.evidenceScreenshot('search-results-valid');
      });
    });

    it('should show empty state for a search term with no results', () => {
      cy.fixture('products').then((products) => {
        cy.get(SELECTORS.nav.searchInput)
          .should('be.visible')
          .clear()
          .type(products.searchTerms.noResults);
        cy.get('body').should('contain.text', 'No');
        cy.evidenceScreenshot('search-results-empty');
      });
    });

    it('should navigate to product page via URL for Best Sellers', () => {
      cy.visit('/best-sellers');
      cy.evidenceScreenshot('best-sellers-page');
    });
  });
});
