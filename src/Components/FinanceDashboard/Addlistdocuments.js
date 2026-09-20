import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import OtherNavigation from "../../Includes/OtherNavigation";
import QuickNav from "../../Includes/QuickNav";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { actionConfig } from "../../configuration";
import Swal from "sweetalert2";
import { getDashCountData } from "../../redux/action/DashboardCountAction";
import LoadingSpinner from "./LoadingSpinner";

const Addlistdocuments = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const [DocId, setDocId] = useState(id);

  const [DocFiles, setDocFiles] = useState("");
  const [LoadingS, setLoadingS] = useState(false);

  const [SingleRes, setSingleRes] = useState([]);

  const changeHandler = (event) => {
    setDocFiles(event.target.files[0]);
  };

  const SingleDocRecords = async (id) => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}documentlist/${id}`
    );
    const dataxs = await response.json();
    setSingleRes(await dataxs?.data);
    setDocFiles(dataxs?.data[0]?.docImg);
  };

  useEffect(() => {
    if (id == undefined) {
    } else {
      SingleDocRecords(id);
    }
  }, [id == undefined ? "" : id]);

  const AddDocumentForm = (e) => {
    e.preventDefault();

    setLoadingS(true);
    const formData = new FormData();
    formData.append("docImg", DocFiles);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}documentlist`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/list-view-documents");
          setLoadingS(false);
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const UpdateDocumentForm = (e) => {
    e.preventDefault();
    setLoadingS(true);

    const formData = new FormData();

    formData.append("docImg", DocFiles);
    formData.append("_method", "PATCH");

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}documentlist/${DocId}`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          setLoadingS(false);
          navigate("/list-view-documents");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">Add Document Files</h2>
          </div>
          <div class="d-flex">
            <NavLink
              to="/list-view-documents"
              className="btn btn-primary btn-rounded btn-sm"
            >
              Back
            </NavLink>
          </div>
        </div>

        <OtherNavigation />

        {LoadingS == true ? <LoadingSpinner /> : ""}

        <div className="row">
          <div className="col-md-12">
            <section className="hk-sec-wrapper">
              <div class="row">
                <div class="col-md-12">
                  <section class="hk-sec-wrapper">
                    <div class="col-md-12 col-xs-12 col-sm-12">
                      <form
                        onSubmit={
                          id == null ? AddDocumentForm : UpdateDocumentForm
                        }
                      >
                        <div class="row">
                          <div class={`form-group col-md-4`}>
                            <label for="inputPassword4">Attachement</label>
                            <input
                              type="file"
                              class="form-control"
                              name="docImg"
                              onChange={changeHandler}
                            />
                            {id == null ? (
                              <></>
                            ) : (
                              <a
                                href={`${actionConfig.REACT_APP_MAIN}${DocFiles}`}
                                download
                                target="_blank"
                              >
                                Download File
                              </a>
                            )}
                          </div>
                        </div>

                        {LoadingS == true ? (
                          <button
                            type="submit"
                            class="btn btn-primary"
                            disabled
                          >
                            {id == null ? "Submit" : "Update"}
                          </button>
                        ) : (
                          <button type="submit" class="btn btn-primary">
                            {id == null ? "Submit" : "Update"}
                          </button>
                        )}
                      </form>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addlistdocuments;
