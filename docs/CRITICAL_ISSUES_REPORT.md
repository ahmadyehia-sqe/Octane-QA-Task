# Critical Issues Report — OStore UAT

**Platform:** https://uat-ostore.vercel.app
**Tested By:** Ahmad Yehia
**Date:** 2026-03-07
**Environment:** Chrome 145 (headless) / Electron / Mobile (375×812)

---

## Summary Table

| Issue # | Title | Severity | Affected Area |
|---------|-------|----------|---------------|
| 1 | Cart Summary Disappears After Cancelling Save Quotation Modal | High | Cart Page |
| 2 | Registration Form Has No Password Field | Critical | Authentication |
| 3 | No Dedicated Quote Request / RFQ Feature | High | B2B Workflow |

---

## Issue 1: Cart Summary Disappears After Cancelling Save Quotation Modal

**Severity:** High
**Component:** Cart Page — Cart Summary Panel
**Environment:** All browsers

**Steps to Reproduce:**
1. Navigate to `/products` and add any product to the cart
2. Navigate to `/cart`
3. Click the **Save Quotation** button in the cart summary (right panel)
4. When the modal appears, click **Cancel**
5. Scroll down the page

**Expected Result:**
The cart summary panel (right side) remains fully visible and in its correct position after closing the modal. The Save Quotation button, Checkout button, and order total should all be accessible.

**Actual Result:**
After clicking Cancel on the Save Quotation modal, the cart summary panel breaks out of its layout position. On scroll, the panel is pushed above the viewport (observed `top: -146px`) making it completely inaccessible to the user. The cart items remain visible but the user can no longer see their total or proceed to checkout.

**Business Impact:**
- Blocks users from proceeding to checkout after exploring the Save Quotation feature
- Users lose visibility of their order total and payment/delivery options
- Directly interrupts the purchase flow — a high-severity UX and revenue impact
- Automated regression test added to detect this: `quote-request.cy.js` — "Save Quotation Modal Interaction"

---

## Issue 2: Registration Form Has No Password Field

**Severity:** Critical
**Component:** Authentication — Registration Modal
**Environment:** All browsers

**Steps to Reproduce:**
1. Navigate to `https://uat-ostore.vercel.app/home`
2. Click **Sign Up** button in the navigation bar
3. Observe the registration modal
4. Review all form fields: Full Name, Company, Email Address, Phone Number

**Expected Result:**
Registration form collects credentials including a Password field (with confirmation), or the system sends a password-setup email after registration.

**Actual Result:**
The modal only collects: Full Name, Company, Email Address, Phone Number — **no password field**. The `/sign-in` form requires a password to log in. Users who register via Sign Up modal have no password set, making it impossible to subsequently log in.

**Business Impact:**
- Breaks the core authentication loop: users can register but cannot log in
- May indicate accounts are created without credential setup — a security risk
- Fleet managers cannot access cart, order history, or checkout after registering
- Directly blocks the revenue-generating user journey

---

## Issue 3: No Dedicated Quote Request / RFQ Feature

**Severity:** High
**Component:** B2B Quote Workflow
**Environment:** All browsers

**Steps to Reproduce:**
1. Navigate to `/products` or any product detail page
2. Look for "Request Quote", "Get Quote", or "RFQ" button
3. Check navigation for a dedicated Quotes section
4. Check user account for quote history

**Expected Result:**
A dedicated RFQ flow: "Request Quote" button on product pages, a bulk order form with quantity/delivery fields, and a quote history in the user account.

**Actual Result:**
No "Request Quote" button exists on product listings or detail pages. The only quote-adjacent feature is a **"Save Quotation"** button on the cart page — requiring products to be in the cart first. The WhatsApp float button appears to be the de-facto quote channel.

**Business Impact:**
- Fleet managers typically request quotes before committing — especially for bulk orders
- Forcing users through the cart flow for "Save Quotation" is friction for B2B workflows
- Reliance on WhatsApp is unscalable and untrackable
- Competitors with self-service RFQ portals have a significant advantage

---

## Additional Observations (Non-Critical)

| # | Observation | Impact |
|---|-------------|--------|
| A | Cart item count badge does not update dynamically after adding items on same page load | Medium UX |
| B | `/login` URL returns a blank page — auth is at `/sign-in`. External links to `/login` would fail | Low |
| C | No "Maintenance" product category (expected per business domain) | Low |
| D | WhatsApp float button covers content on mobile — no dismiss option | Low UX |
