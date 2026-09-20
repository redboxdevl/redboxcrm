import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import OtherNavigation from "../../../Includes/OtherNavigation";
import { actionConfig } from "../../../configuration";
import Moment from "react-moment";
import { useReactToPrint } from "react-to-print";
import ReactPaginate from "react-paginate";
import { PayrecieptsAction } from "../../../redux/action/PayrecieptsAction";
import moment from "moment";
import Swal from "sweetalert2";

const ListPaymentReciepts = () => {
  const navigate = useNavigate();

  const resultpayrecieptsdata = useSelector(
    (state) => state.Payrecieptsreducers.payrecieptsdata
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const resultInventories = useSelector(
    (state) => state.inventoriesreducer.inventoriesdata
  );
  const resultDashboard = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );

  const dispatch = useDispatch();

  const FiltersSecurity =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 150 && edx.sub_features === "Report"
        );

  const [CompaniesResult, setCompaniesResult] = useState([]);

  const [ProjectId, setProjectId] = useState("");
  const [CompanyId, setCompanyId] = useState("");
  const [PropertyNo, setPropertyNo] = useState("");
  const [Reference, setReference] = useState("");
  const [PropertyType, setPropertyType] = useState("");

  const ListCompanies = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}company?agentId=1`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompaniesResult(await GetArray);
  };
  useEffect(() => {
    ListCompanies();
  }, []);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(
      PayrecieptsAction(
        1,
        12,
        ProjectId,
        CompanyId,
        PropertyNo,
        Reference,
        PropertyType,
        AuthData.company_id
      )
    );
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(
      PayrecieptsAction(
        1,
        12,
        ProjectId,
        CompanyId,
        PropertyNo,
        Reference,
        PropertyType,
        AuthData.company_id
      )
    );
  };

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    dispatch(
      PayrecieptsAction(
        currentPage,
        12,
        ProjectId,
        CompanyId,
        PropertyNo,
        Reference,
        PropertyType,
        AuthData.company_id
      )
    );
  };

  const DeletePaymentReciept = (id) => {
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    if (window.confirm("Do You Want to Delete this Record?")) {
      fetch(`${actionConfig.REACT_APP_URL}payreciepts/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((dataex) => {
          console.log("dataex", dataex);
          if (dataex.code == "200") {
            Swal.fire("Good job!", dataex.message, "success");
            dispatch(
              PayrecieptsAction(
                1,
                12,
                ProjectId,
                CompanyId,
                PropertyNo,
                Reference,
                PropertyType,
                AuthData.company_id
              )
            );
            navigate("/payment-reciepts");
          } else {
            Swal.fire("Error!", dataex.message, "error");
          }
        });
    } else {
    }
  };

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">
              Payment Reciepts List
            </h2>
          </div>
          <div>
            <NavLink
              to="/add-new-payment-reciepts"
              className="btn btn-primary btn-rounded btn-sm"
            >
              Add New Payment Reciepts
            </NavLink>
          </div>
        </div>

        <OtherNavigation />

        <div class="row pb-3">
          <div className="form-group col-md-3">
            <label htmlFor="">Projects*</label>
            <select
              name="Projects"
              id=""
              className="form-control"
              onChange={(e) => setProjectId(e.target.value)}
              value={ProjectId}
              required
            >
              <option value="" selected>
                Select Projects
              </option>
              {resultInventories.length == "0" ||
              resultInventories == null ||
              resultInventories.code == "ERR_BAD_REQUEST" ||
              resultInventories.code == "ERR_NETWORK"
                ? ""
                : resultInventories.data.map((curElem, index) => {
                    return (
                      <option value={curElem.id} key={curElem.id}>
                        {curElem.project_name}
                      </option>
                    );
                  })}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="">Company*</label>
            <select
              name="CompanyId"
              id=""
              className="form-control"
              onChange={(e) => setCompanyId(e.target.value)}
              value={CompanyId}
              required
            >
              <option value="">Select Company</option>
              {CompaniesResult &&
                CompaniesResult.map((item, key) => {
                  return <option value={item.id}>{item.company_name}</option>;
                })}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="">Property Type*</label>
            <select
              name="PropertyType"
              id=""
              className="form-control"
              onChange={(e) => setPropertyType(e.target.value)}
              value={PropertyType}
              required
            >
              <option value="" selected>
                Select Property Type
              </option>
              {resultDashboard.code == "ERR_NETWORK" ||
              resultDashboard.code == "ERR_BAD_REQUEST" ||
              resultDashboard.length == 0 ||
              resultDashboard.code == "ERR_BAD_RESPONSE" ? (
                <></>
              ) : resultDashboard.propertyType.length > 0 ? (
                resultDashboard.propertyType.map((curElem, index) => {
                  return (
                    <option value={curElem.id}>{curElem.type_name}</option>
                  );
                })
              ) : (
                <>
                  <option>No Record Found....</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="">Property No</label>
            <input
              type="text"
              name="PropertyNo"
              id=""
              className="form-control"
              onChange={(e) => setPropertyNo(e.target.value)}
              value={PropertyNo}
            />
          </div>

          <div className="form-group col-md-3">
            <label htmlFor="">Reference*</label>
            <input
              type="text"
              name="Reference"
              id=""
              className="form-control"
              onChange={(e) => setReference(e.target.value)}
              value={Reference}
              required
            />
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
              <div class="card-body">
                <div class="row">
                  <div class="col-sm">
                    <div class="table-wrap">
                      <div class="table-responsive">
                        <table class="table table-hover table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Project</th>
                              <th>Property Type</th>
                              <th>Property No</th>
                              <th>Customer Name</th>
                              <th>CNIC</th>
                              <th>Contact No</th>
                              <th>Reference</th>
                              <th>Reference No</th>
                              <th>Sale Amount</th>
                              <th>Discount</th>
                              <th>Recieved Amount</th>
                              <th>Balance Amount</th>
                              <th>Remarks</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultpayrecieptsdata.data == null ? (
                              <>Loading.....</>
                            ) : resultpayrecieptsdata.data.length > 0 ? (
                              resultpayrecieptsdata.data.map(
                                (curElem, index) => {
                                  return (
                                    <tr>
                                      <td>{curElem.ProjectTitle}</td>
                                      <td>{curElem.type_name}</td>
                                      <td>{curElem.ProNo}</td>
                                      <td>{curElem.CustomerName}</td>
                                      <td>{curElem.Cnic}</td>
                                      <td>{curElem.ContactNo}</td>
                                      <td>{curElem.Reference}</td>
                                      <td>{curElem.ReferenceContactNo}</td>
                                      <td>{curElem.SaleAmount}</td>
                                      <td>{curElem.Discount}</td>
                                      <td>{curElem.TotalSumAmounts}</td>
                                      <td>{curElem.RemainingAmountData}</td>
                                      <td>{curElem.Remarks}</td>
                                      <td width={300}>
                                        <NavLink
                                          to={`/print-payment-reciepts/${curElem.id}`}
                                        >
                                          <button className="btn btn-secondary btn-sm btn-rounded">
                                            View Payment Reciepts
                                          </button>
                                        </NavLink>
                                        <NavLink
                                          to={`/add-new-payment-reciepts/${curElem.id}`}
                                        >
                                          <button className="btn btn-primary btn-sm btn-rounded">
                                            {FiltersSecurity.length == 0
                                              ? "View"
                                              : "Update"}
                                          </button>
                                        </NavLink>
                                        <button
                                          className="btn btn-danger btn-sm btn-rounded"
                                          type="button"
                                          onClick={() =>
                                            DeletePaymentReciept(curElem.id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )
                            ) : (
                              <>
                                <tr>
                                  <td colspan="12">No Record Found</td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>

                        <ReactPaginate
                          previousLabel={`previous`}
                          nextLabel={`next`}
                          breakLabel={`...`}
                          pageCount={Math.ceil(
                            resultpayrecieptsdata.TotalCount / 12
                          )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPaymentReciepts;
