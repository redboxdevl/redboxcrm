import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const EmployeeShift = () => {

  const [result,setResult]= useState([]);

  const ListEmployeeShift = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employeeshift`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      ListEmployeeShift();
  },[]);


  var countDesignation = result.length;

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Employee Shift</h2>

</div>
<div class="d-flex">
<NavLink to="/add-employee-shift" className="btn btn-primary btn-rounded btn-sm">Add New Shift</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
<thead class="thead-dark">
  <tr>
      <th>Shift ID</th>
      <th>Shift Name</th>
      <th>Shift In</th>
      <th>Shift Out</th>
      <th>Status</th>
      <th>Actions</th>
  </tr>
</thead>
<tbody>

{

countDesignation > 0 ? (

  result.map((curElem) => {

return (
  <tr>
  <td>DES-{curElem.id}</td>
  <td>{curElem.shift_name}</td>
  <td>{curElem.shift_in}</td>
  <td>{curElem.shift_out}</td>
  <td><span class="badge badge-sm badge-green">Active</span></td>
  <td><NavLink to={`/add-employee-shift/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
    <button class="btn btn-danger btn-rounded btn-sm">Delete</button>
  </td>
</tr>

)

})
): (
<>
<tr>
<td colspan="7"><b>Loading....</b></td>
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

export default EmployeeShift