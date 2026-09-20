import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import OtherNavigation from "../../Includes/OtherNavigation";
import QuickNav from "../../Includes/QuickNav";
import { getDashCountData } from "../../redux/action/DashboardCountAction";
import { getDashboardListACtion } from "../../redux/action/getDashboardListACtion";
import { FinanceDashboardAction } from "../../redux/action/FinanceDashboardAction";
import { CashInFlowAction } from "../../redux/action/CashInFlowAction";
import { BankFlowAction } from "../../redux/action/BankFlowAction";
import { PettycashflowAction } from "../../redux/action/PettycashflowAction";
import { Bankdepositflowaction } from "../../redux/action/Bankdepositflowaction";
import { AssetcompanyflowAction } from "../../redux/action/AssetcompanyflowAction";
import { AssetdepartmentflowAction } from "../../redux/action/AssetdepartmentflowAction";
import { AssettypeflowAction } from "../../redux/action/AssettypeflowAction";
import { AssetlocationflowAction } from "../../redux/action/AssetlocationflowAction";
import { BillSummaryaction } from "../../redux/action/BillSummaryaction";
import { BilldueSummaryAction } from "../../redux/action/BilldueSummaryAction";

const FinanceDashboard = () => {
  const result = useSelector((state) => state.dashCountReducer.dashboardcount);
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );

  const resultfindash = useSelector(
    (state) => state.Findashboardlistreducers.findashboarddata
  );
  const resultcashinflow = useSelector(
    (state) => state.Cashinflowreducers.cashinflowdata
  );
  const resultbankflow = useSelector(
    (state) => state.Bankflowreducers.bankflowdata
  );
  const resultbankdepositflow = useSelector(
    (state) => state.Bankdepositflowreducers.bankdepositsflowdata
  );

  const resultpettycashflow = useSelector(
    (state) => state.Pettycashflowreducers.pettycashindata
  );
  const resultassetcompanyflow = useSelector(
    (state) => state.Assetcompanyflowreducers.assetcompanyflowdata
  );
  const resultassetdepartmentflow = useSelector(
    (state) => state.Assetdepartmentreducers.assetdepartmentflowdata
  );
  const resultassettypeflow = useSelector(
    (state) => state.Assettypeflowreducers.assettypeflowdata
  );
  const resultassetlocationflow = useSelector(
    (state) => state.Assetlocationreducers.assetlocationflowdata
  );
  const resultbillsummaryflow = useSelector(
    (state) => state.Billsummaryreducers.billsummaryflowdata
  );
  const resultbillduesummaryflow = useSelector(
    (state) => state.Billduesummaryreducers.billDuesummaryflowdata
  );

  // const resultRole = useSelector(state => state.EmployeeRolereducers.employeeroledata);
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );

  const dispatch = useDispatch();

  const DealsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            (edx.feature_id === 59 && edx.sub_features === "List") ||
            edx.module_name === "Finance"
        );

  const SuperCon =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id === 3 || edx.role_id === 4 || edx.feature_id == 145
        );

  const SUperFinance =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id === 20);

  const assetRegister =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 153);

  const SecurityFiless =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 150);

  const PaymentPlanss =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 152);

  const BankAccountDs =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 154);

  const ChequebookDs =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 155);

  const BillCOn =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 166);
  const RequirementCOn =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 169);
  const PettyCashCOn =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 162);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    console.log("AuthData", AuthData.company_id);
    if (SUperFinance.length === 0) {
      if (SuperCon.length === 0) {
        dispatch(getDashboardListACtion(AuthData.id, "", AuthData.company_id));
        dispatch(FinanceDashboardAction(AuthData.company_id));
        dispatch(CashInFlowAction(AuthData.company_id));
        dispatch(BankFlowAction(AuthData.company_id));
        dispatch(PettycashflowAction(AuthData.company_id));
        dispatch(Bankdepositflowaction(AuthData.company_id));
        dispatch(AssetcompanyflowAction(AuthData.company_id));
        dispatch(AssetdepartmentflowAction(AuthData.company_id));
        dispatch(AssettypeflowAction(AuthData.company_id));
        dispatch(AssetlocationflowAction(AuthData.company_id));
        dispatch(BillSummaryaction(AuthData.company_id));
        dispatch(BilldueSummaryAction(AuthData.company_id));
      } else {
        dispatch(getDashboardListACtion("all", "", AuthData.company_id));
        dispatch(FinanceDashboardAction(AuthData.company_id));
        dispatch(CashInFlowAction(AuthData.company_id));
        dispatch(BankFlowAction(AuthData.company_id));
        dispatch(PettycashflowAction(AuthData.company_id));
        dispatch(Bankdepositflowaction(AuthData.company_id));
        dispatch(AssetcompanyflowAction(AuthData.company_id));
        dispatch(AssetdepartmentflowAction(AuthData.company_id));
        dispatch(AssettypeflowAction(AuthData.company_id));
        dispatch(AssetlocationflowAction(AuthData.company_id));
        dispatch(BillSummaryaction(AuthData.company_id));
        dispatch(BilldueSummaryAction(AuthData.company_id));
      }
    } else {
      dispatch(getDashboardListACtion("all", "", AuthData.company_id));
      dispatch(FinanceDashboardAction(AuthData.company_id));
      dispatch(CashInFlowAction(AuthData.company_id));
      dispatch(BankFlowAction(AuthData.company_id));
      dispatch(PettycashflowAction(AuthData.company_id));
      dispatch(Bankdepositflowaction(AuthData.company_id));
      dispatch(AssetcompanyflowAction(AuthData.company_id));
      dispatch(AssetdepartmentflowAction(AuthData.company_id));
      dispatch(AssettypeflowAction(AuthData.company_id));
      dispatch(AssetlocationflowAction(AuthData.company_id));
      dispatch(BillSummaryaction(AuthData.company_id));
      dispatch(BilldueSummaryAction(AuthData.company_id));
    }
  }, []);

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Finance Dashboard</h2>
            <p>Welcome to Customer Relationship Management for SellMore..</p>
          </div>

          <QuickNav />
        </div>
        <OtherNavigation />

        <div className="hk-row">
          {DealsList.length === 0 ? (
            <></>
          ) : (
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-view-deals">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        DEALS DONE
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">
                      Total{" "}
                      {result == "" ||
                      result == null ||
                      result.length == 0 ||
                      result == undefined
                        ? 0
                        : result.TotalDealsDOne}
                    </span>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      <span className="d-block">
                        <span className="display-5 font-weight-400 text-dark">
                          {result == "" ||
                          result == null ||
                          result.length == 0 ||
                          result == undefined
                            ? 0
                            : result.TodayDealsDOne}
                        </span>
                        <small>Today</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {DealsList.length === 0 ? (
            <></>
          ) : (
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-view-documents">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Documents
                      </span>
                    </NavLink>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {SecurityFiless.length === 0 ? (
            <></>
          ) : (
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/security-files">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Security Files
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">
                      Total 0
                    </span>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      <span className="d-block">
                        <span className="display-5 font-weight-400 text-dark">
                          0
                        </span>
                        <small>Today</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {assetRegister.length === 0 ? (
            <></>
          ) : (
            <div className="col-lg-3 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/fixed-asset-register">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Fixed Asset Register
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">
                      Total 0
                    </span>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      <span className="d-block">
                        <span className="display-5 font-weight-400 text-dark">
                          0
                        </span>
                        <small>Today</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {PaymentPlanss.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/payment-plan">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Payment Plan
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/payment-voucher-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Payment Voucher
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/stock-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Stock Register
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/payment-reciepts">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Payment Reciepts
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {ChequebookDs.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/list-cheque-book">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Cheque Book Register
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/list-cheque-outward-register">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Cheque Outward Register
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/sales-form-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Sales Form
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/bank-deposit-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Bank Deposits
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {PettyCashCOn.length == 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/petty-cash-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Petty Cash Voucher
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {RequirementCOn.length == 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/purchase-request-form-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Requirement Form
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {BillCOn.length == 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/bills-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Payables
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {BillCOn.length == 0 ? (
            <></>
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body pb-0">
                    <div className="align-items-center d-flex justify-content-between">
                      <NavLink to="/manual-voucher-list">
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Manual Voucher
                        </span>
                      </NavLink>
                      <span className="badge badge-sm badge-info mb-10">
                        Total 0
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/icn-transfer.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {ChequebookDs.length === 0 ? (
            <></>
          ) : (
            <>
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 pt-4">
                    <h4 className="pb-3">Cash Inflow (CRV)</h4>
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Company</th>
                          <th>Today</th>
                          <th>Last 7 Days</th>
                          <th>Current Month</th>
                          <th>Last Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultcashinflow == "" ||
                        resultcashinflow.length == 0 ||
                        resultcashinflow == null ? (
                          <></>
                        ) : (
                          resultcashinflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.company_name}</td>
                                  <td>{items.cashPayToday}</td>
                                  <td>{items.cashPayWeekly}</td>
                                  <td>{items.cashPayCurrentMonth}</td>
                                  <td>{items.cashPayLastMonth}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6 pt-4">
                    <h4 className="pb-3">Cash Outflow (CPV)</h4>
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Company</th>
                          <th>Today</th>
                          <th>Last 7 Days</th>
                          <th>Current Month</th>
                          <th>Last Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultfindash == "" ||
                        resultfindash.length == 0 ||
                        resultfindash == null ? (
                          <></>
                        ) : (
                          resultfindash.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.company_name}</td>
                                  <td>{items.cashPayToday}</td>
                                  <td>{items.cashPayWeekly}</td>
                                  <td>{items.cashPayCurrentMonth}</td>
                                  <td>{items.cashPayLastMonth}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6 pt-4">
                    <h4 className="pb-3">Bank Payments (BPV)</h4>
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Bank Name</th>
                          <th>Today</th>
                          <th>Last 7 Days</th>
                          <th>Current Month</th>
                          <th>Last Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultbankflow == "" ||
                        resultbankflow.length == 0 ||
                        resultbankflow == null ? (
                          <></>
                        ) : (
                          resultbankflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {items.bankname} <br />
                                    {items.title}
                                  </td>
                                  <td>{items.outwardcashPayDay}</td>
                                  <td>{items.outwardcashPayWeekly}</td>
                                  <td>{items.cashPayCurrentMonth}</td>
                                  <td>{items.cashPayLastMonth}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6 pt-4">
                    <h4 className="pb-3">Petty Cash Expenses (PCV)</h4>
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Company</th>
                          <th>Today</th>
                          <th>Last 7 Days</th>
                          <th>Current Month</th>
                          <th>Last Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultpettycashflow == "" ||
                        resultpettycashflow.length == 0 ||
                        resultpettycashflow == null ? (
                          <></>
                        ) : (
                          resultpettycashflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.company_name}</td>
                                  <td>{items.cashPayToday}</td>
                                  <td>{items.cashPayWeekly}</td>
                                  <td>{items.cashPayCurrentMonth}</td>
                                  <td>{items.cashPayLastMonth}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6 pt-4">
                    <h4 className="pb-3">Bank Deposits (BRV)</h4>
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Bank Name</th>
                          <th>Today</th>
                          <th>Last 7 Days</th>
                          <th>Current Month</th>
                          <th>Last Month</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultbankdepositflow == "" ||
                        resultbankdepositflow.length == 0 ||
                        resultbankdepositflow == null ? (
                          <></>
                        ) : (
                          resultbankdepositflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {items.bankname} <br />
                                    {items.title}
                                  </td>
                                  <td>{items.outwardcashPayDay}</td>
                                  <td>{items.outwardcashPayWeekly}</td>
                                  <td>{items.cashPayCurrentMonth}</td>
                                  <td>{items.cashPayLastMonth}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h4>Payables Summary</h4>
                  </div>
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Type Name</th>
                          <th>Bill Amount</th>
                          <th>Paid Amount</th>
                          <th>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultbillsummaryflow == "" ||
                        resultbillsummaryflow.length == 0 ||
                        resultbillsummaryflow == null ? (
                          <></>
                        ) : (
                          resultbillsummaryflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.getBilltype}</td>
                                  <td>{items.billamount}</td>
                                  <td>{items.paidamount}</td>
                                  <td>{items.balanaceamount}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h4>Payables Amount (Balance)</h4>
                  </div>
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Company</th>
                          <th>Past Due</th>
                          <th>Today</th>
                          <th>Next 3 Days</th>
                          <th>Next 7 Days</th>
                          <th>Next 15 Days</th>
                          <th>Next 30 Days</th>
                          <th>Next 60 Days</th>
                          <th>Next 90 Days</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultbillduesummaryflow == "" ||
                        resultbillduesummaryflow.length == 0 ||
                        resultbillsummaryflow == null ? (
                          <></>
                        ) : (
                          resultbillduesummaryflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.getCompany}</td>
                                  <td>{items.Pastbalanaceamount}</td>
                                  <td>{items.Todaybalanaceamount}</td>
                                  <td>{items.Next3daysbalanaceamount}</td>
                                  <td>{items.Next7daysbalanaceamount}</td>
                                  <td>{items.Next15daysbalanaceamount}</td>
                                  <td>{items.Next30daysbalanaceamount}</td>
                                  <td>{items.Next60daysbalanaceamount}</td>
                                  <td>{items.Next90daysbalanaceamount}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <h2 className="text-center pb-3">Fixed Asset Position</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Company Name</th>
                          <th>Book Value</th>
                          <th>Deprecaton Amount</th>
                          <th>Residual Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultassetcompanyflow == "" ||
                        resultassetcompanyflow.length == 0 ||
                        resultassetcompanyflow == null ? (
                          <></>
                        ) : (
                          resultassetcompanyflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>{items.company_name}</td>
                                  <td>{items.bookValueSUm}</td>
                                  <td>{items.DeprecationValueSUm}</td>
                                  <td>{items.ResidueValueSUm}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Department Name</th>
                          <th>Book Value</th>
                          <th>Deprecaton Amount</th>
                          <th>Residual Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultassetdepartmentflow == "" ||
                        resultassetdepartmentflow.length == 0 ||
                        resultassetdepartmentflow == null ? (
                          <></>
                        ) : (
                          resultassetdepartmentflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {items.department_name == null
                                      ? "N/a"
                                      : items.department_name}
                                  </td>
                                  <td>{items.bookValueSUm}</td>
                                  <td>{items.DeprecationValueSUm}</td>
                                  <td>{items.ResidueValueSUm}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Asset Type</th>
                          <th>Book Value</th>
                          <th>Deprecaton Amount</th>
                          <th>Residual Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultassettypeflow == "" ||
                        resultassettypeflow.length == 0 ||
                        resultassettypeflow == null ? (
                          <></>
                        ) : (
                          resultassettypeflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {items.assetType == null
                                      ? "N/a"
                                      : items.assetType}
                                  </td>
                                  <td>{items.bookValueSUm}</td>
                                  <td>{items.DeprecationValueSUm}</td>
                                  <td>{items.ResidueValueSUm}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <table className="table w-100 display pb-30 no-footer dtr-inline">
                      <thead className="thead-dark">
                        <tr>
                          <th>Location Name</th>
                          <th>Book Value</th>
                          <th>Deprecaton Amount</th>
                          <th>Residual Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultassetlocationflow == "" ||
                        resultassetlocationflow.length == 0 ||
                        resultassetlocationflow == null ? (
                          <></>
                        ) : (
                          resultassetlocationflow.map((items, key) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {items.locationName == null
                                      ? "N/a"
                                      : items.locationName}
                                  </td>
                                  <td>{items.bookValueSUm}</td>
                                  <td>{items.DeprecationValueSUm}</td>
                                  <td>{items.ResidueValueSUm}</td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FinanceDashboard;
