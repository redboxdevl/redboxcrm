# Sellmore Legacy CRM Database Audit

**Status:** Read-only schema review; no SQL was executed and no database, application code, or production data was changed.  
**Reference:** Supplied `u203405540_crmapiDbD.sql` attachment (phpMyAdmin dump generated 5 Oct 2026). The attachment was read from `/Users/naveedshah/Downloads/u203405540_crmapiDbD.sql`; the claimed in-workspace reference path did not exist when checked.  
**Scope note:** This file describes declared schema only. It contains no row data, so row counts, null rates, orphans, duplicate rates, actual password/token encoding, deployed schema version, and live API behavior remain unverified.

## Executive Summary

| Evidence | Finding |
|---|---|
| Engine/dialect | MariaDB 11.8.9 dump syntax; all 182 `CREATE TABLE` statements specify InnoDB. This does not prove the currently deployed server is this exact version. |
| Encoding | 117 tables declare `utf8mb4_unicode_ci`; 65 declare `latin1_swedish_ci`. Cross-table text joins/comparisons can have collation/normalization differences. |
| Keys | 122 tables have a declared primary key; 60 do not. Some keyless tables are central business or framework tables. An `id` column is not a declared PK. |
| Indexes | 71 ordinary `ADD KEY` declarations and 5 `ADD UNIQUE KEY` declarations are visible. Several duplicate the primary-key or same-column indexes. |
| Foreign keys | Only six FK constraints are declared: branches to company/country/city; company to country/city; crm_module_feature to crm_modules. Other `_foreign`-named indexes do not enforce a relationship. |
| Stored objects | No views, triggers, stored procedures, or stored functions found. No `INSERT INTO` statements found. |
| Soft delete/timestamps | `deleted_at` is present on a subset of Laravel-style tables; other legacy families have no soft-delete field. Timestamp conventions vary between nullable timestamps, required datetimes, and text dates. |
| Current CRM API | The React client calls `https://crmapi.pakrealestatecrm.com/api/`. Its implementation is not in this workspace. DDL cannot prove which joins or order clauses the API uses. |

### Evidence labels

- **DDL verified:** directly declared table, field, key, index, or FK in the supplied dump.
- **Frontend verified:** behavior/key/path in the checked React client and existing audits.
- **Likely relation:** field names suggest a relationship, but there is no declared FK or backend source to prove it.
- **Unknown:** requires API/backend source, live schema metadata, or business-owner validation.
- **Target proposal:** future architecture only, not a current table or migration instruction.

## Current Domain Map

Important fields are summarized, not a description of every column in all 182 tables. `PK yes` means the dump declares a primary key; `PK no` means no PK declaration was found. “Likely relation” must not be treated as a verified FK.

| Domain | Tables and keys | Important fields / visible relationships | Frontend use and quality notes |
|---|---|---|---|
| Organization | `company` PK id; `branches` PK id; `departments` PK id; `employees` PK id; `designations` PK id; `agent_employees` PK id; `empteam` PK id; `empTeam` PK no; `reportto` PK no | company/branch/department IDs; employee `company_id`, `branch_id`, `department_id`, `designation_id`, `ReportTo`; team `agentId`, `teamObj` varchar, `teamStatus`, `teamLeadId`. `branches` has declared company/country/city FKs; `company` has city/country FKs; `departments.branch_id` has an index named foreign but no FK constraint. | HR and assigned-lead scope use employees, company/team IDs and report-to data. `company` is an operational organization record, not proven SaaS tenant. Duplicate `empteam`/`empTeam`; team membership is an opaque string, not a normalized membership relation. |
| Authentication / roles | `users` PK no; `employees` PK yes; `crm_affiliate_registration` PK yes; `admin_logins` PK yes; `roles` PK no; `permissions` PK no; `role_has_permissions` PK no; `model_has_roles` PK no; `model_has_permissions` PK no; `employee_roles` PK yes; `crm_modules` PK yes; `crm_module_feature` PK yes; `admin_roles`, `admin_privileges`, `create_roles` PK yes | Separate user, employee, affiliate and admin concepts. Laravel-style role tables use polymorphic `model_type/model_id`; `employee_roles` carries employee/role/feature/permission_type. Only module-feature-to-module FK is declared. | The client uses employee IDs, role IDs, feature IDs and sub-feature strings. Multiple parallel permission systems exist. `employees.password`, `agent_employees.Password`, `crm_affiliate_registration.Password`, and `admin_logins.password` are credential-like columns; the dump cannot establish whether values are hashes. Token/OTP fields also exist. Treat as security-sensitive; verify serializers and storage separately. |
| Lead intake / imported data | `customer_leads_tbls` PK id; `leadsassigndatabase` PK id; `leadsimportdatabase` PK id; `import_lead_data` PK id; `facebookleadsdata`, `facebookleadsdata2` PK id; `leadcamagin` PK id | Customer lead includes company/agent/lead IDs, country/city/project/type/nature/source IDs, name, status, gender, nullable email/mobile/CNIC/WhatsApp, budget/timeframe/referral, interest/description and enum `LeadStatus`. Assignment includes company, agent, `leadid`, `shiftStatus`, `publishAgentDate`, created/updated. Imported row includes `leadAssignId`, name/contact/project, `clientDesignation` text, nature/status/type/source/project/campaign/ad spend/CPL. `import_lead_data` is another import representation. | M03/M04/M06 and `/list-assign-leads` use assignment and imported-lead data. The server relation among `customer_leads_tbls.leadid`, `leadsassigndatabase.leadid`, `leadsimportdatabase.leadAssignId`, and `import_lead_data` is not declared. Similar field names do not prove a common PK namespace. Facebook tables are near-duplicate intake structures. |
| Lead/status/source lookups | `leadStatus`, `ClientStatus`, `Leadsource`, `InterestedPercentage`, `OccupationTbl`, `Budget`, `TimeFrame`, `Purposeprop`, `NotInterestedReasonOpt` PK yes; `notinterestedreason` PK no | `leadStatus.PercentageTitle`; `ClientStatus.clientTitle`; source title; occupation title; enums and free-text status fields coexist. `customer_leads_tbls.LeadStatus` is enum `hot`, `My Lead`, `Not Interested`; imported `leadsimportdatabase.leadStatus` is `active/inactive`. | UI status labels overlap temperature, ownership and disposition. `OccupationTbl` has no declared FK from lead/import tables. `notinterestedreason` is an event-like reason row with company/lead/customer/agent IDs but no PK declaration. |
| Activities / follow-ups | `customer_activities` PK yes; `activity_types`, `activity_outcomes`, `activity_media` PK yes; `assign_reminders` PK yes; `reminderTypelist` PK yes; `notinterestedreason` PK no | Activity has company/customer/agent/type/outcome, interest percentage/details/status, meeting time/location, next activity date, reminder priority and WhatsApp evidence fields. Reminder has company/activity/type/agent/lead/customer, `reminderSet` datetime, text and priority. `activity_outcomes.activityId` is indexed only by implied naming; no FK. | M07/M08 activity/reminder forms. Activity, reminder, meeting and communication events are partly combined or cross-linked only by integer fields. Date semantics and timezone are not modeled consistently. |
| Calling / communication | `zong_calling_data` PK no; `zongdevices` PK no; `callingimpression` PK yes; `notifications` PK no; OAuth/token tables | Zong row stores phone/ext/duration/recording/status/datetime/type/token/client/project/source/quality/comments. Impressions store company/lead/customer/agent/type/date. Zong device token and API/provider tokens are sensitive. | Client has Zong reports and impression actions; provider IDs and tenant/account ownership are not consistently explicit in the schema. No confirmed message/thread/delivery model. |
| Projects / inventory | `projects` PK no; `project_adds` PK no; `project_categories` PK no; `project_assets` PK no; `project_inventories` and `_testing` PK no; `inventories` PK yes (only id/timestamps); `inventory_main_update2` PK `inv_id`; `inventoryFilters` PK yes; `inventory_hold` PK yes; `inventory_cancelled` PK yes; `inventory_sold` PK yes | `projects` has company/location/country/city and project attributes. `project_inventories.jsonFormat` is text; `_testing` duplicates the structure. `inventory_main_update2` stores project/geography, phase/row/address/type/size/unit, price/payment/commission/hold/status and publication date as legacy columns. Hold/sold rows reference inventory/customer/employee IDs but have no FK constraints. | M10/M11 and partner inventory views reuse these paths. Physical property, project unit, inventory availability and listing are not cleanly separated. `inventories` is nearly empty structurally compared with `inventory_main_update2`; exact runtime master is backend-dependent. Reservations need concurrency/source verification. |
| Sales / deals / commission | `SalesFormdata` PK yes; `saleformcoagent` PK no; `salesCoAgent` PK yes; `commissionDetailsList` PK yes; `inventory_sold` PK yes; `installment_plans` PK yes; payment-plan/receipt families | Sales form mixes property/project/unit, customer name/CNIC/contact, sale amount/discount/payment received and commission. Co-agent tables overlap, one stores names/percentages. Sold inventory stores customer/employee/inventory links, extensive identity/nominee PII, amounts/status and `OccupationId`. | M11/M13/M36/M42. There is no canonical `deals` entity in the dump. `SalesFormdata`, `inventory_sold`, and copied Deal Form UI are not safely interchangeable. Commission fields are not a verified commission ledger. |
| Partners / affiliates | `crm_affiliate_registration` PK yes; `affiliates_leads_tbls` PK yes; `affiliates_activities_tbls` PK yes | Affiliate account has contact/business, employee ref, password/OTP/status. Affiliate lead repeats intake fields and status. Activity has lead/type/outcome/interest/details/status. Affiliate lead/activity and registration employee columns have foreign-looking indexes, but no FK among them is declared in this dump. | M20-M23. Partner, SaaS agency, employee and broker are not established as a unified identity. Attribution/protection windows and dispute/commission states are absent. Preserve affiliate IDs and routes. |
| Tasks | `task` PK no; `task_attachment`, `task_checklist`, `task_comment`, `task_history` PK no; `task_priority`, `task_status` PK no | Task has task_id string, assignee/creator IDs, title/description, status/department, due datetime and priority. Child tables use `task_id_pk` but no declared FK. Several history timestamps are varchar. | M14 task workflow exists. Current task-to-lead/property/deal relationships are not modeled as typed links in this DDL. Preserve standalone tasks and history. |
| Documents | `documentlist`, `document_type`, `security_files`, `releasefilelog` | Paths/attachments and document types are mostly varchar; security file has company/companies, record reference, doc type/status, owner/title, uploader, description and issuer/purpose IDs. | M23/M45 and print paths. No normalized document version/link/permission/retention model is declared. Private file authorization cannot be proven by this schema. |
| Marketing / content | `facebookleadsdata`, `facebookleadsdata2`, `leadsimportdatabase`, `leadcamagin`, `pricingpage`, `videorequests`, `videocategories`, `project_assets` | Campaign name, lead source/project IDs, spend/CPL are repeated free text/varchar; Facebook tables overlap. Content assets are paths. | M06/M18/M19/M24. No unified source event/attribution or generated asset lineage. Connector operation is not established by table presence. |
| Finance / accounting | `chartofaccountlevel1/2/3`, `dimensionlevel1/2/3`, `accountMapping`, `mappLevel2`, `glcode`, `voucherType`, `paymentvoucher`, `outwardvoucher`, `voucherEntry`, `Bankdeposit`, `Banklist`, `Chequeregister`, `ChequeList`, `ChequeOutwardRegister`, `postdatedcheque`, `Finbills`, `PettyCashTbl`, `pettyCashPayDetails`, `PettyCashVoucher`, `paymentPlan`, `paymentPlanData`, `paymentReciept`, `paymentRecieptMode`, `PayReciepts`, `payRecieptList`, `commissionDetailsList`, `RepaymentSchedule` | Many registers use varchar amounts, totals, balances, references and dates; parallel receipt families have different shapes. Some tables lack PK; no declared FK graph ties payment, customer, deal, plan and ledger together. | M25-M47 finance workflows must stay distinct until finance reconciles them. The DDL does not prove double-entry posting, reversals, ledger allocation or that similarly named receipts are duplicates. |
| HR | `employees`, `emp_attendances`, `emp_machine_attendances`, `emp_leave_applications`, `emp_leave_balances`, `emp_promotions`, `emp_terminations`, `emp_warnings`, `payroll`, `trainings`, `training_types`, `job_posts`, `job_candidates`, `employee_shift`, `empshift`, `holydays`, `leave_types`, `education`, `Educationqualify`, `Workexperience`, `complainmanagement`, `circularPolicy` | Employee includes PII, credential/token-like fields, HR, salary/bank, CNIC and document paths. Many dates/counts/salary values are varchar; table-level keys/FKs vary. | M48-M56. Sales profile and HR/private fields require distinct permissions. An employee row is not the same thing as an authentication user or SaaS membership. |
| Operational assets / misc | `AssetRegister`, `AssetType`, `AssetLife`, `getpass`, `vehcilepass`, stock registers, `purchaseReqForm`, `itemsDetails`, `RepaymentSchedule`, `migrations`, `failed_jobs` | Asset/stock and vehicle pass are distinct from property inventory; procurement is internal purchasing. | M25/M38/M43/M47. Do not reinterpret procurement as buyer requirements or stock as property units. |

## Declared Keys and Relationships

The dump declares exactly six foreign keys:

1. `branches.city_id -> cities.id`
2. `branches.company_id -> company.id`
3. `branches.country_id -> countries.id`
4. `company.city_id -> cities.id`
5. `company.country_id -> countries.id`
6. `crm_module_feature.module_id -> crm_modules.id`

The dump has 60 tables with no declared primary key:

`empTeam`, `leave_types`, `locations`, `mappLevel2`, `migrations`, `model_has_permissions`, `model_has_roles`, `nature_projects`, `notice_boards`, `notifications`, `notinterestedreason`, `oauth_access_tokens`, `oauth_auth_codes`, `oauth_clients`, `oauth_personal_access_clients`, `oauth_refresh_tokens`, `outwardvoucher`, `password_resets`, `paymentvoucher`, `payroll`, `permissions`, `personal_access_tokens`, `postdatedcheque`, `pricingpage`, `projects`, `project_adds`, `project_assets`, `project_categories`, `project_inventories`, `project_inventories_testing`, `releasefilelog`, `reportto`, `roles`, `role_categories`, `role_has_permissions`, `saleformcoagent`, `security_files`, `stockdeliveredby`, `stockoutreg`, `stockrecby`, `stockregister`, `stockserial`, `table_activities_log`, `task`, `task_attachment`, `task_checklist`, `task_comment`, `task_history`, `task_priority`, `task_status`, `tbl_location`, `trainings`, `training_types`, `tranasfer_share_leads`, `users`, `vehcilepass`, `videocategories`, `videorequests`, `zongdevices`, `zong_calling_data`.

This is a schema warning, not proof the live server lacks keys: verify against deployed metadata before any repair. In particular, PK absence on `projects`, `task`, task history/children, `roles`, `permissions`, `users`, `payroll`, `security_files`, and `zong_calling_data` is a high-priority backend ownership question. Do not add keys until duplicate/null/orphan and application-write analysis is complete.

### Index quality

- `leadsassigndatabase` has multiple indexes on `leadid`, including duplicate declarations, plus the PK/id index. It lacks an obvious declared compound index for company + agent + assignment chronology.
- `callingimpression` repeats lead/customer/agent and id indexes.
- `employees` repeats indexes on id despite a PK.
- `leadsimportdatabase` repeats id indexes and indexes a text status/nature, but not an obvious contact/project/source composite.
- `inventory_main_update2` repeats `inv_id` alongside its PK and has `projectid`.
- `PettyCashVoucher` declares a unique `id` in addition to its primary key.
- Candidate indexes for tenant-scoped lead search, phone lookup, project/availability and date sorting require measured API query plans and cardinality. Do not add indexes based on UI filters alone.

## Quality / Risk Classification

| Classification | Finding | Treatment |
|---|---|---|
| SAFE / ACCEPTABLE LEGACY | InnoDB across the dump; established finance/project/employee identifiers and historical table families are useful compatibility anchors. | Preserve IDs, issued-document references, and historical semantics. |
| NEEDS DOCUMENTATION | `company_id`/`companyId`/`CompanyId` coexist; `empteam` and `empTeam`; multiple lead/import, receipt, co-agent and project-inventory families. | Identify owning API writer, consumers, and meaning before consolidation. |
| NEEDS INDEX | Lead assignment/list and inventory access have query-shaped fields but few purpose-built compound indexes visible. | Measure deployed plans, then propose indexes with rollback and write-cost analysis. |
| NEEDS CONSTRAINT | Many integer ID columns are indexed or named `_foreign` without actual FK constraints; 60 tables lack declared PKs. | Profile live orphans/duplicates and confirm transactional writers before constraints. |
| NEEDS NORMALIZATION | `project_inventories.jsonFormat`, `empTeam.teamObj`, permission `PermissionsData`, repeated status strings and text-embedded lists. | Normalize only behind adapters and after actual payload/schema analysis; preserve opaque legacy values. |
| SECURITY CONCERN | Credential/token-like fields, CNIC/contact/bank/HR fields and document paths are present. | Verify hashing, secret lifecycle, serializer redaction, access control, encryption and audit in backend/storage. Dump cannot show stored values or runtime controls. |
| TENANCY CONCERN | Company identifiers occur inconsistently and are absent from many tables; some records have both `company_id` and `CompanyId`. | Do not equate company with agency/tenant. Establish entity-by-entity ownership and orphan mapping. |
| DATA QUALITY CONCERN | Money/date/quantity values often use varchar; mixed Latin1/utf8mb4; inconsistent nullability/status enums; overlapping imports. | Profile rows read-only; preserve raw values and quarantine ambiguity during any future migration. |
| FUTURE MIGRATION CANDIDATE | `facebookleadsdata2`, `project_inventories_testing`, `empteam`/`empTeam`, co-agent and receipt families may overlap. | Candidate only. Confirm runtime reachability, semantics and finance reconciliation before any retirement. |
| DO NOT TOUCH WITHOUT BACKEND VERIFICATION | Lead IDs, assigned date/order, inventory hold/sold, payments, commission, auth, document access and existing migration metadata. | No DB, API, or UI contract change based only on this schema dump. |

## Assigned Leads UI Reconciliation

### Profession / designation

- **DDL verified:** `leadsimportdatabase.clientDesignation` is `text NOT NULL`; `import_lead_data.clientDesignation` is also text. `OccupationTbl` is a separate lookup with `OccuptationTitle`; the dump declares no FK from imported/customer lead rows to that lookup. `inventory_sold.OccupationId` is an int field without a declared FK.
- **Frontend verified:** the current Assigned Leads row reads `record.getleads.clientDesignation` and presents it as Designation. The request is `listassignleads`; backend response mapping is unavailable.
- **Conclusion:** the user-facing label may be **Profession** as a presentation-only mapping, without renaming or transforming `clientDesignation`. Preserve the raw free-text value and do not silently substitute `OccupationTbl.OccuptationTitle`; that lookup has no declared relation to lead/import data. Because the source values may include job titles, explain/validate their semantics with Sales before using them as a canonical occupation taxonomy. No database/API change is needed for the label alone.
- **Target:** canonical `professions` lookup plus `contact_professions` or a controlled profile attribute, with a legacy-value mapping; do not store a new FK in an old field during this phase.

### Assignment chronology / newest first

- **DDL verified:** `leadsassigndatabase.publishAgentDate` is `datetime NOT NULL`, alongside `created_at` and `updated_at`. `tranasfer_share_leads` has created/updated timestamps. The DDL does not document whether publishAgentDate means first assignment, latest assignment, or a publish event.
- **Frontend verified:** `AssignLeadsAction` sends `orderby=created_at&ordertype=desc` to `listassignleads`; the page displays `PublishDate` and `timeAgo`. It is unknown which table/alias the API applies `created_at` to and whether it honors the request.
- **Recommendation:** define “newest Assigned Leads” as the latest effective assignment event, likely `publishAgentDate` on the assignment record, but backend owner must confirm semantics and transfer behavior. Implement server-side ordering on that verified expression with a deterministic tie-breaker; do not sort only the loaded 12-row page or claim global ordering. Until then retain current request and label the ordering contract unverified.

### Untouch Lead / temperature

- **DDL verified:** no `Untouch Lead` stored value. `customer_leads_tbls.LeadStatus` currently mixes `hot`, `My Lead`, `Not Interested`; imported rows use `leadStatus active/inactive`; assignment has `shiftStatus`; call/virgin activity is represented elsewhere.
- **Frontend verified:** “Untouch Lead” is derived when `getvirginleads == null`; “Already Call” when present. This is evidence of a missing/available calling-related relation in the API response, not a database temperature value.
- **Recommendation:** the supplied product decision can be rendered as a display-only **Warm** label for the current untouched state while retaining the existing null/virgin-relation logic and raw backend values. This is a presentation mapping, not evidence that the database stores temperature or that an uncontacted lead is behaviorally warm; show the semantic note to Sales owners and do not write `Warm` into legacy enums. Future `lead_temperature` (Hot/Warm/Cold) must be separate from pipeline status, assignment/ownership, disposition, and data quality.

### Incomplete leads

Do not call records fake and do not delete them. A conservative derived classification can start with:

| Derived class | Candidate criteria (subject to API/business review) |
|---|---|
| Complete | Nonblank client name and at least one usable contact point (normalized phone or valid email); lead/assignment identity resolves; no explicit invalid/manual flag. Project, profession, budget and source can remain optional based on workflow. |
| Incomplete | Name/contact missing or unusable, or expected assignment/client link missing. Keep row and all activity/history. |
| Possible duplicate | Candidate match on normalized full contact plus tenant/source context; shared/recycled numbers remain review candidates, never auto-merge. |
| Invalid / manually flagged | Explicit reviewer flag or failed format/relationship validation; retain source payload/provenance and reason. |

`leadsimportdatabase` declares contact/name/project/profession/source/status fields NOT NULL, but empty strings and placeholder values are still possible; DDL cannot prove record completeness. `customer_leads_tbls` allows nullable mobile/email and CNIC/WhatsApp. Identity minimum should be name plus one usable contact, not every qualification field. Frontend may guide and visibly classify; backend should validate/record the authoritative quality state; DB constraints require data profiling and approved policy first.

## UI / Database Conflict Register

| Current UI/product concept | Legacy DDL concept | Classification | Risk / safe resolution |
|---|---|---|---|
| Lead vs Client | Separate `leadsimportdatabase` and `customer_leads_tbls` structures; `leadid` and `leadAssignId` relationships are not constrained | DATABASE EXTENSION REQUIRED / BUSINESS RULE DECISION REQUIRED | Define inquiry, person and assignment boundaries; adapter maps existing IDs, no merge by name/phone. |
| Assigned Lead | `leadsassigndatabase` has agent/company/lead IDs and publishAgentDate; imported rows have `leadAssignId` | API CHANGE REQUIRED for verified ordering/joins | Preserve assignment and lead IDs; confirm join and effective owner with server source. |
| Lead Status | Lookup `leadStatus`, `ClientStatus`, and separate enums/free text (`LeadStatus`, active/inactive, leadType, shiftStatus) | BUSINESS RULE DECISION REQUIRED | Do not map UI stages or status names onto a guessed field. Introduce explicit status history later. |
| Untouch / Warm / Hot / Cold | No Untouch value; `LeadStatus` enum mixes temperature, ownership (“My Lead”) and disposition | PRESENTATION-ONLY CHANGE only if approved; DATABASE EXTENSION REQUIRED for future model | Preserve stored enums; map display only with explicit semantics; future temperature separate. |
| Designation / Profession | Imported `clientDesignation` text; separate `OccupationTbl`; no declared relation | PRESENTATION-ONLY CHANGE / BUSINESS RULE DECISION REQUIRED | UI label can change only if owners confirm meaning; retain legacy field mapping. |
| Search/filter | API action accepts q, salesId, transferStatus, project; SQL has some indexes but no verified query plan | API CHANGE REQUIRED for unsupported predicates/perf; otherwise contract verification | Do not assume every field is indexed or server filter is exhaustive. |
| Date/order | UI sends `orderby=created_at`; assignment row has publishAgentDate and timestamps | API CHANGE REQUIRED if global assignment chronology differs | Verify server alias and order contract; avoid client sorting one page. |
| Project / Property / Listing | `projects`, project inventory JSON, `inventory_main_update2`; no canonical physical-property/listing separation | DATABASE EXTENSION REQUIRED | Preserve project inventory as legacy unit source; add Property and Listing as separate concepts. |
| Inventory / Sold inventory / Deal | `inventory_sold` and `SalesFormdata` capture different sale/customer fields; no canonical Deal | MAJOR DOMAIN REFACTOR EVENTUALLY REQUIRED | Bridge IDs; finance/inventory owners define authoritative lifecycle before adapter switches. |
| Affiliate / Broker | Affiliate registration/leads/activity structures | LEGACY STRUCTURE CAN BE ADAPTED | Add relationship, claims and visibility grants without converting affiliates to tenants. |
| Company / Agency tenant | `company` is branch/address/contact organizational entity; inconsistent company fields | BUSINESS RULE DECISION REQUIRED / TENANCY CONCERN | Map company rows to tenant only after ownership, legal-entity and branch semantics are verified. |
| Employee / User / Team | employees, users, agent_employees, two empTeam tables, reportto | DATABASE EXTENSION REQUIRED | Keep identity, HR profile, agency membership, team membership and reporting hierarchy separate. |
| Activity / Reminder / Task | customer_activities, assign_reminders, task tables | LEGACY STRUCTURE CAN BE ADAPTED | Distinguish interaction event, scheduled follow-up and work task; typed entity links later. |
| Procurement / Client Requirement | `purchaseReqForm` is office procurement | NO CONFLICT if kept separate; NEW domain required | Do not reuse purchasing requisitions for property requirements. |
| Deal Form / Petty Cash | Deal Form frontend was previously wired to Petty Cash table/API | PRESENTATION/SAFETY CONTAINMENT REQUIRED (already contained in pilot) | Never infer a deal endpoint from its label; keep Petty Cash untouched. |
| Receipt families | `paymentReciept`, `PayReciepts`, `payRecieptList`, `paymentRecieptMode` | BUSINESS RULE DECISION REQUIRED | Reconcile with finance; no schema/UI consolidation until fixtures tie them together. |
| Document list / security files | `documentlist` lookup vs `security_files` register/path fields | LEGACY STRUCTURE CAN BE ADAPTED | Add version/link/access model later; private file delivery remains backend verification. |

## Backend Access Status

The CRM workspace is React/CRA and configures a remote API at `https://crmapi.pakrealestatecrm.com/api/`. Its Git remote is `redboxdevl/redboxcrm`; tracked CRM files contain no SQL dump, PHP/Laravel source, migrations, composer manifest, or server routes. The immediate parent `redbox-website` directory is not a Git repository and is a separate Next.js 15 / Prisma / PostgreSQL website project. Its `/app/api/leads` route writes to its own `Lead` model; no source bridge to the CRM API was found in the bounded checks. Do not use that PostgreSQL schema to infer CRM database engine or relations.

Therefore: the attached MariaDB DDL is now available as current-state reference; the CRM API/backend implementation remains unavailable. Request backend source/deployed revision and sanitized contracts through the existing [backend discovery checklist](../SELLMORE_BACKEND_DISCOVERY_CHECKLIST.md). No credentials are needed for this documentation phase.
