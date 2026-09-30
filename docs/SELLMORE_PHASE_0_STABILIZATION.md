# Sellmore Phase 0 Stabilization Work Package

**Status:** Prioritized plan only. No safeguards or application changes implemented in this turn.  
**Date:** 30 September 2026  
**Basis:** [Verified frontend audit](REDBOX_CRM_MASTER_AUDIT.md) and [Master architecture](SELLMORE_MASTER_ARCHITECTURE.md).  
**Execution:** Separate implementation approval after review, as explicitly requested by the owner.

This package makes the immediate work reviewable: exact affected files, confirmed risks, unresolved contracts, tests, acceptance criteria and implementation order. It does not authorize a rewrite, schema migration, dependency upgrade, production URL change or destructive production test. Backend file paths cannot be supplied because that repository is unavailable; those tasks are labeled **BACKEND VERIFICATION REQUIRED**.

## 1 Priority and recommended sequence

| Order | Phase-0A item | Detailed plan |
|---|---|---|
| 1 | Baseline build/test reproducibility | A10 below; existing P0-01 |
| 2 | Deal Form wrong-resource protection | A01; existing P0-02 |
| 3 | Vehicle Pass wrong-resource protection | A02; existing P0-02 |
| 4 | Password-response verification; obtain auth/policy evidence concurrently | A05; existing P0-04 and Phase-0B discovery |
| 5 | Login/network failure handling | A04; existing P0-05 |
| 6 | Lead field-contract/round-trip repair plan | A03; existing P0-06 matrix |
| 7 | Route/permission regression matrix | A06; existing P0-07 |
| 8 | Existing role-dashboard regression verification | A08 |
| 9 | Sensitive Redux/localStorage inventory and minimal-policy review | A07 |
| 10 | Existing lint error characterization, touched-code checks and release review | A09; existing P0-11 |

**Scope rule:** A01–A10 below are the ten requested Phase-0A items. The earlier P0 ticket identifiers remain as supporting detail, not an alternative execution sequence. P0-03 is Phase-0B server discovery. P0-08 finance and P0-09 reservations are separate follow-on packages and release dependencies where relevant, not automatic additions to a frontend safeguard patch. Broad listener/performance work in P0-10 is also separately scoped. Verification gates may stop a dependent item; other authorized independent work can proceed. Nothing in this document authorizes implementation now.

Containment of a known wrong-resource action does not depend on guessing its replacement endpoint. Multi-tenant production onboarding remains blocked until server isolation is verified. An unfinished server task cannot be declared passed because frontend tests succeed.

## 2 P0-01 Baseline and staging controls

**Exact existing files:** [App.js](../src/App.js), [Dashboard.test.js](../src/Components/SalesDashboard/Dashboard.test.js), [package.json](../package.json), [yarn.lock](../yarn.lock), [package-lock.json](../package-lock.json), [audit](REDBOX_CRM_MASTER_AUDIT.md).

**Risk:** losing recent dashboard/login work, changing dependency resolution, or testing destructive actions against live records. **Proposed owner:** frontend maintainer with release owner. **Complexity:** Small.

**Work:** record working-tree changes and baseline hashes; keep the audit immutable; use fixture-only request interception for frontend tests. Establish server staging/restore ownership before integration tests. Preserve all 287 paths, parameters, standalone print/affiliate modes and legacy IDs. Agree the package manager without rewriting lockfiles in the stabilization patch.

**Tests and acceptance:** all existing dashboard tests pass; new tests intercept every mutation and reject unmocked network access. No production credentials or records in fixtures. A scoped diff shows only intended files. Current lint baseline is 1 error/6,733 warnings from the audit; evaluate new diagnostics separately, with no mass auto-fix.

**Rollback:** revert only the scoped implementation commit; preserve unrelated dirty files. Backend data rollback is not implied by a frontend revert.

## 3 P0-02 Wrong-resource containment

**Exact existing files:**

- [Dealform/ListDealForm.js](../src/Components/FinanceDashboard/Dealform/ListDealForm.js): selects `PettyCashreducers`, dispatches `PettyCashAction`, renders petty-cash print/edit links and calls `DELETE pettycash/{id}` through `DeletePettyCash`.
- [VehcilePass/ListVehcilePass.js](../src/Components/FinanceDashboard/VehcilePass/ListVehcilePass.js): same copied read/delete code; its row actions and pagination are currently commented out. The mounted component still dispatches petty-cash reads.
- [PettyCashAction.js](../src/redux/action/PettyCashAction.js), [PettyCash/ListPettyCash.js](../src/Components/FinanceDashboard/PettyCash/ListPettyCash.js): genuine cash workflow boundary to preserve.
- [Dealform/AddDealForm.js](../src/Components/FinanceDashboard/Dealform/AddDealForm.js), [VehcilePass/AddVehcilePass.js](../src/Components/FinanceDashboard/VehcilePass/AddVehcilePass.js): intended workflow evidence to reconcile; no guessed replacement list contract.

**Risk:** Deal Form users can delete a petty-cash record from a misleading business context. Vehicle Pass contains dormant destructive code that could become reachable during later UI work. The two risks are not identical. **Proposed owners:** finance/operations process owner and frontend maintainer. **Complexity:** Small containment; replacement workflow estimate deferred.

**Recommended separately approved change:** remove or unconditionally block copied delete execution on these two screens, disable misleading mutation links and show an honest temporary unavailable state. Do not merely hide a button while leaving a reachable mutation handler. Consider suppressing mislabelled petty-cash list reads until the business owner confirms the intended source. Retain routes and legitimate M37 cash actions. Do not substitute `dealform/{id}` or `vehiclepass/{id}` based only on naming.

**Proposed new tests:** `src/Components/FinanceDashboard/WrongResourceActions.test.js`. Mount both pages with synthetic petty-cash data and stub dispatch/fetch; test mouse/keyboard activation, direct legacy routes and empty data. Assert zero petty-cash mutations or misleading edit navigation. Assert the genuine cash workflow retains its independently authorized behavior. After the intended contract is verified, enabling tests must assert the exact approved method/resource family, selected ID and policy outcome, rejecting mismatched fixtures even when numeric IDs collide.

**Acceptance:** no path from these screens can mutate petty cash; explanation is visible; routes still resolve; no destructive live call made; finance owner identifies the intended resources before re-enabling writes. **Rollback:** keep containment in place if a replacement fails; do not restore a known dangerous action merely to reverse cosmetic changes.

## 4 P0-03 Authorization and tenancy verification

**Exact frontend evidence:** [App.js](../src/App.js), [CrmLayout.js](../src/Includes/CrmLayout.js), [crmNavigation.js](../src/Includes/crmNavigation.js), [Login.js](../src/Components/SalesDashboard/Login.js), [AssignLeadsAction.js](../src/redux/action/AssignLeadsAction.js), [EmployeeRolesAction.js](../src/redux/action/EmployeeRolesAction.js), [getDashboardListACtion.js](../src/redux/action/getDashboardListACtion.js), [AddReminders.js](../src/Components/SalesDashboard/AddReminders.js), [SingleEmpAction.js](../src/redux/action/SingleEmpAction.js). Expand coverage through all actions in audit Appendix C and direct component mutations in Appendix A.

**BACKEND VERIFICATION REQUIRED:** request server route definitions, authentication/session middleware, permission policies, tenant/company mapping, resource services, serializers, file/download authorization, export handlers, integration credentials and revocation logic. Actual filenames remain unknown.

**Risk:** caller-provided employee/company/team IDs may influence scope; sidebar filtering cannot prove API authorization. No remote exploit is claimed. **Proposed owners:** backend maintainer/security reviewer and agency owner. **Complexity:** Medium discovery; remediation depends on evidence.

**Tests:** approved staging actors for anonymous, agent, manager, finance, HR, disabled employee, affiliate and two independent agencies. Cover create/read/update/delete/assign/approve/export/print/download; guessed IDs; mixed-tenant bulk IDs; omitted or forged `company_id`; `agentid=all`; stale membership; revoked sessions; direct legacy URLs/endpoints; files and background jobs. An empty unauthorized response is not sufficient if a write still occurs.

**Acceptance:** verified principal and active tenant/scope derive server-side; no private cross-tenant access; resource checks hold independently of the browser. Record canonical current feature/action IDs and capabilities before fixing the New Lead feature-100 mapping. No auth architecture switch or guessed JWT/session mechanism in this package.

**Rollback:** restore only verified compatible policy versions; never fall back to unrestricted legacy access. Do not onboard a second production tenant until this gate passes.

## 5 P0-04 Employee password serialization

**Exact files:** [AddNewEmployee.js](../src/Components/Hr/AddNewEmployee.js) reads `.password` around line 135 and posts `EmpPass`; [NewAddEmployee.js](../src/Components/Hr/NewAddEmployee.js) assigns `.password` around line 146 and posts `formDatas.Password`; [SingleEmpAction.js](../src/redux/action/SingleEmpAction.js) and [store.js](../src/redux/store.js) are related response/persistence boundaries.

**Risk:** response may contain a plaintext password, hash or sentinel. Only the client read pattern is confirmed; no actual returned credential was retrieved. **BACKEND VERIFICATION REQUIRED:** serializer, create/update/reset validation, unchanged-password semantics and sessions after credential changes. **Proposed owner:** backend identity owner with HR/frontend maintainers. **Complexity:** Medium, pending contract.

**Recommended work:** verify server response shape using synthetic staging accounts. Stop returning password/hash as editable employee data. Separate setting a new credential from leaving it unchanged; do not blindly submit an empty string or remove a required key without knowing the server behavior. Consider any exposed real credential incident through the owner's established process, without reproducing values in reports.

**Tests and acceptance:** synthetic response contains no password/hash; edit cannot prefill one; unrelated employee edits preserve credentials; an authorized explicit reset changes credentials according to contract; unauthorized reset rejected; logs/Redux/browser persistence do not retain credentials. Test both employee form variants. No production password reset is part of verification.

## 6 P0-05 Login and request failure pilot

**Exact existing files:** [Login.js](../src/Components/SalesDashboard/Login.js), [PermissionDataAction.js](../src/redux/action/PermissionDataAction.js), [EmployeeRolesAction.js](../src/redux/action/EmployeeRolesAction.js), [AssignLeadsAction.js](../src/redux/action/AssignLeadsAction.js), [firebase.js](../src/firebase.js), [store.js](../src/redux/store.js).

**Confirmed evidence:** Login sets `LoadingS` before fetch and lacks a catch/finally; it writes auth/team data before completing permission mapping. A malformed successful response can therefore leave partial state. EmployeeRolesAction awaits fetch/JSON outside its dispatch try/catch. AssignLeadsAction dispatches caught errors as payloads. These examples do not authorize rewriting 112 actions in one patch.

**Risk:** infinite spinner, false success, partial session, stale data that appears current. **Proposed owner:** frontend maintainer plus backend contract owner. **Complexity:** Small login pilot, Medium incremental request normalization.

**Recommended design:** one terminal outcome per request: success, empty, denied, expired, validation error, transport error, timeout or cancelled. Validate HTTP and agreed business envelope before committing session/permissions or success navigation; preserve the existing string code semantics until the contract says otherwise. Roll back partial local session writes if initialization fails; clear state on expiry only under the verified auth contract. Use finally for loading, bounded timeouts/cancellation and visible retry. Retry reads where safe; never automatically replay non-idempotent financial/assignment mutations. Push-token failure must not accidentally become authentication success or an unbounded render loop.

**Proposed tests:** `src/Components/SalesDashboard/Login.test.js`; request adapter tests once its location/contract is agreed. Cases: valid/invalid credentials; rejected fetch; 4xx/5xx; invalid JSON; missing user/team/role data; permission mapping failure; localStorage failure; timeout; repeated submit; stale completion after unmount. Assert loading ends, no false success, no partial session and no navigation on failure. Preserve email/form usability without logging passwords.

**Acceptance:** all terminal paths recover visibly; only a validated complete success commits session and navigates; existing dashboard tests pass. **Rollback:** independent login-only patch; do not combine with a new identity provider or global persistence rewrite.

## 7 P0-06 Lead field contract matrix

**Exact existing files:** [AddLeadForm.js](../src/Components/SalesDashboard/AddLeadForm.js), [AddLeads.js](../src/Components/SalesDashboard/AddLeads.js), [ListformAction.js](../src/redux/action/ListformAction.js). `GetSIngleRecords` reads `listassignleads?leadid=...`; `FeildData` posts JSON to `assignleadadd`. The load keys below are observed response reads, not verified database columns.

**BACKEND VERIFICATION REQUIRED applies to every server-contract cell.** “Sent” only means the client includes a key, not that the server persists it. “Not loaded” means this form does not restore it in the inspected edit path. Do not infer keys from HTML `name` attributes.

| Visible field | Current state variable | Current payload key | Current load key | Server contract | Status |
|---|---|---|---|---|---|
| Client Name | `ClientName` | `clientName` | `response.getleads.clientName` | BACKEND VERIFICATION REQUIRED | Sent and loaded in client; verify round trip |
| Mobile No | `ClientMobileNo` | `mobileNo` | `response.getleads.clientPhone` | BACKEND VERIFICATION REQUIRED | Different send/read names observed; verify mapping |
| Client Status | `ClientStatus` | `clientStatus` | Not loaded | BACKEND VERIFICATION REQUIRED | Edit retains default `Buy`; potential overwrite |
| Gender | `ClientGender` | `gender` | Not loaded | BACKEND VERIFICATION REQUIRED | Edit retains default `Male`; potential overwrite |
| Email | `ClientEmail` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Unsaved; initial placeholder `@` is not a valid identity |
| Country | `countryItem` | `country` | Not loaded | BACKEND VERIFICATION REQUIRED | Edit defaults to string `1`; verify reference meaning |
| City | `CityItem` | `city` | Not loaded | BACKEND VERIFICATION REQUIRED | Edit defaults to string `1`; verify country/city linkage |
| Project Prefer | `ProjectIdItem` | `projectPrefer` | Not loaded | BACKEND VERIFICATION REQUIRED | Sent but not restored |
| Property Type | `ProTypeIdItem` | `propertyType` | Not loaded | BACKEND VERIFICATION REQUIRED | Sent but not restored |
| Property Prefer | `ProPrefItem` | `propertyPrefer` | Not loaded | BACKEND VERIFICATION REQUIRED | Sent but not restored |
| Lead Source | `ActivityMediumItem` | `activityMedium` | Not loaded | BACKEND VERIFICATION REQUIRED | Edit defaults to string `21`; source may be overwritten |
| Lead Status | `ClientHoWMuchInter` | `interested` | Not loaded | BACKEND VERIFICATION REQUIRED | Sent but not restored; not a verified future pipeline stage |
| Description | `ClientDescrip` | `desc` | Not loaded | BACKEND VERIFICATION REQUIRED | Sent but not restored |
| Passport/CNIC | `ClientCnic` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Optional rendered field; unsaved in this payload |
| WhatsApp | `ClientWhatsapp` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Optional rendered field; unsaved |
| Preferred Language | `ClientPrefLanguage` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Optional rendered field; unsaved |
| Budget | `ClientBudget` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Label-based selection; currency/range semantics unknown |
| Time Frame | `ClientTimeFrame` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Optional rendered field; unsaved |
| Referred by | `ClientRefferedBy` | Absent | Not loaded | BACKEND VERIFICATION REQUIRED | Free text; not a Partner Attribution Claim |
| Optional fields toggle | `MoreFields` | Absent intentionally | Not loaded | UI only; no server key proposed | Controls visibility, not a persisted business field |

Transport/context fields, not visible editable inputs:

| Context | Current origin | Payload key | Required treatment |
|---|---|---|---|
| Lead identity | `dataId` prop, or `0` for create | `leadid` | Verify assignment versus inquiry identity; preserve legacy URL semantics |
| Agent | `AuthData.id` from localStorage | `agentid` | Server must authorize/derive actor; client value is not proof |
| Company | `AuthData.company_id` | `companyId` | Verify meaning and tenant mapping; preserve casing until adapter approved |

**Risk:** lost optional data and default/empty overwrite on edit. **Proposed owners:** sales process owner and backend/frontend maintainers. **Complexity:** Medium after contract access.

**Recommended sequence:** obtain sanitized create/read/update examples and validation schema → classify every field as supported, intentionally read-only/UI-only, or unresolved → establish ID/date/money semantics → implement a narrow payload/load adapter using verified keys → cancel stale cascading lookups → characterize success/error envelopes. Do not pretend unresolved fields save successfully; any temporary UI treatment needs a separately reviewed implementation choice. Do not assume unknown fields should be persisted in an arbitrary JSON blob.

**Proposed tests:** `src/Components/SalesDashboard/AddLeadForm.test.js`. Create, then load/edit/save a synthetic record with distinct non-default values for every supported field. Verify unchanged edit preserves all values; omitted fields do not clear existing data according to contract; optional visibility does not erase values; source/assignment provenance retained; stale country/city/project requests cannot win; transport/validation errors preserve the form and avoid navigation. Inspect payload keys to prevent guessed additions. Unit fixtures prove frontend mapping; true persistence requires a staged backend round trip.

**Acceptance:** every matrix row has an owner-approved disposition, supported fields round-trip, unresolved mappings explicitly remain blocked, and the saved success indicator agrees with the verified server response. No new client/requirement schema is introduced by this repair.

## 8 P0-07 Route role and print regression

**Exact files:** [App.js](../src/App.js), [CrmLayout.js](../src/Includes/CrmLayout.js), [CrmLayout.css](../src/Includes/CrmLayout.css), [CrmLayoutContext.js](../src/Includes/CrmLayoutContext.js), [crmNavigation.js](../src/Includes/crmNavigation.js), [Navigation.js](../src/Includes/Navigation.js), [OtherNavigation.js](../src/Includes/OtherNavigation.js), [QuickNav.js](../src/Includes/QuickNav.js), [Dashboard.js](../src/Components/SalesDashboard/Dashboard.js), [Dashboard.test.js](../src/Components/SalesDashboard/Dashboard.test.js). Printed-component paths are enumerated under M25/M28/M36–M41/M44/M45 in audit Appendix B; all 287 routes remain in that canonical list.

**Risk:** role-specific landing/action shortcuts lost, feature-ID mismatch, direct routes bypass expected UI, or shell CSS corrupts printed documents. **Proposed owners:** frontend maintainer and representatives of sales/finance/HR/affiliate operations. **Complexity:** Medium.

**Tests:** agency role matrix and legacy finance/HR landing choices; new lead permission 100 reviewed against real policy; standalone login/affiliate/print variants; history/back and bookmarked paths; create/edit/save return routes; locked account; narrow viewport and keyboard; server denial surfaced. For prints, compare approved fixture outputs and identifiers, not live personal documents. Route existence alone is insufficient.

**Acceptance:** every audit route has a module and explicit compatibility disposition; no approved daily action disappears; all ten baseline tests remain green with added meaningful workflow cases. No shell redesign, mass route renaming or brand asset replacement.

## 9 P0-08 Financial identity and totals

**Exact files:** [AddNewPaymentPlan.js](../src/Components/FinanceDashboard/AddNewPaymentPlan.js), [PaymentPlanGenerate.js](../src/Components/FinanceDashboard/PaymentPlanGenerate.js), [NewPaymentReciept.js](../src/Components/FinanceDashboard/NewPaymentReciept.js), [PaymentReciepts/AddNewPaymentReciepts.js](../src/Components/FinanceDashboard/PaymentReciepts/AddNewPaymentReciepts.js), [AllPaymentRecieptAction.js](../src/redux/action/AllPaymentRecieptAction.js), [PayrecieptsAction.js](../src/redux/action/PayrecieptsAction.js).

**Evidence:** payment-plan choices use a Map keyed by `clientName`; payload includes zero placeholders for `NetSalesPrice`, `TotalScheduleAmount`, `BalanaceScheduleAmount`. Their intended server calculation is unknown. Do not assert resulting posted balances are wrong without verification.

**Risk:** distinct same-name customers hidden and ambiguous financial totals. **Proposed owner:** finance owner plus backend/frontend maintainers. **Complexity:** Medium, contract-dependent.

**Tests:** two customers with identical names/different verified IDs; unit/customer association; schedule totals and rounding; discount/zero/large values; duplicate submit; both receipt families; cancellation/reversal. Signed-off golden fixtures must reconcile to server calculations and old printed references.

**Acceptance:** selection preserves identity and all valid candidates; totals match the documented contract; legacy APIs/ledgers remain distinct until finance establishes equivalence. No historic commission/balance backfill from unfinished forms.

## 10 P0-09 Reservations and sold transitions

**Exact files:** [ListInventories.js](../src/Components/SalesDashboard/Inventories/ListInventories.js), [SoldInventories.js](../src/Components/SalesDashboard/Inventories/SoldInventories.js), [ListInventoriesaffiliates.js](../src/Components/BrokerAffiliate/AffiliateInventories/ListInventoriesaffiliates.js), [ListInventoriesdata.js](../src/redux/action/ListInventoriesdata.js), [SingleProjectInventoriesdata.js](../src/redux/action/SingleProjectInventoriesdata.js).

**BACKEND VERIFICATION REQUIRED:** `inventoryhold`, `inventoryUnhold`, `inventoryCancelled`, `inventorysold` transactions, expiry jobs and object policies. **Risk:** conflicting holds/sales or display of a hardcoded countdown as authoritative. **Proposed owner:** inventory controller/backend maintainer. **Complexity:** Medium discovery, implementation dependent.

**Tests:** two simultaneous hold attempts, hold versus sale, expired hold versus sold lock, duplicate request, unhold by unauthorized agent/partner, stale resource version and tenant mismatch. Use synthetic staging units only.

**Acceptance:** one consistent authoritative transition wins; expiration cannot unlock sold stock; errors reconcile UI to actual state; history records actor/time/reason. Preserve existing unit/sale IDs. Do not emulate a server lock with a frontend timer.

## 11 P0-10 Storage subscriptions and measured hardening

**Exact files:** [store.js](../src/redux/store.js), [rootReducer.js](../src/redux/reducers/rootReducer.js), [App.js](../src/App.js), [firebase.js](../src/firebase.js), [firebase-messaging-sw.js](../public/firebase-messaging-sw.js), [Login.js](../src/Components/SalesDashboard/Login.js), [AssignListing.js](../src/Components/SalesDashboard/AssignListing.js), [ListMyLeads.js](../src/Components/SalesDashboard/ListMyLeads.js), [VirginData.js](../src/Components/SalesDashboard/AssignLeads/VirginData.js).

**Risk:** persisted sensitive slices, repeated subscriptions/DOM handlers, stale account data and an undefined `actionConfig` in a potentially unused file. **Proposed owner:** frontend maintainer with identity/backend owner. **Complexity:** Medium, split into independent patches.

**Work:** inventory each persisted slice and sensitive fields; propose an allowlist for non-sensitive preferences with verified session handling. Logout/account switch cancels requests and clears scoped state; test multi-tab and rehydration behavior. Move listeners/handlers to lifecycle-managed setup/cleanup after characterization. Preserve FCM capability; existing service workers do not justify adding PWA/offline caching.

**Tests and acceptance:** no stale record appears after account switch; two renders do not double-register handlers/listeners; unmount cleans up; refresh/rehydration remain usable; notification path still works. Measure API calls, bundle and render timing before/after performance changes. Fix unused-file lint error only in a separately reviewed cleanup before reuse, not by deleting candidate folders. No dependency upgrades bundled with domain fixes.

## 12 P0-11 Review and release evidence

Required review packet:

1. Scoped diff and unchanged-file comparison; routes/assets/configuration/dependencies preserved except explicitly approved changes.
2. Mocked regression results plus authorized backend tests where applicable; no claim of tenancy validation from frontend-only mocks.
3. Resolved field-contract matrix, API/resource policy evidence and owner decisions for deferred mappings.
4. Financial/inventory fixture reconciliation and print acceptance for affected workflows.
5. Fresh targeted lint/test results, with baseline diagnostics distinguished from introduced failures.
6. Rollout cohort, observation period, failure thresholds, support owner and practical rollback/repair instructions.
7. Residual release blockers with accountable owners; no green “SaaS ready” label while server isolation or credential serialization is unverified.

**Do not change during this package without a distinct reviewed task:** auth architecture, production origins, legacy schema/IDs, historical journals/balances, broad receipt consolidation, module deletion, subscription enforcement, native/PWA app, MLS sharing, automated commission payouts or AI writes.

## 13 Verification of this planning deliverable

This turn prepares documents only. Proposed test filenames do not imply tests were added. Baseline audit results are quoted as historical evidence; application tests need not be rerun merely for prose. Source preservation and document cross-reference checks are recorded in the master architecture after completion. No live API, deletion, upload, credential reset, message send or database mutation was performed.

## 14 Explicit Phase-0A acceptance cards

The A identifiers follow the ten items in specification section 108; execution order is section 1 above. Every item has eight review dimensions. Tests described here are future work, not executed checks.

### A01 Deal Form wrong-resource protection

- **Exact files:** `src/Components/FinanceDashboard/Dealform/ListDealForm.js`, `src/Components/FinanceDashboard/Dealform/AddDealForm.js`, `src/redux/action/PettyCashAction.js`; preserve `src/Components/FinanceDashboard/PettyCash/ListPettyCash.js`.
- **Current evidence:** copied `PettyCashreducers`/`PettyCashAction` and live `DeletePettyCash` row control target the cash resource; misleading cash edit/print shortcuts exist.
- **Risk:** a user in Deal Form can act on a genuine cash record under the wrong business label.
- **Recommended change:** contain copied mutations and misleading shortcuts; retain the URL and a clear unavailable state. Suppress mislabelled reads unless the intended source is established. Do not invent replacement endpoints.
- **Backend evidence needed:** intended Deal Form list/identity/read/write contracts and object/action policies; genuine petty-cash behavior. Containment does not require guessing these.
- **Tests:** mocked selected-ID collision fixtures, mouse/keyboard controls and direct route; zero cash mutations/incorrect shortcuts; genuine cash controls retain independently authorized behavior. Proposed `src/Components/FinanceDashboard/WrongResourceActions.test.js`.
- **Acceptance criteria:** no reachable Deal Form path mutates petty cash; URL remains compatible and the temporary limitation is clear; no live destructive calls.
- **Rollback:** revert unrelated presentation regressions independently; keep unsafe actions blocked until a verified replacement passes.

### A02 Vehicle Pass wrong-resource protection

- **Exact files:** `src/Components/FinanceDashboard/VehcilePass/ListVehcilePass.js`, `src/Components/FinanceDashboard/VehcilePass/AddVehcilePass.js`, `src/redux/action/PettyCashAction.js`.
- **Current evidence:** copied cash read/delete handler exists, but row-action and pagination JSX is commented; mounting still dispatches the cash read.
- **Risk:** misleading data reads and dormant destructive code could be reactivated. This is not evidence of a currently clickable delete button.
- **Recommended change:** prevent copied handler execution and stop the misleading resource read; keep the route and clear unavailable state pending the proper contract. Never uncomment controls as a repair.
- **Backend evidence needed:** vehicle-pass identity/list/action contract and authorization; confirm intended business workflow with operations/finance.
- **Tests:** the same proposed wrong-resource test file independently mounts Vehicle Pass; verifies no petty-cash request/mutation or accidental action activation; retains genuine cash workflow tests.
- **Acceptance criteria:** no cash access from this mislabelled screen; route resolves; replacement remains unavailable until verified.
- **Rollback:** preserve containment; restore compatible rendering only, never copied resource calls.

### A03 Lead form field-contract and round-trip repair plan

- **Exact files:** `src/Components/SalesDashboard/AddLeadForm.js`; its current lookups and mutation contract are enumerated in the audit and section 7 above.
- **Current evidence:** edit restores only client name/phone in the inspected path; several displayed fields are absent from the payload, and defaults may overwrite values. Section 7 contains the state/payload/load matrix, including unresolved fields.
- **Risk:** misleading successful saves and data loss on unchanged edits; assignment/source provenance may be lost.
- **Recommended change:** agree field contracts first; introduce narrow create/load/edit mappings only for verified keys, preserve unsupported existing data, and resolve stale lookup responses. Do not fabricate persistence for optional fields.
- **Backend evidence needed:** sanitized create/read/update envelopes; supported keys, omitted/null/empty semantics, types, validation and actor/assignment policies.
- **Tests:** proposed `src/Components/SalesDashboard/AddLeadForm.test.js`; distinct non-default values, unchanged edit, optional visibility, stale lookup and network failure; staged create/read/update/read confirms actual persistence after approval.
- **Acceptance criteria:** every visible field is supported or honestly classified; verified fields survive round trips without resetting unrelated values. Mock payload tests alone do not prove persistence.
- **Rollback:** restore compatible adapter/UI mapping; retain new persisted fields and audit; reconcile affected records under an approved repair plan rather than deleting data.

### A04 Login and network failure handling

- **Exact files:** `src/Components/SalesDashboard/Login.js`, `src/redux/action/PermissionDataAction.js`, `src/redux/action/EmployeeRolesAction.js`, `src/redux/action/AssignLeadsAction.js`, `src/firebase.js`.
- **Current evidence:** login lacks catch/finally and writes session fragments before permission mapping; employee-role fetch/JSON sits outside its try; assignment errors can become data payloads. FCM token request is in render.
- **Risk:** stuck submit, incomplete session, misleading success or stale permissions; repeated render-side token work.
- **Recommended change:** first isolate login terminal states and validated commit; characterize one bounded action failure contract. Lifecycle-manage the token request only with notification parity. Do not rewrite every action or switch authentication systems.
- **Backend evidence needed:** actual success/error/session/permission envelopes, expiry/revocation and existing FCM registration expectations; no guessed JWT/cookie scheme.
- **Tests:** proposed `src/Components/SalesDashboard/Login.test.js`; invalid credentials, HTTP/network/JSON/permission/storage errors, double submit, timeout and unmount; success commits complete state once; failed operations never navigate.
- **Acceptance criteria:** all terminal paths release loading, preserve usable feedback and prevent partial success; existing notification and login flows remain compatible.
- **Rollback:** separate login/request patch; preserve known safe failure handling while reverting incompatible presentation or contract assumptions.

### A05 Password-response verification

- **Exact files:** `src/Components/Hr/AddNewEmployee.js`, `src/Components/Hr/NewAddEmployee.js`, `src/redux/action/SingleEmpAction.js`, `src/redux/reducers/SingleEmpreducers.js`, `src/redux/store.js`.
- **Current evidence:** both forms read a response `.password` into editable state and post a password field. Actual response content was not retrieved, so plaintext versus hash versus sentinel is unknown.
- **Risk:** credential material may be exposed or unintentionally overwritten during unrelated edits.
- **Recommended change:** obtain the serializer/update/reset contract first; return no credential material, separate unchanged credentials from an explicit authorized reset, and prevent browser persistence of credential responses.
- **Backend evidence needed:** employee serializer and create/edit/reset validation, hashing implementation, authorization and session revocation. Use synthetic accounts, never retrieve real passwords for this audit.
- **Tests:** synthetic secret sentinel must never serialize, prefill, log or persist; unrelated edits preserve authentication; explicit authorized reset works and unauthorized reset is denied in both form variants.
- **Acceptance criteria:** backend evidence confirms no credentials in employee read responses and a safe reset contract; frontend-only hiding cannot close this item.
- **Rollback:** keep secure serializer behavior; pause incompatible edits/reset actions while restoring a compatible client. Never restore credential-returning responses as a rollback.

### A06 Route and permission regression matrix

- **Exact files:** `src/App.js`, `src/Includes/CrmLayout.js`, `src/Includes/CrmLayout.css`, `src/Includes/CrmLayoutContext.js`, `src/Includes/crmNavigation.js`, `src/Includes/Navigation.js`, `src/Includes/OtherNavigation.js`, `src/Includes/QuickNav.js`, `src/Components/SalesDashboard/Dashboard.test.js`; all 287 exact paths/components in the migration route register.
- **Current evidence:** compatibility shell coexists with numeric permission IDs and standalone print/affiliate modes; New Lead feature-100 mapping needs contract review. Existing tests mock boundaries.
- **Risk:** hidden daily actions, wrong scope, broken deep links/prints or treating sidebar filtering as authorization.
- **Recommended change:** build an explicit route × role × action × scope matrix, preserving numeric IDs until verified semantic mapping; test direct navigation separately from menu visibility.
- **Backend evidence needed:** current numeric feature/action definitions, effective role/scope calculations, principal and per-resource enforcement; verify every sensitive API independently.
- **Tests:** anonymous, sales own/team, manager, finance, HR, affiliate, disabled/revoked users and separate tenants in approved staging; bookmarked URLs, back/forward, return navigation, print/download/export and API denial. Use the actor matrix below.
- **Acceptance criteria:** all 287 paths have a disposition; approved actions remain reachable; print/affiliate layouts and server denial behavior pass; unsupported roles fail closed.
- **Rollback:** restore compatible routes/UX without bypassing policy; retain stricter verified server enforcement.

### A07 Sensitive Redux and localStorage inventory

- **Exact files:** `src/redux/store.js`, `src/redux/reducers/rootReducer.js`, every registered reducer listed in section 15, `src/Components/SalesDashboard/Login.js`, `src/Components/BrokerAffiliate/AffiliateOtp.js`, `src/Includes/CrmLayout.js`, `src/Includes/Navigation.js`.
- **Current evidence:** full combined root persists through redux-persist local storage without an allowlist; explicit session/team/affiliate keys exist. Inventory below records identifiers only, never stored values.
- **Risk:** retained PII/HR/finance/session state and stale cross-account data; localStorage.clear alone need not clear in-memory Redux or cancel pending writes/requests.
- **Recommended change:** review every slice; propose minimal non-sensitive preference persistence and verified session ownership; design purge/reset/cancellation and rehydration migration before implementation. Do not blindly clear keys during this planning task.
- **Backend evidence needed:** session/token storage/expiry/revocation, device/FCM linkage, logout and account-switch contracts; response classifications and caching constraints.
- **Tests:** account A→B, tenant switch, logout during pending fetch/persist write, refresh/rehydration, multi-tab, partner↔employee context and expired session. No previous private record or stale permission can reappear; valid session behavior remains usable.
- **Acceptance criteria:** signed slice/key classification and minimal policy, scoped reset plan and negative fixtures; this inventory alone is not a security remediation.
- **Rollback:** version persistence migration; recover only allowed preferences and valid session metadata. Never restore a sensitive cached snapshot to solve a UI issue.

### A08 Existing role-dashboard regression verification

- **Exact files:** `src/Components/SalesDashboard/Dashboard.js`, `src/Components/SalesDashboard/Dashboard.test.js`, `src/Components/FinanceDashboard/FinanceDashboard.js`, `src/Components/Hr/HrDashboard.js`, `src/Components/BrokerAffiliate/AffiliateDashboard.js`, `src/Includes/CrmLayout.js`, `src/Includes/crmNavigation.js`, `src/App.js`, `src/redux/action/getDashboardListACtion.js`.
- **Current evidence:** the modern shared home replaces older role landing behavior; specialist dashboards still exist. Ten mocked baseline tests cover only a subset of role, data and shell behavior; operation/marketing templates are not working metrics.
- **Risk:** finance/HR workflows or correct role-specific scope disappear; ambiguous counts imply unsupported revenue/conversion.
- **Recommended change:** preserve the current shell and agree default landing/shortcut parity per role; define metric source/meaning and truthful unavailable states. No dashboard redesign is authorized.
- **Backend evidence needed:** dashboard response meaning, source filters, employee/team/company scope and server permission checks; business-owner approval for landing defaults.
- **Tests:** actual sales, manager, finance, HR and affiliate fixture journeys; authorized quick actions, zero/loading/error, restricted data, locked account, chart rendering and responsive keyboard access; compare totals only to approved source fixtures.
- **Acceptance criteria:** each role reaches its approved daily work and sees only authorized verified metrics; templates clearly unavailable; all ten baseline tests plus new meaningful cases pass.
- **Rollback:** restore approved landing/shortcut configuration, retain current source contracts and permission boundaries; no full shell rollback required.

### A09 Existing lint error characterization

- **Exact files:** `src/Components/SalesDashboard/AssignLeads/VirginData.js`, `src/Components/SalesDashboard/AssignLeads/`, `package.json`; static import/route evidence in the audit.
- **Current evidence:** `VirginData.js` references `actionConfig` without an import/definition; the audit counted one lint error and 6,733 warnings. Its candidate-unused status does not authorize removal.
- **Risk:** reuse would throw at request construction; blanket cleanup could change behavior across unrelated modules. Warnings are not all functional defects.
- **Recommended change:** reproduce the precise diagnostic and reachability in the agreed environment; after separate approval, apply a scoped import/contract repair if appropriate, without deleting candidate files. Triage touched authorization, network, scope, hooks and money warnings by risk.
- **Backend evidence needed:** none to reproduce no-undef; verify `listvirginleads` contract/policy before activating or behavior-testing the component.
- **Tests:** focused lint before/after; static import/route check; if reused, mocked request and failure fixture. Record residual warning baseline instead of suppressing all warnings.
- **Acceptance criteria:** exact baseline error explained and any approved correction produces no new diagnostic/behavior regression; no unapproved removal or mass auto-fix.
- **Rollback:** revert only the scoped lint patch and keep the component out of new flows; do not claim the baseline has been fixed in this documentation turn.

### A10 Baseline build and test reproducibility

- **Exact files:** `package.json`, `yarn.lock`, `package-lock.json`, `src/App.js`, `src/Components/SalesDashboard/Dashboard.test.js`, `docs/REDBOX_CRM_MASTER_AUDIT.md`; existing runtime/build configuration only after inspection.
- **Current evidence:** CRA/React 18 with both lockfiles; audit reports ten passing mocked tests, one lint error/6,733 warnings and about 3.91 MB raw main JS. These are historical measurements, not fresh verification here.
- **Risk:** irreproducible installation, overwritten uncommitted work, unintended production requests and false confidence from mocked coverage.
- **Recommended change:** record Node/package-manager versions and owner-approved lockfile, source revision/dirty diff and asset hashes; establish isolated fixture execution and an exact command/result log. No dependency upgrade or lockfile rewrite in this task.
- **Backend evidence needed:** staging environment separation and sanitized fixtures for integration checks; frontend mock baseline can proceed without production access.
- **Tests:** use the inspected package scripts in the agreed environment for install/build, non-watch baseline tests and scoped lint; intercept network calls and prohibit production mutations. Compare route count, bundle artifacts and touched-file diagnostics.
- **Acceptance criteria:** another maintainer can reproduce command/environment/results; prior dirty work survives; deviations from historical counts are explained; no destructive live tests.
- **Rollback:** restore the scoped branch/build configuration and approved lockfile only; retain unrelated user changes and evidence. No data rollback is implied.

### Route and action actor matrix

Populate each of the 287 route rows with supported actions and expected visibility/response. Not every role gets every operation; an explicit deny is a valid expected result.

| Actor/context | UX expectation | Server expectation | Required negative case |
|---|---|---|---|
| Anonymous | Login or public entry only | Deny private operations | Direct private URL/API/file |
| Active agent, own scope | Approved own sales work | Check action and object ownership | Another agent's client through duplicate lookup |
| Team manager | Authorized team work | Compute team membership server-side | Forged team/employee/company query |
| Department/branch manager | Only granted organizational scope | Validate effective hierarchy | Peer branch/department record |
| Finance | Approved finance views/actions | Separate create/approve/reverse/export | Unauthorized payment/commission approval |
| HR | Granted HR fields only | Protect employee identity/payroll | Sales user obtains HR response |
| Partner | Relationship-specific portal projection | Verify partner/agency grant | Full client/owner contact from partial match |
| Disabled or revoked user | No protected work after revocation | Reject stale session/permission | Cached URL or pending write after disable |
| Other tenant | No foreign private data | Deny colliding/guessed IDs and bulk mixes | Cross-tenant read/write/export/download |
| Platform administrator | Separate console | Only explicitly granted audited support access | Platform role treated as universal data bypass |

## 15 Current persistence inventory

Static source inventory only. Reducer identifiers establish what can be persisted, not the exact runtime payload or retention duration. No browser storage values or real customer records were opened. `src/redux/store.js` uses key `persist-store` and redux-persist's local-storage adapter with no allowlist/denylist; the adapter's default prefix normally yields `persist:persist-store` (verify the installed version during execution). Every root slice below is therefore eligible for persistence. This is not a list of approved persisted data.

| Explicit storage key | Evidence | Risk and target treatment |
|---|---|---|
| `authdata` | Login writes response data; static literal references in 104 source files | Session/profile/scoping payload; inspect contract, minimize and never authorize from its contents |
| `empTeam` | Login writes returned team data; references in 23 files | Team identifiers may become stale; refresh from verified server context, not durable authority |
| `affiliateauthdata` | AffiliateOtp writes response data; references in 14 files | Partner identity/session projection; separate from employee context and clear scoped state on switch |
| `EmployeeRolereducers` | Removal in legacy Navigation.js only | Legacy key cleanup evidence, not proof of a current writer; inspect safe migration before relying on removal |
| `dashCountReducer` | Removal in legacy Navigation.js only | Legacy key cleanup evidence, not proof of a current writer |
| `persist:persist-store` (expected default-prefixed key) | Root persistence configuration | Broad reducer cache; replace with reviewed minimal preference policy only after session/rehydration design |

Literal-reference counts include reads/writes/removals and are a source-search snapshot, not runtime use measurements. Computed keys, third-party IndexedDB/FCM data and service-worker caches require separate runtime inventory with synthetic accounts; they are not proven absent.

All registered slices follow. The exact reducer file is linked where present. **Default proposed disposition for every row: do not persist until classified and justified; server permission remains authoritative.** Even apparently harmless reference/configuration data may contain agency-specific information. Field-level classification and retention require the response schema, not just the slice name.

| Root slice | Existing reducer source | Review scope |
|---|---|---|
| `Dimensionlevel2reducers` | [Dimensionlevel2reducers.js](../src/redux/reducers/Dimensionlevel2reducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Dimensionlevel3reducers` | [Dimensionlevel3reducers.js](../src/redux/reducers/Dimensionlevel3reducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Dimensionlevelreducers` | [Dimensionlevelreducers.js](../src/redux/reducers/Dimensionlevelreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `dashCountReducer` | [dashCountreducer.js](../src/redux/reducers/dashCountreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `assignLeadsreducer` | [assignLeadsreducer.js](../src/redux/reducers/assignLeadsreducer.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `myLeadsreducer` | [myLeadsreducer.js](../src/redux/reducers/myLeadsreducer.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `hotLeadsreducer` | [hotLeadsreducer.js](../src/redux/reducers/hotLeadsreducer.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `inventoriesreducer` | [inventoriesreducer.js](../src/redux/reducers/inventoriesreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `SingleInventoriesreducer` | [SingleInventoriesreducer.js](../src/redux/reducers/SingleInventoriesreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `ListInventoriesreducer` | [ListInventoriesreducer.js](../src/redux/reducers/ListInventoriesreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Listformreducer` | [Listformreducer.js](../src/redux/reducers/Listformreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Singlemyleadreducers` | [Singlemyleadreducers.js](../src/redux/reducers/Singlemyleadreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `SingleProInventoriesreducer` | [SingleProInventoriesreducer.js](../src/redux/reducers/SingleProInventoriesreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `NotinterestedOptreducers` | [NotinterestedOptreducers.js](../src/redux/reducers/NotinterestedOptreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Callingreducers` | [Callingreducers.js](../src/redux/reducers/Callingreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `VirginLeadsreducers` | [VirginLeadsreducers.js](../src/redux/reducers/VirginLeadsreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Noticeboardreducers` | [Noticeboardreducers.js](../src/redux/reducers/Noticeboardreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `ReminderLeadsreducers` | [ReminderLeadsreducers.js](../src/redux/reducers/ReminderLeadsreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Activitiesreducers` | [Activitiesreducers.js](../src/redux/reducers/Activitiesreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `NotinterestedLeadsreducers` | [Notinterestedreducers.js](../src/redux/reducers/Notinterestedreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `VideoCatreducers` | [VideoCatreducers.js](../src/redux/reducers/VideoCatreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Educationreducers` | [Educationreducers.js](../src/redux/reducers/Educationreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `SingleEmpreducers` | [SingleEmpreducers.js](../src/redux/reducers/SingleEmpreducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Videorequestreducer` | [Videorequestreducer.js](../src/redux/reducers/Videorequestreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `SingleVideoreducers` | [SingleVideoreducers.js](../src/redux/reducers/SingleVideoreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `RoleCategoryreducers` | [RoleCategoryreducers.js](../src/redux/reducers/RoleCategoryreducers.js) | Security configuration/effective grants; never cache as authorization authority |
| `ImportLeadreducers` | [ImportLeadreducers.js](../src/redux/reducers/ImportLeadreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `RoleModulereducers` | [RoleModulereducers.js](../src/redux/reducers/RoleModulereducers.js) | Security configuration/effective grants; never cache as authorization authority |
| `RolePermissionModulereducers` | [RolePermissionModulereducers.js](../src/redux/reducers/RolePermissionModulereducers.js) | Security configuration/effective grants; never cache as authorization authority |
| `AffiliateLeadsreducers` | [AffiliateLeadsreducers.js](../src/redux/reducers/AffiliateLeadsreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `SingleAffiliatereducers` | [SingleAffiliatereducers.js](../src/redux/reducers/SingleAffiliatereducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `SingleAffiliateActivityreducers` | [SingleAffiliateActivityreducers.js](../src/redux/reducers/SingleAffiliateActivityreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `listviewdealsreducers` | [listviewdealsreducers.js](../src/redux/reducers/listviewdealsreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `TaskManagementreducers` | [TaskManagementreducers.js](../src/redux/reducers/TaskManagementreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Attendancereducers` | [Attendancereducers.js](../src/redux/reducers/Attendancereducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `SingleAttendancereducers` | [SingleAttendancereducers.js](../src/redux/reducers/SingleAttendancereducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `EmployeeRolereducers` | [EmployeeRolereducers.js](../src/redux/reducers/EmployeeRolereducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `SingleNoticeboardreducers` | [SingleNoticeboardreducers.js](../src/redux/reducers/SingleNoticeboardreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `SingleRolePermissionDatareducers` | [SingleRolePermissionDatareducers.js](../src/redux/reducers/SingleRolePermissionDatareducers.js) | Security configuration/effective grants; never cache as authorization authority |
| `ImportEmployeereducers` | [ImportEmployeereducers.js](../src/redux/reducers/ImportEmployeereducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Permissiondatareducers` | [Permissiondatareducers.js](../src/redux/reducers/Permissiondatareducers.js) | Security configuration/effective grants; never cache as authorization authority |
| `ZoneCallingreducers` | [ZoneCallingreducers.js](../src/redux/reducers/ZoneCallingreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `TransferLeadsreducers` | [TransferLeadsreducers.js](../src/redux/reducers/TransferLeadsreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `SingleAssignLeadsreducers` | [SingleAssignLeadsreducers.js](../src/redux/reducers/SingleAssignLeadsreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Hremployeereducers` | [Hremployeereducers.js](../src/redux/reducers/Hremployeereducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Analyticsreducers` | [Analyticsreducers.js](../src/redux/reducers/Analyticsreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Dailyleadsreportingreducers` | [Dailyleadsreportingreducers.js](../src/redux/reducers/Dailyleadsreportingreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Superdatabasereducers` | [Superdatabasereducers.js](../src/redux/reducers/Superdatabasereducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `WhatsappActivityReducers` | [WhatsappActivityReducers.js](../src/redux/reducers/WhatsappActivityReducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `SecurityFilesReducers` | [SecurityFilesReducers.js](../src/redux/reducers/SecurityFilesReducers.js) | Sensitive document metadata/references and access controls |
| `DocumentfilesReducers` | [DocumentfilesReducers.js](../src/redux/reducers/DocumentfilesReducers.js) | Sensitive document metadata/references and access controls |
| `Payrollreducer` | [Payrollreducer.js](../src/redux/reducers/Payrollreducer.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Bankreducers` | [Bankreducers.js](../src/redux/reducers/Bankreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Stockregreducers` | [Stockregreducers.js](../src/redux/reducers/Stockregreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Listinventorisfiltersreducers` | [Listinventorisfiltersreducers.js](../src/redux/reducers/Listinventorisfiltersreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Singleinventoriesoldreducer` | [Singleinventoriesoldreducer.js](../src/redux/reducers/Singleinventoriesoldreducer.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Pricingreducers` | [Pricingreducers.js](../src/redux/reducers/Pricingreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `AllListingInventoriesreducers` | [AllListingInventoriesreducers.js](../src/redux/reducers/AllListingInventoriesreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `AllBlockWisePlotreducers` | [AllBlockWisePlotreducers.js](../src/redux/reducers/AllBlockWisePlotreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `AllPlotWiseSizereducers` | [AllPlotWiseSizereducers.js](../src/redux/reducers/AllPlotWiseSizereducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `AllPaymentRecieptreducers` | [AllPaymentRecieptreducers.js](../src/redux/reducers/AllPaymentRecieptreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `PaymentPlanreducers` | [PaymentPlanreducers.js](../src/redux/reducers/PaymentPlanreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `AssetListreducers` | [AssetListreducers.js](../src/redux/reducers/AssetListreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `ChequeBookListreducers` | [ChequeBookListreducers.js](../src/redux/reducers/ChequeBookListreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `ChequeOutwardreducers` | [ChequeOutwardreducers.js](../src/redux/reducers/ChequeOutwardreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `SecurityFiltersreducers` | [SecurityFiltersreducers.js](../src/redux/reducers/SecurityFiltersreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `PostDatedChequereducers` | [PostDatedChequereducers.js](../src/redux/reducers/PostDatedChequereducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `ChequeOutwardFiltersreducers` | [ChequeOutwardFiltersreducers.js](../src/redux/reducers/ChequeOutwardFiltersreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `PostDatedFilterreducers` | [PostDatedFilterreducers.js](../src/redux/reducers/PostDatedFilterreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `PaymentVouchereducers` | [PaymentVouchereducers.js](../src/redux/reducers/PaymentVouchereducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Payrecieptsreducers` | [Payrecieptsreducers.js](../src/redux/reducers/Payrecieptsreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `FixedAssetFiltersreducers` | [FixedAssetFiltersreducers.js](../src/redux/reducers/FixedAssetFiltersreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `stockFiltersreducers` | [stockFiltersreducers.js](../src/redux/reducers/stockFiltersreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `PaymentRecieptfilterreducers` | [PaymentRecieptfilterreducers.js](../src/redux/reducers/PaymentRecieptfilterreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `PaymentVoucherReportreducers` | [PaymentVoucherReportreducers.js](../src/redux/reducers/PaymentVoucherReportreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Salesformreducers` | [Salesformreducers.js](../src/redux/reducers/Salesformreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Leadstatusreportreducers` | [Leadstatusreportreducers.js](../src/redux/reducers/Leadstatusreportreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `CallStatusreportreducers` | [CallStatusreportreducers.js](../src/redux/reducers/CallStatusreportreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Leadimportdatareducers` | [Leadimportdatareducers.js](../src/redux/reducers/Leadimportdatareducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Kpireducers` | [Kpireducers.js](../src/redux/reducers/Kpireducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `ListStatusReportReducers` | [ListStatusReportReducers.js](../src/redux/reducers/ListStatusReportReducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `dashboardListReducers` | [dashboardListReducers.js](../src/redux/reducers/dashboardListReducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `PettyCashreducers` | [PettyCashreducers.js](../src/redux/reducers/PettyCashreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `LeadHistoryreducers` | [LeadHistoryreducers.js](../src/redux/reducers/LeadHistoryreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Tlwleadreducers` | [Tlwleadreducers.js](../src/redux/reducers/Tlwleadreducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Findashboardlistreducers` | [Findashboardlistreducers.js](../src/redux/reducers/Findashboardlistreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Cashinflowreducers` | [Cashinflowreducers.js](../src/redux/reducers/Cashinflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Bankflowreducers` | [Bankflowreducers.js](../src/redux/reducers/Bankflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Employeemanagerreducers` | [Employeemanagerreducers.js](../src/redux/reducers/Employeemanagerreducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Pettycashflowreducers` | [Pettycashflowreducers.js](../src/redux/reducers/Pettycashflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Talktimereducers` | [Talktimereducers.js](../src/redux/reducers/Talktimereducers.js) | Client/lead/contact/communication/history data; inspect PII and scoped ownership |
| `Bankdepositreducers` | [Bankdepositreducers.js](../src/redux/reducers/Bankdepositreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Taskselfreducers` | [Taskselfreducers.js](../src/redux/reducers/Taskselfreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Bankdepositflowreducers` | [Bankdepositflowreducers.js](../src/redux/reducers/Bankdepositflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Assetcompanyflowreducers` | [Assetcompanyflowreducers.js](../src/redux/reducers/Assetcompanyflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Assetdepartmentreducers` | [Assetdepartmentreducers.js](../src/redux/reducers/Assetdepartmentreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Assettypeflowreducers` | [Assettypeflowreducers.js](../src/redux/reducers/Assettypeflowreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Purchasereqformreducers` | [Purchasereqformreducers.js](../src/redux/reducers/Purchasereqformreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Assetlocationreducers` | [Assetlocationreducers.js](../src/redux/reducers/Assetlocationreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Finbillsreducers` | [Finbillsreducers.js](../src/redux/reducers/Finbillsreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Circularpolicyreducers` | [Circularpolicyreducers.js](../src/redux/reducers/Circularpolicyreducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Complainreducers` | [Complainreducers.js](../src/redux/reducers/Complainreducers.js) | Restricted HR/identity and related organizational or policy data; verify fields |
| `Chartlevelreducers` | [Chartlevelreducers.js](../src/redux/reducers/Chartlevelreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Chartlevel2reducers` | [Chartlevel2reducers.js](../src/redux/reducers/Chartlevel2reducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Chartlevel3reducers` | [Chartlevel3reducers.js](../src/redux/reducers/Chartlevel3reducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Generatemappingreducers` | [Generatemappingreducers.js](../src/redux/reducers/Generatemappingreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `Billsummaryreducers` | [Billsummaryreducers.js](../src/redux/reducers/Billsummaryreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Billduesummaryreducers` | [Billduesummaryreducers.js](../src/redux/reducers/Billduesummaryreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Vouchertypereducers` | [Vouchertypereducers.js](../src/redux/reducers/Vouchertypereducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Inventoryfilterdatareducers` | [Inventoryfilterdatareducers.js](../src/redux/reducers/Inventoryfilterdatareducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |
| `PayablebillsFilterreducers` | [PayablebillsFilterreducers.js](../src/redux/reducers/PayablebillsFilterreducers.js) | Financial/customer/reference data; inspect sensitivity and money/identity fields |
| `Superdatabasesreducers` | [Superdatabasesreducers.js](../src/redux/reducers/Superdatabasesreducers.js) | Response fields, PII, agency context, stale-cache risk and lifecycle |

**Inventory total:** 112 registered root slices. Proposed purge/migration must cover this entire list, pending requests and in-memory state, not just the visible login keys. None was changed by this documentation task.
