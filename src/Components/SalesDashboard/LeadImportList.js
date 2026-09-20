import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Includes/Navigation";
import { LeadImportDataAction } from "../../redux/action/LeadImportDataAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { actionConfig } from "../../configuration";

function LeadImportList() {
  let navigate = useNavigate();

  const superLeadImportData = useSelector(
    (state) => state.Leadimportdatareducers.leadimportdataitems
  );
  const resultlistdashboard = useSelector(
    (state) => state.dashboardListReducers.dashboardlistcount
  );
  const DashboardData = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [StartDates, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [ProjectN, setProjectN] = useState("");

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

  console.log("superLeadImportData", superLeadImportData);

  useEffect(() => {
    dispatch(
      LeadImportDataAction(1, 20, search, ProjectN, StartDates, EndDate)
    );
  }, []);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(
      LeadImportDataAction(
        currentPage,
        20,
        search,
        ProjectN,
        StartDates,
        EndDate
      )
    );
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(
      LeadImportDataAction(1, 20, search, ProjectN, StartDates, EndDate)
    );
  };

  const SuperDatabaseExport = () => {
    alert("done");
  };

  console.log("actionConfig", actionConfig.REACT_APP_URL);
  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            {/* <h2 className="hk-pg-title font-weight-600">Import Lead Database Reporting</h2> */}
          </div>
          <div className="form-group ">
            <button
              className="btn btn-danger mr-1"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `${actionConfig.REACT_APP_URL}exportimportleadsreport?search=${search}&fdate=${StartDates}&tdate=${EndDate}&project=${ProjectN}`;
              }}
            >
              Export
            </button>
          </div>
        </div>

        <div class="row pb-3">
          <div className="col-md-3">
            <div className="form-group">
              <label htmlFor="">Search Phone No</label>
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="Search Phone No...."
                onChange={(e) => setSearch(e.target.value)}
              />
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
          <div className="col-md-12 pb-3">
            <h4>
              Total Records :{" "}
              <span className="badge badge-danger">
                {superLeadImportData.TotalCountData}
              </span>
            </h4>
          </div>
        </div>

        <div className="row">
          <div className="col-sm">
            <div className="table-wrap table-responsive">
              <table
                id="datable_1"
                className="table table-hover w-100 display pb-30"
              >
                <thead className="thead-dark">
                  <tr>
                    <th>Client Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Project</th>
                    <th>Designation</th>
                    <th>Nature</th>
                    <th>Lead Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {superLeadImportData == "" ||
                  superLeadImportData.length == 0 ||
                  superLeadImportData == undefined ||
                  superLeadImportData.code == "ERR_NETWORK" ? (
                    <>Loading.....</>
                  ) : superLeadImportData.data.length == 0 ||
                    superLeadImportData.data == "" ||
                    superLeadImportData.data == null ? (
                    <></>
                  ) : superLeadImportData.data.length > 0 ? (
                    superLeadImportData.data.map((curElem) => {
                      return (
                        <tr>
                          <td>{curElem.clientName}</td>
                          <td>{curElem.clientPhone}</td>
                          <td>{curElem.clientemail}</td>
                          <td>{curElem.clientProject}</td>
                          <td>{curElem.clientDesignation}</td>
                          <td>{curElem.nature}</td>
                          <td>{curElem.leadStatus}</td>
                          <td>{curElem.created_at}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan="8">
                          <b>Loading.....</b>
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
                pageCount={Math.ceil(superLeadImportData.TotalCount / 20)}
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
    </>
  );
}

export default LeadImportList;
