import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { actionConfig } from "../../configuration";
import OtherNavigation from "../../Includes/OtherNavigation";
import QuickNav from "../../Includes/QuickNav";
import {
  getDashboardListACtion,
  loadingToggleAction,
} from "../../redux/action/getDashboardListACtion";
import axios from "axios";
import { TaskManegementAction } from "../../redux/action/TaskManegementAction";
import { TaskSelfAction } from "../../redux/action/TaskSelfAction";

const TaskDashboard = () => {
  const navigate = useNavigate();

  const resultListing = useSelector(
    (state) => state.TaskManagementreducers.singletaskmanagent
  );
  const resultSelfTask = useSelector(
    (state) => state.Taskselfreducers.singletaskmanagentself
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const ListData = useSelector((state) => state.Listformreducer.listformdata);
  const dispatch = useDispatch();

  const [Employeeresult, setEmployeeresult] = useState([]);
  const [DepartmentResult, setDepartmentResult] = useState([]);

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

  const ListDepartment = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}department?agentId=1`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartmentResult(await GetArray);
  };

  const [DueDate, setDueDate] = useState("");
  const [DepartmentId, setDepartmentId] = useState("");
  const [AssignConsultant, setAssignConsultant] = useState("");
  const [taskStatus, settaskStatus] = useState("");
  const [taskPriority, settaskPriority] = useState("");

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(TaskManegementAction(AuthData.id));
    dispatch(TaskSelfAction(AuthData.id));
    GetEmployeeData();
    ListDepartment();
    // const interval = setInterval(() => {
    // }, 3000);
    //   return () => clearInterval(interval);
  }, []);

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
        dispatch(getDashboardListACtion(AuthData.id, ""));
      } else {
        dispatch(getDashboardListACtion("all", EmpData.teamObj));
      }
    } else {
      dispatch(getDashboardListACtion("all", ""));
    }
  }, [dispatch, resultRolePermssion]);

  console.log("resultSelfTask", resultSelfTask);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">
              Task Management Dashboard
            </h2>
            <p>Welcome to Customer Relationship Management for SellMore..</p>
          </div>

          <QuickNav />
        </div>

        <OtherNavigation />

        <div className="hk-row">
          <div className="col-lg-3 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Open Task
                    </span>
                  </NavLink>

                  <span className="badge badge-sm badge-info mb-10">
                    Total 0{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between position-relative">
                  <div>
                    <span className="d-block">
                      <span className="display-5 font-weight-400 text-dark">
                        <span className="counter-anim">
                          {resultlistdashboard == "" ||
                          resultlistdashboard == null
                            ? ""
                            : resultlistdashboard.openTaskToday}
                        </span>
                      </span>
                      <small>Today</small>
                    </span>
                  </div>
                  <div className="position-absolute r-0">
                    <span
                      id="sparkline_1"
                      className="d-flex easy-pie-chart"
                      data-percent="86"
                    >
                      <canvas width="100" height="50"></canvas>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Pending Task
                    </span>
                  </NavLink>

                  <span className="badge badge-sm badge-info mb-10">
                    Total 0{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between position-relative">
                  <div>
                    <span className="d-block">
                      <span className="display-5 font-weight-400 text-dark">
                        <span className="counter-anim">
                          {resultlistdashboard == "" ||
                          resultlistdashboard == null
                            ? ""
                            : resultlistdashboard.PendingTaskToday}
                        </span>
                      </span>
                      <small>Today</small>
                    </span>
                  </div>
                  <div className="position-absolute r-0">
                    <span
                      id="sparkline_1"
                      className="d-flex easy-pie-chart"
                      data-percent="86"
                    >
                      <canvas width="100" height="50"></canvas>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Ongoing Task
                    </span>
                  </NavLink>

                  <span className="badge badge-sm badge-info mb-10">
                    Total 0{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between position-relative">
                  <div>
                    <span className="d-block">
                      <span className="display-5 font-weight-400 text-dark">
                        <span className="counter-anim">
                          {resultlistdashboard == "" ||
                          resultlistdashboard == null
                            ? ""
                            : resultlistdashboard.OngoingTaskToday}
                        </span>
                      </span>
                      <small>Today</small>
                    </span>
                  </div>
                  <div className="position-absolute r-0">
                    <span
                      id="sparkline_1"
                      className="d-flex easy-pie-chart"
                      data-percent="86"
                    >
                      <canvas width="100" height="50"></canvas>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 col-6">
            <div className="card card-sm">
              <div className="card-body">
                <div className="align-items-center d-flex justify-content-between">
                  <NavLink to="">
                    <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                      Complete Task
                    </span>
                  </NavLink>

                  <span className="badge badge-sm badge-info mb-10">
                    Total 0{" "}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between position-relative">
                  <div>
                    <span className="d-block">
                      <span className="display-5 font-weight-400 text-dark">
                        <span className="counter-anim">
                          {resultlistdashboard == "" ||
                          resultlistdashboard == null
                            ? ""
                            : resultlistdashboard.CompleteTaskToday}
                        </span>
                      </span>
                      <small>Today</small>
                    </span>
                  </div>
                  <div className="position-absolute r-0">
                    <span
                      id="sparkline_1"
                      className="d-flex easy-pie-chart"
                      data-percent="86"
                    >
                      <canvas width="100" height="50"></canvas>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row pb-3">
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Due Date</label>
              <input
                type="date"
                className="form-control"
                name="DueDate"
                onChange={(e) => setDueDate(e.target.value)}
                value={DueDate}
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Department</label>
              <select
                name="DepartmentId"
                id=""
                className="form-control"
                onChange={(e) => setDepartmentId(e.target.value)}
                value={DepartmentId}
              >
                <option value="" selected>
                  Select Department
                </option>
                {DepartmentResult.map((curElem, index) => {
                  return (
                    <>
                      <option key={curElem.id} value={curElem.id}>
                        {curElem.department_name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Assign Consultant</label>
              <select
                name="AssignConsultant"
                id=""
                className="form-control"
                onChange={(e) => setAssignConsultant(e.target.value)}
                value={AssignConsultant}
              >
                <option value="" selected>
                  Select Assign Consultant
                </option>
                {Employeeresult.map((curElem, index) => {
                  return (
                    <>
                      <option key={curElem.id} value={curElem.id}>
                        {curElem.emp_name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Task Status</label>
              <select
                name="taskStatus"
                id=""
                className="form-control"
                onChange={(e) => settaskStatus(e.target.value)}
                value={taskStatus}
              >
                <option value="">Select Status</option>
                <option value="0">Pending</option>
                <option value="1">Open</option>
                <option value="2">On Going</option>
                <option value="3">Complete</option>
              </select>
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="">Task Priority</label>
              <select
                name="taskPriority"
                id=""
                className="form-control"
                onChange={(e) => settaskPriority(e.target.value)}
                value={taskPriority}
              >
                <option value="" selected>
                  Select Priority
                </option>
                {ListData == "" ||
                ListData == null ||
                ListData == undefined ||
                ListData.length == 0 ? (
                  <></>
                ) : (
                  ListData.PriorityData.map((item, key) => {
                    return (
                      <option value={item.id}>{item.priorityTitle}</option>
                    );
                  })
                )}
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

        <div class="hk-row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header card-header-action d-flex">
                <div>
                  <h6>All Task</h6>
                </div>
                <div>
                  <NavLink
                    to="/add-task"
                    className="btn btn-primary btn-rounded btn-sm"
                  >
                    Add New Task
                  </NavLink>
                </div>
              </div>
              <div class="card-body">
                <div class="table-wrap">
                  <div class="table-responsive">
                    <table class="table table-sm table-hover mb-0">
                      <thead className="thead-dark">
                        <tr>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Assign By</th>
                          <th>Assign To</th>
                          <th>Priority</th>
                          <th>Created Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {resultListing == null ? (
                          <>Loading.....</>
                        ) : resultListing.length > 0 ? (
                          resultListing.map((curElem, index) => {
                            return (
                              <tr
                                onClick={() => navigate(`/task/${curElem.id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                <td>{curElem.task_title}</td>
                                <td>{curElem.description}</td>
                                <td>{curElem.taskStatus}</td>
                                <td>
                                  {curElem.AssignByEmp == null
                                    ? ""
                                    : curElem.AssignByEmp.emp_name}
                                </td>
                                <td>
                                  {curElem.AssignToEmp == null ||
                                  curElem.AssignToEmp.length == 0 ? (
                                    <></>
                                  ) : (
                                    curElem.AssignToEmp.map((itemxs, key) => {
                                      return <>{itemxs.emp_name}</>;
                                    })
                                  )}
                                </td>
                                <td>
                                  {curElem.PriorityData == null
                                    ? ""
                                    : curElem.PriorityData.priorityTitle}
                                </td>
                                <td>{curElem.dueDate}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <></>
                        )}

                        {resultSelfTask == null ? (
                          <>Loading.....</>
                        ) : resultSelfTask.length > 0 ? (
                          resultSelfTask.map((curElem, index) => {
                            return (
                              <tr
                                onClick={() => navigate(`/task/${curElem.id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                <td>{curElem.task_title}</td>
                                <td>{curElem.description}</td>
                                <td>{curElem.taskStatus}</td>
                                <td>
                                  {curElem.AssignByEmp == null
                                    ? ""
                                    : curElem.AssignByEmp.emp_name}
                                </td>
                                <td>
                                  {curElem.AssignToEmp == null
                                    ? ""
                                    : curElem.AssignToEmp.emp_name}
                                </td>
                                <td>
                                  {curElem.PriorityData == null
                                    ? ""
                                    : curElem.PriorityData.priorityTitle}
                                </td>
                                <td>{curElem.dueDate}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <>
                            <tr>
                              <td colSpan="6">
                                <b></b>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
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

export default TaskDashboard;
