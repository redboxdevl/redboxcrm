import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Navigation from "../../Includes/Navigation";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AssignLeadsAction } from "../../redux/action/AssignLeadsAction";
import { NotinterestedReasonAction } from "../../redux/action/NotinterestedReasonAction";
import { CallingActions } from "../../redux/action/CallingActions";
import $ from "jquery";
import ReactPaginate from "react-paginate";
import { actionConfig } from "../../configuration";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import axios from "axios";
import CheckboxAssign from "./CheckboxAssign";
import { CSVLink } from "react-csv";
import Modal from "react-bootstrap/Modal";
import { FaShareAlt, FaBell } from "react-icons/fa";

import { browserName } from "react-device-detect";

const AssignListing = ({ dataPermission }) => {
  const EmpData2 = JSON.parse(localStorage.getItem("empTeam"));
  const resultListing = useSelector(
    (state) => state.assignLeadsreducer.assignleaddata
  );
  const proReasonNotInterresult = useSelector(
    (state) => state.NotinterestedOptreducers.notinterestedoptdata
  );
  const proCallingresult = useSelector(
    (state) => state.Callingreducers.callingcount
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

  console.log("EmpData2", EmpData2);

  const dispatch = useDispatch();

  const AuthDataxs = JSON.parse(localStorage.getItem("authdata"));

  const SuperCon =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.role_id == 3 || edx.role_id == 4
        );
  const AssignExport =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id == 50 && edx.sub_features == "Export"
        );

  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [TransferStatus, setTransferStatus] = useState("");

  const navigate = useNavigate();

  const [Employeeresult, setEmployeeresult] = useState([]);
  const [isCheck, setIsCheck] = useState([]);

  const [NotInterestedresult, setNotInterresult] = useState(false);
  const [Transferresult, setTransferresult] = useState(false);
  const [GetLeadId, setGetLeadId] = useState("");
  const [PopupData, setPopupData] = useState("");
  const [GetPhoneNo, setPhoneNo] = useState("");
  const [PhoneNoIos, setPhoneNoIos] = useState("");
  const [PhoneNoWhatsapp, setPhoneNoWhatsapp] = useState("");
  const [GetEmail, setEmailData] = useState("");
  const [GetTransferNote, setTransferNote] = useState("");
  const [GetAgentId, setGetAgentId] = useState("");
  const [GetReasonDataId, setReasonDataId] = useState("");
  const [GetBudgetPrice, setBudgetPrice] = useState("");
  const [GetOtherNote, setOtherNote] = useState("");
  const [GetBugget, setBugget] = useState(false);
  const [GetOtherNot, setOtherNot] = useState(false);
  const [search, setSearch] = useState("");
  const [LeadNature, setLeadNature] = useState("");
  const [SalesConsul, setSalesConsul] = useState("");
  const [ProjectN, setProjectN] = useState("");
  const [DateWeekly, setDateWeekly] = useState("");
  const [ExportAssgin, setExportAssgin] = useState("");
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    dispatch(NotinterestedReasonAction());
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (SuperCon.length == 0) {
      if (
        EmpData == "" ||
        EmpData == null ||
        EmpData == undefined ||
        EmpData2.teamStatus == "manager"
      ) {
        dispatch(
          AssignLeadsAction(
            AuthData.id == null ? "" : AuthData.id,
            1,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            "",
            ProjectN,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          AssignLeadsAction(
            "all",
            1,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            EmpData.teamObj,
            ProjectN,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        AssignLeadsAction(
          "all",
          1,
          12,
          search,
          LeadNature,
          SalesConsul,
          TransferStatus,
          "",
          ProjectN,
          AuthData.company_id
        )
      );
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authdata")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    GetEmployeeData();
  }, []);

  $(document).on("click", ".client_opt", function () {
    var optVa = $(this).val();
    setReasonDataId(optVa);
    if (optVa === "Budget Issue") {
      setBugget(true);
      setOtherNot(false);
    } else if (optVa === "Others") {
      setBugget(false);
      setOtherNot(true);
      setBudgetPrice("");
    } else {
      setBugget(false);
      setOtherNot(false);
      setBudgetPrice("");
    }
  });

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

  const MyFunc = (leadid, agentid, phoneNo, EmailData) => {
    setGetLeadId(leadid);
    setPopupData(true);
    setPhoneNo(phoneNo);
    setEmailData(EmailData);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid);
  };

  const callingData = async (leadid) => {
    dispatch(CallingActions(AuthDataxs.id, leadid, AuthDataxs.company_id));
  };
  const CallingAction = async (actionType, agentid, leadid) => {
    const FeildData = {
      impType: actionType,
      agentid: agentid,
      leadid: leadid,
      customerId: 0,
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}leadimpression`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success === false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          navigate("/list-assign-leads");
          callingData(leadid);
        }
      });
  };

  useEffect(() => {
    callingData();
  }, []);

  function MyFuncAction(ActioData) {
    if (ActioData == "transfer") {
      setNotInterresult(false);
      setTransferresult(true);
    } else if (ActioData == "remove") {
      setNotInterresult(true);
      setTransferresult(false);
    } else if (ActioData == "reminders") {
      setNotInterresult(false);
      setTransferresult(false);
    } else if (ActioData == "addLeads") {
      setPopupData(false);
    } else {
      setNotInterresult(false);
      setTransferresult(false);
    }
  }

  var countAssign = resultListing.length;
  var countEmpl = Employeeresult.length;

  const addNotInterestedClient = (e) => {
    e.preventDefault();

    const FeildData = {
      agentid: AuthDataxs.id,
      leadid: GetLeadId,
      client_opt: GetReasonDataId,
      budgetPrice: GetBudgetPrice == "" ? "0" : GetBudgetPrice,
      OtherNote: GetOtherNote == "" ? "-" : GetOtherNote,
      customerId: 0,
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    fetch(`${actionConfig.REACT_APP_URL}assignnotinterested`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-assign-leads");
          // GetAssignLead();
        }
      });
  };

  const AddTransferFormData = (e) => {
    e.preventDefault();

    const FeildData = {
      fagentid: AuthDataxs.id,
      tagentid: GetAgentId,
      leadid: GetLeadId,
      transferNote: GetTransferNote,
      statusType: "transfer",
      companyId: AuthDataxs.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}assignleadtransfer`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-assign-leads");
          setTransferresult(false);
        }
      });
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (SuperCon.length == 0) {
      if (
        EmpData == "" ||
        EmpData == null ||
        EmpData == undefined ||
        EmpData2.teamStatus == "manager"
      ) {
        dispatch(
          AssignLeadsAction(
            AuthData.id,
            currentPage,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            "",
            ProjectN,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          AssignLeadsAction(
            "all",
            currentPage,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            EmpData.teamObj,
            ProjectN,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        AssignLeadsAction(
          "all",
          currentPage,
          12,
          search,
          LeadNature,
          SalesConsul,
          TransferStatus,
          "",
          ProjectN,
          AuthData.company_id
        )
      );
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (SuperCon.length == 0) {
      if (
        EmpData == "" ||
        EmpData == null ||
        EmpData == undefined ||
        EmpData2.teamStatus == "manager"
      ) {
        dispatch(
          AssignLeadsAction(
            AuthData.id,
            1,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            "",
            ProjectN,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          AssignLeadsAction(
            "all",
            1,
            12,
            search,
            LeadNature,
            SalesConsul,
            TransferStatus,
            EmpData.teamObj,
            ProjectN,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        AssignLeadsAction(
          "all",
          1,
          12,
          search,
          LeadNature,
          SalesConsul,
          TransferStatus,
          "",
          ProjectN,
          AuthData.company_id
        )
      );
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  console.log("isCheck", isCheck);

  const DeleteLeads = (e) => {
    e.preventDefault();

    const FeildData = { isCheck: isCheck };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}leadsDeleteData`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        console.log(dataex);
        if (dataex.code == 200) {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-assign-leads");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const ExportData = async () => {
    let arr = [];
    // resultListing.data.map((curElem,index) => {
    //   arr.push({'clientName':curElem.getleads.clientName});
    // });
    // setExportAssgin(arr);
    console.log("arr", arr);
  };

  useEffect(() => {
    ExportData();
  }, [resultListing]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (
    leadid,
    agentid,
    phoneNo,
    phoneNoIos,
    EmailData,
    whatsappNo
  ) => {
    setShow(true);
    setGetLeadId(leadid);
    setPopupData(true);
    setPhoneNo(phoneNo);
    setPhoneNoWhatsapp(whatsappNo);
    setPhoneNoIos(phoneNoIos);
    setEmailData(EmailData);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid);
  };

  const TransferLeads = (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    if (window.confirm("Do You Want to Transfer Leads")) {
      if (SalesConsul == "" || SalesConsul == null) {
        Swal.fire("Error!", "Please Select Consultant", "error");
      } else {
        const FeildData = {
          isCheck: isCheck,
          SalesConsul: SalesConsul,
          companyId: AuthData.company_id,
        };

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(FeildData),
        };
        fetch(`${actionConfig.REACT_APP_URL}leadsTransferData`, requestOptions)
          .then((response) => response.json())
          .then((dataex) => {
            if (dataex.code == 200) {
              Swal.fire("Good job!", dataex.message, "success");
              navigate("/list-assign-leads");
            } else {
              Swal.fire("Error!", dataex.message, "error");
            }
          });
      }
    }
  };

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Assgined Leads</h2>
          </div>
          <div>
            <div className="form-group d-flex">
              {SuperCon.length == 0 ? (
                <></>
              ) : AssignExport.length == 0 ? (
                <></>
              ) : (
                <>
                  <CSVLink
                    className="btn btn-danger mr-1"
                    type="button"
                    data={ExportAssgin}
                    filename="AssignExport"
                  >
                    Export
                  </CSVLink>
                  <button
                    className="btn btn-primary mr-1"
                    type="button"
                    onClick={DeleteLeads}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-secondary mr-1"
                    type="button"
                    onClick={TransferLeads}
                  >
                    Transfer Bulk Leads
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div class="row pb-3">
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Search Anything</label>
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="E.g (id,Name,phone)"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div class="col-md-2">
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

          <div class="col-md-3">
            <div class="form-group">
              <label for="">Projects</label>
              <select
                name="projectN"
                id=""
                class="form-control"
                onChange={(e) => setProjectN(e.target.value)}
              >
                <option value="">Select All</option>
                {resultlistdashboard == "" ||
                resultlistdashboard == null ||
                resultlistdashboard == undefined ||
                resultlistdashboard.code == "ERR_NETWORK" ? (
                  <></>
                ) : (
                  resultlistdashboard.getAllProjects.map((items, key) => {
                    return items.clientProject == "" ? (
                      <></>
                    ) : (
                      <option value={items.clientProject} key={key + 1}>
                        {items.clientProject}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Transfer Leads Search</label>
              <select
                name="transferType"
                id=""
                className="form-control"
                onChange={(e) => setTransferStatus(e.target.value)}
              >
                <option value="">Select All</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>

          {SuperCon.length == 0 ? (
            <></>
          ) : (
            <div class="col-md-3">
              <div class="form-group">
                <label for="">Date</label>
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
          )}
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
        <section className="hk-sec-wrapper">
          <div className="row">
            <div className="col-md-12 pb-3">
              <h4>
                Total Records :{" "}
                <span className="badge badge-danger">
                  {resultListing.totalRecords}
                </span>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-sm">
              <div className="table-wrap table-responsive">
                <table
                  id="datable_1"
                  className="table w-100 display pb-30 no-footer dtr-inline"
                >
                  <thead className="thead-dark">
                    <tr>
                      <th width={250}>Name</th>
                      <th>Agent Name</th>
                      <th>Client No</th>
                      <th>Project Name</th>
                      <th>Designation</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultListing.data == null ? (
                      <>Loading.....</>
                    ) : resultListing.data.length > 0 ? (
                      resultListing.data.map((curElem, index) => {
                        if (curElem.getvirginleads == null) {
                          var edata = "Untouch Lead";
                          var classData = "primary";
                        } else {
                          var edata = "Already Call";
                          var classData = "danger";
                        }

                        if (curElem.getreminder == null) {
                          var data = "Not Set";
                        } else {
                          var data = curElem.getreminder.priority;
                        }

                        if (curElem.get_transferleads == null) {
                          var datatra = "N/a";
                          var transferNote = "";
                          var transferDate = "";
                        } else {
                          var datatra = curElem.get_transferleads.fagentName;
                          var transferNote =
                            curElem.get_transferleads.transferNote;
                          var transferDate =
                            curElem.get_transferleads.created_at;
                        }

                        if (browserName == "Mobile Safari") {
                          var leadClient = curElem.clientPhoneIos;
                        } else {
                          var leadClient = curElem.clientPhone;
                        }

                        return (
                          <tr
                            key={index}
                            className={`${
                              curElem.getvirginleads == null ? "bgCOlor" : ""
                            }`}
                          >
                            <td>
                              <div class="checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    id={curElem.leadid}
                                    name={curElem.leadid}
                                    onClick={(e) => handleClick(e)}
                                  />{" "}
                                  <a
                                    href="javascript:;"
                                    className="pr-2"
                                    onClick={() =>
                                      handleShow(
                                        curElem.leadid,
                                        curElem.agentid,
                                        curElem.getleads.clientPhone,
                                        leadClient,
                                        curElem.getleads.clientemail,
                                        curElem.whatsappclientPhone
                                      )
                                    }
                                  >
                                    {curElem.getleads == null
                                      ? ""
                                      : curElem.getleads.clientName == ""
                                      ? "No Name"
                                      : curElem.getleads.clientName}
                                  </a>
                                </label>
                              </div>

                              {curElem.get_transferleads == null ? (
                                <></>
                              ) : (
                                <div
                                  title={curElem.get_transferleads.fagentName}
                                >
                                  <FaShareAlt size={20} color="#3c71b7" />
                                </div>
                              )}

                              {curElem.getreminder == null ||
                              curElem.getreminder == "" ? (
                                <></>
                              ) : (
                                <div title={curElem.getreminder.reminderinfo}>
                                  <FaBell size={20} color="yellow" />
                                </div>
                              )}
                            </td>
                            <td>
                              <Link to={`/lead-history/${curElem.leadid}`}>
                                {curElem.emp_name}
                              </Link>
                            </td>
                            <td>
                              {curElem.getleads == "" ||
                              curElem.getleads == null
                                ? ""
                                : curElem.getleads.clientPhone}
                            </td>
                            <td>
                              {curElem.getleads == null
                                ? ""
                                : curElem.getleads.clientProject}
                            </td>
                            <td width={170}>
                              {curElem.getleads == null ||
                              curElem.getleads.clientDesignation == "-"
                                ? "N/a"
                                : curElem.getleads.clientDesignation}
                            </td>
                            {/* <td>
<div className="align-items-center media">
<div className="media-img-wrap">
<div className="avatar mr-1" style={{width:'50px',height:'50px'}}>
<img src="../frontAsset/dist/img/redbox.png" alt="user" className="avatar-img rounded-circle" style={{objectFit:'scale-down'}}/>
</div>
</div>
<div className="media-body">
<span></span>
</div>
</div>
</td> */}
                            {/* <td>
<span className={`badge badge-primary badge-pill`}>{datatra}</span>
<p>{transferNote}</p>
{
  transferDate == null || transferDate == '' ? (
    <></>
  ):(
    <p><Moment date={transferDate} format="YYYY/MM/DD" /></p>
  )
}

</td> */}
                            {/* <td><span className="badge badge-danger badge-indicator"></span> {data} <br /> {curElem.getreminder == null || curElem.getreminder == '' ? '' : curElem.getreminder.reminderinfo}</td> */}
                            {/* <td><span className={`badge badge-${classData} badge-pill`}>{edata}</span> </td> */}
                            <td>
                              {curElem.PublishDate}
                              <br />
                              {curElem.timeAgo}
                            </td>
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

                    {resultListing.message !== "" ? (
                      <tr>
                        <td colSpan={7}>{resultListing.message}</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>

                <div className="col-12">
                  <ReactPaginate
                    previousLabel={`previous`}
                    nextLabel={`next`}
                    breakLabel={`...`}
                    pageCount={Math.ceil(resultListing.totalRecords / 12)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={`pagination justify-content-center `}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* {PopupData == true ? (

<>

<div className="modal fade" id={PopupData == true ? ('actionModal') : ('')} role="dialog" aria-labelledby="actionModalLabel" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="">
<button type="button" className="close mt-10 mr-10" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div className="modal-body p-0">
<div className="card shadow-none">
<div className="card-header card-header-action">
<h6>Activity</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href={`tel:77`+GetPhoneNo} title="Phone Call" className="PhoneCall leadimpression" onClick={()=>CallingAction('phone',AuthDataxs.id,GetLeadId)}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" />
<span className="badge badge-pill badge-warning phone impData Phone">{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.Phone}</span>
<br />
<small>Phone</small>
</center>
</a>
</div>
<div className="col">
<a href={`https://wa.me/`+GetPhoneNo} title="Whatsapp" onClick={()=>CallingAction('whatsapp',AuthDataxs.id,GetLeadId)} className="WhatsappImp leadimpression">
<center>

<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" />
<span className="badge badge-pill badge-warning whatsapp impData Whatsapp" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.whatsapp}</span>
<br />
<small>Whatsapp</small>
</center>
</a>
</div>
<div className="col">
<a href={`sms:+`+GetPhoneNo+`&body=hi this is testing email`} title="Sms" onClick={()=>CallingAction('sms',AuthDataxs.id,GetLeadId)} className="SmsImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" />
<span className="badge badge-pill badge-warning sms impData Sms" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.sms}</span>
<br />
<small>SMS</small>
</center>
</a>
</div>
<div className="col">
<a href={`mailto:`+GetEmail} title="Email" onClick={()=>CallingAction('email',AuthDataxs.id,GetLeadId)} className="EmailImp leadimpression" >
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" />
<span className="badge badge-pill badge-warning email impData Email" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.email}</span>
<br />
<small>Email</small>
</center>
</a>
</div>
</div>
</div>
<div className="card-header card-header-action">
<h6>Action</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href="#!" data="transfer" className="ActionPerform" onClick={()=>MyFuncAction('transfer')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-transfer.png" alt="icon" /><br />
<small>Transfer</small>
</center>
</a>
</div>
<div className="col">
<NavLink to={`/add-lead/${GetLeadId}`} className="addLeads" onClick={()=>MyFuncAction('addLeads')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-add.png" alt="icon" /><br />
<small>Add</small>
</center>
</NavLink>
</div>
<div className="col">
<NavLink to={`/add-reminder/${GetLeadId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div>
<div className="col">
<a href="#!" data="remove" className="ActionPerform NotInterested" onClick={()=>MyFuncAction('remove')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-remove.png" alt="icon" /><br />
<small>Remove</small>
</center>
</a>
</div>


</div>

<div className="modal-body" id={NotInterestedresult == false ? ('notinterestedX') : ('notinterestedShow') }>
<p>Why Client is not Interested ?</p>
<form onSubmit={addNotInterestedClient}>

<div className="mt-15">

{
proReasonNotInterresult.map((curElem,index) => {
return (
<div className="custom-control custom-radio mt-1 pl-0" key={curElem.id}>
<label style={{marginBottom:'5px'}}>
<input type="radio" name="client_opt" value={curElem.title} className="client_opt"/> {curElem.title}
</label>
</div>

)
})
}



<div className={GetOtherNot == true ? ('form-group mt-15') : ('form-group mt-15 OrderNote')}>
<label >Note</label>
<textarea className="form-control OtherNote" name="client_opt" rows="3" placeholder="Textarea" onChange={e=>setOtherNote(e.target.value)} value={GetOtherNote}>{GetOtherNote}</textarea>                                                        
</div>

<div className={GetBugget == true ? ('col-md-12') : ('col-md-12 PriceRange')}>
<div className="form-group">
<input className="range-slider-2" onChange={e=>setBudgetPrice(e.target.value)} value={GetBudgetPrice}/>
</div>
</div>
<div className="form-group mt-2">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</div>
<div>
</div>
</form>
</div>


<div className="modal-body transfer" id={Transferresult == false ? ('transferHide') : ('transferShow') }>
<form onSubmit={AddTransferFormData}>

<div className="form-group">
<label >Select Agent</label>
<select name="agentid" className="form-control custom-select select2 mt-15" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="">Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDataxs.id ? (<></>) : (<><option key={curElem.id} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>
<div className="form-group">
<label >Note</label>
<textarea name="transferNote" className="form-control" rows="3" placeholder="Textarea" onChange={e=>setTransferNote(e.target.value)} value={GetTransferNote} required></textarea>                                                        
</div>

<div className="form-group">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</form>
</div>


</div>
</div>
</div>
</div>
</div>
</div>

</>

) : (
<></>
)

} */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body p-0">
            <div className="card shadow-none">
              <div className="card-body pt-10">
                <div className="row">
                  <div className="col">
                    <a
                      href={`tel:66` + PhoneNoIos}
                      title="Phone Call"
                      className="PhoneCall leadimpression"
                      onClick={() =>
                        CallingAction("phone", AuthDataxs.id, GetLeadId)
                      }
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-phone.png"
                          alt="icon"
                        />
                        <span className="badge badge-pill badge-warning phone impData Phone">
                          {proCallingresult == "" ||
                          proCallingresult == null ||
                          proCallingresult == undefined ||
                          proCallingresult.data == "" ||
                          proCallingresult.data == null ||
                          proCallingresult.data == undefined
                            ? ""
                            : proCallingresult.data.Phone}
                        </span>
                        <br />
                        <small>Phone</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      href={`https://wa.me/` + PhoneNoWhatsapp}
                      title="Whatsapp"
                      onClick={() =>
                        CallingAction("whatsapp", AuthDataxs.id, GetLeadId)
                      }
                      className="WhatsappImp leadimpression"
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-whatsapp.png"
                          alt="icon"
                        />
                        <span className="badge badge-pill badge-warning whatsapp impData Whatsapp">
                          {proCallingresult == "" ||
                          proCallingresult == null ||
                          proCallingresult == undefined ||
                          proCallingresult.data == "" ||
                          proCallingresult.data == null ||
                          proCallingresult.data == undefined
                            ? ""
                            : proCallingresult.data.whatsapp}
                        </span>
                        <br />
                        <small>Whatsapp</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      href={
                        `sms:+` + GetPhoneNo + `&body=hi this is testing email`
                      }
                      title="Sms"
                      onClick={() =>
                        CallingAction("sms", AuthDataxs.id, GetLeadId)
                      }
                      className="SmsImp leadimpression"
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-sms.png"
                          alt="icon"
                        />
                        <span className="badge badge-pill badge-warning sms impData Sms">
                          {proCallingresult == "" ||
                          proCallingresult == null ||
                          proCallingresult == undefined ||
                          proCallingresult.data == "" ||
                          proCallingresult.data == null ||
                          proCallingresult.data == undefined
                            ? ""
                            : proCallingresult.data.sms}
                        </span>
                        <br />
                        <small>SMS</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      href={`mailto:` + GetEmail}
                      title="Email"
                      onClick={() =>
                        CallingAction("email", AuthDataxs.id, GetLeadId)
                      }
                      className="EmailImp leadimpression"
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-envelope.png"
                          alt="icon"
                        />
                        <span className="badge badge-pill badge-warning email impData Email">
                          {proCallingresult == "" ||
                          proCallingresult == null ||
                          proCallingresult == undefined ||
                          proCallingresult.data == "" ||
                          proCallingresult.data == null ||
                          proCallingresult.data == undefined
                            ? ""
                            : proCallingresult.data.email}
                        </span>
                        <br />
                        <small>Email</small>
                      </center>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-header card-header-action">
                <h6>Action</h6>
              </div>
              <div className="card-body pt-10">
                <div className="row">
                  <div className="col">
                    <a
                      href="#!"
                      data="transfer"
                      className="ActionPerform"
                      onClick={() => MyFuncAction("transfer")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-transfer.png"
                          alt="icon"
                        />
                        <br />
                        <small>Transfer</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <NavLink
                      to={`/add-lead/${GetLeadId}`}
                      className="addLeads"
                      onClick={() => MyFuncAction("addLeads")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-add.png"
                          alt="icon"
                        />
                        <br />
                        <small>Add</small>
                      </center>
                    </NavLink>
                  </div>
                  <div className="col">
                    <NavLink
                      to={`/add-reminder/${GetLeadId}`}
                      data="reminders"
                      className="addReminders Reminders ActionPerform"
                      onClick={() => MyFuncAction("reminders")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-reminders.png"
                          alt="icon"
                        />
                        <br />
                        <small>Reminders</small>
                      </center>
                    </NavLink>
                  </div>
                  <div className="col">
                    <a
                      href="#!"
                      data="remove"
                      className="ActionPerform NotInterested"
                      onClick={() => MyFuncAction("remove")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-remove.png"
                          alt="icon"
                        />
                        <br />
                        <small>Remove</small>
                      </center>
                    </a>
                  </div>
                </div>

                <div
                  className="modal-body"
                  id={
                    NotInterestedresult == false
                      ? "notinterestedX"
                      : "notinterestedShow"
                  }
                >
                  <p>Why Client is not Interested ?</p>
                  <form onSubmit={addNotInterestedClient}>
                    <div className="mt-15">
                      {proReasonNotInterresult.map((curElem, index) => {
                        return (
                          <div
                            className="custom-control custom-radio mt-1 pl-0"
                            key={curElem.id}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              <input
                                type="radio"
                                name="client_opt"
                                value={curElem.title}
                                className="client_opt"
                              />{" "}
                              {curElem.title}
                            </label>
                          </div>
                        );
                      })}

                      <div
                        className={
                          GetOtherNot == true
                            ? "form-group mt-15"
                            : "form-group mt-15 OrderNote"
                        }
                      >
                        <label>Note</label>
                        <textarea
                          className="form-control OtherNote"
                          name="client_opt"
                          rows="3"
                          placeholder="Textarea"
                          onChange={(e) => setOtherNote(e.target.value)}
                          value={GetOtherNote}
                        >
                          {GetOtherNote}
                        </textarea>
                      </div>

                      <div
                        className={
                          GetBugget == true
                            ? "col-md-12"
                            : "col-md-12 PriceRange"
                        }
                      >
                        <div className="form-group">
                          <input
                            className="range-slider-2"
                            onChange={(e) => setBudgetPrice(e.target.value)}
                            value={GetBudgetPrice}
                          />
                        </div>
                      </div>
                      <div className="form-group mt-2">
                        <button type="submit" className="btn btn-primary">
                          Save
                        </button>
                      </div>
                    </div>
                    <div></div>
                  </form>
                </div>

                <div
                  className="modal-body transfer"
                  id={Transferresult == false ? "transferHide" : "transferShow"}
                >
                  <form onSubmit={AddTransferFormData}>
                    <div className="form-group">
                      <label>Select Agent</label>
                      <select
                        name="agentid"
                        className="form-control custom-select select2 mt-15"
                        onChange={(e) => setGetAgentId(e.target.value)}
                        value={GetAgentId}
                        required
                      >
                        <option value="">Select Agent...</option>
                        {Employeeresult.map((curElem, index) => {
                          return curElem.id == AuthDataxs.id ? (
                            <></>
                          ) : (
                            <>
                              <option key={curElem.id} value={curElem.id}>
                                {curElem.emp_name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Note</label>
                      <textarea
                        name="transferNote"
                        className="form-control"
                        rows="3"
                        placeholder="Textarea"
                        onChange={(e) => setTransferNote(e.target.value)}
                        value={GetTransferNote}
                        required
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AssignListing;
