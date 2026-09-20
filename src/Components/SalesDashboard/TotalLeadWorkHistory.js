import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import { ReminderLeadsAction } from "../../redux/action/ReminderLeadsAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Link, useParams } from "react-router-dom";
import { TlwLeadsAction } from "../../redux/action/TlwLeadsAction";
import { actionConfig } from "../../configuration";

const TotalLeadWorkHistory = () => {
  let { id } = useParams();
  const resultLeadHistory = useSelector(
    (state) => state.Tlwleadreducers.tlwleaddata
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TlwLeadsAction(id, 1, 12));
  }, [id]);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(TlwLeadsAction(id, currentPage, 12));
  };

  console.log("resultLeadHistory", resultLeadHistory);

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
          <div>
            <h2 className="hk-pg-title font-weight-600">Lead Work History {resultLeadHistory.empName}</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>
              Leads Performance{" "}
              <span className="badge badge-danger">
                {resultLeadHistory.TotalCount}
              </span>
            </h3>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Client Name</th>
                </tr>
              </thead>
              <tbody>
                {resultLeadHistory == "" ||
                resultLeadHistory == undefined ||
                resultLeadHistory == null ||
                resultLeadHistory.code == "ERR_NETWORK" || resultLeadHistory.code == "ERR_BAD_RESPONSE" || resultLeadHistory.length == 0 ? (
                  <>Loading.....</>
                ) : resultLeadHistory.data.length > 0 ? (
                  resultLeadHistory.data.map((curElem, index) => {
                    return (
                      <tr>
                        <td>
                          <h5>
                            {curElem.clientName} - {curElem.mobileNo}
                          </h5>
                          <h6>
                            {curElem.clientProject} - {curElem.publishAgentDate}
                          </h6>
                          <p>
                            <span
                              className={`badge badge-${
                                curElem.leadStatus == "Assign"
                                  ? "danger"
                                  : "primary"
                              }`}
                            >
                              {/* {curElem.leadStatus} */}
                            </span>
                          </p>

                          {curElem.getActivities.length == 0 ? (
                            <>
                              <p>{curElem.clientActivityDesc}</p>
                            </>
                          ) : (
                            <>
                              <ul>
                                {curElem.getActivities.map((item, keyx) => {
                                  return (
                                    <>
                                      <li style={{ listStyle: "outside" }}>
                                        {item.activityDetails}
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </>
                          )}

                          {curElem.Zongcalling.length == 0 ? (
                            <></>
                          ) : (
                            <>
                              <ul>
                                {curElem.Zongcalling.map((item, keyx) => {
                                  let AudioRec =
                                    item.recording.substr(
                                      0,
                                      item.recording.lastIndexOf(".")
                                    ) + ".mp3";
                                  return (
                                    <>
                                      <li style={{ listStyle: "outside" }}>
                                        <audio controls key={item.id}>
                                          <source
                                            src={AudioRec}
                                            type="audio/mp3"
                                          />
                                        </audio>
                                        <h6>{item.status}</h6>
                                        <p>{item.datetime}</p>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan="1">
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
                pageCount={Math.ceil(resultLeadHistory.TotalCount / 12)}
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
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default TotalLeadWorkHistory;
