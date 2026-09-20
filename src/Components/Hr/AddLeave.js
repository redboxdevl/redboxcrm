import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Moment from 'react-moment';
import moment from 'moment';

const AddLeave = () => {


  var moment = require('moment');

  const navigate = useNavigate();
  const AuthData = JSON.parse(localStorage.getItem('authdata'));

  const [EmployeeResult,setEmployeeResult]= useState([]);
  const [LeaveTypeResult,setLeaveTypeResult]= useState([]);
  const [LeaveTypeCurrentResult,setLeaveTypeCurrentResult]= useState([]);

  const [LeaveType,setLeaveType]= useState('');
  const [EmployeeId,setEmployeeId]= useState('');
  const [CurrentBalance,setCurrentBalance]= useState('0');
  const [Fromdate,setFromdate]= useState('');
  const [Todate,setTodate]= useState('');
  const [NoOfdays,setNoOfdays]= useState('');
  const [Description,setDescription]= useState('');
  
  var date1 = moment(Fromdate);
  var date2 = moment(Todate);
  var days = date2.diff(date1, 'days');
  

  const ListEmployee = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employee?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setEmployeeResult(await GetArray);
    }

    const ListLeavetype = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}leavebalance?agentId=${AuthData.id}`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setLeaveTypeResult(await GetArray);
    }

    const ListLeavetypeCurrentBalance = async () => {
      // const response = await fetch(`https://cip.redbox.estate/api/leavetype/${LeaveType}`);
      const response = await fetch(`${actionConfig.REACT_APP_URL}leavebalance?agentId=${AuthData.id}&leavetypeid=${LeaveType}`);
      const dataxs = await response.json();
      const GetArray = dataxs.data[0];
      setLeaveTypeCurrentResult(await GetArray);

      if(LeaveType == ''){
        setCurrentBalance(0);
      }else{
        setCurrentBalance(GetArray.leave_balance);
      }
   
    }
    

    useEffect(() => {
      ListEmployee();
      ListLeavetype(EmployeeId);
      ListLeavetypeCurrentBalance();
    },[LeaveType,EmployeeId]);

   
    const addLeaveApplication = (e) =>{
      e.preventDefault();

      const FeildData = { emp_id:AuthData.id,leave_type_id:LeaveType,no_of_days:days,from_date:Fromdate,to_date:Todate,description:Description,status:'pending' }
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };

        fetch(`${actionConfig.REACT_APP_URL}leaveapplication`, requestOptions)
        .then(response => response.json())
        .then(dataex => {
            
            if(dataex.code == 200){
              Swal.fire(
                'Good job!',
                dataex.message,
                'success'
              );
              navigate("/leave");
                
            }else{
              Swal.fire(
                'Error!',
                dataex.message,
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
<h2 className="hk-pg-title font-weight-600">Leave Request</h2>

</div>
<div class="d-flex">
<NavLink to="/leave" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">

<form onSubmit={addLeaveApplication}>
<div class="row">


{/* 
<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Employee</label>
<select class="form-control" name="emp_dept_name" required="" onChange={e=>setEmployeeId(e.target.value)} value={EmployeeId}>
<option value="" selected="">Select Emp</option>
{

EmployeeResult.length > 0 ? (

  EmployeeResult.map((curElem,index) => {

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
</div> */}
<div class="form-group col-md-6">
<label for="inputPassword4">Leave Type</label>
<select class="form-control" name="emp_dept_name" required="" onChange={e=>setLeaveType(e.target.value)} value={LeaveType}>
<option value="" selected="">Select Leave Type</option>
{

LeaveTypeResult.length > 0 ? (

  LeaveTypeResult.map((curElem,index) => {

return (
  curElem.leave_type_name == '' ? '' : <option value={curElem.leave_type_id}>{curElem.leave_type_name}</option>
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



<div class="form-group col-md-6">
<label for="inputPassword4">Current Balance*</label>
<input type="text" class="form-control" name="currentBalanace" disabled autocomplete="off" value={CurrentBalance} />
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">From Date*</label>
<input type="date" class="form-control" name="fromDate" placeholder="From Date" required="" autocomplete="off" onChange={e=>setFromdate(e.target.value)} value={Fromdate}/>
</div>
</div>
<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">To Date*</label>
<input type="date" class="form-control" name="toDate" placeholder="To Date" required="" autocomplete="off" onChange={e=>setTodate(e.target.value)} value={Todate}/>
</div>
</div>
<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Number of Day*</label>
<input type="number" class="form-control" name="noOfDays" placeholder="No Of Days" autocomplete="off" onChange={e=>setNoOfdays(e.target.value)} value={days} disabled/>
</div>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">Purpose</label>
<textarea class="form-control" rows="5" placeholder="Enter Purpose" onChange={e=>setDescription(e.target.value)} value={Description}></textarea>
</div>

</div>

<button type="submit" class="btn btn-primary">Save</button>
</form>

        </section>
    </div>
</div>

</div>
    </>
  )
}

export default AddLeave