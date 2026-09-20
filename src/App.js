import React from "react";
// import { useDispatch , useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/SalesDashboard/Dashboard";
import AssignListing from "./Components/SalesDashboard/AssignListing";
import ListNotintersted from "./Components/SalesDashboard/ListNotintersted";
import ListMyLeads from "./Components/SalesDashboard/ListMyLeads";
import ListHotLeads from "./Components/SalesDashboard/ListHotLeads";
import ListVirginLeads from "./Components/SalesDashboard/ListVirginLeads";
import DormentLeads from "./Components/SalesDashboard/DormentLeads";
import ListReminders from "./Components/SalesDashboard/ListReminders";
import ListActivities from "./Components/SalesDashboard/ListActivities";
import ListTransfer from "./Components/SalesDashboard/ListTransfer";
import AddLeads from "./Components/SalesDashboard/AddLeads";
import AddReminders from "./Components/SalesDashboard/AddReminders";
import Login from "./Components/SalesDashboard/Login";

import HrDashboard from "./Components/Hr/HrDashboard";
import FinanceDashboard from "./Components/FinanceDashboard/FinanceDashboard";
import OperationDashboard from "./Components/OperationDashboard/OperationDashboard";
import YoutubeDasboard from "./Components/YoutubeDashboard/YoutubeDasboard";
import Analytics from "./Components/SalesDashboard/Analytics";
import EmailComponent from "./Components/EmailDashboard/EmailComponent";
import Profile from "./Components/UserProfile/Profile";
import Chat from "./Components/ChatDashboard/Chat";

import DashoardSuperAdmin from "./Components/SuperAdmin/Dashoard";
import AddActivity from "./Components/SalesDashboard/AddActivity";

//Hr Modules
import Companies from "./Components/Hr/Companies";
import AddCompanies from "./Components/Hr/AddCompanies";

import Employees from "./Components/Hr/Employees";
import ReportTo from "./Components/Hr/ReportTo";
import AddNewEmployee from "./Components/Hr/AddNewEmployee";

import Leave from "./Components/Hr/Leave";
import AddLeave from "./Components/Hr/AddLeave";
import LeaveType from "./Components/Hr/LeaveType";

import Notice from "./Components/Hr/Notice";
import AddNotice from "./Components/Hr/AddNotice";

import Tranining from "./Components/Hr/Tranining";
import AddNewTraining from "./Components/Hr/AddNewTraining";
import AddTrainingType from "./Components/Hr/AddTrainingType";

import Warning from "./Components/Hr/Warning";
import AddWarning from "./Components/Hr/AddWarning";

import Attendance from "./Components/Hr/Attendance";
import AddAttendance from "./Components/Hr/AddAttendance";

import Branch from "./Components/Hr/Branch";
import AddBranch from "./Components/Hr/AddBranch";

import Departments from "./Components/Hr/Departments";
import AddDepartments from "./Components/Hr/AddDepartments";

import Designations from "./Components/Hr/Designations";
import AddDesignation from "./Components/Hr/AddDesignation";

import Payrolls from "./Components/Hr/Payrolls";
import Setups from "./Components/Hr/Setups";

import Termination from "./Components/Hr/Termination";
import AddTermination from "./Components/Hr/AddTermination";

import JobPost from "./Components/Hr/JobPost";
import AddJobPost from "./Components/Hr/AddJobPost";

import Inventories from "./Components/SalesDashboard/Inventories";
import AddInventories from "./Components/SalesDashboard/Inventories/AddInventories";
import AddProjects from "./Components/SalesDashboard/Inventories/AddProjects";
import ListInventories from "./Components/SalesDashboard/Inventories/ListInventories";

import ProductionDashboard from "./Components/YoutubeDashboard/Production/ProductionDashboard";
import GraphicDashboard from "./Components/YoutubeDashboard/GraphicDesigner/GraphicDashboard";
import ContentwriterDashboard from "./Components/YoutubeDashboard/ContentWriters/ContentwriterDashboard";
import VideoRequest from "./Components/YoutubeDashboard/VideoRequestForm/VideoRequest";

import ImportLeads from "./Components/SalesDashboard/ImportLeads";

import SoldInventories from "./Components/SalesDashboard/Inventories/SoldInventories";

import ViewVideoRequest from "./Components/YoutubeDashboard/VideoRequestForm/ViewVideoRequest";
import SingleVideoReq from "./Components/YoutubeDashboard/VideoRequestForm/SingleVideoReq";

import RoleCategory from "./Components/RolesPermission/RoleCategory";
import CrmModules from "./Components/RolesPermission/CrmModules";
import RolePermission from "./Components/RolesPermission/RolePermission";

import BrokerLogin from "./Components/BrokerAffiliate/BrokerLogin";
import AffiliateRegister from "./Components/BrokerAffiliate/AffiliateRegister";
import AffiliateOtp from "./Components/BrokerAffiliate/AffiliateOtp";
import AffiliateDashboard from "./Components/BrokerAffiliate/AffiliateDashboard";
import AffliateLeadsAdd from "./Components/BrokerAffiliate/AffliateLeadsAdd";
import ViewAffiliateLeads from "./Components/BrokerAffiliate/ViewAffiliateLeads";
import AffiliateActivity from "./Components/BrokerAffiliate/AffiliateActivity";
import AffiliateDocument from "./Components/BrokerAffiliate/AffiliateDocument";
import AffiliateTraining from "./Components/BrokerAffiliate/AffiliateTraining";
import CustomizePermission from "./Components/RolesPermission/CustomizePermission";
import ModuleSetup from "./Components/RolesPermission/ModuleSetup";
import ResetPassword from "./Components/UserProfile/ResetPassword";
import ForgotPassword from "./Components/UserProfile/ForgotPassword";

import ListViewDeals from "./Components/SalesDashboard/ListViewDeals";
import ViewDealDone from "./Components/SalesDashboard/ViewDealDone";
import AddFileRequest from "./Components/SalesDashboard/AddFileRequest";

import TaskDashboard from "./Components/TaskManagement/TaskDashboard";

import AddTask from "./Components/TaskManagement/AddTask";
import TaskDetails from "./Components/TaskManagement/TaskDetails";

// import { EmployeeRolesAction } from './redux/action/EmployeeRolesAction';
import ZongCallingData from "./Components/SalesDashboard/ZongCallingData";

import FacebookLeadData from "./Components/SalesDashboard/FacebookLeadData";
import ListStatusReport from "./Components/SalesDashboard/ListStatusReport";
import DailyLeadsReporting from "./Components/SalesDashboard/DailyLeadsReporting";
import ListSuperDatabaseReport from "./Components/SalesDashboard/ListSuperDatabaseReport";

import InventoriesAffiliates from "./Components/BrokerAffiliate/AffiliateInventories/InventoriesAffiliates";
import ListInventoriesaffiliates from "./Components/BrokerAffiliate/AffiliateInventories/ListInventoriesaffiliates";

import NewAddEmployee from "./Components/Hr/NewAddEmployee";

import ListWhatsappActivity from "./Components/SalesDashboard/ListWhatsappActivity";

import EmployeeShift from "./Components/Hr/EmployeeShift";
import AddEmployeeShift from "./Components/Hr/AddEmployeeShift";

import Holiday from "./Components/Hr/Holiday";

import SecurityFiles from "./Components/FinanceDashboard/SecurityFiles";
import AddSecurityFiles from "./Components/FinanceDashboard/AddSecurityFiles";
import BankAccounts from "./Components/FinanceDashboard/BankAccounts";
import AddBankAccount from "./Components/FinanceDashboard/AddBankAccount";

import Allocation from "./Components/FinanceDashboard/Print/Allocation";
import BookingForm from "./Components/FinanceDashboard/Print/BookingForm";
import Confirmation from "./Components/FinanceDashboard/Print/Confirmation";
import ProvisionalAllotment from "./Components/FinanceDashboard/Print/ProvisionalAllotment";

import StockInWordReg from "./Components/FinanceDashboard/StockInWordReg";

// import { requestForToken,onMessageListener } from './firebase';
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { onMessageListener } from "./firebase";
import StockRegister from "./Components/FinanceDashboard/StockRegister";
import StockOutWord from "./Components/FinanceDashboard/StockOutWord";
import StockCancelRegister from "./Components/FinanceDashboard/StockCancelRegister";
import SecurityFilesReport from "./Components/FinanceDashboard/SecurityFilesReport";
import RealEstatePricing from "./Components/WebsiteMaterial/RealEstatePricing";
import AddNewPricing from "./Components/WebsiteMaterial/AddNewPricing";
import PaymentReciept from "./Components/FinanceDashboard/PaymentReciept";
import NewPaymentReciept from "./Components/FinanceDashboard/NewPaymentReciept";
import PaymentPlanGenerate from "./Components/FinanceDashboard/PaymentPlanGenerate";
import AddNewPaymentPlan from "./Components/FinanceDashboard/AddNewPaymentPlan";
import PaymentStatement from "./Components/FinanceDashboard/PaymentStatement";
import RedboxMaterial from "./Components/MarketingMaterial/RedboxMaterial";
import AlbarshaDeveloperMaterial from "./Components/MarketingMaterial/AlbarshaDeveloperMaterial";
import PaymentScheduleMaterial from "./Components/MarketingMaterial/PaymentScheduleMaterial";
import PaymentPlan from "./Components/FinanceDashboard/PaymentPlan";
import FixedAssetRegister from "./Components/FinanceDashboard/AssetRegister/FixedAssetRegister";
import AddNewAsset from "./Components/FinanceDashboard/AssetRegister/AddNewAsset";
import AddNewChequeBook from "./Components/FinanceDashboard/ChequeBook/AddNewChequeBook";
import ChequeBookList from "./Components/FinanceDashboard/ChequeBook/ChequeBookList";
import AddChequeOutwardRegister from "./Components/FinanceDashboard/ChequeOutwardRegister/AddChequeOutwardRegister";
import ChequeOutWardList from "./Components/FinanceDashboard/ChequeOutwardRegister/ChequeOutWardList";
import ListPostDatedCheque from "./Components/FinanceDashboard/PostDatedCheque/ListPostDatedCheque";
import AddPostDatedCheque from "./Components/FinanceDashboard/PostDatedCheque/AddPostDatedCheque";
import ReportChequeOutward from "./Components/FinanceDashboard/ChequeOutwardRegister/ReportChequeOutward";
import ReportPostDatedCheque from "./Components/FinanceDashboard/PostDatedCheque/ReportPostDatedCheque";
import ListPaymentVoucher from "./Components/FinanceDashboard/PaymentVoucher/ListPaymentVoucher";
import AddNewPaymentVoucher from "./Components/FinanceDashboard/PaymentVoucher/AddNewPaymentVoucher";
import SecurityPrint from "./Components/FinanceDashboard/Print/SecurityPrint";
import { PaymentVoucherAction } from "./redux/action/PaymentVoucherAction";
import PaymentVoucher from "./Components/FinanceDashboard/Print/PaymentVoucher";
import ViewPaymentRecieptPrint from "./Components/FinanceDashboard/ViewPaymentRecieptPrint";
import ListPaymentReciepts from "./Components/FinanceDashboard/PaymentReciepts/ListPaymentReciepts";
import AddNewPaymentReciepts from "./Components/FinanceDashboard/PaymentReciepts/AddNewPaymentReciepts";
import PrintPaymentReciepts from "./Components/FinanceDashboard/PaymentReciepts/PrintPaymentReciepts";
import TestImportLeads from "./Components/SalesDashboard/TestImportLeads";
import StockReports from "./Components/FinanceDashboard/StockReports";
import FixedAssetReport from "./Components/FinanceDashboard/FixedAssetReport";
import ReportPaymentReciept from "./Components/FinanceDashboard/PaymentReciepts/ReportPaymentReciept";
import PaymentVoucherReport from "./Components/FinanceDashboard/PaymentVoucher/PaymentVoucherReport";
import City108doc from "./Components/BrokerAffiliate/DocumentData/City108doc";
import GreenLandfarmhouse from "./Components/BrokerAffiliate/DocumentData/GreenLandfarmhouse";
import AlbarshaFarmhousedoc from "./Components/BrokerAffiliate/DocumentData/AlbarshaFarmhousedoc";
import YsiMallResdoc from "./Components/BrokerAffiliate/DocumentData/YsiMallResdoc";
import AlbarshaCitydoc from "./Components/BrokerAffiliate/DocumentData/AlbarshaCitydoc";
import RedsimHillsdoc from "./Components/BrokerAffiliate/DocumentData/RedsimHillsdoc";
import MarketingDocuments from "./Components/BrokerAffiliate/MarketingDocuments";
import ListSalesForm from "./Components/FinanceDashboard/SalesForm/ListSalesForm";
import AddSalesForm from "./Components/FinanceDashboard/SalesForm/AddSalesForm";
import PrintSaleForm from "./Components/FinanceDashboard/SalesForm/PrintSaleForm";
import LeadStatusReport from "./Components/SalesDashboard/LeadStatusReport";
import SignUp from "./Components/UserProfile/SignUp";
import AddProperty from "./Components/Properties/AddProperty";
import LeadImportList from "./Components/SalesDashboard/LeadImportList";
import KpiReports from "./Components/SalesDashboard/KpiReports";
import Jauharat from "./Components/BrokerAffiliate/DocumentData/Jauharat";
import Sq10 from "./Components/BrokerAffiliate/DocumentData/Sq10";
import AddNewReportTo from "./Components/Hr/AddNewReportTo";
import ListPettyCash from "./Components/FinanceDashboard/PettyCash/ListPettyCash";
import AddPettyCash from "./Components/FinanceDashboard/PettyCash/AddPettyCash";
import LeadHistory from "./Components/SalesDashboard/LeadHistory";
import PrintPettyCash from "./Components/FinanceDashboard/PettyCash/PrintPettyCash";
import PettyVoucherPrint from "./Components/FinanceDashboard/PettyCash/PettyVoucherPrint";
import TotalLeadWorkHistory from "./Components/SalesDashboard/TotalLeadWorkHistory";
import OutwardVoucherPrint from "./Components/FinanceDashboard/ChequeOutwardRegister/OutwardVoucherPrint";
import KpiGraphs from "./Components/SalesDashboard/KpiGraphs";
import Talktimehistory from "./Components/SalesDashboard/Talktimehistory";
import AddBankDeposit from "./Components/FinanceDashboard/BankDeposit/AddBankDeposit";
import ListBankDeposit from "./Components/FinanceDashboard/BankDeposit/ListBankDeposit";
import PrintDeposit from "./Components/FinanceDashboard/BankDeposit/PrintDeposit";
import DepositVoucherPrint from "./Components/FinanceDashboard/BankDeposit/DepositVoucherPrint";
import ListPurchaseRequest from "./Components/FinanceDashboard/PurchaseRequestForm/ListPurchaseRequest";
import AddPurchaseRequest from "./Components/FinanceDashboard/PurchaseRequestForm/AddPurchaseRequest";
import PurchasePrintVoucher from "./Components/FinanceDashboard/PurchaseRequestForm/PurchasePrintVoucher";
import Circularpolicylist from "./Components/Hr/CircularPolicy/Circularpolicylist";
import AddCircularPolicy from "./Components/Hr/CircularPolicy/AddCircularPolicy";
import UtilsbillsList from "./Components/FinanceDashboard/UtilsBills/UtilsbillsList";
import AddNewUtilsBills from "./Components/FinanceDashboard/UtilsBills/AddNewUtilsBills";
import GenerateGatePass from "./Components/FinanceDashboard/AssetRegister/GenerateGatePass";
import PrintGatePass from "./Components/FinanceDashboard/AssetRegister/PrintGatePass";
import AddGatePass from "./Components/FinanceDashboard/VehcilePass/AddVehcilePass";
import AddVehcilePass from "./Components/FinanceDashboard/VehcilePass/AddVehcilePass";
import ListVehcilePass from "./Components/FinanceDashboard/VehcilePass/ListVehcilePass";
import Complainmanagementlist from "./Components/Hr/ComplainManagement/Complainmanagementlist";
import AddComplainManagement from "./Components/Hr/ComplainManagement/AddComplainManagement";
import ListLevel1 from "./Components/FinanceDashboard/ChartofAccount/Level1/ListLevel1";
import AddNewLevel1 from "./Components/FinanceDashboard/ChartofAccount/Level1/AddNewLevel1";
import ListLevel2 from "./Components/FinanceDashboard/ChartofAccount/Level2/ListLevel2";
import AddNewLevel2 from "./Components/FinanceDashboard/ChartofAccount/Level2/AddNewLevel2";
import AddNewLevel3 from "./Components/FinanceDashboard/ChartofAccount/Level3/AddNewLevel3";
import ListLevel3 from "./Components/FinanceDashboard/ChartofAccount/Level3/ListLevel3";
import ListDimensionLevel1 from "./Components/FinanceDashboard/Dimension/Level1/ListDimensionLevel1";
import AddNewDimensionLevel1 from "./Components/FinanceDashboard/Dimension/Level1/AddNewDimensionLevel1";
import AddNewDimensionLevel2 from "./Components/FinanceDashboard/Dimension/Level2/AddNewDimensionLevel2";
import ListDimensionLevel2 from "./Components/FinanceDashboard/Dimension/Level2/ListDimensionLevel2";
import AddNewDimensionLevel3 from "./Components/FinanceDashboard/Dimension/Level3/AddNewDimensionLevel3";
import ListDimensionLevel3 from "./Components/FinanceDashboard/Dimension/Level3/ListDimensionLevel3";
import Generatemapping from "./Components/FinanceDashboard/GlMapping/Generatemapping";
import AddNewMapping from "./Components/FinanceDashboard/GlMapping/AddNewMapping";
import ListManualvoucher from "./Components/FinanceDashboard/ManualVoucher/ListManualvoucher";
import AddManualvoucher from "./Components/FinanceDashboard/ManualVoucher/AddManualvoucher";
import VoucherTypeList from "./Components/FinanceDashboard/VoucherType/VoucherTypeList";
import AddNewVoucherType from "./Components/FinanceDashboard/VoucherType/AddNewVoucherType";
import Selfleads from "./Components/SalesDashboard/Selfleads";
import Datadrive from "./Components/SalesDashboard/Datadrive";
import Paragontower from "./Components/BrokerAffiliate/DocumentData/Paragontower";
import Alitown from "./Components/BrokerAffiliate/DocumentData/Alitown";
import ListDealForm from "./Components/FinanceDashboard/Dealform/ListDealForm";
import AddDealForm from "./Components/FinanceDashboard/Dealform/AddDealForm";
import ReportUtilsbills from "./Components/FinanceDashboard/UtilsBills/ReportUtilsbills";
import Listsuperdatabasereports from "./Components/SalesDashboard/Listsuperdatabasereports";
import Ninthavenue from "./Components/BrokerAffiliate/DocumentData/Ninthavenue";
import Signature27 from "./Components/BrokerAffiliate/DocumentData/Signature27";
import Lakhaniblessing from "./Components/BrokerAffiliate/DocumentData/Lakhaniblessing";
import Lakhanivista from "./Components/BrokerAffiliate/DocumentData/Lakhanivista";
import Ocean99 from "./Components/BrokerAffiliate/DocumentData/Ocean99";
import Callinganalytics from "./Components/SalesDashboard/Callinganalytics";
import Listimportleads from "./Components/SalesDashboard/Listimportleads";
import Listdocuments from "./Components/FinanceDashboard/Listdocuments";
import Addlistdocuments from "./Components/FinanceDashboard/Addlistdocuments";

const App = () => {
  // const dispatch = useDispatch();
  // const resultRole = useSelector(state => state.EmployeeRolereducers.employeeroledata);
  // const [setmyDtaa,myDtaa]=useState('');
  // console.log("DashboarDRole",resultRole);
  const [notification, setNotification] = useState({ title: "", body: "" });

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));
  // alert(notification);
  // console.log("notification",notification);

  // const AuthData = JSON.parse(localStorage.getItem('authdata'));

  useEffect(() => {
    // const AuthDatas = JSON.parse(localStorage.getItem('authdata'));
    // dispatch(EmployeeRolesAction(AuthDatas.id));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="list-assign-leads" element={<AssignListing />} />
          <Route
            path="list-whatsapp-activity"
            element={<ListWhatsappActivity />}
          />
          <Route
            path="list-notinterested-leads"
            element={<ListNotintersted />}
          />
          <Route path="list-my-leads" element={<ListMyLeads />} />
          <Route path="list-hot-leads" element={<ListHotLeads />} />
          <Route path="list-virgin-leads" element={<ListVirginLeads />} />
          <Route path="list-dorment-leads" element={<DormentLeads />} />
          <Route path="list-reminders" element={<ListReminders />} />
          <Route path="list-activities" element={<ListActivities />} />
          <Route path="list-transfer-leads" element={<ListTransfer />} />
          <Route path="add-lead/:id" exact element={<AddLeads />} />
          <Route path="add-lead" exact element={<AddLeads />} />

          <Route path="add-property" exact element={<AddProperty />} />

          <Route path="add-reminder/:id" exact element={<AddReminders />} />
          <Route
            path="add-reminder/:id/:cid"
            exact
            element={<AddReminders />}
          />
          <Route path="activities/:id/:cid" exact element={<AddActivity />} />
          <Route path="hr" exact element={<HrDashboard />} />
          <Route path="finance" exact element={<FinanceDashboard />} />

          <Route path="security-files" exact element={<SecurityFiles />} />
          <Route
            path="add-security-files"
            exact
            element={<AddSecurityFiles />}
          />
          <Route
            path="add-security-files/:id"
            exact
            element={<AddSecurityFiles />}
          />
          <Route
            path="security-files-report"
            exact
            element={<SecurityFilesReport />}
          />

          <Route path="list-view-documents" exact element={<Listdocuments />} />
          <Route
            path="add-documents-files"
            exact
            element={<Addlistdocuments />}
          />
          <Route
            path="add-documents-files/:id"
            exact
            element={<Addlistdocuments />}
          />

          <Route
            path="fixed-asset-register"
            exact
            element={<FixedAssetRegister />}
          />
          <Route path="add-new-asset" exact element={<AddNewAsset />} />
          <Route path="add-new-asset/:id" exact element={<AddNewAsset />} />
          <Route path="asset-report" exact element={<FixedAssetReport />} />
          <Route
            path="generate-gate-pass/:id"
            exact
            element={<GenerateGatePass />}
          />
          <Route
            path="generate-gate-pass-print/:id"
            exact
            element={<PrintGatePass />}
          />

          <Route path="vehcile-pass" exact element={<ListVehcilePass />} />
          <Route
            path="add-new-vehcile-pass"
            exact
            element={<AddVehcilePass />}
          />

          <Route path="list-cheque-book" exact element={<ChequeBookList />} />
          <Route
            path="add-new-cheque-book"
            exact
            element={<AddNewChequeBook />}
          />
          <Route
            path="add-new-cheque-book/:id"
            exact
            element={<AddNewChequeBook />}
          />

          <Route path="bills-list" exact element={<UtilsbillsList />} />
          <Route path="add-new-bills" exact element={<AddNewUtilsBills />} />
          <Route
            path="add-new-bills/:id"
            exact
            element={<AddNewUtilsBills />}
          />
          <Route path="bills-reports" exact element={<ReportUtilsbills />} />

          <Route
            path="list-cheque-outward-register"
            exact
            element={<ChequeOutWardList />}
          />
          <Route
            path="report-cheque-outward-register"
            exact
            element={<ReportChequeOutward />}
          />
          <Route
            path="add-cheque-outward-register"
            exact
            element={<AddChequeOutwardRegister />}
          />
          <Route
            path="add-cheque-outward-register/:id"
            exact
            element={<AddChequeOutwardRegister />}
          />
          <Route
            path="cheque-outward-voucher/:id"
            exact
            element={<OutwardVoucherPrint />}
          />

          <Route path="booking-form/:id" exact element={<BookingForm />} />
          <Route path="allocation/:id" exact element={<Allocation />} />
          <Route path="confirmation/:id" exact element={<Confirmation />} />
          <Route
            path="provisional-allotment/:id"
            exact
            element={<ProvisionalAllotment />}
          />

          <Route
            path="booking-form/customer/:id/:vid"
            exact
            element={<BookingForm />}
          />
          <Route
            path="allocation/customer/:id/:vid"
            exact
            element={<Allocation />}
          />
          <Route
            path="confirmation/customer/:id/:vid"
            exact
            element={<Confirmation />}
          />
          <Route
            path="provisional-allotment/customer/:id/:vid"
            exact
            element={<ProvisionalAllotment />}
          />

          <Route path="bank-list" exact element={<BankAccounts />} />
          <Route path="add-bank-list" exact element={<AddBankAccount />} />
          <Route path="add-bank-list/:id" exact element={<AddBankAccount />} />

          <Route path="stock-list" exact element={<StockRegister />} />
          <Route
            path="stock-inword-register"
            exact
            element={<StockInWordReg />}
          />
          <Route
            path="stock-inword-register/:id"
            exact
            element={<StockInWordReg />}
          />

          <Route
            path="stock-outword-register"
            exact
            element={<StockOutWord />}
          />
          <Route
            path="stock-cancel-register"
            exact
            element={<StockCancelRegister />}
          />
          <Route path="stock-reports" exact element={<StockReports />} />

          <Route path="operation" exact element={<OperationDashboard />} />
          <Route path="youtube" exact element={<YoutubeDasboard />} />
          <Route path="analytics" exact element={<Analytics />} />
          <Route
            path="calling-analytics"
            exact
            element={<Callinganalytics />}
          />

          <Route path="inbox" exact element={<EmailComponent />} />
          <Route path="profile" exact element={<Profile />} />
          <Route path="chat" exact element={<Chat />} />

          <Route path="inventories" exact element={<Inventories />} />
          <Route
            path="affiliates/inventories"
            exact
            element={<InventoriesAffiliates />}
          />

          <Route path="add-inventories" exact element={<AddInventories />} />

          <Route path="add-projects" exact element={<AddProjects />} />
          <Route path="add-projects/:id" exact element={<AddProjects />} />

          <Route path="list-inventories" exact element={<ListInventories />} />
          <Route
            path="list-inventories/:id"
            exact
            element={<ListInventories />}
          />

          <Route
            path="affiliates/list-inventories"
            exact
            element={<ListInventoriesaffiliates />}
          />
          <Route
            path="affiliates/list-inventories/:id"
            exact
            element={<ListInventoriesaffiliates />}
          />

          <Route path="import-leads" exact element={<ImportLeads />} />
          <Route path="list-import-leads" exact element={<Listimportleads />} />
          <Route path="data-drive" exact element={<Datadrive />} />

          <Route path="production" exact element={<ProductionDashboard />} />
          <Route path="graphic-designer" exact element={<GraphicDashboard />} />
          <Route
            path="content-writer"
            exact
            element={<ContentwriterDashboard />}
          />
          <Route path="video-request-form" exact element={<VideoRequest />} />
          <Route
            path="view-video-request"
            exact
            element={<ViewVideoRequest />}
          />
          <Route
            path="view-video-request/:id"
            exact
            element={<SingleVideoReq />}
          />

          {/* Hr Modules Routes */}

          <Route path="company" exact element={<Companies />} />
          <Route path="add-companies" exact element={<AddCompanies />} />
          <Route path="add-companies/:id" exact element={<AddCompanies />} />

          <Route path="employee" exact element={<Employees />} />
          <Route path="add-new-employee" exact element={<AddNewEmployee />} />
          <Route
            path="add-new-employee/:id"
            exact
            element={<AddNewEmployee />}
          />

          <Route path="report-to" exact element={<ReportTo />} />
          <Route path="add-new-report-to" exact element={<AddNewReportTo />} />
          <Route
            path="add-new-report-to/:id"
            exact
            element={<AddNewReportTo />}
          />

          <Route path="add-new-employees" exact element={<NewAddEmployee />} />
          <Route
            path="add-new-employees/:id"
            exact
            element={<NewAddEmployee />}
          />

          <Route path="leave" exact element={<Leave />} />
          <Route path="add-leave-request" exact element={<AddLeave />} />
          <Route path="add-leave-request/:id" exact element={<AddLeave />} />
          <Route path="leave-type" exact element={<LeaveType />} />
          <Route path="leave-type/:id" exact element={<LeaveType />} />

          <Route path="training" exact element={<Tranining />} />
          <Route path="add-new-training" exact element={<AddNewTraining />} />
          <Route
            path="add-new-training/:id"
            exact
            element={<AddNewTraining />}
          />

          <Route path="add-training-type" exact element={<AddTrainingType />} />
          <Route
            path="add-training-type/:id"
            exact
            element={<AddTrainingType />}
          />

          <Route path="notice" exact element={<Notice />} />
          <Route path="add-new-notice" exact element={<AddNotice />} />
          <Route path="add-new-notice/:id" exact element={<AddNotice />} />

          <Route path="warning" exact element={<Warning />} />
          <Route path="add-new-warning" exact element={<AddWarning />} />
          <Route path="add-new-warning/:id" exact element={<AddWarning />} />

          <Route path="attendance" exact element={<Attendance />} />
          <Route path="add-attendance" exact element={<AddAttendance />} />
          <Route path="add-attendance/:id" exact element={<AddAttendance />} />

          <Route path="branch" exact element={<Branch />} />
          <Route path="add-branch" exact element={<AddBranch />} />
          <Route path="add-branch/:id" exact element={<AddBranch />} />

          <Route path="department" exact element={<Departments />} />
          <Route path="add-department" exact element={<AddDepartments />} />
          <Route path="add-department/:id" exact element={<AddDepartments />} />

          <Route path="employee-shift" exact element={<EmployeeShift />} />
          <Route
            path="add-employee-shift"
            exact
            element={<AddEmployeeShift />}
          />
          <Route
            path="add-employee-shift/:id"
            exact
            element={<AddEmployeeShift />}
          />

          <Route
            path="circular-policy"
            exact
            element={<Circularpolicylist />}
          />
          <Route
            path="add-circular-policy"
            exact
            element={<AddCircularPolicy />}
          />
          <Route
            path="add-circular-policy/:id"
            exact
            element={<AddCircularPolicy />}
          />

          <Route
            path="complain-management"
            exact
            element={<Complainmanagementlist />}
          />
          <Route
            path="add-new-complain"
            exact
            element={<AddComplainManagement />}
          />
          <Route
            path="add-new-complain/:id"
            exact
            element={<AddComplainManagement />}
          />

          <Route path="holiday" exact element={<Holiday />} />
          <Route path="holiday/:id" exact element={<Holiday />} />

          <Route path="designation" exact element={<Designations />} />
          <Route path="add-designation" exact element={<AddDesignation />} />
          <Route
            path="add-designation/:id"
            exact
            element={<AddDesignation />}
          />

          <Route path="payroll" exact element={<Payrolls />} />
          <Route path="setups" exact element={<Setups />} />

          <Route path="termination" exact element={<Termination />} />
          <Route path="add-termination" exact element={<AddTermination />} />
          <Route
            path="add-termination/:id"
            exact
            element={<AddTermination />}
          />

          <Route path="job-post" exact element={<JobPost />} />
          <Route path="add-job-post" exact element={<AddJobPost />} />
          <Route path="add-job-post/:id" exact element={<AddJobPost />} />
          <Route
            path="lead-activity/:invid/:custId/:proId"
            exact
            element={<SoldInventories />}
          />
          <Route
            path="affiliates/lead-activity/:invid/:custId/:proId/:affiliatestatus"
            exact
            element={<SoldInventories />}
          />
          <Route path="role-category" exact element={<RoleCategory />} />
          <Route path="role-category/:id" exact element={<RoleCategory />} />

          <Route path="crm-modules" exact element={<CrmModules />} />
          <Route path="crm-modules/:id" exact element={<CrmModules />} />
          <Route path="role-permission" exact element={<RolePermission />} />
          <Route
            path="customize-permission"
            exact
            element={<CustomizePermission />}
          />
          <Route path="module-setup" exact element={<ModuleSetup />} />

          <Route path="list-view-deals" exact element={<ListViewDeals />} />
          <Route
            path="affiliates/list-view-deals"
            exact
            element={<ListViewDeals />}
          />
          <Route path="sales-view-form/:id" exact element={<ViewDealDone />} />
          <Route
            path="add-file-request/:id"
            exact
            element={<AddFileRequest />}
          />

          <Route path="task-management" exact element={<TaskDashboard />} />
          <Route path="add-task" exact element={<AddTask />} />
          <Route path="task/:id" exact element={<TaskDetails />} />

          <Route path="reset/:id" exact element={<ResetPassword />} />
          <Route path="forgot-password" exact element={<ForgotPassword />} />

          <Route
            path="/admin/dashboard"
            exact
            element={<DashoardSuperAdmin />}
          />

          <Route path="affiliate-program" exact element={<BrokerLogin />} />
          <Route
            path="affiliate-register"
            exact
            element={<AffiliateRegister />}
          />
          <Route path="affiliate-otp" exact element={<AffiliateOtp />} />
          <Route
            path="affiliate-dashboard"
            exact
            element={<AffiliateDashboard />}
          />
          <Route path="affiliate-leads" exact element={<AffliateLeadsAdd />} />
          <Route
            path="view-affiliate-leads/:id"
            exact
            element={<ViewAffiliateLeads />}
          />
          <Route
            path="affiliate-activity/:id"
            exact
            element={<AffiliateActivity />}
          />
          <Route
            path="affiliate-document"
            exact
            element={<AffiliateDocument />}
          />
          <Route
            path="marketing-document"
            exact
            element={<MarketingDocuments />}
          />
          <Route path="document/city-108/:id" exact element={<City108doc />} />
          <Route
            path="document/green-land-farmhouse/:id"
            exact
            element={<GreenLandfarmhouse />}
          />
          <Route path="document/jauharat/:id" exact element={<Jauharat />} />
          <Route path="document/sq10/:id" exact element={<Sq10 />} />
          <Route
            path="document/paragontower/:id"
            exact
            element={<Paragontower />}
          />
          <Route path="document/alitown/:id" exact element={<Alitown />} />
          <Route
            path="document/ninthavenue/:id"
            exact
            element={<Ninthavenue />}
          />
          <Route
            path="document/signature27/:id"
            exact
            element={<Signature27 />}
          />
          <Route
            path="document/lakhaniblessing/:id"
            exact
            element={<Lakhaniblessing />}
          />
          <Route
            path="document/lakhanivista/:id"
            exact
            element={<Lakhanivista />}
          />
          <Route path="document/ocean99/:id" exact element={<Ocean99 />} />

          <Route
            path="document/albarsha-city/:id"
            exact
            element={<AlbarshaCitydoc />}
          />
          <Route
            path="document/ysi-mall-residency/:id"
            exact
            element={<YsiMallResdoc />}
          />
          <Route
            path="document/albarsha-farmhouse/:id"
            exact
            element={<AlbarshaFarmhousedoc />}
          />
          <Route
            path="document/redsim-hills/:id"
            exact
            element={<RedsimHillsdoc />}
          />

          <Route
            path="affiliate-training"
            exact
            element={<AffiliateTraining />}
          />

          <Route path="list-view-calling" exact element={<ZongCallingData />} />
          <Route
            path="list-view-facebook"
            exact
            element={<FacebookLeadData />}
          />
          <Route
            path="list-status-report"
            exact
            element={<ListStatusReport />}
          />
          <Route
            path="leads-status-report"
            exact
            element={<LeadStatusReport />}
          />

          <Route
            path="list-daily-leads-report"
            exact
            element={<DailyLeadsReporting />}
          />
          <Route
            path="list-super-database-report"
            exact
            element={<ListSuperDatabaseReport />}
          />
          <Route
            path="list-super-database-reports"
            exact
            element={<Listsuperdatabasereports />}
          />
          <Route path="list-self-leads" exact element={<Selfleads />} />

          <Route
            path="list-import-database-leads-report"
            exact
            element={<LeadImportList />}
          />
          <Route path="list-kpis-report" exact element={<KpiReports />} />
          <Route path="kpis-graphs" exact element={<KpiGraphs />} />

          <Route
            path="real-estate-pricing"
            exact
            element={<RealEstatePricing />}
          />
          <Route path="add-new-pricing" exact element={<AddNewPricing />} />
          <Route path="add-new-pricing/:id" exact element={<AddNewPricing />} />

          <Route path="payment-reciept" exact element={<PaymentReciept />} />
          <Route
            path="add-new-payment-reciept"
            exact
            element={<NewPaymentReciept />}
          />
          <Route
            path="add-new-payment-reciept/:id"
            exact
            element={<NewPaymentReciept />}
          />
          <Route
            path="add-new-payment-reciept/:id/:sid"
            exact
            element={<NewPaymentReciept />}
          />
          <Route
            path="payment-reciept/plan/:id"
            exact
            element={<PaymentPlanGenerate />}
          />

          <Route
            path="add-new-payment-plan"
            exact
            element={<AddNewPaymentPlan />}
          />
          <Route
            path="payment-statement"
            exact
            element={<PaymentStatement />}
          />
          <Route
            path="payment-statement/:id"
            exact
            element={<PaymentStatement />}
          />
          <Route path="payment-plan" exact element={<PaymentPlan />} />
          <Route
            path="view-payment-reciept/:id/:sid"
            exact
            element={<ViewPaymentRecieptPrint />}
          />

          <Route
            path="chart-of-account-level-1"
            exact
            element={<ListLevel1 />}
          />
          <Route
            path="add-chart-of-account-level-1"
            exact
            element={<AddNewLevel1 />}
          />
          <Route
            path="add-chart-of-account-level-1/:id"
            exact
            element={<AddNewLevel1 />}
          />

          <Route
            path="chart-of-account-level-2"
            exact
            element={<ListLevel2 />}
          />
          <Route
            path="add-chart-of-account-level-2"
            exact
            element={<AddNewLevel2 />}
          />
          <Route
            path="add-chart-of-account-level-2/:id"
            exact
            element={<AddNewLevel2 />}
          />

          <Route
            path="chart-of-account-level-3"
            exact
            element={<ListLevel3 />}
          />
          <Route
            path="add-chart-of-account-level-3"
            exact
            element={<AddNewLevel3 />}
          />
          <Route
            path="add-chart-of-account-level-3/:id"
            exact
            element={<AddNewLevel3 />}
          />

          <Route
            path="dimension-code-level-1"
            exact
            element={<ListDimensionLevel1 />}
          />
          <Route
            path="add-dimension-level-1"
            exact
            element={<AddNewDimensionLevel1 />}
          />
          <Route
            path="add-dimension-level-1/:id"
            exact
            element={<AddNewDimensionLevel1 />}
          />

          <Route
            path="dimension-code-level-2"
            exact
            element={<ListDimensionLevel2 />}
          />
          <Route
            path="add-dimension-level-2"
            exact
            element={<AddNewDimensionLevel2 />}
          />
          <Route
            path="add-dimension-level-2/:id"
            exact
            element={<AddNewDimensionLevel2 />}
          />

          <Route
            path="dimension-code-level-3"
            exact
            element={<ListDimensionLevel3 />}
          />
          <Route
            path="add-dimension-level-3"
            exact
            element={<AddNewDimensionLevel3 />}
          />
          <Route
            path="add-dimension-level-3/:id"
            exact
            element={<AddNewDimensionLevel3 />}
          />

          <Route path="voucher-type" exact element={<VoucherTypeList />} />
          <Route
            path="add-new-voucher-type"
            exact
            element={<AddNewVoucherType />}
          />
          <Route
            path="add-new-voucher-type/:id"
            exact
            element={<AddNewVoucherType />}
          />

          <Route
            path="manual-voucher-list"
            exact
            element={<ListManualvoucher />}
          />
          <Route
            path="add-manual-voucher"
            exact
            element={<AddManualvoucher />}
          />
          <Route
            path="add-manual-voucher/:id"
            exact
            element={<AddManualvoucher />}
          />

          <Route path="generate-mapping" exact element={<Generatemapping />} />
          <Route
            path="add-generate-mapping"
            exact
            element={<AddNewMapping />}
          />
          <Route
            path="add-generate-mapping/:id"
            exact
            element={<AddNewMapping />}
          />

          <Route
            path="list-post-dated-cheque"
            exact
            element={<ListPostDatedCheque />}
          />
          <Route
            path="add-post-dated-cheque"
            exact
            element={<AddPostDatedCheque />}
          />
          <Route
            path="add-post-dated-cheque/:id"
            exact
            element={<AddPostDatedCheque />}
          />
          <Route
            path="report-post-dated-cheque"
            exact
            element={<ReportPostDatedCheque />}
          />

          <Route
            path="payment-voucher-list"
            exact
            element={<ListPaymentVoucher />}
          />
          <Route
            path="add-new-payment-voucher"
            exact
            element={<AddNewPaymentVoucher />}
          />
          <Route
            path="add-new-payment-voucher/:id"
            exact
            element={<AddNewPaymentVoucher />}
          />
          <Route
            path="list-payment-voucher/:id"
            exact
            element={<PaymentVoucher />}
          />
          <Route
            path="report-payment-voucher"
            exact
            element={<PaymentVoucherReport />}
          />

          <Route path="sales-form-list" exact element={<ListSalesForm />} />
          <Route path="add-new-sales-form" exact element={<AddSalesForm />} />
          <Route
            path="add-new-sales-form/:id"
            exact
            element={<AddSalesForm />}
          />
          <Route
            path="print-sales-form/:id"
            exact
            element={<PrintSaleForm />}
          />

          <Route path="petty-cash-list" exact element={<ListPettyCash />} />
          <Route path="add-new-petty-cash" exact element={<AddPettyCash />} />
          <Route
            path="add-new-petty-cash/:id"
            exact
            element={<AddPettyCash />}
          />

          <Route path="deal-form-list" exact element={<ListDealForm />} />
          <Route path="add-deal-form" exact element={<AddDealForm />} />
          <Route path="add-deal-form/:id" exact element={<AddDealForm />} />

          <Route
            path="purchase-request-form-list"
            exact
            element={<ListPurchaseRequest />}
          />
          <Route
            path="add-new-purchase-request-form"
            exact
            element={<AddPurchaseRequest />}
          />
          <Route
            path="add-new-purchase-request-form/:id"
            exact
            element={<AddPurchaseRequest />}
          />
          <Route
            path="print-purchase-form/:id"
            exact
            element={<PurchasePrintVoucher />}
          />

          <Route path="bank-deposit-list" exact element={<ListBankDeposit />} />
          <Route path="add-deposit" exact element={<AddBankDeposit />} />
          <Route path="add-deposit/:id" exact element={<AddBankDeposit />} />
          <Route
            path="list-bank-deposit-voucher/:id"
            exact
            element={<DepositVoucherPrint />}
          />

          <Route
            path="company/redbox-estate"
            exact
            element={<RedboxMaterial />}
          />
          <Route
            path="company/al-barsha-developers"
            exact
            element={<AlbarshaDeveloperMaterial />}
          />

          <Route
            path="company/redbox-estate/:id"
            exact
            element={<RedboxMaterial />}
          />
          <Route
            path="company/al-barsha-developers/:id"
            exact
            element={<AlbarshaDeveloperMaterial />}
          />

          <Route
            path="projects/al-barsha-city"
            exact
            element={<PaymentScheduleMaterial />}
          />
          <Route
            path="projects/al-barsha-city/:id"
            exact
            element={<PaymentScheduleMaterial />}
          />

          <Route
            path="payment-reciepts"
            exact
            element={<ListPaymentReciepts />}
          />
          <Route
            path="add-new-payment-reciepts"
            exact
            element={<AddNewPaymentReciepts />}
          />
          <Route
            path="add-new-payment-reciepts/:id"
            exact
            element={<AddNewPaymentReciepts />}
          />
          <Route
            path="print-payment-reciepts/:id"
            exact
            element={<PrintPaymentReciepts />}
          />
          <Route
            path="report-payment-reciepts"
            exact
            element={<ReportPaymentReciept />}
          />

          <Route path="test-import-leads" exact element={<TestImportLeads />} />

          <Route path="lead-history/:id" exact element={<LeadHistory />} />
          <Route
            path="print-petty-cash/:id"
            exact
            element={<PrintPettyCash />}
          />
          <Route
            path="petty-cash-voucher/:id"
            exact
            element={<PettyVoucherPrint />}
          />

          <Route
            path="tlw-history/:id"
            exact
            element={<TotalLeadWorkHistory />}
          />
          <Route path="talktime-history" exact element={<Talktimehistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
