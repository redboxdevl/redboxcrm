import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import "bootstrap-daterangepicker/daterangepicker.css";
import { KPIReportAction } from "../../redux/action/KPIReportAction";
import { Link, useNavigate } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment/moment";
import LoadingSpinner from "../FinanceDashboard/LoadingSpinner";

const KpiReports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const EmpData = JSON.parse(localStorage.getItem("empTeam"));

  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const resultKPIREPORT = useSelector((state) => state.Kpireducers.kpireport);
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  // const DashboardData = useSelector(state => state.dashCountReducer.dashboardcount);
  const SuperCon =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.role_id == 3 || edx.role_id == 4
        );

  console.log("SuperCon", SuperCon);

  const [SalesConsul, setSalesConsul] = useState("");
  const [ReportType, setReportType] = useState("daily");
  const [dateWise, setdateWise] = useState("");
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [GroupMemberid, setGroupMemberid] = useState("");
  const [NoOfDays, setNoOfDays] = useState("");
  const [LeadNature, setLeadNature] = useState("");
  const [CallAttemptCalls, setCallAttemptCalls] = useState(100);
  const [CC30Sec, setCC30Sec] = useState(50);
  const [CC90Sec, setCC90Sec] = useState(30);
  const [MettingAlign, setMettingAlign] = useState(5);
  const [MettingDone, setMettingDone] = useState(2);
  const [RangeDays, setRangeDays] = useState(2);
  const [LoadingS, setLoadingS] = useState(false);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (!localStorage.getItem("authdata")) {
      navigate("/");
    } else {
      if (SuperCon.length == 0) {
        if (EmpData === null || EmpData === "") {
          dispatch(
            KPIReportAction(
              AuthData.id == 38 ? "all" : AuthData.id,
              ReportType,
              SalesConsul,
              GroupMemberid == "" || GroupMemberid == null ? "" : GroupMemberid,
              StartDates,
              EndDate,
              NoOfDays,
              AuthData.company_id
            )
          );
        } else {
          dispatch(
            KPIReportAction(
              "all",
              ReportType,
              SalesConsul,
              GroupMemberid == "" || GroupMemberid == null
                ? EmpData.teamObj
                : GroupMemberid,
              StartDates,
              EndDate,
              NoOfDays,
              AuthData.company_id
            )
          );
        }
      } else {
        dispatch(
          KPIReportAction(
            "all",
            ReportType,
            SalesConsul,
            GroupMemberid == "" || GroupMemberid == null ? "" : GroupMemberid,
            StartDates,
            EndDate,
            NoOfDays,
            AuthData.company_id
          )
        );
      }
    }
  }, []);
  // SuperCon == '' || SuperCon == null ? '' : SuperCon,EmpData == '' || EmpData == null ? '' : EmpData
  const handleSearch = () => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    setNoOfDays(RangeDays);
    if (!localStorage.getItem("authdata")) {
      navigate("/");
    } else {
      if (SuperCon.length === 0) {
        if (EmpData === null || EmpData === "") {
          dispatch(
            KPIReportAction(
              AuthData.id == 38 ? "all" : AuthData.id,
              ReportType,
              SalesConsul,
              GroupMemberid == "" || GroupMemberid == null ? "" : GroupMemberid,
              StartDates,
              EndDate,
              NoOfDays,
              AuthData.company_id
            )
          );
        } else {
          dispatch(
            KPIReportAction(
              "all",
              ReportType,
              SalesConsul,
              GroupMemberid == "" || GroupMemberid == null
                ? EmpData.teamObj
                : GroupMemberid,
              StartDates,
              EndDate,
              NoOfDays,
              AuthData.company_id
            )
          );
        }
      } else {
        dispatch(
          KPIReportAction(
            "all",
            ReportType,
            SalesConsul,
            GroupMemberid == "" || GroupMemberid == null ? "" : GroupMemberid,
            StartDates,
            EndDate,
            NoOfDays
          )
        );
      }
    }
  };

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

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

    const diffInDays = moment(EndDate).diff(moment(startDate), "days");
    setRangeDays(diffInDays + 1);

    console.log("diffInDays", diffInDays);
    setStartDate(startDate);
    setEndDate(EndDate);
  };

  const locale = {
    format: "YYYY-MM-DD",
  };

  console.log("resultKPIREPORT", resultKPIREPORT);

  return (
    <>
      <Navigation />

      {LoadingS == true ? <LoadingSpinner /> : ""}

      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">KPIS Report</h2>
          </div>
          <div>
            <Link to="/kpis-graphs" className="btn btn-primary">
              KPIS Graphs
            </Link>
          </div>
        </div>

        <div class="row pb-3">
          <div class="col-md-3">
            <div class="form-group">
              <label for="">Consultants</label>
              <select
                name="ConsultantNmae"
                id=""
                class="form-control"
                onChange={(e) => setSalesConsul(e.target.value)}
              >
                <option value="">Select All</option>
                {resultlistdashboard == "" ||
                resultlistdashboard == null ||
                resultlistdashboard == undefined ||
                resultlistdashboard.code == "ERR_NETWORK" ? (
                  <></>
                ) : (
                  resultlistdashboard.empAll.map((items, key) => {
                    return items.id == "" ? (
                      <></>
                    ) : (
                      <option value={items.id} key={key + 1}>
                        {items.emp_name}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>

          <div class="col-md-2">
            <div class="form-group">
              <label for="">Team Leader</label>
              <select
                name="GroupMemberid"
                id=""
                className="form-control"
                onChange={(e) => setGroupMemberid(e.target.value)}
                value={GroupMemberid}
              >
                <option value="">Select Option</option>
                {resultlistdashboard == "" ||
                resultlistdashboard == null ||
                resultlistdashboard == undefined ||
                resultlistdashboard.code == "ERR_NETWORK" ? (
                  <></>
                ) : (
                  resultlistdashboard.empTeam.map((items, key) => {
                    return items.id == "" ? (
                      <></>
                    ) : (
                      <option value={items.teamObj} key={key + 1}>
                        {items.get_employees_details == "" ||
                        items.get_employees_details == null
                          ? ""
                          : items.get_employees_details.emp_name}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>

          {/* <div class="col-md-2">
<div class="form-group">
<label for="">Report Type</label>
<select name="ReportType" id="" class="form-control" onChange={(e) => setReportType(e.target.value)} value={ReportType}>
<option value="">Select Option</option>
<option value="monthly">Monthly</option>
<option value="daily">Daily</option>
</select>
</div>
</div> */}

          <div class="col-md-2">
            <div class="form-group">
              <label for="">Lead Nature</label>
              <select
                name="LeadNature"
                id=""
                class="form-control"
                onChange={(e) => setLeadNature(e.target.value)}
                value={LeadNature}
              >
                <option value="">Select Option</option>
                <option value="Fresh">Fresh</option>
                <option value="Old">Old</option>
              </select>
            </div>
          </div>

          <div className="col-md-3">
            <div class="form-group">
              <label for="clientName">
                DateRange<span class="text-danger">*</span>
              </label>
              <DateRangePicker
                initialSettings={{
                  startDate: true,
                  endDate: true,
                  timePicker: false,
                  timePicker24Hour: false,
                  locale,
                }}
                onCallback={onApply}
                handleEvent={handleEvent}
              >
                <input class="form-control" type="text" />
              </DateRangePicker>
            </div>
          </div>

          <div class="col-md-2">
            <div class="form-group" style={{ marginTop: "33px" }}>
              <button
                type="submit"
                name="find"
                class="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="table-wrap table-responsive">
              <table className="table table-hover w-100 display pb-30">
                <thead className="thead-dark">
                  <tr>
                    <th>Sales Consultant</th>
                    <th>ASSIGN LEADS</th>
                    <th>TLW</th>
                    <th>Not Intersted</th>
                    <th>Affiliate</th>
                    <th>Attempted Calls</th>
                    <th>CC 30+ Sec</th>
                    <th>VC 90+ Sec</th>
                    <th>Metting Aligned</th>
                    <th>Metting Done</th>
                    <th>Talk Time</th>
                    <th>Incomming Talk Time</th>
                    <th>Lead Added (self)</th>
                    <th>Transfer Leads</th>
                    <th>Percentage (AT Calls vs MA)</th>
                    <th>Total KPI Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {resultKPIREPORT.data === null ||
                  resultKPIREPORT === null ||
                  resultKPIREPORT === "" ||
                  resultKPIREPORT === undefined ||
                  resultKPIREPORT.data === undefined ||
                  resultKPIREPORT.length == 0 ||
                  resultKPIREPORT.data.length == 0 ? (
                    <>Loading.....</>
                  ) : resultKPIREPORT.data.records.length > 0 ? (
                    resultKPIREPORT.data.records.map((curElem, index) => {
                      var myNofDa = 0;
                      var myNofDa2 = 0;
                      var myNofDa3 = 0;
                      var myNofDa4 = 0;
                      if (NoOfDays == null || NoOfDays == "") {
                        myNofDa = 50;
                        myNofDa2 = 80;
                        myNofDa3 = 99;
                        myNofDa4 = 100;
                      } else {
                        myNofDa = 50 * NoOfDays;
                        myNofDa2 = 80 * NoOfDays;
                        myNofDa3 = 99 * NoOfDays;
                        myNofDa4 = 100 * NoOfDays;
                      }

                      return (
                        <tr>
                          <td>{curElem.emp_name}</td>
                          <td>{curElem.todayAssignLeads}</td>
                          <td>
                            <Link to={`/tlw-history/${curElem.id}`}>
                              {curElem.totalLeadWork}
                            </Link>
                          </td>
                          <td>{curElem.ListNotInterested}</td>
                          <td>0</td>
                          <td
                            className={`${
                              curElem.AttemptedPercentage <= myNofDa
                                ? "RedClass"
                                : curElem.AttemptedPercentage >= myNofDa &&
                                  curElem.AttemptedPercentage <= myNofDa2
                                ? "YellowClass"
                                : curElem.AttemptedPercentage >= myNofDa2 &&
                                  curElem.AttemptedPercentage <= myNofDa3
                                ? "LightGreen"
                                : curElem.AttemptedPercentage >= myNofDa3 &&
                                  curElem.AttemptedPercentage <= myNofDa4
                                ? "SolidGreen"
                                : "SolidGreen"
                            }`}
                          >
                            <b>
                              <span className={`badge badge-primary`}>
                                {NoOfDays == "" || NoOfDays == null
                                  ? CallAttemptCalls
                                  : CallAttemptCalls * NoOfDays}
                              </span>{" "}
                              / {curElem.AttemptedCall} <br />
                            </b>
                          </td>
                          <td
                            className={`${
                              curElem.connectedCallsPercentage <= myNofDa
                                ? "RedClass"
                                : curElem.connectedCallsPercentage >= myNofDa &&
                                  curElem.connectedCallsPercentage <= myNofDa2
                                ? "YellowClass"
                                : curElem.connectedCallsPercentage >=
                                    myNofDa2 &&
                                  curElem.connectedCallsPercentage <= myNofDa3
                                ? "LightGreen"
                                : curElem.connectedCallsPercentage >=
                                    myNofDa3 &&
                                  curElem.connectedCallsPercentage <= myNofDa4
                                ? "SolidGreen"
                                : "SolidGreen"
                            }`}
                          >
                            <b>
                              <span className={`badge badge-primary`}>
                                {NoOfDays == "" || NoOfDays == null
                                  ? CC30Sec
                                  : CC30Sec * NoOfDays}
                              </span>{" "}
                              / {curElem.connectedCalls} <br />
                            </b>
                          </td>
                          <td
                            className={`${
                              curElem.VerifiedCallsPercentage <= myNofDa
                                ? "RedClass"
                                : curElem.VerifiedCallsPercentage >= myNofDa &&
                                  curElem.VerifiedCallsPercentage <= myNofDa2
                                ? "YellowClass"
                                : curElem.VerifiedCallsPercentage >= myNofDa2 &&
                                  curElem.VerifiedCallsPercentage <= myNofDa3
                                ? "LightGreen"
                                : curElem.VerifiedCallsPercentage >= myNofDa3 &&
                                  curElem.VerifiedCallsPercentage <= myNofDa4
                                ? "SolidGreen"
                                : "SolidGreen"
                            }`}
                          >
                            <b>
                              <span className={`badge badge-primary`}>
                                {NoOfDays == "" || NoOfDays == null
                                  ? CC90Sec
                                  : CC90Sec * NoOfDays}
                              </span>{" "}
                              / {curElem.VerifiedCalls} <br />
                            </b>
                          </td>
                          <td
                            className={`${
                              curElem.mettingAllignedPercentage <= myNofDa
                                ? "RedClass"
                                : curElem.mettingAllignedPercentage >=
                                    myNofDa &&
                                  curElem.mettingAllignedPercentage <= myNofDa2
                                ? "YellowClass"
                                : curElem.mettingAllignedPercentage >=
                                    myNofDa2 &&
                                  curElem.mettingAllignedPercentage <= myNofDa3
                                ? "LightGreen"
                                : curElem.mettingAllignedPercentage >=
                                    myNofDa3 &&
                                  curElem.mettingAllignedPercentage <= myNofDa4
                                ? "SolidGreen"
                                : "SolidGreen"
                            }`}
                          >
                            <Link to={``}>
                              <b>
                                <span className={`badge badge-primary`}>
                                  {NoOfDays == "" || NoOfDays == null
                                    ? MettingAlign
                                    : MettingAlign * NoOfDays}
                                </span>{" "}
                                / {curElem.mettingAlligned} <br />
                              </b>
                            </Link>
                          </td>
                          <td
                            className={`${
                              curElem.mettingDonePercentage <= myNofDa
                                ? "RedClass"
                                : curElem.mettingDonePercentage >= myNofDa &&
                                  curElem.mettingDonePercentage <= myNofDa2
                                ? "YellowClass"
                                : curElem.mettingDonePercentage >= myNofDa2 &&
                                  curElem.mettingDonePercentage <= myNofDa3
                                ? "LightGreen"
                                : curElem.mettingDonePercentage >= myNofDa3 &&
                                  curElem.mettingDonePercentage <= myNofDa4
                                ? "SolidGreen"
                                : "SolidGreen"
                            }`}
                          >
                            <Link to={``}>
                              <b>
                                <span className={`badge badge-primary`}>
                                  {NoOfDays == "" || NoOfDays == null
                                    ? MettingDone
                                    : MettingDone * NoOfDays}
                                </span>{" "}
                                / {curElem.mettingDone} <br />
                              </b>
                            </Link>
                          </td>
                          <td style={{ width: "14%" }}>
                            <Link
                              to={`/talktime-history?id=${curElem.id}&datefrom=${StartDates}&dateto=${EndDate}`}
                            >
                              <b>
                                <span className={`badge badge-primary`}>
                                  {NoOfDays == "" || NoOfDays == null
                                    ? "1:00:00"
                                    : `${NoOfDays}:00:00`}
                                </span>{" "}
                                /{" "}
                                {curElem.TalkTime === 0 ? (
                                  <>0</>
                                ) : (
                                  curElem.TalkTime
                                )}{" "}
                                <br />
                              </b>
                            </Link>
                          </td>
                          <td style={{ width: "14%" }}>
                            <Link
                              to={`/talktime-history?id=${curElem.id}&datefrom=${StartDates}&dateto=${EndDate}`}
                            >
                              <b>
                                <span className={`badge badge-primary`}>
                                  {NoOfDays == "" || NoOfDays == null
                                    ? "1:00:00"
                                    : `${NoOfDays}:00:00`}
                                </span>{" "}
                                /{" "}
                                {curElem.incommingTalkTime === 0 ? (
                                  <>0</>
                                ) : (
                                  curElem.incommingTalkTime
                                )}{" "}
                                <br />
                              </b>
                            </Link>
                          </td>
                          <td>
                            <b>
                              <span className={`badge badge-primary`}>
                                {ReportType === "monthly" ? 260 : 10}
                              </span>{" "}
                              / {curElem.SelfLead} <br />
                            </b>
                          </td>
                          <td>
                            <span className="badge badge-primary">100</span> / 0
                          </td>
                          <td>{curElem.atVsMaPercentage} %</td>
                          <td>{curElem.TotalKpiCompletion} %</td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan="10">
                          <b>No record Found....</b>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>

                <tfoot style={{ background: "orange" }}>
                  <tr>
                    <td>TOTAL</td>
                    <td>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.totalAssignLeads}
                    </td>
                    <td>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.tlwTotal}
                    </td>
                    <td>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.totalNotiNterstedLeads}
                    </td>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.attemptedCallTotal}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.CCSecTotal}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.CC90SecTotal}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.MettingAlignTotal}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.MettingDoneTotal}
                    </th>
                    <th>0</th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.TotalTalkTime}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.totalTalkTimeInc}
                    </th>
                    <th>
                      {resultKPIREPORT == "" ||
                      resultKPIREPORT == null ||
                      resultKPIREPORT.code == "ERR_BAD_RESPONSE"
                        ? 0
                        : resultKPIREPORT.data.TotalLeadSelf}
                    </th>

                    <th>0</th>
                    <th>0</th>
                    <th>0</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="col-md-6"></div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
};

export default KpiReports;
