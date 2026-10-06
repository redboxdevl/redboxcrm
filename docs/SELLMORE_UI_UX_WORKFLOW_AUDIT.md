# Sellmore Current-State UI/UX and Workflow Audit

**Review date:** 5 October 2026, Asia/Karachi  
**Status:** Evidence and recommendations only. Implementation not authorized.  
**Output scope:** This document only; no application changes, builds, tests, dependency changes, live requests or commits.

## 1 Executive findings

**VIDEO VERIFIED:** The supplied recording is 282.823 seconds (approximately 4:43), 1280 × 800, with a video track and no audio track reported by the local media reader. It shows a localhost CRM in an IDE browser, with other windows partially behind it. The usable application viewport is roughly 790 × 525 pixels, narrower than the whole recording. Overflow findings apply to that observed viewport; this is not a mobile or full-width desktop acceptance test.

**VIDEO + CODE VERIFIED:** 37 distinct route destinations were visited, mapping to 26 existing audit modules. Thirty-three rendered recognizable page content, including brief loading/template views; four showed blank content during the visit. The persistent shell is an additional shared surface, S00. Navigation-only items and unvisited workflows are separated below; the recording does **not** demonstrate every one of the repository's historic 56 modules or 287 routes.

**VIDEO + CODE VERIFIED:** Keep the modern Sellmore shell. The largest reusable improvements are reliable page states, a consistent PageHeader/FilterBar/DataTable contract, sectioned forms, truthful metric states and clearer navigation semantics. Do not redesign 37 pages independently. The current nested HOME/CRM/PROPERTIES/NETWORK/BUSINESS/INTELLIGENCE/SETTINGS navigation is verified in this working tree; older architecture navigation is a target and the September audit's menu count is historical.

### Top 10 findings

| # | Evidence label | Finding and implication | Priority |
|---|---|---|---|
| 1 | VIDEO + CODE VERIFIED | Assigned Leads, Clients, Procurement Requisitions and Assets navigate to existing source routes but show blank content. Prioritize reproducible diagnosis and visible recovery, not assumed backend repair. | P0 |
| 2 | VIDEO + CODE VERIFIED | Deal Form displays cash-like columns and source still reads/mutates petty cash. No deletion is shown, but the source hazard remains a separate release blocker. | P0 |
| 3 | VIDEO + CODE VERIFIED | The shell is coherent while inner pages retain blue pill buttons, dark table headers, native controls and differing spacing. Shared content patterns offer wider benefit than another shell redesign. | P1 |
| 4 | VIDEO + CODE VERIFIED | Tasks, sales, imports and KPI reports require horizontal scanning that separates identity from facts/actions. Preserve column access while improving pinned identity and responsive table behavior. | P1 |
| 5 | VIDEO + CODE VERIFIED | Scope Manager/Team appears across unrelated screens; the inspected shell dispatches dashboard-count requests, not a universal tenant/page scope command. Clarify its actual effect before users assume it filters every page. | P1 |
| 6 | VIDEO + CODE VERIFIED | Projects opens Add Projects; Valued Partners opens standalone broker login; Teams and Reporting structure share /report-to; Clients opens a legacy report. Correct naming/context before adding more destinations. | P1/P2 |
| 7 | VIDEO + CODE VERIFIED | Inbox contains static sample content; Operations/YouTube are audited scaffolds; attendance/calling-source widgets contain literal zero data. Visible charts/cards do not prove live metrics or integrations. | P2/P3 |
| 8 | VIDEO + CODE VERIFIED | Add Lead and financial/project forms are cramped, use clipped labels and inconsistent action hierarchy. Lead field persistence gaps are code-audited; successful saving was not shown. | P0 contract / P1 UX |
| 9 | VIDEO + CODE VERIFIED | Documents, marketing resources, policies, sales forms and finance deal forms overlap in presentation but represent different privacy, identity and transaction contracts. Consolidate components before domains. | P2 |
| 10 | VIDEO + CODE VERIFIED | Many future items are visibly marked Coming soon, which avoids falsely live pages, but their volume and nested grouping add navigation effort. Operational workflows should remain prominent. | P2 |

**REQUIRES BACKEND VERIFICATION:** Authentication/authorization, tenant isolation, persistence, finance posting, reservation atomicity, document access, provider behavior and KPI correctness cannot be certified from this recording. No table row, success-looking page, empty result or scope selector establishes those properties.

## 2 Evidence rules, method and boundaries

| Required label | Meaning in this report |
|---|---|
| VIDEO VERIFIED | A visual state/control/transition appears at the cited timestamp. It does not certify technical operation. |
| CODE VERIFIED | The current named source, or explicitly cited existing code-audit evidence, supports the statement. Client wiring is not server correctness. |
| VIDEO + CODE VERIFIED | Visual identity/presentation and named code/route/audit evidence agree. This label does not extend visual proof to backend effects. |
| REQUIRES BACKEND VERIFICATION | Server contracts/data semantics/security/integration effects remain unresolved. |

**VIDEO VERIFIED:** Review used locally decoded one-second frames across the entire recording, two-second visual contact sheets, and enlarged brief route transitions (including YouTube, Employees, Teams and blank-page visits). Address-bar-only local OCR assisted navigation timing; screenshots were visually checked. These are timestamped visual samples, not frame-by-frame playback of every source video frame; subsecond interactions may be missed. Intervals are approximate observed coverage, not precise latency measurements. No audio transcription was possible because no audio track was found.

**CODE VERIFIED:** Sources were the existing [master audit](REDBOX_CRM_MASTER_AUDIT.md), [authoritative architecture](SELLMORE_MASTER_ARCHITECTURE.md), [Phase-0 package](SELLMORE_PHASE_0_STABILIZATION.md), [migration matrix](SELLMORE_MODULE_MIGRATION_MATRIX.md), [domain model](SELLMORE_DOMAIN_MODEL.md) and [backend checklist](SELLMORE_BACKEND_DISCOVERY_CHECKLIST.md), plus bounded reads of navigation/layout/routes and components needed to verify observed mismatches. The repository was not rescanned. Historical test/build numbers are not new results and are not used to certify this review.

**VIDEO VERIFIED:** Chat text visible at the beginning and coding-assistant messages in the background are walkthrough content, not instructions or evidence that tests/changes were performed in this audit. Partially obscured background CRM cards are not counted as a reviewed home dashboard. No personal names, phone numbers, bank account numbers, customer rows or document IDs from the video are copied into this report. Temporary frames remain outside the repository; the report refers to timestamps in the original recording.

**CODE VERIFIED:** Priorities are recommendations based on the named evidence, not measured usage analytics: P0 broken/risky; P1 core-workflow priority; P2 important; P3 later modernization; P4 legacy/review for retirement. P4 never authorizes deletion; owner, runtime-use, route and dependency evidence is still required. A recommendation marked with an evidence label identifies its basis, not an already implemented feature.

## 3 Screen inventory and coverage

**VIDEO + CODE VERIFIED:** Each row maps the observed URL to its current source component. Four blank destinations are counted as visited, not as functioning screens. Historic module IDs link to the existing audit and avoid another full repository scan.

| ID | Screen | Observed timestamp(s) | Route | Audit module | Priority | Pattern |
|---|---|---|---|---|---|---|
| S01 | Add Leads | 00:02–00:49; 04:39–04:42 | `/add-lead` | [M04](REDBOX_CRM_MASTER_AUDIT.md#module-m04) | P0 contract / P1 UX | Form |
| S02 | Assigned Leads — blank visit | 00:14–00:17 | `/list-assign-leads` | [M03](REDBOX_CRM_MASTER_AUDIT.md#module-m03) | P0 | Work queue / Data table |
| S03 | Clients — blank visit | 00:25–00:26 | `/list-super-database-report` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P0 | Data table / Detail/360 future |
| S04 | Add Projects behind Projects | 00:50–01:03; 01:06–01:26 | `/add-projects` | [M10](REDBOX_CRM_MASTER_AUDIT.md#module-m10) | P1 | Form |
| S05 | Valued Partners entry → broker login | 01:04–01:05 | `/affiliate-program` | [M20](REDBOX_CRM_MASTER_AUDIT.md#module-m20) | P2 | Form / Other portal entry |
| S06 | Task Management Dashboard / All Task | 01:27–01:34 | `/task-management` | [M14](REDBOX_CRM_MASTER_AUDIT.md#module-m14) | P1 | Work queue / Data table |
| S07 | Inbox template | 01:35–01:37 | `/inbox` | [M16](REDBOX_CRM_MASTER_AUDIT.md#module-m16) | P3 | Communication |
| S08 | Operation Dashboard | 01:38–01:42 | `/operation` | [M17](REDBOX_CRM_MASTER_AUDIT.md#module-m17) | P3 | Dashboard / Work queue |
| S09 | Documents → Security Files register | 01:43–01:51 | `/security-files` | [M45](REDBOX_CRM_MASTER_AUDIT.md#module-m45) | P2 | Document / Data table |
| S10 | Marketing Documents folders | 01:52–01:54 | `/marketing-document` | [M23](REDBOX_CRM_MASTER_AUDIT.md#module-m23) | P2 | Document |
| S11 | YouTube Dashboard | 01:55 | `/youtube` | [M18](REDBOX_CRM_MASTER_AUDIT.md#module-m18) | P3 | Dashboard / Analytics |
| S12 | Video Request Form Dashboard | 01:56–01:59 | `/view-video-request` | [M19](REDBOX_CRM_MASTER_AUDIT.md#module-m19) | P2 | Work queue / Data table |
| S13 | Sales Form List | 02:00–02:05 | `/sales-form-list` | [M36](REDBOX_CRM_MASTER_AUDIT.md#module-m36) | P1 | Finance / Data table |
| S14 | Add New Sales Form | 02:06–02:10; 02:13–02:31 | `/add-new-sales-form` | [M36](REDBOX_CRM_MASTER_AUDIT.md#module-m36) | P1 | Finance / Form |
| S15 | Procurement requisitions — blank visit | 02:11–02:12 | `/purchase-request-form-list` | [M38](REDBOX_CRM_MASTER_AUDIT.md#module-m38) | P0 | Work queue / Finance |
| S16 | HR Dashboard | 02:32; 02:38 | `/hr` | [M02](REDBOX_CRM_MASTER_AUDIT.md#module-m02) | P2 | Dashboard / Analytics |
| S17 | Circular Policy list | 02:33–02:37 | `/circular-policy` | [M56](REDBOX_CRM_MASTER_AUDIT.md#module-m56) | P2 | Document / Data table |
| S18 | Employees | 02:39 | `/employee` | [M48](REDBOX_CRM_MASTER_AUDIT.md#module-m48) | P2; credential verification remains P0 | Data table |
| S19 | Report To / Reporting structure / Teams | 02:40–02:41; 04:17 | `/report-to` | [M48](REDBOX_CRM_MASTER_AUDIT.md#module-m48) | P2 | Data table / Other organization |
| S20 | CEO Note / Notices | 02:42–02:44 | `/notice` | [M52](REDBOX_CRM_MASTER_AUDIT.md#module-m52) | P2 | Data table / Document |
| S21 | Attendance | 02:45–02:47 | `/attendance` | [M53](REDBOX_CRM_MASTER_AUDIT.md#module-m53) | P2 | Data table / Form import |
| S22 | Leave Applications | 02:48–02:55 | `/leave` | [M50](REDBOX_CRM_MASTER_AUDIT.md#module-m50) | P2 | Work queue / Data table |
| S23 | Finance Dashboard | 02:56 | `/finance` | [M02](REDBOX_CRM_MASTER_AUDIT.md#module-m02) | P2 | Dashboard / Finance |
| S24 | Bank Deposit List | 02:57–02:59 | `/bank-deposit-list` | [M39](REDBOX_CRM_MASTER_AUDIT.md#module-m39) | P2 | Finance / Data table |
| S25 | Deal Form List | 03:00–03:01; 03:04–03:18 | `/deal-form-list` | [M42](REDBOX_CRM_MASTER_AUDIT.md#module-m42) | P0 | Finance / Data table |
| S26 | Assets — blank visit | 03:02–03:03 | `/fixed-asset-register` | [M25](REDBOX_CRM_MASTER_AUDIT.md#module-m25) | P0 | Data table |
| S27 | Analytics Dashboard | 03:19–03:28 | `/analytics` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics |
| S28 | Calling Analytics Dashboard | 03:29–03:31 | `/calling-analytics` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics / Communication |
| S29 | Call Status Reporting | 03:32–03:34 | `/list-status-report` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics / Data table |
| S30 | Leads Status Reporting | 03:35–03:40 | `/leads-status-report` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics / Data table |
| S31 | Daily Leads Reporting | 03:41–03:42 | `/list-daily-leads-report` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics / Data table |
| S32 | Database report / imported leads | 03:43–03:50 | `/list-import-database-leads-report` | [M06](REDBOX_CRM_MASTER_AUDIT.md#module-m06) | P1 | Data table / Analytics |
| S33 | KPIS Report | 03:51–04:11 | `/list-kpis-report` | [M09](REDBOX_CRM_MASTER_AUDIT.md#module-m09) | P2 | Analytics / Data table |
| S34 | Company / Companies | 04:12–04:13; 04:22–04:33 | `/company` | [M49](REDBOX_CRM_MASTER_AUDIT.md#module-m49) | P2 | Data table / Other organization |
| S35 | Branch / Branches | 04:14; 04:20–04:21 | `/branch` | [M49](REDBOX_CRM_MASTER_AUDIT.md#module-m49) | P2 | Data table / Other organization |
| S36 | Department / Departments | 04:15–04:16; 04:18–04:19 | `/department` | [M49](REDBOX_CRM_MASTER_AUDIT.md#module-m49) | P2 | Data table / Other organization |
| S37 | My profile | 04:34–04:38 | `/profile` | [M01](REDBOX_CRM_MASTER_AUDIT.md#module-m01) | P2 | Detail/360 |

### S00 Shared Sellmore shell

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Shared shell around agency pages, seen through most of 00:02–04:42; CrmLayout and crmNavigation. |
| 2 Business purpose | CODE VERIFIED | Persistent module navigation, workspace identity, profile, scope-count selector and quick lead creation. |
| 3 Existing visible functionality | VIDEO + CODE VERIFIED | Nested expandable groups, active highlights, icons, module search, account/footer actions and Coming soon labels. |
| 4 Important actions | VIDEO VERIFIED | Expand/collapse, select destination, New lead, profile and sign-out controls; sign-out not performed. |
| 5 Filters/search | VIDEO + CODE VERIFIED | Find a module searches navigation labels; scope selector exists. No global record search demonstrated. |
| 6 Data displayed | VIDEO VERIFIED | Workspace/user identity, route breadcrumb and displayed scope selection. |
| 7 User workflow | VIDEO VERIFIED | Repeated group expansion, menu scrolling, route selection and browser back/reload recovery. |
| 8 UX problems | VIDEO + CODE VERIFIED | Long nested navigation consumes effort; wide content becomes narrow; blank routes remove the useful shell; many page titles/actions compete with global New lead. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Red shell primary action versus blue inner controls; differing legacy headers/cards; partner login changes branding/layout. |
| 10 Redundant functionality | CODE VERIFIED | /report-to appears as Reporting structure and Teams; /employee as Employees and Users; duplicate route entries affect breadcrumb naming. |
| 11 Confusing functionality | VIDEO + CODE VERIFIED | Global-looking Scope dispatches dashboard-count action; Projects means creation, Partners means portal login, Access group does not expose an inspected role editor in the video. |
| 12 Preserve | CODE VERIFIED | Current shell, real icon system, route/permission registry, active state, keyboard/focus primitives, standalone print/partner exceptions and legacy URLs. |
| 13 Consolidate | CODE VERIFIED | One contextual PageHeader/action hierarchy, shared menu terminology, common loading/error states; retain explicit aliases only when intentional. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Improve content contracts inside this shell; investigate blank routes and clarify selector scope before adding new market/AI destinations. Proposal only. |
| 15 Reusable pattern | VIDEO + CODE VERIFIED | Other: Sidebar / TopBar / PageHeader / NavigationState / PageState. |

**CODE VERIFIED — current shell source:** [CrmLayout.js](../src/Includes/CrmLayout.js), [crmNavigation.js](../src/Includes/crmNavigation.js), [CrmLayout.css](../src/Includes/CrmLayout.css). Local `countScope` dispatches `getDashCountData`; it is not passed as a universal domain scope to all children. Current-title lookup takes the first route match, explaining the Teams/Reporting structure naming overlap. Standalone affiliate routes intentionally bypass the agency shell. These implementation facts do not prove security policy.

## 4 Detailed screen cards

**CODE VERIFIED:** “Business purpose” below comes from the cited module audit, sometimes broader than the particular view. **VIDEO VERIFIED:** action/filter descriptions mean controls were visible, not exercised successfully. “Not observed” does not mean absent elsewhere. **REQUIRES BACKEND VERIFICATION:** all cards inherit the server verification limits in section 2; no save, delete, import, export, call, message, approval or posting is certified. Preservation/consolidation/recommendation rows are proposed design decisions based on their labeled evidence.

### S01 Add Leads

**VIDEO + CODE VERIFIED:** `/add-lead` → [AddLeads.js](../src/Components/SalesDashboard/AddLeads.js); [M04 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m04). **VIDEO VERIFIED:** 00:02–00:49; 04:39–04:42. Recommended priority: **P0 contract / P1 UX**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Add Leads |
| 2 Business purpose | CODE VERIFIED | Capture and edit lead information through AddLeadForm. |
| 3 Existing visible functionality | VIDEO VERIFIED | Three-column lead form; defaults and optional-fields checkbox; Save Lead visible at the end. No submission shown. |
| 4 Important actions | VIDEO VERIFIED | New lead shortcut, optional-fields toggle and Save Lead visible; toggle/save outcome not demonstrated. |
| 5 Filters/search available | VIDEO VERIFIED | No list search; country/city/project/type/source/status selectors are form inputs. |
| 6 Data displayed | VIDEO VERIFIED | Name, email, mobile, client status, gender, country, city, project preference, property type/preference, source and lead status. |
| 7 User workflow | VIDEO VERIFIED | Open form → inspect fields → browse navigation → return; no completed create/edit round trip. |
| 8 UX problems | VIDEO VERIFIED | Narrow selects clip labels/values; long optional-field sentence; required indicators and terminology need review. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shared contact/preferences overlap with client, activity and sale entry, but inquiry identity must remain separate. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Client Status displays Buy while Lead Status is separate; users need purpose-versus-stage labels. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shared contact/preferences overlap with client, activity and sale entry, but inquiry identity must remain separate. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Reuse FormSection/FormField/PhoneField and dependent selectors after the existing field-contract repair gate; keep raw input, source and assignment history. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Form |

### S02 Assigned Leads — blank visit

**VIDEO + CODE VERIFIED:** `/list-assign-leads` → [AssignListing.js](../src/Components/SalesDashboard/AssignListing.js); [M03 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m03). **VIDEO VERIFIED:** 00:14–00:17. Recommended priority: **P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Assigned Leads — blank visit |
| 2 Business purpose | CODE VERIFIED | Filter assigned/personal leads, transfer ownership and manage disposition. |
| 3 Existing visible functionality | VIDEO VERIFIED | URL changes to Assigned Leads; pale blank content replaces the shell/page throughout sampled visit. |
| 4 Important actions | VIDEO VERIFIED | No screen actions visible; browser back/refresh used in the surrounding recovery. |
| 5 Filters/search available | VIDEO VERIFIED | Not visible in this visit; do not infer absence. |
| 6 Data displayed | VIDEO VERIFIED | No records or table visible. |
| 7 User workflow | VIDEO VERIFIED | Choose Assigned leads → blank route → return to Add Lead and reload. |
| 8 UX problems | VIDEO VERIFIED | No visible explanation, retry or retained navigation. |
| 9 Visual inconsistencies | VIDEO VERIFIED | No page chrome, page title, loader or error state visible during the blank visit; do not invent table/form appearance. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Assigned/My/Hot/Virgin queues are related views in audit M03, not proof that all records/actions are equivalent. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | A blank page cannot distinguish request failure, render exception, permission state or slow loading. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the audited workflow, URLs, IDs and permissions while restoring visible page recovery; the blank video does not justify deleting functionality. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Assigned/My/Hot/Virgin queues are related views in audit M03, not proof that all records/actions are equivalent. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | First reproduce with synthetic contracts and capture frontend error/request/permission evidence; preserve the existing assignment workflow before using this as the shared table pilot. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Work queue / Data table |

### S03 Clients — blank visit

**VIDEO + CODE VERIFIED:** `/list-super-database-report` → [ListSuperDatabaseReport.js](../src/Components/SalesDashboard/ListSuperDatabaseReport.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 00:25–00:26. Recommended priority: **P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Clients — blank visit |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Clients selection reaches this legacy report URL and blank content; no Client 360 rendered. |
| 4 Important actions | VIDEO VERIFIED | No client actions visible. |
| 5 Filters/search available | VIDEO VERIFIED | Not visible; audit/source alone describe intended reporting/filter behavior. |
| 6 Data displayed | VIDEO VERIFIED | No client record visible on this destination. |
| 7 User workflow | VIDEO VERIFIED | Choose Clients → blank → return/reload Add Lead. |
| 8 UX problems | VIDEO VERIFIED | Missing recovery/permission/error explanation. |
| 9 Visual inconsistencies | VIDEO VERIFIED | No page chrome, page title, loader or error state visible during the blank visit; do not invent table/form appearance. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Database report elsewhere is a different route and must not silently replace this one. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Clients label currently points to a report, not evidence of a canonical Client model. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the audited workflow, URLs, IDs and permissions while restoring visible page recovery; the blank video does not justify deleting functionality. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Database report elsewhere is a different route and must not silently replace this one. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Recover route first; clarify directory/report terminology; add future Client 360 only after canonical identity and field access contracts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Detail/360 future |

### S04 Add Projects behind Projects

**VIDEO + CODE VERIFIED:** `/add-projects` → [AddProjects.js](../src/Components/SalesDashboard/Inventories/AddProjects.js); [M10 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m10). **VIDEO VERIFIED:** 00:50–01:03; 01:06–01:26. Recommended priority: **P1**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Add Projects behind Projects |
| 2 Business purpose | CODE VERIFIED | Maintain project units, list availability, hold/unhold/cancel inventory. |
| 3 Existing visible functionality | VIDEO VERIFIED | Project creation form, geographic inputs, category checkboxes, logo chooser, commission/KAM fields and Submit/Cancel. |
| 4 Important actions | VIDEO VERIFIED | Submit, Cancel, logo file selection; none executed. |
| 5 Filters/search available | VIDEO VERIFIED | Country/city/location dependency inputs; no project list/search shown. |
| 6 Data displayed | VIDEO VERIFIED | Name, short name, address, country, city, location, residential/commercial/farm-house flags, logo, commission, KAM. |
| 7 User workflow | VIDEO VERIFIED | Choose Projects → inspect upper/lower form → browse property/network groups without submitting. |
| 8 UX problems | VIDEO VERIFIED | Large nested card and clipped selects; native file control differs from shell buttons. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Project identity must be reused by inventory, marketing and sales rather than re-entered inconsistently. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Projects sounds like a collection but opens creation; commission basis and KAM abbreviation lack visible help. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Project identity must be reused by inventory, marketing and sales rather than re-entered inconsistently. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use shared form sections and contextual help; retain current create/edit URLs; later offer a clear project index and explicit Add Project action. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Form |

### S05 Valued Partners entry → broker login

**VIDEO + CODE VERIFIED:** `/affiliate-program` → [BrokerLogin.js](../src/Components/BrokerAffiliate/BrokerLogin.js); [M20 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m20). **VIDEO VERIFIED:** 01:04–01:05. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Valued Partners entry → broker login |
| 2 Business purpose | CODE VERIFIED | Partner sign-in, registration and OTP verification. |
| 3 Existing visible functionality | VIDEO VERIFIED | Standalone blue SellMore login with email/password and sign-up link; agency shell disappears. |
| 4 Important actions | VIDEO VERIFIED | Login and Sign Up visible; neither completed. |
| 5 Filters/search available | VIDEO VERIFIED | Not applicable. |
| 6 Data displayed | VIDEO VERIFIED | Credential input labels and welcome branding; no partner records. |
| 7 User workflow | VIDEO VERIFIED | Choose Valued Partners → external-context login view → return to project form. |
| 8 UX problems | VIDEO VERIFIED | Abrupt visual/context switch; no agency-to-partner explanation visible. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Standalone blue login and alternate SellMore logo/welcome treatment differ from the red agency shell; preserve the portal boundary while aligning shared typography, field and focus styles. Accessibility was not tested. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Employee authentication and partner authentication share form patterns but not necessarily sessions or permissions. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Navigation suggests an internal partner directory but opens partner authentication. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Employee authentication and partner authentication share form patterns but not necessarily sessions or permissions. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Label the portal boundary and preserve affiliate IDs/URLs/session separation; reuse accessible authentication primitives without merging identities. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Form / Other portal entry |

### S06 Task Management Dashboard / All Task

**VIDEO + CODE VERIFIED:** `/task-management` → [TaskDashboard.js](../src/Components/TaskManagement/TaskDashboard.js); [M14 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m14). **VIDEO VERIFIED:** 01:27–01:34. Recommended priority: **P1**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Task Management Dashboard / All Task |
| 2 Business purpose | CODE VERIFIED | Tasks, assignments, comments, checklists and detail history. |
| 3 Existing visible functionality | VIDEO VERIFIED | Status cards, filter row and populated task list; horizontal scrolling reveals ownership/status/priority/date columns. |
| 4 Important actions | VIDEO VERIFIED | Add New Task and Search; list is browsed, no create/complete action shown. |
| 5 Filters/search available | VIDEO VERIFIED | Due date, department, assigned consultant, task status and priority. |
| 6 Data displayed | VIDEO VERIFIED | Task descriptions, status, assigned-by/assignee information, priority and created date. |
| 7 User workflow | VIDEO VERIFIED | Open Tasks → inspect counters/filters → scroll table horizontally and vertically. |
| 8 UX problems | VIDEO VERIFIED | Long descriptions dominate; row identity and metadata separate during horizontal scroll; tiny controls. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Tasks and reminders/My Day may share due-work presentation but must preserve standalone task semantics. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Summary cards initially show zero while rows include several statuses; this may be timing/scope, not proven incorrect totals. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Tasks and reminders/My Day may share due-work presentation but must preserve standalone task semantics. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Pilot WorkQueue/DataTable with pinned task identity, readable summaries, explicit period/scope and preserved comments/checklists/history. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Work queue / Data table |

### S07 Inbox template

**VIDEO + CODE VERIFIED:** `/inbox` → [EmailComponent.js](../src/Components/EmailDashboard/EmailComponent.js); [M16 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m16). **VIDEO VERIFIED:** 01:35–01:37. Recommended priority: **P3**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Inbox template |
| 2 Business purpose | CODE VERIFIED | Intended employee email and chat workspace. |
| 3 Existing visible functionality | VIDEO VERIFIED | Mailbox-style search/compose row and a sample message with lorem-ipsum subject/snippet. |
| 4 Important actions | VIDEO VERIFIED | Compose icon, search and star visible; no send/read synchronization demonstrated. |
| 5 Filters/search available | VIDEO VERIFIED | Mailbox search field visible; behavior not exercised. |
| 6 Data displayed | VIDEO VERIFIED | Sample sender/thread count, subject/snippet and time. |
| 7 User workflow | VIDEO VERIFIED | Open Inbox → inspect → navigate to Operations. |
| 8 UX problems | VIDEO VERIFIED | Template content looks operational without a visible unavailable/provider state. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Inbox and Chat should share provider-neutral communication patterns only after integration contracts. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | A mailbox-shaped page does not prove connected email or deliverability. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Inbox and Chat should share provider-neutral communication patterns only after integration contracts. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Clearly identify template/unconnected state; retain URL; do not advertise or implement messaging as part of visual cleanup. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Communication |

### S08 Operation Dashboard

**VIDEO + CODE VERIFIED:** `/operation` → [OperationDashboard.js](../src/Components/OperationDashboard/OperationDashboard.js); [M17 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m17). **VIDEO VERIFIED:** 01:38–01:42. Recommended priority: **P3**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Operation Dashboard |
| 2 Business purpose | CODE VERIFIED | Intended operational overview. |
| 3 Existing visible functionality | VIDEO VERIFIED | File counters, blank chart region, Pending Client and Delivered File tables showing no records. |
| 4 Important actions | VIDEO VERIFIED | No operational mutation exercised; navigation and scrolling only. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed in shown content. |
| 6 Data displayed | VIDEO VERIFIED | Total/in-process/delivered/pending files; client/plot/project/pending-reason/action and file/date/action headings. |
| 7 User workflow | VIDEO VERIFIED | Open Operations → scroll from summary to pending/delivered queues. |
| 8 UX problems | VIDEO VERIFIED | Large empty chart consumes space; no-data tables provide little next-step guidance. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Overlaps documents and after-sales queues conceptually; source confirms static dashboard scaffold, not equivalent domain operations. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Zeros/template tables could be mistaken for verified operational counts. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Overlaps documents and after-sales queues conceptually; source confirms static dashboard scaffold, not equivalent domain operations. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Preserve entry point; use explicit unavailable states now in a later approved patch; connect verified operational work queues before investing in charts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Dashboard / Work queue |

### S09 Documents → Security Files register

**VIDEO + CODE VERIFIED:** `/security-files` → [SecurityFiles.js](../src/Components/FinanceDashboard/SecurityFiles.js); [M45 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m45). **VIDEO VERIFIED:** 01:43–01:51. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Documents → Security Files register |
| 2 Business purpose | CODE VERIFIED | Track security files and associated document records. |
| 3 Existing visible functionality | VIDEO VERIFIED | Populated document/security-file list, vertically scrolled to pagination. |
| 4 Important actions | VIDEO VERIFIED | Page-number/previous/next controls visible; no document opened/downloaded. |
| 5 Filters/search available | VIDEO VERIFIED | Top filters not shown because list appears at a scrolled position; do not call them absent. |
| 6 Data displayed | VIDEO VERIFIED | File/reference identifiers, document names/types and property/use categories. |
| 7 User workflow | VIDEO VERIFIED | Choose Documents → inspect list → scroll to pagination. |
| 8 UX problems | VIDEO VERIFIED | Page begins deep in content in sampled transition; no visible retained title/filter context; large rows. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Security files, general document lists and marketing folders need a shared browser with separate classifications/access. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Documents here means a security-file register, different from marketing resources. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Security files, general document lists and marketing folders need a shared browser with separate classifications/access. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Reuse DocumentTable/Preview metadata patterns, sticky header and safe pagination; preserve reference IDs, classifications and private download authorization. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Document / Data table |

### S10 Marketing Documents folders

**VIDEO + CODE VERIFIED:** `/marketing-document` → [MarketingDocuments.js](../src/Components/BrokerAffiliate/MarketingDocuments.js); [M23 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m23). **VIDEO VERIFIED:** 01:52–01:54. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Marketing Documents folders |
| 2 Business purpose | CODE VERIFIED | Project collateral, affiliate documents and training resources. |
| 3 Existing visible functionality | VIDEO VERIFIED | Folder-style list of project marketing resources. |
| 4 Important actions | VIDEO VERIFIED | Folder links visible; no folder or asset opened. |
| 5 Filters/search available | VIDEO VERIFIED | No search/filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Project/folder names and folder icons; no version/date/availability metadata shown. |
| 7 User workflow | VIDEO VERIFIED | Open Marketing materials → scroll resource list → leave. |
| 8 UX problems | VIDEO VERIFIED | Long single-column directory lacks visible findability/version cues. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Partner collateral and agency marketing material may share asset browsing, not unrestricted file access. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Marketing collateral is not the same privacy/workflow class as security files or signed customer documents. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Partner collateral and agency marketing material may share asset browsing, not unrestricted file access. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Reuse ResourceLibrary with search, project/type/version metadata and authorized download; preserve project URLs and publication ownership. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Document |

### S11 YouTube Dashboard

**VIDEO + CODE VERIFIED:** `/youtube` → [YoutubeDasboard.js](../src/Components/YoutubeDashboard/YoutubeDasboard.js); [M18 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m18). **VIDEO VERIFIED:** 01:55. Recommended priority: **P3**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | YouTube Dashboard |
| 2 Business purpose | CODE VERIFIED | Production, graphics, content and channel overview screens. |
| 3 Existing visible functionality | VIDEO VERIFIED | Video total/today/pending/done cards and Project Wise Videos chart area in a brief visit. |
| 4 Important actions | VIDEO VERIFIED | Navigation only; no provider action or upload shown. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed during brief visit. |
| 6 Data displayed | VIDEO VERIFIED | Counts and percentage-like annotations; project chart heading. |
| 7 User workflow | VIDEO VERIFIED | Open YouTube briefly → move to Video requests. |
| 8 UX problems | VIDEO VERIFIED | Generic welcome text and empty chart space; unclear provenance/freshness. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Content dashboards and video-request management need distinct summary and operational views. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Channel branding can imply a live YouTube integration that the audit does not establish. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Content dashboards and video-request management need distinct summary and operational views. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Keep as template/review candidate; only show real metrics with source/period and verified provider/domain contracts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Dashboard / Analytics |

### S12 Video Request Form Dashboard

**VIDEO + CODE VERIFIED:** `/view-video-request` → [ViewVideoRequest.js](../src/Components/YoutubeDashboard/VideoRequestForm/ViewVideoRequest.js); [M19 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m19). **VIDEO VERIFIED:** 01:56–01:59. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Video Request Form Dashboard |
| 2 Business purpose | CODE VERIFIED | Create, view and update content requests. |
| 3 Existing visible functionality | VIDEO VERIFIED | Request list with status badges and creation/shoot metadata. |
| 4 Important actions | VIDEO VERIFIED | Add Video Request Form visible; no request opened or submitted. |
| 5 Filters/search available | VIDEO VERIFIED | No filters visible in sampled top/list. |
| 6 Data displayed | VIDEO VERIFIED | ID, requester/face name, category, topic, status, shoot time and create date. |
| 7 User workflow | VIDEO VERIFIED | Open requests → inspect rows → navigate to sales forms. |
| 8 UX problems | VIDEO VERIFIED | Title says Dashboard but main content is a list; narrow wrapped headings and badge density. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shares task queue and table mechanics; retain request-specific production lifecycle. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | N/A shoot time and pending status need definitions, not invented scheduling assumptions. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shares task queue and table mechanics; retain request-specific production lifecycle. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Adopt PageHeader/RequestQueue/DataTable and clear date/status formatting, preserving approvals and attachment contracts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Work queue / Data table |

### S13 Sales Form List

**VIDEO + CODE VERIFIED:** `/sales-form-list` → [ListSalesForm.js](../src/Components/FinanceDashboard/SalesForm/ListSalesForm.js); [M36 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m36). **VIDEO VERIFIED:** 02:00–02:05. Recommended priority: **P1**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Sales Form List |
| 2 Business purpose | CODE VERIFIED | Maintain sales forms and associated list/form/report or print views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Populated sale-form table and Add New Sales Form action; horizontal scrolling. |
| 4 Important actions | VIDEO VERIFIED | Add New Sales Form is followed; no existing sale edited/printed. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed in shown area. |
| 6 Data displayed | VIDEO VERIFIED | Agent, client, project, type, unit and amount across horizontal positions. |
| 7 User workflow | VIDEO VERIFIED | Open list → scroll across columns → open new form. |
| 8 UX problems | VIDEO VERIFIED | Identity columns disappear while viewing amount/unit; similar names recur without visible stable IDs. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Sale lists/sold inventory/deal forms can share display patterns only after legacy ID/domain mapping. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Sales Form, Deals and Deal Forms are not established synonyms. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Sale lists/sold inventory/deal forms can share display patterns only after legacy ID/domain mapping. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use FinancialDataTable with pinned party/property identity and explicit currency; preserve sale IDs and issued print contracts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Finance / Data table |

### S14 Add New Sales Form

**VIDEO + CODE VERIFIED:** `/add-new-sales-form` → [AddSalesForm.js](../src/Components/FinanceDashboard/SalesForm/AddSalesForm.js); [M36 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m36). **VIDEO VERIFIED:** 02:06–02:10; 02:13–02:31. Recommended priority: **P1**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Add New Sales Form |
| 2 Business purpose | CODE VERIFIED | Maintain sales forms and associated list/form/report or print views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Multi-section sale, transaction and co-agent commission form with Add Row and Submit. |
| 4 Important actions | VIDEO VERIFIED | Back, Add Row, Submit visible; scroll only, no saved result. |
| 5 Filters/search available | VIDEO VERIFIED | Project/company/type/unit and payment/reference inputs are field selectors, not list filters. |
| 6 Data displayed | VIDEO VERIFIED | Sale date, property/block/category/size/unit, customer/CNIC/contact, agent/reference, amount/discount/commission, transaction rows and co-agent percentage. |
| 7 User workflow | VIDEO VERIFIED | Open from list → inspect upper fields → scroll payment/commission sections → leave via navigation. |
| 8 UX problems | VIDEO VERIFIED | Dense narrow fields and horizontally constrained transaction rows; long form lacks visible progress/section navigation. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reusable party/property pickers and money/line-item controls across finance, with separate contracts. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Blank/zero defaults and unlabeled commission basis can imply valid financial values; no calculation correctness inferred. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reusable party/property pickers and money/line-item controls across finance, with separate contracts. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use sectioned FinancialForm and stable-ID selectors; define decimal/rounding and preserve transaction/commission semantics before presentation changes. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Finance / Form |

### S15 Procurement requisitions — blank visit

**VIDEO + CODE VERIFIED:** `/purchase-request-form-list` → [ListPurchaseRequest.js](../src/Components/FinanceDashboard/PurchaseRequestForm/ListPurchaseRequest.js); [M38 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m38). **VIDEO VERIFIED:** 02:11–02:12. Recommended priority: **P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Procurement requisitions — blank visit |
| 2 Business purpose | CODE VERIFIED | Maintain purchase requisitions and associated list/form/report or print views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Procurement URL appears with entirely blank content during visit. |
| 4 Important actions | VIDEO VERIFIED | No procurement controls visible; browser recovery follows. |
| 5 Filters/search available | VIDEO VERIFIED | Not visible. |
| 6 Data displayed | VIDEO VERIFIED | No procurement data visible. |
| 7 User workflow | VIDEO VERIFIED | Select Procurement requisitions → blank → return/reload sale form. |
| 8 UX problems | VIDEO VERIFIED | No error/retry/denial guidance. |
| 9 Visual inconsistencies | VIDEO VERIFIED | No page chrome, page title, loader or error state visible during the blank visit; do not invent table/form appearance. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shares request/approval table components, not Client Requirement data. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | A procurement requisition must not be renamed buyer/property Requirement. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the audited workflow, URLs, IDs and permissions while restoring visible page recovery; the blank video does not justify deleting functionality. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shares request/approval table components, not Client Requirement data. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Investigate render/session/request contracts in isolation; retain procurement IDs, approvals and print flow; add bounded failure recovery only after approval. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Work queue / Finance |

### S16 HR Dashboard

**VIDEO + CODE VERIFIED:** `/hr` → [HrDashboard.js](../src/Components/Hr/HrDashboard.js); [M02 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m02). **VIDEO VERIFIED:** 02:32; 02:38. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | HR Dashboard |
| 2 Business purpose | CODE VERIFIED | Operational summaries and role-oriented landing views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Attendance pie and legend for present/absent/late/half-day/leave. |
| 4 Important actions | VIDEO VERIFIED | Navigate among HR modules; no attendance action on chart demonstrated. |
| 5 Filters/search available | VIDEO VERIFIED | No date/team filter observed in sampled viewport. |
| 6 Data displayed | VIDEO VERIFIED | Attendance category graphic; no reliable period/source/count context shown. |
| 7 User workflow | VIDEO VERIFIED | Open HR overview → policy list → return to overview. |
| 8 UX problems | VIDEO VERIFIED | Chart occupies large space and may animate from zero; no explanatory metric state. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Share metric components with other dashboards, not static chart datasets. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Source AttendancePieGraph has literal zero category values; visible slices do not establish actual workforce attendance. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Share metric components with other dashboards, not static chart datasets. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Replace ambiguous graph with verified period/scoped data or explicit unavailable state in approved modernization; preserve HR confidentiality. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Dashboard / Analytics |

### S17 Circular Policy list

**VIDEO + CODE VERIFIED:** `/circular-policy` → [Circularpolicylist.js](../src/Components/Hr/CircularPolicy/Circularpolicylist.js); [M56 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m56). **VIDEO VERIFIED:** 02:33–02:37. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Circular Policy list |
| 2 Business purpose | CODE VERIFIED | Administer circular policies and complaints. |
| 3 Existing visible functionality | VIDEO VERIFIED | Filter strip and populated policy rows with Preview File and Active badges. |
| 4 Important actions | VIDEO VERIFIED | Search and Preview File visible; no preview opened. |
| 5 Filters/search available | VIDEO VERIFIED | Circular category, subject name and policy date. |
| 6 Data displayed | VIDEO VERIFIED | ID, category, subject, policy date, attachment link and status. |
| 7 User workflow | VIDEO VERIFIED | Open Policies → inspect filter/top rows → scroll. |
| 8 UX problems | VIDEO VERIFIED | Long subjects and generous rows consume viewport; preview affordance lacks visible version context. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Can share DocumentTable with notices/resources while retaining audience and acknowledgment policies. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Active indicates record state, not proof of employee acknowledgment or current legal applicability. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Can share DocumentTable with notices/resources while retaining audience and acknowledgment policies. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use shared filter/table/document preview patterns; preserve policy dates, versions, audience and restricted access. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Document / Data table |

### S18 Employees

**VIDEO + CODE VERIFIED:** `/employee` → [Employees.js](../src/Components/Hr/Employees.js); [M48 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m48). **VIDEO VERIFIED:** 02:39. Recommended priority: **P2; credential verification remains P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Employees |
| 2 Business purpose | CODE VERIFIED | Administer employee records and reporting lines. |
| 3 Existing visible functionality | VIDEO VERIFIED | Employee heading, Add New Employees, search and table loading state in a short visit. |
| 4 Important actions | VIDEO VERIFIED | Add and Search visible; not exercised. |
| 5 Filters/search available | VIDEO VERIFIED | Search Anything field. |
| 6 Data displayed | VIDEO VERIFIED | Headers for employee ID/name/department/designation/join date/role; no loaded rows captured. |
| 7 User workflow | VIDEO VERIFIED | Open Employees → loading → immediately navigate to reporting structure. |
| 8 UX problems | VIDEO VERIFIED | Vague search label; no conclusion about permanent loading from a one-second visit. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Share PeopleTable and directory search; preserve field-level HR privacy and employee identity. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Employees and Users aliases do not imply identical employment and authentication models. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Share PeopleTable and directory search; preserve field-level HR privacy and employee identity. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Modernize after password-response verification; clarify search scope and separate access administration from HR profile editing. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table |

### S19 Report To / Reporting structure / Teams

**VIDEO + CODE VERIFIED:** `/report-to` → [ReportTo.js](../src/Components/Hr/ReportTo.js); [M48 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m48). **VIDEO VERIFIED:** 02:40–02:41; 04:17. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Report To / Reporting structure / Teams |
| 2 Business purpose | CODE VERIFIED | Administer employee records and reporting lines. |
| 3 Existing visible functionality | VIDEO VERIFIED | First visit loading; later Teams link shows Report To rows with Update/Delete and status. |
| 4 Important actions | VIDEO VERIFIED | Add New Report To, Update, Delete visible; not executed. |
| 5 Filters/search available | VIDEO VERIFIED | No search/filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Report-to ID/name, department, designation, status and actions; some visible missing/placeholder names. |
| 7 User workflow | VIDEO VERIFIED | Open Reporting structure; later open Teams → same report-to page. |
| 8 UX problems | VIDEO VERIFIED | Three different labels for one route; destructive buttons visually prominent; missing relation values unexplained. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Exact route alias overlap verified in navigation: Teams and Reporting structure both /report-to. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | A reporting-line row is not necessarily a team/membership entity. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Exact route alias overlap verified in navigation: Teams and Reporting structure both /report-to. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use one intentional label/breadcrumb and reusable OrganizationTable; preserve existing semantics until team/reporting model is verified. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Other organization |

### S20 CEO Note / Notices

**VIDEO + CODE VERIFIED:** `/notice` → [Notice.js](../src/Components/Hr/Notice.js); [M52 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m52). **VIDEO VERIFIED:** 02:42–02:44. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | CEO Note / Notices |
| 2 Business purpose | CODE VERIFIED | Administer notices and employee warnings. |
| 3 Existing visible functionality | VIDEO VERIFIED | Notices heading resolves to CEO Note table; loading then rows and Update controls. |
| 4 Important actions | VIDEO VERIFIED | Add New Notice and Update visible; no edit performed. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | ID, description and actions; repeated-looking text in separate rows. |
| 7 User workflow | VIDEO VERIFIED | Choose Notices → wait for rows → browse to attendance. |
| 8 UX problems | VIDEO VERIFIED | Long prose in table; title mismatch; repeated-looking records increase scan effort. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Notices and policies share publishing primitives but audience/acknowledgment may differ. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Repeated text alone is not proof of duplicate records to delete. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Notices and policies share publishing primitives but audience/acknowledgment may differ. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use publication list with concise summary/detail preview and preserved ID/history; review duplicates with owner before any consolidation. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Document |

### S21 Attendance

**VIDEO + CODE VERIFIED:** `/attendance` → [Attendance.js](../src/Components/Hr/Attendance.js); [M53 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m53). **VIDEO VERIFIED:** 02:45–02:47. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Attendance |
| 2 Business purpose | CODE VERIFIED | Administer attendance, shifts and holidays. |
| 3 Existing visible functionality | VIDEO VERIFIED | Manual Attendance, upload-sample generation, native file chooser, Bulk Import Attendance and empty-looking table. |
| 4 Important actions | VIDEO VERIFIED | Manual entry, sample generation and bulk import controls visible; no file selected/imported. |
| 5 Filters/search available | VIDEO VERIFIED | No date/employee filter visible in this visit. |
| 6 Data displayed | VIDEO VERIFIED | Employee, check-in/out, date and machine-ID headings; pagination. |
| 7 User workflow | VIDEO VERIFIED | Open Attendance → inspect import controls → move to Leave. |
| 8 UX problems | VIDEO VERIFIED | Several competing action styles; upload workflow lacks visible preview/error guidance at this step. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reuse import preview/validation/status patterns from lead imports, not lead-specific schemas. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | No rows does not establish no attendance or failed import. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reuse import preview/validation/status patterns from lead imports, not lead-specific schemas. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Preserve manual/import workflows and identity/date rules; later add staged preview, row errors and duplicate handling after backend confirmation. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Form import |

### S22 Leave Applications

**VIDEO + CODE VERIFIED:** `/leave` → [Leave.js](../src/Components/Hr/Leave.js); [M50 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m50). **VIDEO VERIFIED:** 02:48–02:55. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Leave Applications |
| 2 Business purpose | CODE VERIFIED | Administer leave administration. |
| 3 Existing visible functionality | VIDEO VERIFIED | Leave applications table shows No Record Found; Add New Leaves and Leave Type actions. |
| 4 Important actions | VIDEO VERIFIED | Create leave and manage leave types visible; neither used. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Request ID, employee, leave type, duration/day count, purpose and status headings. |
| 7 User workflow | VIDEO VERIFIED | Open leave → inspect empty list while browsing HR/finance navigation. |
| 8 UX problems | VIDEO VERIFIED | Sparse empty state gives no explanation or next action; red Leave Type competes with primary create. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Share request queue/approval components while keeping HR rules separate. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | No records is not proof of leave balance or permission semantics. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Share request queue/approval components while keeping HR rules separate. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Adopt typed empty state and request filters, clear create-versus-setup actions, with verified balances and approvals. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Work queue / Data table |

### S23 Finance Dashboard

**VIDEO + CODE VERIFIED:** `/finance` → [FinanceDashboard.js](../src/Components/FinanceDashboard/FinanceDashboard.js); [M02 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m02). **VIDEO VERIFIED:** 02:56. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Finance Dashboard |
| 2 Business purpose | CODE VERIFIED | Operational summaries and role-oriented landing views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Legacy KPI/link cards for deals/documents/security files/assets/payment plans/vouchers and further registers. |
| 4 Important actions | VIDEO VERIFIED | Module cards visible; no financial posting executed. |
| 5 Filters/search available | VIDEO VERIFIED | No finance period/filter observed in brief view. |
| 6 Data displayed | VIDEO VERIFIED | Total/Today badges and repeated bitmap-style icons. |
| 7 User workflow | VIDEO VERIFIED | Open Finance overview → navigate to Bank deposits. |
| 8 UX problems | VIDEO VERIFIED | Card density, legacy icon style and unclear time scope differ from shell. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reuse MetricCard/ShortcutGrid with HR/home templates; preserve role-specific finance entry points. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Deals Done counter does not establish revenue, collection or journal posting. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reuse MetricCard/ShortcutGrid with HR/home templates; preserve role-specific finance entry points. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use verified metric catalog and finance-scoped shortcuts, explicit freshness and permission boundaries. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Dashboard / Finance |

### S24 Bank Deposit List

**VIDEO + CODE VERIFIED:** `/bank-deposit-list` → [ListBankDeposit.js](../src/Components/FinanceDashboard/BankDeposit/ListBankDeposit.js); [M39 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m39). **VIDEO VERIFIED:** 02:57–02:59. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Bank Deposit List |
| 2 Business purpose | CODE VERIFIED | Maintain bank deposits and associated list/form/report or print views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Populated deposit register and Add New Bank Deposit action. |
| 4 Important actions | VIDEO VERIFIED | Create action visible; no deposit/print/reversal performed. |
| 5 Filters/search available | VIDEO VERIFIED | Top search not visible in sampled viewport. |
| 6 Data displayed | VIDEO VERIFIED | Account title, bank name, account number and deposit date; further columns clipped. |
| 7 User workflow | VIDEO VERIFIED | Open deposit list → inspect rows → go to Deal forms. |
| 8 UX problems | VIDEO VERIFIED | Wide account/date columns; sensitive full account data visible in recording. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Can share finance table and account picker without merging voucher/receipt/ledger semantics. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Listed deposits do not prove posted/cleared/reconciled funds. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Can share finance table and account picker without merging voucher/receipt/ledger semantics. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Preserve deposit IDs and reconciliation flow; reuse FinancialDataTable with appropriate masking and stable account references. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Finance / Data table |

### S25 Deal Form List

**VIDEO + CODE VERIFIED:** `/deal-form-list` → [ListDealForm.js](../src/Components/FinanceDashboard/Dealform/ListDealForm.js); [M42 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m42). **VIDEO VERIFIED:** 03:00–03:01; 03:04–03:18. Recommended priority: **P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Deal Form List |
| 2 Business purpose | CODE VERIFIED | Intended finance deal forms entry and listing. |
| 3 Existing visible functionality | VIDEO VERIFIED | Loading then No Record Found under cash-style columns; Add New Deal Form visible. |
| 4 Important actions | VIDEO VERIFIED | Add action and pager visible; row Delete not shown because no rows. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | User, Ref No, Received Amount, Utilized, Balance, Action headings. |
| 7 User workflow | VIDEO VERIFIED | Open Deal Forms → visit Assets/recover → browse accounting menu while empty Deal Form remains. |
| 8 UX problems | VIDEO VERIFIED | Business title conflicts with cash-register columns; generic empty state masks underlying wrong-resource wiring. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Overlap is unsafe copied resource wiring, not permission to merge deal and petty-cash domains. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Source confirms PettyCashAction and DELETE pettycash; video does not show deletion or establish that any record was deleted. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Overlap is unsafe copied resource wiring, not permission to merge deal and petty-cash domains. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Contain wrong-resource operations first under Phase-0A; preserve genuine Petty Cash and route; enable deal actions only with verified intended contract. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Finance / Data table |

### S26 Assets — blank visit

**VIDEO + CODE VERIFIED:** `/fixed-asset-register` → [FixedAssetRegister.js](../src/Components/FinanceDashboard/AssetRegister/FixedAssetRegister.js); [M25 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m25). **VIDEO VERIFIED:** 03:02–03:03. Recommended priority: **P0**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Assets — blank visit |
| 2 Business purpose | CODE VERIFIED | Maintain fixed assets and gate passes and associated list/form/report or print views. |
| 3 Existing visible functionality | VIDEO VERIFIED | Fixed asset register URL is visible with blank content; no asset list rendered. |
| 4 Important actions | VIDEO VERIFIED | No asset actions visible. |
| 5 Filters/search available | VIDEO VERIFIED | Not visible. |
| 6 Data displayed | VIDEO VERIFIED | No asset records visible. |
| 7 User workflow | VIDEO VERIFIED | Choose Assets → blank → return/reload Deal Forms. |
| 8 UX problems | VIDEO VERIFIED | No visible recovery path within the application. |
| 9 Visual inconsistencies | VIDEO VERIFIED | No page chrome, page title, loader or error state visible during the blank visit; do not invent table/form appearance. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Share tables and asset selectors only; keep accounting/stock/physical-property identities distinct. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Fixed assets/gate passes are operational assets, not real-estate inventory units. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the audited workflow, URLs, IDs and permissions while restoring visible page recovery; the blank video does not justify deleting functionality. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Share tables and asset selectors only; keep accounting/stock/physical-property identities distinct. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Investigate route failure with synthetic responses, then preserve register, asset identifiers and gate-pass/print relationships. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table |

### S27 Analytics Dashboard

**VIDEO + CODE VERIFIED:** `/analytics` → [Analytics.js](../src/Components/SalesDashboard/Analytics.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:19–03:28. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Analytics Dashboard |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Lead-category pie, sharing/transfer pie and weekly line chart; upper chart panels largely empty in samples. |
| 4 Important actions | VIDEO VERIFIED | Chart download-looking icon visible; not exercised. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Assigned/My/Hot/Not-interested/Dormant/Activity labels; transfer categories and weekdays. |
| 7 User workflow | VIDEO VERIFIED | Open Analytics → scroll through stacked pies and line plot → open reports. |
| 8 UX problems | VIDEO VERIFIED | Tall panels and overlapping category labels; no prominent period/freshness/denominator explanation. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Many specialized reports share filter/chart/table presentation but not formulas. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Lead lists and activity counts are not mutually exclusive funnel stages; percentages must not be labeled conversion without definition. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Many specialized reports share filter/chart/table presentation but not formulas. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use MetricDefinition/ChartPanel with explicit source, denominator and no-data states; preserve distinct report calculations pending owner review. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics |

### S28 Calling Analytics Dashboard

**VIDEO + CODE VERIFIED:** `/calling-analytics` → [Callinganalytics.js](../src/Components/SalesDashboard/Callinganalytics.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:29–03:31. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Calling Analytics Dashboard |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Calling Source legend and largely empty plot area. |
| 4 Important actions | VIDEO VERIFIED | Navigation only; no call placed. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Source legend for YouTube/social/SMS/web/reference/follow-up/personal calls. |
| 7 User workflow | VIDEO VERIFIED | Open call analytics → inspect → Call status report. |
| 8 UX problems | VIDEO VERIFIED | Large blank chart with no explanation of unavailable versus zero. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Call analytics, call-status report and operational Zong history have distinct purposes. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | CallingTypeSource accepts data but uses literal zero values; chart cannot certify real provider activity. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Call analytics, call-status report and operational Zong history have distinct purposes. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Reuse honest ChartPanel states; verify provider-event definitions before showing contact/delivery/conversion metrics. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics / Communication |

### S29 Call Status Reporting

**VIDEO + CODE VERIFIED:** `/list-status-report` → [ListStatusReport.js](../src/Components/SalesDashboard/ListStatusReport.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:32–03:34. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Call Status Reporting |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Date-like input labeled Search Anything, Search button and agent call table. |
| 4 Important actions | VIDEO VERIFIED | Search visible, no changed filter demonstrated. |
| 5 Filters/search available | VIDEO VERIFIED | Date range input under ambiguous text label. |
| 6 Data displayed | VIDEO VERIFIED | Agent, assigned leads, outgoing/connected/follow-up counts and talk time. |
| 7 User workflow | VIDEO VERIFIED | Open report → scroll rows → lead-status report. |
| 8 UX problems | VIDEO VERIFIED | Wrong search label; horizontally constrained headings and missing explanatory scope. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shared report FilterBar/DataTable with lead and KPI reports; no automatic query/formula consolidation. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Connected count requires provider evidence, not a phone-link click. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shared report FilterBar/DataTable with lead and KPI reports; no automatic query/formula consolidation. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use DateRangeField and metric tooltips, pinned agent column, verified provider status/time contracts. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics / Data table |

### S30 Leads Status Reporting

**VIDEO + CODE VERIFIED:** `/leads-status-report` → [LeadStatusReport.js](../src/Components/SalesDashboard/LeadStatusReport.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:35–03:40. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Leads Status Reporting |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Agent-by-category report with Total/Today badges in cells. |
| 4 Important actions | VIDEO VERIFIED | Search visible; scroll only. |
| 5 Filters/search available | VIDEO VERIFIED | Date range and Search. |
| 6 Data displayed | VIDEO VERIFIED | Assigned/My/Hot/Not Interested/untouched-style lead columns and agent identities. |
| 7 User workflow | VIDEO VERIFIED | Open → scan badges → scroll → daily report. |
| 8 UX problems | VIDEO VERIFIED | Repeated red/blue badges create noise and tiny comparisons; wide grid. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Can share grouped metric cells and report toolbar, not infer one canonical stage model from labels. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Total versus Today alongside a date range needs documented period semantics; categories may overlap. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Can share grouped metric cells and report toolbar, not infer one canonical stage model from labels. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use compact accessible totals/subtotals and explicit period definitions with stable agent identity. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics / Data table |

### S31 Daily Leads Reporting

**VIDEO + CODE VERIFIED:** `/list-daily-leads-report` → [DailyLeadsReporting.js](../src/Components/SalesDashboard/DailyLeadsReporting.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:41–03:42. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Daily Leads Reporting |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Report heading, Today/Yesterday/Project Wise columns and TOTAL row; no useful row values captured. |
| 4 Important actions | VIDEO VERIFIED | No action exercised. |
| 5 Filters/search available | VIDEO VERIFIED | No filter visible in short visit. |
| 6 Data displayed | VIDEO VERIFIED | Agent and daily/project comparison headings. |
| 7 User workflow | VIDEO VERIFIED | Open daily report briefly → Database report. |
| 8 UX problems | VIDEO VERIFIED | Sparse state does not distinguish pending data from empty result. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Share report states and period controls with other analytics after contract verification. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Blank totals must not be treated as zero performance. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Share report states and period controls with other analytics after contract verification. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Define loading/empty/error and day/timezone semantics before adding visual comparisons. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics / Data table |

### S32 Database report / imported leads

**VIDEO + CODE VERIFIED:** `/list-import-database-leads-report` → [LeadImportList.js](../src/Components/SalesDashboard/LeadImportList.js); [M06 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m06). **VIDEO VERIFIED:** 03:43–03:50. Recommended priority: **P1**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Database report / imported leads |
| 2 Business purpose | CODE VERIFIED | Bulk lead intake, campaign/source metadata and distribution. |
| 3 Existing visible functionality | VIDEO VERIFIED | Large-total badge, phone/project/date filters and populated wide imported-contact table. |
| 4 Important actions | VIDEO VERIFIED | Search visible; horizontal scroll; no export or record edit demonstrated. |
| 5 Filters/search available | VIDEO VERIFIED | Phone number, project multi-select and date range. |
| 6 Data displayed | VIDEO VERIFIED | Client name/phone/email/project/designation/nature/lead status/date; values are not reproduced here. |
| 7 User workflow | VIDEO VERIFIED | Open report → inspect identity columns → scroll right for status/date → return to left. |
| 8 UX problems | VIDEO VERIFIED | Full contact data shown; clipped date range and many wide columns; identity disappears during horizontal scroll. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reuse searchable contact table with Clients/lead lists after semantics/privacy review; do not merge imports into clients automatically. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | This is /list-import-database-leads-report, not Clients /list-super-database-report; similarly named routes must remain distinct. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reuse searchable contact table with Clients/lead lists after semantics/privacy review; do not merge imports into clients automatically. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use pinned identity, clear filter summary, bounded pagination and authorized PII handling; preserve import/source provenance. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Analytics |

### S33 KPIS Report

**VIDEO + CODE VERIFIED:** `/list-kpis-report` → [KpiReports.js](../src/Components/SalesDashboard/KpiReports.js); [M09 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m09). **VIDEO VERIFIED:** 03:51–04:11. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | KPIS Report |
| 2 Business purpose | CODE VERIFIED | Sales, lead status, team KPI and database reports. |
| 3 Existing visible functionality | VIDEO VERIFIED | Filters, KPIS Graphs shortcut, loading/total row then many performance columns and red target cells. |
| 4 Important actions | VIDEO VERIFIED | Search and graph shortcut visible; horizontal scroll, no graph destination opened. |
| 5 Filters/search available | VIDEO VERIFIED | Consultants, team leader, lead nature and date range. |
| 6 Data displayed | VIDEO VERIFIED | Assigned leads, work history, interest/affiliate/call/meeting/talk-time/transfer/percentage/KPI columns across horizontal positions. |
| 7 User workflow | VIDEO VERIFIED | Open → initial loading/zeros → scroll horizontally → populated rows → browse settings. |
| 8 UX problems | VIDEO VERIFIED | Very wide report separates identity from results; abbreviations, red fills and badge targets overload scanning. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reusable metric table and filter components; preserve each KPI formula and credited ownership pending catalog review. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Initial zeros are not final results; activity/targets/outcomes and percentage formulas need definition. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reusable metric table and filter components; preserve each KPI formula and credited ownership pending catalog review. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Pin consultant identity, group/hide columns and expose metric definitions; retain authorized export and comparisons only where evidenced. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Analytics / Data table |

### S34 Company / Companies

**VIDEO + CODE VERIFIED:** `/company` → [Companies.js](../src/Components/Hr/Companies.js); [M49 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m49). **VIDEO VERIFIED:** 04:12–04:13; 04:22–04:33. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Company / Companies |
| 2 Business purpose | CODE VERIFIED | Administer organization setup. |
| 3 Existing visible functionality | VIDEO VERIFIED | Company loading then populated list; long contact/address rows and Add New Company. |
| 4 Important actions | VIDEO VERIFIED | Add action visible; no create/update/delete performed. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Company ID/name/country/city/contact/address and further columns. |
| 7 User workflow | VIDEO VERIFIED | Open Companies → visit branches/departments → return and scroll. |
| 8 UX problems | VIDEO VERIFIED | Large multi-line rows and clipped trailing columns; title singular versus plural navigation. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shares reference-data table with Branch/Department; preserve distinct IDs and relations. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Company is not proven Agency/Tenant; organization list cannot establish tenant boundaries. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shares reference-data table with Branch/Department; preserve distinct IDs and relations. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Reuse OrganizationTable with compact address preview and verified legal-entity/tenant semantics. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Other organization |

### S35 Branch / Branches

**VIDEO + CODE VERIFIED:** `/branch` → [Branch.js](../src/Components/Hr/Branch.js); [M49 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m49). **VIDEO VERIFIED:** 04:14; 04:20–04:21. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Branch / Branches |
| 2 Business purpose | CODE VERIFIED | Administer organization setup. |
| 3 Existing visible functionality | VIDEO VERIFIED | Loading then branch record with Active, Update and Delete controls. |
| 4 Important actions | VIDEO VERIFIED | Add New Branch, Update, Delete visible; not used. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | ID heading displayed as Des ID, branch name, status and actions. |
| 7 User workflow | VIDEO VERIFIED | Choose Branches → later return after departments. |
| 8 UX problems | VIDEO VERIFIED | Copied ID label and strong red Delete compete with routine edit. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Shared organization CRUD pattern; do not combine entity models. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Des ID may be a presentation copy, not proof of incorrect backend identity. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Shared organization CRUD pattern; do not combine entity models. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Standardize labels and row actions; verify branch dependency checks before deletion/archive redesign. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Other organization |

### S36 Department / Departments

**VIDEO + CODE VERIFIED:** `/department` → [Departments.js](../src/Components/Hr/Departments.js); [M49 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m49). **VIDEO VERIFIED:** 04:15–04:16; 04:18–04:19. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | Department / Departments |
| 2 Business purpose | CODE VERIFIED | Administer organization setup. |
| 3 Existing visible functionality | VIDEO VERIFIED | Department rows with status and Update/Delete; loading state on return. |
| 4 Important actions | VIDEO VERIFIED | Add New Department, Update and Delete visible; not used. |
| 5 Filters/search available | VIDEO VERIFIED | No filter observed. |
| 6 Data displayed | VIDEO VERIFIED | Department ID/name/status/actions. |
| 7 User workflow | VIDEO VERIFIED | Browse Departments → Teams → return → Branches. |
| 8 UX problems | VIDEO VERIFIED | Same dense/action-heavy reference-list layout; little explanatory context. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reuse same OrganizationTable as branches/reporting, with entity-specific contracts. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Deletion may affect HR/scope relationships; video cannot establish safeguards. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reuse same OrganizationTable as branches/reporting, with entity-specific contracts. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Standardize reference table and confirmations; preserve scope/reporting references and server policy. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Data table / Other organization |

### S37 My profile

**VIDEO + CODE VERIFIED:** `/profile` → [Profile.js](../src/Components/UserProfile/Profile.js); [M01 source audit](REDBOX_CRM_MASTER_AUDIT.md#module-m01). **VIDEO VERIFIED:** 04:34–04:38. Recommended priority: **P2**.

| Required aspect | Evidence label | Observation / recommendation |
|---|---|---|
| 1 Module / screen | VIDEO + CODE VERIFIED | My profile |
| 2 Business purpose | CODE VERIFIED | Employee sign-in, profile and recovery screens. |
| 3 Existing visible functionality | VIDEO VERIFIED | Hero/banner identity, Message button and personal/employment fields. |
| 4 Important actions | VIDEO VERIFIED | Message visible; no message sent; New lead followed afterward. |
| 5 Filters/search available | VIDEO VERIFIED | No search/filter. |
| 6 Data displayed | VIDEO VERIFIED | Name/email, father name, birth date, official mobile and department labels; personal values omitted. |
| 7 User workflow | VIDEO VERIFIED | Open profile → inspect → use New lead to return to lead form. |
| 8 UX problems | VIDEO VERIFIED | Large decorative banner pushes useful information below fold; mixed personal/professional details. |
| 9 Visual inconsistencies | VIDEO VERIFIED | Observed content uses its legacy page treatment inside the shared shell; apply shared spacing, typography and control hierarchy. Specific density/layout issues are described above; no measured contrast/accessibility pass is claimed. |
| 10 Redundant / overlapping functionality | CODE VERIFIED | Reuse sectioned ProfileDetail but do not expose HR-private fields through ordinary Client 360. |
| 11 Potentially confusing functionality | VIDEO + CODE VERIFIED | Message links to /chat in source; that does not establish working messaging. |
| 12 Functionality to preserve | CODE VERIFIED | Preserve the listed visible fields, navigation and meaningful actions, plus the linked audited workflow/IDs/history; retain existing action permissions and do not remove offscreen controls by assumption. |
| 13 Functionality to consolidate | CODE VERIFIED | Presentation/interaction reuse only: Reuse sectioned ProfileDetail but do not expose HR-private fields through ordinary Client 360. |
| 14 Modernization recommendation | VIDEO + CODE VERIFIED | Use privacy-aware detail sections, concise identity header and truthful communication availability. Proposal only; backend contract dependencies remain open. |
| 15 Reusable SELLMORE pattern | VIDEO + CODE VERIFIED | Detail/360 |

## 5 Navigation-only and missing workflow coverage

**VIDEO + CODE VERIFIED:** These entries provide the requested attention to major domains without presenting unvisited screens as reviewed. Menu visibility proves discovery only. The detailed cards cover every visited destination; the table below covers additional domain labels seen in navigation or explicitly requested but not opened. Each row records purpose, visible extent/actions, filters/data, workflow limits, UX/confusion, preservation, consolidation, recommendation and reusable pattern.

| Domain / module | Evidence label and video extent | Purpose / functionality / actions | Filters, data and observed workflow | UX / visual / confusion / overlap | Preserve; consolidate; modernization recommendation | Priority / pattern |
|---|---|---|---|---|---|---|
| Home Dashboard M02 | VIDEO VERIFIED: menu at 00:20, 00:30, 03:06; no foreground /dashboard visit | CODE VERIFIED: overview counts/charts/shortcuts in prior audit | VIDEO VERIFIED: no foreground home filters, chart drilldown or refresh workflow reviewed; background fragments insufficient | CODE VERIFIED: specialist/home metrics share patterns; do not infer dashboard correctness from snippets | CODE VERIFIED: preserve current dashboard and role routes; reuse MetricCard/ChartPanel with source/period/error states; obtain focused walkthrough | P1 / Dashboard |
| My Leads, Hot/Virgin/Dormant/Not-interested/Transfers M03/M05 | VIDEO VERIFIED: labels around 00:10–00:36 only | CODE VERIFIED: operational lead queues; Dormant is audited template | VIDEO VERIFIED: queue data/actions/filters not opened; no transfer/edit outcome | CODE VERIFIED: overlapping lists may be saved views, but assignment, source and stage semantics differ | CODE VERIFIED: preserve actions/history; adapt shared lead-table contract after Assigned Leads recovery; owner review before retiring Dormant template | P1; Dormant P3/P4 review / Work queue |
| Activities and Follow-ups M07 | VIDEO VERIFIED: Activities/Reminders at 00:40 | CODE VERIFIED: activity/reminder capture and history | VIDEO VERIFIED: no form, due-date filter, completion or timeline opened | CODE VERIFIED: could share timeline and due-work panels, not erase distinct activity/reminder events | CODE VERIFIED: preserve lead/work history and reminder relationships; future shared Timeline/WorkQueue with authorized commands | P1 / Work queue / Detail/360 |
| Calling/Zong M08 | VIDEO VERIFIED: Calls label 00:40–00:42; only analytics reports opened | CODE VERIFIED: client-wired Zong/history; no new integration verification | VIDEO VERIFIED: no dialer, recording playback, call result or provider event reviewed | REQUIRES BACKEND VERIFICATION: connected status, recording access, retry deduplication; links are not successful calls | CODE VERIFIED: preserve Zong IDs and behavior; shared CommunicationActions and CallHistory after provider contract review | P1 / Communication |
| Inventory M10 | VIDEO VERIFIED: label 00:04/00:46/02:20; no inventory grid opened | CODE VERIFIED: project stock, filtering, holds/sales exist in audit | VIDEO VERIFIED: no unit data/filter/hold/unhold/sale interaction reviewed | REQUIRES BACKEND VERIFICATION: availability, concurrency and expiry; grid appearance not assessed | CODE VERIFIED: retain inventory/unit IDs and project semantics; shared grid/status/filter patterns only after focused evidence | P1 / Inventory grid |
| Sales Deals M11 and Sold Inventory | VIDEO VERIFIED: Deals menu 00:42; sold inventory page not shown | CODE VERIFIED: client-wired sold inventory/deal paths separate from finance Deal Form | VIDEO VERIFIED: no completed sale/deal/booking/print workflow reviewed | CODE VERIFIED: Sales forms S13/S14 and Deal Form S25 are not substitutes for reviewing sold inventory | CODE VERIFIED: preserve sale IDs, customer/nominee/docs/print links; future DealDetail with compatible mappings | P1 / Finance / Detail/360 |
| Valued Partner portal M20–M23 | VIDEO VERIFIED: only login S05 and resource folders S10 | CODE VERIFIED: affiliate identity/leads/activities/inventory/resources exist | VIDEO VERIFIED: no partner login success, protected claim, commission or portal record reviewed | REQUIRES BACKEND VERIFICATION: protection/claim policies and private data grants remain future/unknown | CODE VERIFIED: preserve affiliate IDs/history/URLs; clear portal boundary before a unified partner directory | P2 / Form / Work queue |
| Marketing intake M06 / campaigns | VIDEO VERIFIED: Online leads/Import leads/Data drive labels around 00:38 | CODE VERIFIED: intake/import evidence in audit; no universal provider connector established | VIDEO VERIFIED: no CSV upload/mapping/assignment or campaign setup reviewed | CODE VERIFIED: Database report S32 displays imported-contact data, not proof of ingestion correctness | CODE VERIFIED: preserve import/source/batch identities; shared ImportWizard only with existing field/idempotency contracts | P1/P2 / Form / Data table |
| Chat M16 | VIDEO VERIFIED: menu 01:26/01:36; not opened; profile Message is S37 | CODE VERIFIED: template communication screen | VIDEO VERIFIED: no message send/delivery seen | CODE VERIFIED: overlaps Inbox template; do not treat profile Message as integration | CODE VERIFIED: preserve URL and clearly mark unavailable until provider-backed work approved | P3/P4 review / Communication |
| HR remaining M49–M56 | VIDEO VERIFIED: Training/Warnings/Shifts/Designations/Terminations/Job posts/Payroll/setup/holidays labels 02:48–02:53 | CODE VERIFIED: audited HR modules have distinct business rules | VIDEO VERIFIED: no payroll/recruitment/training/termination forms, filters or actions reviewed | REQUIRES BACKEND VERIFICATION: HR privacy, payroll calculations, session revocation, certification | CODE VERIFIED: preserve full HR lifecycle; share PeopleTable/RequestQueue/Form/Document patterns after owner review | P2/P3 / Data table / Form |
| Finance remaining M26–M47 | VIDEO VERIFIED: assets/cash/bills/plans/receipts/vouchers/accounts/cheques/stock and accounting menu items around 02:58–03:18 | CODE VERIFIED: separate audited transaction/register families | VIDEO VERIFIED: only finance dashboard/deposits/deal form and blank assets visited; no accounting post/reversal or receipt tested | REQUIRES BACKEND VERIFICATION: receipt distinctions, posting, allocations, balances and reconciliation | CODE VERIFIED: preserve existing families and print formats; share finance table/form components, not endpoints | P2; known contract hazards P0 / Finance |
| Vehicle Pass M43 | VIDEO VERIFIED: menu near 02:00/02:28; page not opened | CODE VERIFIED: existing work package notes copied cash read/handler with commented row controls | VIDEO VERIFIED: no pass records/actions reviewed | CODE VERIFIED: dormant handler risk differs from live Deal Form Delete; no evidence of clicked deletion | CODE VERIFIED: preserve route, separately contain copied wiring before reuse; no automatic merger with stock/gate passes | P0 code risk / Other |
| Admin / Roles and permissions M15 | VIDEO VERIFIED: Settings organization and Access group around 04:10–04:32; permission editor not opened | CODE VERIFIED: Users, role categories/modules/setup/permissions registry exists | VIDEO VERIFIED: no permission grant/revoke, denied request or role switch demonstrated | REQUIRES BACKEND VERIFICATION: menu/scope/account labels never establish authorization | CODE VERIFIED: preserve numeric permission compatibility and role variants; shared capability UI only after server map | P0 verification / P2 UX / Other |
| Future destinations | VIDEO + CODE VERIFIED: Coming soon items across journey/property/network/business/AI/agency groups | CODE VERIFIED: placeholders include My Day, Requirements, Meetings, Viewings, Offers, Properties/Listings/Developers, Matching/Saved searches/Maps, marketplaces/broker network, Calendar/Approvals/Academy, AI Copilot, Agency/Integrations/Automation/Plan/Branding/Audit/Settings | VIDEO VERIFIED: no functional screens/actions/data/filters reviewed; disabled-looking entries only | VIDEO VERIFIED: numerous nested future labels consume space; CODE VERIFIED: disabled entries are not working features | CODE VERIFIED: preserve truthful status; consider compact future-feature disclosure; no empty page creation or domain implementation in this audit | P3 / Other |

## 6 Workflow inventory

| Workflow | Evidence label | Observed sequence / missing completion | Preserve and shared opportunity |
|---|---|---|---|
| Navigate and recover | VIDEO + CODE VERIFIED | Expand area/section → choose route; four blank destinations → browser back/reload. Cause not established. | Persistent shell, route compatibility; PageState, recovery and capture of safe diagnostic context |
| Create a lead | VIDEO + CODE VERIFIED | Open/return to Add Leads; default fields and save control seen; no submission | Field semantics/source/assignment; FormSection + inline validation after contract verification |
| Work assigned/client records | VIDEO VERIFIED | Both target pages blank; end-to-end qualification/assignment cannot be reviewed | CODE VERIFIED: preserve existing queues/actions; obtain targeted successful/failed flow after P0 diagnosis |
| Create project | VIDEO + CODE VERIFIED | Projects → Add Projects → inspect fields/upload/submit controls; no save | Geographic dependencies and project IDs; shared form/upload inputs |
| Partner access | VIDEO + CODE VERIFIED | Valued Partners → standalone login → back; no authenticated portal | Separate identity/context, explicit portal entry |
| Task triage | VIDEO + CODE VERIFIED | Open status/filter summary → read long list → horizontal scan | Task ownership/status/comments/checklists/history; WorkQueue + pinned identity |
| Document discovery | VIDEO + CODE VERIFIED | Security-file list → pagination; marketing folders and policy links separately browsed | Classification/reference/version/privacy; DocumentTable and ResourceLibrary |
| Content production | VIDEO + CODE VERIFIED | YouTube overview → request list; no create/review/approval | Distinguish static analytics from client-wired requests; RequestQueue |
| Sale documentation | VIDEO + CODE VERIFIED | Sale list → horizontal scan → Add New Sales Form → transaction/commission sections; no submit | Parties/unit IDs/terms/prints; FinancialForm and line-item editor |
| Procurement / assets | VIDEO VERIFIED | Routes visited but blank, followed by recovery | CODE VERIFIED: preserve procurement/operational-asset semantics; diagnose before cosmetic work |
| HR administration | VIDEO + CODE VERIFIED | Overview/policy/employees/reporting/notices/attendance/leave; no edits/import/approval | HR privacy, organization IDs, attendance imports and leave policy; PeopleTable/RequestQueue |
| Finance inspection | VIDEO + CODE VERIFIED | Finance overview → deposits → deal-form empty list → blank assets | Separate posting/receipts/cash contracts; FinancialDataTable and truthful empty/error states |
| Management reporting | VIDEO + CODE VERIFIED | Analytics → call source/status → lead status/daily/import/KPI reports; primarily scrolling | Metric definitions, filters, date windows and identities; shared ReportToolbar/MetricTable |
| Organization maintenance | VIDEO + CODE VERIFIED | Companies → Branches → Departments → Teams/report-to → back; no mutations | Referential integrity and scope; OrganizationTable |
| Profile to new lead | VIDEO + CODE VERIFIED | My profile → inspect fields/Message control → New lead | Private profile sections and preserved quick-create route; Message is not proven operational |

**REQUIRES BACKEND VERIFICATION:** No observed sequence proves successful create/save/update/delete, CSV processing, payment settlement, hold/sale transition, communication delivery, protected attribution, permission enforcement or data reconciliation. Screens loaded from localhost may still use remote services; localhost is not proof of safe staging.

## 7 UI pattern inventory and reusable components

| Pattern | Evidence label / examples | Reusable components | Contract and reuse boundary |
|---|---|---|---|
| Dashboard | VIDEO + CODE VERIFIED: Tasks, Operations, HR, Finance, YouTube | MetricCard, ShortcutGrid, ChartPanel, MetricDefinition, PageState | Separate source/period/scope/freshness; never transplant static numbers |
| Data table | VIDEO + CODE VERIFIED: sales/tasks/imports/organization/security files | DataTable, FilterBar, Pagination, RowActions, StatusBadge, pinned identity | Existing server/client pagination adapter per screen; stable IDs; loading/empty/error/denied states |
| Form | VIDEO + CODE VERIFIED: lead/project/sale/login | PageHeader, FormSection, FormField, dependent picker, PhoneField, FileField, SaveBar | No guessed payload keys; preserve required/optional semantics, raw values and unsaved changes |
| Detail/360 | VIDEO VERIFIED: Profile; CODE VERIFIED: future Client 360 architecture | IdentityHeader, DetailsSection, Timeline, restricted related panels | A Client panel cannot reveal HR/finance/documents merely through parent access |
| Inventory grid | CODE VERIFIED: audit M10; VIDEO VERIFIED: menu only | InventoryFilterBar, UnitCard/Grid, AvailabilityBadge | Reservation concurrency/expiry/sold state require server evidence; no visual mock replacing behavior |
| Work queue | VIDEO + CODE VERIFIED: task/request/leave lists; follow-ups menu only | WorkQueue, DueBadge, Assignee, quick preview, permitted commands | Keep source task/reminder/request identity and independent permissions |
| Analytics | VIDEO + CODE VERIFIED: report cluster and charts | ReportToolbar, DateRangeField, MetricTable, ChartPanel, definition tooltip | Preserve formulas, periods, cohort/denominator and privacy; asking price ≠ transaction price |
| Communication | VIDEO + CODE VERIFIED: Inbox template, partner login/profile Message; Calls menu | CommunicationActions, ProviderState, CallHistory | No sent/connected/delivered claim from a button; provider and recording access verified separately |
| Finance | VIDEO + CODE VERIFIED: deposits/sales/form/deal form | CurrencyField, FinancialDataTable, LineItemEditor, ApprovalStatus, PrintAction | Decimal/rounding/stable-ID/authorization and posting contracts precede UI convergence |
| Document | VIDEO + CODE VERIFIED: security files/policies/marketing folders | DocumentTable, ResourceLibrary, VersionLabel, permitted Preview/Download | Separate public collateral/private identity/contracts; no automatic file-access grants |
| Other: organization/navigation | VIDEO + CODE VERIFIED: shell/company/branch/department/report-to | Sidebar/TopBar, OrganizationTable, ConfirmationDialog | Keep tenant/company/team/reporting meanings separate; destructive action policies remain explicit |

**VIDEO + CODE VERIFIED — proposed common content contract:** one page title and local primary action; compact readable filter bar with explicit Search/Clear and active-filter summary; visible record identity during horizontal scrolling; one consistent pagination/status/action style; distinguish first load, refresh, no results, unavailable, denied and failed states. Retain existing routes, field bindings, request semantics and print modes. Scope new styles under shared classes; do not override every legacy table/input globally.

**CODE VERIFIED — proposed accessibility acceptance, not tested here:** labels and help associations, keyboard/focus order, semantic table headers, visible focus, non-color status information, modal focus/escape, zoom/reflow and chart text summaries. The recording does not establish compliance, contrast ratios, screen-reader behavior or mobile usability.

## 8 Functionality to preserve

| Evidence label | Preserve | Boundary |
|---|---|---|
| CODE VERIFIED | Assignment/distribution/transfer/import/source history and legacy lead/customer IDs | Blank lead/client pages and similar-looking lists do not permit replacing business logic |
| VIDEO + CODE VERIFIED | Existing field groups, project selectors, task filters, report date/agent/project filters and observed local actions | Preserve functionality while changing layout; offscreen capabilities remain in the audit |
| CODE VERIFIED | Zong calls/history/provider IDs and reminders/activities | No integration replacement or new paid provider in a UI pass |
| CODE VERIFIED | Inventory hold/unhold/sold semantics, project/unit/sale IDs and nominee/customer documents | Backend transaction proof required before any alteration |
| VIDEO + CODE VERIFIED | Sales forms, transaction/co-agent sections, finance registers and document references | Do not merge finance receipt families, infer balances or rewrite issued documents |
| CODE VERIFIED | Affiliate accounts/leads/activity/inventory/doc/training relationships | Partner login is a boundary; protect private client/owner information |
| VIDEO + CODE VERIFIED | Task statuses, ownership, filters; HR policy/notices/attendance/leave/organization workflows | Preserve deeper comments/checklists/history, payroll/privacy and approval contracts from audit |
| CODE VERIFIED | Numeric permissions, role landing variants, exact legacy paths and standalone print modes | UI visibility is not security; aliases need regression acceptance |
| VIDEO + CODE VERIFIED | Sellmore shell, module search, real icons and truthful Coming soon state | Improve shared content and labels without another independent shell redesign |

## 9 Duplicate, redundant and overlapping workflows

| Evidence label | Overlap | Safe consolidation | What must remain separate |
|---|---|---|---|
| VIDEO + CODE VERIFIED | Teams and Reporting structure both /report-to; breadcrumb remains Reporting structure on Teams | Intentional alias or one clear label and shared route metadata | Do not invent a TeamMembership backend from reporting rows |
| CODE VERIFIED | Users and Employees both /employee in current navigation | Shared directory entry/consistent naming if owner accepts | Authentication/access administration versus private HR profile |
| VIDEO + CODE VERIFIED | Clients blank report versus populated imported Database report | Common table/filter components, clear record purpose | Different URLs/query semantics and future canonical Client identity |
| CODE VERIFIED | Assigned/My/Hot/Virgin/Not-interested/Transfers | Shared queue presentation or approved saved views | Assignment history, qualification/source/transfer actions and scope |
| VIDEO + CODE VERIFIED | Documents/security files, marketing folders and policy attachments | Shared document metadata/browser/preview design | Confidentiality, retention, public publication and private binary permission |
| VIDEO + CODE VERIFIED | Sales Form versus Deal Form and sales Deals/sold inventory | Party/property/amount/line-item display primitives | Sale/document IDs, canonical Deal mapping, petty cash and posted finance |
| VIDEO + CODE VERIFIED | Operations/YouTube/HR/Finance/task overview layouts | One metric/shortcut/chart pattern | Real data sources and template availability; no demo values disguised as facts |
| VIDEO + CODE VERIFIED | Call/lead/daily/import/KPI reports | Shared report toolbar, pinned identity, metric definitions | Formulas, date windows, cohorts, provider evidence and export authorization |
| CODE VERIFIED | Reminders/tasks/activities and future My Day | Unified authorized actionable read view | Original event/task/reminder identity and command authority |
| CODE VERIFIED | Payment plans/legacy receipts/plural receipts/vouchers | Common finance form/table appearance after contract review | API families, posting/allocation/reversal semantics and history |
| VIDEO VERIFIED | Repeated-looking notice text and repeated names in lists | Flag owner review; improve stable-ID display | Never auto-delete/merge on matching text/name |

**CODE VERIFIED:** P4 applies only to reviewed template/legacy candidates such as duplicate dashboard scaffolds after usage and owner review. None of the 37 visited destinations is authorized for retirement by this report.

## 10 UX problem register and shell consistency

| ID | Evidence label | Problem / affected examples | Priority | Proposed reusable response |
|---|---|---|---|---|
| U01 | VIDEO VERIFIED | Four blank route visits with shell absent; back/reload recovery | P0 | Reproduce/capture failures; bounded page error/denied/loading states and persistent recovery |
| U02 | VIDEO + CODE VERIFIED | Cash-like Deal Form headings and wrong-resource source action | P0 | Safe action containment before restyling; explicit resource identity |
| U03 | VIDEO VERIFIED | Horizontal scroll hides task/client/consultant identity on wide tables | P1 | Pinned first identity column, visible overflow affordance, optional columns, row preview |
| U04 | VIDEO VERIFIED | Clipped form selects/date ranges at observed embedded width | P1 | Responsive form/filter grid, readable widths and progressive disclosure |
| U05 | VIDEO + CODE VERIFIED | Global-looking scope selector only dispatches dashboard-count action | P1 | Label actual scope or make page-specific after contract review; never imply tenant switch |
| U06 | VIDEO + CODE VERIFIED | Labels do not match destinations: Projects/Add, Partners/login, Teams/Report To, Notices/CEO Note | P1/P2 | Shared route metadata and vocabulary; explicit collection/create/portal boundaries |
| U07 | VIDEO VERIFIED | Legacy dark table headings, blue pill buttons, red setup/delete buttons and large nested cards conflict with shell | P1/P2 | PageHeader/Button/Table tokens within scoped components |
| U08 | VIDEO + CODE VERIFIED | Inconsistent blank/Loading/No Record Found/zero/chart states | P1/P2 | PageState and ChartPanel distinguish no data, error, unavailable, denied, stale and refresh |
| U09 | VIDEO + CODE VERIFIED | Static Inbox/Operations/YouTube and zero-data chart widgets look like live capabilities | P2/P3 | Honest availability/provenance states; no fake integration claims |
| U10 | VIDEO VERIFIED | KPI badges/colors/abbreviations and repeated totals overload scanning | P2 | MetricTable groups, text labels and metric definitions |
| U11 | VIDEO VERIFIED | Sensitive personal/account information and document references visible | P2 | Permission-aware projections/masking; no unsupported finding of unauthorized access |
| U12 | VIDEO VERIFIED | Numerous Coming soon entries and nested categories require repeated expansion/scroll | P2 | Preserve truthfulness; optional compact discovery area and role-focused frequent work |
| U13 | VIDEO VERIFIED | Some route transitions reveal content at an unexpected scrolled position (documents/analytics) | P2 | Review browser-container/main-scroll ownership and heading restoration; source root cause unproven |
| U14 | VIDEO + CODE VERIFIED | Profile Message leads toward template Chat; partner login uses different visual/context language | P2/P3 | Clear capability and identity boundaries; shared primitives, separate permissions |

**VIDEO + CODE VERIFIED:** The current shell already improves branding, icon consistency, active navigation, primary workspace and future-feature labeling. Its small viewport exposes legacy content constraints; that is evidence to adapt content, not justification to replace the shell. **VIDEO VERIFIED:** no search execution, role/scope change, destructive-action confirmation, narrow/mobile layout, keyboard journey or print preview was demonstrated. These remain acceptance gaps, not proven defects.

## 11 Modernization priorities

| Priority | Evidence label | Work | Release boundary |
|---|---|---|---|
| P0 | VIDEO + CODE VERIFIED | Diagnose four blank route visits; contain Deal Form copied cash actions; retain prior lead-field/login/password/permission risk gates | Explicit implementation approval; no assumed cause or guessed endpoints |
| P1 | VIDEO + CODE VERIFIED | Recover Assigned Leads as first reusable queue; shared table/filter/page states; lead-form contract and core-workflow parity | One pilot plus review, then My Leads/Clients/imports as compatible adapters |
| P2 | VIDEO + CODE VERIFIED | Task/document/report/organization forms and lists; field/action vocabulary; correct chart provenance; finance/HR content consistency | Domain owner and contract checks, separate privacy/financial acceptance |
| P3 | CODE VERIFIED | Operationalize template communications/dashboards and future My Day/360/network/AI only after foundation | Follow authoritative roadmap; no feature build authorized here |
| P4 | CODE VERIFIED | Review redundant/static/possibly unused screens after reachability/usage/business/deep-link evidence | No automatic route or module removal; archive proposal needs separate decision |

## 12 Recommended first modernization work package and sequence

**VIDEO + CODE VERIFIED — recommendation:** First approve **“Assigned Leads recovery and shared list-page pilot,” preceded by the narrow Phase-0A safety checks relevant to the release.** The recording makes Assigned Leads a valuable pilot but its blank visit means a cosmetic redesign alone is not an acceptable first result. P0 Deal Form containment is an independent small safety patch, not a dependency requiring a whole finance redesign.

| Step | Evidence basis | Exact starting files / boundary | Intended outcome and later acceptance (not run now) |
|---|---|---|---|
| 1 Characterize failure | VIDEO + CODE VERIFIED | `src/Components/SalesDashboard/AssignListing.js`, `src/redux/action/AssignLeadsAction.js`, `src/Includes/CrmLayout.js`, `src/App.js`; compare Clients, procurement and asset routes only as needed | Obtain safe error/request/session/permission fixtures; reproduce empty/error/denied/loading/success. Do not guess that missing permissions or a database failure caused the blank screen. |
| 2 Safety containment | CODE VERIFIED | `src/Components/FinanceDashboard/Dealform/ListDealForm.js`; separate Vehicle Pass item in existing Phase-0A package; preserve genuine `PettyCash/ListPettyCash.js` | No wrong-resource cash mutation from Deal Form; retain routes and honest unavailable state until intended contract confirmed. |
| 3 Freeze pilot behavior | CODE VERIFIED | `AssignListing.js`, `AssignLeadsAction.js`, `src/Includes/crmNavigation.js`; existing M03 contract/audit | Inventory search, consultant/project/transfer/date filters, pagination, export, assignment/transfer/activity/call/reminder actions and feature IDs. Preserve supported behavior and legacy IDs. |
| 4 Extract only needed patterns | VIDEO + CODE VERIFIED | Reuse `src/Includes/CrmLayout.css`; proposed component location `src/Components/SellmoreUI/` remains a proposal, no files created | PageHeader, FilterBar, DataTable/Pagination, RowActions, StatusBadge and PageState sufficient for this pilot. Scope styles; do not globally rewrite legacy CSS. |
| 5 Validate and review pilot | CODE VERIFIED | Proposed focused `AssignListing.test.js` and existing `Dashboard.test.js`; staging only where necessary | Preserved filters/page counts/action payloads; stable row identity; no unsafe exports; keyboard/overflow/viewport checks; error recovery and role denial. Human review of one representative screen before expansion. |
| 6 Roll out by adapter | CODE VERIFIED | My Leads, Clients/import report, Tasks, document/organization tables, then finance/HR | Reuse approved patterns with each module's contract. Stop before schema, permission-ID, provider, finance-calculation or route changes unless separately approved. |

**CODE VERIFIED — pilot non-goals:** no new CRM framework, API renaming, tenant migration, Client merge, pipeline/schema replacement, broad dependencies, AI/MLS/new network pages, global persistence rewrite or independent redesign of all modules. No need to re-run a whole repository audit to execute one approved slice.

**CODE VERIFIED — acceptance and rollback proposal:** use a scoped commit/flag or reversible adapter; preserve requests/IDs and established actions. A failed visual pilot can revert its presentation without reverting safe wrong-resource containment. Backend writes need their own reconciliation/repair procedure; frontend rollback is not data rollback. Existing uncommitted work must remain outside that implementation diff unless explicitly approved.

## 13 Backend verification dependencies

| Gate | Required evidence label | Required evidence / why it blocks claims |
|---|---|---|
| Blank pages | REQUIRES BACKEND VERIFICATION | If captured client failures involve API data/auth, obtain sanitized success/error envelopes and session/permission state. Video alone does not locate the fault in frontend or backend. |
| Identity and scope | REQUIRES BACKEND VERIFICATION | Server principal, tenant/company semantics, numeric permission/action/object policy, disabled/revoked users and same/different-tenant negatives. |
| Lead/client form | REQUIRES BACKEND VERIFICATION | Create/read/update contracts, default/null/omitted semantics, assignment/source preservation and actual round trips. |
| Partners | REQUIRES BACKEND VERIFICATION | Affiliate auth/OTP/session contracts, grants, protected-client rules and future commission claims; portal login view proves none. |
| Inventory | REQUIRES BACKEND VERIFICATION | Unit ownership, hold/sold atomicity/idempotency/expiry and authorized transition evidence. |
| Communication | REQUIRES BACKEND VERIFICATION | Zong provider events and recording access; actual email/chat/message providers, delivery and consent rules. |
| Finance | REQUIRES BACKEND VERIFICATION | Intended Deal Form resource, receipt-family distinctions, stable party/account IDs, decimal/rounding, posting/reversal/allocation and reconciliation. |
| Documents | REQUIRES BACKEND VERIFICATION | Private upload/storage/download/print policies, file classification/version/retention and record-level access. |
| HR | REQUIRES BACKEND VERIFICATION | Password-response exclusion, field-level privacy, payroll/attendance/leave semantics, import validation and offboarding revocation. |
| Metrics | REQUIRES BACKEND VERIFICATION | Formula/source/period/timezone/scope/owner/freshness for totals, Today, target percentages, call statuses and charts. |
| Import/export | REQUIRES BACKEND VERIFICATION | Server pagination/filter scope, authorized fields, bounded export, CSV injection protection and ingestion idempotency. |

**CODE VERIFIED:** The existing [backend discovery checklist](SELLMORE_BACKEND_DISCOVERY_CHECKLIST.md) remains the source for requesting repository/schema/routes/middleware/services/jobs/storage/provider/deployment/restore/staging evidence. No backend engine, schema or technical success is inferred from the recording.

## 14 Evidence reconciliation and completion

| Evidence label | Reconciliation |
|---|---|
| VIDEO + CODE VERIFIED | The current nested navigation differs from the older audit description. This report uses the recorded/current registry rather than treating the target 102-destination architecture as an implemented menu. |
| VIDEO + CODE VERIFIED | Sidebar Database report currently targets /list-import-database-leads-report; Clients targets /list-super-database-report. Preserve both mappings; do not use their similar names interchangeably. |
| VIDEO + CODE VERIFIED | Finance Deal Form is a real route with copied cash wiring, but its video result is empty. Source proves the unsafe code path, not an observed deletion. |
| CODE VERIFIED | Vehicle Pass controls are commented in the prior stabilization evidence; it was menu-only here. Do not conflate its reachability with Deal Form. |
| VIDEO + CODE VERIFIED | HR attendance pie source uses literal zero values while a segmented chart appears in the recording; visual rendering/animation cannot prove nonzero workforce metrics. |
| VIDEO VERIFIED | Reload/brief navigation and loading samples do not establish permanent downtime or measured performance. No console/network trace was captured in the video review. |
| CODE VERIFIED | Existing schema/tenant/finance/AI/MLS decisions are unchanged; this is an evidence supplement, not approval of instructions visible in the recording or older attachments. |

**CODE VERIFIED — preservation check:** The start/end SHA-256 comparison confirms that all 16 pre-existing modified/untracked files in the preservation snapshot remain unchanged. Git status confirms this audit is the only newly changed repository path from this task. Document checks cover source links, card count, timestamps and structure only. No application build/test/live request, code fix, schema edit, data migration, push or commit is part of this task.

**Stop:** This audit recommends a future work package only. Await explicit implementation approval.
