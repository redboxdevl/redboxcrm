# Sellmore Module Migration Matrix

**Architecture and planning only.** This matrix retains all 56 audited module classifications and all 287 historic route patterns. It does not authorize removal, API renaming, data migration or implementation. Read with [master architecture](SELLMORE_MASTER_ARCHITECTURE.md), [domain model](SELLMORE_DOMAIN_MODEL.md) and the [audit](REDBOX_CRM_MASTER_AUDIT.md).

## Disposition rules

Preserve keeps business contracts and identity; Adapt adds compatible policy/UI/domain boundaries; Consolidate is conditional shared presentation/adapters after semantic equivalence; Replace Later means a template needs a real capability behind preserved URLs. None means delete records or remove legacy integrations. Backend/schema/tenant ownership remains **BACKEND VERIFICATION REQUIRED**. Phase references use the final Sellmore 0A/0B and 1–26 numbering.

## Complete module migration matrix

| Current module | Audit classification | Sellmore destination | Treatment | Dependencies | Migration phase | Legacy route strategy | Risk |
|---|---|---|---|---|---|---|---|
| [M01 Employee authentication and profile](REDBOX_CRM_MASTER_AUDIT.md#module-m01) | REFACTOR | Identity and agency access | Adapt | Verified tenant/action policy and module contract; role/route parity | 0A, 3 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Login request rejection can leave loading active; client storage and route visibility do not establish API authorization. |
| [M02 Home and management dashboards](REDBOX_CRM_MASTER_AUDIT.md#module-m02) | IMPROVE | Role dashboards and platform boundary | Adapt | Verified tenant/action policy and module contract; role/route parity | 1, 18 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Default landing behavior changed; chart correctness depends on API meanings. Some older graph children contain demo data. |
| [M03 Assigned leads and working lead lists](REDBOX_CRM_MASTER_AUDIT.md#module-m03) | REFACTOR | Sales assignment and lead workspace | Adapt | Verified tenant/action policy and module contract; role/route parity | 4, 8 | Retain all 7 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Permission and cross-company scope must be enforced by server; repeated action handlers and query strings need contract tests. |
| [M04 Lead create and edit](REDBOX_CRM_MASTER_AUDIT.md#module-m04) | IMPROVE | Lead intake and client adapter | Adapt | Field-contract matrix and real create/load/update mappings before payload edits | 0A, 4 | Retain all 2 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Visible email/CNIC/WhatsApp/budget/timeframe/referral state does not all round-trip in the inspected payload; lookup calls repeat on selections. |
| [M05 Dormant lead queue](REDBOX_CRM_MASTER_AUDIT.md#module-m05) | REPLACE LATER | Nurture lifecycle after defined rules | Replace Later | Verified tenant/action policy and module contract; role/route parity | 4, 8 | Retain all 1 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | No complete dormant-lead workflow found. |
| [M06 Lead import, distribution and source intake](REDBOX_CRM_MASTER_AUDIT.md#module-m06) | MERGE | Source intake and import framework | Consolidate after equivalence | Import idempotency, source/batch provenance, duplicate-review and assignment tests | 4, 17 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Import validation, duplicate policy, atomicity, retry and Meta provenance cannot be established from UI alone. |
| [M07 Activities, follow-ups and reminders](REDBOX_CRM_MASTER_AUDIT.md#module-m07) | IMPROVE | Activities follow-ups and timeline | Adapt | True event/provider evidence, IDs, timestamps and safe timeline backfill | 8 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Deep-link clicks/impressions are not delivery evidence; reminder dashboard call lacks a company argument in one path. |
| [M08 Lead and call history](REDBOX_CRM_MASTER_AUDIT.md#module-m08) | IMPROVE | Zong and historical event adapters | Adapt | True event/provider evidence, IDs, timestamps and safe timeline backfill | 9, 18 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Provider ingestion, identity resolution and dedupe are server unknowns. |
| [M09 Sales analytics and reporting](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | REFACTOR | Metric catalog and analytics | Adapt | Verified tenant/action policy and module contract; role/route parity | 18 | Retain all 9 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Some chart widgets use static sample values; consistent denominators, date windows and role scope need validation. |
| [M10 Projects, inventory and reservations](REDBOX_CRM_MASTER_AUDIT.md#module-m10) | IMPROVE | Project/unit inventory and reservations | Adapt | Unit identity, atomic reservation/sold transactions, partner scope and inventory-owner approval | 6 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Displayed hold time includes a hardcoded value; concurrency, expiry and status transitions require server verification. |
| [M11 Inventory sales and customer documentation](REDBOX_CRM_MASTER_AUDIT.md#module-m11) | IMPROVE | Canonical deal compatibility | Adapt | Unit identity, atomic reservation/sold transactions, partner scope and inventory-owner approval | 13, 14 | Retain all 2 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | PII uploads/document authorization, edit history and finance linkage need backend evidence. |
| [M12 Property requirement entry](REDBOX_CRM_MASTER_AUDIT.md#module-m12) | REPLACE LATER | Client requirements and future property entry | Replace Later | Verified tenant/action policy and module contract; role/route parity | 5, 6 | Retain all 1 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Not a working property listing, owner registry or persisted requirement model; duplicate unit field. |
| [M13 Deal views and file requests](REDBOX_CRM_MASTER_AUDIT.md#module-m13) | REFACTOR | Deal workflow and after-sales | Adapt | Verified tenant/action policy and module contract; role/route parity | 13 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Static historical invoice is not evidence of a functioning deal ledger. |
| [M14 Task management](REDBOX_CRM_MASTER_AUDIT.md#module-m14) | KEEP | Tasks with optional domain links | Preserve | Preserve standalone tasks/comments/checklists; optional entity links and scope policy | 8 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Record scoping, concurrent edits and event consistency need tests; timer lifecycle has cleanup in inspected code. |
| [M15 Roles, modules and permissions](REDBOX_CRM_MASTER_AUDIT.md#module-m15) | REFACTOR | Tenant role/scope policy adapters | Adapt | Canonical numeric permission/action matrix; server principal/session/object scope; no UI-only security | 2, 3 | Retain all 7 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Sidebar filtering is not authorization; new-lead feature mapping and direct URLs need canonical policy verification. |
| [M16 Email and chat](REDBOX_CRM_MASTER_AUDIT.md#module-m16) | REPLACE LATER | Provider-backed communication after contracts | Replace Later | Verified tenant/action policy and module contract; role/route parity | 9 | Retain all 2 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Do not present static inbox/chat content as connected communication. |
| [M17 Operations dashboard](REDBOX_CRM_MASTER_AUDIT.md#module-m17) | REPLACE LATER | Operational analytics after real sources | Replace Later | Verified tenant/action policy and module contract; role/route parity | 18 | Retain all 1 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Displayed presentation is not evidence of operational metrics. |
| [M18 Content production dashboards](REDBOX_CRM_MASTER_AUDIT.md#module-m18) | REPLACE LATER | Content operations after real sources | Replace Later | Verified tenant/action policy and module contract; role/route parity | 17, 18 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Static cards/graphs cannot establish a YouTube analytics integration. |
| [M19 Video requests](REDBOX_CRM_MASTER_AUDIT.md#module-m19) | KEEP | Marketing production requests | Preserve | Verified tenant/action policy and module contract; role/route parity | 17 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Attachment access, role transitions and notifications require acceptance tests. |
| [M20 Affiliate identity and onboarding](REDBOX_CRM_MASTER_AUDIT.md#module-m20) | IMPROVE | Valued Partner identity and onboarding | Adapt | Affiliate identity/ID mapping, relationship grants, protection/attribution policy and portal isolation | 3, 10 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Separate browser identity storage; OTP expiry/rate limits/session enforcement unknown. |
| [M21 Affiliate sales and activity](REDBOX_CRM_MASTER_AUDIT.md#module-m21) | IMPROVE | Partner introduction and attribution claims | Adapt | Affiliate identity/ID mapping, relationship grants, protection/attribution policy and portal isolation | 10 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Ownership scope and duplicate/client linkage require server tests. |
| [M22 Affiliate inventory](REDBOX_CRM_MASTER_AUDIT.md#module-m22) | IMPROVE | Partner-selected inventory access | Adapt | Affiliate identity/ID mapping, relationship grants, protection/attribution policy and portal isolation | 6, 10 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Inventory visibility/reservation rules must match partner policy. |
| [M23 Affiliate documents and training](REDBOX_CRM_MASTER_AUDIT.md#module-m23) | REFACTOR | Partner resources and learning | Adapt | Affiliate identity/ID mapping, relationship grants, protection/attribution policy and portal isolation | 10, 11 | Retain all 18 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Hardcoded project-specific pages and document access need ownership/version review. |
| [M24 Marketing collateral and pricing](REDBOX_CRM_MASTER_AUDIT.md#module-m24) | REFACTOR | Agency collateral and pricing | Adapt | Verified tenant/action policy and module contract; role/route parity | 1, 17 | Retain all 9 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Document publication/version policy and website integration are unverified. |
| [M25 Fixed assets and gate passes](REDBOX_CRM_MASTER_AUDIT.md#module-m25) | KEEP | Business assets and gate passes | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify custody, approvals and print consistency. Server accounting/storage semantics remain unknown. |
| [M26 Cheque books](REDBOX_CRM_MASTER_AUDIT.md#module-m26) | KEEP | Finance cheque-book register | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify numbering, uniqueness and cancellation permissions. Server accounting/storage semantics remain unknown. |
| [M27 Utility bills](REDBOX_CRM_MASTER_AUDIT.md#module-m27) | KEEP | Finance bills and payables | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify amounts, attachment access and payment status. Server accounting/storage semantics remain unknown. |
| [M28 Outward cheques](REDBOX_CRM_MASTER_AUDIT.md#module-m28) | KEEP | Finance outward-cheque register | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify issue/clear/cancel lifecycle and audit trail. Server accounting/storage semantics remain unknown. |
| [M29 Chart of accounts](REDBOX_CRM_MASTER_AUDIT.md#module-m29) | KEEP | Accounting chart hierarchy | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 9 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify posting restrictions and stable historical account references. Server accounting/storage semantics remain unknown. |
| [M30 Financial dimensions](REDBOX_CRM_MASTER_AUDIT.md#module-m30) | KEEP | Accounting dimensions | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 9 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify allowed combinations and mapping semantics. Server accounting/storage semantics remain unknown. |
| [M31 Voucher types](REDBOX_CRM_MASTER_AUDIT.md#module-m31) | KEEP | Accounting voucher types | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify codes and historical references. Server accounting/storage semantics remain unknown. |
| [M32 Manual vouchers](REDBOX_CRM_MASTER_AUDIT.md#module-m32) | KEEP | Accounting manual vouchers | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify balanced posting, approval and reversal contracts. Server accounting/storage semantics remain unknown. |
| [M33 General-ledger mappings](REDBOX_CRM_MASTER_AUDIT.md#module-m33) | KEEP | Accounting posting mappings | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Confirm mappings and effective-date behavior with finance owner. Server accounting/storage semantics remain unknown. |
| [M34 Postdated cheques](REDBOX_CRM_MASTER_AUDIT.md#module-m34) | KEEP | Finance PDC register | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify due dates, settlement and duplicate cheque handling. Server accounting/storage semantics remain unknown. |
| [M35 Payment vouchers](REDBOX_CRM_MASTER_AUDIT.md#module-m35) | KEEP | Finance payment vouchers | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 14, 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify approval, totals and reversal behavior. Server accounting/storage semantics remain unknown. |
| [M36 Sales forms](REDBOX_CRM_MASTER_AUDIT.md#module-m36) | KEEP | Canonical deal documents with sale IDs | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 13, 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Confirm canonical sale/deal identity and preserve print formats. Server accounting/storage semantics remain unknown. |
| [M37 Petty cash](REDBOX_CRM_MASTER_AUDIT.md#module-m37) | KEEP | Finance petty cash preserved | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Protect deletion, approval and audit history; characterize current CRUD. Server accounting/storage semantics remain unknown. |
| [M38 Purchase requisitions](REDBOX_CRM_MASTER_AUDIT.md#module-m38) | KEEP | Business procurement, not client requirements | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Confirm approval and stock/purchase linkage. Server accounting/storage semantics remain unknown. |
| [M39 Bank deposits](REDBOX_CRM_MASTER_AUDIT.md#module-m39) | KEEP | Finance deposit and reconciliation | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 14, 16 | Retain all 4 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Verify reconciliation and allocation identity. Server accounting/storage semantics remain unknown. |
| [M40 Payment receipts: plural API family](REDBOX_CRM_MASTER_AUDIT.md#module-m40) | KEEP | Finance plural receipt contract preserved | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 14, 16 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Reconcile with older receipt forms and backend posting before UI consolidation. Server accounting/storage semantics remain unknown. |
| [M41 Sale and payment document printing](REDBOX_CRM_MASTER_AUDIT.md#module-m41) | KEEP | Historical branded print compatibility | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 1, 13, 16 | Retain all 9 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Validate every document with finance/operations owner before layout changes. Server accounting/storage semantics remain unknown. |
| [M42 Finance deal forms](REDBOX_CRM_MASTER_AUDIT.md#module-m42) | REFACTOR | Contain copied actions then verified deal workflow | Adapt | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 0A, 13, 15 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Live copied petty-cash row actions permit wrong-resource deletion; unfinished submit/commission fields. |
| [M43 Vehicle passes](REDBOX_CRM_MASTER_AUDIT.md#module-m43) | REFACTOR | Contain copied code then verified vehicle operations | Adapt | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 0A, 16 | Retain all 2 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Copied petty-cash read/delete code exists; row actions currently commented out. Never reactivate without verified resource contract. |
| [M44 Payment plans, legacy receipts and statements](REDBOX_CRM_MASTER_AUDIT.md#module-m44) | REFACTOR | Customer ledger/payment-plan compatibility | Adapt | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 14, 16 | Retain all 10 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Payment-plan client selection dedupes by name; some total fields are submitted as zero; parseFloat calculations need contractual rounding checks. |
| [M45 Security files and document register](REDBOX_CRM_MASTER_AUDIT.md#module-m45) | IMPROVE | Private document and security-file register | Adapt | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 13 | Retain all 7 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Authorization to document binaries, retention and upload constraints unverified. |
| [M46 Bank accounts](REDBOX_CRM_MASTER_AUDIT.md#module-m46) | KEEP | Agency banking reference data | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 3 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Sensitive reference edits and downstream transaction links need authorization tests. |
| [M47 Stock registers and asset reporting](REDBOX_CRM_MASTER_AUDIT.md#module-m47) | KEEP | Operational stock, distinct from property units | Preserve | Finance/operations sign-off, resource contracts, stable IDs, reconciled fixtures and print parity | 16 | Retain all 7 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Transaction consistency, cancellation semantics and balances need backend reconciliation. |
| [M48 Employee records and reporting lines](REDBOX_CRM_MASTER_AUDIT.md#module-m48) | REFACTOR | Private HR profiles and reporting | Adapt | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 0A, 3, 23 | Retain all 8 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Returned password property is read into edit state; verify serialization urgently. Old/new employee forms overlap. |
| [M49 Organization setup](REDBOX_CRM_MASTER_AUDIT.md#module-m49) | KEEP | Agency organization after company reconciliation | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 2, 23 | Retain all 13 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Tenant scoping and reference edits require server checks. Shared setup screens should retain IDs. |
| [M50 Leave administration](REDBOX_CRM_MASTER_AUDIT.md#module-m50) | KEEP | Private HR leave administration | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 23 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Balance/approval rules and concurrent requests are backend unknowns. |
| [M51 Training](REDBOX_CRM_MASTER_AUDIT.md#module-m51) | KEEP | Training adapter to versioned LMS | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 11, 23 | Retain all 5 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Completion/attendance linkage and attachment permissions need owner acceptance. |
| [M52 Notices and employee warnings](REDBOX_CRM_MASTER_AUDIT.md#module-m52) | KEEP | HR notices and restricted warnings | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 23 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Audience permissions and sensitive employee details require scoped access. |
| [M53 Attendance, shifts and holidays](REDBOX_CRM_MASTER_AUDIT.md#module-m53) | KEEP | HR attendance shift/holiday contracts | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 23 | Retain all 8 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Import identity, timezone, correction and duplicate policies need backend tests. |
| [M54 Payroll](REDBOX_CRM_MASTER_AUDIT.md#module-m54) | IMPROVE | Private payroll with approved commission links | Adapt | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 23 | Retain all 1 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | No inspected server evidence establishes payroll calculations, approvals or posting. |
| [M55 Recruitment and termination](REDBOX_CRM_MASTER_AUDIT.md#module-m55) | KEEP | Agent/employee recruitment and offboarding | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 11, 23 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Offboarding/session revocation and retention must be verified. |
| [M56 Circular policies and complaints](REDBOX_CRM_MASTER_AUDIT.md#module-m56) | KEEP | Restricted HR policies and complaints | Preserve | HR privacy, employee/membership mapping, organization semantics and HR-owner approval | 23 | Retain all 6 patterns in [route register](#legacy-route-register); preserve parameters, mode and IDs | Confidential complaint access, acknowledgment and audit rules need owner definitions. |

## Affiliate to Valued Partner migration design

M20–M23 are migration assets, not disposable scaffolding. A current Affiliate can map to Partner plus an AgencyPartnerRelationship only after backend identity/company semantics are verified. Keep physical names and endpoint contracts such as `affiliateprogram`, `affiliatelogin`, `optverification`, `affiliateleads` and `affiliateactivity` until compatible adapters are tested. Do not replace all strings or convert an affiliate into an Agency tenant automatically.

| Existing asset | Proposed mapping and preservation | Verification and migration condition |
|---|---|---|
| Affiliate ID/account and login history | Stable legacy alias to partner identity; retain login history where available | Confirm account ownership, session/OTP model, source history and actor mapping; never invent absent history |
| Affiliate leads | Preserve inquiries and source attribution; create protected introductions/claims only from verified evidence | Do not fabricate historic 30-day windows or retroactively grant 25% commission; quarantine ambiguous records |
| Affiliate activities | Timeline adapter with original ID/time/actor/provenance | No rewriting occurred_at; explicitly unknown legacy actor/precision |
| Inventory relationships | Explicit selected project/unit grants and relationship references | Verify current hold/unhold/sold policies and partner isolation |
| Documents/materials | Preserve existing links/assets; evolve into versioned permitted resources | Distinguish public marketing files from private identity/contracts; verify private storage |
| Training | Preserve resources and existing training evidence; later map course/enrollment | Viewing a static resource does not imply course completion or certification |
| URLs | Keep all M20–M23 paths and M11/M13 affiliate variants | Test bookmarked/deep links, login returns, parameters, prints and revoked access |

Rollout: inventory/export metadata and safe fixtures → verify identity/agency mapping → define partner agreements/grants → additive ID/claim mappings with reviewed backfill → parallel safe reads → pilot portal terminology/presentation → switch approved writes → reconcile/observe. One authoritative writer per operation. Revert adapter routing/feature flags only while preserving new claims/settlements through forward-compatible reads; no rollback by deleting introductions or financial obligations.

### Target partner portal

| Destination | Status | Existing routes or preserved foundation |
|---|---|---|
| Dashboard | EXISTING PARTIAL | `affiliate-dashboard`; add only verified claim/commission metrics |
| Opportunities | NEW | No dedicated route; optional approved project/listing projections |
| Projects | EXISTING PARTIAL | `affiliates/inventories` |
| Inventory | EXISTING WORKING | `affiliates/list-inventories`, `affiliates/list-inventories/:id` |
| Submit Client | EXISTING PARTIAL | `affiliate-leads`; preserve ID semantics while adding protected input after verification |
| Protected Clients | NEW | `view-affiliate-leads/:id` is a lead view, not a verified protection engine |
| Activities | EXISTING WORKING | `affiliate-activity/:id` |
| Deals | EXISTING PARTIAL | `affiliates/list-view-deals`, affiliate sold route in M11 |
| Commission | NEW | No verified portal ledger; incomplete finance fields cannot supply balances |
| Documents | EXISTING PARTIAL | `affiliate-document` and existing `document/...` routes |
| Marketing Resources | EXISTING WORKING | `marketing-document`; existing static collateral is a functioning resource, not a dynamic CMS |
| Training | EXISTING PARTIAL | `affiliate-training`; no certification inferred |
| Profile | NEW | `affiliate-register` is onboarding, not a verified profile editor |
| Support | FUTURE | No existing dedicated route |

Required tests: legacy login/OTP, ID stability, source inquiry/history preservation, approved resources only, full-contact non-disclosure, overlapping/expired claims, suspended relationship, partner versus agency identity separation and idempotent future commission settlement. Business owners must approve historic attribution treatment before backfill.

## Navigation status legend

**EXISTING WORKING** means the audit found client-wired capability or working static resources; it does not claim backend correctness or production acceptance. **EXISTING PARTIAL** means incomplete/disconnected semantics. **EXISTING TEMPLATE** means primarily placeholder UI. **NEW** is a planned Sellmore capability with no complete client equivalent evidenced. **FUTURE** is deliberately deferred. No status proves absence in the unknown backend. A mixed destination uses the most conservative applicable status and explains reuse.

## Final agency navigation map

Every destination below is a proposed label over existing or future capabilities. Legacy paths are exact patterns without changing spelling/case. Parent groups are organizational labels, not empty pages. Full variants and associated create/edit/print routes are preserved in the route register even when only an entry path is shown here.

| Group | Destination | Status | Preserved routes or foundation |
|---|---|---|---|
| HOME | Dashboard | EXISTING WORKING | `/dashboard`, `hr`, `finance`; M02 specialist views remain |
| HOME | My Day | NEW | Compose `list-reminders`, `task-management`; no current combined workflow |
| SALES | Leads | EXISTING WORKING | `list-assign-leads`, `list-my-leads`, `list-hot-leads`, `list-virgin-leads`, `list-notinterested-leads`, `list-transfer-leads`, `list-self-leads`; M04 create/edit routes remain |
| SALES | Pipeline | NEW | Existing status/activity fragments M03/M07; no pipeline route |
| SALES | Clients | EXISTING PARTIAL | `list-my-leads`; add canonical identity without collapsing inquiry history |
| SALES | Requirements | NEW | `add-property` and lead preferences are incomplete; procurement separate |
| SALES | Follow-ups | EXISTING WORKING | `list-reminders`, `add-reminder/:id`, `add-reminder/:id/:cid` |
| SALES | Activities | EXISTING WORKING | `list-activities`, `activities/:id/:cid`, `list-whatsapp-activity` |
| SALES | Meetings | EXISTING PARTIAL | Meeting fields within `activities/:id/:cid`; no standalone route |
| SALES | Viewings | NEW | Activity vocabulary only; no standalone lifecycle route |
| SALES | Offers | NEW | No dedicated route |
| SALES | Deals | EXISTING PARTIAL | `list-view-deals`, sold M11 and M13/M36; M42 wrong-resource guard first |
| PROPERTIES | Properties | EXISTING PARTIAL | `add-property` template plus M10 physical-unit evidence |
| PROPERTIES | Listings | NEW | No complete general listing route |
| PROPERTIES | Inventory | EXISTING WORKING | `inventories`, `list-inventories`, `list-inventories/:id`, `add-inventories` |
| PROPERTIES | Owners | NEW | Existing ownership/document fields only |
| PROPERTIES | Projects | EXISTING WORKING | `inventories`, `add-projects`, `add-projects/:id` |
| PROPERTIES | Developers | NEW | M24 developer collateral is not a registry |
| PROPERTIES | Matching | NEW | M10 filters are a starting point, not a matching engine |
| PROPERTIES | Saved Searches | NEW | Existing local filters, no dedicated route |
| PROPERTIES | Locations | EXISTING PARTIAL | Country/city/project selectors; no complete geography administration route |
| PARTNERS | Valued Partners | EXISTING PARTIAL | `affiliate-program`, `affiliate-register`, `affiliate-otp`; preserve M20 onboarding |
| PARTNERS | Protected Clients | NEW | M21 affiliate-lead foundation; no current claim/protection route |
| PARTNERS | Partner Deals | EXISTING PARTIAL | `affiliates/list-view-deals` and affiliate sold route |
| PARTNERS | Partner Commissions | NEW | No verified commission ledger route |
| PARTNERS | Partner Resources | EXISTING WORKING | `affiliate-document`, `marketing-document`, M23 project document routes |
| PARTNERS | Partner Training | EXISTING PARTIAL | `affiliate-training` |
| SELLMORE NETWORK | MLS | NEW | No current MLS route; Phase 21 |
| SELLMORE NETWORK | Shared Properties | NEW | Explicit publication projection required; no current route |
| SELLMORE NETWORK | Co-Broker Requests | NEW | No current cross-agency request route |
| SELLMORE NETWORK | Network Deals | NEW | No current network deal route |
| COMMUNICATION | Calls | EXISTING WORKING | `list-view-calling`, `calling-analytics`, `talktime-history` |
| COMMUNICATION | Inbox | EXISTING TEMPLATE | `inbox`; no verified send/receive integration |
| COMMUNICATION | WhatsApp | EXISTING PARTIAL | `list-whatsapp-activity`, activity evidence/deep links; not official API delivery |
| COMMUNICATION | Email | EXISTING TEMPLATE | `inbox`; preserve route without advertising integration |
| COMMUNICATION | SMS | NEW | Impression/link concepts do not prove a provider integration |
| COMMUNICATION | Communication History | EXISTING PARTIAL | `lead-history/:id`, `tlw-history/:id`, `talktime-history` |
| MARKETING | Campaigns | EXISTING PARTIAL | `import-leads`, `data-drive` source/spend fields |
| MARKETING | Lead Sources | EXISTING PARTIAL | Lead/source selectors and import metadata; no unified administration route |
| MARKETING | Meta Leads | EXISTING PARTIAL | `list-view-facebook`; server/webhook provenance unverified |
| MARKETING | Website Leads | NEW | No verified website bridge or dedicated CRM route |
| MARKETING | Referral Leads | EXISTING PARTIAL | Lead referral state; no first-class persisted attribution evidenced |
| MARKETING | Marketing Analytics | EXISTING PARTIAL | `analytics`, M09 reports; ROI definitions not verified |
| MARKETING | Collateral | EXISTING WORKING | `company/redbox-estate`, `company/al-barsha-developers`, `projects/al-barsha-city`, pricing M24 variants |
| BUSINESS | Tasks | EXISTING WORKING | `task-management`, `add-task`, `task/:id` |
| BUSINESS | Calendar | NEW | Existing task/reminder/meeting dates; no unified calendar route |
| BUSINESS | Approvals | NEW | Scattered statuses; no centralized engine/inbox route |
| BUSINESS | Documents | EXISTING WORKING | `security-files`, `list-view-documents`, M45 create/edit/report variants |
| BUSINESS | Forms | EXISTING PARTIAL | M25/M36/M38/M41 working form/print families; M42/M43 contained until verified |
| BUSINESS | Reports | EXISTING WORKING | `analytics`, `calling-analytics`, `list-status-report`, `leads-status-report`, `list-daily-leads-report`, `list-super-database-report`, `list-super-database-reports`, `list-kpis-report`, `kpis-graphs`; finance/HR report variants in route register; metric correctness separately reviewed |
| BUSINESS | Procurement | EXISTING WORKING | `purchase-request-form-list`, `add-new-purchase-request-form` variants, `print-purchase-form/:id` |
| PEOPLE / HR | Employees | EXISTING WORKING | `employee`, both add-new-employee/employees variants; password gate |
| PEOPLE / HR | Teams | EXISTING PARTIAL | `report-to`, `add-new-report-to` variants; current team persistence unverified |
| PEOPLE / HR | Attendance | EXISTING WORKING | `attendance`, `add-attendance` variants, shift/holiday M53 routes |
| PEOPLE / HR | Leave | EXISTING WORKING | `leave`, `add-leave-request`, `leave-type` variants |
| PEOPLE / HR | Recruitment | EXISTING WORKING | `job-post`, `add-job-post` variants; preserve termination M55 |
| PEOPLE / HR | Training | EXISTING PARTIAL | `training`, `add-new-training`, `add-training-type` variants; LMS later |
| PEOPLE / HR | Performance | EXISTING PARTIAL | `list-kpis-report`, `kpis-graphs`; full HR/targets model later |
| PEOPLE / HR | Payroll | EXISTING WORKING | `payroll`; calculations/posting remain unverified |
| PEOPLE / HR | Policies | EXISTING WORKING | `circular-policy`, add/edit variants; notices/warnings M52 retained |
| PEOPLE / HR | Complaints | EXISTING WORKING | `complain-management`, `add-new-complain` variants |
| FINANCE | Customer Ledger | EXISTING PARTIAL | `payment-statement` variants and M44; canonical allocation semantics pending |
| FINANCE | Receipts | EXISTING WORKING | `payment-reciept`, `payment-reciepts`; both full families preserved distinctly |
| FINANCE | Payment Plans | EXISTING WORKING | `payment-plan`, `add-new-payment-plan`, `payment-reciept/plan/:id` |
| FINANCE | Receivables | EXISTING PARTIAL | Payment statements/plans and finance reports; reconciliation pending |
| FINANCE | Payables | EXISTING PARTIAL | `bills-list`, cheque/PDC/payment-voucher families; no assumed unified ledger |
| FINANCE | Commissions | NEW | M42 unfinished fields are not a functioning ledger |
| FINANCE | Expenses | EXISTING WORKING | `petty-cash-list`, `bills-list` and related add/report/print variants |
| FINANCE | Bank/Cash | EXISTING WORKING | `bank-list`, `bank-deposit-list`, M26/M28/M34/M37/M39/M46 cash/cheque/PDC routes |
| FINANCE | Vouchers | EXISTING WORKING | `manual-voucher-list`, `payment-voucher-list`, `voucher-type`, associated edit/print routes |
| FINANCE | Chart of Accounts | EXISTING WORKING | `chart-of-account-level-1`, `chart-of-account-level-2`, `chart-of-account-level-3` variants |
| FINANCE | Dimensions | EXISTING WORKING | `dimension-code-level-1`, `dimension-code-level-2`, `dimension-code-level-3`; `generate-mapping` |
| FINANCE | Financial Reports | EXISTING PARTIAL | `finance`, existing bill/cheque/asset/stock reports; full GL/trial balance/P&L not verified |
| ANALYTICS | Executive | EXISTING PARTIAL | `/dashboard`; no demo or unverified revenue/forecast |
| ANALYTICS | Sales | EXISTING PARTIAL | `analytics`, M09 reporting |
| ANALYTICS | Leads | EXISTING WORKING | `list-status-report`, `leads-status-report`, `list-daily-leads-report`, both super-database report routes |
| ANALYTICS | Agents | EXISTING WORKING | `list-kpis-report`, `kpis-graphs`; metric definitions pending |
| ANALYTICS | Calls | EXISTING WORKING | `calling-analytics`, `talktime-history`, `list-view-calling` |
| ANALYTICS | Inventory | EXISTING PARTIAL | M10 lists/filters and existing overview; dedicated intelligence later |
| ANALYTICS | Deals | EXISTING PARTIAL | `list-view-deals`; verified cohort analytics later |
| ANALYTICS | Marketing | EXISTING PARTIAL | M06/M09 source/campaign fragments; ROI later |
| ANALYTICS | Finance | EXISTING PARTIAL | `finance` and existing M25–M47 reports |
| ANALYTICS | Partners | EXISTING PARTIAL | `affiliate-dashboard`; attribution/commission analytics later |
| ADMIN | Agency | NEW | M49 company may map only after verification; no current SaaS agency settings route |
| ADMIN | Users | EXISTING WORKING | `employee` and existing employee forms; identity/HR separation pending |
| ADMIN | Roles | EXISTING WORKING | `role-category`, `role-category/:id` |
| ADMIN | Permissions | EXISTING WORKING | `role-permission`, `customize-permission`, `module-setup`, `crm-modules` variants |
| ADMIN | Branches | EXISTING WORKING | `branch`, `add-branch` variants |
| ADMIN | Departments | EXISTING WORKING | `department`, `add-department` variants |
| ADMIN | Teams | EXISTING PARTIAL | `report-to` and team data; no canonical membership editor verified |
| ADMIN | Pipelines | NEW | No dedicated configurable pipeline route |
| ADMIN | Statuses | EXISTING PARTIAL | Existing lookup/form values; no versioned cross-domain status admin verified |
| ADMIN | Custom Fields | NEW | Inspect M10 backend extensions before adding definitions |
| ADMIN | Lead Sources | EXISTING PARTIAL | M04/M06 selectors; unified administration later |
| ADMIN | Integrations | NEW | Config/source integration code exists, no governed provider administration route |
| ADMIN | Automation | NEW | No rules engine route |
| ADMIN | Audit | EXISTING PARTIAL | Lead/task histories; restricted security audit is new |
| ADMIN | Settings | EXISTING PARTIAL | `setups`, M49 organization; platform settings separate |
| AI | Assistant | NEW | No CRM gateway; adjacent website AI is separate |
| AI | Lead Intelligence | NEW | No verified AI lead model route |
| AI | Matching | NEW | Phase 7 deterministic baseline precedes AI ranking |
| AI | Insights | NEW | Only permission-filtered verified metrics, Phase 22 |

## Separate platform console navigation

All destinations below are **NEW** platform capabilities; the existing `/admin/dashboard` is preserved as a legacy M02 route, not automatically promoted to global authority.

| Destination | Status | Legacy route policy |
|---|---|---|
| Overview | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Agencies | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Agency Applications | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Subscriptions | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Plans | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Features | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Usage | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Users | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| MLS | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Integrations | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| System Health | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Audit | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Security | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Support | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Announcements | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |
| Platform Settings | NEW | No verified platform equivalent; keep `/admin/dashboard` under its existing policy until separately mapped |

## Legacy route register

The following 287 patterns are reproduced from audit Appendix B, retaining exact spelling and source mapping. They remain compatible through each module's migration phase. Standalone print and affiliate variants must not be forced into the agency shell. Deprecated/unused candidates outside this register remain subject to the audit's removal gate.

| Module | Legacy path | Existing component | Strategy |
|---|---|---|---|
| M01 | `/` | [Login](../src/Components/SalesDashboard/Login.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M01 | `/sign-up` | [SignUp](../src/Components/UserProfile/SignUp.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M01 | `profile` | [Profile](../src/Components/UserProfile/Profile.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M01 | `reset/:id` | [ResetPassword](../src/Components/UserProfile/ResetPassword.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M01 | `forgot-password` | [ForgotPassword](../src/Components/UserProfile/ForgotPassword.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M02 | `/dashboard` | [Dashboard](../src/Components/SalesDashboard/Dashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M02 | `hr` | [HrDashboard](../src/Components/Hr/HrDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M02 | `finance` | [FinanceDashboard](../src/Components/FinanceDashboard/FinanceDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M02 | `/admin/dashboard` | [DashoardSuperAdmin](../src/Components/SuperAdmin/Dashoard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-assign-leads` | [AssignListing](../src/Components/SalesDashboard/AssignListing.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-notinterested-leads` | [ListNotintersted](../src/Components/SalesDashboard/ListNotintersted.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-my-leads` | [ListMyLeads](../src/Components/SalesDashboard/ListMyLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-hot-leads` | [ListHotLeads](../src/Components/SalesDashboard/ListHotLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-virgin-leads` | [ListVirginLeads](../src/Components/SalesDashboard/ListVirginLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-transfer-leads` | [ListTransfer](../src/Components/SalesDashboard/ListTransfer.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M03 | `list-self-leads` | [Selfleads](../src/Components/SalesDashboard/Selfleads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M04 | `add-lead/:id` | [AddLeads](../src/Components/SalesDashboard/AddLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M04 | `add-lead` | [AddLeads](../src/Components/SalesDashboard/AddLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M05 | `list-dorment-leads` | [DormentLeads](../src/Components/SalesDashboard/DormentLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `import-leads` | [ImportLeads](../src/Components/SalesDashboard/ImportLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `list-import-leads` | [Listimportleads](../src/Components/SalesDashboard/Listimportleads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `data-drive` | [Datadrive](../src/Components/SalesDashboard/Datadrive.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `list-view-facebook` | [FacebookLeadData](../src/Components/SalesDashboard/FacebookLeadData.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `list-import-database-leads-report` | [LeadImportList](../src/Components/SalesDashboard/LeadImportList.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M06 | `test-import-leads` | [TestImportLeads](../src/Components/SalesDashboard/TestImportLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `list-whatsapp-activity` | [ListWhatsappActivity](../src/Components/SalesDashboard/ListWhatsappActivity.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `list-reminders` | [ListReminders](../src/Components/SalesDashboard/ListReminders.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `list-activities` | [ListActivities](../src/Components/SalesDashboard/ListActivities.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `add-reminder/:id` | [AddReminders](../src/Components/SalesDashboard/AddReminders.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `add-reminder/:id/:cid` | [AddReminders](../src/Components/SalesDashboard/AddReminders.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M07 | `activities/:id/:cid` | [AddActivity](../src/Components/SalesDashboard/AddActivity.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M08 | `list-view-calling` | [ZongCallingData](../src/Components/SalesDashboard/ZongCallingData.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M08 | `lead-history/:id` | [LeadHistory](../src/Components/SalesDashboard/LeadHistory.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M08 | `tlw-history/:id` | [TotalLeadWorkHistory](../src/Components/SalesDashboard/TotalLeadWorkHistory.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M08 | `talktime-history` | [Talktimehistory](../src/Components/SalesDashboard/Talktimehistory.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `analytics` | [Analytics](../src/Components/SalesDashboard/Analytics.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `calling-analytics` | [Callinganalytics](../src/Components/SalesDashboard/Callinganalytics.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `list-status-report` | [ListStatusReport](../src/Components/SalesDashboard/ListStatusReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `leads-status-report` | [LeadStatusReport](../src/Components/SalesDashboard/LeadStatusReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `list-daily-leads-report` | [DailyLeadsReporting](../src/Components/SalesDashboard/DailyLeadsReporting.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `list-super-database-report` | [ListSuperDatabaseReport](../src/Components/SalesDashboard/ListSuperDatabaseReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `list-super-database-reports` | [Listsuperdatabasereports](../src/Components/SalesDashboard/Listsuperdatabasereports.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `list-kpis-report` | [KpiReports](../src/Components/SalesDashboard/KpiReports.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M09 | `kpis-graphs` | [KpiGraphs](../src/Components/SalesDashboard/KpiGraphs.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `inventories` | [Inventories](../src/Components/SalesDashboard/Inventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `add-inventories` | [AddInventories](../src/Components/SalesDashboard/Inventories/AddInventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `add-projects` | [AddProjects](../src/Components/SalesDashboard/Inventories/AddProjects.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `add-projects/:id` | [AddProjects](../src/Components/SalesDashboard/Inventories/AddProjects.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `list-inventories` | [ListInventories](../src/Components/SalesDashboard/Inventories/ListInventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M10 | `list-inventories/:id` | [ListInventories](../src/Components/SalesDashboard/Inventories/ListInventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M11 | `lead-activity/:invid/:custId/:proId` | [SoldInventories](../src/Components/SalesDashboard/Inventories/SoldInventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M11 | `affiliates/lead-activity/:invid/:custId/:proId/:affiliatestatus` | [SoldInventories](../src/Components/SalesDashboard/Inventories/SoldInventories.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M12 | `add-property` | [AddProperty](../src/Components/Properties/AddProperty.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M13 | `list-view-deals` | [ListViewDeals](../src/Components/SalesDashboard/ListViewDeals.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M13 | `affiliates/list-view-deals` | [ListViewDeals](../src/Components/SalesDashboard/ListViewDeals.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M13 | `sales-view-form/:id` | [ViewDealDone](../src/Components/SalesDashboard/ViewDealDone.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M13 | `add-file-request/:id` | [AddFileRequest](../src/Components/SalesDashboard/AddFileRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M14 | `task-management` | [TaskDashboard](../src/Components/TaskManagement/TaskDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M14 | `add-task` | [AddTask](../src/Components/TaskManagement/AddTask.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M14 | `task/:id` | [TaskDetails](../src/Components/TaskManagement/TaskDetails.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `role-category` | [RoleCategory](../src/Components/RolesPermission/RoleCategory.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `role-category/:id` | [RoleCategory](../src/Components/RolesPermission/RoleCategory.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `crm-modules` | [CrmModules](../src/Components/RolesPermission/CrmModules.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `crm-modules/:id` | [CrmModules](../src/Components/RolesPermission/CrmModules.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `role-permission` | [RolePermission](../src/Components/RolesPermission/RolePermission.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `customize-permission` | [CustomizePermission](../src/Components/RolesPermission/CustomizePermission.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M15 | `module-setup` | [ModuleSetup](../src/Components/RolesPermission/ModuleSetup.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M16 | `inbox` | [EmailComponent](../src/Components/EmailDashboard/EmailComponent.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M16 | `chat` | [Chat](../src/Components/ChatDashboard/Chat.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M17 | `operation` | [OperationDashboard](../src/Components/OperationDashboard/OperationDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M18 | `youtube` | [YoutubeDasboard](../src/Components/YoutubeDashboard/YoutubeDasboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M18 | `production` | [ProductionDashboard](../src/Components/YoutubeDashboard/Production/ProductionDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M18 | `graphic-designer` | [GraphicDashboard](../src/Components/YoutubeDashboard/GraphicDesigner/GraphicDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M18 | `content-writer` | [ContentwriterDashboard](../src/Components/YoutubeDashboard/ContentWriters/ContentwriterDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M19 | `video-request-form` | [VideoRequest](../src/Components/YoutubeDashboard/VideoRequestForm/VideoRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M19 | `view-video-request` | [ViewVideoRequest](../src/Components/YoutubeDashboard/VideoRequestForm/ViewVideoRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M19 | `view-video-request/:id` | [SingleVideoReq](../src/Components/YoutubeDashboard/VideoRequestForm/SingleVideoReq.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M20 | `affiliate-program` | [BrokerLogin](../src/Components/BrokerAffiliate/BrokerLogin.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M20 | `affiliate-register` | [AffiliateRegister](../src/Components/BrokerAffiliate/AffiliateRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M20 | `affiliate-otp` | [AffiliateOtp](../src/Components/BrokerAffiliate/AffiliateOtp.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M21 | `affiliate-dashboard` | [AffiliateDashboard](../src/Components/BrokerAffiliate/AffiliateDashboard.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M21 | `affiliate-leads` | [AffliateLeadsAdd](../src/Components/BrokerAffiliate/AffliateLeadsAdd.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M21 | `view-affiliate-leads/:id` | [ViewAffiliateLeads](../src/Components/BrokerAffiliate/ViewAffiliateLeads.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M21 | `affiliate-activity/:id` | [AffiliateActivity](../src/Components/BrokerAffiliate/AffiliateActivity.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M22 | `affiliates/inventories` | [InventoriesAffiliates](../src/Components/BrokerAffiliate/AffiliateInventories/InventoriesAffiliates.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M22 | `affiliates/list-inventories` | [ListInventoriesaffiliates](../src/Components/BrokerAffiliate/AffiliateInventories/ListInventoriesaffiliates.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M22 | `affiliates/list-inventories/:id` | [ListInventoriesaffiliates](../src/Components/BrokerAffiliate/AffiliateInventories/ListInventoriesaffiliates.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `affiliate-document` | [AffiliateDocument](../src/Components/BrokerAffiliate/AffiliateDocument.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `marketing-document` | [MarketingDocuments](../src/Components/BrokerAffiliate/MarketingDocuments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/city-108/:id` | [City108doc](../src/Components/BrokerAffiliate/DocumentData/City108doc.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/green-land-farmhouse/:id` | [GreenLandfarmhouse](../src/Components/BrokerAffiliate/DocumentData/GreenLandfarmhouse.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/jauharat/:id` | [Jauharat](../src/Components/BrokerAffiliate/DocumentData/Jauharat.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/sq10/:id` | [Sq10](../src/Components/BrokerAffiliate/DocumentData/Sq10.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/paragontower/:id` | [Paragontower](../src/Components/BrokerAffiliate/DocumentData/Paragontower.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/alitown/:id` | [Alitown](../src/Components/BrokerAffiliate/DocumentData/Alitown.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/ninthavenue/:id` | [Ninthavenue](../src/Components/BrokerAffiliate/DocumentData/Ninthavenue.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/signature27/:id` | [Signature27](../src/Components/BrokerAffiliate/DocumentData/Signature27.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/lakhaniblessing/:id` | [Lakhaniblessing](../src/Components/BrokerAffiliate/DocumentData/Lakhaniblessing.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/lakhanivista/:id` | [Lakhanivista](../src/Components/BrokerAffiliate/DocumentData/Lakhanivista.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/ocean99/:id` | [Ocean99](../src/Components/BrokerAffiliate/DocumentData/Ocean99.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/albarsha-city/:id` | [AlbarshaCitydoc](../src/Components/BrokerAffiliate/DocumentData/AlbarshaCitydoc.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/ysi-mall-residency/:id` | [YsiMallResdoc](../src/Components/BrokerAffiliate/DocumentData/YsiMallResdoc.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/albarsha-farmhouse/:id` | [AlbarshaFarmhousedoc](../src/Components/BrokerAffiliate/DocumentData/AlbarshaFarmhousedoc.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `document/redsim-hills/:id` | [RedsimHillsdoc](../src/Components/BrokerAffiliate/DocumentData/RedsimHillsdoc.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M23 | `affiliate-training` | [AffiliateTraining](../src/Components/BrokerAffiliate/AffiliateTraining.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `real-estate-pricing` | [RealEstatePricing](../src/Components/WebsiteMaterial/RealEstatePricing.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `add-new-pricing` | [AddNewPricing](../src/Components/WebsiteMaterial/AddNewPricing.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `add-new-pricing/:id` | [AddNewPricing](../src/Components/WebsiteMaterial/AddNewPricing.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `company/redbox-estate` | [RedboxMaterial](../src/Components/MarketingMaterial/RedboxMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `company/al-barsha-developers` | [AlbarshaDeveloperMaterial](../src/Components/MarketingMaterial/AlbarshaDeveloperMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `company/redbox-estate/:id` | [RedboxMaterial](../src/Components/MarketingMaterial/RedboxMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `company/al-barsha-developers/:id` | [AlbarshaDeveloperMaterial](../src/Components/MarketingMaterial/AlbarshaDeveloperMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `projects/al-barsha-city` | [PaymentScheduleMaterial](../src/Components/MarketingMaterial/PaymentScheduleMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M24 | `projects/al-barsha-city/:id` | [PaymentScheduleMaterial](../src/Components/MarketingMaterial/PaymentScheduleMaterial.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M25 | `fixed-asset-register` | [FixedAssetRegister](../src/Components/FinanceDashboard/AssetRegister/FixedAssetRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M25 | `add-new-asset` | [AddNewAsset](../src/Components/FinanceDashboard/AssetRegister/AddNewAsset.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M25 | `add-new-asset/:id` | [AddNewAsset](../src/Components/FinanceDashboard/AssetRegister/AddNewAsset.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M25 | `generate-gate-pass/:id` | [GenerateGatePass](../src/Components/FinanceDashboard/AssetRegister/GenerateGatePass.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M25 | `generate-gate-pass-print/:id` | [PrintGatePass](../src/Components/FinanceDashboard/AssetRegister/PrintGatePass.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M26 | `list-cheque-book` | [ChequeBookList](../src/Components/FinanceDashboard/ChequeBook/ChequeBookList.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M26 | `add-new-cheque-book` | [AddNewChequeBook](../src/Components/FinanceDashboard/ChequeBook/AddNewChequeBook.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M26 | `add-new-cheque-book/:id` | [AddNewChequeBook](../src/Components/FinanceDashboard/ChequeBook/AddNewChequeBook.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M27 | `bills-list` | [UtilsbillsList](../src/Components/FinanceDashboard/UtilsBills/UtilsbillsList.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M27 | `add-new-bills` | [AddNewUtilsBills](../src/Components/FinanceDashboard/UtilsBills/AddNewUtilsBills.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M27 | `add-new-bills/:id` | [AddNewUtilsBills](../src/Components/FinanceDashboard/UtilsBills/AddNewUtilsBills.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M27 | `bills-reports` | [ReportUtilsbills](../src/Components/FinanceDashboard/UtilsBills/ReportUtilsbills.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M28 | `list-cheque-outward-register` | [ChequeOutWardList](../src/Components/FinanceDashboard/ChequeOutwardRegister/ChequeOutWardList.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M28 | `report-cheque-outward-register` | [ReportChequeOutward](../src/Components/FinanceDashboard/ChequeOutwardRegister/ReportChequeOutward.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M28 | `add-cheque-outward-register` | [AddChequeOutwardRegister](../src/Components/FinanceDashboard/ChequeOutwardRegister/AddChequeOutwardRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M28 | `add-cheque-outward-register/:id` | [AddChequeOutwardRegister](../src/Components/FinanceDashboard/ChequeOutwardRegister/AddChequeOutwardRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M28 | `cheque-outward-voucher/:id` | [OutwardVoucherPrint](../src/Components/FinanceDashboard/ChequeOutwardRegister/OutwardVoucherPrint.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `chart-of-account-level-1` | [ListLevel1](../src/Components/FinanceDashboard/ChartofAccount/Level1/ListLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-1` | [AddNewLevel1](../src/Components/FinanceDashboard/ChartofAccount/Level1/AddNewLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-1/:id` | [AddNewLevel1](../src/Components/FinanceDashboard/ChartofAccount/Level1/AddNewLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `chart-of-account-level-2` | [ListLevel2](../src/Components/FinanceDashboard/ChartofAccount/Level2/ListLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-2` | [AddNewLevel2](../src/Components/FinanceDashboard/ChartofAccount/Level2/AddNewLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-2/:id` | [AddNewLevel2](../src/Components/FinanceDashboard/ChartofAccount/Level2/AddNewLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `chart-of-account-level-3` | [ListLevel3](../src/Components/FinanceDashboard/ChartofAccount/Level3/ListLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-3` | [AddNewLevel3](../src/Components/FinanceDashboard/ChartofAccount/Level3/AddNewLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M29 | `add-chart-of-account-level-3/:id` | [AddNewLevel3](../src/Components/FinanceDashboard/ChartofAccount/Level3/AddNewLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `dimension-code-level-1` | [ListDimensionLevel1](../src/Components/FinanceDashboard/Dimension/Level1/ListDimensionLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-1` | [AddNewDimensionLevel1](../src/Components/FinanceDashboard/Dimension/Level1/AddNewDimensionLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-1/:id` | [AddNewDimensionLevel1](../src/Components/FinanceDashboard/Dimension/Level1/AddNewDimensionLevel1.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `dimension-code-level-2` | [ListDimensionLevel2](../src/Components/FinanceDashboard/Dimension/Level2/ListDimensionLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-2` | [AddNewDimensionLevel2](../src/Components/FinanceDashboard/Dimension/Level2/AddNewDimensionLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-2/:id` | [AddNewDimensionLevel2](../src/Components/FinanceDashboard/Dimension/Level2/AddNewDimensionLevel2.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `dimension-code-level-3` | [ListDimensionLevel3](../src/Components/FinanceDashboard/Dimension/Level3/ListDimensionLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-3` | [AddNewDimensionLevel3](../src/Components/FinanceDashboard/Dimension/Level3/AddNewDimensionLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M30 | `add-dimension-level-3/:id` | [AddNewDimensionLevel3](../src/Components/FinanceDashboard/Dimension/Level3/AddNewDimensionLevel3.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M31 | `voucher-type` | [VoucherTypeList](../src/Components/FinanceDashboard/VoucherType/VoucherTypeList.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M31 | `add-new-voucher-type` | [AddNewVoucherType](../src/Components/FinanceDashboard/VoucherType/AddNewVoucherType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M31 | `add-new-voucher-type/:id` | [AddNewVoucherType](../src/Components/FinanceDashboard/VoucherType/AddNewVoucherType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M32 | `manual-voucher-list` | [ListManualvoucher](../src/Components/FinanceDashboard/ManualVoucher/ListManualvoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M32 | `add-manual-voucher` | [AddManualvoucher](../src/Components/FinanceDashboard/ManualVoucher/AddManualvoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M32 | `add-manual-voucher/:id` | [AddManualvoucher](../src/Components/FinanceDashboard/ManualVoucher/AddManualvoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M33 | `generate-mapping` | [Generatemapping](../src/Components/FinanceDashboard/GlMapping/Generatemapping.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M33 | `add-generate-mapping` | [AddNewMapping](../src/Components/FinanceDashboard/GlMapping/AddNewMapping.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M33 | `add-generate-mapping/:id` | [AddNewMapping](../src/Components/FinanceDashboard/GlMapping/AddNewMapping.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M34 | `list-post-dated-cheque` | [ListPostDatedCheque](../src/Components/FinanceDashboard/PostDatedCheque/ListPostDatedCheque.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M34 | `add-post-dated-cheque` | [AddPostDatedCheque](../src/Components/FinanceDashboard/PostDatedCheque/AddPostDatedCheque.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M34 | `add-post-dated-cheque/:id` | [AddPostDatedCheque](../src/Components/FinanceDashboard/PostDatedCheque/AddPostDatedCheque.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M34 | `report-post-dated-cheque` | [ReportPostDatedCheque](../src/Components/FinanceDashboard/PostDatedCheque/ReportPostDatedCheque.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M35 | `payment-voucher-list` | [ListPaymentVoucher](../src/Components/FinanceDashboard/PaymentVoucher/ListPaymentVoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M35 | `add-new-payment-voucher` | [AddNewPaymentVoucher](../src/Components/FinanceDashboard/PaymentVoucher/AddNewPaymentVoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M35 | `add-new-payment-voucher/:id` | [AddNewPaymentVoucher](../src/Components/FinanceDashboard/PaymentVoucher/AddNewPaymentVoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M35 | `report-payment-voucher` | [PaymentVoucherReport](../src/Components/FinanceDashboard/PaymentVoucher/PaymentVoucherReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M36 | `sales-form-list` | [ListSalesForm](../src/Components/FinanceDashboard/SalesForm/ListSalesForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M36 | `add-new-sales-form` | [AddSalesForm](../src/Components/FinanceDashboard/SalesForm/AddSalesForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M36 | `add-new-sales-form/:id` | [AddSalesForm](../src/Components/FinanceDashboard/SalesForm/AddSalesForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M36 | `print-sales-form/:id` | [PrintSaleForm](../src/Components/FinanceDashboard/SalesForm/PrintSaleForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M37 | `petty-cash-list` | [ListPettyCash](../src/Components/FinanceDashboard/PettyCash/ListPettyCash.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M37 | `add-new-petty-cash` | [AddPettyCash](../src/Components/FinanceDashboard/PettyCash/AddPettyCash.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M37 | `add-new-petty-cash/:id` | [AddPettyCash](../src/Components/FinanceDashboard/PettyCash/AddPettyCash.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M37 | `print-petty-cash/:id` | [PrintPettyCash](../src/Components/FinanceDashboard/PettyCash/PrintPettyCash.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M37 | `petty-cash-voucher/:id` | [PettyVoucherPrint](../src/Components/FinanceDashboard/PettyCash/PettyVoucherPrint.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M38 | `purchase-request-form-list` | [ListPurchaseRequest](../src/Components/FinanceDashboard/PurchaseRequestForm/ListPurchaseRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M38 | `add-new-purchase-request-form` | [AddPurchaseRequest](../src/Components/FinanceDashboard/PurchaseRequestForm/AddPurchaseRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M38 | `add-new-purchase-request-form/:id` | [AddPurchaseRequest](../src/Components/FinanceDashboard/PurchaseRequestForm/AddPurchaseRequest.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M38 | `print-purchase-form/:id` | [PurchasePrintVoucher](../src/Components/FinanceDashboard/PurchaseRequestForm/PurchasePrintVoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M39 | `bank-deposit-list` | [ListBankDeposit](../src/Components/FinanceDashboard/BankDeposit/ListBankDeposit.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M39 | `add-deposit` | [AddBankDeposit](../src/Components/FinanceDashboard/BankDeposit/AddBankDeposit.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M39 | `add-deposit/:id` | [AddBankDeposit](../src/Components/FinanceDashboard/BankDeposit/AddBankDeposit.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M39 | `list-bank-deposit-voucher/:id` | [DepositVoucherPrint](../src/Components/FinanceDashboard/BankDeposit/DepositVoucherPrint.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M40 | `payment-reciepts` | [ListPaymentReciepts](../src/Components/FinanceDashboard/PaymentReciepts/ListPaymentReciepts.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M40 | `add-new-payment-reciepts` | [AddNewPaymentReciepts](../src/Components/FinanceDashboard/PaymentReciepts/AddNewPaymentReciepts.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M40 | `add-new-payment-reciepts/:id` | [AddNewPaymentReciepts](../src/Components/FinanceDashboard/PaymentReciepts/AddNewPaymentReciepts.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M40 | `print-payment-reciepts/:id` | [PrintPaymentReciepts](../src/Components/FinanceDashboard/PaymentReciepts/PrintPaymentReciepts.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M40 | `report-payment-reciepts` | [ReportPaymentReciept](../src/Components/FinanceDashboard/PaymentReciepts/ReportPaymentReciept.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `booking-form/:id` | [BookingForm](../src/Components/FinanceDashboard/Print/BookingForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `allocation/:id` | [Allocation](../src/Components/FinanceDashboard/Print/Allocation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `confirmation/:id` | [Confirmation](../src/Components/FinanceDashboard/Print/Confirmation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `provisional-allotment/:id` | [ProvisionalAllotment](../src/Components/FinanceDashboard/Print/ProvisionalAllotment.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `booking-form/customer/:id/:vid` | [BookingForm](../src/Components/FinanceDashboard/Print/BookingForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `allocation/customer/:id/:vid` | [Allocation](../src/Components/FinanceDashboard/Print/Allocation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `confirmation/customer/:id/:vid` | [Confirmation](../src/Components/FinanceDashboard/Print/Confirmation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `provisional-allotment/customer/:id/:vid` | [ProvisionalAllotment](../src/Components/FinanceDashboard/Print/ProvisionalAllotment.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M41 | `list-payment-voucher/:id` | [PaymentVoucher](../src/Components/FinanceDashboard/Print/PaymentVoucher.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M42 | `deal-form-list` | [ListDealForm](../src/Components/FinanceDashboard/Dealform/ListDealForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M42 | `add-deal-form` | [AddDealForm](../src/Components/FinanceDashboard/Dealform/AddDealForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M42 | `add-deal-form/:id` | [AddDealForm](../src/Components/FinanceDashboard/Dealform/AddDealForm.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M43 | `vehcile-pass` | [ListVehcilePass](../src/Components/FinanceDashboard/VehcilePass/ListVehcilePass.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M43 | `add-new-vehcile-pass` | [AddVehcilePass](../src/Components/FinanceDashboard/VehcilePass/AddVehcilePass.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `payment-reciept` | [PaymentReciept](../src/Components/FinanceDashboard/PaymentReciept.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `add-new-payment-reciept` | [NewPaymentReciept](../src/Components/FinanceDashboard/NewPaymentReciept.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `add-new-payment-reciept/:id` | [NewPaymentReciept](../src/Components/FinanceDashboard/NewPaymentReciept.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `add-new-payment-reciept/:id/:sid` | [NewPaymentReciept](../src/Components/FinanceDashboard/NewPaymentReciept.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `payment-reciept/plan/:id` | [PaymentPlanGenerate](../src/Components/FinanceDashboard/PaymentPlanGenerate.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `add-new-payment-plan` | [AddNewPaymentPlan](../src/Components/FinanceDashboard/AddNewPaymentPlan.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `payment-statement` | [PaymentStatement](../src/Components/FinanceDashboard/PaymentStatement.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `payment-statement/:id` | [PaymentStatement](../src/Components/FinanceDashboard/PaymentStatement.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `payment-plan` | [PaymentPlan](../src/Components/FinanceDashboard/PaymentPlan.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M44 | `view-payment-reciept/:id/:sid` | [ViewPaymentRecieptPrint](../src/Components/FinanceDashboard/ViewPaymentRecieptPrint.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `security-files` | [SecurityFiles](../src/Components/FinanceDashboard/SecurityFiles.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `add-security-files` | [AddSecurityFiles](../src/Components/FinanceDashboard/AddSecurityFiles.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `add-security-files/:id` | [AddSecurityFiles](../src/Components/FinanceDashboard/AddSecurityFiles.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `security-files-report` | [SecurityFilesReport](../src/Components/FinanceDashboard/SecurityFilesReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `list-view-documents` | [Listdocuments](../src/Components/FinanceDashboard/Listdocuments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `add-documents-files` | [Addlistdocuments](../src/Components/FinanceDashboard/Addlistdocuments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M45 | `add-documents-files/:id` | [Addlistdocuments](../src/Components/FinanceDashboard/Addlistdocuments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M46 | `bank-list` | [BankAccounts](../src/Components/FinanceDashboard/BankAccounts.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M46 | `add-bank-list` | [AddBankAccount](../src/Components/FinanceDashboard/AddBankAccount.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M46 | `add-bank-list/:id` | [AddBankAccount](../src/Components/FinanceDashboard/AddBankAccount.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `asset-report` | [FixedAssetReport](../src/Components/FinanceDashboard/FixedAssetReport.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-list` | [StockRegister](../src/Components/FinanceDashboard/StockRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-inword-register` | [StockInWordReg](../src/Components/FinanceDashboard/StockInWordReg.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-inword-register/:id` | [StockInWordReg](../src/Components/FinanceDashboard/StockInWordReg.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-outword-register` | [StockOutWord](../src/Components/FinanceDashboard/StockOutWord.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-cancel-register` | [StockCancelRegister](../src/Components/FinanceDashboard/StockCancelRegister.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M47 | `stock-reports` | [StockReports](../src/Components/FinanceDashboard/StockReports.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `employee` | [Employees](../src/Components/Hr/Employees.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-employee` | [AddNewEmployee](../src/Components/Hr/AddNewEmployee.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-employee/:id` | [AddNewEmployee](../src/Components/Hr/AddNewEmployee.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `report-to` | [ReportTo](../src/Components/Hr/ReportTo.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-report-to` | [AddNewReportTo](../src/Components/Hr/AddNewReportTo.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-report-to/:id` | [AddNewReportTo](../src/Components/Hr/AddNewReportTo.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-employees` | [NewAddEmployee](../src/Components/Hr/NewAddEmployee.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M48 | `add-new-employees/:id` | [NewAddEmployee](../src/Components/Hr/NewAddEmployee.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `company` | [Companies](../src/Components/Hr/Companies.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-companies` | [AddCompanies](../src/Components/Hr/AddCompanies.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-companies/:id` | [AddCompanies](../src/Components/Hr/AddCompanies.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `branch` | [Branch](../src/Components/Hr/Branch.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-branch` | [AddBranch](../src/Components/Hr/AddBranch.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-branch/:id` | [AddBranch](../src/Components/Hr/AddBranch.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `department` | [Departments](../src/Components/Hr/Departments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-department` | [AddDepartments](../src/Components/Hr/AddDepartments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-department/:id` | [AddDepartments](../src/Components/Hr/AddDepartments.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `designation` | [Designations](../src/Components/Hr/Designations.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-designation` | [AddDesignation](../src/Components/Hr/AddDesignation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `add-designation/:id` | [AddDesignation](../src/Components/Hr/AddDesignation.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M49 | `setups` | [Setups](../src/Components/Hr/Setups.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M50 | `leave` | [Leave](../src/Components/Hr/Leave.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M50 | `add-leave-request` | [AddLeave](../src/Components/Hr/AddLeave.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M50 | `add-leave-request/:id` | [AddLeave](../src/Components/Hr/AddLeave.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M50 | `leave-type` | [LeaveType](../src/Components/Hr/LeaveType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M50 | `leave-type/:id` | [LeaveType](../src/Components/Hr/LeaveType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M51 | `training` | [Tranining](../src/Components/Hr/Tranining.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M51 | `add-new-training` | [AddNewTraining](../src/Components/Hr/AddNewTraining.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M51 | `add-new-training/:id` | [AddNewTraining](../src/Components/Hr/AddNewTraining.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M51 | `add-training-type` | [AddTrainingType](../src/Components/Hr/AddTrainingType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M51 | `add-training-type/:id` | [AddTrainingType](../src/Components/Hr/AddTrainingType.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `notice` | [Notice](../src/Components/Hr/Notice.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `add-new-notice` | [AddNotice](../src/Components/Hr/AddNotice.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `add-new-notice/:id` | [AddNotice](../src/Components/Hr/AddNotice.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `warning` | [Warning](../src/Components/Hr/Warning.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `add-new-warning` | [AddWarning](../src/Components/Hr/AddWarning.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M52 | `add-new-warning/:id` | [AddWarning](../src/Components/Hr/AddWarning.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `attendance` | [Attendance](../src/Components/Hr/Attendance.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `add-attendance` | [AddAttendance](../src/Components/Hr/AddAttendance.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `add-attendance/:id` | [AddAttendance](../src/Components/Hr/AddAttendance.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `employee-shift` | [EmployeeShift](../src/Components/Hr/EmployeeShift.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `add-employee-shift` | [AddEmployeeShift](../src/Components/Hr/AddEmployeeShift.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `add-employee-shift/:id` | [AddEmployeeShift](../src/Components/Hr/AddEmployeeShift.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `holiday` | [Holiday](../src/Components/Hr/Holiday.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M53 | `holiday/:id` | [Holiday](../src/Components/Hr/Holiday.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M54 | `payroll` | [Payrolls](../src/Components/Hr/Payrolls.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `termination` | [Termination](../src/Components/Hr/Termination.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `add-termination` | [AddTermination](../src/Components/Hr/AddTermination.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `add-termination/:id` | [AddTermination](../src/Components/Hr/AddTermination.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `job-post` | [JobPost](../src/Components/Hr/JobPost.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `add-job-post` | [AddJobPost](../src/Components/Hr/AddJobPost.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M55 | `add-job-post/:id` | [AddJobPost](../src/Components/Hr/AddJobPost.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `circular-policy` | [Circularpolicylist](../src/Components/Hr/CircularPolicy/Circularpolicylist.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `add-circular-policy` | [AddCircularPolicy](../src/Components/Hr/CircularPolicy/AddCircularPolicy.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `add-circular-policy/:id` | [AddCircularPolicy](../src/Components/Hr/CircularPolicy/AddCircularPolicy.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `complain-management` | [Complainmanagementlist](../src/Components/Hr/ComplainManagement/Complainmanagementlist.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `add-new-complain` | [AddComplainManagement](../src/Components/Hr/ComplainManagement/AddComplainManagement.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
| M56 | `add-new-complain/:id` | [AddComplainManagement](../src/Components/Hr/ComplainManagement/AddComplainManagement.js) | Preserve path/parameters/ID mapping; verify role/action and print/portal behavior |
