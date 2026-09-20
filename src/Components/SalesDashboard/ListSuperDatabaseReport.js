import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Navigation from "../../Includes/Navigation";
import { SuperDatabaseReportAction } from "../../redux/action/SuperDatabaseReportAction";
import $ from "jquery";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { actionConfig } from "../../configuration";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { getDashboardListACtion } from "../../redux/action/getDashboardListACtion";
import { loadingToggleAction } from "../../redux/action/DashboardCountAction";
import { SingleEmpAction } from "../../redux/action/SingleEmpAction";
import { ListformAction } from "../../redux/action/ListformAction";
import { browserName } from "react-device-detect";

function ListSuperDatabaseReport() {
  let navigate = useNavigate();

  const superDatabaseData = useSelector(
    (state) => state.Superdatabasereducers.superdatabasedata
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const ListFormData = useSelector(
    (state) => state.Listformreducer.listformdata
  );
  const SuperCon =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.role_id == 3 || edx.role_id == 4
        );

  console.log("resultlistdashboard", resultlistdashboard);

  const SuperConx =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
        );

  const EmpData = JSON.parse(localStorage.getItem("empTeam"));
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [SalesConsul, setSalesConsul] = useState("");
  const [ProjectN, setProjectN] = useState("");
  const [LeadStatys, setLeadStatys] = useState("");
  const [ReminderStatus, setReminderStatus] = useState("");
  const [PopupData, setPopupData] = useState("");
  const [GetPhoneNo, setPhoneNo] = useState("");
  const [GetEmail, setEmailData] = useState("");
  const [GetLeadId, setGetLeadId] = useState("");
  const [GetCustomerId, setGetCustomerId] = useState("");
  const [Employeeresult, setEmployeeresult] = useState([]);
  const [proCallingresult, setProCallingresult] = useState([]);
  const [proReasonNotInterresult, setReasonNotInterresult] = useState([]);
  const [NotInterestedresult, setNotInterresult] = useState(false);
  const [Transferresult, setTransferresult] = useState(false);
  const [GetReasonDataId, setReasonDataId] = useState("");
  const [GetBudgetPrice, setBudgetPrice] = useState("");
  const [GetOtherNote, setOtherNote] = useState("");
  const [GetBugget, setBugget] = useState(false);
  const [GetAgentId, setGetAgentId] = useState("");
  const [Status, setStatus] = useState("");
  const [GetTransferNote, setTransferNote] = useState("");
  const [GetOtherNot, setOtherNot] = useState(false);
  const AuthDatas = JSON.parse(localStorage.getItem("authdata"));
  const [ReminderPriority, setReminderPriority] = useState("");
  const [PhoneNoIos, setPhoneNoIos] = useState("");
  const [PhoneNoWhatsapp, setPhoneNoWhatsapp] = useState("");

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (!localStorage.getItem("authdata")) {
      navigate("/");
    } else {
      dispatch(ListformAction(AuthData.id));
    }
  }, [navigate, dispatch]);
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

  $(document).on("click", ".client_opt", function () {
    var optVa = $(this).val();
    setReasonDataId(optVa);

    if (optVa == "Budget Issue") {
      setBugget(true);
      setOtherNot(false);
    } else if (optVa == "Others") {
      setBugget(false);
      setOtherNot(true);
      setBudgetPrice("");
    } else {
      setBugget(false);
      setOtherNot(false);
      setBudgetPrice("");
    }
  });

  const GetReasonData = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}listnotinterestedreason`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setReasonNotInterresult(await GetArray);
  };

  const GetEmployeeData = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listemployee`);
    const dataxs = await response.json();
    setEmployeeresult(await dataxs.data);
  };

  useEffect(() => {
    GetReasonData();
    GetEmployeeData();
  }, []);

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
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const SuperCon =
      resultRolePermssion === ""
        ? ""
        : resultRolePermssion.filter(
            (edx) =>
              edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
          );

    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === "") {
        dispatch(
          SuperDatabaseReportAction(
            AuthData.id,
            1,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          SuperDatabaseReportAction(
            "all",
            1,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        SuperDatabaseReportAction(
          "all",
          1,
          12,
          search,
          ProjectN,
          LeadStatys,
          Status,
          ReminderStatus,
          StartDates,
          EndDate,
          SalesConsul,
          ReminderPriority,
          AuthData.company_id
        )
      );
    }
  }, []);

  // const handlePageClick = (data) => {
  // let currentPage = data.selected + 1;
  // if(EmpData === null || EmpData === ''){
  //     dispatch(SuperDatabaseReportAction(currentPage,15,search,StartDates,EndDate,'',SalesConsul,ProjectN,LeadStatys,ReminderStatus));
  // }else{
  //     dispatch(SuperDatabaseReportAction(currentPage,15,search,StartDates,EndDate,EmpData.teamObj,SalesConsul,ProjectN,LeadStatys,ReminderStatus));
  // }

  // }

  const handleSearch = async (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const SuperCon =
      resultRolePermssion === ""
        ? ""
        : resultRolePermssion.filter(
            (edx) =>
              edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
          );

    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === "") {
        dispatch(
          SuperDatabaseReportAction(
            AuthData.id,
            1,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          SuperDatabaseReportAction(
            "all",
            1,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        SuperDatabaseReportAction(
          "all",
          1,
          12,
          search,
          ProjectN,
          LeadStatys,
          Status,
          ReminderStatus,
          StartDates,
          EndDate,
          SalesConsul,
          ReminderPriority,
          AuthData.company_id
        )
      );
    }
  };

  const addNotInterestedClient = (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const FeildData = {
      agentid: AuthDatas.id,
      leadid: GetLeadId,
      client_opt: GetReasonDataId,
      budgetPrice: GetBudgetPrice == "" ? "0" : GetBudgetPrice,
      OtherNote: GetOtherNote == "" ? "-" : GetOtherNote,
      customerId: GetCustomerId == 0 ? 0 : GetCustomerId,
      company_id: AuthData.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };

    fetch(`${actionConfig.REACT_APP_URL}myleadsnotinterested`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-super-database-report");
        }
      });
  };

  const AddShareFormData = (e) => {
    e.preventDefault();

    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const FeildData = {
      fagent: AuthDatas.id,
      tagent: GetAgentId,
      leadid: GetLeadId,
      shareNote: GetTransferNote,
      sharePercentage: 0,
      company_id: AuthData.company_id,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}myleadshareleads`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.data, "error");
        } else {
          Swal.fire("Good job!", dataex.data, "success");
          setTransferresult(false);
          navigate("/list-super-database-report");
        }
      });
  };

  var lis = [];

  for (var i = 1; i < 10; i++) {
    lis.push(<option value={`${i}0`}>{`${i}0%`}</option>);
  }

  const SuperDatabaseExport = () => {
    alert("done");
  };

  const ExpandedComponent = ({ data }) => {
    return (
      <>
        {data.getallactivity.length == 0 ||
        data == null ||
        data == "" ||
        data == undefined ? (
          <>
            <div className="py-4 px-4">Activities Not Found</div>
          </>
        ) : (
          <div className="py-4 px-4">
            <h4 className="pb-2">Customer Activities</h4>
            <table className="table display">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.getallactivity.map((item, key) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.activityName}</td>
                        <td>{item.activityDetails}</td>
                        <td>{item.created_at}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {data.getcallingdata.length == 0 ||
        data == null ||
        data == "" ||
        data == undefined ? (
          <>
            <div className="py-4 px-4">Calling Not Found</div>
          </>
        ) : (
          <div className="py-4 px-4 pt-0">
            <h4 className="pb-2">Calling Activities</h4>
            <table className="table display">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Recording</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.getcallingdata.map((item, key) => {
                    let AudioRecx =
                      item.recording.substr(
                        0,
                        item.recording.lastIndexOf(".")
                      ) + ".mp3";
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.phone}</td>
                        <td>
                          {item.recording == null ? (
                            "No Recording Found"
                          ) : (
                            <audio controls key={item.id}>
                              <source src={AudioRecx} type="audio/mp3" />
                            </audio>
                          )}
                        </td>
                        <td>{item.status}</td>
                        <td>{item.Type}</td>
                        <td>{item.datetime}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (
    customerid,
    leadid,
    agentid,
    phoneNo,
    EmailData,
    whatsappNo
  ) => {
    setShow(true);
    setGetLeadId(leadid);
    setPopupData(true);
    setPhoneNo(phoneNo);
    setEmailData(EmailData);
    setGetCustomerId(customerid);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid, customerid);
  };

  const CallingAction = async (actionType, agentid, leadid) => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const FeildData = {
      impType: actionType,
      agentid: agentid,
      leadid: leadid,
      customerId: GetCustomerId,
      companyId: AuthData.company_id,
    };
    console.log("FeildData", FeildData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(FeildData),
    };
    fetch(`${actionConfig.REACT_APP_URL}leadimpression`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.success == false) {
          Swal.fire("Error!", dataex.message, "error");
        } else {
          // navigate("/list-my-leads");

          callingData(leadid, GetCustomerId, AuthData.company_id);
        }
      });
  };

  const callingData = async (leadid, GetCustomerId) => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const response = await fetch(
      `${actionConfig.REACT_APP_URL}callingimpression?agentid=${AuthDatas.id}&leadid=${leadid}&customerid=${GetCustomerId}&companyId=${AuthData.company_id}`
    );
    const dataxs = await response.json();
    setProCallingresult(dataxs.data);
  };

  function MyFuncAction(ActioData) {
    if (ActioData == "share") {
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

  useEffect(() => {
    callingData();
    // GetReasonData();
    // GetEmployeeData();
  }, []);

  const columns = [
    {
      name: "ID",
      // selector: row => row.id,
      cell: (row) => {
        return (
          <>
            <a
              href="#"
              onClick={() =>
                handleShow(
                  row.id,
                  row.leadid,
                  row.agentid,
                  browserName == "Mobile Safari"
                    ? row.clientPhoneIos
                    : row.clientPhone,
                  row.email,
                  row.whatsappclientPhone
                )
              }
            >
              {row.id}
            </a>
          </>
        );
      },
    },
    {
      name: "Client Phone",
      selector: (row) => row.mobileNo,
    },
    {
      name: "Client Name",
      selector: (row) => row.clientName,
    },
    {
      name: "Project",
      selector: (row) => row.title,
    },
    {
      name: "Agent Name",
      selector: (row) => row.emp_name,
    },
    {
      name: "Lead Status",
      selector: (row) => row.leadstatus,
    },
    {
      name: "Last Activity",
      selector: (row) => row.activityDetails,
    },
    {
      name: "Status",
      selector: (row) => row.leadbasestatus,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
    },
    {
      name: "Last Updated",
      // selector: row => row.activitydate,
      cell: (row) => {
        return (
          <>
            {row.activitydate == null || row.activitydate == "-" ? (
              ""
            ) : (
              <ul>
                <li>
                  <span className="badge badge-primary">
                    {row.activitydate}
                  </span>
                </li>
                <li>
                  <span className="badge badge-danger">{row.activitytime}</span>
                </li>
              </ul>
            )}
          </>
        );
      },
    },
  ];

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("newPerPage", newPerPage);
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const SuperCon =
      resultRolePermssion === ""
        ? ""
        : resultRolePermssion.filter(
            (edx) =>
              edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
          );

    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === "") {
        dispatch(
          SuperDatabaseReportAction(
            AuthData.id,
            page,
            newPerPage,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          SuperDatabaseReportAction(
            "all",
            page,
            newPerPage,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        SuperDatabaseReportAction(
          "all",
          page,
          newPerPage,
          search,
          ProjectN,
          LeadStatys,
          Status,
          ReminderStatus,
          StartDates,
          EndDate,
          SalesConsul,
          ReminderPriority,
          AuthData.company_id
        )
      );
    }
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    // let currentPage = data.selected + 1;
    const AuthData = JSON.parse(localStorage.getItem("authdata"));

    const SuperCon =
      resultRolePermssion === ""
        ? ""
        : resultRolePermssion.filter(
            (edx) =>
              edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145
          );

    if (SuperCon.length === 0) {
      if (EmpData === null || EmpData === "") {
        dispatch(
          SuperDatabaseReportAction(
            AuthData.id,
            page,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      } else {
        dispatch(
          SuperDatabaseReportAction(
            "all",
            page,
            12,
            search,
            ProjectN,
            LeadStatys,
            Status,
            ReminderStatus,
            StartDates,
            EndDate,
            SalesConsul,
            ReminderPriority,
            AuthData.company_id
          )
        );
      }
    } else {
      dispatch(
        SuperDatabaseReportAction(
          "all",
          page,
          12,
          search,
          ProjectN,
          LeadStatys,
          Status,
          ReminderStatus,
          StartDates,
          EndDate,
          SalesConsul,
          ReminderPriority,
          AuthData.company_id
        )
      );
    }

    // setcurrentPage(currentPage);
  };

  const paginationComponentOptions = {
    rowsPerPageText: "Per Page Record",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Client Database</h2>
          </div>
          {/* {
  EmpData == '' || EmpData == null || EmpData == undefined ? (
      <>
      <div className="form-group ">
<button className='btn btn-danger mr-1' type="button" onClick={(e) => {
    e.preventDefault();
    window.location.href=`${actionConfig.REACT_APP_URL}listsuperdatabaseexport?q=${search}&fdate=${StartDates}&tdate=${EndDate}`;
    }}>Export</button>
</div>
      </>
  ):(
      <></>
  )
} */}
        </div>

        <div class="row pb-3">
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Search Client No</label>
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Search Client No"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-2">
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

          {SuperConx.length === 0 ? (
            <>
              {EmpData === null || EmpData === "" ? (
                <></>
              ) : (
                <>
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
                </>
              )}
            </>
          ) : (
            <>
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
            </>
          )}

          <div class="col-md-2">
            <div class="form-group">
              <label for="">Projects</label>
              <select
                name="projectN"
                id=""
                class="form-control"
                onChange={(e) => setProjectN(e.target.value)}
              >
                <option value="">Select All</option>
                {resultlistdashboard === "" ||
                resultlistdashboard === null ||
                resultlistdashboard === undefined ||
                resultlistdashboard.length === 0 ||
                resultlistdashboard.code === "ERR_BAD_REQUEST" ||
                resultlistdashboard.code === "ERR_NETWORK" ? (
                  <></>
                ) : resultlistdashboard.status === 429 ? (
                  <></>
                ) : (
                  resultlistdashboard.ProjectAdd.map((curElem) => {
                    return <option value={curElem.id}>{curElem.title}</option>;
                  })
                )}
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Lead Status</label>
              <select
                name="leadStatus"
                id=""
                className="form-control"
                onChange={(e) => setLeadStatys(e.target.value)}
              >
                <option value="">Select Option</option>
                {ListFormData === "" ||
                ListFormData === null ||
                ListFormData === undefined ||
                ListFormData.length === 0 ||
                ListFormData.code === "ERR_BAD_REQUEST" ||
                ListFormData.code === "ERR_NETWORK" ? (
                  <></>
                ) : ListFormData.status === 429 ? (
                  <></>
                ) : (
                  ListFormData.leadStatus.map((curElem) => {
                    return (
                      <option value={curElem.id}>
                        {curElem.PercentageTitle}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Status</label>
              <select
                name="status"
                id=""
                className="form-control"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Option</option>
                <option value="0">Self Leads</option>
                <option value="1">Redbox Leads</option>
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Reminder Status</label>
              <select
                name="ReminderStatus"
                id=""
                className="form-control"
                onChange={(e) => setReminderStatus(e.target.value)}
              >
                <option value="">Select All</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Overdue">Overdue</option>
                <option value="All">All</option>
              </select>
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Priority</label>
              <select
                class="form-control"
                name="priority"
                id="clientStatus"
                onChange={(e) => setReminderPriority(e.target.value)}
                value={ReminderPriority}
              >
                <option value="">Select Priority...</option>
                <option value="Very hot">Very hot</option>
                <option value="Moderate">Hot</option>
                <option value="Cold">Cold</option>
                <option value="Very cold">Very cold</option>
                <option value="Moderate">Moderate</option>
              </select>
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

        {/* <div className="row">
<div className="col-md-12 pb-3">
<h4>Total Records : <span className='badge badge-danger'>{superDatabaseData.TotalCount}</span></h4>
</div>
</div> */}

        <div className="row">
          <div className="col-sm">
            <DataTable
              columns={columns}
              data={superDatabaseData.data}
              // selectableRows
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              pagination
              paginationServer
              paginationTotalRows={superDatabaseData.TotalCount}
              onChangeRowsPerPage={handlePerRowsChange}
              onChangePage={handlePageChange}
              paginationComponentOptions={paginationComponentOptions}
              // theme="solarized"
            />
          </div>
        </div>
      </div>

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
                      href={`tel:66` + GetPhoneNo}
                      title="Phone Call"
                      className="PhoneCall leadimpression"
                      onClick={() =>
                        CallingAction("phone", AuthDatas.id, GetLeadId)
                      }
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-phone.png"
                          alt="icon"
                        />
                        <span className="badge badge-pill badge-warning phone impData Phone">
                          {proCallingresult.Phone}
                        </span>
                        <br />
                        <small>Phone</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <a
                      href={`https://wa.me/` + GetPhoneNo}
                      title="Whatsapp"
                      onClick={() =>
                        CallingAction("whatsapp", AuthDatas.id, GetLeadId)
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
                          {proCallingresult.whatsapp}
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
                        CallingAction("sms", AuthDatas.id, GetLeadId)
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
                          {proCallingresult.sms}
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
                        CallingAction("email", AuthDatas.id, GetLeadId)
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
                          {proCallingresult.email}
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
                      href="javascript:;"
                      data="share"
                      className="ActionPerform"
                      onClick={() => MyFuncAction("share")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-share.png"
                          alt="icon"
                        />
                        <br />
                        <small>Share</small>
                      </center>
                    </a>
                  </div>
                  <div className="col">
                    <NavLink
                      to={`/activities/${GetLeadId}/${GetCustomerId}`}
                      className="addLeads"
                      onClick={() => MyFuncAction("addActivity")}
                    >
                      <center>
                        <img
                          className="img-fluid rounded w-60"
                          src="FrontAsset/dist/img/icons/icn-activity.png"
                          alt="icon"
                        />
                        <br />
                        <small>Activity</small>
                      </center>
                    </NavLink>
                  </div>
                  {/* <div className="col">
<NavLink to={`/add-reminder/${GetLeadId}/${GetCustomerId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div> */}
                  <div className="col">
                    <a
                      href="javascript:;"
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

                  {/* <div className="col">
<a href="javascript:;" data="hot" className="ActionPerform NotInterested" onClick={()=>HotAddACtion()}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-hot.png" alt="icon" /><br />
<small>Hot</small>
</center>
</a>
</div> */}
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
                          <div className="custom-control custom-radio mt-1 pl-0">
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
                  <form onSubmit={AddShareFormData}>
                    <div className="form-group">
                      <label>Select Agent</label>
                      <select
                        name="agentid"
                        className="form-control custom-select select2 mt-15"
                        onChange={(e) => setGetAgentId(e.target.value)}
                        value={GetAgentId}
                        required
                      >
                        <option value="" selected>
                          Select Agent...
                        </option>
                        {Employeeresult.map((curElem, index) => {
                          return curElem.id == AuthDatas.id ? (
                            <></>
                          ) : (
                            <>
                              <option key={index} value={curElem.id}>
                                {curElem.emp_name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Percentage</label>
                      <select name="percentage" className="form-control">
                        <option value="">Select Percentage</option>
                        {lis}
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
}

export default ListSuperDatabaseReport;
