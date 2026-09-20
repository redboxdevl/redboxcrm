import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import OtherNavigation from "../../Includes/OtherNavigation";
import { actionConfig } from "../../configuration";
import ReactPaginate from "react-paginate";
import { DocumentlistAction } from "../../redux/action/DocumentlistAction";
import Swal from "sweetalert2";

const Listdocuments = () => {
  const navigate = useNavigate();

  const resultDocuments = useSelector(
    (state) => state.DocumentfilesReducers.documentfiledata
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const dispatch = useDispatch();

  const FiltersSecurity =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 150 && edx.sub_features === "Report"
        );

  useEffect(() => {
    dispatch(DocumentlistAction(1, 12));
  }, []);

  const componentRef = useRef();

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    dispatch(DocumentlistAction(currentPage, 12));
  };

  const DeleteDocument = (id) => {
    if (window.confirm("Do You Want to Delete this Record?")) {
      fetch(`${actionConfig.REACT_APP_URL}documentlist/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((dataex) => {
          if (dataex.code == "200") {
            Swal.fire("Good job!", dataex.message, "success");
            dispatch(DocumentlistAction(1, 12));
            navigate("/list-view-documents");
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
            <h2 className="hk-pg-title font-weight-600">Documents Files</h2>
            <div
              ref={componentRef}
              style={{ width: "100%", height: "auto" }}
            ></div>
          </div>
          <div>
            <NavLink
              to="/add-documents-files"
              className="btn btn-primary btn-rounded btn-sm"
            >
              Add Documents
            </NavLink>
          </div>
        </div>

        <OtherNavigation />

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
                              <th>ID</th>
                              <th>Doc Type</th>
                              <th>Attachement</th>
                              <th>Publish Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {resultDocuments?.data == null ? (
                              <>Loading.....</>
                            ) : resultDocuments?.data?.length > 0 ? (
                              resultDocuments?.data?.map((curElem, index) => {
                                return (
                                  <tr>
                                    <td> {curElem.id}</td>
                                    <td>
                                      <span className="badge badge-primary">
                                        {curElem.doctype}
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        href={`${actionConfig.REACT_APP_MAIN}${curElem.docImg}`}
                                        download
                                        target="_blank"
                                      >
                                        Download File
                                      </a>{" "}
                                      <a
                                        href={`${actionConfig.REACT_APP_MAIN}${curElem.Attachement}`}
                                        className="badge badge-primary"
                                        target="_blank"
                                      >
                                        Preview File
                                      </a>
                                    </td>
                                    <td>{curElem.created_at}</td>
                                    <td>
                                      <NavLink
                                        to={`/add-documents-files/${curElem.id}`}
                                      >
                                        <button className="btn btn-primary btn-sm btn-rounded">
                                          {FiltersSecurity.length == 0
                                            ? "View"
                                            : "Update"}
                                        </button>
                                        <button
                                          className="btn btn-danger btn-sm btn-rounded"
                                          type="button"
                                          onClick={() =>
                                            DeleteDocument(curElem.id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </NavLink>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <>
                                <tr>
                                  <td colspan="11">No Record Found</td>
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
                            resultDocuments?.TotalCount / 12
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

export default Listdocuments;
