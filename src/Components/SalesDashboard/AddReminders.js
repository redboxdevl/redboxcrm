import React,{useEffect, useState} from 'react'
import { useParams , useNavigate , NavLink  } from 'react-router-dom'
import Swal from 'sweetalert2'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import $ from 'jquery';
import Navigation from '../../Includes/Navigation';
import { actionConfig } from '../../configuration';
import moment from 'moment/moment';
import { useDispatch, useSelector } from 'react-redux';
import { loadingToggleAction } from '../../redux/action/DashboardCountAction';
import { getDashboardListACtion } from '../../redux/action/getDashboardListACtion';

const AddReminders = () => {

    const navigate = useNavigate();
    let { id , cid } = useParams();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const dispatch = useDispatch();


    const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

    const [ResultReminderLog,setResultReminderLog]= useState([]);

    var CurrentDate = moment().format('YYYY-MM-DD hh:mm:ss');

    $('body').find(".modal-backdrop").removeClass();
    $('body').removeClass("modal-open");

    const [ReminderSetItem,setItemReminder]= useState(CurrentDate);
    const [ReminderPriority,setReminderPriority]= useState('');
    const [ReminderInformation,setReminderInformation]= useState('');
    const [ReminderType,setReminderType]= useState('');
    const [ReminderOtherTypes,setReminderOtherTypes]= useState('');


    useEffect(() => {
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        const EmpData = JSON.parse(localStorage.getItem('empTeam'));
        const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4 || edx.feature_id === 145);
        dispatch(loadingToggleAction(true))
        if(SuperCon.length === 0){
          if(EmpData === null || EmpData === ''){
            dispatch(getDashboardListACtion(AuthData.id,''));
          }else{
            dispatch(getDashboardListACtion('all',EmpData.teamObj));
          }
        }else{
          dispatch(getDashboardListACtion('all',''));
        }
    },[dispatch,resultRolePermssion]);


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
        return [mySQLDate, mySQLTime].join(" ");
    }

    const onApply = (event, picker) => {
        const dateData = convertDatePickerTimeToMySQLTime(picker._d);
        setItemReminder(dateData);
    };

    const locale = {
        format: 'YYYY-MM-DD HH:mm:ss',
     };


     const AddReminderFormData = (e) =>{
        e.preventDefault();

        const FeildData = { agentid:AuthData.id,leadid:id,reminderSet:ReminderSetItem,priority:ReminderPriority,reminderinfo:ReminderInformation,customerId:cid == null ? 0 : cid,reminderTypeId:ReminderType,otherreminderTypeId:ReminderOtherTypes == null || ReminderOtherTypes == '' ? '0' : ReminderOtherTypes }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}assignreminder`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                console.log(dataex);
                
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
                
                 if(cid == null){
                    navigate("/list-assign-leads");
                 }else{
                    navigate("/list-my-leads");
                 }

                    
                }

            });

    }




    const GetRemindersLog = async (id) => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}getReminderLog?cusId=${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs;
        const FinalArray = GetArray;
        setResultReminderLog(await GetArray);
    }

    useEffect(() => {
        GetRemindersLog(id);
    },[id]);
        

    console.log("resultlistdashboard",resultlistdashboard);

  return (
    <>
    <Navigation />
       
<div class="container-fluid" style={{marginTop:'5rem'}}>
<div class="hk-pg-header">
<div>
<h2 class="hk-pg-title font-weight-600 mb-10">Reminders</h2>
</div>
<div class="d-flex">

</div>
</div>


<div class="row">
<div class="col-xl-12">
<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<form onSubmit={AddReminderFormData}>
    
    <div class="row">

    <div class="col-md-4 form-group">
        <label for="clientStatus">Reminder Type<span class="text-danger">*</span></label>
        <select class="form-control custom-select d-block w-100 select2" name="ReminderType" id="clientStatus" onChange={e=>setReminderType(e.target.value)} value={ReminderType} required>
            <option value="">Select Reminder Type...</option>
            {
                resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
                <></>
                ):(
                resultlistdashboard.Assignreminderlist.map((items,key) => {
                    return (
                    items.id == '' ? (
                    <></>
                    ):(
                        <option value={items.id} key={key+1}>{items.typeTitle}</option>
                    )
                    )
                
                })
                )
            }
            <option value="Other">Other</option>
        </select>
        </div>
        
        <div class={`col-md-3 form-group ${ReminderType == 'Other' ? '' : 'd-none'}`}>
        <label for="gender">Other Types</label>
        <input type="text" name="ReminderOtherTypes" id="" class="form-control" onChange={e=>setReminderOtherTypes(e.target.value)} value={ReminderOtherTypes} placeholder='Reminder Other Type' />
        </div>

        <div class="col-md-4 form-group">
        <label for="clientName">Reminder Set<span class="text-danger">*</span></label>
        <DateRangePicker
        initialSettings={{ 
            singleDatePicker:true , 
            timePicker:true , 
            timePicker24Hour:true , 
            startDate: moment().toDate(),
            locale, 
        }}
        onCallback={onApply}
        >
            <input class="form-control" type="text" />
        </DateRangePicker>
        </div>
        <div class="col-md-4 form-group">
        <label for="clientStatus">Reminder Priority<span class="text-danger">*</span></label>
        <select class="form-control custom-select d-block w-100 select2" name="priority" id="clientStatus" onChange={e=>setReminderPriority(e.target.value)} value={ReminderPriority} required>
            <option value="">Select Priority...</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        </div>

        
      
       
    </div>
    <div class="row">
    <div class="col-md-12 form-group">
        <label for="gender">Reminder Information<span class="text-danger">*</span></label>
        <textarea name="reminderinfo" id="" cols="30" rows="5" class="form-control" onChange={e=>setReminderInformation(e.target.value)} value={ReminderInformation} required>{ReminderInformation}</textarea>
        </div>
    </div>
    <hr />
    <button class="btn btn-primary" type="submit">Save Lead</button>
</form>
</div>
</div>
</section>
</div>
</div>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
<thead class="thead-dark">
<tr>
<th>Name</th>
<th>Mobile No</th>
<th>Reminder Date</th>
<th>Priority</th>
<th>Details</th>
</tr>
</thead>
<tbody>
{

ResultReminderLog == null || ResultReminderLog == undefined || ResultReminderLog == '' || ResultReminderLog.length == 0 ? (
    <>Loading.....</>
  ):(
  
    ResultReminderLog.data.length > 0 ? (
        ResultReminderLog.data.map((curElem , index) => {
    return ( 
<tr>
    <td>{curElem.clientName}</td>
    <td>{curElem.clientPhone}</td>
    <td>{curElem.reminderSet}</td>
    <td>{curElem.priority}</td>
    <td>{curElem.reminderinfo}</td>
</tr>
 )
  
})
): (
<>
  <tr>
    <td colSpan="5"><b>Not Found.....</b></td>
  </tr>
</>
)

)


}


</tbody>
</table>
</div>
</div>
</div>
</div>

    </>
  )
}

export default AddReminders