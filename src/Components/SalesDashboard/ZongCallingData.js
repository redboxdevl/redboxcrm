import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
// import VirginData from './AssignLeads/VirginData';
import Navigation from "../../Includes/Navigation";
import { useNavigate, NavLink } from "react-router-dom";
import { AssignLeadsAction } from "../../redux/action/AssignLeadsAction";
import { NotinterestedReasonAction } from "../../redux/action/NotinterestedReasonAction";
import { CallingActions } from "../../redux/action/CallingActions";
import $ from "jquery";
import ReactPaginate from "react-paginate";
import { actionConfig } from "../../configuration";
import { ZongCallingDataAction } from "../../redux/action/ZongCallingDataAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import axios from "axios";

const initialValues = {
  clientName: "",
  ProjectName: "",
};

const ZongCallingData = ({ setsList }) => {
  const audioRef = useRef();

  const navigate = useNavigate();

  const AuthDataxs = JSON.parse(localStorage.getItem("authdata"));

  const ZongCallingResult = useSelector(
    (state) => state.ZoneCallingreducers.zongcallingdata
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const DashboardData = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );

  const dispatch = useDispatch();

  const ModuleNameGet =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.role_id == 3 || edx.role_id == 4 || edx.feature_id == 145
        );

  // const ModuleNameGets = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4 && edx.module_id == 10);

  console.log("resultRolePermssion", resultRolePermssion);

  const ModFIlters =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.module_id == 10 && edx.role_id == 18
        );

  const CallingX =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.module_id == 10 && edx.feature_id == 157
        );
  console.log("CallingX", CallingX);
  const [Employeeresult, setEmployeeresult] = useState([]);

  const GetEmployeeData = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const response = await axios(`${actionConfig.REACT_APP_URL}listemployee`, {
      cancelToken: source.token,
    })
      .then((res) => {
        return res.data;
      })
      .catch((thrown) => {
        return thrown;
      });
    setEmployeeresult(response.data);
  };

  useEffect(() => {
    GetEmployeeData();
  }, []);

  const [ClientName, setClientName] = useState("");
  const [ProjectName, setProjectName] = useState("");
  const [Callback, setCallback] = useState("");
  const [Source, setSource] = useState("");
  const [Quality, setQuality] = useState("");
  const [Comment, setComment] = useState("");
  const [CommentStatus, setCommentStatus] = useState("");
  const [ClientStatus, setClientStatus] = useState("");
  const [search, setSearch] = useState("");
  const [Type, setType] = useState("");
  const [Consultant, setConsultant] = useState("");
  const [Project, setProject] = useState("");
  const [CallbackFilter, setCallbackFilter] = useState("");
  const [SearchDate, setSearchDate] = useState("");
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Status, setStatus] = useState("");

  console.log("resultRolePermssion", resultRolePermssion);
  const EmpData = JSON.parse(localStorage.getItem("empTeam"));
  // const empTeam = [3455,3463,3444,3434,3440,3454,3435,3423,31,3446,3436,3461,3399,23,3464];

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    console.log("AuthData", AuthData);
    if (ModuleNameGet.length == 0) {
      if (EmpData == "" || EmpData == null) {
        dispatch(
          ZongCallingDataAction(
            AuthData.outgoingPhone,
            1,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            "",
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          ZongCallingDataAction(
            "all",
            1,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            EmpData.teamObj,
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        ZongCallingDataAction(
          "all",
          1,
          12,
          search,
          Type,
          Source,
          CommentStatus,
          Consultant,
          Project,
          SearchDate,
          "",
          StartDates,
          EndDate,
          Status,
          AuthData.company_id
        )
      );
    }

    const interval = setInterval(() => {}, 3000);
    return () => clearInterval(interval);
  }, []);

  //   console.log(ZongCallingResult);

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

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (ModuleNameGet.length == 0) {
      if (EmpData == "" || EmpData == null) {
        dispatch(
          ZongCallingDataAction(
            AuthData.outgoingPhone,
            currentPage,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            "",
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          ZongCallingDataAction(
            "all",
            currentPage,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            EmpData.teamObj,
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        ZongCallingDataAction(
          "all",
          currentPage,
          12,
          search,
          Type,
          Source,
          CommentStatus,
          Consultant,
          Project,
          SearchDate,
          "",
          StartDates,
          EndDate,
          Status,
          AuthData.company_id
        )
      );
    }
  };

  const [items, setitems] = useState([]);

  const handleInputChange = (e, i) => {
    const { value, name } = e.target;
    setClientName(e.target.getAttribute("ClientName"));
    const newState = [...items];
    newState[i] = {
      ...newState[i],
      [name]: value,
      id: e.target.getAttribute("attId"),
    };
    console.log("name", e.target.name);
    setitems(newState);
  };

  const UpdateCalling = (e) => {
    e.preventDefault();
    const FeildData = { items: items };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}ZongDataUpdate`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        console.log(dataex);
        if (dataex.code == 200) {
          Swal.fire("Good job!", dataex.message, "success");
          // navigate("/list-view-calling");
          ZongCallingDataAction("all", 1, 12, "");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };
  console.log("ModFIlters", ModFIlters);

  const handleSearch = async (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (ModuleNameGet.length == 0) {
      if (EmpData == "" || EmpData == null) {
        dispatch(
          ZongCallingDataAction(
            AuthData.outgoingPhone,
            1,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            "",
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          ZongCallingDataAction(
            "all",
            1,
            12,
            search,
            Type,
            Source,
            CommentStatus,
            Consultant,
            Project,
            SearchDate,
            EmpData.teamObj,
            StartDates,
            EndDate,
            Status,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        ZongCallingDataAction(
          "all",
          1,
          12,
          search,
          Type,
          Source,
          CommentStatus,
          Consultant,
          Project,
          SearchDate,
          "",
          StartDates,
          EndDate,
          Status,
          AuthData.company_id
        )
      );
    }
  };

  console.log("ZongCallingResult", ZongCallingResult);
  const FacebookChatList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 145 && edx.sub_features === "List"
        );

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

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">All Calling Data</h2>
          </div>
          {FacebookChatList.length === 0 ? (
            <></>
          ) : (
            <>
              <div>
                <a
                  href="javascript:;"
                  className="btn btn-primary btn-sm"
                  onClick={UpdateCalling}
                >
                  Update
                </a>
                <button
                  className="btn btn-danger mr-1"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `${actionConfig.REACT_APP_URL}listcallingdataexport?type=${Type}&agent=${Consultant}&status=${Status}&fdate=${StartDates}&edate=${EndDate}`;
                  }}
                >
                  Export
                </button>
              </div>
            </>
          )}
        </div>

        <div class="row pb-3">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Search Client No</label>
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Enter Client No"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="">Type</label>
              <select
                name="TypeName"
                class="form-control"
                onChange={(e) => setType(e.target.value)}
                value={Type}
              >
                <option value="">Select All</option>
                <option value="Outgoing Calls">Outgoing Calls</option>
                <option value="Incomming Calls">Incomming Calls</option>
              </select>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <label for="">Consultants</label>
              <select
                name="ConsultantNmae"
                id=""
                class="form-control"
                onChange={(e) => setConsultant(e.target.value)}
                value={Consultant}
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

          <div class="col-md-3">
            <div class="form-group">
              <label for="">Source</label>
              <select
                name="sourceName"
                class="form-control"
                onChange={(e) => setSource(e.target.value)}
                value={Source}
              >
                <option value="">Select All</option>
                <option value="youtube">youtube</option>
                <option value="social media">social media</option>
                <option value="sms">sms</option>
                <option value="web">web</option>
                <option value="reference">reference</option>
                <option value="follow-up">Follow Up</option>
                <option value="personal-call">Personal Call</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <label for="">Status</label>
              <select
                name="Status"
                class="form-control"
                onChange={(e) => setStatus(e.target.value)}
                value={Status}
              >
                <option value="">Select All</option>
                <option value="Missed">Missed</option>
                <option value="Connected">Connected</option>
                <option value="Answered">Answered</option>
              </select>
            </div>
          </div>
          <div class="col-md-3">
            <div
              class="form-group"
              onChange={(e) => setCommentStatus(e.target.value)}
              value={CommentStatus}
            >
              <label for="">Comment Status</label>
              <select name="sourceName" class="form-control">
                <option value="">Select All</option>
                <option value="moderate">Moderate</option>
                <option value="not interested">Not Interested</option>
                <option value="interested">Interested</option>
                <option value="hot client">Hot Client</option>
              </select>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <label for="">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                placeholder=""
                onChange={(e) => setSearchDate(e.target.value)}
                value={SearchDate}
              />
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
          <div className="col-sm">
            <h3 className="pb-4">
              Total Records:{" "}
              <span className="badge badge-primary">
                {ZongCallingResult.TotalCount}
              </span>
            </h3>
            <div className="table-wrap table-responsive">
              {resultRolePermssion[0].module_name == "Sales Reporting" &&
              CallingX.length == 0 ? (
                <>
                  <table
                    id="datable_1"
                    className="table table-hover w-100 display pb-30 no-footer"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>Agent name</th>
                        <th>Client Name</th>
                        {/* <th>Client No</th> */}
                        {/* <th>Extension No</th> */}
                        <th>Project Name</th>
                        <th>Calling Datetime</th>
                        {/* <th>Duration</th> */}
                        <th>Status</th>
                        {/* <th>Type</th> */}
                        {/* <th>Recording</th> */}
                        <th>Callback</th>
                        {/* <th>Source</th> */}
                        <th>Quality</th>
                        {/* <th>Comment</th> */}
                        <th>Comment Status</th>
                        <th>Client Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ZongCallingResult == null ||
                      ZongCallingResult == "" ||
                      ZongCallingResult == undefined ||
                      ZongCallingResult.code == "ERR_BAD_REQUEST" ||
                      ZongCallingResult.code == "ECONNABORTED" ||
                      ZongCallingResult.length == 0 ||
                      ZongCallingResult.code == "ERR_BAD_RESPONSE" ||
                      ZongCallingResult.code == "ERR_NETWORK" ||
                      ZongCallingResult.data == "" ? (
                        <></>
                      ) : ZongCallingResult == undefined ||
                        ZongCallingResult == "" ||
                        ZongCallingResult == null ? (
                        "" ||
                        ZongCallingResult.length == 0 ||
                        ZongCallingResult.code == "ERR_BAD_RESPONSE" ||
                        ZongCallingResult.data == ""
                      ) : (
                        ZongCallingResult.data.map((curElem, index) => {
                          let AudioRecx =
                            curElem.exp == "gsm"
                              ? curElem.recording.substr(
                                  0,
                                  curElem.recording.lastIndexOf(".")
                                ) + ".mp3"
                              : curElem.recording.substr(
                                  0,
                                  curElem.recording.lastIndexOf(".")
                                ) + ".wav";
                          //console.log(curElem.recording.substr(0, curElem.recording.lastIndexOf(".")));

                          return (
                            <tr key={index + 1}>
                              <td>
                                {curElem.emp_name}
                                <p>{curElem.ext}</p>
                              </td>
                              <td style={{ minWidth: "200px" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name={`clientName`}
                                    ClientName={curElem.ClientName}
                                    attId={`${curElem.id}`}
                                    className="form-control"
                                    placeholder="Client Name"
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  />
                                  {curElem.getCallingDetails == "" ? (
                                    curElem.ClientName == "" ? (
                                      <>
                                        <span className="badge badge-danger">
                                          {curElem.customerDx == null ||
                                          curElem.customerDx == ""
                                            ? ""
                                            : curElem.customerDx.clientName}
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="badge badge-primary">
                                          Self Changes - {curElem.ClientName}
                                        </span>
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <span className="badge badge-secondary">
                                        <b>Crm Updated - </b>
                                        {curElem.getCallingDetails.clientName}
                                      </span>
                                    </>
                                  )}
                                </div>
                                <p>{curElem.phone}</p>
                              </td>
                              {/* <td style={{minWidth:'180px'}}>

</td> */}
                              {/* <td></td> */}
                              <td style={{ minWidth: "200px" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name={`projectName`}
                                    attId={`${curElem.id}`}
                                    className="form-control"
                                    placeholder="Project Name"
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  />
                                  {curElem.getCallingDetails == "" ? (
                                    curElem.projectName == "" ? (
                                      <>
                                        <span className="badge badge-danger">
                                          N/a
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        <span className="badge badge-primary">
                                          Self Changes - {curElem.projectName}
                                        </span>
                                      </>
                                    )
                                  ) : (
                                    <>
                                      <span className="badge badge-secondary">
                                        <b>Crm Updated - </b>
                                        {
                                          curElem.getCallingDetails
                                            .clientProject
                                        }
                                      </span>
                                    </>
                                  )}
                                  {curElem.getCallingDetails == "" ? (
                                    <>
                                      <select
                                        name={`source`}
                                        className="form-control"
                                        attId={`${curElem.id}`}
                                        onChange={(e) =>
                                          handleInputChange(e, index)
                                        }
                                      >
                                        <option value="">Select Option</option>
                                        {curElem.Source == "youtube" ? (
                                          <option value="youtube" selected>
                                            youtube
                                          </option>
                                        ) : (
                                          <option value="youtube">
                                            youtube
                                          </option>
                                        )}
                                        {curElem.Source == "social media" ? (
                                          <option value="social media" selected>
                                            social media
                                          </option>
                                        ) : (
                                          <option value="social media">
                                            social media
                                          </option>
                                        )}

                                        {curElem.Source == "sms" ? (
                                          <option value="sms" selected>
                                            sms
                                          </option>
                                        ) : (
                                          <option value="sms">sms</option>
                                        )}
                                        {curElem.Source == "web" ? (
                                          <option value="web" selected>
                                            web
                                          </option>
                                        ) : (
                                          <option value="web">web</option>
                                        )}
                                        {curElem.Source == "reference" ? (
                                          <option value="reference" selected>
                                            reference
                                          </option>
                                        ) : (
                                          <option value="reference">
                                            reference
                                          </option>
                                        )}

                                        {curElem.Source == "follow-up" ? (
                                          <option value="follow-up" selected>
                                            Follow Up
                                          </option>
                                        ) : (
                                          <option value="follow-up">
                                            Follow Up
                                          </option>
                                        )}

                                        {curElem.Source == "personal-call" ? (
                                          <option
                                            value="personal-call"
                                            selected
                                          >
                                            Personal Call
                                          </option>
                                        ) : (
                                          <option value="personal-call">
                                            Personal Call
                                          </option>
                                        )}
                                      </select>
                                      {curElem?.activityName}
                                    </>
                                  ) : (
                                    curElem.getCallingDetails.nature
                                  )}
                                </div>
                              </td>
                              <td style={{ minWidth: "300px" }}>
                                {curElem.datetime}
                                <p>
                                  {curElem.duration == 0 ? (
                                    <>0</>
                                  ) : (
                                    secondsToHms(curElem.duration)
                                  )}
                                </p>
                                <audio controls key={curElem.id}>
                                  <source src={AudioRecx} type="audio/mp3" />
                                </audio>

                                <textarea
                                  name={`Comment`}
                                  className="form-control"
                                  attId={`${curElem.id}`}
                                  cols={5}
                                  rows={3}
                                  onChange={(e) => handleInputChange(e, index)}
                                ></textarea>

                                {curElem.Comment == "" ? (
                                  <>
                                    <span className="badge badge-danger">
                                      N/a
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="badge badge-primary">
                                      Self Changes - {curElem.Comment}
                                    </span>
                                  </>
                                )}
                              </td>
                              {/* <td style={{minWidth:'300px'}}>

</td> */}
                              <td>
                                {curElem.status}
                                <p>{curElem.Type}</p>
                              </td>
                              {/* <td></td> */}
                              {/* <td style={{minWidth:'300px'}}>

</td> */}

                              <td>
                                {curElem.Type == "Outgoing Calls" ? (
                                  ""
                                ) : (
                                  <select
                                    name={`callbackStatus`}
                                    attId={`${curElem.id}`}
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  >
                                    <option value="">Select Option</option>
                                    {curElem.statusActive == "active" ? (
                                      <option value="yes" selected>
                                        Yes
                                      </option>
                                    ) : (
                                      <option value="no">No</option>
                                      // curElem.str == curElem.getCallingDetails.clientPhone && curElem.Type == 'Outgoing Calls' && curElem.status == 'Connected' ? (
                                      //     <option value="yes" selected>Yes</option>
                                      // ):(
                                      //     <option value="yes">Yes</option>
                                      // )
                                    )}
                                    {/* {
            curElem.statusActive == '' ? (
            <option value="no" selected>No</option>
        ):(
            <option value="no">No</option>
        )
    }
     */}
                                  </select>
                                )}
                              </td>
                              {/* <td style={{minWidth:'230px'}}>

</td> */}
                              <td>
                                <select
                                  name={`Quality`}
                                  attId={`${curElem.id}`}
                                  onChange={(e) => handleInputChange(e, index)}
                                >
                                  <option value="">Select Option</option>
                                  {curElem.Quality == "good" ? (
                                    <option value="good" selected>
                                      Good
                                    </option>
                                  ) : (
                                    <option value="good">Good</option>
                                  )}

                                  {curElem.Quality == "bad" ? (
                                    <option value="bad" selected>
                                      Bad
                                    </option>
                                  ) : (
                                    <option value="bad">Bad</option>
                                  )}

                                  {curElem.Quality == "average" ? (
                                    <option value="average" selected>
                                      Average
                                    </option>
                                  ) : (
                                    <option value="average">Average</option>
                                  )}
                                </select>
                              </td>
                              {/* <td style={{minWidth:'330px'}}>
</td> */}
                              <td>
                                <select
                                  name={`CommentStatus`}
                                  attId={`${curElem.id}`}
                                  onChange={(e) => handleInputChange(e, index)}
                                >
                                  <option value="">Select Option</option>

                                  {curElem.CommentStatus == "moderate" ? (
                                    <option value="moderate" selected>
                                      Moderate
                                    </option>
                                  ) : (
                                    <option value="moderate">Moderate</option>
                                  )}

                                  {curElem.CommentStatus == "not interested" ? (
                                    <option value="not interested" selected>
                                      Not Interested
                                    </option>
                                  ) : (
                                    <option value="not interested">
                                      Not Interested
                                    </option>
                                  )}

                                  {curElem.CommentStatus == "interested" ? (
                                    <option value="interested" selected>
                                      Interested
                                    </option>
                                  ) : (
                                    <option value="interested">
                                      Interested
                                    </option>
                                  )}

                                  {curElem.CommentStatus == "hot client" ? (
                                    <option value="hot client" selected>
                                      Hot Client
                                    </option>
                                  ) : (
                                    <option value="hot client">
                                      Hot Client
                                    </option>
                                  )}
                                </select>
                              </td>
                              <td>
                                <select
                                  name={`ClientStatus`}
                                  attId={`${curElem.id}`}
                                  onChange={(e) => handleInputChange(e, index)}
                                >
                                  <option value="">Select Option</option>

                                  {curElem.ClientStatus == "buyer" ? (
                                    <option value="buyer" selected>
                                      Buyer
                                    </option>
                                  ) : (
                                    <option value="buyer">Buyer</option>
                                  )}

                                  {curElem.ClientStatus == "seller" ? (
                                    <option value="seller" selected>
                                      Seller
                                    </option>
                                  ) : (
                                    <option value="seller">Seller</option>
                                  )}

                                  {curElem.ClientStatus == "agent" ? (
                                    <option value="agent" selected>
                                      Agent
                                    </option>
                                  ) : (
                                    <option value="agent">Agent</option>
                                  )}
                                </select>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={`previous`}
                    nextLabel={`next`}
                    breakLabel={`...`}
                    pageCount={Math.ceil(ZongCallingResult.TotalCount / 12)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={`pagination justify-content-center`}
                    pageClassName={`page-item`}
                    pageLinkClassName={`page-link`}
                    previousClassName={`page-item`}
                    previousLinkClassName={`page-link`}
                    nextLinkClassName={`page-link`}
                    nextClassName={`page-item`}
                    breakLinkClassName={`page-link`}
                    breakClassName={`page-item`}
                    activeClassName={`active`}
                  />
                </>
              ) : (
                <>
                  <table
                    id="datable_1"
                    className="table table-hover w-100 display pb-30 no-footer dtr-inline"
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th>Employee Name</th>
                        <th>Client Number</th>
                        <th>Type</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Recording</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ZongCallingResult == null ||
                      ZongCallingResult == undefined ||
                      ZongCallingResult.length == 0 ||
                      ZongCallingResult.code == "ERR_BAD_REQUEST" ||
                      ZongCallingResult.length == 0 ||
                      ZongCallingResult.code == "ERR_BAD_RESPONSE" ||
                      ZongCallingResult.data == "" ? (
                        <>Loading.....</>
                      ) : ZongCallingResult == undefined ||
                        ZongCallingResult == "" ||
                        ZongCallingResult == null ||
                        ZongCallingResult.code == "ERR_BAD_RESPONSE" ||
                        ZongCallingResult.length == 0 ||
                        ZongCallingResult.data == "" ? (
                        ""
                      ) : ZongCallingResult.data.length > 0 ? (
                        ZongCallingResult.data.map((curElem, index) => {
                          let AudioRec =
                            curElem.exp == "gsm"
                              ? curElem.recording.substr(
                                  0,
                                  curElem.recording.lastIndexOf(".")
                                ) + ".mp3"
                              : curElem.recording.substr(
                                  0,
                                  curElem.recording.lastIndexOf(".")
                                ) + ".wav";

                          //console.log(curElem.recording.substr(0, curElem.recording.lastIndexOf(".")));
                          return (
                            <tr>
                              <td>{curElem.emp_name}</td>
                              <td>
                                {curElem.phone} <br />
                                {}
                                {curElem.getCallingDetails == ""
                                  ? curElem.customerDx == null ||
                                    curElem.customerDx == ""
                                    ? ""
                                    : curElem.customerDx.clientName
                                  : curElem.getCallingDetails.clientName}
                              </td>
                              <td>{curElem.Type}</td>
                              <td>
                                {curElem.duration == 0 ? (
                                  <>0</>
                                ) : (
                                  secondsToHms(curElem.duration)
                                )}
                              </td>
                              <td>{curElem.status}</td>
                              <td>
                                <audio controls key={curElem.id}>
                                  <source src={AudioRec} type="audio/mp3" />
                                </audio>
                              </td>
                              <td>{curElem.datetime}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <>
                          <tr>
                            <td colSpan="7">
                              <b>No record Found....</b>
                            </td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <ReactPaginate
                    previousLabel={`previous`}
                    nextLabel={`next`}
                    breakLabel={`...`}
                    pageCount={Math.ceil(ZongCallingResult.TotalCount / 12)}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={`pagination justify-content-center`}
                    pageClassName={`page-item`}
                    pageLinkClassName={`page-link`}
                    previousClassName={`page-item`}
                    previousLinkClassName={`page-link`}
                    nextLinkClassName={`page-link`}
                    nextClassName={`page-item`}
                    breakLinkClassName={`page-link`}
                    breakClassName={`page-item`}
                    activeClassName={`active`}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ZongCallingData;
