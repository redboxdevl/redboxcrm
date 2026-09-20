import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../../Includes/Navigation";
import AffiliateNav from "../../../Includes/AffiliateNav";
import { FaHandPaper, FaShareAlt, FaHome } from "react-icons/fa";
import Swal from "sweetalert2";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ListInventoriesdata } from "../../../redux/action/ListInventoriesdata";
import { ListformAction } from "../../../redux/action/ListformAction";
import { actionConfig } from "../../../configuration";
import ReactPaginate from "react-paginate";
import LoadingSpinner from "../../FinanceDashboard/LoadingSpinner";
import Select from 'react-select'

import { InventoryFilterdataAction } from "../../../redux/action/InventoryFilterdataAction";

const ListInventories = ({ affilaiteLog, affilaiteproid }) => {
const navigate = useNavigate();
let { id } = useParams();

// console.log("affilaiteLog",affilaiteLog);

const AuthDatax = JSON.parse(localStorage.getItem("authdata"));

// console.log("AuthDatax",AuthDatax);
const resultprojectfiltersdata = useSelector((state) => state.Inventoryfilterdatareducers.inventoryfilterdata);

console.log("resultprojectfiltersdata",resultprojectfiltersdata);

const resultListProject = useSelector(
(state) => state.ListInventoriesreducer.listinventoriesdata
);
const ListFormData = useSelector(
(state) => state.Listformreducer.listformdata
);
const resultRolePermssion = useSelector(
(state) => state.Permissiondatareducers.singledataredu
);
const dispatch = useDispatch();

const HrCOn =
resultRolePermssion == ""
? ""
: resultRolePermssion.filter((edx) => edx.role_id == 20);
const FinCon =
resultRolePermssion == ""
? ""
: resultRolePermssion.filter((edx) => edx.module_id == 4);

console.log("resultRolePermssion", resultRolePermssion);

const [ProjectId, setProjectId] = useState("");
const [SingleProjresult, setSingleProjresult] = useState([]);
const [SingleInveProjresult, setSingleInveProjresult] = useState([]);
const [ClientAllData, setClientAllData] = useState([]);


const [uploadFile, setUploadFile] = useState();
const [AttributeVal, setAttributeVal] = useState("");
const [ClientData, setClientData] = useState("");

const [holdDate, setholdDate] = useState("");
const [HoldComment, setHoldComment] = useState("");
const [HoldClient, setHoldClient] = useState("");

const [CancelledDate, setCancelledDate] = useState("");
const [CancelledNote, setCancelledNote] = useState("");

const [Cond, setCond] = useState(true);
const [Cancelled, showCancelled] = useState(false);
const [show, setShow] = useState(false);
const [shows, setShows] = useState(false);

const [query, setQuery] = useState("");
const [AttributeIdVal, setAttributeIdVal] = useState("");
const [InventoriesStatus, setInventoriesStatus] = useState("");
const [blockName, setblockName] = useState("");
const [categoryName, setcategoryName] = useState("");
const [inveStatus, setinveStatus] = useState("");
const [sizeName, setsizeName] = useState("");
const [typeName, settypeName] = useState("");

const [LoadingS, setLoadingS] = useState(false);

let COndAff =
affilaiteLog == "" || affilaiteLog == undefined
? AuthDatax.id
: affilaiteLog[0].id;

useEffect(() => {
dispatch(InventoryFilterdataAction(id));
}, [id]);


useEffect(() => {
dispatch(
ListInventoriesdata(
affilaiteproid == "" || affilaiteproid == undefined
? id
: affilaiteproid,
query,
InventoriesStatus,
blockName,
categoryName,
1,
12
)
);
setProjectId(
affilaiteproid == "" || affilaiteproid == undefined ? id : affilaiteproid
);
}, [
affilaiteproid == "" || affilaiteproid == undefined ? id : affilaiteproid,
]);

useEffect(() => {
const AuthData = JSON.parse(localStorage.getItem("authdata"));
dispatch(
ListformAction(
affilaiteLog == "" || affilaiteLog == undefined
? AuthData.id
: affilaiteLog[0].id
)
);
}, [affilaiteLog]);

const handleClose = () => {
setShow(false);
setAttributeVal("");
};
const handleHoldClose = () => {
setShows(false);
};

const handleCancelledClose = () => {
showCancelled(false);
};

const handleSoldShow = (id) => {
setAttributeVal(id);
setShow(true);
};

const handleCancelledShow = (id) => {
setAttributeIdVal(id);
showCancelled(true);
};

const handleHoldShow = (id) => {
setAttributeVal(id);
setShows(true);
};

const changeHandler = (event) => {
setUploadFile(event.target.files[0]);
};

const ListSingleProjects = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}project/${id}`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setSingleProjresult(await GetArray);
};

useEffect(() => {
ListSingleProjects();
}, [id]);

const ImportInventories = (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("project_id", id);
formData.append("filter_csv", uploadFile);

const requestOptions = {
method: "POST",
body: formData,
};

fetch(`${actionConfig.REACT_APP_URL}projectinventory`, requestOptions)
.then((response) => response.json())
.then((result) => {
// console.log('Success:', result);
if (result.code == "200") {
Swal.fire("Good job!", result.message, "success");
if (affilaiteproid == "" || affilaiteproid == undefined) {
  navigate("/inventories");
} else {
  navigate("/affiliates/inventories");
}
} else {
Swal.fire("Error!", result.message, "error");
}
})
.catch((error) => {
// console.error('Error:', error);
});
};

const HoldInventories = (e) => {
e.preventDefault();

const FeildData = {
inventory_id: AttributeVal,
customer_id: HoldClient,
employee_id:
affilaiteLog == "" || affilaiteLog == undefined
? AuthDatax.id
: affilaiteLog[0].id,
hold_date: holdDate,
hold_time: "02:06:39",
hold_desc: HoldComment,
};

const requestOptions = {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(FeildData),
};
fetch(`${actionConfig.REACT_APP_URL}inventoryhold`, requestOptions)
.then((response) => response.json())
.then((dataex) => {
if (dataex.code == "200") {
Swal.fire("Good job!", dataex.message, "success");
if (affilaiteproid == "" || affilaiteproid == undefined) {
  navigate("/inventories");
} else {
  navigate("/affiliates/inventories");
}
} else {
Swal.fire("Error!", dataex.message, "error");
}
});
};

const handlePageClick = (data) => {
let currentPage = data.selected + 1;
const AuthData = JSON.parse(localStorage.getItem("authdata"));
dispatch(
ListInventoriesdata(
affilaiteproid == "" || affilaiteproid == undefined
? id
: affilaiteproid,
query,
InventoriesStatus,
blockName,
categoryName,
currentPage,
12
)
);
};

const handleSearch = async (e) => {
e.preventDefault();

dispatch(
ListInventoriesdata(affilaiteproid == "" || affilaiteproid == undefined ? id : affilaiteproid, query, InventoriesStatus, blockName, categoryName, 1, 12));
// const mydata = resultListProject.data.map((item,key)=>{
//   return item.filter(user=>user.property_no.includes('229'));
// });

// console.log("filterDax",mydata);
};

const handleQucikSearch = (statusList) => {
setInventoriesStatus(statusList);
dispatch(
ListInventoriesdata(
affilaiteproid == "" || affilaiteproid == undefined
? id
: affilaiteproid,
query,
statusList,
blockName,
categoryName,
1,
12
)
);
};

const handleUnholdShow = (id) => {
Swal.fire({
title: "Do you want to change Inventory Status ?",
showDenyButton: false,
showCancelButton: true,
confirmButtonText: "Yes",
denyButtonText: `No`,
}).then((result) => {
/* Read more about isConfirmed, isDenied below */
if (result.isConfirmed) {
const FeildData = { inventory_id: id };

const requestOptions = {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(FeildData),
};
fetch(`${actionConfig.REACT_APP_URL}inventoryUnhold`, requestOptions)
.then((response) => response.json())
.then((dataex) => {
  console.log("dataex", dataex);
  if (dataex.code == "200") {
    Swal.fire("Good job!", dataex.message, "success");
  } else {
    Swal.fire("Error!", dataex.message, "error");
  }
});
}
});
};

const handleCancelShow = async (e) => {
e.preventDefault();
Swal.fire({
title: "Do you want to Cancelled Inventory ?",
showDenyButton: false,
showCancelButton: true,
confirmButtonText: "Yes",
denyButtonText: `No`,
}).then((result) => {
/* Read more about isConfirmed, isDenied below */
if (result.isConfirmed) {
setLoadingS(true);

const FeildData = {
inventory_id: id,
soldId: AttributeIdVal,
CancelledDate: CancelledDate,
CancelledNote: CancelledNote,
};

const requestOptions = {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(FeildData),
};
fetch(`${actionConfig.REACT_APP_URL}inventoryCancelled`, requestOptions)
.then((response) => response.json())
.then((dataex) => {
  console.log("dataex", dataex);
  if (dataex.code == "200") {
    Swal.fire("Good job!", dataex.message, "success");
    setLoadingS(false);
    navigate(`/list-inventories/${id}`);
    showCancelled(false);
    setCancelledDate("");
    setCancelledNote("");
  } else {
    Swal.fire("Error!", dataex.message, "error");
  }
});
}
});
};

useEffect(() => {

var optionsxs = [];
ListFormData.dataCustomer.map((datax) => {
optionsxs.push({
value: datax.id,
label: datax.clientName + " - " + datax.mobileNo
});
})
setClientAllData(optionsxs)
}, [ListFormData]);

const ClientHandler = (data) => {
console.log(data)
setClientData(data.value);
}

// console.log("InventoriesStatus",InventoriesStatus);

console.log("ListFormData", ListFormData);
// console.log("resultListProject1123",resultListProject);

return (
<>
{affilaiteproid == "" || affilaiteproid == undefined ? (
<Navigation />
) : (
<AffiliateNav />
)}

{LoadingS == true ? <LoadingSpinner /> : ""}

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
<div className="d-flex justify-content-between">
  <div>
    <h2 className="hk-pg-title font-weight-600">
      List Inventories{" "}
      {SingleProjresult.project_name == null
        ? ""
        : SingleProjresult.project_name}
    </h2>
  </div>
  <form onSubmit={ImportInventories}>
    <div className="btn-group btn-group-sm" role="group">
      {affilaiteproid == "" || affilaiteproid == undefined ? (
        FinCon.length == 0 ? (
          <></>
        ) : (
          <>
            <div className="form-group" style={{ margin: 0 }}>
              <input
                type="file"
                className="form-control"
                onChange={changeHandler}
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Import Inventories
            </button>
          </>
        )
      ) : (
        <></>
      )}

      <button type="button" className="btn btn-outline-primary"
        onClick={() => handleQucikSearch("")}
      >
        {resultListProject == "" ||
          resultListProject == null ||
          resultListProject.length == 0
          ? ""
          : resultListProject.totalInventories}{" "}
        Total
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => handleQucikSearch("sold")}
      >
        {resultListProject == "" ||
          resultListProject == null ||
          resultListProject.length == 0
          ? ""
          : resultListProject.SoldInventories}{" "}
        Sold
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => handleQucikSearch("hold")}
      >
        {resultListProject == "" ||
          resultListProject == null ||
          resultListProject.length == 0
          ? ""
          : resultListProject.HoldInventories}{" "}
        Hold
      </button>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => handleQucikSearch("remaining")}
      >
        {resultListProject == "" ||
          resultListProject == null ||
          resultListProject.length == 0
          ? ""
          : resultListProject.RemainingInventories}{" "}
        remaining
      </button>
      {FinCon.length == 0 ? (
        <></>
      ) : (
        <button
          className="btn btn-danger mr-1"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `${actionConfig.REACT_APP_URL}exportInventoriesreport?status=${InventoriesStatus}&proid=${id}`;
          }}
        >
          Export
        </button>
      )}
    </div>
  </form>
</div>
</div>

<div class="row pb-3">
<div className="col-md-2">
  <div className="form-group">
    <label htmlFor="">Search Plot Not / Unit No</label>
    <input
      type="text"
      className="form-control"
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      placeholder="Enter Plot No / Unit No"
    />
  </div>
</div>

<div className="col-md-2">
  <div className="form-group">
    <label htmlFor="">Block</label>
    <select
      name="blockName"
      id=""
      className="form-control"
      onChange={(e) => setblockName(e.target.value)}
      value={blockName}
    >
      <option value="" selected>
        Select Option
      </option>
        
      {
        resultprojectfiltersdata == null || resultprojectfiltersdata == '' || resultprojectfiltersdata.length == 0 || resultprojectfiltersdata.getBlockData && resultprojectfiltersdata.getBlockData.map((item,key)=>{
          const jsnfrmt = JSON.parse(item.jsonFormat);
          console.log("item",jsnfrmt);
          return (
            <option value="">{jsnfrmt.tower == null || jsnfrmt.tower == undefined || jsnfrmt.tower == '' ? jsnfrmt.block : jsnfrmt.tower}</option>
          )
        })
      }

    </select>
  </div>
</div>

<div className="col-md-2">
  <div className="form-group">
    <label htmlFor="">Size</label>
    <select
      name="sizeName"
      id=""
      className="form-control"
      onChange={(e) => setsizeName(e.target.value)}
      value={sizeName}
    >
      <option value="" selected>
        Select Option
      </option>
      {
        resultprojectfiltersdata == null || resultprojectfiltersdata == '' || resultprojectfiltersdata.length == 0 || resultprojectfiltersdata.getSizeData && resultprojectfiltersdata.getSizeData.map((item,key)=>{
          const jsnfrmt = JSON.parse(item.jsonFormat);
          console.log("item",jsnfrmt);
          return (
            <option value={jsnfrmt.size == null || jsnfrmt.size == undefined || jsnfrmt.size == '' ? jsnfrmt.measuring_unit : jsnfrmt.size}>{jsnfrmt.size == null || jsnfrmt.size == undefined || jsnfrmt.size == '' ? jsnfrmt.measuring_unit : jsnfrmt.size}</option>
          )
        })
      }
    </select>
  </div>
</div>

<div className="col-md-2">
  <div className="form-group">
    <label htmlFor="">Type</label>
    <select
      name="typeName"
      id=""
      className="form-control"
      onChange={(e) => settypeName(e.target.value)}
      value={typeName}
    >
      <option value="" selected>
        Select Option
      </option>
      {
        resultprojectfiltersdata == null || resultprojectfiltersdata == '' || resultprojectfiltersdata.length == 0 || resultprojectfiltersdata.getTypeData && resultprojectfiltersdata.getTypeData.map((item,key)=>{
          const jsnfrmt = JSON.parse(item.jsonFormat);
          console.log("item",jsnfrmt);
          return (
            <option value={jsnfrmt.property_type == null || jsnfrmt.property_type == undefined || jsnfrmt.property_type == '' ? jsnfrmt.property_type : jsnfrmt.property_type}>{jsnfrmt.property_type == null || jsnfrmt.property_type == undefined || jsnfrmt.property_type == '' ? jsnfrmt.property_type : jsnfrmt.property_type}</option>
          )
        })
      }
    </select>
  </div>
</div>

{/* <div className="col-md-2">
  <div className="form-group">
    <label htmlFor="">Category</label>
    <select
      name="categoryName"
      id=""
      className="form-control"
      onChange={(e) => setcategoryName(e.target.value)}
      value={categoryName}
    >
      <option value="" selected>
        Select Option
      </option>

    </select>
  </div>
</div> */}

{/* <div className="col-md-2">
<div className="form-group">
<label htmlFor="">Status</label>
<select
name="inveStatus"
id=""
className="form-control"
onChange={(e) => setinveStatus(e.target.value)}
value={inveStatus}
>
<option value="" selected>
Select Option
</option>
<option value="hold">Hold</option>
<option value="sold">Sold</option>
<option value="remaining">Available</option>
</select>
</div>
</div> */}

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
      {resultListProject.TotalCount}
    </span>
  </h4>
</div>
</div>

<div className="row">
<div className="col-xl-12">
  <section className="hk-sec-wrapper">
    <div className="row">
      <div className="col-sm">
        <div className="table-wrap">
          <table
            id="datable_1"
            className="table table-hover w-100 display pb-30"
          >
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Block</th>
                <th>Size</th>
                <th>Plot No / Unit</th>
                <th>Type</th>
                <th>Category</th>
                {/* <th>Category Type</th> */}
                <th>Total Price</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resultListProject.data == null ||
                resultListProject.length == 0 ||
                resultListProject == "" ||
                resultListProject == null ||
                resultListProject == undefined ? (
                <>Loading.....</>
              ) : resultListProject.length == 0 ||
                resultListProject == null ||
                resultListProject == "" ? (
                <></>
              ) : resultListProject.data.length > 0 ? (
                resultListProject.data.map((curElem, index) => {
                  return curElem.project_id == id ? (
                    <tr key={index + 1}>
                      <>
                        <td>INV-{index + 1}</td>
                        <td>
                          {curElem.jsonFormat.block == ""
                            ? ""
                            : curElem.jsonFormat.block}

                          {curElem.jsonFormat.tower == ""
                            ? ""
                            : curElem.jsonFormat.tower}
                        </td>
                        <td>
                          {curElem.jsonFormat.sqyd == ""
                            ? ""
                            : curElem.jsonFormat.sqyd}{" "}
                          {curElem.jsonFormat.size == ""
                            ? ""
                            : curElem.jsonFormat.size}
                          {curElem.jsonFormat.measuring_unit == ""
                            ? ""
                            : curElem.jsonFormat.measuring_unit}
                        </td>
                        <td>
                          {curElem.jsonFormat.plot == ""
                            ? ""
                            : curElem.jsonFormat.plot}
                          {curElem.jsonFormat.property_no == ""
                            ? ""
                            : curElem.jsonFormat.property_no}
                        </td>
                        <td>
                          {curElem.jsonFormat.property_type == ""
                            ? ""
                            : curElem.jsonFormat.property_type}
                        </td>
                        <td>
                          {curElem.jsonFormat.category == ""
                            ? ""
                            : curElem.jsonFormat.category == null
                              ? curElem.jsonFormat.general
                              : curElem.jsonFormat.category}{" "}
                          {curElem.jsonFormat.property_category == ""
                            ? ""
                            : curElem.jsonFormat.property_category}

                        </td>
                        {/* <td>{curElem.jsonFormat.park_facing == '' ? '': curElem.jsonFormat.park_facing}</td> */}
                        <td>
                          {curElem.jsonFormat.total_amount == ""
                            ? ""
                            : curElem.jsonFormat.total_amount}{" "}
                          {curElem.jsonFormat.total_price == ""
                            ? ""
                            : curElem.jsonFormat.total_price}
                        </td>
                        <td>
                          {/* <span className="btn-icon-wrap"><FaHome /></span> */}
                          {/* <span className="btn-icon-wrap"><FaHandPaper /></span> */}
                          {/* <span className="btn-icon-wrap"><FaShareAlt /></span> */}
                          {curElem.status == "hold" ? (
                            <>

                              {curElem.employee_id == COndAff ? (
                                <>
                                  <button
                                    className="btn btn-icon btn-icon-circle mr-10"
                                    onClick={() =>
                                      handleUnholdShow(
                                        `${curElem.id}`
                                      )
                                    }
                                  >
                                    <img
                                      src="../../FrontAsset/images/iconunhold.svg"
                                      width={40}
                                    />
                                  </button>
                                  <button
                                    className="btn btn-icon btn-icon-circle mr-10"
                                    onClick={() =>
                                      handleSoldShow(`${curElem.id}`)
                                    }
                                  >
                                    <img
                                      src="../../FrontAsset/images/iconsold.svg"
                                      width={40}
                                    />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="btn btn-icon btn-icon-circle mr-10">
                                    <img
                                      src="../../FrontAsset/images/iconunhold.svg"
                                      width={40}
                                    />
                                  </button>
                                </>
                              )}
                            </>
                          ) : curElem.status == "sold" ? (
                            HrCOn.length == 0 ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  className="btn btn-icon btn-icon-circle mr-10"
                                  onClick={() =>
                                    handleCancelledShow(
                                      `${curElem.id}`
                                    )
                                  }
                                >
                                  <img
                                    src="../../FrontAsset/images/reject.png"
                                    width={40}
                                  />
                                </button>
                              </>
                            )
                          ) : (
                            <>
                              <button
                                className="btn btn-icon btn-icon-circle mr-10"
                                onClick={() =>
                                  handleSoldShow(`${curElem.id}`)
                                }
                              >
                                <img
                                  src="../../FrontAsset/images/iconsold.svg"
                                  width={40}
                                />
                              </button>
                              <button
                                className="btn btn-icon btn-icon-circle mr-10"
                                onClick={() =>
                                  handleHoldShow(`${curElem.id}`)
                                }
                              >
                                <img
                                  src="../../FrontAsset/images/iconhold.svg"
                                  width={40}
                                />

                              </button>
                            </>
                            // <button className="btn btn-icon btn-icon-circle mr-10"><img src='../../FrontAsset/images/share.png' width={40} /></button>
                          )}
                        </td>
                      </>
                      <td>
                        {curElem.status == "sold" ? (
                          <span className="badge badge-danger">
                            {curElem.status}
                          </span>
                        ) : (
                          ""
                        )}
                        {curElem.status == "hold" ? (
                          <span className="badge badge-warning">
                            {curElem.status}
                          </span>
                        ) : (
                          ""
                        )}
                        {curElem.status == "" ||
                          curElem.status == undefined ? (
                          <span className="badge badge-success">
                            Available
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ) : (
                    <></>
                  );
                })
              ) : (
                <>
                  <tr>
                    <td colSpan="7">
                      <b>No record Found....</b>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
            {/* <tfoot>
<tr>
<th>ID</th>
<th>Block</th>
<th>Size</th>
<th>Plot No / Unit</th>
<th>Type</th>
<th>Category</th>
<th>Category Type</th>
<th>Total Price</th>
<th>Action</th>
</tr>
</tfoot> */}
          </table>

          <div className="pb-3 pt-0">
            <ReactPaginate
              previousLabel={`previous`}
              nextLabel={`next`}
              breakLabel={`...`}
              pageCount={Math.ceil(
                resultListProject == null ||
                  resultListProject == "" ||
                  resultListProject.length == 0
                  ? ""
                  : resultListProject.TotalCount / 12
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
  </section>
</div>
</div>
</div>

<Modal show={Cancelled} onHide={handleCancelledClose}>
<Modal.Header closeButton>
<Modal.Title>Cancelled Inventories</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className="col-md-12 mb-10">
  <form onSubmit={handleCancelShow}>
    <div className="row">
      <div className="col-md-12 form-group">
        <label for="CancelledDate">Cancelled Date</label>
        <input
          className="form-control"
          name="CancelledDate"
          placeholder="Cancelled Date"
          type="date"
          onChange={(e) => setCancelledDate(e.target.value)}
          value={CancelledDate}
          required
        />{" "}
      </div>

      <div className="col-md-12 form-group">
        <label for="CancelledNote">Cancelled Note</label>
        <textarea
          cols="10"
          rows="5"
          className="form-control"
          name="CancelledNote"
          onChange={(e) => setCancelledNote(e.target.value)}
          value={CancelledNote}
          required
        ></textarea>
      </div>
    </div>

    <div className="form-group pt-3">
      {LoadingS == true ? (
        <button type="button" className="btn btn-primary" disabled>
          Submit
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      )}
    </div>
  </form>
</div>
</Modal.Body>
</Modal>

<Modal show={show} onHide={handleClose}>
<Modal.Header closeButton>
<Modal.Title>Sold Inventories</Modal.Title>
</Modal.Header>
<Modal.Body>
<div className="col-md-12 mb-10">
  <label for="clientName">Client</label>
  <Select defaultInputValue='' placeholder='Select Client' options={ClientAllData} onChange={ClientHandler} />


  <div className="form-group pt-3">
    <button
      type="button"
      className="btn btn-secondary"
      data-dismiss="modal"
    >
      Close
    </button>
    <NavLink
      to={`${affilaiteproid == "" || affilaiteproid == undefined
          ? `/lead-activity/`
          : `/affiliates/lead-activity/`
        }${AttributeVal}/${ClientData}/${id}${affilaiteproid == "" || affilaiteproid == undefined
          ? ``
          : `/affiliates`
        }`}
    >
      <button type="button" className="btn btn-primary">
        Submit
      </button>
    </NavLink>
  </div>
</div>
</Modal.Body>
</Modal>

<Modal show={shows} onHide={handleHoldClose}>
<Modal.Header closeButton>
<Modal.Title>Hold Inventories</Modal.Title>
</Modal.Header>
<Modal.Body>
<form onSubmit={HoldInventories}>
  <div className="row">
    <div className="col-md-6 form-group">
      <label for="agentName">Agent Name</label>
      <input
        className="form-control"
        placeholder={
          affilaiteLog == "" || affilaiteLog == undefined
            ? AuthDatax.emp_name
            : affilaiteLog[0].full_name
        }
        disabled
        type="text"
      />{" "}
    </div>
    <div className="col-md-6 form-group">
      <label for="clientName">Client Name</label>
      <select
        className="form-control custom-select d-block w-100"
        onChange={(e) => setHoldClient(e.target.value)}
        value={HoldClient}
        required
      >
        <option value="">Choose...</option>
        {affilaiteproid == "" ||
          affilaiteproid == undefined ||
          ListFormData.dataAffiliateAllCustomer == undefined ||
          ListFormData.dataAffiliateAllCustomer.length == 0 ||
          ListFormData == null ||
          ListFormData == undefined ||
          ListFormData.length == 0 ||
          ListFormData.code == "ERR_NETWORK" ||
          ListFormData.code == "ERR_BAD_RESPONSE" ? (
          ListFormData == "" ||
            ListFormData.length == 0 ||
            ListFormData == null ||
            ListFormData == undefined ||
            ListFormData.code == "ERR_NETWORK" ||
            ListFormData.code == "ERR_BAD_RESPONSE" ? (
            ""
          ) : ListFormData.dataCustomer.length > 0 ? (
            ListFormData.dataCustomer.map((curElem) => {
              return (
                <option value={curElem.id}>
                  {curElem.clientName} - ( {curElem.mobileNo} )
                </option>
              );
            })
          ) : (
            <></>
          )
        ) : ListFormData == "" ||
          ListFormData.length == 0 ||
          ListFormData == null ||
          ListFormData == undefined ? (
          ""
        ) : ListFormData.dataAffiliateAllCustomer == undefined ||
          ListFormData.code == "ERR_BAD_RESPONSE" ? (
          ""
        ) : ListFormData.dataAffiliateAllCustomer.length > 0 ? (
          ListFormData.dataAffiliateAllCustomer == undefined ||
            ListFormData.code == "ERR_NETWORK" ||
            ListFormData.code == "ERR_BAD_RESPONSE" ? (
            ""
          ) : (
            ListFormData.dataAffiliateAllCustomer.map((curElem) => {
              return (
                <option value={curElem.id}>
                  {curElem.clientName}
                </option>
              );
            })
          )
        ) : (
          <></>
        )}
      </select>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12 form-group">
      <label for="date">Date</label>
      <input
        className="form-control"
        id="date"
        type="date"
        onChange={(e) => setholdDate(e.target.value)}
        value={holdDate}
        required
      />{" "}
    </div>
    <div className="col-md-12 form-group">
      <label for="comments">Comments</label>
      <textarea
        className="form-control"
        id="comments"
        rows="3"
        placeholder="Enter Your Comments"
        type="text"
        onChange={(e) => setHoldComment(e.target.value)}
        value={HoldComment}
        required
      ></textarea>

      <div className="form-group pt-3">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  </div>
</form>
</Modal.Body>
</Modal>
</>
);
};

export default ListInventories;
