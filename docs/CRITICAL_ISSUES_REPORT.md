# Critical Issues Report — OStore UAT

**Platform:** https://uat-ostore.vercel.app
**Tested By:** QA Automation Engineer
**Date:** 2026-03-07
**Environment:** Chrome 145 (headless) / Electron / Mobile (375×812)

---

## Summary Table

| Issue # | Title | Severity | Affected Area |
|---------|-------|----------|---------------|
| 1 | No Arabic Localization / Language Switcher | Critical | Entire Platform |
| 2 | Registration Form Has No Password Field | Critical | Authentication |
| 3 | No Dedicated Quote Request / RFQ Feature | High | B2B Workflow |

---

## Issue 1: No Arabic Localization / Language Switcher

**Severity:** Critical
**Component:** Navigation / Global UI
**Environment:** All browsers / All viewports

**Steps to Reproduce:**
1. Navigate to `https://uat-ostore.vercel.app/home`
2. Examine the navigation bar and footer for a language toggle
3. Inspect `<html>` element for `lang` or `dir` attributes

**Expected Result:**
A language toggle (EN/AR) visible in navigation. Clicking "AR" switches UI to Arabic with RTL layout, Arabic translations for all nav items, buttons, and labels.

**Actual Result:**
No language switcher exists anywhere on the platform. The `<html>` element has no `lang` or `dir` attribute. The UI is English-only with LTR layout. Product descriptions sometimes contain Arabic text (content supports Arabic), but no UI-level localization is implemented.

**Business Impact:**
The platform targets Qatar and the wider Middle East — a predominantly Arabic-speaking region. Missing Arabic localization:
- Directly excludes fleet managers who prefer Arabic
- Reduces trust and adoption in the primary target market
- Fails accessibility standards (`lang` attribute missing)
- Is a critical gap for any B2B platform serving the GCC region

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
