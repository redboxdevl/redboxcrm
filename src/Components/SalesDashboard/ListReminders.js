import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { ReminderLeadsAction } from '../../redux/action/ReminderLeadsAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { browserName} from "react-device-detect";
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';

function ListReminders() {


  const navigate = useNavigate();

  const AuthDatas = JSON.parse(localStorage.getItem('authdata'));

  const resultReminderData = useSelector(state => state.ReminderLeadsreducers.reminderleaddata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3);

  const dispatch = useDispatch()

  const [StartDates,setStartDate]= useState('');
  const [EndDate,setEndDate]= useState('');
  const [search,setSearch]= useState('');
  const [ReminderStatus,setReminderStatus]= useState('');
  const [ReminderPriority,setReminderPriority]= useState('');
  const [SalesConsul,setSalesConsul]= useState('');
  const [show, setShow] = useState(false);
  const [GetPhoneNo,setPhoneNo]= useState('');
  const [GetCustomerId,setGetCustomerId]= useState('');
  const [proCallingresult,setProCallingresult]= useState([]);
  const [GetLeadId,setGetLeadId]= useState('');
  const [GetEmail,setEmailData]= useState('');
  const [NotInterestedresult,setNotInterresult]= useState(false);
  const [Transferresult,setTransferresult]= useState(false);
  const [PopupData,setPopupData]= useState('');
  const [GetReasonDataId,setReasonDataId]= useState('');
const [GetBudgetPrice,setBudgetPrice]= useState('');
const [GetOtherNote,setOtherNote]= useState('');
const [proReasonNotInterresult,setReasonNotInterresult]= useState([]);
const [GetBugget,setBugget]= useState(false);
const [GetOtherNot,setOtherNot]= useState(false);
const [GetAgentId,setGetAgentId]= useState('');
const [GetTransferNote,setTransferNote]= useState('');
const [Employeeresult,setEmployeeresult]= useState([]);


  const handleClose = () => {
    setShow(false);
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
    navigate("/list-reminders");
    
    callingData(leadid);
    }
    
    });
    
    }
    
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
        navigate("/list-reminders");
        
        
        }
        
        });
        
        }

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
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(ReminderLeadsAction(AuthData.id,1,12,'',ReminderStatus,SalesConsul,ReminderPriority));
      }else{
        dispatch(ReminderLeadsAction('all',1,12,EmpData.teamObj,ReminderStatus,SalesConsul,ReminderPriority));
      }
      
      }else{
      dispatch(ReminderLeadsAction('all',1,12,'',ReminderStatus,SalesConsul,ReminderPriority));
      }
  },[]);

  const handlePageClick = (data) => {

    let currentPage = data.selected + 1
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(ReminderLeadsAction(AuthData.id,currentPage,12,'',ReminderStatus,SalesConsul,ReminderPriority));
      }else{
        dispatch(ReminderLeadsAction('all',currentPage,12,EmpData.teamObj,ReminderStatus,SalesConsul,ReminderPriority));
      }
   
    }else{
    dispatch(ReminderLeadsAction('all',currentPage,12,'',ReminderStatus,SalesConsul,ReminderPriority));
    }
    
    }


    const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      const EmpData = JSON.parse(localStorage.getItem('empTeam'));
      if(SuperCon.length == 0){
        if(EmpData == '' || EmpData == null || EmpData == undefined){
          dispatch(ReminderLeadsAction(AuthData.id,1,12,'',ReminderStatus,SalesConsul,ReminderPriority));
        }else{
          dispatch(ReminderLeadsAction('all',1,12,EmpData.teamObj,ReminderStatus,SalesConsul,ReminderPriority));
        }
        
        }else{
        dispatch(ReminderLeadsAction('all',1,12,'',ReminderStatus,SalesConsul,ReminderPriority));
        }
    
    }

    const callingData = async (leadid) => {

      const response = await fetch(`${actionConfig.REACT_APP_URL}callingimpression?agentid=${AuthDatas.id}&leadid=${leadid}`);
      const dataxs = await response.json();
      setProCallingresult(dataxs.data);
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
        navigate("/list-reminders");
        
        
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
          navigate("/list-reminders");
          
          }
          
          });
          
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
    
  var lis = [];

for (var i=1; i<10; i++) {
lis.push( <option value={`${i}0`}>{`${i}0%`}</option>);
}

  return (
    <>
    <Navigation />
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
            <div>
                <h2 className="hk-pg-title font-weight-600">Reminders</h2>
            </div>
        </div>

        <div class="row pb-3">
  
  {/* <div className="col-md-4">
    <div className="form-group">
      <label htmlFor="">Search Anything</label>
    <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  </div> */}

<div class="col-md-3">
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

  <div class="col-md-3">
<div class="form-group">
<label for="">Reminder Status</label>
<select name="NatureName" class="form-control" onChange={(e) => setReminderStatus(e.target.value)} value={ReminderStatus}>
  <option value="">Select All</option>
  <option value="Today">Today</option>
  <option value="Tomorrow">Tomorrow</option>
  <option value="Overdue">Overdue</option>
  <option value="All">All</option>
</select>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label for="">Reminder Priority</label>
<select name="NatureName" class="form-control" onChange={(e) => setReminderPriority(e.target.value)} value={ReminderPriority}>
  <option value="">Select All</option>
  <option value="medium">medium</option>
  <option value="low">low</option>
  <option value="high">high</option>
</select>
</div>
</div>

  {/* <div className="col-md-3">
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
  </div> */}

<div class="col-md-2">
  <div class="form-group" style={{marginTop:'33px'}}>
      <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
  </div>
</div>
</div>

<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultReminderData.total}</span></h4>
</div>
</div>

        <div className="row">
        <div className="col-sm">
        <div className="table-wrap">

        <table id="datable_1" className="table table-hover w-100 display pb-30">
        <thead className="thead-dark">
        <tr>
          <th>Lead Id</th>
          <th>Consultant Name</th>
        <th>Client Name</th>
        <th>Priority</th>
        <th>Details</th>
        <th>Lead Status</th>
        <th>Date</th>
        </tr>
        </thead>
        <tbody>
        
        {

resultReminderData.data == null ? (
<>Loading.....</>
):(
  resultReminderData.data.length > 0 ? (

    resultReminderData.data.map((curElem,index) => {

return (
<tr className={`${curElem.get_calling_impress == '' || curElem.get_calling_impress == null ? 'bg-secondary' : ''}`}>
  <td><Link to={`/lead-history/${curElem.leadid}`}>{curElem.leadid}</Link></td>
    <td>{curElem.get_employee_details == '' || curElem.get_employee_details == null ? '' : curElem.get_employee_details.emp_name}</td>
      <td>
        
        {
          curElem.get_assign_leads.shiftStatus == 0 ? (
         
            <><a href="javascript:;">{curElem.getleads_home == null ? '' : curElem.getleads_home.clientName == '' ? 'N/a' : curElem.getleads_home.clientName} <h6>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientPhone == '' ? 'N/a' : curElem.getleads_home.clientPhone}</h6></a></>
         
            ) : curElem.get_assign_leads.shiftStatus == 1 ? (
            
            <><a href="javascript:;" onClick={()=>handleShow(curElem.customerId,curElem.leadid,curElem.agentid,curElem.getleads_home == '' || curElem.getleads_home == null ? '' : curElem.getleads_home.clientPhone,'@')}>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientName == '' ? 'N/a' : curElem.getleads_home.clientName} <h6>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientPhone == '' ? 'N/a' : curElem.getleads_home.clientPhone}</h6></a></>
            
            ) : curElem.get_assign_leads.shiftStatus == 2 ? (
           
              <>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientName == '' ? 'N/a' : curElem.getleads_home.clientName} <h6>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientPhone == '' ? 'N/a' : curElem.getleads_home.clientPhone}</h6> </>
          
              ):(
            
            <>
            {curElem.getleads_home == null ? '' : curElem.getleads_home.clientName == '' ? 'N/a' : curElem.getleads_home.clientName} <h6>{curElem.getleads_home == null ? '' : curElem.getleads_home.clientPhone == '' ? 'N/a' : curElem.getleads_home.clientPhone}</h6> </>
          
          )
        }

        
        
        
        </td>
      <td>{curElem.priority}</td>
      <td>{curElem.reminderinfo}</td>
      <td>{curElem.get_assign_leads == '' || curElem.get_assign_leads == null ? '' : curElem.get_assign_leads.shiftStatus == 0 ? 'Assign Leads' : curElem.get_assign_leads.shiftStatus == 1 ? 'My Leads' : curElem.get_assign_leads.shiftStatus == 2 ? 'Not Interested' : ''}</td>
      <td>{curElem.reminderSet}</td>
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

 
        </tbody>
        </table>


        <div className='pb-3 pt-0'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultReminderData.total/12)}
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

export default ListReminders