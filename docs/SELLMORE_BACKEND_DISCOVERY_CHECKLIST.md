# Sellmore Backend Discovery Checklist

**Status:** BACKEND VERIFICATION REQUIRED. No CRM backend or database was available in the verified frontend audit.  
**Gate:** Complete relevant evidence and acceptance checks before significant schema, tenant migration or SaaS implementation.  
**Related:** [Master architecture](SELLMORE_MASTER_ARCHITECTURE.md), [Phase 0 work package](SELLMORE_PHASE_0_STABILIZATION.md), [frontend audit](REDBOX_CRM_MASTER_AUDIT.md).

This is an evidence request and verification plan, not a claim that the following controls already exist. Use read-only source/schema access and sanitized staging fixtures. Do not paste production passwords, API tokens, customer exports or database connection strings into documentation. The adjacent website is a separate discovery item, not the presumed CRM backend.

## 1 Evidence owners and environments

| Required evidence | Owner to identify | Acceptance |
|---|---|---|
| CRM repository and deployed revision | Backend/release maintainer | Verified source corresponds to the configured API deployment |
| Framework/runtime and dependency manifests | Backend maintainer | Actual supported versions and reproducible environment documented |
| Development, testing, staging and production boundaries | Operations owner | Endpoint/environment labels and credentials isolated; no test mutates production |
| Database/schema authority | Database owner | Read-only DDL/migrations/metadata supplied with provenance/date |
| Storage and integration ownership | Operations/integration owner | Authorized configuration references and private access policies available without exposing secrets |
| Backup/restore and release authority | Operations plus finance/data owners | Named accountable owners and demonstrated restore capability |

Record evidence location, revision/date, reviewer, confidence, result and unresolved action for every checklist area. A screenshot of a hidden menu or successful login does not replace source/policy evidence.

## 2 Server route and contract inventory

- [ ] Export actual server routes: method, path, version, middleware, controller/service and side-effect classification.
- [ ] Map frontend audit Appendix C's 112 action files plus component-local calls to those routes; reconcile the 569 call sites without assuming each is a unique endpoint.
- [ ] Resolve scanner entries labeled `GET/default or options variable`; inspect actual request options and server method.
- [ ] Identify operations whose read-shaped calls mutate impressions, counters or status; exclude them from automatic shadow reads/retries.
- [ ] Obtain sanitized request/response/error examples, pagination/sort/filter limits, validation rules and ID semantics for every critical family.
- [ ] Confirm resource contracts for Deal Form and Vehicle Pass; document why petty-cash wiring exists and how it will be contained.
- [ ] Complete the AddLeadForm field matrix against real create/read/update behavior; unknown keys stay unknown until verified.
- [ ] Identify API consumers outside this frontend: mobile clients, integrations, scheduled jobs, exports and direct links.
- [ ] Document version/deprecation policy and compatibility routing; no legacy endpoint removal implied.

## 3 Authentication sessions and authorization

- [ ] Identify the actual authentication mechanism: cookies/sessions/tokens or another verified design; distinguish FCM registration token from access credentials.
- [ ] Inspect session creation, expiry, renewal, logout/revocation, account suspension and credential-change effects.
- [ ] Inspect employee/affiliate OTP/reset flows, rate limits and recovery policy using synthetic accounts.
- [ ] Verify employee responses never expose password/plaintext/hash as editable data; inspect both create/update form contracts.
- [ ] Map role/module/feature/action IDs to server policies; verify Create versus Read/Report/Update/Delete/Export/Approve distinctions.
- [ ] Verify trusted actor/tenant context and object authorization independent of `agentId`, company/team/role inputs.
- [ ] Inspect SQL/ORM filters and joins, bulk commands, indirect record links, reports/exports, document downloads and admin paths.
- [ ] Review CORS/CSRF according to the actual auth model; do not diagnose CSRF solely from client fetch syntax.
- [ ] Verify transport, input validation, output handling and credential/PII redaction.
- [ ] Define explicit least-privileged platform support access separately from ordinary agency membership.

### Mandatory actor matrix for every sensitive API

| Actor/context | Expected default | Required evidence |
|---|---|---|
| Anonymous | Deny private operation | No private body, side effect or enumeration leakage |
| Authorized same tenant | Allow only permitted action/object | Correct scope and field projection |
| Unauthorized same tenant | Deny | No escalation via direct API/URL |
| Manager scope | Allow only managed authorized records | Out-of-team/department/branch negatives |
| Different tenant | Deny private operation | Colliding IDs, joins, bulk and export negatives |
| Suspended user | Deny normal operation | Existing sessions/jobs respect current suspension policy |
| Revoked permission | Deny revoked action | Cache/token refresh or revocation policy tested |
| Platform administrator | Explicit policy only | Support reason, duration, scope and real actor audit |
| Partner/co-broker | Explicit current grant only | No unrestricted client/contact, document or ledger access |

Use automated contract/integration tests with synthetic tenants and meaningful state assertions, not only expected HTTP codes. Never execute destructive tests against production.

## 4 Database and current company semantics

- [ ] Identify engine/version, ORM/query layer, migration authority and deployed schema revision.
- [ ] Inventory tables/collections, columns/types, primary/foreign keys, uniqueness, indexes, constraints, views/triggers and soft-delete behavior.
- [ ] Establish ownership for Client, Lead, Property, Listing, Project, Inventory, Deal, Payment and Employee; identify any competing masters.
- [ ] Determine whether each current company reference means tenant, legal entity, branch, project company or reporting dimension; the answer may vary by field/domain.
- [ ] Map employee/company/team memberships and cross-company finance/project relationships; do not rename `company_id` to `tenant_id`.
- [ ] Profile aggregate null/orphan/duplicate and ownership-conflict counts without copying live PII into reports.
- [ ] Inspect identifier generation and collision scope; design a legacy mapping namespace where necessary.
- [ ] Inspect existing project/inventory extensibility before creating custom fields or alternate unit models.
- [ ] Determine whether proposed domains already have server models absent from the client; reuse verified equivalents.
- [ ] Compare tenancy isolation options against actual engine/operations needs; test database-level protections where supported.

**No DDL, migration or backfill is approved by completing this list alone.** Proposed target names in the blueprint are not verified existing tables.

## 5 Transactions financial integrity and inventory

- [ ] Verify atomic hold/unhold/cancel/sold transitions, uniqueness/locking/version checks and expiry jobs.
- [ ] Test simultaneous reservations and sale conflicts using synthetic units, including affiliate paths.
- [ ] Verify idempotency and current authorization for retries, imports, payments, approvals and bulk assignments.
- [ ] Reconcile `paymentreciept`, `payreciepts`, plan/voucher/bank/cash families with finance; establish their distinct purposes.
- [ ] Establish money currency/precision/rounding, total calculation and the meaning of zero schedule-total fields.
- [ ] Verify customer selection IDs independently of names; document joint purchasers and multi-unit deal semantics.
- [ ] Inspect journal/posting, period close, allocations, refunds, voids/reversals and immutable history; do not assume double-entry internals.
- [ ] Obtain signed-off balances and golden fixtures before finance changes; never infer historical commission from incomplete Deal Form fields.
- [ ] Verify effective-dated assignment/stage/approval/attribution history and current permissions at command time.

## 6 Documents integrations background work and caches

- [ ] Inventory storage backends, bucket/container/namespace isolation, private delivery and legacy public/static paths.
- [ ] Review upload type/size/path validation, malware scanning/quarantine, metadata/hash/versioning and retention holds.
- [ ] Verify authorization for CNIC/NICOP/passport/nominee/employee/finance attachments, print routes and exports.
- [ ] Identify schedulers, queues, workers, retries/dead letters, trusted tenant context and deduplication keys.
- [ ] Inventory Firebase, Zong VPBX, Meta/source ingestion and actual messaging providers; separate working integrations from links/templates.
- [ ] Verify provider account-to-agency mapping, webhook validation, event ordering/replay, recording access and secrets management.
- [ ] Document paid-provider approval, costs and current official-policy review before new integration selection.
- [ ] Inspect caches/search/read models for tenant+scope keys and invalidation after revocation, withdrawal or account switch.
- [ ] Review notifications for authorized recipients, preferences, mandatory categories and private lock-screen payloads.
- [ ] Complete website ADR W01: production status, canonical identities/status owner and repeat-inquiry policy; no schema merge by assumption.

## 7 Operations observability and disaster recovery

- [ ] Inventory deployment model, runtime configuration, infrastructure permissions, CI/CD and release ownership.
- [ ] Establish structured safe logs/correlation IDs, error tracking, API/page latency, job/webhook failures, queue depth, DB health, storage errors and security events.
- [ ] Verify logs exclude passwords/tokens/full CNIC and unnecessary customer PII; define access and retention.
- [ ] Record backup owner, frequency, retention, encryption/access and coverage of both data and document storage.
- [ ] Agree RPO/RTO targets with business owners; do not invent contractual targets.
- [ ] Demonstrate restore in an isolated environment, including relationship/file consistency and tenant-boundary verification.
- [ ] Test migration rollback or forward-repair paths for already committed writes; a UI flag is not a financial rollback.
- [ ] Define reviewed migrations, staging promotion, build/tests/lint-baseline/security gates and observation/rollback thresholds.
- [ ] Review supported Node/package manager and both existing lockfiles separately from domain modernization.

## 8 Tenant migration planning gate

Required sequence: EXPAND → BACKFILL → VALIDATE → SWITCH READERS → SWITCH WRITERS → OBSERVE → OPTIONAL RETIRE.

Before REDBOX becomes a verified first tenant, produce an explicit current-company-to-agency mapping and quarantine ambiguous ownership. Choose stable target identifiers; preserve original IDs and historic URLs with `legacy_id_map` where appropriate. Backfills must be resumable, versioned and reconciled by counts, relationships and finance-approved totals. Keep one authoritative writer per operation and a repair plan for newly written data.

Do not drop/rename important columns first, guess balances, automatically merge people/properties/payments, or treat all existing rows as belonging to one tenant without evidence. Optional retirement requires static/runtime usage, consumer/deep-link review and owner acceptance.

## 8A Lead Workspace V1 backend requirements

**All items below are BACKEND REQUIRED.** No credentials are requested. Use source access, deployed revision metadata, sanitized contracts and synthetic/staging fixtures. Until those are supplied, preserve the existing frontend request and payload contracts; do not add server assumptions or a global Incomplete Leads route.

| ID | Required backend evidence | Acceptance question |
|---|---|---|
| LW1 | Server-side Incomplete Leads filter and count | Can the API apply the approved conservative identity/contact rule across the full authorized dataset, return a reliable count/page, and preserve incomplete records/history? |
| LW2 | Authoritative Assigned Lead chronology | Which field/event is the effective assignment timestamp across initial assignment and transfer? The frontend currently requests `orderby=created_at&ordertype=desc`; **global assignment chronology pending backend verification**. |
| LW3 | Additional Assigned Leads filters | Verify supported filters and exact semantics for Profession, Temperature, Data Quality, Source, Campaign, Date Range, Last Activity, Location, and Property Interest. Enable only those supported by the controller/service/query. |
| LW4 | Reminder history for Lead 360 | Identify the authorized history source, lead/customer key, ownership scope, and pagination/order. Do not invent a reminders tab from reminder-create routes. |
| LW5 | Add Activity customer-ID mapping | Confirm whether an Assigned Lead response supplies the customer ID required by `/activities/:id/:cid` and `myleadactivity`; test with synthetic records before wiring. |
| LW6 | Lead temperature authoritative model | Confirm what `getvirginleads` null means and define authoritative Hot/Warm/Cold semantics separately from Lead Status, ownership, disposition, and data quality. The current Warm label is display-only. |
| LW7 | Lead data-quality persistence | Approve identity/contact validation, reviewer flags, quality states, history, and server write/read contract. Current Incomplete classification is derived in-memory only; no status mutation. |
| LW8 | `listassignleads` controller/service/query | Provide route/method, joins/response serialization, pagination/count, supported filters, ordering alias, permission/company scoping, and failure/403 behavior. |
| LW9 | `leadhistoryaction` implementation | Provide its route/controller/service/resource mapping and the exact optional fields for identity, profession, project, latest activity, call history, activity history, and no-result/error states. |
| LW10 | Transfer/delete authorization and transaction behavior | Verify actor/scope checks, selected-ID ownership, transfer atomicity/history, delete semantics/soft-delete behavior, error response and audit. Preserve existing payloads until verified. |

Related current UI boundaries: `clientDesignation` remains a display-mapped legacy field; no `OccupationTbl` join is assumed. Missing reminder-history and Add Activity customer mapping are not filled with fabricated data. The existing `/list-assign-leads` and `/lead-history/:id` routes remain unchanged.

## 9 Gate completion record

| Gate | Current status | Required reviewers and exit |
|---|---|---|
| Server identity and deployed source | BACKEND VERIFICATION REQUIRED | Backend/release owner confirms correspondence |
| Schema and company semantics | BACKEND VERIFICATION REQUIRED | Database and agency owners approve mapping |
| Authentication/object/tenant policy | BACKEND VERIFICATION REQUIRED | Backend/security reviewer passes actor matrix |
| Password serialization | BACKEND VERIFICATION REQUIRED | Identity owner proves no credential disclosure |
| Financial/inventory transactions | BACKEND VERIFICATION REQUIRED | Finance/inventory owners accept fixtures/concurrency |
| Private documents and integrations | BACKEND VERIFICATION REQUIRED | Storage/integration owner passes scoped access/replay tests |
| Restore and rollout | BACKEND VERIFICATION REQUIRED | Operations demonstrates restore and approved deployment gates |
| Second production agency | BLOCKED until relevant gates pass | Explicit release decision after evidence review |

An unavailable answer remains open; do not mark it passed using a frontend guess. Track each remaining issue with owner, risk, next evidence and decision date. Completing the architecture documents does not establish commercial SaaS security or compliance.

## 10 Developer handoff work package

Request the following 18 artifacts from the CRM developer through approved repository/configuration access. **BACKEND VERIFICATION REQUIRED** for every row. No production passwords, tokens, private keys, connection strings or customer dumps belong in this handoff document. Redacted configuration structure and synthetic examples are sufficient for initial review; secrets remain in the owner's secret-management system.

| Artifact requested | Why it matters | Reviewer and acceptance evidence |
|---|---|---|
| Backend repository | The browser cannot establish server behavior or locate the actual source of truth | Backend/release owner identifies repository, framework/runtime and deployed commit; distinguish it from the adjacent website |
| Database engine | Transactions, constraints, tenant strategy and migration tooling depend on the actual engine/version | Database owner confirms engine/version, topology and read-only discovery access |
| Schema / DDL | Establish real entities, keys, company semantics, constraints, indexes and financial relationships | Database/domain owners provide dated schema-only export or catalog; no data dump; reconcile audited endpoint families |
| Migrations | Explain evolution, backward compatibility and safe deployment/rollback | Backend/database owners provide ordered history, current migration state and run procedure |
| API route registry | Maps 569 frontend call sites to actual routes and policy boundaries | Backend owner exports method/path/controller/middleware/version; includes direct component calls, exports, files and integrations |
| Authentication middleware | Establishes how a trusted principal is derived | Identity/security reviewers trace missing/invalid/expired credentials and reject anonymous private access |
| Authorization middleware | Establishes action/object/tenant/scope enforcement independently of menus | Security/domain owners trace permission and record checks; test scoped and cross-tenant denials, including background jobs |
| Session/token implementation | Determines expiry, refresh, revocation, logout and storage assumptions | Identity owner supplies sanitized flow and configuration names, not secrets; suspended/revoked users and account switches tested |
| Models | Reveals real relations, serializers, casts, validation and current tenant boundaries | Backend/database owners map legacy client/lead/property/sale/company identities; confirm password exclusion and no inferred schema merges |
| Controllers | Reveals request envelopes, validation entry points and inconsistent resource mappings | Backend owners map lead fields, Deal Form/Vehicle Pass resources, statuses and error envelopes using synthetic fixtures |
| Services | Reveals authoritative business rules and transaction ownership | Finance/inventory/sales owners trace holds, sales, payments, assignments, commission and posting; reject guessed balances/IDs |
| Jobs/queues | Reveals retries, expiry, idempotency, scheduling and tenant propagation | Operations/backend owners inventory workers, queues and scheduled jobs; document safe replay/dead-letter and isolation behavior |
| File storage configuration | Determines whether CNIC/HR/financial documents and recordings are publicly accessible | Storage/security owners provide redacted bucket/path/policy structure, upload validation and authorized download/retention flow |
| Zong integration implementation | Distinguishes client wiring from server credentials, call events and recording protection | Integration owner maps provider IDs, callbacks/polling, signature or verification method, deduplication and private recording access |
| Firebase server configuration, if any | Separates client FCM token registration from server sending and identity auth | Integration owner identifies sender/worker/config references, device ownership and logout/revocation; explicitly records absence if no server integration |
| Deployment configuration | Links reviewed code to actual API origins, infrastructure and environment boundaries | Release/operations owners provide redacted manifests, build/runtime versions, secret references, transport/proxy/CORS/CSRF decisions and rollback runbook |
| Backup procedure | A safe tenant/schema migration requires demonstrated recovery | Database/operations owners identify owner/schedule/retention, restore steps, tested recovery evidence and agreed RPO/RTO; storage included |
| Staging environment details | Contract/security/concurrency tests must avoid production mutations | Release/security owners provide isolated endpoints, synthetic accounts/tenants, provider sandbox/stubs and permission to test; no production credentials in docs |

**Recommended discovery sequence:** identify repository/deployed revision and environment → inspect routes/auth/session/policies → reconcile models/schema/migrations and company semantics → trace sales/inventory/finance transactions and serializers → inspect storage/provider/jobs → verify deployment/restore and staging → execute the security/contract matrices → publish signed findings and unresolved gates. This does not approve remediation or migration.

**Handoff record per artifact:** request ID; owner; secure evidence location; revision/date; redaction status; reviewer; finding; acceptance result; missing item; follow-up owner/date. An unavailable artifact remains an open gate, never a presumed pass. A failed discovery test produces a separately reviewable remediation ticket with exact server files only after they are known.
