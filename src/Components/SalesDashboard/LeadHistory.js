import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import { ReminderLeadsAction } from "../../redux/action/ReminderLeadsAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Link, useParams } from "react-router-dom";
import { LeadHistoryAction } from "../../redux/action/LeadHistoryAction";

const LeadHistory = () => {
  let { id } = useParams();

  const resultleadHistory = useSelector(
    (state) => state.LeadHistoryreducers.leadhistoryreport
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LeadHistoryAction(id));
  }, [id]);

  console.log("resultleadHistory", resultleadHistory);

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
          <div>
            <h2 className="hk-pg-title font-weight-600">Lead History {resultleadHistory.emp_name} </h2>
            <h5>{resultleadHistory.clientName}</h5>
            <h6>Client No: {resultleadHistory.clientPhone}</h6>
            <h6>Creation Date: {resultleadHistory.created_at}</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>Phone Calls: {resultleadHistory.PhoneCount}</p>
            <p>Whatsapp: {resultleadHistory.whatsappCount}</p>
            <p>SMS: {resultleadHistory.smsCount}</p>
            <p>Email: {resultleadHistory.emailCount}</p>
          </div>
          <div className="col-md-6 text-right">
            <p className="badge badge-primary">
              Current Lead Status : {resultleadHistory.leadStatus}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>Call History</h3>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Extension No</th>
                  <th>Phone</th>
                  <th>recording</th>
                  <th>status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {resultleadHistory == "" ||
                resultleadHistory == null ||
                resultleadHistory.length == 0 ||
                resultleadHistory.callHistory == null ||
                resultleadHistory.callHistory == "" ? (
                  <></>
                ) : (
                  resultleadHistory.callHistory.map((curElem, index) => {
                    let AudioRecx =
                      curElem.recording.substr(
                        0,
                        curElem.recording.lastIndexOf(".")
                      ) + ".mp3";
                    return (
                      <tr>
                        <td>{curElem.ext}</td>
                        <td>{curElem.phone}</td>
                        <td>
                          <audio controls key={curElem.id}>
                            <source src={AudioRecx} type="audio/mp3" />
                          </audio>
                        </td>
                        <td>
                          <span className="badge badge-primary">
                            {curElem.status}
                          </span>
                        </td>
                        <td>{curElem.datetime}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <h3>Activity History</h3>
            <p>
              First Activity :{" "}
              {resultleadHistory.MyLeads == "" ||
              resultleadHistory.MyLeads == null
                ? ""
                : resultleadHistory.MyLeads.clientActivityDesc}
            </p>
            <p>
              Client Interest:{" "}
              {resultleadHistory.MyLeads == "" ||
              resultleadHistory.MyLeads == null
                ? ""
                : resultleadHistory.MyLeads.clientInterst}
            </p>
            {resultleadHistory == "" ||
            resultleadHistory == null ||
            resultleadHistory.length == 0 ||
            resultleadHistory.activtyLog == null ||
            resultleadHistory.activtyLog == "" ? (
              <></>
            ) : (
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Activity Type</th>
                    <th>Interest Percentage</th>
                    <th>Activity Details</th>
                    <th>status</th>
                  </tr>
                </thead>
                <tbody>
                  {resultleadHistory == "" ||
                  resultleadHistory == null ||
                  resultleadHistory.activtyLog == null ||
                  resultleadHistory.activtyLog == "" ? (
                    <></>
                  ) : (
                    resultleadHistory.activtyLog.map((curElem, index) => {
                      return (
                        <tr>
                          <td>
                            {curElem.customer_activity_type == null
                              ? ""
                              : curElem.customer_activity_type.activityName}
                          </td>
                          <td>{curElem.InterestPercentage}</td>
                          <td>{curElem.activityDetails}</td>
                          <td>{curElem.actStatus}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadHistory;
