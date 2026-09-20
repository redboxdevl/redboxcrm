import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import { getDashCountData } from "../../redux/action/DashboardCountAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { ListStatusReportAction } from "../../redux/action/ListStatusReportAction";
import LIstReportingSkeleton from "./Skeleton/LIstReportingSkeleton";
import { loadingToggleAction } from "../../redux/action/ListStatusReportAction";
import { Link } from "react-router-dom";
import LoadingSpinner from "../FinanceDashboard/LoadingSpinner";
import moment from "moment";

function ListStatusReport() {
  const [search, setSearch] = useState("");
  const [Gettimes, setGettimes] = useState([]);
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [LoadingS, setLoadingS] = useState(false);
  // const [Loading,setLoading]= useState(true);

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

  const resultDashboard = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const resultliststatusreport = useSelector(
    (state) => state.ListStatusReportReducers.liststatusreport
  );
  console.log("resultliststatusreport", resultliststatusreport);
  const showLoading = useSelector(
    (state) => state.ListStatusReportReducers.showloading
  );

  const dispatch = useDispatch();

  const SuperCon =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id === 3 || edx.role_id === 4 || edx.feature_id == 145
        );

  const CallingX =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.module_id == 10 && edx.feature_id == 157
        );

  const EmpData = JSON.parse(localStorage.getItem("empTeam"));

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingS(true);
    dispatch(loadingToggleAction(true));
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (SuperCon.length === 0) {
      if (EmpData == "" || EmpData == null) {
        dispatch(ListStatusReportAction(AuthData.id, "", StartDates, EndDate));
      } else {
        dispatch(
          ListStatusReportAction("all", EmpData.teamObj, StartDates, EndDate)
        );
      }
    } else {
      dispatch(ListStatusReportAction("all", "", StartDates, EndDate));
    }
  };

  useEffect(() => {
    dispatch(loadingToggleAction(false));

    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (SuperCon.length === 0) {
      if (EmpData == "" || EmpData == null) {
        dispatch(ListStatusReportAction(AuthData.id, "", StartDates, EndDate));
      } else {
        dispatch(
          ListStatusReportAction("all", EmpData.teamObj, StartDates, EndDate)
        );
      }
    } else {
      dispatch(ListStatusReportAction("all", "", StartDates, EndDate));
    }
  }, []);

  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  console.log("showLoading", showLoading);

  let totalAssign = 0;
  let totalOutgoing = 0;
  let totalConnected = 0;
  let totalFollowup = 0;
  let totalIncoming = 0;
  let totalIncomingAnsw = 0;
  let totalIncomingMiss = 0;
  let totaloutgtime = "";

  let Gettimesx = [];
  let Gettimesxxs = [];

  const calculateTotalTime = (Gettimesxx) => {
    const totalSeconds = Gettimesxx.reduce((acc, time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return acc + hours * 3600 + minutes * 60 + seconds;
    }, 0);

    // Convert total seconds to hh:mm:ss
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <>
      <Navigation />

      {showLoading == true ? <LoadingSpinner /> : ""}

      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
          <div>
            <h2 className="hk-pg-title font-weight-600">
              Call Status Reporting
            </h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="">Search Anything</label>
              {/* <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/> */}
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
          <div className="col-sm">
            <div className="table-wrap">
              <table
                id="datable_1"
                className="table table-hover w-100 display pb-30"
              >
                <thead className="thead-dark">
                  <tr>
                    <th>AGENT</th>
                    <th>ASSIGN LEADS</th>
                    <th>T.OUTGOING</th>
                    <th>CONNECTED</th>
                    <th>FOLLOW UP</th>
                    <th>TALK TIME</th>
                    <th>INCOMING</th>
                    <th>ANSWERED</th>
                    <th>MISSED</th>
                    <th>CALL BACK</th>
                    <th>INC TALK TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {resultliststatusreport == null ||
                  resultliststatusreport == "" ||
                  resultliststatusreport == undefined ||
                  resultliststatusreport?.code == "ERR_BAD_REQUEST" ||
                  resultliststatusreport?.code == "ECONNABORTED" ||
                  resultliststatusreport?.code == "ERR_NETWORK" ||
                  resultliststatusreport?.length == 0 ||
                  resultliststatusreport?.code == "ERR_BAD_RESPONSE"
                    ? ""
                    : resultliststatusreport?.data.map((curElem, index) => {
                        totalAssign += curElem.todayAssignLeads;

                        totalOutgoing += curElem.totalOutGoing;
                        totalConnected += curElem.totalConnected;
                        totalFollowup += curElem.followupCalls;

                        totalIncoming += curElem.totalIcomming;
                        totalIncomingAnsw += curElem.totalIcommingAns;
                        totalIncomingMiss += curElem.totalMissedData;

                        totaloutgtime += curElem.outgoingTawkTimed;

                        Gettimesx.push(curElem.outgoingTawkTime);
                        Gettimesxxs.push(curElem.incommingTawkTime);

                        return (
                          <>
                            <tr>
                              <td>{curElem.emp_name}</td>
                              <td>{curElem.todayAssignLeads}</td>
                              <td>{curElem.totalOutGoing}</td>
                              <td>{curElem.totalConnected}</td>
                              <td>{curElem.followupCalls}</td>
                              <td>{curElem.outgoingTawkTime}</td>
                              <td>{curElem.totalIcomming}</td>
                              <td>{curElem.totalIcommingAns}</td>
                              <td>{curElem.totalMissedData}</td>
                              <td>{curElem.totalcallback}</td>
                              <td>{curElem.incommingTawkTime}</td>
                            </tr>
                          </>
                        );
                      })}
                </tbody>
                <tfoot style={{ background: "orange" }}>
                  <tr>
                    <td>TOTAL</td>
                    <td>{totalAssign}</td>
                    <td>{totalOutgoing}</td>
                    <td>{totalConnected}</td>
                    <td>{totalFollowup}</td>
                    <td>{calculateTotalTime(Gettimesx)}</td>
                    <td>{totalIncoming}</td>
                    <td>{totalIncomingAnsw}</td>
                    <td>{totalIncomingMiss}</td>
                    <td>0</td>
                    <td>{calculateTotalTime(Gettimesxxs)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListStatusReport;
