import { combineReducers } from "redux";
import { dashCountReducer } from "./dashCountreducer";
import { assignLeadsreducer } from "./assignLeadsreducer";
import { myLeadsreducer } from "./myLeadsreducer";
import { hotLeadsreducer } from "./hotLeadsreducer";
import { inventoriesreducer } from "./inventoriesreducer";
import { SingleInventoriesreducer } from "./SingleInventoriesreducer";
import { ListInventoriesreducer } from "./ListInventoriesreducer";
import { Listformreducer } from "./Listformreducer";
import { Singlemyleadreducers } from "./Singlemyleadreducers";
import { SingleProInventoriesreducer } from "./SingleProInventoriesreducer";
import { NotinterestedOptreducers } from "./NotinterestedOptreducers";
import { Callingreducers } from "./Callingreducers";
import { VirginLeadsreducers } from "./VirginLeadsreducers";
import { Noticeboardreducers } from "./Noticeboardreducers";
import { ReminderLeadsreducers } from "./ReminderLeadsreducers";
import { Activitiesreducers } from "./Activitiesreducers";
import { NotinterestedLeadsreducers } from "./Notinterestedreducers";
import { VideoCatreducers } from "./VideoCatreducers";
import { Educationreducers } from "./Educationreducers";
import { SingleEmpreducers } from "./SingleEmpreducers";
import { Videorequestreducer } from "./Videorequestreducer";
import { SingleVideoreducers } from "./SingleVideoreducers";
import { RoleCategoryreducers } from "./RoleCategoryreducers";
import { ImportLeadreducers } from "./ImportLeadreducers";
import { RoleModulereducers } from "./RoleModulereducers";
import { RolePermissionModulereducers } from "./RolePermissionModulereducers";
import { AffiliateLeadsreducers } from "./AffiliateLeadsreducers";
import { SingleAffiliatereducers } from "./SingleAffiliatereducers";
import { SingleAffiliateActivityreducers } from "./SingleAffiliateActivityreducers";
import { listviewdealsreducers } from "./listviewdealsreducers";
import { TaskManagementreducers } from "./TaskManagementreducers";
import { Attendancereducers } from "./Attendancereducers";
import { SingleAttendancereducers } from "./SingleAttendancereducers";
import { EmployeeRolereducers } from "./EmployeeRolereducers";
import { SingleNoticeboardreducers } from "./SingleNoticeboardreducers";
import { SingleRolePermissionDatareducers } from "./SingleRolePermissionDatareducers";
import { ImportEmployeereducers } from "./ImportEmployeereducers";
import { Permissiondatareducers } from "./Permissiondatareducers";
import { ZoneCallingreducers } from "./ZoneCallingreducers";
import { TransferLeadsreducers } from "./TransferLeadsreducers";
import { SingleAssignLeadsreducers } from "./SingleAssignLeadsreducers";
import { Hremployeereducers } from "./Hremployeereducers";
import { Analyticsreducers } from "./Analyticsreducers";
import { Dailyleadsreportingreducers } from "./Dailyleadsreportingreducers";
import { Superdatabasereducers } from "./Superdatabasereducers";
import { WhatsappActivityReducers } from "./WhatsappActivityReducers";
import { SecurityFilesReducers } from "./SecurityFilesReducers";
import { Payrollreducer } from "./Payrollreducer";
import { Bankreducers } from "./Bankreducers";
import { Stockregreducers } from "./Stockregreducers";
import { Listinventorisfiltersreducers } from "./Listinventorisfiltersreducers";
import { Singleinventoriesoldreducer } from "./Singleinventoriesoldreducer";
import { Pricingreducers } from "./Pricingreducers";
import { AllListingInventoriesreducers } from "./AllListingInventoriesreducers";
import { AllBlockWisePlotreducers } from "./AllBlockWisePlotreducers";
import { AllPlotWiseSizereducers } from "./AllPlotWiseSizereducers";
import { AllPaymentRecieptreducers } from "./AllPaymentRecieptreducers";
import { PaymentPlanreducers } from "./PaymentPlanreducers";
import { AssetListreducers } from "./AssetListreducers";
import { ChequeBookListreducers } from "./ChequeBookListreducers";
import { ChequeOutwardreducers } from "./ChequeOutwardreducers";
import { SecurityFiltersreducers } from "./SecurityFiltersreducers";
import { PostDatedChequereducers } from "./PostDatedChequereducers";
import { ChequeOutwardFiltersreducers } from "./ChequeOutwardFiltersreducers";
import { PostDatedFilterreducers } from "./PostDatedFilterreducers";
import { PaymentVouchereducers } from "./PaymentVouchereducers";
import { Payrecieptsreducers } from "./Payrecieptsreducers";
import { FixedAssetFiltersreducers } from "./FixedAssetFiltersreducers";
import { stockFiltersreducers } from "./stockFiltersreducers";
import { PaymentRecieptfilterreducers } from "./PaymentRecieptfilterreducers";
import { PaymentVoucherReportreducers } from "./PaymentVoucherReportreducers";
import { Salesformreducers } from "./Salesformreducers";
import { Leadstatusreportreducers } from "./Leadstatusreportreducers";
import { CallStatusreportreducers } from "./CallStatusreportreducers";
import { Leadimportdatareducers } from "./Leadimportdatareducers";
import { Kpireducers } from "./Kpireducers";
import { ListStatusReportReducers } from "./ListStatusReportReducers";
import { dashboardListReducers } from "./dashboardListReducers";
import { PettyCashreducers } from "./PettyCashreducers";
import { LeadHistoryreducers } from "./LeadHistoryreducers";
import { Tlwleadreducers } from "./Tlwleadreducers";
import { Findashboardlistreducers } from "./Findashboardlistreducers";
import { Cashinflowreducers } from "./Cashinflowreducers";
import { Bankflowreducers } from "./Bankflowreducers";
import { Employeemanagerreducers } from "./Employeemanagerreducers";
import { Pettycashflowreducers } from "./Pettycashflowreducers";
import { Talktimereducers } from "./Talktimereducers";
import { Bankdepositreducers } from "./Bankdepositreducers";
import { Taskselfreducers } from "./Taskselfreducers";
import { Bankdepositflowreducers } from "./Bankdepositflowreducers";
import { Assetcompanyflowreducers } from "./Assetcompanyflowreducers";
import { Assetdepartmentreducers } from "./Assetdepartmentreducers";
import { Assettypeflowreducers } from "./Assettypeflowreducers";
import { Purchasereqformreducers } from "./Purchasereqformreducers";
import { Assetlocationreducers } from "./Assetlocationreducers";
import { Finbillsreducers } from "./Finbillsreducers";
import { Circularpolicyreducers } from "./Circularpolicyreducers";
import { Complainreducers } from "./Complainreducers";
import { Chartlevelreducers } from "./Chartlevelreducers";
import { Chartlevel2reducers } from "./Chartlevel2reducers";
import { Chartlevel3reducers } from "./Chartlevel3reducers";

import { Dimensionlevel2reducers } from "./Dimensionlevel2reducers";
import { Dimensionlevel3reducers } from "./Dimensionlevel3reducers";
import { Dimensionlevelreducers } from "./Dimensionlevelreducers";

import { Generatemappingreducers } from "./Generatemappingreducers";
import { Billsummaryreducers } from "./Billsummaryreducers";
import { Billduesummaryreducers } from "./Billduesummaryreducers";
import { Vouchertypereducers } from "./Vouchertypereducers";

import { Inventoryfilterdatareducers } from "./Inventoryfilterdatareducers";

import { PayablebillsFilterreducers } from "./PayablebillsFilterreducers";

import { Superdatabasesreducers } from "./Superdatabasesreducers";
import { DocumentfilesReducers } from "./DocumentfilesReducers";

const rootReducer = combineReducers({
  Dimensionlevel2reducers,
  Dimensionlevel3reducers,
  Dimensionlevelreducers,
  dashCountReducer,
  assignLeadsreducer,
  myLeadsreducer,
  hotLeadsreducer,
  inventoriesreducer,
  SingleInventoriesreducer,
  ListInventoriesreducer,
  Listformreducer,
  Singlemyleadreducers,
  SingleProInventoriesreducer,
  NotinterestedOptreducers,
  Callingreducers,
  VirginLeadsreducers,
  Noticeboardreducers,
  ReminderLeadsreducers,
  Activitiesreducers,
  NotinterestedLeadsreducers,
  VideoCatreducers,
  Educationreducers,
  SingleEmpreducers,
  Videorequestreducer,
  SingleVideoreducers,
  RoleCategoryreducers,
  ImportLeadreducers,
  RoleModulereducers,
  RolePermissionModulereducers,
  AffiliateLeadsreducers,
  SingleAffiliatereducers,
  SingleAffiliateActivityreducers,
  listviewdealsreducers,
  TaskManagementreducers,
  Attendancereducers,
  SingleAttendancereducers,
  EmployeeRolereducers,
  SingleNoticeboardreducers,
  SingleRolePermissionDatareducers,
  ImportEmployeereducers,
  Permissiondatareducers,
  ZoneCallingreducers,
  TransferLeadsreducers,
  SingleAssignLeadsreducers,
  Hremployeereducers,
  Analyticsreducers,
  Dailyleadsreportingreducers,
  Superdatabasereducers,
  WhatsappActivityReducers,
  SecurityFilesReducers,
  DocumentfilesReducers,
  Payrollreducer,
  Bankreducers,
  Stockregreducers,
  Listinventorisfiltersreducers,
  Singleinventoriesoldreducer,
  Pricingreducers,
  AllListingInventoriesreducers,
  AllBlockWisePlotreducers,
  AllPlotWiseSizereducers,
  AllPaymentRecieptreducers,
  PaymentPlanreducers,
  AssetListreducers,
  ChequeBookListreducers,
  ChequeOutwardreducers,
  SecurityFiltersreducers,
  PostDatedChequereducers,
  ChequeOutwardFiltersreducers,
  PostDatedFilterreducers,
  PaymentVouchereducers,
  Payrecieptsreducers,
  FixedAssetFiltersreducers,
  stockFiltersreducers,
  PaymentRecieptfilterreducers,
  PaymentVoucherReportreducers,
  Salesformreducers,
  Leadstatusreportreducers,
  CallStatusreportreducers,
  Leadimportdatareducers,
  Kpireducers,
  ListStatusReportReducers,
  dashboardListReducers,
  PettyCashreducers,
  LeadHistoryreducers,
  Tlwleadreducers,
  Findashboardlistreducers,
  Cashinflowreducers,
  Bankflowreducers,
  Employeemanagerreducers,
  Pettycashflowreducers,
  Talktimereducers,
  Bankdepositreducers,
  Taskselfreducers,
  Bankdepositflowreducers,
  Assetcompanyflowreducers,
  Assetdepartmentreducers,
  Assettypeflowreducers,
  Purchasereqformreducers,
  Assetlocationreducers,
  Finbillsreducers,
  Circularpolicyreducers,
  Complainreducers,
  Chartlevelreducers,
  Chartlevel2reducers,
  Chartlevel3reducers,
  Generatemappingreducers,
  Billsummaryreducers,
  Billduesummaryreducers,
  Vouchertypereducers,
  Inventoryfilterdatareducers,
  PayablebillsFilterreducers,
  Superdatabasesreducers,
});

export default rootReducer;
