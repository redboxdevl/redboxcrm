import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardSkeleton from "./Skeleton/DashboardSkeleton";
// import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { actionConfig } from "../../configuration";
import Swal from "sweetalert2";
import OutgoingSkeleton from "../Skeleton/OutgoingSkeleton";
import DataAnalytics from "./DataAnalytics";
import HotLeadAnalysis from "./HotLeadAnalysis";
import SalesTodos from "./SalesTodos";
import ExpiredGraphs from "./DashboardGraphs/ExpiredGraphs";
import TwentyFourHourseGraphs from "./DashboardGraphs/TwentyFourHourseGraphs";
import KPIGraphs from "./DashboardGraphs/KPIGraphs";
import ConversionGraphs from "./DashboardGraphs/ConversionGraphs";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { loadingToggleAction } from "../../redux/action/DashboardCountAction";
import { getDashboardListACtion } from "../../redux/action/getDashboardListACtion";
import { SingleEmpAction } from "../../redux/action/SingleEmpAction";

const DashboardBox = ({
  loading,
  DashboardTodos,
  TodosList,
  DashboardLeads,
  empAll,
}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const result = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const SuperCons =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.role_id == 3 || edx.role_id == 4
        );
  const DealsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 59 && edx.sub_features === "List"
        );
  const TransferList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 58 && edx.sub_features === "List"
        );
  const ActivityList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 57 && edx.sub_features === "List"
        );
  const ReminderList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 56 && edx.sub_features === "List"
        );
  const DormantList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 55 && edx.sub_features === "List"
        );
  const HotList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 54 && edx.sub_features === "List"
        );
  const MyLeadList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 53 && edx.sub_features === "List"
        );
  const NotIntersList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 51 && edx.sub_features === "List"
        );
  const AssignLeadsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 50 && edx.sub_features === "List"
        );
  const DuplicateLeadsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 129 && edx.sub_features === "List"
        );

  const VirginList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 48 && edx.sub_features === "List"
        );

  const OutgoingList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 134 && edx.sub_features === "List"
        );

  const IncommingList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 135 && edx.sub_features === "List"
        );

  const MissedList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 137 && edx.sub_features === "List"
        );

  const ConnectedList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 136 && edx.sub_features === "List"
        );

  const AnsweredList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 138 && edx.sub_features === "List"
        );

  const CallingDataList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 132 && edx.sub_features === "List"
        );

  const FacebookChatList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 145 && edx.sub_features === "List"
        );

  const DailyLeadsReportsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 147 && edx.sub_features === "List"
        );

  const CallStatusReportsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 146 && edx.sub_features === "List"
        );

  const Kpireportlst =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 158 && edx.sub_features === "List"
        );

  const SuperDatabaseReportsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 148 && edx.sub_features === "List"
        );

  const TaskManagementHrmanager =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id === 6);

  const [ClientDesignation, setClientDesignation] = useState("");
  const [ClientProject, setClientProject] = useState("");
  const [ClientEmail, setClientEmail] = useState("-");
  const [ClientNo, setClientNo] = useState("");
  const [ClientName, setClientName] = useState("");
  const [LeadTypes, setLeadTypes] = useState("");

  // const [Cond,setCond]=useState(true);

  const [show, setShow] = useState(false);
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");

  function convertDatePickerTimeToMySQLTime(str) {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate].join(" ");
  }

  const handleEvent = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
  };

  const onApply = (start, end, label) => {
    const startDate = convertDatePickerTimeToMySQLTime(start._d);
    const EndDate = convertDatePickerTimeToMySQLTime(end._d);
    setStartDate(startDate);
    setEndDate(EndDate);
  };

  const locale = {
    format: "YYYY-MM-DD",
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const addFacebookChat = (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const FeildData = {
      ClientDesignation: ClientDesignation,
      ClientProject: ClientProject,
      ClientEmail: ClientEmail,
      clientPhone: ClientNo,
      ClientName: ClientName,
      LeadTypes: LeadTypes,
      company_id: AuthData.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    fetch(`${actionConfig.REACT_APP_URL}facebookchat`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code === "200") {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/dashboard");
          setClientDesignation("");
          setClientProject("");
          setClientEmail("");
          ClientEmail("");
          setClientNo("");
          setClientName("");
          setLeadTypes("");
          setShow(false);
        } else if (dataex.code === "203") {
          Swal.fire("Warning", dataex.message, "warning");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    const SuperCon =
      resultRolePermssion === ""
        ? ""
        : resultRolePermssion.filter(
            (edx) =>
              edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
          );
    dispatch(loadingToggleAction(true));
    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === "") {
        dispatch(getDashboardListACtion(AuthData.id, "", AuthData.company_id));
      } else {
        dispatch(
          getDashboardListACtion("all", EmpData.teamObj, AuthData.company_id)
        );
      }
    } else {
      dispatch(getDashboardListACtion("all", "", AuthData.company_id));
    }
    dispatch(SingleEmpAction(AuthData.id));
  }, [dispatch, resultRolePermssion]);

  console.log("result", result);

  return (
    <>
      {/* <div className="hk-row">
<div className="col-md-12">
<div className="row justify-content-end">
<div className="col-12 col-md-4 pr-md-1">
  <div className="form-group">
    <DateRangePicker
      initialSettings={{ startDate: true, endDate: true, timePicker: false, timePicker24Hour: false, locale }}
      onCallback={onApply}
      handleEvent={handleEvent}
    >
      <input class="form-control" type="text" />
    </DateRangePicker>
  </div>
</div>
<div className="col-12 col-md-4 pr-md-1 pl-md-1">
  <div className="form-group">
    <select name="" id="" className="form-control">
      <option value="">Team</option>
    </select>
  </div>
</div>
<div className="col-12 col-md-4 pl-md-1">
  <div className="form-group">
    <select name="" id="" className="form-control">
      <option value="">Project</option>
    </select>
  </div>
</div>
</div>
</div>
</div> */}

      <div className="hk-row">
        {CallingDataList.length == 0 ? (
          <></>
        ) : (
          <div className="col-md-8">
            <div className="card card-refresh">
              <div className="refresh-container">
                <div className="loader-pendulums"></div>
              </div>
              <div className="card-header card-header-action">
                <h6>KPI Graphs</h6>
              </div>
              <div className="card-body p-0">
                <KPIGraphs dataEmp={empAll} />
              </div>
            </div>
          </div>
        )}

        {CallingDataList.length == 0 ? (
          <></>
        ) : (
          <div className="col-md-4">
            <ul className="d-flex justify-content-center align-items-center pt-md-0 pb-md-4 mb-md-3 MyCirclex flex-wrap">
              <>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/outgoingcallIcon.png"
                      alt="icon"
                    />
                    <p>Outgoing</p>
                    <h4>
                      {result.TotalOutgoingCallData} /{" "}
                      {result.TodayOutgoingCallData}
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/incomingcallIcon.png"
                      alt="icon"
                    />
                    <p>Incomming</p>
                    <h4>
                      {result.TotalIncommingCallData} /{" "}
                      {result.TodayIncommingCallData}
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/Total-Outgoing.png"
                      alt="icon"
                    />
                    <p>Out Talk Time</p>
                    <h4>
                      {result.ZOngCallingOutgoing} /{" "}
                      {result.ZOngCallingOutgoingToday}
                    </h4>
                  </a>
                </li>{" "}
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/TOTAL-TALK-TIME-INCOMMINg.png"
                      alt="icon"
                    />
                    <p>In Talk Time</p>
                    <h4>
                      {result.ZOngCallingIncomming} /{" "}
                      {result.ZOngCallingIncommingToday}
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/telephonecallIcon.png"
                      alt="icon"
                    />
                    <p>AT Calls</p>
                    <h4>0 / 0</h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/atcallIcon.png"
                      alt="icon"
                    />
                    <p>90+ Sec</p>
                    <h4>0 / 0</h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/telephonecallIcon.png"
                      alt="icon"
                    />
                    <p>CC</p>
                    <h4>
                      {result.TotalConnectedCallData} /{" "}
                      {result.TodayConnectedCallData}
                    </h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/icn-phone.png"
                      alt="icon"
                    />
                    <p>Phone</p>
                    <h4>{result.PhoneCountToday}</h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/icn-whatsapp.png"
                      alt="icon"
                    />
                    <p>Whatsapp</p>
                    <h4>{result.whatsappCountToday}</h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/icn-sms.png"
                      alt="icon"
                    />
                    <p>SMS</p>
                    <h4>{result.smsCountToday}</h4>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      style={{ width: 50 }}
                      src="FrontAsset/dist/img/icons/icn-envelope.png"
                      alt="icon"
                    />
                    <p>Email</p>
                    <h4>{result.emailCountToday}</h4>
                  </a>
                </li>
              </>
            </ul>
          </div>
        )}
      </div>

      {/* <div className="hk-row">
{
  TodosList.length === 0 ? (
    <></>
  ):(
    <><div className="col-md-6">

    {
    TodosList.length === 0 ? (
    <></>
    ):(
    <SalesTodos TodosData={DashboardTodos}/>
    )
    }
    </div></>
  )
}

<div className="col-md-3">

{
AssignLeadsList === '' ? '' : AssignLeadsList.length === 0 ? (
<></>
):(
<DataAnalytics CallDatax={DashboardLeads}/>
)
}
</div>
<div className="col-md-3">
{
AssignLeadsList === '' ? '' : AssignLeadsList.length === 0 ? (
<></>
):(
<HotLeadAnalysis CallDatax={DashboardLeads}/>
)
}
</div>
</div> */}

      <div className="hk-row">
        {/* {
CalingStatusList === '' ? '' : CalingStatusList.length === 0 ? (
<></>
):(
<DashboardDeals/>
)
} */}
      </div>
      <div className="hk-row">
        {AssignLeadsList.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <NavLink to="/list-assign-leads">
                  <div className="card-body">
                    <div className="align-items-center d-flex justify-content-between">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Assigned leads
                      </span>

                      <span className="badge badge-sm badge-info mb-md-10">
                        {result.assignTotal}{" "}
                      </span>
                    </div>
                    <div className="align-items-center d-flex justify-content-between">
                      <img
                        className="w-20"
                        src="FrontAsset/dist/img/icons/ASSIGNED-LEADSs.png"
                        alt="icon"
                      />
                      <div>
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">
                              {result.assignToday}
                            </span>
                          </span>
                          <small>Today</small>
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-super-database-report">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Client Database
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">
                      {result.TotalMyLead}
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
                          {result.TodayMyLead}
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

        {/* {NotIntersList.length === 0 ? (
<></>
):(
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-notinterested-leads">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Not intersted
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.TotalNotinter}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/NOT-INTERSTEDd.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            <span className="counter-anim">
              {result.TodayNotinter}
            </span>
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
)} */}

        {/* {MyLeadList.length === 0 ? (
<></>
) : (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-my-leads">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        My Leads
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.TotalMyLead}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/MY-LEADSs.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.TodayMyLead}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {/* {HotList.length === 0 ? (
<></>
) :  (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-hot-leads">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Hot Leads
      </span>

      <span className="badge badge-sm badge-danger mb-10">
        {result.TotalHotleads}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/HOT-LEADSs.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.TodayHotleads}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {/* {VirginList.length === 0 ? (
<></>
) : (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-virgin-leads">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Virgin Leads
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.untabbedLeadsAll}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/VIRGIN-LEADSs.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.untabbedLeadsToday}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {/* {DormantList.length === 0 ? (
<></>
) : (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-dorment-leads">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Dormant Leads
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.TotalDormentLeads}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/DORMANT-LEADSs.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.TodayDormentLeads}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {/* {ReminderList.length === 0 ? (
<></>
) : (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-reminders">
  <div className="card-body">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Reminders
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.ReminderCountAll}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/REMINDERs.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.ReminderCountToday}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {/* {ActivityList.length === 0 ? (
<></>
) : (
<div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<NavLink to="/list-activities">
  <div className="card-body pb-0">
    <div className="align-items-center d-flex justify-content-between">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Add Activty
      </span>

      <span className="badge badge-sm badge-info mb-10">
        {result.cusACtivityCountAll}
      </span>
    </div>
    <div className="align-items-center d-flex justify-content-between">
      <img
        className="w-20"
        src="FrontAsset/dist/img/icons/icn-activity.png"
        alt="icon"
      />
      <div>
        <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            {result.cusActivityCountToday}
          </span>
          <small>Today</small>
        </span>
      </div>
    </div>
  </div>
</NavLink>
</div>
</div>
) } */}

        {TransferList.length === 0 ? (
          <></>
        ) : (
          <div className="col-lg-2 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body pb-0">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="/list-transfer-leads">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      TRANSFER LEAD
                    </span>
                  </NavLink>
                  <span className="badge badge-sm badge-info mb-10">
                    {result.TotalTransferLeads}
                  </span>
                </div>
                <div className="align-items-center d-flex justify-content-between">
                  <img
                    className="w-20"
                    src="FrontAsset/dist/img/icons/Tramfer-LEad.png"
                    alt="icon"
                  />
                  <div>
                    <span className="d-block">
                      <span className="display-5 font-weight-400 text-dark">
                        {result.TodayTransferLeads}
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
          <div className="col-lg-2 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body pb-0">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="/list-view-deals">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      DEALS DONE
                    </span>
                  </NavLink>
                  <span className="badge badge-sm badge-info mb-10">
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
                    src="FrontAsset/dist/img/icons/Deals-Done.png"
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

        {CallingDataList.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-view-calling">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Calling Data
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">
                      {result.CallingCountTotal}
                    </span>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/Calling-Data.png"
                      alt="icon"
                    />
                    <div>
                      <span className="d-block">
                        <span className="display-5 font-weight-400 text-dark">
                          {result.CallingCountToday}
                        </span>
                        <small>Today</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/calling-analytics">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Calling Analytics
                      </span>
                    </NavLink>
                    <span className="badge badge-sm badge-info mb-10">0</span>
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

            {/* <div className="col-lg-2 col-sm-6 col-6">
<div className="card card-sm">
<div className="card-body pb-0">
  <div className="align-items-center d-flex justify-content-between">
    <NavLink to="/list-self-leads">
      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
        Self Leads
      </span>
    </NavLink>
    <span className="badge badge-sm badge-info mb-10">
      0
    </span>
  </div>
  <div className="align-items-center d-flex justify-content-between">
    <img
      className="w-20"
      src="FrontAsset/dist/img/icons/Calling-Data.png"
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
</div> */}
          </>
        )}

        {FacebookChatList.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="#" onClick={handleShow}>
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Fb Chat
                      </span>
                    </NavLink>
                    {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      {/* <span className="d-block">
        <span className="display-5 font-weight-400 text-dark">
          0
        </span>
        <small>Today</small>
      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-super-database-reports">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Superdatabase Report
                      </span>
                    </NavLink>
                    {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      {/* <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            0
          </span>
          <small>Today</small>
        </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {CallStatusReportsList.length === 0 ? (
          <></>
        ) : (
          <div className="col-lg-2 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body pb-0">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="/list-status-report">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Call Status Report
                    </span>
                  </NavLink>
                  {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                </div>
                <div className="align-items-center d-flex justify-content-between">
                  <img
                    className="w-20"
                    src="FrontAsset/dist/img/icons/CALL-STATUS-REPORTt.png"
                    alt="icon"
                  />
                  <div>
                    {/* <span className="d-block">
        <span className="display-5 font-weight-400 text-dark">
          0
        </span>
        <small>Today</small>
      </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {CallStatusReportsList.length === 0 ? (
          <></>
        ) : (
          <div className="col-lg-2 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body pb-0">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="/leads-status-report">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Lead Status Report
                    </span>
                  </NavLink>
                  {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                </div>
                <div className="align-items-center d-flex justify-content-between">
                  <img
                    className="w-20"
                    src="FrontAsset/dist/img/icons/icn-transfer.png"
                    alt="icon"
                  />
                  <div>
                    {/* <span className="d-block">
        <span className="display-5 font-weight-400 text-dark">
          0
        </span>
        <small>Today</small>
      </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {DailyLeadsReportsList.length === 0 ? (
          <></>
        ) : (
          <div className="col-lg-2 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body pb-0">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="/list-daily-leads-report">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Daily Leads Report
                    </span>
                  </NavLink>
                  {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                </div>
                <div className="align-items-center d-flex justify-content-between">
                  <img
                    className="w-20"
                    src="FrontAsset/dist/img/icons/icn-transfer.png"
                    alt="icon"
                  />
                  <div>
                    {/* <span className="d-block">
        <span className="display-5 font-weight-400 text-dark">
          0
        </span>
        <small>Today</small>
      </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {SuperDatabaseReportsList.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-import-database-leads-report">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Import Leads Report
                      </span>
                    </NavLink>
                    {/* <span className="badge badge-sm badge-info mb-10">0</span> */}
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      {/* <span className="d-block">
          <span className="display-5 font-weight-400 text-dark">
            0
          </span>
          <small>Today</small>
        </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {Kpireportlst.length === 0 ? (
          <></>
        ) : (
          <>
            <div className="col-lg-2 col-sm-6 col-6">
              <div className="card card-sm">
                <div className="card-body pb-0">
                  <div className="align-items-center d-flex justify-content-between">
                    <NavLink to="/list-kpis-report">
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        KPIS Report
                      </span>
                    </NavLink>
                  </div>
                  <div className="align-items-center d-flex justify-content-between">
                    <img
                      className="w-20"
                      src="FrontAsset/dist/img/icons/icn-transfer.png"
                      alt="icon"
                    />
                    <div>
                      <span className="d-block"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="col-lg-2 col-sm-6 col-6">
          <div className="card card-sm">
            <div className="card-body pb-0">
              <div className="align-items-center d-flex justify-content-between">
                <NavLink to="/purchase-request-form-list">
                  <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                    Requirement Form
                  </span>
                </NavLink>
                {/* <span className="badge badge-sm badge-info mb-10">Total 0</span> */}
              </div>
              <div className="align-items-center d-flex justify-content-between">
                <img
                  className="w-20"
                  src="FrontAsset/dist/img/icons/icn-transfer.png"
                  alt="icon"
                />
                <div>
                  {/* <span className="d-block">
<span className="display-5 font-weight-400 text-dark">0</span>
<small>Today</small>
</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Online Lead Form Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addFacebookChat}>
            <div class="form-group col-md-12">
              <label for="inputPassword4">Lead Types*</label>
              <select
                name="LeadTypes"
                id="LeadTypes"
                className="form-control"
                onChange={(e) => setLeadTypes(e.target.value)}
                value={LeadTypes}
                required
              >
                <option value="" selected>
                  Select Option
                </option>
                <option value="facebook-chat">Facebook Chat</option>
                <option value="youtube">Youtube</option>
                <option value="social-media-incoming">
                  Social Media Incoming
                </option>
                <option value="tv-show">TV Show</option>
                <option value="paragon-201">Paragon 201</option>
              </select>
            </div>

            <div class="form-group col-md-12">
              <label for="inputPassword4">Client Name*</label>
              <input
                type="text"
                class="form-control"
                name="clientName"
                placeholder="Client Name"
                required
                autocomplete="off"
                onChange={(e) => setClientName(e.target.value)}
                value={ClientName}
              />
            </div>

            <div class="form-group col-md-12">
              <label for="inputPassword4">Client No*</label>
              <input
                type="number"
                class="form-control"
                name="clientNo"
                placeholder="Client No"
                required
                autocomplete="off"
                onChange={(e) => setClientNo(e.target.value)}
                value={ClientNo}
              />
            </div>

            <div class="form-group col-md-12">
              <label for="inputPassword4">Client Email</label>
              <input
                type="text"
                class="form-control"
                name="clientEmail"
                placeholder="Client Email"
                autocomplete="off"
                onChange={(e) => setClientEmail(e.target.value)}
                value={ClientEmail}
              />
            </div>
            <div class="form-group col-md-12">
              <label for="inputPassword4">Project Name*</label>
              <input
                type="text"
                class="form-control"
                name="projectName"
                placeholder="Project Name"
                required
                autocomplete="off"
                onChange={(e) => setClientProject(e.target.value)}
                value={ClientProject}
              />
            </div>
            <div class="form-group col-md-12">
              <label for="inputPassword4">Client Designation*</label>
              <input
                type="text"
                class="form-control"
                name="clientDesignation"
                placeholder="Client Designation"
                required
                autocomplete="off"
                onChange={(e) => setClientDesignation(e.target.value)}
                value={ClientDesignation}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DashboardBox;
