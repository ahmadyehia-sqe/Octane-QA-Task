// cypress/support/selectors.js
// Centralized selector map — updated with REAL selectors from site exploration.
// Site: https://uat-ostore.vercel.app (Vue 3 + Element Plus UI)

const SELECTORS = {
  // Navigation (.navigation-Bar container)
  nav: {
    container: '.navigation-Bar',
    home: 'a.logo',
    cart: 'a[href="/cart"]',
    loginLink: 'a.btn-login',           // href="/sign-in"
    signupBtn: 'button.btn-signup',     // opens registration modal
    categoryLinks: 'a.link',            // All Products / Oils / Tires / Batteries
    cartCount: 'a[href="/cart"] span, a[href="/cart"]',
    searchInput: 'input.search-bar',
  },

  // Auth — Sign In page (/sign-in)
  auth: {
    emailInput: 'input.input-field[type="email"]',
    passwordInput: 'input.input-field[type="password"]',
    loginBtn: 'button.btn-lg.btn-bg',           // "Log in" submit button
    continueAsGuest: 'a.btn-continue-guest',
    forgotPassword: 'a.forget',

    // Registration modal (opened via nav signupBtn)
    modal: '.el-dialog',
    modalClose: 'button.el-dialog__headerbtn',
    fullNameInput: 'input.input-field[placeholder="Full Name"]',
    companyInput: 'input.input-field[placeholder="Company"]',
    regEmailInput: 'input.input-field[placeholder="Email Address"]',
    phoneInput: 'input.input-field[placeholder="Phone Number (11 digits)"]',
    registerSubmit: 'button.btn-submit',
  },

  // Products
  products: {
    card: 'div.card.border-0.position-relative.p-0',
    cardLink: 'a.card-body',                           // href="/product-details/:id"
    addToCart: 'button.flying-btn.bg-dark-blue',       // in listings
    addToCartDetail: 'button.btn.bg-dark-blue',        // on product detail page
    price: 'p.product-price',
    name: 'p.product-name',
    description: 'p.product-desc',
    categoryCard: 'a.card[href*="/category"]',
    categoryName: 'h4.category-name',
    searchInput: 'input.search-bar',
    seeAllBtn: 'a.see-all-btn',
  },

  // Cart (/cart)
  cart: {
    emptyMessage: 'body',                          // text: "Your cart is empty."
    goShoppingBtn: 'button, a',                    // "Go Shopping"
    checkoutBtn: 'button.btn',                     // "Checkout" button in cart summary
    saveQuotation: 'button.btn.bg-dark-blue',      // "Save Quotation" button
    couponApply: 'button.btn-apply',
    itemCount: 'a[href="/cart"]',                  // shows count as text (e.g., "1")
    removeLink: 'a, span',                         // "× Remove" on each cart item
    quantityMinus: 'button',                       // decrease quantity
    quantityPlus: 'button',                        // increase quantity
  },

  // Checkout
  checkout: {
    addressInput: '#address, [name="address"], [placeholder*="address" i]',
    submitOrder: 'button[type="submit"], [class*="order"]',
    orderConfirmation: '[class*="success"], [class*="confirm"], [class*="order"]',
  },

  // Quotes (may not be implemented)
  quotes: {
    requestBtn: '[class*="quote"], button:contains("Quote")',
    formContainer: '[class*="quote-form"]',
    submitQuote: 'button[type="submit"]',
    notesInput: 'textarea, [placeholder*="note" i]',
  },

  // Footer
  footer: {
    container: 'footer',
    homeLink: 'footer a[href*="home"]',
    productsLink: 'footer a[href*="products"]',
    contactLink: 'footer a[href*="contact"]',
  },
};

module.exports = SELECTORS;
