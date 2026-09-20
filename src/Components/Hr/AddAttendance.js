import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { SingleAttendanceAction } from '../../redux/action/SingleAttendanceAction';

const AddAttendance = () => {

  const navigate = useNavigate();
  let { id } = useParams();

  const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const dispatch = useDispatch();

  const [SingleEmpresult,setSingleEmpresult]= useState([]);

  const [EmpDateTime,setEmpDateTime]=useState('');
  const [EmpCheckinTime,setEmpCheckinTime]=useState('');
  const [EmpCheckOutTime,setEmpCheckOutTime]=useState('0');



  console.log(result);

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
    const string = dateData.split(" ");
    setEmpCheckinTime(string[1]);
    setEmpDateTime(string[0]);
  };

  const onApplyCheckout = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
    const string = dateData.split(" ");
    setEmpCheckOutTime(string[1]);
    setEmpDateTime(string[0]);
  }

const locale = {
  format: 'YYYY-MM-DD HH:mm:ss',
};


const [EmpResult,setEmpResult]= useState([]);

const [EmpName,setEmpName]=useState('');
const [EmpDevice,setEmpDevice]=useState('');
const [LogType,setLogType]=useState('');
const [LogTypeCheck,setLogTypeCheck]=useState(false);


  const SingleEmployeeRecords = async () => {
    if(EmpName == ''){
    }else{

      const response = await fetch(`${actionConfig.REACT_APP_URL}employee/${EmpName}`);
      const dataxs = await response.json();
      setSingleEmpresult(await dataxs.data);
      setEmpDevice(dataxs.data[0].device_id);

    }

    }

  
  useEffect(() => {
   
    SingleEmployeeRecords();
    setEmpDevice('');

    if(LogType == ''){
      setLogTypeCheck(false);
    }else if(LogType == 'In'){
      setLogTypeCheck('In');
    }else if(LogType == 'Out'){
      setLogTypeCheck('Out');
    }else{
      setLogTypeCheck(false);
    }

},[EmpName,LogType]);

useEffect(() => {
  dispatch(SingleAttendanceAction(id));
  setEmpName(singleAttendanceData.emp_id);
  if(singleAttendanceData.checkintype == 'In'){
    setLogTypeCheck('Out');
    setLogType('Out');
  }else if(singleAttendanceData.checkintype == 'Out'){
    setLogTypeCheck('In');
    setLogType('In');
  }else{
    setLogTypeCheck(false);
    setLogType('');
  }
},[singleAttendanceData]);


const AddAttendance = (e) => {
  e.preventDefault();

  const FeildData = { emp_id:EmpName,machine_id:EmpDevice,location_lat:0,location_long:0,checkout_location_lat:0,checkout_location_long:0,is_mobile:0,attendance_date:EmpDateTime,checkin:EmpCheckinTime,checkout:EmpCheckOutTime,checkintype:LogType,checkouttype:0 }
  
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };

  fetch(`${actionConfig.REACT_APP_URL}attendance`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
        console.log(dataexe);
          if(dataexe.code == '200'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/attendance");
              
          }else{
            Swal.fire(
              'Error!',
              dataexe.message,
              'error'
            );
          }
  
  
      });
  

}



return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Manual Attendance</h2>

</div>
<div class="d-flex">
<NavLink to="/attendance" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={AddAttendance}>
<div class="row">

<div class="form-group col-md-4">
  <label for="inputPassword4">Emp Name*</label>
  <select id="empName" name="empName" class="form-control" required="" onChange={e=>setEmpName(e.target.value)} value={EmpName}>
    <option value="" selected="">Select Emp</option>
    {

result.empall.length > 0 ? (
  result.empall.map((curElem,index) => {
return (
  <option value={curElem.id}>{curElem.emp_name}</option>
)

})
): (
<>
<option>No Record Found....</option>
</>
)

}
    
  </select>
  </div>
  <div class="form-group col-md-4">
  <label for="inputPassword4">Device ID*</label>
  <input type="text" disabled class="form-control" name="deviceId" placeholder="Device Id" required="" autocomplete="off" onChange={e=>setEmpDevice(e.target.value)} value={EmpDevice}/> </div>

  <div class="form-group col-md-4">
  <label for="inputEmail4">Log Type*</label>
  <select id="agent_title" name="agent_title" class="form-control" required onChange={e=>setLogType(e.target.value)} value={LogType}>
    <option value="" selected="">Select Type</option>
    {
      id == null ? (
    <>
      <option value="In">In</option>
      <option value="Out">Out</option></>
      ) : (
        <option value="Out">Out</option>
      )
    }
    
  </select>
</div>

{
  LogTypeCheck == 'In' ? (
    <div class="form-group col-md-4">
      <label for="inputPassword4">CheckIn Time*</label>
      <DateRangePicker
        initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale }}
        onCallback={onApply}
        >
            <input class="form-control" type="text" />
        </DateRangePicker>
    </div>
  ):(
    <></>
  )
}

{
  LogTypeCheck == 'Out' ? (
    <div class="form-group col-md-4">
  <label for="inputPassword4">Checkout Time*</label>
  <DateRangePicker
    initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale }}
    onCallback={onApplyCheckout}
    >
        <input class="form-control" type="text" />
    </DateRangePicker>
</div>
  ):(
    <></>
  )
}




 
  

</div>

<button type="submit" class="btn btn-primary">Submit</button>
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
)
}

export default AddAttendance