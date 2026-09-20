import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { actionConfig } from "../configuration";
import { SingleEmpAction } from "../redux/action/SingleEmpAction";

function OtherNavigation() {
  let navigate = useNavigate();
  const resultSingleEmp = useSelector(
    (state) => state.SingleEmpreducers.singleempdata
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const dispatch = useDispatch();

  const resultRole = useSelector(
    (state) => state.EmployeeRolereducers.employeeroledata
  );

  const AuthDatas = JSON.parse(localStorage.getItem("authdata"));
  // console.log("AuthDatas",AuthDatas);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    // console.log("AuthData",AuthData);
    dispatch(SingleEmpAction(AuthData == null ? "" : AuthData.id));
  }, []);

  const Logout = () => {
    // localStorage.removeItem('authdata');
    localStorage.clear();
    navigate("/");
  };

  // console.log(resultRolePermssion);

  const TerminationList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 70 && edx.sub_features == "List"
        );
  const TerminationCreate =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 70 && edx.sub_features == "Create"
        );
  const TerminationView =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 70 && edx.sub_features == "View"
        );

  const DesignationList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 69 && edx.sub_features == "List"
        );
  const DesignationView =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 69 && edx.sub_features == "View"
        );
  const DesignationCreate =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 69 && edx.sub_features == "Create"
        );

  const DepartmentList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 68 && edx.sub_features == "List"
        );

  const BranchList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 67 && edx.sub_features == "List"
        );
  const AttendanceList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 66 && edx.sub_features == "List"
        );
  const WarningList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 65 && edx.sub_features == "List"
        );
  const TrainingList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 64 && edx.sub_features == "List"
        );
  const LeaveList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 62 && edx.sub_features == "List"
        );
  const EmployeeList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 61 && edx.sub_features == "List"
        );
  const CompanyList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 60 && edx.sub_features == "List"
        );

  const SetupsList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 73 && edx.sub_features == "List"
        );

  const YoutubeCreate =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 92 && edx.sub_features == "Create"
        );

  const OperationMUser =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id == 13 ||
            edx.module_id == 3 ||
            edx.module_name == "Operations"
        );

  const FinanceMode =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id == 20 ||
            edx.module_id == 4 ||
            edx.module_name == "Finance"
        );

  const InventoriesList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 100);

  const JobPostList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 71);

  const PayrollList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 72);

  const SetupsxList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id == 6);

  const NoticeList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 63);

  const StockList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.feature_id == 151);

  const HrCOn =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id == 16);

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

  const TaskManagementHrmanager =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id == 6);
  const InventoriesCreate =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 100 && edx.sub_features == "Create"
        );
  const InventoriesProj =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 99 && edx.sub_features == "Create"
        );

  const ImportList =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 86 && edx.sub_features == "List"
        );

  // console.log("InventoriesCreate",InventoriesCreate);

  return (
    <>
      <div className="hk-wrapper hk-alt-nav">
        <nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
          <a
            className="navbar-toggle-btn nav-link-hover navbar-toggler"
            href="#"
            data-toggle="collapse"
            data-target="#navbarCollapseAlt"
            aria-controls="navbarCollapseAlt"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="feather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </a>
          <a className="navbar-brand" href="javascript:;">
            <img
              className="brand-img d-inline-block align-top"
              src="FrontAsset/vendors/dist/img/logo-light.png"
              alt="brand"
            />
          </a>
          <div className="collapse navbar-collapse" id="navbarCollapseAlt">
            <ul className="navbar-nav"></ul>
          </div>
          <ul className="navbar-nav hk-navbar-content">
            <li className="nav-item dropdown dropdown-notifications">
              <a
                className="nav-link dropdown-toggle no-caret"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="feather-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-bell"
                  >
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </span>
                <span className="badge-wrap">
                  <span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                data-dropdown-in="fadeIn"
                data-dropdown-out="fadeOut"
              >
                <h6 className="dropdown-header">
                  Notifications{" "}
                  <a href="javascript:void(0);" className="">
                    View all
                  </a>
                </h6>
                <div className="slimScrollDiv">
                  <div className="notifications-nicescroll-bar" tabIndex="-50">
                    <a href="javascript:void(0);" className="dropdown-item">
                      <div className="media">
                        <div className="media-img-wrap">
                          <div className="avatar avatar-sm">
                            <img
                              src="FrontAsset/vendors/dist/img/avatar1.jpg"
                              alt="user"
                              className="avatar-img rounded-circle"
                            />
                          </div>
                        </div>
                        <div className="media-body">
                          <div>
                            <div className="notifications-text">
                              <span className="text-dark text-capitalize">
                                Evie Ono
                              </span>{" "}
                              accepted your invitation to join the team
                            </div>
                            <div className="notifications-time">12m</div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                  </div>
                  <div className="slimScrollBar" tabIndex="-50"></div>
                  <div className="slimScrollRail"></div>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown dropdown-authentication">
              <a
                className="nav-link dropdown-toggle no-caret"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="media">
                  <div className="media-img-wrap">
                    <div className="avatar">
                      <img
                        src="FrontAsset/vendors/dist/img/avatar12.jpg"
                        alt="user"
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <span className="badge badge-success badge-indicator"></span>
                  </div>
                  <div className="media-body">
                    <span>
                      Madelyn Shane<i className="zmdi zmdi-chevron-down"></i>
                    </span>
                  </div>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                data-dropdown-in="flipInX"
                data-dropdown-out="flipOutX"
              >
                <NavLink className="dropdown-item" to="/profile">
                  <i className="dropdown-icon zmdi zmdi-account"></i>
                  <span>Profile</span>
                </NavLink>
                {/* <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-card"></i><span>My balance</span></a> */}
                <NavLink className="dropdown-item" to="/inbox">
                  <i className="dropdown-icon zmdi zmdi-email"></i>
                  <span>Inbox</span>
                </NavLink>
                {/* <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-settings"></i><span>Settings</span></a> */}
                <div className="dropdown-divider"></div>
                <div className="sub-dropdown-menu show-on-hover">
                  <a
                    href="#"
                    className="dropdown-toggle dropdown-item no-caret"
                  >
                    <i className="zmdi zmdi-check text-success"></i>Online
                  </a>
                  <div className="dropdown-menu open-left-side">
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon zmdi zmdi-check text-success"></i>
                      <span>Online</span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon zmdi zmdi-circle-o text-warning"></i>
                      <span>Busy</span>
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dropdown-icon zmdi zmdi-minus-circle-outline text-danger"></i>
                      <span>Offline</span>
                    </a>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="javascript:;"
                  onClick={Logout}
                >
                  <i className="dropdown-icon zmdi zmdi-power"></i>
                  <span>Log out</span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
        <nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
          <a
            className="navbar-toggle-btn nav-link-hover navbar-toggler"
            href="javascript:void(0);"
            data-toggle="collapse"
            data-target="#navbarCollapseAlt"
            aria-controls="navbarCollapseAlt"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="feather-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </a>
          <NavLink
            className="navbar-brand"
            to={`${AuthDatas.lockStatus == "new" ? "/employee" : "/dashboard"}`}
          >
            <img
              className="brand-img d-inline-block align-top"
              width="140"
              src={`${actionConfig.REACT_APP_MAIN}${
                AuthDatas.get_company == null
                  ? ""
                  : AuthDatas.get_company.companyLogo
              }`}
              alt="brand"
            />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarCollapseAlt">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`${
                    AuthDatas.lockStatus == "new" ? "/employee" : "/dashboard"
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>

              {InventoriesList.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      AuthDatas.lockStatus == "new" ? "disabled" : ""
                    }`}
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sales Form
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/add-new-sales-form">
                      Add Sales Form
                    </NavLink>
                    <NavLink className="dropdown-item" to="/sales-form-list">
                      List Sales Form
                    </NavLink>
                  </div>
                </li>
              )}

              {InventoriesList.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      AuthDatas.lockStatus == "new" ? "disabled" : ""
                    }`}
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Inventories
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {InventoriesList.length == 0 ||
                    TaskManagementHrmanager.length > 0 ? (
                      <></>
                    ) : (
                      <NavLink className="dropdown-item" to="/inventories">
                        Inventories
                      </NavLink>
                    )}

                    {FinanceMode.length == 0 ? (
                      <></>
                    ) : (
                      <NavLink className="dropdown-item" to="/add-inventories">
                        Add Inventories
                      </NavLink>
                    )}

                    {InventoriesProj.length == 0 ? (
                      <></>
                    ) : (
                      <NavLink className="dropdown-item" to="/add-projects">
                        Add Projects
                      </NavLink>
                    )}
                  </div>
                </li>
              )}

              {FinanceMode.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Finance
                  </a>
                  <div
                    className="dropdown-menu"
                    data-dropdown-in="fadeIn"
                    data-dropdown-out="fadeOut"
                  >
                    {SecurityFiless.length == 0 ? (
                      <></>
                    ) : (
                      <div className="sub-dropdown-menu show-on-hover">
                        <a href="#" className="dropdown-toggle dropdown-item">
                          Bank Deposit
                        </a>
                        <div className="dropdown-menu open-right-side">
                          <NavLink
                            className="dropdown-item"
                            to="/bank-deposit-list"
                          >
                            Bank Deposit List
                          </NavLink>
                          <NavLink className="dropdown-item" to="/add-deposit">
                            Add Deposit
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/deposit-report"
                          >
                            Deposit Report
                          </NavLink>
                        </div>
                      </div>
                    )}

                    {SecurityFiless.length == 0 ? (
                      <></>
                    ) : (
                      <div className="sub-dropdown-menu show-on-hover">
                        <a href="#" className="dropdown-toggle dropdown-item">
                          Security Files
                        </a>
                        <div className="dropdown-menu open-right-side">
                          <NavLink
                            className="dropdown-item"
                            to="/security-files"
                          >
                            Security Files List
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-Security-files"
                          >
                            Add Security Files
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/security-files-report"
                          >
                            Security Files Report
                          </NavLink>
                        </div>
                      </div>
                    )}

                    {SecurityFiless.length == 0 ? (
                      <></>
                    ) : (
                      <div className="sub-dropdown-menu show-on-hover">
                        <a href="#" className="dropdown-toggle dropdown-item">
                          Deal Form
                        </a>
                        <div className="dropdown-menu open-right-side">
                          <NavLink
                            className="dropdown-item"
                            to="/deal-form-list"
                          >
                            Deal Form List
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-deal-form"
                          >
                            Add Deal Form
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/deal-form-report"
                          >
                            Deal Form Report
                          </NavLink>
                        </div>
                      </div>
                    )}
                    {assetRegister.length == 0 ? (
                      <></>
                    ) : (
                      <>
                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Petty Cash
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink
                              className="dropdown-item"
                              to="/petty-cash-list"
                            >
                              Petty Cash List
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-petty-cash"
                            >
                              Add New Petty Cash
                            </NavLink>
                            {/* <NavLink className="dropdown-item" to="/asset-report">Asset Report</NavLink> */}
                          </div>
                        </div>
                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Payables
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink className="dropdown-item" to="/bills-list">
                              Payables List
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-bills"
                            >
                              Add New Payables
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/bills-reports"
                            >
                              Bills Report
                            </NavLink>
                          </div>
                        </div>

                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Requirement Form
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink
                              className="dropdown-item"
                              to="/purchase-request-form-list"
                            >
                              Requirement Form List
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-purchase-request-form"
                            >
                              Add New Requirement Form
                            </NavLink>
                            {/* <NavLink className="dropdown-item" to="/asset-report">Asset Report</NavLink> */}
                          </div>
                        </div>
                      </>
                    )}

                    {assetRegister.length == 0 ? (
                      <></>
                    ) : (
                      <div className="sub-dropdown-menu show-on-hover">
                        <a href="#" className="dropdown-toggle dropdown-item">
                          Fixed Asset Register
                        </a>
                        <div className="dropdown-menu open-right-side">
                          <NavLink
                            className="dropdown-item"
                            to="/fixed-asset-register"
                          >
                            Fixed Asset Register List
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-new-asset"
                          >
                            Add New Asset
                          </NavLink>
                          <NavLink className="dropdown-item" to="/asset-report">
                            Asset Report
                          </NavLink>
                        </div>
                      </div>
                    )}

                    {PaymentPlanss.length == 0 ? (
                      <></>
                    ) : (
                      <>
                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Payment Plan
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink
                              className="dropdown-item"
                              to="/payment-plan"
                            >
                              Payment Plan
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-payment-plan"
                            >
                              Add New Payment Plan
                            </NavLink>
                          </div>
                        </div>

                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Payment Reciept
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink
                              className="dropdown-item"
                              to="/payment-reciepts"
                            >
                              Payment Reciept
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-payment-reciepts"
                            >
                              Add New Payment Reciept
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/report-payment-reciepts"
                            >
                              Report Payment Reciept
                            </NavLink>
                          </div>
                        </div>

                        <div className="sub-dropdown-menu show-on-hover">
                          <a href="#" className="dropdown-toggle dropdown-item">
                            Payment Voucher
                          </a>
                          <div className="dropdown-menu open-right-side">
                            <NavLink
                              className="dropdown-item"
                              to="/payment-voucher-list"
                            >
                              Payment Voucher List
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/add-new-payment-voucher"
                            >
                              Add New Payment Voucher
                            </NavLink>
                            <NavLink
                              className="dropdown-item"
                              to="/report-payment-voucher"
                            >
                              Payment Voucher Report
                            </NavLink>
                          </div>
                        </div>
                      </>
                    )}

                    {ChequebookDs.length == 0 ? (
                      <></>
                    ) : (
                      <div className="sub-dropdown-menu show-on-hover">
                        <a href="#" className="dropdown-toggle dropdown-item">
                          Cheque Book Register
                        </a>
                        <div className="dropdown-menu open-right-side">
                          <NavLink className="dropdown-item" to="/bank-list">
                            Bank Accounts
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-new-cheque-book"
                          >
                            New Cheque Book
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/list-cheque-book"
                          >
                            List Cheque Book
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-cheque-outward-register"
                          >
                            Cheque Outward Register
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/list-cheque-outward-register"
                          >
                            List Cheque Outward Register
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/report-cheque-outward-register"
                          >
                            Report Cheque Outward Register
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/add-post-dated-cheque"
                          >
                            Add Post Dated Cheque
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/list-post-dated-cheque"
                          >
                            List Post Dated Cheque
                          </NavLink>
                          <NavLink
                            className="dropdown-item"
                            to="/report-post-dated-cheque"
                          >
                            Report Post Dated Cheque
                          </NavLink>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              )}

              {InventoriesCreate.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item dropdown ">
                  <a
                    className={`nav-link dropdown-toggle ${
                      AuthDatas.lockStatus == "new" ? "disabled" : ""
                    }`}
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Marketing Documents
                  </a>
                  <div
                    className="dropdown-menu"
                    data-dropdown-in="fadeIn"
                    data-dropdown-out="fadeOut"
                  >
                    {/* <a class="dropdown-item" href="#">Profile</a> */}
                    <NavLink className="dropdown-item" to="/marketing-document">
                      Marketing Documents
                    </NavLink>
                    <div className="sub-dropdown-menu show-on-hover">
                      <a href="#" className="dropdown-toggle dropdown-item">
                        Company Information
                      </a>
                      <div className="dropdown-menu open-right-side">
                        <NavLink
                          className="dropdown-item"
                          to="/company/redbox-estate"
                        >
                          Redbox Estate
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/company/al-barsha-developers"
                        >
                          Al Barsha Developers
                        </NavLink>
                      </div>
                    </div>

                    <div className="sub-dropdown-menu show-on-hover">
                      <a href="#" className="dropdown-toggle dropdown-item">
                        Project Schedule
                      </a>
                      <div className="dropdown-menu open-right-side">
                        <NavLink
                          className="dropdown-item"
                          to="/projects/al-barsha-city"
                        >
                          Al Barsha City
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {ImportList.length == 0 ? (
                <></>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/import-leads">
                      Import Leads
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/data-drive">
                      Data Drive
                    </NavLink>
                  </li>
                </>
              )}

              {YoutubeCreate.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/view-video-request">
                    Video Request
                  </NavLink>
                </li>
              )}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  HR
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {NoticeList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/notice">
                      CEO Note
                    </NavLink>
                  )}

                  {CompanyList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/company">
                      Company
                    </NavLink>
                  )}

                  {EmployeeList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/employee">
                      Employee
                    </NavLink>
                  )}

                  {EmployeeList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/report-to">
                      Report To
                    </NavLink>
                  )}

                  {LeaveList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/leave">
                      Leave
                    </NavLink>
                  )}

                  {TrainingList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/training">
                      Training
                    </NavLink>
                  )}

                  {WarningList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/warning">
                      Warning
                    </NavLink>
                  )}

                  {AttendanceList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/attendance">
                      Attendance
                    </NavLink>
                  )}

                  {BranchList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/branch">
                      Branch
                    </NavLink>
                  )}

                  {BranchList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/employee-shift">
                      Employee Shift
                    </NavLink>
                  )}

                  {DepartmentList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/department">
                      Department
                    </NavLink>
                  )}

                  {DesignationList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/designation">
                      Designation
                    </NavLink>
                  )}

                  {TerminationList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/termination">
                      Termination
                    </NavLink>
                  )}

                  {JobPostList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/job-post">
                      Job Post
                    </NavLink>
                  )}
                  {PayrollList.length == 0 ? (
                    <></>
                  ) : (
                    <NavLink className="dropdown-item" to="/payroll">
                      Payroll
                    </NavLink>
                  )}

                  {SetupsxList.length == 0 ? (
                    <></>
                  ) : (
                    <>
                      <NavLink className="dropdown-item" to="/setups">
                        Setups
                      </NavLink>
                      <NavLink className="dropdown-item" to="/employee-shift">
                        Employee Shift
                      </NavLink>
                      <NavLink className="dropdown-item" to="/holiday">
                        Holiday
                      </NavLink>
                    </>
                  )}
                  {/* <a rel="noopener noreferrer" target="_blank" className="dropdown-item" href="FrontAsset/images/REDBOX-DRESS-CODE.pdf">Hr Policies</a> */}
                </div>
              </li>

              {SetupsList.length == 0 ? (
                <></>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Setups
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="/role-category">
                        Role
                      </NavLink>
                      <NavLink className="dropdown-item" to="/crm-modules">
                        Module
                      </NavLink>
                      <NavLink className="dropdown-item" to="/module-setup">
                        Module Setup
                      </NavLink>
                      <NavLink className="dropdown-item" to="/role-permission">
                        Role Permission
                      </NavLink>
                    </div>
                  </li>
                </>
              )}

              {resultRole.role == "" ? (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Setups
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <NavLink className="dropdown-item" to="/role-category">
                        Role
                      </NavLink>
                      <NavLink className="dropdown-item" to="/crm-modules">
                        Module
                      </NavLink>
                      <NavLink className="dropdown-item" to="/module-setup">
                        Module Setup
                      </NavLink>
                      <NavLink className="dropdown-item" to="/role-permission">
                        Role Permission
                      </NavLink>
                    </div>
                  </li>
                </>
              ) : (
                <></>
              )}

              {FinanceMode.length == 0 ? <></> : <></>}

              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Properties
                </a>
                <div
                  className="dropdown-menu"
                  data-dropdown-in="fadeIn"
                  data-dropdown-out="fadeOut"
                >
                  <NavLink className="dropdown-item" to="/add-property">
                    Add Property
                  </NavLink>
                </div>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/circular-policy">
                  Circular & Notifications
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/vehcile-pass">
                  Vehcile Pass
                </NavLink>
              </li> */}

              {/* <li className="nav-item">
<NavLink className="nav-link" to="/complain-management">Complain Management</NavLink>
</li> */}

              {FinanceMode.length == 0 ? (
                <></>
              ) : (
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Parameters Setup
                  </a>
                  <div
                    className="dropdown-menu"
                    data-dropdown-in="fadeIn"
                    data-dropdown-out="fadeOut"
                  >
                    <div className="sub-dropdown-menu show-on-hover">
                      <a href="#" className="dropdown-toggle dropdown-item">
                        Chart of Accounts
                      </a>
                      <div className="dropdown-menu open-right-side">
                        <NavLink
                          className="dropdown-item"
                          to="/chart-of-account-level-1"
                        >
                          Level 1
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/chart-of-account-level-2"
                        >
                          Level 2
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/chart-of-account-level-3"
                        >
                          Level 3
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/chart-of-account-report"
                        >
                          Chart of Account Report
                        </NavLink>
                      </div>
                    </div>

                    <div className="sub-dropdown-menu show-on-hover">
                      <a href="#" className="dropdown-toggle dropdown-item">
                        Dimensions
                      </a>
                      <div className="dropdown-menu open-right-side">
                        <NavLink
                          className="dropdown-item"
                          to="/dimension-code-level-1"
                        >
                          Dimension Level 1
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/dimension-code-level-2"
                        >
                          Dimension Level 2
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/dimension-code-level-3"
                        >
                          Dimension Level 3
                        </NavLink>
                        <NavLink
                          className="dropdown-item"
                          to="/dimension-account-report"
                        >
                          Dimension Account Report
                        </NavLink>
                      </div>
                    </div>

                    <div className="sub-dropdown-menu show-on-hover">
                      <a href="#" className="dropdown-toggle dropdown-item">
                        Mapping
                      </a>
                      <div className="dropdown-menu open-right-side">
                        <NavLink
                          className="dropdown-item"
                          to="/generate-mapping"
                        >
                          Generate Mapping
                        </NavLink>
                      </div>
                    </div>

                    <NavLink className="dropdown-item" to="/voucher-type">
                      Voucher Type
                    </NavLink>
                    <NavLink className="dropdown-item" to="/company">
                      Company
                    </NavLink>
                    <NavLink className="dropdown-item" to="/department">
                      Departments
                    </NavLink>
                    <NavLink className="dropdown-item" to="/employee">
                      Employee
                    </NavLink>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <ul className="navbar-nav hk-navbar-content">
            {/* <li className="nav-item dropdown dropdown-notifications">
<a className="nav-link dropdown-toggle no-caret" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bell"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span></span></a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
<h6 className="dropdown-header">Notifications <a href="javascript:void(0);" className="">View all</a></h6>
<div className="slimScrollDiv" ><div className="notifications-nicescroll-bar" tabIndex="-50" >


<a href="javascript:void(0);" className="dropdown-item">
<div className="media">
<div className="media-img-wrap">
<div className="avatar avatar-sm">
<span className="avatar-text avatar-text-warning rounded-circle">
<span className="initial-wrap"><span><i className="zmdi zmdi-notifications font-18"></i></span></span>
</span>
</div>
</div>
<div className="media-body">
<div>
<div className="notifications-text">Last 2 days left for the project</div>
<div className="notifications-time">15d</div>
</div>
</div>
</div>
</a>

</div>


<div className="slimScrollBar" tabIndex="-50" ></div><div className="slimScrollRail"></div></div>
</div>
</li> */}

            <li className="nav-item dropdown dropdown-authentication">
              <a
                className="nav-link dropdown-toggle no-caret"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="media">
                  <div className="media-img-wrap">
                    <div className="avatar">
                      <img
                        src={
                          resultSingleEmp.profile_pic == ""
                            ? `../../FrontAsset/dist/img/avatar12.jpg`
                            : `${actionConfig.REACT_APP_MAIN}${resultSingleEmp.profile_pic}`
                        }
                        alt="user"
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <span className="badge badge-success badge-indicator"></span>
                  </div>
                  <div className="media-body">
                    <span>
                      {resultSingleEmp == null ? "" : resultSingleEmp.emp_name}
                      <i className="zmdi zmdi-chevron-down"></i>
                    </span>
                  </div>
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                data-dropdown-in="flipInX"
                data-dropdown-out="flipOutX"
              >
                <NavLink className="dropdown-item" to="/profile">
                  <i className="dropdown-icon zmdi zmdi-account"></i>
                  <span>Profile</span>
                </NavLink>
                {/* <NavLink className="dropdown-item" to="/inbox"><i className="dropdown-icon zmdi zmdi-email"></i><span>Inbox</span></NavLink> */}
                {/* <a className="dropdown-item" href="#"><i className="dropdown-icon zmdi zmdi-settings"></i><span>Settings</span></a> */}
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="javascript:;"
                  onClick={Logout}
                >
                  <i className="dropdown-icon zmdi zmdi-power"></i>
                  <span>Log out</span>
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default OtherNavigation;
