import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../Includes/Navigation";
import { ReminderLeadsAction } from "../../redux/action/ReminderLeadsAction";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { TalktimeAction } from "../../redux/action/TalktimeAction";
import { actionConfig } from "../../configuration";

const Talktimehistory = () => {

  let [searchParams, setSearchParams] = useSearchParams();

  // let { id,datefrom,dateto } = useParams();
  let  id = searchParams.get("id");
  let  datefrom = searchParams.get("datefrom");
  let  dateto = searchParams.get("dateto");
  const resultCallHistory = useSelector(
    (state) => state.Talktimereducers.talktimedata
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TalktimeAction(id,datefrom,dateto, 1, 12));
  }, [id]);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(TalktimeAction(id,datefrom,dateto,currentPage, 12));
  };

  console.log("datefrom",datefrom);

  return (
    <>
      <Navigation />
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
          <div>
            <h2 className="hk-pg-title font-weight-600">Talk Time Calling History {resultCallHistory.empName}</h2>
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
                  <th>duration</th>
                  <th>recording</th>
                  <th>status</th>
                  <th>Datetime</th>
                </tr>
              </thead>
              <tbody>
              {resultCallHistory == "" ||
                resultCallHistory == null ||
                resultCallHistory.length == 0 ||
                resultCallHistory.data == null ||
                resultCallHistory.data == "" ? (
                  <></>
                ) : (
                    resultCallHistory.data.map((curElem, index) => {
                    let AudioRecx =
                      curElem.recording.substr(
                        0,
                        curElem.recording.lastIndexOf(".")
                      ) + ".mp3";
                    return (
                      <tr>
                         <td>{curElem.ext}</td>
                        <td>{curElem.phone}</td>
                        <td>{curElem.duration}</td>
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
      </div>
    </>
  );
};

export default Talktimehistory;
