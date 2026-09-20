import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtherNavigation from "../../Includes/OtherNavigation";
import QuickNav from "../../Includes/QuickNav";
import AttendanceGraph from "./HrGraphs/AttendanceGraph";
import AttendancePieGraph from "./HrGraphs/AttendancePieGraph";
import { actionConfig } from "../../configuration";
import { SingleNoticeBoard } from "../../redux/action/SingleNoticeBoard";

const HrDashboard = () => {
  const NoticeResult = useSelector(
    (state) => state.SingleNoticeboardreducers.singlenoticeboard
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const result = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const dispatch = useDispatch();

  const SuperCondition =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id === 20 || edx.role_id === 18 || edx.role_id === 12
        );

  const SuperDatabaseReportsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 148 && edx.sub_features === "List"
        );

  const AssignLeadsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 50 && edx.sub_features === "List"
        );

  const DailyLeadsReportsList =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 147 && edx.sub_features === "List"
        );

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(SingleNoticeBoard(AuthData.id));
    const interval = setInterval(() => {}, 3000);
    return () => clearInterval(interval);
  }, []);

  console.log(NoticeResult);

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Hr Dashboard</h2>
            {/* <p>Welcome to Customer Relationship Management for SellMore..</p> */}
          </div>

          <QuickNav />
        </div>

        <OtherNavigation />

        <div className="hk-row">
          {SuperCondition.length == 0 ? (
            ""
          ) : (
            <>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body">
                    <div className="align-items-center d-flex justify-content-between">
                      <Link to="/company">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Companies
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/employee">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Employees
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/leave">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Leave
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/training">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Training
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/warning">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Warning
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/attendance">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Attendance
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/branch">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Branch
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/department">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Departments
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/designation">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Designation
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/termination">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Termination
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/job-post">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Job Post
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <Link to="/payroll">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Payroll
                        </span>{" "}
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      <a href="#">
                        {" "}
                        <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                          Today Check In
                        </span>{" "}
                      </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">00:00 AM</span>
                          </span>
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
                      {" "}
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Present This Month
                      </span>{" "}
                    </div>
                    <div className="d-flex align-items-center justify-content-between position-relative">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            <span className="counter-anim">0</span>
                          </span>
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
                      {" "}
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Late This Month
                      </span>{" "}
                    </div>
                    <div className="d-flex align-items-end justify-content-between">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-dark">
                            0
                          </span>{" "}
                        </span>
                      </div>
                      <div> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6 col-6">
                <div className="card card-sm">
                  <div className="card-body">
                    <div className="align-items-center d-flex justify-content-between">
                      {" "}
                      <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">
                        Absent This Month
                      </span>{" "}
                    </div>
                    <div className="d-flex align-items-end justify-content-between">
                      <div>
                        {" "}
                        <span className="d-block">
                          <span className="display-5 font-weight-400 text-danger">
                            0
                          </span>{" "}
                        </span>
                      </div>
                      <div> </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="hk-row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header card-header-action">
                <h6>Attendance</h6>
                <div className="d-flex align-items-center card-action-wrap">
                  <div className="inline-block dropdown">
                    {" "}
                    <a
                      className="dropdown-toggle no-caret"
                      data-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="ion ion-ios-more"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      {" "}
                      <a className="dropdown-item" href="#">
                        Week
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Month
                      </a>
                      <div className="dropdown-divider"></div>{" "}
                      <a className="dropdown-item" href="#">
                        Year
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <AttendancePieGraph />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header card-header-action">
                <h6>Attendance Graph View</h6>
                <div className="d-flex align-items-center card-action-wrap">
                  <div className="inline-block dropdown">
                    {" "}
                    <a
                      className="dropdown-toggle no-caret"
                      data-toggle="dropdown"
                      href="#"
                      aria-expanded="false"
                      role="button"
                    >
                      <i className="ion ion-ios-more"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      {" "}
                      <a className="dropdown-item" href="#">
                        Week
                      </a>{" "}
                      <a className="dropdown-item" href="#">
                        Month
                      </a>
                      <div className="dropdown-divider"></div>{" "}
                      <a className="dropdown-item" href="#">
                        Year
                      </a>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <AttendanceGraph />
              </div>
            </div>
          </div>
        </div>
        <div className="hk-row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header card-header-action">
                <h6>Notice Board</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm">
                    <div className="table-wrap">
                      <div className="table-responsive">
                        <table className="table table-hover table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Description</th>
                              <th>Notice By</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {NoticeResult == "" ? (
                              <></>
                            ) : (
                              NoticeResult.map((data, key) => {
                                return (
                                  <tr>
                                    <td>{data.description}</td>
                                    <td>Tooba Jalees</td>
                                    <td>{data.published_date}</td>
                                    <td>
                                      <a
                                        href="#"
                                        data-toggle="tooltip"
                                        data-original-title="Close"
                                      >
                                        {" "}
                                        <i className="icon-eye txt-danger"></i>{" "}
                                      </a>
                                    </td>
                                  </tr>
                                );
                              })
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

          {/* <div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Upcoming Birthday</h6> </div>
<div className="card-body">
<div className="row">
<div className="col-sm">
<div className="table-wrap">
<div className="table-responsive">
<table className="table table-hover table-bordered mb-0">
<thead>
<tr>
<th>Name</th>
<th>Date Of Birth</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td className="align-items-center d-flex"><img  src="FrontAsset/dist/img/avatar1.jpg" alt="user" className="avatar-img w-45p mr-10 rounded-circle" />Abdul Sami Khan</td>
<td>10-March-2022</td>
<td>
<button className="btn btn-primary btn-sm">Wish</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div> */}
        </div>
      </div>
    </>
  );
};

export default HrDashboard;
