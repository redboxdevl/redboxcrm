import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
// import VirginData from './AssignLeads/VirginData';
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink } from 'react-router-dom';
import { AssignLeadsAction } from '../../redux/action/AssignLeadsAction';
import { WhatsappActivityAction } from '../../redux/action/WhatsappActivityAction';
import { NotinterestedReasonAction } from '../../redux/action/NotinterestedReasonAction';
import { CallingActions } from '../../redux/action/CallingActions';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import { actionConfig } from '../../configuration';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Select from 'react-select'
import axios from 'axios';
import CheckboxAssign from './CheckboxAssign';
import { CSVLink } from 'react-csv';
import Moment from 'react-moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ListWhatsappActivity = ({dataPermission}) => {

const resultListing = useSelector(state => state.WhatsappActivityReducers.whatsappactivitydata);
const proReasonNotInterresult = useSelector(state => state.NotinterestedOptreducers.notinterestedoptdata);
const proCallingresult = useSelector(state => state.Callingreducers.callingcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const DashboardData = useSelector(state => state.dashCountReducer.dashboardcount);

const dispatch = useDispatch();

const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);
const AssignExport = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 50 && edx.sub_features == 'Export');

const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');
const [TransferStatus,setTransferStatus]= useState('');

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
    }

  const onApply = (start, end, label) => {
      const startDate = convertDatePickerTimeToMySQLTime(start._d);
      const EndDate = convertDatePickerTimeToMySQLTime(end._d);
      setStartDate(startDate); 
      setEndDate(EndDate); 
  };

  const locale = {
      format: 'YYYY-MM-DD',
    };


useEffect(() => {
dispatch(NotinterestedReasonAction());
const AuthData = JSON.parse(localStorage.getItem('authdata'));
if(SuperCon.length == 0){
dispatch(WhatsappActivityAction(AuthData.id == null ? '' : AuthData.id,1,12,search,LeadNature,SalesConsul,TransferStatus));
}else{
dispatch(WhatsappActivityAction('all',1,12,search,LeadNature,SalesConsul,TransferStatus));
}
},[]);

useEffect(() => {
if(!localStorage.getItem('authdata')){
navigate('/');
}
},[]);

console.log("proCallingresult",proCallingresult);
const navigate = useNavigate();

const [Employeeresult,setEmployeeresult]= useState([]);

const [NotInterestedresult,setNotInterresult]= useState(false);
const [Transferresult,setTransferresult]= useState(false);
const [GetLeadId,setGetLeadId]= useState('');
const [PopupData,setPopupData]= useState('');
const [GetPhoneNo,setPhoneNo]= useState('');
const [PhoneNoIos,setPhoneNoIos]= useState('');
const [PhoneNoWhatsapp,setPhoneNoWhatsapp]= useState('');
const [GetEmail,setEmailData]= useState('');
const [GetTransferNote,setTransferNote]= useState('');
const [GetAgentId,setGetAgentId]= useState('');
const [GetReasonDataId,setReasonDataId]= useState('');
const [GetBudgetPrice,setBudgetPrice]= useState('');
const [GetOtherNote,setOtherNote]= useState('');
const [GetBugget,setBugget]= useState(false);
const [GetOtherNot,setOtherNot]= useState(false);


const [search,setSearch]= useState('');
const [LeadNature,setLeadNature]= useState('');
const [SalesConsul,setSalesConsul]= useState('');
const [ProjectN,setProjectN]= useState('');
const [DateWeekly,setDateWeekly]= useState('');
const [ExportAssgin,setExportAssgin]= useState('');

const [isCheck, setIsCheck] = useState([]);


$(document).on('click','.client_opt',function(){
var optVa = $(this).val();
setReasonDataId(optVa);

if(optVa == 'Budget Issue'){
setBugget(true);
setOtherNot(false);
}else if(optVa == 'Others'){
setBugget(false);
setOtherNot(true);
setBudgetPrice('');
}else{
setBugget(false);
setOtherNot(false);
setBudgetPrice('');
}
});


const GetEmployeeData = async () => {

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const response = await axios(`${actionConfig.REACT_APP_URL}listemployee`,{cancelToken: source.token}).then((res)=>{
return res.data;
}).catch((thrown) => {
return thrown;
});
// const response = await fetch(`${actionConfig.REACT_APP_URL}listemployee`);
// const dataxs = await response.json();
setEmployeeresult(response.data);
}

useEffect(() => {
GetEmployeeData();
},[]);


const MyFunc = (leadid,agentid,phoneNo,EmailData) =>{
setGetLeadId(leadid);
setPopupData(true);
setPhoneNo(phoneNo);
setEmailData(EmailData);
setNotInterresult(false);
setTransferresult(false);
callingData(leadid);
}

const callingData = async (leadid) => {
dispatch(CallingActions(AuthDataxs.id,leadid));
}
const CallingAction = async (actionType,agentid,leadid) => {

const FeildData = { impType:actionType,agentid:agentid,leadid:leadid,customerId:0}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}leadimpression`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.success == false){
Swal.fire(
'Error!',
dataex.message,
'error'
);
}else{

navigate("/list-whatsapp-activity");
// GetAssignLead();
callingData(leadid);
}

});

}

useEffect(() => {
callingData();
},[]);


function MyFuncAction(ActioData){
if(ActioData == 'transfer'){
setNotInterresult(false);
setTransferresult(true);
}else if(ActioData == 'remove'){
setNotInterresult(true);
setTransferresult(false);
}else if(ActioData == 'reminders'){
setNotInterresult(false);
setTransferresult(false);
}else if(ActioData == 'addLeads'){
setPopupData(false);
}else{
setNotInterresult(false);
setTransferresult(false);
}

}

var countAssign = resultListing.length;
var countEmpl = Employeeresult.length;

const addNotInterestedClient = (e) =>{
e.preventDefault();

const FeildData = { agentid:AuthDataxs.id,leadid:GetLeadId,client_opt:GetReasonDataId,budgetPrice:GetBudgetPrice == '' ? '0' : GetBudgetPrice ,OtherNote:GetOtherNote == '' ? '-' : GetOtherNote,customerId:0}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}assignnotinterested`, requestOptions)
.then(response => response.json())
.then(dataex => {
if(dataex.success == false){
Swal.fire(
'Error!',
dataex.message,
'error'
);
}else{
Swal.fire(
'Good job!',
dataex.message,
'success'
);
navigate("/list-assign-leads");
// GetAssignLead();
}

});

}

const AddTransferFormData = (e) =>{
e.preventDefault();

const FeildData = { fagentid:AuthDataxs.id,tagentid:GetAgentId,leadid:GetLeadId,transferNote:GetTransferNote,statusType:'transfer'}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}assignleadtransfer`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.success == false){
Swal.fire(
'Error!',
dataex.message,
'error'
);
}else{
Swal.fire(
'Good job!',
dataex.message,
'success'
);
navigate("/list-assign-leads");
setTransferresult(false);

}
});

}

const handlePageClick = (data) => {

let currentPage = data.selected + 1
const AuthData = JSON.parse(localStorage.getItem('authdata'));
if(SuperCon.length == 0){
dispatch(WhatsappActivityAction(AuthData.id,currentPage,12,search,LeadNature,SalesConsul,TransferStatus));
}else{
dispatch(WhatsappActivityAction('all',currentPage,12,search,LeadNature,SalesConsul,TransferStatus));
}

}

const handleSearch = async (e) => {
e.preventDefault();
const AuthData = JSON.parse(localStorage.getItem('authdata'));
if(SuperCon.length == 0){
dispatch(AssignLeadsAction(AuthData.id,1,12,search,LeadNature,SalesConsul,TransferStatus));
}else{
dispatch(AssignLeadsAction('all',1,12,search,LeadNature,SalesConsul,TransferStatus));
}

}
console.log("resultListingfilter",resultListing);

const handleClick = e => {
  const { id, checked } = e.target;
  setIsCheck([...isCheck, id]);
  if (!checked) {
    setIsCheck(isCheck.filter(item => item !== id));
  }
};

const DeleteLeads = (e) => {

  e.preventDefault();

const FeildData = { isCheck:isCheck}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}leadsDeleteData`, requestOptions)
.then(response => response.json())
.then(dataex => {
console.log(dataex);
if(dataex.code == 200){
  Swal.fire(
    'Good job!',
    dataex.message,
    'success'
    );
    navigate("/list-assign-leads");
}else{
  Swal.fire(
    'Error!',
    dataex.message,
    'error'
    );
}

});

}


const ExportData = async () => {
  let arr = [];
  resultListing.data.map((curElem,index) => {
    arr.push({'clientName':curElem.getleads.clientName});
  });
  setExportAssgin(arr);
  console.log("arr",arr);

}

useEffect(() => {
ExportData();
},[resultListing]);
  

const [show, setShow] = useState(false);

const handleClose = () => {
    setShow(false);
}
const handleShow = (leadid,agentid,phoneNo,phoneNoIos,EmailData,whatsappNo) => {
    setShow(true);
    setGetLeadId(leadid);
    setPopupData(true);
    setPhoneNo(phoneNo);
    setPhoneNoWhatsapp(whatsappNo);
    setPhoneNoIos(phoneNoIos);
    setEmailData(EmailData);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid);
}

// const [IosData,setIosData] = useState();

// useEffect(() => {
//   setIosData(Platform.Browser);
//   },[Platform]);

// var myStr = "+92310"; // space at both end
// var myStrLength = myStr.slice(3);
// console.log("myStrLength",myStrLength);

return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Whatsapp Activity Leads</h2>
</div>
<div>


</div>
</div>

<section className='hk-sec-wrapper'>
<div className="row">
<div className="col-sm">
<div className="table-wrap table-responsive">

<table id="datable_1" className="table table-hover w-100 display pb-30 no-footer dtr-inline">
<thead className="thead-dark">
<tr>
<th>Name</th>
{
SuperCon.length == 0 ? (<></>) : (<th>Agent Name</th>)
}
{
SuperCon.length == 0 ? (<></>) : (<th>Client No</th>)
}
<th>Project Name</th>
<th>Assign By</th>
<th>Transfer By</th>
<th>Reminder Priority</th>
<th>Lead Status</th>
<th>Date</th>
</tr>
</thead>
<tbody>

{

resultListing.data == null ? (
<>Loading.....</>
):(

resultListing.data.length > 0 ? (
resultListing.data.map((curElem , index) => {

if(curElem.getvirginleads == null){
var edata="Untouch Lead";
var classData = "primary";
}else{
var edata="Already Call";
var classData = "danger";
}

if (curElem.getreminder == null) {
var data = "Not Set";
}else{
var data = curElem.getreminder.priority;
}

if(curElem.get_transferleads == null){
var datatra = "N/a";
var transferNote = "";
var transferDate = "";
}else{
var datatra = curElem.get_transferleads.fagentName;
var transferNote = curElem.get_transferleads.transferNote;
var transferDate = curElem.get_transferleads.created_at;
}

return (

<tr key={index}>
<td>
  {
  SuperCon.length == 0 ? (<></>) : (
    <>
    <label className="form-check-label">
    <CheckboxAssign
        key={index+1}
        type="checkbox"
        name={curElem.leadid}
        id={curElem.leadid}
        handleClick={handleClick}
      />
      </label>
    </>
  )
  }
  <a href="javascript:;" onClick={()=>handleShow(curElem.leadid,curElem.agentid,curElem.getleads.clientPhone,curElem.clientPhone,curElem.getleads.clientemail,curElem.whatsappclientPhone)}>{curElem.getleads == null ? '' :  curElem.getleads.clientName == '' ? 'No Name' : curElem.getleads.clientName}</a></td>
{
SuperCon.length == 0 ? (<></>) : (<td>{curElem.emp_name}</td>)
}
{
SuperCon.length == 0 ? (<></>) : (<td>{curElem.getleads == '' || curElem.getleads == null ? '' : curElem.getleads.clientPhone}</td>)
}
<td>{curElem.getleads == null ? '' : curElem.getleads.clientProject}</td>
<td>
<div className="align-items-center media">
<div className="media-img-wrap">
<div className="avatar mr-1" style={{width:'50px',height:'50px'}}>
<img src="../frontAsset/dist/img/redbox.png" alt="user" className="avatar-img rounded-circle" style={{objectFit:'scale-down'}}/>
</div>
</div>
<div className="media-body">
<span></span>
</div>
</div>
</td>
<td>
<span className={`badge badge-primary badge-pill`}>{datatra}</span>
<p>{transferNote}</p>
{
  transferDate == null || transferDate == '' ? (
    <></>
  ):(
    <p><Moment date={transferDate} format="YYYY/MM/DD" /></p>
  )
}

</td>
<td><span className="badge badge-danger badge-indicator"></span> {data}</td>
<td><span className={`badge badge-${classData} badge-pill`}>{edata}</span> </td>
<td>{curElem.publishAgentDate}</td>
</tr>

)

})

): (
<>
<tr>
<td colSpan="7"><b>No record Found....</b></td>
</tr>


</>
)

)

}

{
resultListing.message !== '' ? (
<tr>
<td colSpan={7}>{resultListing.message}</td>
</tr>
):(
<></>
)
}


</tbody>
</table>

{/* <div className='pb-3 pt-0'> */}
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultListing.totalRecords/12)}
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
{/* </div> */}
</div>
</div>
</div>
</section>


</div>


{/* {PopupData == true ? (

<>

<div className="modal fade" id={PopupData == true ? ('actionModal') : ('')} role="dialog" aria-labelledby="actionModalLabel" aria-hidden="true">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="">
<button type="button" className="close mt-10 mr-10" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>
</div>

<div className="modal-body p-0">
<div className="card shadow-none">
<div className="card-header card-header-action">
<h6>Activity</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href={`tel:77`+GetPhoneNo} title="Phone Call" className="PhoneCall leadimpression" onClick={()=>CallingAction('phone',AuthDataxs.id,GetLeadId)}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" />
<span className="badge badge-pill badge-warning phone impData Phone">{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.Phone}</span>
<br />
<small>Phone</small>
</center>
</a>
</div>
<div className="col">
<a href={`https://wa.me/`+GetPhoneNo} title="Whatsapp" onClick={()=>CallingAction('whatsapp',AuthDataxs.id,GetLeadId)} className="WhatsappImp leadimpression">
<center>

<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" />
<span className="badge badge-pill badge-warning whatsapp impData Whatsapp" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.whatsapp}</span>
<br />
<small>Whatsapp</small>
</center>
</a>
</div>
<div className="col">
<a href={`sms:+`+GetPhoneNo+`&body=hi this is testing email`} title="Sms" onClick={()=>CallingAction('sms',AuthDataxs.id,GetLeadId)} className="SmsImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" />
<span className="badge badge-pill badge-warning sms impData Sms" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.sms}</span>
<br />
<small>SMS</small>
</center>
</a>
</div>
<div className="col">
<a href={`mailto:`+GetEmail} title="Email" onClick={()=>CallingAction('email',AuthDataxs.id,GetLeadId)} className="EmailImp leadimpression" >
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" />
<span className="badge badge-pill badge-warning email impData Email" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined ? '' : proCallingresult.data.email}</span>
<br />
<small>Email</small>
</center>
</a>
</div>
</div>
</div>
<div className="card-header card-header-action">
<h6>Action</h6>
</div>
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href="#!" data="transfer" className="ActionPerform" onClick={()=>MyFuncAction('transfer')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-transfer.png" alt="icon" /><br />
<small>Transfer</small>
</center>
</a>
</div>
<div className="col">
<NavLink to={`/add-lead/${GetLeadId}`} className="addLeads" onClick={()=>MyFuncAction('addLeads')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-add.png" alt="icon" /><br />
<small>Add</small>
</center>
</NavLink>
</div>
<div className="col">
<NavLink to={`/add-reminder/${GetLeadId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div>
<div className="col">
<a href="#!" data="remove" className="ActionPerform NotInterested" onClick={()=>MyFuncAction('remove')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-remove.png" alt="icon" /><br />
<small>Remove</small>
</center>
</a>
</div>


</div>

<div className="modal-body" id={NotInterestedresult == false ? ('notinterestedX') : ('notinterestedShow') }>
<p>Why Client is not Interested ?</p>
<form onSubmit={addNotInterestedClient}>

<div className="mt-15">

{
proReasonNotInterresult.map((curElem,index) => {
return (
<div className="custom-control custom-radio mt-1 pl-0" key={curElem.id}>
<label style={{marginBottom:'5px'}}>
<input type="radio" name="client_opt" value={curElem.title} className="client_opt"/> {curElem.title}
</label>
</div>

)
})
}



<div className={GetOtherNot == true ? ('form-group mt-15') : ('form-group mt-15 OrderNote')}>
<label >Note</label>
<textarea className="form-control OtherNote" name="client_opt" rows="3" placeholder="Textarea" onChange={e=>setOtherNote(e.target.value)} value={GetOtherNote}>{GetOtherNote}</textarea>                                                        
</div>

<div className={GetBugget == true ? ('col-md-12') : ('col-md-12 PriceRange')}>
<div className="form-group">
<input className="range-slider-2" onChange={e=>setBudgetPrice(e.target.value)} value={GetBudgetPrice}/>
</div>
</div>
<div className="form-group mt-2">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</div>
<div>
</div>
</form>
</div>


<div className="modal-body transfer" id={Transferresult == false ? ('transferHide') : ('transferShow') }>
<form onSubmit={AddTransferFormData}>

<div className="form-group">
<label >Select Agent</label>
<select name="agentid" className="form-control custom-select select2 mt-15" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="">Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDataxs.id ? (<></>) : (<><option key={curElem.id} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>
<div className="form-group">
<label >Note</label>
<textarea name="transferNote" className="form-control" rows="3" placeholder="Textarea" onChange={e=>setTransferNote(e.target.value)} value={GetTransferNote} required></textarea>                                                        
</div>

<div className="form-group">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</form>
</div>


</div>
</div>
</div>
</div>
</div>
</div>

</>

) : (
<></>
)

} */}



<Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Activity</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="modal-body p-0">
<div className="card shadow-none">
<div className="card-body pt-10">
<div className="row">
<div className="col">
<a href={`tel:77`+PhoneNoIos} title="Phone Call" className="PhoneCall leadimpression" onClick={()=>CallingAction('phone',AuthDataxs.id,GetLeadId)}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" />
<span className="badge badge-pill badge-warning phone impData Phone">{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined || proCallingresult.data == '' || proCallingresult.data == null || proCallingresult.data == undefined ? '' : proCallingresult.data.Phone}</span>
<br />
<small>Phone</small>
</center>
</a>
</div>
<div className="col">
<a href={`https://wa.me/`+PhoneNoWhatsapp} title="Whatsapp" onClick={()=>CallingAction('whatsapp',AuthDataxs.id,GetLeadId)} className="WhatsappImp leadimpression">
<center>

<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" />
<span className="badge badge-pill badge-warning whatsapp impData Whatsapp" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined || proCallingresult.data == '' || proCallingresult.data == null || proCallingresult.data == undefined ? '' : proCallingresult.data.whatsapp}</span>
<br />
<small>Whatsapp</small>
</center>
</a>
</div>
<div className="col">
<a href={`sms:+`+GetPhoneNo+`&body=hi this is testing email`} title="Sms" onClick={()=>CallingAction('sms',AuthDataxs.id,GetLeadId)} className="SmsImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" />
<span className="badge badge-pill badge-warning sms impData Sms" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined || proCallingresult.data == '' || proCallingresult.data == null || proCallingresult.data == undefined ? '' : proCallingresult.data.sms}</span>
<br />
<small>SMS</small>
</center>
</a>
</div>
<div className="col">
<a href={`mailto:`+GetEmail} title="Email" onClick={()=>CallingAction('email',AuthDataxs.id,GetLeadId)} className="EmailImp leadimpression" >
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" />
<span className="badge badge-pill badge-warning email impData Email" >{proCallingresult == '' || proCallingresult == null || proCallingresult == undefined || proCallingresult.data == '' || proCallingresult.data == null || proCallingresult.data == undefined ? '' : proCallingresult.data.email}</span>
<br />
<small>Email</small>
</center>
</a>
</div>
</div>
</div>
{/* <div className="card-header card-header-action">
<h6>Action</h6>
</div> */}
{/* <div className="card-body pt-10">
<div className="row">
<div className="col">
<a href="#!" data="transfer" className="ActionPerform" onClick={()=>MyFuncAction('transfer')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-transfer.png" alt="icon" /><br />
<small>Transfer</small>
</center>
</a>
</div>
<div className="col">
<NavLink to={`/add-lead/${GetLeadId}`} className="addLeads" onClick={()=>MyFuncAction('addLeads')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-add.png" alt="icon" /><br />
<small>Add</small>
</center>
</NavLink>
</div>
<div className="col">
<NavLink to={`/add-reminder/${GetLeadId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div>
<div className="col">
<a href="#!" data="remove" className="ActionPerform NotInterested" onClick={()=>MyFuncAction('remove')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-remove.png" alt="icon" /><br />
<small>Remove</small>
</center>
</a>
</div>


</div>

<div className="modal-body" id={NotInterestedresult == false ? ('notinterestedX') : ('notinterestedShow') }>
<p>Why Client is not Interested ?</p>
<form onSubmit={addNotInterestedClient}>

<div className="mt-15">

{
proReasonNotInterresult.map((curElem,index) => {
return (
<div className="custom-control custom-radio mt-1 pl-0" key={curElem.id}>
<label style={{marginBottom:'5px'}}>
<input type="radio" name="client_opt" value={curElem.title} className="client_opt"/> {curElem.title}
</label>
</div>

)
})
}



<div className={GetOtherNot == true ? ('form-group mt-15') : ('form-group mt-15 OrderNote')}>
<label >Note</label>
<textarea className="form-control OtherNote" name="client_opt" rows="3" placeholder="Textarea" onChange={e=>setOtherNote(e.target.value)} value={GetOtherNote}>{GetOtherNote}</textarea>                                                        
</div>

<div className={GetBugget == true ? ('col-md-12') : ('col-md-12 PriceRange')}>
<div className="form-group">
<input className="range-slider-2" onChange={e=>setBudgetPrice(e.target.value)} value={GetBudgetPrice}/>
</div>
</div>
<div className="form-group mt-2">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</div>
<div>
</div>
</form>
</div>


<div className="modal-body transfer" id={Transferresult == false ? ('transferHide') : ('transferShow') }>
<form onSubmit={AddTransferFormData}>

<div className="form-group">
<label >Select Agent</label>
<select name="agentid" className="form-control custom-select select2 mt-15" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="">Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDataxs.id ? (<></>) : (<><option key={curElem.id} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>
<div className="form-group">
<label >Note</label>
<textarea name="transferNote" className="form-control" rows="3" placeholder="Textarea" onChange={e=>setTransferNote(e.target.value)} value={GetTransferNote} required></textarea>                                                        
</div>

<div className="form-group">
<button type="submit" className="btn btn-primary">Save</button>
</div>
</form>
</div>


</div> */}
</div>
</div>
  </Modal.Body>
</Modal>

</>
)
}

export default ListWhatsappActivity