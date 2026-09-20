import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const Leave = () => {

  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const dispatch = useDispatch();

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 16);

  console.log("SuperCon",SuperCon);


  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const [result,setResult]= useState([]);

  const ListLeave = async () => {
    if(SuperCon.length == 0){
      var agentId = AuthData.id;
    }else{
      var agentId = 'all';
    }

    const response = await fetch(`${actionConfig.REACT_APP_URL}leaveapplication?agentId=${agentId}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }

    useEffect(() => {
      ListLeave();
  },[]);

  var countLeave = result.length;

  console.log("dataResult",result);

return (
<>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Leave Applications</h2>

</div>
<div class="d-flex">
<NavLink to="/add-leave-request" className="btn btn-primary btn-rounded btn-sm">Add New Leaves</NavLink>
<NavLink to="/leave-type" className="btn btn-danger btn-rounded btn-sm">Leave Type</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
    <thead class="thead-dark">
      <tr>
          <th>LR ID</th>
          <th>Emp Name</th>
          <th>Leave Type</th>
          <th>Request Duration</th>
          <th>Number of Day</th>
          <th>Purpose</th>
          <th>Status</th>
      </tr>
    </thead>
    <tbody>
    {

countLeave > 0 ? (

  result.map((curElem,index) => {

return (
<tr>
    <td>LR-{index+1}</td>
    <td>{curElem.emp_name}</td>
    <td>{curElem.leave_type_name}</td>
    <td>{curElem.from_date} <b>To</b> {curElem.to_date}</td>
    <td>{curElem.no_of_days} Days</td>
    <td>{curElem.description}</td>
    <td><span class="badge badge-danger badge-sm">{curElem.status}</span></td>
  </tr>
)

})
): (
<>
<tr>
<td colspan="7"><b>No Record Found....</b></td>
</tr>
</>
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

export default Leave