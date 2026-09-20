import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import OtherNavigation from "../../../Includes/OtherNavigation";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { actionConfig } from "../../../configuration";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner";
import { getDashCountData } from "../../../redux/action/DashboardCountAction";
import moment from "moment/moment";
import { BankListAction } from "../../../redux/action/BankListAction";
import { InventoriesAction } from "../../../redux/action/InventoriesAction";
import InputMask from "react-input-mask";

const AddNewPaymentReciepts = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  var CurrentDate = moment().format("YYYY-MM-DD");

  const AuthDataxs = JSON.parse(localStorage.getItem("authdata"));
  const AuthData = JSON.parse(localStorage.getItem("authdata"));

  const resultBankList = useSelector(
    (state) => state.Bankreducers.banklistdata
  );

  const resultDashboard = useSelector(
    (state) => state.dashCountReducer.dashboardcount
  );
  const resultRolePermssion = useSelector(
    (state) => state.Permissiondatareducers.singledataredu
  );
  const resultInventories = useSelector(
    (state) => state.inventoriesreducer.inventoriesdata
  );

  const dispatch = useDispatch();

  const FiltersSecurity =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 150 && edx.sub_features === "Report"
        );

  const HrCOn =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter((edx) => edx.role_id == 16);
  const FinanceMode =
    resultRolePermssion == ""
      ? ""
      : resultRolePermssion.filter(
          (edx) =>
            edx.role_id == 20 ||
            edx.module_id == 4 ||
            edx.module_name == "Finance"
        );

  const AssetRegister =
    resultRolePermssion === ""
      ? ""
      : resultRolePermssion.filter(
          (edx) => edx.feature_id === 153 && edx.sub_features === "Import"
        );

  const [SingleRes, setSingleRes] = useState([]);
  const [BankListResult, setBankListResult] = useState([]);
  const [PropertyTypeResult, setPropertyTypeResult] = useState([]);

  const [Status, setStatus] = useState("");
  const [PaymentType, setPaymentType] = useState("");

  const [DateOfReciept, setDateOfReciept] = useState(CurrentDate);
  const [ProjectId, setProjectId] = useState("");
  const [CompanyId, setCompanyId] = useState("");
  const [Size, setSize] = useState("-");
  const [PropertyType, setPropertyType] = useState("");
  const [PropertyNo, setPropertyNo] = useState("0");
  const [BlockNo, setBlockNo] = useState("0");
  const [CustomerName, setCustomerName] = useState("-");
  const [Cnic, setCnic] = useState("-");
  const [ContactNo, setContactNo] = useState("-");
  const [Reference, setReference] = useState("");
  const [ReferenceContactNo, setReferenceContactNo] = useState("-");
  const [SaleAmount, setSaleAmount] = useState("0");
  const [Discount, setDiscount] = useState("0");
  const [Remarks, setRemarks] = useState("");

  const [LoadingS, setLoadingS] = useState(false);

  useEffect(() => {
    const AuthDatas = JSON.parse(localStorage.getItem("authdata"));
    dispatch(InventoriesAction(AuthDatas.company_id));
  }, []);

  const ListBankData = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listbanks`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBankListResult(await GetArray);
  };

  useEffect(() => {
    const AuthDatas = JSON.parse(localStorage.getItem("authdata"));
    dispatch(InventoriesAction());
    dispatch(BankListAction(1, 12, AuthDatas.company_id));
    ListBankData();
  }, []);

  const [inputList, setinputList] = useState([
    {
      payRecieptEntryId: "",
      PayDate: "",
      payMethod: "",
      CheqPoNo: "",
      BankName: "",
      ReferenceId: "",
      TransferTo: "",
      PayAmt: "",
    },
  ]);

  const handleinputchangeData = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([
      ...inputList,
      {
        payRecieptEntryId: "",
        PayDate: "",
        payMethod: "",
        CheqPoNo: "",
        BankName: "",
        ReferenceId: "",
        TransferTo: "",
        PayAmt: "",
      },
    ]);
  };

  useEffect(() => {
    dispatch(getDashCountData("all", ""));
  }, []);

  const [CompaniesResult, setCompaniesResult] = useState([]);
  const [DepartmentResult, setDepartmentResult] = useState([]);

  const ListCompanies = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}company?agentId=1`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompaniesResult(await GetArray);
  };

  const ListDepartment = async () => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}department?agentId=1`
    );
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartmentResult(await GetArray);
  };

  const ListPropertyType = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}propertytype`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setPropertyTypeResult(await GetArray);
  };

  const SinglePaymentRecieptsecords = async (id) => {
    const response = await fetch(
      `${actionConfig.REACT_APP_URL}payreciepts/${id}`
    );
    const dataxs = await response.json();
    setSingleRes(await dataxs.data[0]);
    const finalItems = dataxs.data[0];
    // setAssetId(dataxs.data[0].id);

    setDateOfReciept(finalItems.dateOfReciept);
    setProjectId(finalItems.ProjectId);
    setCompanyId(finalItems.CompanyId);
    setSize(finalItems.Size);
    setPropertyType(finalItems.PropTypeId);
    setPropertyNo(finalItems.ProNo);
    setBlockNo(finalItems.BlockNo);
    setCustomerName(finalItems.CustomerName);
    setCnic(finalItems.Cnic);
    setContactNo(finalItems.ContactNo);
    setReference(finalItems.Reference);
    setReferenceContactNo(finalItems.ReferenceContactNo);
    setSaleAmount(finalItems.SaleAmount);
    setDiscount(finalItems.Discount);
    setRemarks(finalItems.Remarks);

    setinputList(JSON.parse(finalItems.PayRecieptsentry));
  };

  useEffect(() => {
    if (id == undefined) {
    } else {
      SinglePaymentRecieptsecords(id);
    }
  }, [id == undefined ? "" : id]);

  useEffect(() => {
    ListCompanies();
    ListDepartment();
    ListPropertyType();
  }, []);

  const AddNewPaymentVoucherForm = (e) => {
    e.preventDefault();

    // setLoadingS(true);
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const formData = new FormData();

    formData.append("dateOfReciept", DateOfReciept);
    formData.append("ProjectId", ProjectId);
    formData.append("CompanyId", CompanyId);
    formData.append("PropTypeId", PropertyType);
    formData.append("ProNo", PropertyNo);
    formData.append("BlockNo", BlockNo);
    formData.append("Size", Size);
    formData.append("CustomerName", CustomerName);
    formData.append("Cnic", Cnic);
    formData.append("ContactNo", ContactNo);
    formData.append("Reference", Reference);
    formData.append("ReferenceContactNo", ReferenceContactNo);
    formData.append("SaleAmount", SaleAmount);
    formData.append("Discount", Discount);
    formData.append("Remarks", Remarks);
    formData.append("inputList", JSON.stringify(inputList));
    formData.append("PostedBy", AuthData.id);
    formData.append("company_id", AuthData.company_id);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}payreciepts`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          navigate("/payment-reciepts");
          setLoadingS(false);
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const UpdateNewPaymentVoucherForm = (e) => {
    e.preventDefault();

    setLoadingS(true);
    const AuthData = JSON.parse(localStorage.getItem("authdata"));
    const formData = new FormData();

    formData.append("dateOfReciept", DateOfReciept);
    formData.append("ProjectId", ProjectId);
    formData.append("CompanyId", CompanyId);
    formData.append("PropTypeId", PropertyType);
    formData.append("ProNo", PropertyNo);
    formData.append("BlockNo", BlockNo);
    formData.append("Size", Size);
    formData.append("CustomerName", CustomerName);
    formData.append("Cnic", Cnic);
    formData.append("ContactNo", ContactNo);
    formData.append("Reference", Reference);
    formData.append("ReferenceContactNo", ReferenceContactNo);
    formData.append("SaleAmount", SaleAmount);
    formData.append("Discount", Discount);
    formData.append("Remarks", Remarks);
    formData.append("inputList", JSON.stringify(inputList));
    formData.append("company_id", AuthData.company_id);

    formData.append("_method", "PATCH");

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(`${actionConfig.REACT_APP_URL}payreciepts/${id}`, requestOptions)
      .then((response) => response.json())
      .then((dataex) => {
        if (dataex.code == "200") {
          Swal.fire("Good job!", dataex.message, "success");
          setLoadingS(false);
          navigate("/payment-reciepts");
        } else {
          Swal.fire("Error!", dataex.message, "error");
        }
      });
  };

  const ChequeAmountAct = (e, i) => {
    let val = e.target.value;
    val = val.replace(/\D/g, "");
    val = val.replace(/(\d)(\d{3})$/, "$1,$2");
    val = val.replace(/(?=(\d{3})+(\D))\B/g, ", ");

    handleinputchangeData(e, i);
  };

  return (
    <>
      <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
          <div>
            <h2 className="hk-pg-title font-weight-600">
              Add New Payment Reciepts
            </h2>
          </div>
          <div class="d-flex">
            <NavLink
              to="/payment-reciepts"
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
                          id == null
                            ? AddNewPaymentVoucherForm
                            : UpdateNewPaymentVoucherForm
                        }
                      >
                        <div class="row">
                          <div className="form-group col-md-3">
                            <label htmlFor="">Date Of Reciept*</label>
                            <input
                              type="date"
                              name="DateOfReciept"
                              id=""
                              className="form-control"
                              onChange={(e) => setDateOfReciept(e.target.value)}
                              value={DateOfReciept}
                              required
                            />
                          </div>

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
                                : resultInventories.data.map(
                                    (curElem, index) => {
                                      return (
                                        <option
                                          value={curElem.id}
                                          key={curElem.id}
                                        >
                                          {curElem.project_name}
                                        </option>
                                      );
                                    }
                                  )}
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
                                  return (
                                    <option value={item.id}>
                                      {item.company_name}
                                    </option>
                                  );
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
                              {PropertyTypeResult == null ||
                              PropertyTypeResult == "" ||
                              PropertyTypeResult == undefined ? (
                                <></>
                              ) : PropertyTypeResult.length > 0 ? (
                                PropertyTypeResult.map((curElem, index) => {
                                  return (
                                    <option value={curElem.id}>
                                      {curElem.type_name}
                                    </option>
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
                            <label htmlFor="">Block No</label>
                            <input
                              type="text"
                              name="BlockNo"
                              id=""
                              className="form-control"
                              onChange={(e) => setBlockNo(e.target.value)}
                              value={BlockNo}
                            />
                          </div>
                          <div className="form-group col-md-3">
                            <label htmlFor="">Size*</label>
                            <input
                              type="text"
                              name="Size"
                              id=""
                              className="form-control"
                              onChange={(e) => setSize(e.target.value)}
                              value={Size}
                              required
                            />
                          </div>

                          <div className="form-group col-md-3">
                            <label htmlFor="">Customer Name*</label>
                            <input
                              type="text"
                              name="CustomerName"
                              id=""
                              className="form-control"
                              onChange={(e) => setCustomerName(e.target.value)}
                              value={CustomerName}
                              required
                            />
                          </div>

                          <div className="form-group col-md-3">
                            <label htmlFor="">CNIC</label>
                            <input
                              type="text"
                              name="Cnic"
                              id=""
                              className="form-control"
                              onChange={(e) => setCnic(e.target.value)}
                              value={Cnic}
                            />
                          </div>

                          <div className="form-group col-md-3">
                            <label htmlFor="">Contact No*</label>
                            <input
                              type="text"
                              name="ContactNo"
                              id=""
                              className="form-control"
                              onChange={(e) => setContactNo(e.target.value)}
                              value={ContactNo}
                              required
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

                          <div className="form-group col-md-3">
                            <label htmlFor="">Reference Contact No</label>
                            <input
                              type="text"
                              name="ReferenceContactNo"
                              id=""
                              className="form-control"
                              onChange={(e) =>
                                setReferenceContactNo(e.target.value)
                              }
                              value={ReferenceContactNo}
                            />
                          </div>

                          <div className="form-group col-md-3">
                            <label htmlFor="">Sale Amount*</label>
                            <input
                              type="text"
                              name="SaleAmount"
                              id=""
                              className="form-control"
                              onChange={(e) => setSaleAmount(e.target.value)}
                              value={SaleAmount}
                              required
                            />
                          </div>

                          <div className="form-group col-md-3">
                            <label htmlFor="">Discount</label>
                            <input
                              type="text"
                              name="Discount"
                              id=""
                              className="form-control"
                              onChange={(e) => setDiscount(e.target.value)}
                              value={Discount}
                            />
                          </div>

                          <div className="form-group col-md-12">
                            <label htmlFor="">Remarks</label>
                            <textarea
                              name="Remarks"
                              id=""
                              cols="30"
                              rows="5"
                              className="form-control"
                              onChange={(e) => setRemarks(e.target.value)}
                              value={Remarks}
                            ></textarea>
                          </div>

                          <div className="col-md-12">
                            <table className="table table-striped table-bordered">
                              <thead>
                                <tr>
                                  <th>Payment Method</th>
                                  <th>Cheque / PO No / References</th>
                                  <th>Date</th>
                                  <th>Bank Name</th>
                                  <th>Reference</th>
                                  <th>Transfer To</th>
                                  <th>Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {inputList.map((x, i) => {
                                  return (
                                    <tr>
                                      <td>
                                        <div className="form-group">
                                          <select
                                            name="payMethod"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.payMethod}
                                          >
                                            <option value="">
                                              Select Method
                                            </option>

                                            {PaymentType ==
                                            "cashPaymentVoucher" ? (
                                              <option value="Cash">Cash</option>
                                            ) : PaymentType ==
                                              "bankPaymentVoucher" ? (
                                              <>
                                                <option value="Cheque">
                                                  Cheque
                                                </option>
                                                <option value="payorder">
                                                  Pay Order
                                                </option>
                                                <option value="bankonline">
                                                  Bank ( Online )
                                                </option>
                                                <option value="File">
                                                  File
                                                </option>
                                              </>
                                            ) : (
                                              <>
                                                <option value="Cash">
                                                  Cash
                                                </option>
                                                <option value="Cheque">
                                                  Cheque
                                                </option>
                                                <option value="payorder">
                                                  Pay Order
                                                </option>
                                                <option value="bankonline">
                                                  Bank ( Online )
                                                </option>
                                                <option value="File">
                                                  File
                                                </option>
                                              </>
                                            )}
                                          </select>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <input
                                            type="text"
                                            name="CheqPoNo"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.CheqPoNo}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <input
                                            type="date"
                                            name="PayDate"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            placeholder="Feature Name"
                                            dataId={x.id}
                                            value={x.PayDate}
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <select
                                            name="BankName"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.BankName}
                                          >
                                            <option value="">
                                              Select Bank
                                            </option>
                                            {BankListResult &&
                                              BankListResult.map(
                                                (item, key) => {
                                                  return (
                                                    <option value={item.id}>
                                                      {item.banktitle}
                                                    </option>
                                                  );
                                                }
                                              )}
                                          </select>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <select
                                            name="ReferenceId"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.ReferenceId}
                                          >
                                            <option value="">
                                              Select Reference
                                            </option>
                                            {CompaniesResult &&
                                              CompaniesResult.map(
                                                (item, key) => {
                                                  return (
                                                    <option value={item.id}>
                                                      {item.company_name}
                                                    </option>
                                                  );
                                                }
                                              )}
                                          </select>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <select
                                            name="TransferTo"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              handleinputchangeData(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.TransferTo}
                                          >
                                            <option value="">
                                              Select Transfer To
                                            </option>
                                            {resultBankList.data == null ? (
                                              <>Loading.....</>
                                            ) : resultBankList.data.length >
                                              0 ? (
                                              resultBankList.data.map(
                                                (curElem, index) => {
                                                  return (
                                                    <option value={curElem.id}>
                                                      {curElem.accountno} (
                                                      {curElem.title})
                                                    </option>
                                                  );
                                                }
                                              )
                                            ) : (
                                              <></>
                                            )}
                                            <option value="Cash In Hand">
                                              Cash In Hand
                                            </option>
                                          </select>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="form-group">
                                          <input
                                            type="number"
                                            name="PayAmt"
                                            id=""
                                            className="form-control"
                                            onChange={(e) =>
                                              ChequeAmountAct(e, i)
                                            }
                                            dataId={x.id}
                                            value={x.PayAmt}
                                          />
                                        </div>
                                      </td>
                                      <td width={200}>
                                        {inputList.length !== 1 && (
                                          <button
                                            type="button"
                                            class="btn btn-block btn-danger btn-sm"
                                            onClick={() => handleremove(i)}
                                          >
                                            Remove
                                          </button>
                                        )}
                                        {inputList.length - 1 === i && (
                                          <button
                                            type="button"
                                            class="btn btn-block btn-primary btn-sm"
                                            onClick={handleaddclick}
                                          >
                                            Add Row
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>

                          {id == "" || id == null ? (
                            <></>
                          ) : (
                            <div className="form-group col-md-4">
                              <label htmlFor="">Status Approval*</label>
                              <select
                                name="Status"
                                id=""
                                className="form-control"
                                onChange={(e) => setStatus(e.target.value)}
                                value={Status}
                              >
                                <option value="" selected>
                                  Select Status
                                </option>
                                <option value="1">Approved</option>
                                <option value="0">Pending</option>
                              </select>
                            </div>
                          )}
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

export default AddNewPaymentReciepts;
