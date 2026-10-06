# SELLMORE Current State Handoff

Updated: **2026-10-07, Asia/Karachi**. Scope: recovered working-tree implementation and focused recovery validation. This is an operational handoff, not release certification.

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

The safety branch was created to preserve the recovered working tree after the previous Copilot session interruption. The recovery implementation is safely checkpointed in commit `23aeaae` (`Checkpoint: recover SELLMORE architecture and Lead Workspace V1`).

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

## 10. Recovery Validation State

Recovery validation completed. The recovered focused test results are:

| Area | Validation result |
|---|---|
| Assigned Leads | 9/9 PASS |
| Dashboard | 11/11 PASS |
| Lead History | 4/4 PASS |
| Deal Form containment | 1/1 PASS |

**TOTAL RECOVERED FOCUSED TESTS: 25/25 PASS**

Non-failing React `act(...)` warnings remain in Dashboard tests.

These focused mocked test results do **not** validate the entire repository suite, live API behavior or production build. Human visual acceptance remains pending where applicable.

## 11. Current Working-Tree / Checkpoint State

The recovery implementation is safely checkpointed in commit `23aeaae` (`Checkpoint: recover SELLMORE architecture and Lead Workspace V1`). This documentation update records completed recovery validation; it does not change product architecture.

Pending review/exclusion:

- `package-lock.json`: new npm lockfile; unchanged `package.json` does not establish an intended package-manager/dependency change.
- `yarn.lock`: broad integrity/regrouping and resolution changes, including `string_decoder` and `tslib`; not merely formatting.
- `docs/database/LEGACY_CRM_DATABASE_REFERENCE.sql`: raw reference content/provenance and repository suitability are not yet validated.

These three files remain outside this documentation-only checkpoint. Confirm live Git status before any future staging; use explicit paths and do not stage everything indiscriminately.

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

- Recovery validation completed.
- Human visual acceptance remains pending where applicable.
- Recovery implementation is safely checkpointed.
- Future architecture/development work should start in fresh Codex sessions using this handoff as first context.

No next feature implementation has been selected.
