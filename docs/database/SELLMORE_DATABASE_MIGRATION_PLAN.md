# Sellmore Database Migration Plan

**Status:** Planning only. No migration SQL, application code, database connection, schema mutation, data import, or production operation was performed.  
**Basis:** [Legacy database audit](SELLMORE_LEGACY_DATABASE_AUDIT.md), [target architecture](SELLMORE_TARGET_DATABASE_ARCHITECTURE.md), [authoritative master architecture](../SELLMORE_MASTER_ARCHITECTURE.md), and [backend discovery checklist](../SELLMORE_BACKEND_DISCOVERY_CHECKLIST.md).

## Migration Guardrails

- The supplied MariaDB dump is schema-only, not a row-level backup. It cannot prove deployed schema revision, record quality, orphan counts, tenant ownership, or production values.
- No big-bang migration and no destructive rename/drop. Keep existing IDs, routes, document numbers, receipt families, integrations and reports compatible.
- Do not connect to or mutate production from this phase. Obtain a verified backend repository/deployed revision, staging system, read-only live schema metadata, accountable data owners, and restore test first.
- One authoritative writer per operation. Adapters translate contracts; they must not create uncontrolled dual writes.
- A proposed relationship or index is not a migration instruction. Profile actual data, inspect query plans, test all consumers and require owner sign-off before constraints/uniqueness.
- Preserve rejected/invalid/incomplete leads and duplicate candidates with provenance; do not delete or auto-merge.
- Financial correction uses owner-approved reversal/adjustment, not deletion. Issued documents and historical reports remain readable.

## Legacy Table Disposition

“Keep as-is” means preserve current records and compatible access, not prohibit later additive improvements. All classifications are provisional until runtime consumers and backend mappings are verified.

Disposition labels: **KEEP AS-IS**, **KEEP + EXTEND**, **MIGRATE GRADUALLY**, **LEGACY COMPATIBILITY**, **REPLACE LATER**, and **REVIEW / POSSIBLE RETIREMENT**. “Replace later” and “possible retirement” are not deletion approvals; every table remains protected until an owner-approved parity and consumer review.

| Legacy tables / family | Classification | Compatibility and future treatment |
|---|---|---|
| `customer_leads_tbls` | MIGRATE GRADUALLY / LEGACY COMPATIBILITY | Keep original PK/IDs and API behavior. Map gradually to canonical Contact + Lead after clarifying `leadid`, company, and contact identity. |
| `leadsassigndatabase` | KEEP + EXTEND (only after backend approval) | Preserve assignment IDs and `publishAgentDate`; map to assignment history. Verify whether it records first/current assignment and transfer semantics before using it for global order/history. |
| `leadsimportdatabase`, `import_lead_data` | MIGRATE GRADUALLY / LEGACY COMPATIBILITY | Retain source-row provenance and original IDs. Use adapters to canonical lead/contact; reconcile `leadAssignId` and `leadid` before linking. |
| `facebookleadsdata`, `facebookleadsdata2` | REVIEW / POSSIBLE RETIREMENT | Preserve until feed/route/job usage and semantic differences are verified; source/campaign ingestion becomes an idempotent intake adapter. |
| `customer_activities`, `activity_*`, `assign_reminders`, `notinterestedreason` | KEEP + EXTEND | Preserve histories. Add event/task/requirement references through new links only after owner and timestamp mapping. Do not treat reminders as completed activity. |
| `callingimpression`, `zong_calling_data`, `zongdevices` | LEGACY COMPATIBILITY | Keep provider history and IDs; adapt to communication event/provider references. Protect credential/recording fields. |
| `projects`, `project_adds`, `project_categories`, `project_assets` | KEEP + EXTEND | Preserve project IDs, media and existing UI routes. Map project hierarchy separately from physical property/listing. |
| `project_inventories`, `project_inventories_testing` | REVIEW / POSSIBLE RETIREMENT | Preserve production-like data and testing records. Inspect runtime writers and JSON payload versions before normalizing or retiring either. |
| `inventory_main_update2`, `inventories`, `inventoryFilters` | MIGRATE GRADUALLY / LEGACY COMPATIBILITY | Keep `inv_id`/inventory IDs and existing filters. Map units/availability behind an adapter; verify which table is authoritative. |
| `inventory_hold`, `inventory_cancelled`, `inventory_sold` | KEEP + EXTEND | Preserve transition history and references. Verify transactional/concurrency/expiry contracts. Never unlock sold stock or infer a deal from a status alone. |
| `SalesFormdata`, `saleformcoagent`, `salesCoAgent`, `commissionDetailsList` | MIGRATE GRADUALLY / LEGACY COMPATIBILITY | Preserve documents and IDs. Reconcile duplicate co-agent models and finance calculations; migrate gradually to deals/parties/commission ledger. |
| `paymentPlan`, `paymentPlanData`, `paymentReciept`, `PayReciepts`, `paymentRecieptMode`, `payRecieptList`, `installment_plans`, `RepaymentSchedule` | KEEP AS-IS (historical authority pending finance review) | Preserve each receipt/schedule family distinctly. Do not collapse based on spelling or similar columns. Map to payment allocations only after ledger reconciliation. |
| Chart of accounts, dimensions, mappings, vouchers, banks, cheques, bills, petty cash and stock registers | KEEP AS-IS | Preserve finance IDs, issued vouchers, posting semantics and audit trail. Domain adapters may expose new UI; no inferred historical journal migration. |
| `crm_affiliate_registration`, `affiliates_leads_tbls`, `affiliates_activities_tbls` | KEEP + EXTEND | Preserve affiliate account/lead/activity IDs and routes. Introduce relationship-scoped broker/partner models additively; no retrospective protection or commissions inferred. |
| `company`, `branches`, `departments`, `employees`, `designations` | KEEP + EXTEND | Preserve organization IDs and HR links; establish company-to-agency mapping per record/usage. Do not blanket-map all companies to one tenant. |
| `empteam`, `empTeam`, `reportto`, `agent_employees` | REVIEW / POSSIBLE RETIREMENT | Preserve both case variants and legacy links. Inspect actual active writer/runtime reachability; map to effective-dated teams/reporting only after reconciliation. |
| `roles`, `permissions`, `role_has_permissions`, `model_has_roles`, `model_has_permissions`, `employee_roles`, `crm_modules`, `crm_module_feature`, admin role tables | LEGACY COMPATIBILITY | Preserve numeric IDs and effective behavior. Build semantic action/scope mapping and server-policy tests before changing grants. Missing PKs require source/data review, not a blind fix. |
| `task`, task attachments/checklists/comments/history/status/priority | KEEP + EXTEND | Preserve standalone work and history; add typed optional entity links. Verify keyless-table identity before any backfill or dedupe. |
| `documentlist`, `document_type`, `security_files`, `releasefilelog` | LEGACY COMPATIBILITY | Preserve paths/IDs and issued references. Add versioned document metadata/authorization gradually; verify private storage before changing links. |
| `employees`, attendance, leave, payroll, training, warnings, termination, recruitment, complaints | KEEP AS-IS / KEEP + EXTEND | Preserve HR privacy and compensation/history. Map auth user, employee, and membership separately. No mass employee/user merge. |
| `leadStatus`, `ClientStatus`, `Leadsource`, `OccupationTbl`, `InterestedPercentage`, `NotInterestedReasonOpt`, `Budget`, `TimeFrame`, other lookups | KEEP AS-IS | Retain legacy values and IDs; build explicit versioned semantic mappings. Deactivation must not rewrite historical values. |
| `pricingpage`, video/content requests, operational stock, vehicle passes, assets | LEGACY COMPATIBILITY | Preserve separate business semantics and issued documents; do not fold into property/deal/requirements domains. |
| `migrations`, `failed_jobs`, OAuth/token tables, notifications | REVIEW / BACKEND VERIFICATION REQUIRED | Establish live server/framework ownership, retention, token hashing, PK/unique semantics and workers before changing. |

## Expand-to-Retire Delivery Sequence

### Phase 0: Establish evidence and ownership

1. Obtain the CRM API/backend repository and deployed commit, DB connection owner, actual live engine/schema version, migration history and route registry through approved secure access.
2. Reconcile the supplied dump against read-only live metadata. Confirm omitted tables/columns, PKs, indexes, constraints, defaults, triggers, jobs, storage and actual writers.
3. Build a table/column owner matrix for Client, Lead, Assignment, Project, Inventory, Sale/Deal, Payment, Employee and Company. Resolve what each company ID means per table; quarantine ambiguous ownership.
4. Obtain finance, inventory, sales, HR and partner process owners. Agree canonical source-of-truth and migration cohort. Use staging with synthetic data and tested restore.
5. Profile null/blank values, duplicate candidates, ID collisions, orphan references and totals in aggregate/redacted form. The supplied schema dump has no row data, so this must be a separate authorized live-data activity.

### Phase 1: Compatibility and additive mapping

- Define API adapters for legacy table/route IDs and stable response contracts. Preserve `/list-assign-leads` and existing finance/affiliate/print URLs.
- Create versioned `legacy_id_map` (conceptual) with source system/table/entity, legacy ID, verified agency, target type/ID, mapping status, source revision and timestamps. IDs are not globally unique without a namespace.
- Add target structures only after database engine, migration authority, key strategy and transaction boundaries are known. Keep nullable/optional backfill links where ownership is uncertain; do not invent agency IDs.
- Use expand-first additive columns/tables. Readers tolerate legacy-only rows and mapped rows. Do not switch a writer yet.

### Phase 2: Backfill and validation

- Backfills are resumable, batched, versioned and checkpointed. Preserve source row ID, timestamps, raw source values and import/provider provenance.
- Quarantine ambiguous ownership, invalid identifiers, unmatched references and conflicting identities for human review. Never force phone uniqueness or merge same-name people.
- Reconcile source and target row counts, ID mappings, assignment histories, activity/reminder links, project/inventory statuses, issued document references and finance totals with domain owners.
- Validate foreign keys in shadow reports first. For each proposed constraint: profile invalid/null/orphan rows, remediate via an approved mapping, rehearse failure/rollback, and only then schedule a separately approved constraint migration.

### Phase 3: Read, then writer cutover

- Compare only side-effect-free authorized reads. Do not shadow-call impression counters, provider actions or financial commands.
- Switch one pilot cohort/module reader behind a flag; record mismatches and fallback behavior. A reader comparison is not permission to access broader tenant data.
- Switch one operation's authoritative writer only after API contract, idempotency, transactionality, permission and data reconciliation gates pass. No dual-write period without a designed outbox/repair protocol.
- Observe latency, errors, record deltas, duplicates, authorization denials and financial reconciliation. Expand agency/user cohort only after acceptance.

### Phase 4: Optional retirement

Retire a legacy table/field/route only after static and runtime consumer inventory, owner approval, audit/restore validation, history/document preservation, API deprecation period and rollback/forward-repair evidence. Candidate duplicate/testing structures are not retirement approvals.

## Data Integrity and Indexing Gates

- The 60 tables without declared PKs require priority review where they are runtime entities. Do not assume adding an `id` is safe; determine duplicate rows, ORM assumptions, external references and update/delete semantics first.
- Validate application joins independently of index names ending in `_foreign`. Only six actual FK constraints are declared in the supplied dump.
- Candidate query indexes should be based on captured API SQL/query plans and tenant cardinality. Likely areas include lead assignment `(company, agent, assignment time)`, imported lead source/project/contact lookup, inventory project/status/location, and conversation participant/time. Exact column order and uniqueness require measured plans and data profile.
- Normalize money/date/status types only behind adapters with explicit conversion, rounding/timezone rules, invalid-value quarantine and finance sign-off. Preserve original strings/raw values through transition.
- Review `utf8mb4` versus `latin1` conversion with byte-level fixtures and normalization; never bulk-convert without encoding verification.

## Release / Rollback Requirements

- Per-phase backup and isolated restore proof including documents and ID maps.
- Feature flags separately govern UI, read adapter, writer, external publication, and migration workers.
- Rollback accounts for already-written rows: stop new writes, keep readers compatible, reconcile or forward-repair. Never delete committed payments, assignments, partner claims or activity history as a rollback shortcut.
- Security tests include two agencies with colliding legacy IDs, anonymous/disabled users, branch/team scope, exports/files, job replay, and revoked network grants.
- A successful build or mocked frontend test does not pass backend tenancy, constraint, restore, or finance gates.

**No migration is authorized by this plan.** Each future schema change requires a separate reviewed ticket, exact DDL, owner sign-off, data-quality evidence, staging rehearsal and explicit approval.
