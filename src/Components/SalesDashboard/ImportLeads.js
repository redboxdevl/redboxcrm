import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import Swal from "sweetalert2";
import Moment from "moment";
import $ from "jquery";
import { ImportLeadAction } from "../../redux/action/ImportLeadAction";
import { actionConfig } from "../../configuration";
import { useCSVDownloader } from "react-papaparse";
import { ImportEmployeeAction } from "../../redux/action/ImportEmployeeAction";
import ReactPaginate from "react-paginate";
import Checkbox from "./Checkbox";
import DataTable from "react-data-table-component";
import { EmployeemanagerAction } from "../../redux/action/EmployeemanagerAction";
import LoadingSpinner from "../FinanceDashboard/LoadingSpinner";

const ImportLeads = () => {
  const { CSVDownloader, Type } = useCSVDownloader();

  const resulImportLeads = useSelector(
    (state) => state.ImportLeadreducers.singleimport
  );
  const resulImportEmployee = useSelector(
    (state) => state.ImportEmployeereducers.importempdata
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const listDashboard = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const resultemployeemanager = useSelector(
    (state) => state.Employeemanagerreducers.employeemanagerdata
  );
  const resultInventories = useSelector(
    (state) => state.inventoriesreducer.inventoriesdata
  );

  const dispatch = useDispatch();

  const importLeadsImport = resultRolePermssion.filter(
    (edx) => edx.feature_id == 86 && edx.sub_features == "Import"
  );

  const [ImpAct, setImpAct] = useState("agent");
  const [AgentIdAct, setAgentIdAct] = useState("");
  const [search, setSearch] = useState("");

  const EmpData = JSON.parse(localStorage.getItem("empTeam"));
  const EmpData2 = JSON.parse(localStorage.getItem("empTeam"));
  const authdata = JSON.parse(localStorage.getItem("authdata"));

  console.log("authdata", authdata);

  $(document).on("click", ".ImpList", function () {
    var TodosL = $(this).attr("datatext");
    setImpAct(TodosL);
  });

  $(document).on("click", ".getEmpId", function () {
    var agentId = $(this).attr("attrId");
    setAgentIdAct(agentId);
  });

  const navigate = useNavigate();

  const [ProjectNature, setProjectNature] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [checked, setChecked] = useState([]);
  const [ImportLeadList, setImportLeadList] = useState(resulImportLeads);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const [DuplicateValues, setDuplicateValues] = useState([]);

  const ListDuplicate = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}getduplicateleads`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDuplicateValues(await GetArray);
  };

  useEffect(() => {
    ListDuplicate();
  }, []);

  const [ProjectFilter, setProjectFilter] = useState("");
  const [NatureFilter, setNatureFilter] = useState("");
  const [StatusFilter, setStatusFilter] = useState("");
  const [ShowEntries, setShowEntries] = useState("");
  const [currentPage, setcurrentPage] = useState("");
  const [LeadSource, setLeadSource] = useState("");
  const [LeadFormCreator, setLeadFormCreator] = useState("");
  const [Supervisor, setSupervisor] = useState("");
  const [CampaignKv, setCampaignKv] = useState("");
  const [AdSpend, setAdSpend] = useState("");
  const [CPL, setCPL] = useState("");
  const [CampaignName, setCampaignName] = useState("");
  const [ProjectName, setProjectName] = useState("");

  const [LoadingS, setLoadingS] = useState(false);

  const [ItemSelectableRows, setItemSelectableRows] = useState([]);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (
      EmpData == "" ||
      EmpData == null ||
      EmpData == undefined ||
      EmpData2.teamStatus == "manager"
    ) {
      dispatch(ImportEmployeeAction(1, 12, search, "", AuthData.company_id));
      dispatch(
        ImportLeadAction(
          "inactive",
          1,
          ShowEntries,
          ProjectFilter,
          "",
          AuthData.company_id,
          StatusFilter
        )
      );
      dispatch(EmployeemanagerAction(1, 12));
    } else {
      dispatch(
        ImportEmployeeAction(
          1,
          12,
          search,
          EmpData.teamObj,
          AuthData.company_id
        )
      );
      dispatch(
        ImportLeadAction(
          "inactive",
          1,
          ShowEntries,
          ProjectFilter,
          AuthData.id,
          AuthData.company_id,
          StatusFilter
        )
      );
      dispatch(EmployeemanagerAction(1, 12));
    }

    // const interval = setInterval(() => {

    // }, 3000);
    // return () => clearInterval(interval);
  }, [ShowEntries == "" || ShowEntries == null ? "" : ShowEntries]);

  const changeHandler = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const AddImportLeadData = (e) => {
    e.preventDefault();

    setLoadingS(true);

    const formData = new FormData();

    formData.append("uploadFile", uploadFile);
    formData.append("nature", ProjectNature);
    formData.append("leadSourceId", LeadSource);
    formData.append("leadProid", ProjectName);
    formData.append("creatorId", LeadFormCreator);
    formData.append("supervisorId", Supervisor);
    formData.append("adSpend", AdSpend);
    formData.append("cpl", CPL);
    formData.append("campaignName", CampaignName);
    formData.append("companyId", authdata.company_id);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}importleads`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.code == "200") {
          Swal.fire("Good job!", result.message, "success");
          navigate("/import-leads");
          dispatch(ImportLeadAction("inactive"));
          setLoadingS(false);
        } else {
          Swal.fire("Error!", result.message, "error");
          setLoadingS(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    e.target.reset();
  };

  const LeadsAssignData = (agentId) => {
    if (window.confirm("Do You want to Move Leads")) {
      const getData = agentId;
      const formData = new FormData();

      formData.append("agentid", getData);
      formData.append("leadid", JSON.stringify(ItemSelectableRows));
      formData.append("companyId", authdata.company_id);

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(
        `${actionConfig.REACT_APP_URL}employeeleaddistribution`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("result", result);
          if (result.code == "200") {
            Swal.fire("Good job!", result.message, "success");
            navigate("/import-leads");
            setChecked("");
            const AuthData = JSON.parse(localStorage.getItem("authdata"));
            dispatch(
              ImportLeadAction(
                "inactive",
                1,
                ShowEntries,
                ProjectFilter,
                AuthData.id,
                AuthData.company_id,
                StatusFilter
              )
            );
            window.location.reload();
          } else {
            Swal.fire("Error!", result.message, "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const LeadsShift = (agentId) => {
    // event.preventDefault();
    //  const getData = event.target.parentNode.getAttribute("attrId");

    if (window.confirm("Do You want to Move Leads")) {
      const getData = agentId;
      const formData = new FormData();

      formData.append("agentid", getData);
      formData.append("leadid", JSON.stringify(ItemSelectableRows));
      formData.append("companyId", authdata.company_id);
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(
        `${actionConfig.REACT_APP_URL}assignconsultantleads`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("result", result);
          if (result.code == "200") {
            Swal.fire("Good job!", result.message, "success");
            navigate("/import-leads");
            setChecked("");
            dispatch(ImportLeadAction("inactive"));
            window.location.reload();
          } else {
            Swal.fire("Error!", result.message, "error");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
    }
  };

  const dataSample = [
    "name",
    "email",
    "phone",
    "project",
    "designation",
    "gender",
  ];

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(ImportLeadAction("inactive", currentPage, 20));
    setcurrentPage(currentPage);
    // setImportLeadList(resulImportLeads.data);
  };

  const handlePageClickEmp = (data) => {
    let currentPage = data.selected + 1;

    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (
      EmpData == "" ||
      EmpData == null ||
      EmpData == undefined ||
      EmpData2.teamStatus == "manager"
    ) {
      dispatch(
        ImportEmployeeAction(currentPage, 12, search, "", AuthData.company_id)
      );
    } else {
      dispatch(
        ImportEmployeeAction(
          currentPage,
          12,
          search,
          EmpData.teamObj,
          AuthData.company_id
        )
      );
    }
    // dispatch(ImportEmployeeAction(currentPage,12,search));
    // setImportLeadList(resulImportLeads.data);
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(resulImportLeads.data.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const FilterSearch = () => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const EmpData = JSON.parse(localStorage.getItem("empTeam"));
    if (
      EmpData == "" ||
      EmpData == null ||
      EmpData == undefined ||
      EmpData2.teamStatus == "manager"
    ) {
      dispatch(
        ImportLeadAction(
          "inactive",
          currentPage,
          ShowEntries,
          ProjectFilter,
          "",
          AuthData.company_id,
          StatusFilter
        )
      );
    } else {
      dispatch(
        ImportLeadAction(
          "inactive",
          currentPage,
          ShowEntries,
          ProjectFilter,
          AuthData.id,
          AuthData.company_id,
          StatusFilter
        )
      );
    }
    // dispatch(ImportLeadAction('inactive',currentPage,ShowEntries,ProjectFilter));
  };

  const myHandleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      if (ImportLeadList == "" || ImportLeadList == null) {
      } else {
        const checkedvalue = ImportLeadList.data.map((importlead) => {
          return { ...importlead, isChecked: checked };
        });
        console.log("checkedvalue", checkedvalue);
        setImportLeadList(checkedvalue);
      }
    }
  };

  const columns = [
    {
      name: "Phone",
      selector: (row) => row.clientPhone,
    },
    {
      name: "Date",
      selector: (row) => row.created_at,
    },
    {
      name: "Project Name",
      selector: (row) => row.clientProject,
    },
    {
      name: "Nature Projects",
      selector: (row) => row.nature,
    },
    {
      name: "Lead Status",
      selector: (row) => row.leadType,
    },
  ];

  const columnsEMp = [
    {
      name: "Agent",
      selector: (row) => (
        <img
          className="img-fluid rounded"
          src={
            row.profile_pic == null
              ? `https://via.placeholder.com/150x150`
              : `${actionConfig.REACT_APP_MAIN}${row.profile_pic}`
          }
          alt="icon"
          style={{ width: "48%" }}
        />
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => row.emp_name,
    },
    {
      name: "Assign Leads",
      selector: (row) => row.AssignLeadsTotal,
    },
    {
      name: "Today Leads",
      selector: (row) => row.AssignLeadsToday,
    },
    {
      name: "Total Leads",
      selector: (row) => row.AssignLeadsAll,
    },
  ];

  const paginationComponentOptions = {
    rowsPerPageText: "Per Page Record",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const handlePageChange = (page) => {
    console.log("page", page);
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    // let currentPage = data.selected + 1;
    dispatch(
      ImportLeadAction(
        "inactive",
        page,
        12,
        ProjectFilter,
        "",
        AuthData.company_id,
        StatusFilter
      )
    );
    // setcurrentPage(currentPage);
  };

  const handlePageEmpChange = (page) => {
    console.log("page", page);
    // let currentPage = data.selected + 1;
    dispatch(ImportEmployeeAction(page, 12, search));
    // setcurrentPage(currentPage);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("newPerPage", newPerPage);
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(
      ImportLeadAction(
        "inactive",
        page,
        newPerPage,
        ProjectFilter,
        "",
        AuthData.company_id,
        StatusFilter
      )
    );
  };

  const handlePerRowsEmpChange = async (newPerPage, page) => {
    console.log("newPerPage", newPerPage);
    // dispatch(ImportLeadAction('inactive',page,newPerPage));
    dispatch(ImportEmployeeAction(page, newPerPage, search, ProjectFilter));
  };

  const handleChangeSelectableRow = ({ selectedRows }) => {
    console.log("selectableRow", selectedRows);
    setItemSelectableRows(selectedRows);
  };

  const onRowClicked = (row, event) => {
    console.log(row.id);
  };

  return (
    <>
      <Navigation />
      {LoadingS == true ? <LoadingSpinner /> : ""}
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Import Leads</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="hk-row">
              <div className="col-sm-12">
                <div className="card-group hk-dash-type-2">
                  {EmpData == "" || EmpData == null || EmpData == undefined ? (
                    <>
                      <div className="card card-sm">
                        <div className="card-body">
                          <form onSubmit={AddImportLeadData}>
                            <div className="d-flex justify-content-between mb-5">
                              <div>
                                <span className="d-block font-15 text-dark font-weight-500">
                                  File Import
                                </span>
                              </div>
                              <div>
                                <CSVDownloader
                                  filename={`sampleimportleadss`}
                                  className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm text-white mr-1"
                                  data={() => {
                                    return [dataSample];
                                  }}
                                >
                                  Generate Sample Csv
                                </CSVDownloader>
                                {importLeadsImport.length == 0 ? (
                                  <></>
                                ) : (
                                  <button
                                    type="submit"
                                    className="btn btn-danger btn-wth-icon btn-rounded icon-right btn-sm"
                                  >
                                    <span className="btn-text">Import</span>{" "}
                                    <span className="icon-label">
                                      <i className="fa fa-upload"></i>{" "}
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <span className="input-group-text">
                                    Excel/CSV{" "}
                                    <input
                                      type="file"
                                      onChange={changeHandler}
                                      style={{ marginLeft: 10 }}
                                      required
                                    />
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    placeholder="Nature Sheet"
                                    onChange={(e) =>
                                      setProjectNature(e.target.value)
                                    }
                                    value={ProjectNature}
                                  />
                                </div>
                              </div>
                            </div>

                            <div></div>
                          </form>
                        </div>
                      </div>
                      <div className="card card-sm">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-5">
                            <div>
                              <span className="d-block font-15 text-dark font-weight-500">
                                Filter
                              </span>
                            </div>
                            <div>
                              <button
                                className="btn btn-danger btn-wth-icon btn-rounded icon-right btn-sm"
                                onClick={FilterSearch}
                              >
                                <span className="btn-text">Search</span>{" "}
                                <span className="icon-label">
                                  <i className="fa fa-search"></i>{" "}
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <span className="d-block display-4 text-dark mb-5">
                                <select
                                  name="videoFormat"
                                  className="form-control mt-1 videoFormat"
                                  onChange={(e) =>
                                    setProjectFilter(e.target.value)
                                  }
                                >
                                  <option value="" defaultValue="">
                                    All Projects
                                  </option>
                                  {resultlistdashboard == "" ||
                                  resultlistdashboard == null ||
                                  resultlistdashboard.code == "ERR_NETWORK" ? (
                                    <></>
                                  ) : (
                                    resultlistdashboard.getAllProjects.map(
                                      (item, key) => {
                                        return item.clientProject == "" ? (
                                          <></>
                                        ) : (
                                          <option
                                            value={item.clientProject}
                                            key={key + 1}
                                          >
                                            {item.clientProject}
                                          </option>
                                        );
                                      }
                                    )
                                  )}
                                </select>
                              </span>
                            </div>
                            <div className="col-md-6">
                              <span className="d-block display-4 text-dark mb-5">
                                <select
                                  name="videoFormat"
                                  className="form-control mt-1 videoFormat"
                                  onChange={(e) =>
                                    setNatureFilter(e.target.value)
                                  }
                                >
                                  <option value="" defaultValue="">
                                    All Nature Status{" "}
                                  </option>
                                  {listDashboard == "" ||
                                  listDashboard == null ||
                                  listDashboard.code == "ERR_NETWORK" ? (
                                    <></>
                                  ) : (
                                    listDashboard.getAllNature.map(
                                      (item, key) => {
                                        return item.nature == "" ? (
                                          <></>
                                        ) : (
                                          <option
                                            value={item.nature}
                                            key={key + 1}
                                          >
                                            {item.nature}
                                          </option>
                                        );
                                      }
                                    )
                                  )}
                                </select>
                              </span>
                            </div>
                            <div className="col-md-12">
                              <span className="d-block display-4 text-dark mb-5">
                                <select
                                  name="videoFormat"
                                  className="form-control mt-1"
                                  onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                  }
                                >
                                  <option value="" defaultValue="">
                                    All Status
                                  </option>
                                  {DuplicateValues.map((item, key) => {
                                    return item.leadType == "" ? (
                                      <></>
                                    ) : (
                                      <option
                                        value={item.leadType}
                                        key={key + 1}
                                      >
                                        {item.leadType}
                                      </option>
                                    );
                                  })}
                                </select>
                              </span>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <select
                                  name="pageEntries"
                                  id=""
                                  className="form-control"
                                  onChange={(e) =>
                                    setShowEntries(e.target.value)
                                  }
                                >
                                  <option value="">Show Entries</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="15">15</option>
                                  <option value="20">20</option>
                                  <option value="30">30</option>
                                  <option value="40">40</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                  <option value="200">200</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="hk-row">
              <div className="col-lg-6">
                <div className="card card-refresh">
                  <div className="refresh-container">
                    <div className="loader-pendulums"></div>
                  </div>
                  <div className="card-header card-header-action">
                    <div className="d-flex">
                      <div className="btn-group btn-group-sm" role="group">
                        {EmpData == "" ||
                        EmpData == null ||
                        EmpData == undefined ? (
                          <>
                            <button
                              type="button"
                              className={
                                ImpAct == "manager"
                                  ? "btn btn-outline-primary ImpList active"
                                  : "btn btn-outline-primary ImpList"
                              }
                              datatext="manager"
                            >
                              Manger Wise
                            </button>

                            <button
                              type="button"
                              className={
                                ImpAct == "agent"
                                  ? "btn btn-outline-primary ImpList active"
                                  : "btn btn-outline-primary ImpList"
                              }
                              datatext="agent"
                            >
                              Agent Wise
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-body pa-0">
                    <DataTable
                      title="Import leads"
                      columns={columns}
                      data={resulImportLeads.data}
                      selectableRows
                      onSelectedRowsChange={handleChangeSelectableRow}
                      pagination
                      paginationServer
                      paginationTotalRows={Math.round(
                        resulImportLeads.TotalCount / 12
                      )}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      paginationComponentOptions={paginationComponentOptions}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header card-header-action d-flex align-items-center">
                    <h6>Shift Leads Agent Wise</h6>
                  </div>
                  <div className="card-body pa-0">
                    <div className="table-wrap">
                      <div
                        className={
                          ImpAct == "manager"
                            ? "table-responsive"
                            : "table-responsive d-none"
                        }
                      >
                        <table className="table table-sm table-hover mb-0">
                          <thead className="thead-dark">
                            <tr>
                              <th>Manager</th>
                              <th>Project Name</th>
                              <th>Assign Leads</th>
                              <th>Today Leads</th>
                              <th>Total Leads</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultemployeemanager.data == null ||
                            resultemployeemanager == "" ||
                            resultemployeemanager == null ||
                            resultemployeemanager.length == 0 ? (
                              <>Loading.....</>
                            ) : resultemployeemanager.data.length > 0 ? (
                              resultemployeemanager.data.map(
                                (curElem, index) => {
                                  return (
                                    <tr
                                      onClick={() =>
                                        LeadsAssignData(curElem.id)
                                      }
                                      className="getEmpId"
                                      attrId={curElem.id}
                                      style={{ cursor: "pointer" }}
                                      key={index + 1}
                                    >
                                      <td>
                                        <img
                                          className="img-fluid rounded"
                                          src={
                                            curElem.profile_pic == null
                                              ? `https://via.placeholder.com/150x150`
                                              : `${actionConfig.REACT_APP_MAIN}${curElem.profile_pic}`
                                          }
                                          alt="icon"
                                          style={{ width: "30px" }}
                                        />
                                      </td>
                                      <td width={400}>
                                        {curElem.emp_name} -{" "}
                                        {curElem.department_name}
                                      </td>
                                      <td>{curElem.AssignLeadsTotal}</td>
                                      <td>{curElem.AssignLeadsToday}</td>
                                      <td>{curElem.AssignLeadsAll}</td>
                                    </tr>
                                  );
                                }
                              )
                            ) : (
                              <>
                                <tr>
                                  <td colSpan="5">
                                    <b>No record Found....</b>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div
                        className={
                          ImpAct == "agent"
                            ? "table-responsive"
                            : "table-responsive d-none"
                        }
                      >
                        <table className="table table-sm table-hover mb-0">
                          <thead className="thead-dark">
                            <tr>
                              <th>Agent</th>
                              <th>Employee Name</th>
                              <th>Assign Leads</th>
                              <th>Today Leads</th>
                              <th>Total Leads</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resulImportEmployee.data == null ? (
                              <>Loading.....</>
                            ) : resulImportEmployee.data.length > 0 ? (
                              resulImportEmployee.data.map((curElem, index) => {
                                return (
                                  <tr
                                    onClick={() => LeadsShift(curElem.id)}
                                    className="getEmpId"
                                    attrId={curElem.id}
                                    style={{ cursor: "pointer" }}
                                    key={index + 1}
                                  >
                                    <td>
                                      <img
                                        className="img-fluid rounded"
                                        src={
                                          curElem.profile_pic == null
                                            ? `https://via.placeholder.com/150x150`
                                            : `${actionConfig.REACT_APP_MAIN}${curElem.profile_pic}`
                                        }
                                        alt="icon"
                                        style={{ width: "30px" }}
                                      />
                                    </td>
                                    <td width={400}>
                                      {curElem.emp_name} -{" "}
                                      {curElem.department_name}
                                    </td>
                                    <td>{curElem.AssignLeadsTotal}</td>
                                    <td>{curElem.AssignLeadsToday}</td>
                                    <td>{curElem.AssignLeadsAll}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <>
                                <tr>
                                  <td colSpan="5">
                                    <b>No record Found....</b>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>

                        <div className="pb-3 pt-0">
                          <ReactPaginate
                            previousLabel={`previous`}
                            nextLabel={`next`}
                            breakLabel={`...`}
                            pageCount={Math.ceil(
                              resulImportEmployee.TotalCount / 12
                            )}
                            marginPagesDisplayed={3}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClickEmp}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportLeads;
