# SELLMORE Current State Handoff

Updated: **2026-10-06, Asia/Karachi**. Scope: recovered working-tree implementation and focused recovery validation. This is an operational handoff, not release certification.

## 1. Purpose

Read this file first to recover the CURRENT implementation state, evidence limits and next approved steps. Confirm current Git state before acting; implementation statements below describe the recovery snapshot.

This document does not replace the [master architecture](SELLMORE_MASTER_ARCHITECTURE.md), [domain model](SELLMORE_DOMAIN_MODEL.md), [UI/UX workflow audit](SELLMORE_UI_UX_WORKFLOW_AUDIT.md), or [database architecture](database/SELLMORE_TARGET_DATABASE_ARCHITECTURE.md). Those remain authoritative target or specialist references; proposed architecture is not proof of implemented functionality.

## 2. Product Direction

SELLMORE is evolving from the existing REDBOX CRM into a commercial, multi-agency B2B real-estate operating system. REDBOX is the intended first agency tenant; verified tenant ownership/isolation is still a backend prerequisite.

- Evolve progressively; preserve working legacy functionality, IDs, history, routes and integrations.
- Keep agency data private by default, with explicit marketplace publication and sharing grants.
- Modernize UI and domains progressively; integrate AI progressively against verified data and permissions.
- Frontend code must not invent backend contracts or treat target models as existing tables.

## 3. Current Recovery Branch

`sellmore-recovery-2026-10-06`

The safety branch was created to preserve the recovered working tree after the previous Copilot session interruption. Existing implementation remains in the working tree; branch creation does not commit those changes. No recovery checkpoint has been staged or committed during this recovery workflow.

## 4. Completed / Present Implementation

These changes are present in current code; broader runtime/visual acceptance remains pending.

| Area | Current evidence |
|---|---|
| Shell / CrmLayout | `src/App.js` wraps routes in `src/Includes/CrmLayout.js`. Persistent sidebar/topbar, module search, nested sections, mobile navigation and account controls exist. Legacy Navigation/OtherNavigation/QuickNav suppress themselves inside the shared layout; public, affiliate and printable routes have standalone exclusions. |
| Navigation | Seven primary areas: HOME, CRM, PROPERTIES, NETWORK, BUSINESS, INTELLIGENCE, SETTINGS. Existing route links are permission-aware; future destinations are disabled and marked Coming soon. Client visibility is not server authorization. |
| Dashboard | API-backed cards/charts, weekly trends with totals fallback, call periods, team rankings, recent assignments, follow-ups, refresh and loading/error/empty states. Missing numeric values are distinct from zero. Manager/Team scope dispatches dashboard counts, not a universal page filter. |
| Login | Responsive redesign, labeled inputs, password visibility control and generated sales-floor image. `Login.js` references `public/FrontAsset/images/sales-team-floor.png`; its companion `.prompt.txt` records generation provenance. |
| Assigned Leads | Shared header/filter/table/pagination patterns, request states/retry/error boundary, guarded stored-user parsing, signed-out redirect, selection, row actions, compact dates, Lead 360 links and current-page CSV export. |
| SellmoreUI | `src/Components/SellmoreUI/AssignedLeadsPrimitives.js` and `AssignedLeads.css` provide headers, filters, tables, pagination, badges, dates, page states, bulk actions, confirmation dialog, identity header, tabs, timelines and action-center components. Some labels remain Assigned Leads-specific. |
| Lead 360 / Lead History | Existing `/lead-history/:id` renders available identity/profession/project facts, communication metrics, and data-backed Overview/Activity/Calls/History tabs. Activity sorts chronologically when every timestamp is usable; recordings and request-state distinctions are retained. |
| Lead Action Center | Quick communication links/counts; Transfer, Edit Lead, Reminder and Not Interested. Transfer and disposition forms are separate. Existing call/SMS URL conventions remain, including `tel:66` and the legacy SMS template. |
| Terminology / quality | Profession and Warm presentation mappings exist. Incomplete is derived for loaded rows from usable lead identity, name and contact; no persisted quality state or global Incomplete Leads route exists. |
| Deal Form P0 containment | `ListDealForm.js` no longer reads or deletes petty-cash records. The list shows an unavailable-source notice; Add New Deal Form route remains. Correct Deal Form listing is not implemented. |

The Assigned Leads and Lead History Redux thunks now return their response so page request states can distinguish success, empty, error and unavailable responses. Most other routed pages remain legacy; a modern shell does not mean every module is modernized or functional.

## 5. Assigned Leads Current Contract

Frontend action: `src/redux/action/AssignLeadsAction.js`; endpoint: `listassignleads`.

| Frontend contract | Current behavior / boundary |
|---|---|
| Search | `q` |
| Consultant | `salesId` |
| Project | `ProjectN` |
| Transfer filter | `transferStatus` |
| Nature | `nature` is sent; meaning/control remains unverified. |
| Requested ordering | `orderby=created_at&ordertype=desc` |
| Pagination | `page` / `perpage`; current page size 12, with response total used for pagination when available. |
| Scope | `agentid`, conditional `teamObj`, and `company_id`; client scope is not proof of server enforcement. |
| Actions | Selection, transfer, row action center, Lead 360, and confirmed bulk delete preserve existing request/payload contracts. Server effects are unverified. |
| Export | Permission-gated CSV exports only rows loaded on the current page, not the complete filtered dataset. |

**Authoritative server ordering remains unverified.** Do not claim latest effective assignment ordering or sort only the loaded page as a substitute. Unsupported date filtering is visibly unavailable. Existing request construction is preserved; filter encoding/normalization has not been certified by the focused mocked test.

## 6. Lead Workspace Terminology Decisions

- **Designation → Profession: DISPLAY ONLY.** Legacy field remains `clientDesignation`; preserve raw text. No `OccupationTbl` join or field migration is implied.
- **Untouch Lead → Warm: DISPLAY/PRESENTATION MAPPING ONLY.** Retains the legacy null virgin/calling-relation rule; no temperature value is written to the database. Assigned Leads' nullish check also matches an absent relation; Lead 360 checks field presence first.
- Keep **Lead Status**, **Lead Temperature**, **Lead Assignment**, **Lead Disposition**, and **Data Quality** conceptually separate. A missing calling relation does not establish an authoritative temperature model.

## 7. Backend-Blocked Items

The actual CRM API/backend repository and deployed implementation are unavailable. The frontend is not evidence of server joins, authorization, tenancy or transactions.

Pending backend evidence: server-side Incomplete Leads filtering/count; authoritative assignment chronology; additional global filters; reminder history; Add Activity customer-ID mapping; authoritative temperature model; data-quality persistence; `listassignleads` and `leadhistoryaction` implementations; transfer/delete authorization and transaction behavior.

Use LW1–LW10 in the [backend discovery checklist](SELLMORE_BACKEND_DISCOVERY_CHECKLIST.md). Request source/revision metadata, sanitized contracts and synthetic/staging fixtures, not credentials. Do not fabricate reminder history, customer mappings or unsupported filters.

## 8. Database State

The [legacy database audit](database/SELLMORE_LEGACY_DATABASE_AUDIT.md) reports a schema-only MariaDB reference with **182 tables**, **60 without declared primary keys**, and only **six declared foreign keys**. These are audit findings, not a fresh SQL recount during recovery. The dump does not prove the live deployment, row quality, tenant ownership or API behavior.

The legacy model is not the final SELLMORE target. [Target database architecture](database/SELLMORE_TARGET_DATABASE_ARCHITECTURE.md) is conceptual/planning only; [migration plan](database/SELLMORE_DATABASE_MIGRATION_PLAN.md) specifies gradual compatibility-preserving evolution. No SELLMORE migrations have been approved or executed in this work. Do not equate `company_id` with tenant identity without domain-specific evidence.

Raw `database/LEGACY_CRM_DATABASE_REFERENCE.sql` remains pending provenance/content review before checkpoint inclusion. The audit still describes its original Downloads attachment and an earlier missing workspace reference; reconcile that historical reference when approved.

## 9. Target Domain Direction

Conceptual future chain, not a claim of implemented relationships:

Contact / Client → Lead → Requirement → Physical Property → Listing → Matching → Viewing → Offer → Deal → Commission

Future capabilities include Broker Network, Marketplace, Builder/Developer, Maps, Notices, Marketing Studio, Academy, AI/Voice, Subscriptions and Audit/Security. Use the master architecture/domain/database documents for definitions and schemas.

## 10. Current Test State

**`src/Components/SalesDashboard/AssignListing.test.js`: 9 passed / 0 failed**, validated on **2026-10-06** using the existing runner:

```sh
CI=true npm test -- --watchAll=false --runInBand --runTestsByPath src/Components/SalesDashboard/AssignListing.test.js
```

Non-failing React `act(...)` warnings remain. The table-scoped `Project A` assertion passed, supporting resolution of the ambiguous filter-option/table-cell lookup. Because the test file was untracked, Git could not reconstruct the earlier reported +1/−1 edit.

This focused mocked test result does **not** validate the entire repository suite, live API behavior or production build. These focused files exist, but their current recovery pass state has not been established:

- `src/Components/SalesDashboard/Dashboard.test.js`
- `src/Components/SalesDashboard/LeadHistory.test.js`
- `src/Components/FinanceDashboard/Dealform/ListDealForm.test.js`

## 11. Current Working-Tree / Checkpoint State

The read-only recovery inventory identified **13 modified tracked files and 19 untracked files** before this handoff was created: product/UI changes, four focused tests, architecture/audit/database documents, generated login image assets and dependency files. This handoff adds one new untracked document to that snapshot; confirm live Git status before staging.

The recommended recovery checkpoint includes the 17 recovered product/UI files, four focused tests, six architecture/audit/database Markdown files and both generated login asset/provenance files. Include this handoff in the future checkpoint as current project memory. Use explicit paths after reviewing status; do not stage everything indiscriminately.

Pending review/exclusion:

- `package-lock.json`: new npm lockfile; unchanged `package.json` does not establish an intended package-manager/dependency change.
- `yarn.lock`: broad integrity/regrouping and resolution changes, including `string_decoder` and `tslib`; not merely formatting.
- `docs/database/LEGACY_CRM_DATABASE_REFERENCE.sql`: raw reference content/provenance and repository suitability are not yet validated.

No recovery Git checkpoint has been committed yet. A recovery checkpoint preserves state; a later validated checkpoint records accepted behavior.

## 12. Historical Evidence

Old Chat/Copilot sessions and audit documents are historical evidence, not authoritative descriptions of current implementation. In particular, older audits describe Assigned Leads and Deal Form hazards that current changes partly address.

Evidence priority when resolving conflicts:

1. Current Git state and current code.
2. This handoff, checked against current code.
3. Master architecture/domain documents for approved target direction.
4. Specialist audits within their dates and evidence limits.
5. Historical conversations.

## 13. Rules for Future Codex Sessions

1. Read this handoff first.
2. Read only task-relevant specialist documents.
3. Inspect only task-relevant source files.
4. Preserve existing API/database contracts unless explicitly authorized.
5. Avoid repository-wide rescans.
6. Avoid scanning/reading `node_modules` and `build`.
7. Use focused tests appropriate to the approved package.
8. Stop after the approved work package.
9. Update this handoff after an approved work package materially changes project state.
10. Never assume a historical audit describes current implementation without checking current code.

## 14. Immediate Next Steps

Sequence to undertake only within the next explicitly approved scope; none is executed by this documentation task:

1. Create the SELLMORE recovery Git checkpoint, excluding the three pending-review files above.
2. Human visual review of Assigned Leads, Lead 360 and Lead Action Center.
3. Validate remaining focused tests relevant to recovered work.
4. Fix only genuine issues discovered in human/test review.
5. Create a validated checkpoint.
6. Start subsequent SELLMORE work packages in fresh Codex sessions.

No next feature implementation has been selected.
