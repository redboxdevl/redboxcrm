import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { AssetListAction } from '../../../redux/action/AssetListAction';
import moment from 'moment';
// import Barcode from 'react-barcode';
import QRCode from 'react-qr-code';
// import {QRCodeSVG} from 'qrcode.react';
// import { QRCode } from 'react-qrcode-logo';

const FixedAssetRegister = () => {

const resultFixedAsset = useSelector(state => state.AssetListreducers.assetlistdata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
const dispatch = useDispatch();

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const [CompaniesResult,setCompaniesResult]= useState([]);
const [DepartmentResult,setDepartmentResult]= useState([]);
const [AssetLocationResult,setAssetLocationResult]= useState([]);

const [AssetType,setAssetType]=useState('');
const [CompanyId,setCompanyId]=useState('');
const [DepartementId,setDepartementId]=useState('');
const [PurchaseDate,setPurchaseDate]=useState('');
const [AssetBookValue,setAssetBookValue]=useState('');
const [Status,setStatus]=useState('');
const [AssetLocationId,setAssetLocationId]=useState('');
const [SalesConsul,setSalesConsul]= useState('');

const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setCompaniesResult(await GetArray);
}

const ListDepartment = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setDepartmentResult(await GetArray);
}

const ListAssetLocation = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}assetlocation?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setAssetLocationResult(await GetArray);
}

useEffect(() => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
ListCompanies();
ListDepartment();
ListAssetLocation();
dispatch(AssetListAction(FiltersSecurity.length == 0 ? '':'all',1,12,AssetType,CompanyId,DepartementId,PurchaseDate,AssetBookValue,Status,AssetLocationId,SalesConsul,AuthData.company_id));
},[]);

const handleSearch = async (e) => {
e.preventDefault();
const AuthData = JSON.parse(localStorage.getItem('authdata'));
dispatch(AssetListAction(FiltersSecurity.length == 0 ? '':'all',1,12,AssetType,CompanyId,DepartementId,PurchaseDate,AssetBookValue,Status,AssetLocationId,SalesConsul,AuthData.company_id));
}




const handlePageClick = (data) => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
let currentPage = data.selected + 1;
dispatch(AssetListAction(FiltersSecurity.length == 0 ? '':'all',currentPage,12,AssetType,CompanyId,DepartementId,PurchaseDate,AssetBookValue,Status,AssetLocationId,SalesConsul,AuthData.company_id));
}


console.log("resultlistdashboard",resultlistdashboard);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Fixed Asset Register</h2>
</div>
<div>
<NavLink to="/add-new-asset" className="btn btn-primary btn-rounded btn-sm">Add New Asset</NavLink>
</div>

</div>


<OtherNavigation/>

<div class="row pb-3">
<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Company</label>
<select name="CompanyId" id="" className="form-control" onChange={e=>setCompanyId(e.target.value)} value={CompanyId}>
<option value="">Select Company</option>
{
CompaniesResult && CompaniesResult.map((item,key) => {
return (
<option value={item.id}>{item.company_name}</option>
)
})
}
</select>
</div>
</div>

<div className="form-group col-md-4">
<label htmlFor="">Location</label>
<select name="AssetLocationId" id="" className="form-control" onChange={e=>setAssetLocationId(e.target.value)} value={AssetLocationId} required>
<option value="">Select Location</option>
{
AssetLocationResult && AssetLocationResult.map((item,key) => {
return (
<option value={item.id}>{item.locationName}</option>
)
})
}
</select>
</div>

<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Asset Type</label>
<select name="CompanyId" id="" className="form-control" onChange={e=>setAssetType(e.target.value)} value={AssetType}>
<option value="">Select Asset Type</option>
{
resultlistdashboard.code == 'ERR_NETWORK' || resultlistdashboard.code == 'ERR_BAD_REQUEST' || resultlistdashboard.length == 0 || resultlistdashboard.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
  resultlistdashboard.AssetType.length > 0 ? (
    resultlistdashboard.AssetType.map((curElem,index) => {
return (
<option value={curElem.id}>{curElem.assetType}</option>
)
})
): (
<>
<option>No Record Found....</option>
</>
)
)

}
</select>
</div>
</div>

<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Date Of Purchase</label>
<input type="date" className="form-control" name="DateOfPurchase" placeholder='Searching....' onChange={e=>setPurchaseDate(e.target.value)} value={PurchaseDate} />
</div>
</div>

<div className="form-group col-md-3">
<label htmlFor="">Departments</label>
<select name="DepartmentId" id="" className="form-control" onChange={e=>setDepartementId(e.target.value)} value={DepartementId}>
<option value="">Select Departments</option>
{
DepartmentResult && DepartmentResult.map((item,key) => {
return (
<option value={item.id}>{item.department_name}</option>
)
})
}
</select>
</div>

<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Asset Book Value</label>
<input type="number" className="form-control" name="AssetBookValue" placeholder='Searching....' onChange={e=>setAssetBookValue(e.target.value)} value={AssetBookValue} />
</div>
</div>

<div class="col-md-4">
<div class="form-group">
<label for="">Assigned To</label>
<select name="ConsultantNmae" id="" class="form-control" onChange={(e) => setSalesConsul(e.target.value)}>
  <option value="">Select All</option>
  {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAllS.map((items,key) => {
        return (
        items.id == '' ? (
          <></>
        ):(
            <option value={items.id} key={key+1}>{items.emp_name}</option>
          )
        )
    
    })
    )
  }
</select>
</div>
</div>

<div className="form-group col-md-3">
<label htmlFor="">Status Approval*</label>
<select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
<option value="" selected>Select Status</option>
<option value="1">Approved</option>      
<option value="0">Pending</option>      
</select>
</div>

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
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
<th>Asset Id</th>
<th>Asset Type</th>
<th>Asset Expiry</th>
<th>Residue Life</th>
<th>Deprication Amount</th>
<th>Asset Book Value</th>
<th>Date Of Purchased</th>
<th>Description</th>
<th>Asset Life</th>
<th>Location</th>
<th>Company</th>
<th>Department</th>
<th>Assigned To</th>
<th>Quantity</th>
<th>Asset Image</th>
<th>QR Code</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>
<tbody>
{

resultFixedAsset.data == null ? (
<>Loading.....</>
):(

resultFixedAsset.data.length > 0 ? (
resultFixedAsset.data.map((curElem , index) => {

const TotalNoOfDats = parseFloat(curElem.LifeTitle) * 365;

const current = new Date();
current.setDate(current.getDate(curElem.purchasedDate)+TotalNoOfDats);
// it adds days to a current date
var ExpiryDate = current.toISOString().substr(0,10);
var currentDate = new Date().toISOString().substr(0,10);

let today = new Date();
let form_date=new Date(ExpiryDate)
let difference=form_date>today ? form_date-today : today-form_date
let diff_days=Math.floor(difference/(1000*3600*24));

let depricationAmount = parseFloat(curElem.AssetBookValue) / parseFloat(diff_days);
let FInalDepicationAmt = parseFloat(depricationAmount) * parseFloat(diff_days);

// var QrData = "Company Name: "+curElem.company_name + " | "+ "Asset Type: " +curElem.assetType + " | "+ "Department: "+curElem.department_name+ " | "+"Book Value: "+curElem.AssetBookValue + " | "+"Quantity: "+curElem.Quantity+" | "+"Date Of Purchase: "+curElem.purchasedDate+" | "+"Expiry Date: "+curElem.ExpiryDate+" | "+"Depreciation Value: "+Math.round(curElem.depForm)+" | "+"Asset Desc: "+curElem.AssetDesc;

// var QrData2 = "Company Name: "+curElem.company_name + " | "+ "Asset Type: " +curElem.assetType + " | "+ "Department: "+curElem.department_name+ " | "+"Book Value: "+curElem.AssetBookValue + " | "+"Quantity: "+curElem.Quantity+" | "+"Date Of Purchase: "+curElem.purchasedDate+" | "+"Expiry Date: "+curElem.ExpiryDate+" | "+"Depreciation Value: "+Math.round(curElem.depForm);


return (
<tr>
<td>{curElem.rec_id}</td>
<td>{curElem.assetType}</td>
<td style={{width:'200px'}}>{curElem.ExpiryDate}</td>
<td style={{width:'150px'}}>{curElem.residueLife}</td>
<td style={{width:'150px'}}>{Math.round(curElem.depForm)}</td>
<td>{curElem.AssetBookValue}</td>
<td style={{width:'150px'}}>{curElem.purchasedDate}</td>
<td>{curElem.AssetDesc}</td>
<td>{curElem.LifeTitle} Years</td>
<td>{curElem.locationName == null ? curElem.Location : curElem.locationName}</td>
<td>{curElem.company_name}</td>
<td>{curElem.department_name}</td>
<td>{curElem.emp_name}</td>
<td>{curElem.Quantity}</td>
<td><div className='d-flex' style={{gap:10}}>

{
curElem.AssetImageExtension == 'jpg' || curElem.AssetImageExtension == 'png' ||  curElem.AssetImageExtension == 'webp' ||  curElem.AssetImageExtension == 'jpeg' ? (
  <a href={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage}`} target="_blank"><img src={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage}`} width="50" /></a>
):(
  <a href={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage}`} download><img src="FrontAsset/images/doc.svg" width="50" /></a>
)
}


{
curElem.AssetImage2Extension == 'jpg' || curElem.AssetImage2Extension == 'png' ||  curElem.AssetImage2Extension == 'webp' ||  curElem.AssetImage2Extension == 'jpeg' ? (

  curElem.AssetImage2 == '' || curElem.AssetImage2 == null ? '' : <img src={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage2}`} width="50" />

  ):(
  <a href={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage2}`} download><img src="FrontAsset/images/doc.svg" width="50" /></a>
)
}


{

curElem.AssetImage3 == 'null' || curElem.AssetImage3 == null || curElem.AssetImage3 == '' ? (
  <></>
):(

  curElem.AssetImage3Extension == 'jpg' || curElem.AssetImage3Extension == 'png' ||  curElem.AssetImage3Extension == 'webp' ||  curElem.AssetImage3Extension == 'jpeg' ? (

    curElem.AssetImage3 == '' || curElem.AssetImage3 == null ? '' : <img src={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage3}`} width="50" />

  ):(
    <a href={`${actionConfig.REACT_APP_MAIN}${curElem.AssetImage3}`} download><img src="FrontAsset/images/doc.svg" width="50" /></a>
  )

)


}

</div></td>

<td width={200}>
{/* <QRCode value={curElem == '' || curElem == null ? '' : QrData2 } /> */}
<img src={`${curElem == '' || curElem == null ? '' : curElem.Qrcode}`} alt="" />
{/* <QRCode value={curElem == '' || curElem == null ? '' : QrData } size={150} /> */}
{/* <img src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${curElem == '' || curElem == null ? '' : QrData}}&choe=UTF-8`}></img> */}
{/* <QRCode value={curElem == '' || curElem == null ? '' : QrData } width={1} /> */}
</td>

<td><span className={`badge badge-${curElem.status == 0 ? 'danger' : 'primary'}`}>{curElem.status == 0 ? 'Pending' : 'Approved'}</span></td>
<td style={{minWidth:300}}>
<NavLink to={`/add-new-asset/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>

<NavLink to={`/generate-gate-pass/${curElem.id}`}><button className="btn btn-danger btn-sm btn-rounded">Gate Pass</button></NavLink>

{
  curElem.Getpass == null || curElem.Getpass == '' ? (
    <></>
  ):(
    <><NavLink to={`/generate-gate-pass-print/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">Gate Pass Print</button></NavLink></>
  )
}

</td>
</tr>
)


})

): (
<>
<tr>
<td colspan="17">No Record Found</td>  
</tr>
</>
)

)

}
</tbody>
</table>


<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultFixedAsset.TotalCount/12)}
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
)
}

export default FixedAssetRegister