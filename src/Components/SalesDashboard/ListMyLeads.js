import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import Swal from 'sweetalert2'
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink, Link } from 'react-router-dom';
import $ from 'jquery';
import { MyLeadsAction } from '../../redux/action/MyLeadsAction';
import { actionConfig } from '../../configuration';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { browserName} from "react-device-detect";

const ListMyLeads = () =>  {

  const EmpData2 = JSON.parse(localStorage.getItem('empTeam'));
const navigate = useNavigate();

const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');

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
  if(!localStorage.getItem('authdata')){
    navigate('/');
  }
},[]);

const resultMyListing = useSelector(state => state.myLeadsreducer.myleaddata);
const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
const AuthDatas = JSON.parse(localStorage.getItem('authdata'));
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const dispatch = useDispatch()


const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);



const [proresult,setProresult]= useState([]);
const [Employeeresult,setEmployeeresult]= useState([]);
const [proCallingresult,setProCallingresult]= useState([]);
const [proReasonNotInterresult,setReasonNotInterresult]= useState([]);

const [NotInterestedresult,setNotInterresult]= useState(false);
const [Transferresult,setTransferresult]= useState(false);
const [GetLeadId,setGetLeadId]= useState('');
const [GetCustomerId,setGetCustomerId]= useState('');

const [PopupData,setPopupData]= useState('');
const [GetPhoneNo,setPhoneNo]= useState('');
const [GetEmail,setEmailData]= useState('');
const [GetTransferNote,setTransferNote]= useState('');
const [GetAgentId,setGetAgentId]= useState('');
const [GetReasonDataId,setReasonDataId]= useState('');
const [GetBudgetPrice,setBudgetPrice]= useState('');
const [GetOtherNote,setOtherNote]= useState('');
const [GetBugget,setBugget]= useState(false);
const [GetOtherNot,setOtherNot]= useState(false);
const [SalesConsul,setSalesConsul]= useState('');
const [search,setSearch]= useState('');
const [ProjectN,setProjectN]= useState('');
const [SelfStatus,setSelfStatus]= useState('');

useEffect(() => {
const AuthData = JSON.parse(localStorage.getItem('authdata'));
const EmpData = JSON.parse(localStorage.getItem('empTeam'));
if(!localStorage.getItem('authdata')){
  navigate('/');
}else{
  if(SuperCon.length == 0){
    if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
      dispatch(MyLeadsAction(AuthData.id,1,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
    }else{
      dispatch(MyLeadsAction('all',1,12,search,EmpData.teamObj,browserName,SalesConsul,ProjectN,SelfStatus));
    }
  
  }else{
  dispatch(MyLeadsAction('all',1,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
  }
}

// const interval = setInterval(() => {

// }, 3000);
//   return () => clearInterval(interval);
},[]);

console.log("resultMyListing",resultMyListing);



const GetEmployeeData = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}listemployee`);
const dataxs = await response.json();
setEmployeeresult(await dataxs.data);
}

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

const GetReasonData = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}listnotinterestedreason`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setReasonNotInterresult(await GetArray);
}

function MyFunc(customerid,leadid,agentid,phoneNo,EmailData){
setGetLeadId(leadid);
setPopupData(true);
setPhoneNo(phoneNo);
setEmailData(EmailData);
setGetCustomerId(customerid);
setNotInterresult(false);
setTransferresult(false);
callingData(leadid);
}

const callingData = async (leadid) => {

const response = await fetch(`${actionConfig.REACT_APP_URL}callingimpression?agentid=${AuthDatas.id}&leadid=${leadid}`);
const dataxs = await response.json();
setProCallingresult(dataxs.data);
}

const CallingAction = async (actionType,agentid,leadid) => {

const FeildData = { impType:actionType,agentid:agentid,leadid:leadid,customerId:GetCustomerId}

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
navigate("/list-my-leads");

callingData(leadid);
}

});

}


useEffect(() => {
callingData();
GetReasonData();
GetEmployeeData();
},[]);


function MyFuncAction(ActioData){
if(ActioData == 'share'){
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


const AddShareFormData = (e) =>{
e.preventDefault();

const FeildData = { fagent:AuthDatas.id,tagent:GetAgentId,leadid:GetLeadId,shareNote:GetTransferNote,sharePercentage:0}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}myleadshareleads`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.success == false){
Swal.fire(
'Error!',
dataex.data,
'error'
);
}else{
Swal.fire(
'Good job!',
dataex.data,
'success'
);
setTransferresult(false);
navigate("/list-my-leads");


}

});

}

const HotAddACtion = () =>{


if(window.confirm("Do You Want to Perform This Action") == true){

const FeildData = { customerid:GetCustomerId}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}myleadstatushot`, requestOptions)
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
navigate("/list-my-leads");


}

});

}else{

}

}


const addNotInterestedClient = (e) =>{
e.preventDefault();

const FeildData = { agentid:AuthDatas.id,leadid:GetLeadId,client_opt:GetReasonDataId,budgetPrice:GetBudgetPrice == '' ? '0' : GetBudgetPrice ,OtherNote:GetOtherNote == '' ? '-' : GetOtherNote,customerId:GetCustomerId == 0 ? 0 : GetCustomerId}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}myleadsnotinterested`, requestOptions)
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
navigate("/list-my-leads");

}

});

}

var countMyLead = resultMyListing.length;

var lis = [];

for (var i=1; i<10; i++) {
lis.push( <option value={`${i}0`}>{`${i}0%`}</option>);
}


const handlePageClick = (data) => {
console.log('click.....',data);
let currentPage = data.selected + 1
const AuthData = JSON.parse(localStorage.getItem('authdata'));
const EmpData = JSON.parse(localStorage.getItem('empTeam'));
if(SuperCon.length == 0){
  if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
    dispatch(MyLeadsAction(AuthData.id,currentPage,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
  }else{
    dispatch(MyLeadsAction('all',currentPage,12,search,EmpData.teamObj,browserName,SalesConsul,ProjectN,SelfStatus));
  }
}else{
  dispatch(MyLeadsAction('all',currentPage,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
}

}

const handleSearch = async (e) => {
  e.preventDefault();
  console.log("searching....");
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const EmpData = JSON.parse(localStorage.getItem('empTeam'));
  if(SuperCon.length == 0){
    if(EmpData == '' || EmpData == null || EmpData == undefined || EmpData2.teamStatus == 'manager'){
      dispatch(MyLeadsAction(AuthData.id,1,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
    }else{
      dispatch(MyLeadsAction('all',1,12,search,EmpData.teamObj,browserName,SalesConsul,ProjectN,SelfStatus));
    }
    
  }else{
    dispatch(MyLeadsAction('all',1,12,search,'',browserName,SalesConsul,ProjectN,SelfStatus));
  }

}

const [show, setShow] = useState(false);

const handleClose = () => {
  setShow(false);
}

const handleShow = (customerid,leadid,agentid,phoneNo,EmailData) => {
    setShow(true);
    setGetLeadId(leadid);
    setPopupData(true);
    setPhoneNo(phoneNo);
    setEmailData(EmailData);
    setGetCustomerId(customerid);
    setNotInterresult(false);
    setTransferresult(false);
    callingData(leadid);
}



return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
<div>
<h2 className="hk-pg-title font-weight-600">My Leads</h2>
</div>
</div>

<div class="row pb-3">
  
  <div className="col-md-2">
    <div className="form-group">
      <label htmlFor="">Search Anything</label>
    <input type="text" className="form-control" name="search" placeholder='E.g (id,Name,phone)' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  </div>

  <div class="col-md-2">
<div class="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" class="form-control" onChange={(e) => setSalesConsul(e.target.value)}>
  <option value="">Select All</option>
  {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAll.map((items,key) => {
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

<div class="col-md-2">
<div class="form-group">
<label for="">Lead Status</label>
<select name="SelfStatus" id="" class="form-control" onChange={(e) => setSelfStatus(e.target.value)} value={SelfStatus}>
  <option value="">Select All</option>
  <option value="0">Self Lead</option>
</select>
</div>
</div>

  <div className="col-md-2">
    <div class="form-group">
        <label for="clientName">DateRange<span class="text-danger">*</span></label>
        <DateRangePicker
        initialSettings={{ startDate:true ,endDate:true, timePicker:false , timePicker24Hour:false , locale }}
        onCallback={onApply}
        handleEvent={handleEvent}
        >
            <input class="form-control" type="text" />
        </DateRangePicker>
    </div>
  </div>

  
<div class="col-md-2">
<div class="form-group">
<label for="">Projects</label>
<select name="projectN" id="" class="form-control" onChange={(e) => setProjectN(e.target.value)}>
  <option value="">Select All</option>
  {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.getAllProjects.map((items,key) => {
        return (
        items.clientProject == '' ? (
          <></>
        ):(
            <option value={items.clientProject} key={key+1}>{items.clientProject}</option>
          )
        )
    
    })
    )
  }
</select>
</div>
</div>



<div class="col-md-2">
  <div class="form-group" style={{marginTop:'33px'}}>
      <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
  </div>
</div>
</div>


<section className='hk-sec-wrapper'>
<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultMyListing.totalRecords}</span></h4>
</div>
</div>
<div className="row">
<div className="col-sm">
<div className="table-wrap">

<table id="datable_1" className="table display pb-30">
<thead className="thead-dark">
<tr>
<th>Agent Name</th>
<th>Name</th>
<th>Project Name</th>
<th>Lead Source</th>
<th>Activity</th>
<th>Status</th>
<th>Date</th>
</tr>
</thead>
<tbody>


{
resultMyListing.data == null || resultMyListing == '' || resultMyListing == null || resultMyListing.length == 0 || resultMyListing.data == '' || resultMyListing == undefined || resultMyListing.code == 'ERR_NETWORK' || resultMyListing.code == 'ERR_BAD_REQUEST' || resultMyListing.code == 'ERR_BAD_RESPONSE' || resultMyListing.code == 500 || resultMyListing.code == '500' ? (
<>Loading.....</>
):(

resultMyListing.data.length > 0 ? (

    resultMyListing.data.map((curElem , index) => {
                    
        if (curElem.reminder_data == null) {
            var dataRem = "Not Set";
            }else{
            var dataRem = curElem.reminder_data.priority;
            }
            
    return (

        <tr>

<td><Link to={`/lead-history/${curElem.leadid}`}>{curElem.get_employee_details == '' || curElem.get_employee_details == null ? '' : curElem.get_employee_details.emp_name}</Link></td>

{/* curElem.leadid == 0 ? curElem.clientName : curElem.getleads == '' || curElem.getleads == null ? '' : curElem.getleads.clientName */}
<td><a href="javascript:;" onClick={()=>handleShow(curElem.id,curElem.leadid,curElem.agentid,curElem.mobileNo,curElem.email == null ? '@' : curElem.email)}>{curElem.clientName}</a><br /> {curElem.mobileNo}</td>
<td>{curElem.project_data == null ? '' : curElem.project_data.title}</td>
{/* <td>
<div className="align-items-center media">
<div className="media-img-wrap">
<div className="avatar mr-1" style={{width:'50px',height:'50px'}}>
<img src="frontAsset/dist/img/redbox.png" alt="user" className="avatar-img rounded-circle" style={{objectFit:'scale-down'}}/>
{curElem.leadid == 0 ? <span className="badge badge-primary badge-pill">Self Leads</span> : ''}
</div>
</div>
<div className="media-body">
<span></span>
</div>
</div>
</td> */}
{/* <td><span className="badge badge-danger badge-indicator"></span> {dataRem} <br /> {curElem.reminder_data == null ? '' : curElem.reminder_data.reminderinfo}</td> */}
<td>{curElem.activityName}</td>
<td>{curElem.get_activities == null ? curElem.clientActivityDesc : curElem.get_activities.activityDetails}</td>
<td><span className="badge badge-danger  badge-pill">{curElem.leadid == 0 ? 'Self Lead' : 'My Leads'}</span></td>
{/* <td><span className="badge badge-danger  badge-pill">Already Call</span></td> */}
<td>{curElem.created_at}</td>
</tr>

        )

    })
    ): (
    <>
    <tr>
    <td colSpan="6"><b>No record Found....</b></td>
    </tr>
    
    
    </>
    )

)



}


</tbody>
</table>


<div className='pb-3 pt-0'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultMyListing.totalRecords/12)}
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
<a href={`tel:77`+GetPhoneNo} title="Phone Call" className="PhoneCall leadimpression" onClick={()=>CallingAction('phone',AuthDatas.id,GetLeadId)}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-phone.png" alt="icon" />
<span className="badge badge-pill badge-warning phone impData Phone">{proCallingresult.Phone}</span>
<br />
<small>Phone</small>
</center>
</a>
</div>
<div className="col">
<a href={`https://wa.me/`+GetPhoneNo} title="Whatsapp" onClick={()=>CallingAction('whatsapp',AuthDatas.id,GetLeadId)} className="WhatsappImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-whatsapp.png" alt="icon" />
<span className="badge badge-pill badge-warning whatsapp impData Whatsapp" >{proCallingresult.whatsapp}</span>
<br />
<small>Whatsapp</small>
</center>
</a>
</div>
<div className="col">
<a href={`sms:+`+GetPhoneNo+`&body=hi this is testing email`} title="Sms" onClick={()=>CallingAction('sms',AuthDatas.id,GetLeadId)} className="SmsImp leadimpression">
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-sms.png" alt="icon" />
<span className="badge badge-pill badge-warning sms impData Sms" >{proCallingresult.sms}</span>
<br />
<small>SMS</small>
</center>
</a>
</div>
<div className="col">
<a href={`mailto:`+GetEmail} title="Email" onClick={()=>CallingAction('email',AuthDatas.id,GetLeadId)} className="EmailImp leadimpression" >
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-envelope.png" alt="icon" />
<span className="badge badge-pill badge-warning email impData Email" >{proCallingresult.email}</span>
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
<a href="javascript:;" data="share" className="ActionPerform" onClick={()=>MyFuncAction('share')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-share.png" alt="icon" /><br />
<small>Share</small>
</center>
</a>
</div>
<div className="col">
<NavLink to={`/activities/${GetLeadId}/${GetCustomerId}`} className="addLeads" onClick={()=>MyFuncAction('addActivity')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-activity.png" alt="icon" /><br />
<small>Activity</small>
</center>
</NavLink>
</div>
<div className="col">
<NavLink to={`/add-reminder/${GetLeadId}/${GetCustomerId}`} data="reminders" className="addReminders Reminders ActionPerform" onClick={()=>MyFuncAction('reminders')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-reminders.png" alt="icon" /><br />
<small>Reminders</small>
</center>
</NavLink>
</div>
<div className="col">
<a href="javascript:;" data="remove" className="ActionPerform NotInterested" onClick={()=>MyFuncAction('remove')}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-remove.png" alt="icon" /><br />
<small>Remove</small>
</center>
</a>
</div>

<div className="col">
<a href="javascript:;" data="hot" className="ActionPerform NotInterested" onClick={()=>HotAddACtion()}>
<center>
<img className="img-fluid rounded w-60" src="FrontAsset/dist/img/icons/icn-hot.png" alt="icon" /><br />
<small>Hot</small>
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

<div className="custom-control custom-radio mt-1 pl-0">
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
<form onSubmit={AddShareFormData}>

<div className="form-group">
<label >Select Agent</label>
<select name="agentid" className="form-control custom-select select2 mt-15" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="" selected>Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDatas.id ? (<></>) : (<><option key={index} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>

<div className="form-group">
<label >Percentage</label>
<select name="percentage" className="form-control">
<option value="">Select Percentage</option>
{lis}
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
  </Modal.Body>
  </Modal>

</>
)
}

export default ListMyLeads