# OStore UAT — E2E Automation Test Suite

Automated end-to-end test suite for [OStore UAT](https://uat-ostore.vercel.app/home), a B2B e-commerce platform for fleet managers ordering Oils, Tires, Batteries, and maintenance products.

## Tech Stack

| Tool | Version |
|------|---------|
| Framework | Cypress 15.11.0 |
| Language | JavaScript (ES6+) |
| Reporter | Mochawesome (HTML + JSON) |
| Browsers | Chrome, Electron, Mobile (iPhone X viewport) |
| Node.js | 18+ LTS |

## Quick Start

### Prerequisites

- Node.js 18+ (LTS)
- npm 9+
- Chrome browser

### Installation

```bash
git clone <repo-url>
cd octane-qa-task
npm install
```

### Run Tests

```bash
# Open Cypress GUI
npm run cy:open

# Run all tests (Chrome)
npm run cy:run:chrome

# Run all tests (Electron)
npm run cy:run

# Run mobile viewport tests
npm run cy:run:mobile

# Run full suite + generate report
npm run test:full
```

## Project Structure

```
octane-qa-task/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── registration-login.cy.js      # Sign up modal + sign-in page
│   │   ├── catalog/
│   │   │   └── product-browsing.cy.js        # Categories, products, search
│   │   ├── cart/
│   │   │   └── cart-management.cy.js         # Cart add/remove/navigate
│   │   ├── checkout/
│   │   │   └── order-flow.cy.js              # Product → cart → checkout flow
│   │   ├── quotes/
│   │   │   └── quote-request.cy.js           # Save Quotation + WhatsApp
│   │   ├── localization/
│   │   │   └── language-switching.cy.js      # EN/AR localization checks
│   │   ├── responsive/
│   │   │   └── mobile-responsiveness.cy.js   # Mobile viewport (iPhone X)
│   │   └── tracking/
│   │       └── order-tracking.cy.js          # Order tracking routes
│   ├── fixtures/
│   │   ├── users.json                        # Test user data
│   │   ├── products.json                     # Product/category data
│   │   └── orders.json                       # Order/quote data
│   └── support/
│       ├── commands.js                       # Custom Cypress commands
│       ├── e2e.js                            # Global hooks
│       └── selectors.js                      # Centralized DOM selector map
├── docs/
│   ├── CRITICAL_ISSUES_REPORT.md            # 3 critical bugs found
│   ├── TEST_REPORT_MATRIX.md                # Pass/fail matrix by browser
│   └── PRIORITIZATION_RATIONALE.md          # Risk-based priority reasoning
├── reports/                                  # Mochawesome HTML/JSON reports
├── cypress.config.js
└── package.json
```

## Test Results

### 76 Tests — 8 Scenarios — 94.7% Pass Rate

| # | Scenario | Tests | Chrome | Electron | Mobile |
|---|----------|-------|--------|----------|--------|
| 1 | Registration & Login | 8 | ✅ | ✅ | ✅ |
| 2 | Product Browsing & Search | 13 | ❌ 12/13 | ❌ 12/13 | ❌ 12/13 |
| 3 | Cart Management | 9 | ✅ | ✅ | ✅ |
| 4 | Full Checkout Flow | 8 | ❌ 7/8 | ❌ 7/8 | ❌ 7/8 |
| 5 | Quote Request | 8 | ❌ 7/8 | ❌ 7/8 | ❌ 7/8 |
| 6 | Arabic/English Localization | 8 | ✅ | ✅ | ✅ |
| 7 | Mobile Responsiveness | 13 | ❌ 12/13 | ❌ 12/13 | ❌ 12/13 |
| 8 | Order Tracking | 9 | ✅ | ✅ | ✅ |

> Firefox was not installed on the test machine. Electron (Chromium-based, bundled with Cypress) was used as the second desktop browser.

## Critical Issues Found

See [docs/CRITICAL_ISSUES_REPORT.md](docs/CRITICAL_ISSUES_REPORT.md) for full details.

| # | Issue | Severity |
|---|-------|----------|
| 1 | Cart summary disappears after cancelling Save Quotation modal | High |
| 2 | Registration form has no password field | Critical |
| 3 | Order Complete page (Step 3) renders blank | Low |

## Prioritization Rationale

See [docs/PRIORITIZATION_RATIONALE.md](docs/PRIORITIZATION_RATIONALE.md) for the full risk-based analysis.

**Go/No-Go:** ❌ NOT ready for production — Issue #2 (broken auth loop) is a launch blocker, and Issue #1 (cart summary layout break) directly disrupts the checkout flow.

## Architecture Decisions

### Centralized Selector Map (`selectors.js`)
All DOM selectors live in one file. When the UI changes, update selectors in one place — tests stay stable. Selectors use a fallback chain pattern where needed.

### Custom Commands (`commands.js`)
Reusable commands (`cy.login()`, `cy.register()`, `cy.addProductToCart()`) abstract repetitive flows. Tests read like user stories, not implementation details.

### Minimal `cy.wait(ms)`
Timing relies primarily on `cy.intercept()` for API waits and natural Cypress retrying. Short `cy.wait()` calls are used only where UI animations require a brief settle time before assertions.

### Fixture-Driven Data
All test data (users, products, orders) lives in `cypress/fixtures/`. Zero hardcoded values in test files.

## Video Demo

| Scenario | Link |
|----------|------|
| Checkout Order Flow (all 8 tests) | [Watch on Google Drive](https://drive.google.com/file/d/1vHGKvWdI18xFK41ixqHICWpAt4iSgQJR/view?usp=sharing) |

## Future Improvements

- [ ] Firefox support (install Firefox locally)
- [ ] CI/CD pipeline with GitHub Actions (run on PR)
- [ ] Authenticated test suite (requires valid test account credentials)
- [ ] Visual regression testing with Percy
- [ ] API-level test layer for faster execution
- [ ] Full Arabic localization tests once BUG-002 is fixed
