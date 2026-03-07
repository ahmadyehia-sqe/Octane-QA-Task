# Test Scenario Prioritization Rationale

**Project:** OStore UAT — E2E Test Suite
**Platform:** Fleet management e-commerce (Oils, Tires, Batteries)
**Market:** Qatar / GCC Region (B2B fleet managers)

---

## Methodology

Scenarios were prioritized using a **risk-based testing approach**, evaluating four dimensions:

| Dimension | Definition |
|-----------|-----------|
| **Business Impact** | Revenue and operational risk if the feature fails |
| **User Frequency** | How often fleet managers use this feature per session |
| **Failure Likelihood** | Probability of defects based on complexity and UAT stage |
| **Compliance / Security** | Authentication, data protection, and regulatory requirements |

---

## Priority Breakdown

### HIGH Priority — Scenarios 1–5 (Core Purchase Path)

These cover the end-to-end revenue flow. A fleet manager's primary workflow is:

```
Register/Login → Browse Products → Add to Cart → Checkout OR Save Quotation
```

Any failure in this chain **directly blocks revenue and customer retention**.

---

**Scenario 1 — Registration & Login**
- **Business Impact:** Critical — gate to all functionality
- **User Frequency:** Every session
- **Rationale:** A broken auth flow means zero users can transact. Discovered during testing: registration has no password field (BUG-001), making the sign-up → sign-in loop broken for new users. This is the highest-risk feature.

---

**Scenario 2 — Product Browsing & Search**
- **Business Impact:** Critical — discovery is prerequisite to purchase
- **User Frequency:** Every session
- **Rationale:** Fleet managers need to quickly locate specific products by category (Oils, Tires, Batteries) and by search. Catalog failures waste operational time — especially for managers ordering for large fleets under time pressure.

---

**Scenario 3 — Cart Management**
- **Business Impact:** Critical — cart is the aggregation point for orders
- **User Frequency:** Every order
- **Rationale:** B2B orders often involve multiple SKUs, specific quantities, and price verification before checkout. Cart accuracy is non-negotiable. Any bug here (incorrect totals, items disappearing) directly causes order errors that are costly in a fleet context.

---

**Scenario 4 — Full Checkout Flow**
- **Business Impact:** Critical — the revenue endpoint
- **User Frequency:** Every order
- **Rationale:** Every broken checkout = direct lost revenue. Testing revealed the checkout process requires authentication, which intersects with BUG-001 (broken registration). The checkout flow also surfaces important UX: Payment Options (Cash) and Delivery Options are visible pre-authentication.

---

**Scenario 5 — Quote Request**
- **Business Impact:** High — B2B differentiator
- **User Frequency:** Frequent for bulk orders
- **Rationale:** Fleet managers often request quotes before committing to purchases, especially for large quantities. The "Save Quotation" feature in the cart is a critical B2B capability. Testing revealed BUG-003: no standalone RFQ form — quotes are only accessible post-cart. This limits the platform's B2B competitiveness.

---

### MEDIUM Priority — Scenarios 6–8 (Experience & Retention)

These affect user experience and market reach but don't immediately block core transactions.

---

**Scenario 6 — Arabic / English Localization**
- **Business Impact:** High for market penetration, Medium for immediate revenue
- **User Frequency:** Varies by region; High for Arabic-speaking users
- **Rationale:** Saudi Arabia and GCC fleet managers expect Arabic as a first-class language. Testing confirmed BUG-002: no language switcher exists. This is rated Medium priority for test execution (tests still pass in English), but the underlying defect is Critical for go-live readiness.

---

**Scenario 7 — Mobile Responsiveness**
- **Business Impact:** Medium — field use cases important but secondary to desktop
- **User Frequency:** Occasional (field supervisors using mobile)
- **Rationale:** Fleet managers may use mobile devices to check orders while in the field. Testing confirmed the mobile experience is functional — no horizontal overflow, navigation is accessible, product cards render correctly, and Add to Cart works on touch viewports.

---

**Scenario 8 — Order Tracking**
- **Business Impact:** Medium — post-purchase feature
- **User Frequency:** Post-order, per delivery
- **Rationale:** Order tracking is important for fleet managers managing delivery timelines, but orders can be placed without it. The feature appears to be behind authentication — testing confirmed the auth gate. A fully authenticated order tracking flow was not tested (requires valid credentials).

---

## Risk Assessment Matrix

| Scenario | Business Impact | User Frequency | Failure Likelihood | Overall Risk | Priority |
|----------|----------------|----------------|-------------------|--------------|---------|
| Registration / Login | Critical | Every session | High (BUG-001 found) | **CRITICAL** | 1 |
| Product Browsing | Critical | Every session | Low | **HIGH** | 2 |
| Cart Management | Critical | Every order | Medium | **HIGH** | 3 |
| Checkout Flow | Critical | Every order | Medium | **HIGH** | 4 |
| Quote Request | High | Frequent B2B | Medium (BUG-003) | **HIGH** | 5 |
| Localization | High (market) | Regional | High (BUG-002) | **MEDIUM** | 6 |
| Mobile | Medium | Occasional | Low | **MEDIUM** | 7 |
| Order Tracking | Medium | Post-order | Low | **MEDIUM** | 8 |

---

## Go/No-Go Recommendation

Based on findings from this test run:

| Area | Status | Recommendation |
|------|--------|----------------|
| Product Browsing | ✅ Functional | Ready |
| Cart & Checkout | ✅ Functional | Ready (guest flow) |
| Authentication | ⚠️ Defective | **BLOCK** — BUG-001 must be fixed |
| Localization | ❌ Not implemented | **BLOCK for Arabic market launch** |
| Quote / RFQ | ⚠️ Partial | Improve before B2B go-live |
| Mobile | ✅ Functional | Ready |
| Order Tracking | ⚠️ Auth-gated | Requires authenticated test pass |

> **Recommendation:** The platform is **NOT ready for production go-live** in its current state.
> BUG-001 (broken registration/login loop) and BUG-002 (missing Arabic localization) are
> critical blockers for the target Qatar market. These must be resolved before launch.
