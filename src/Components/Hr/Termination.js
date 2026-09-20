import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const Termination = () => {

  const [result,setResult]= useState([]);

  const ListTermination = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}termination?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
        ListTermination();
  },[]);


  var countBranch = result.length;

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Termination</h2>

</div>
<div class="d-flex">
<NavLink to="/add-termination" className="btn btn-primary btn-rounded btn-sm">Add New Termination</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>Ter ID</th>
        <th>Employee Name</th>
        <th>Subject</th>
        <th>Termination Type</th>
        <th>Notice Date</th>
        <th>Terminated By</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {

countBranch > 0 ? (

  result.map((curElem,index) => {

return (
<tr>
    <td>Ter-{index+1}</td>
    <td>{curElem.emp_name}</td>
    <td>{curElem.subject}</td>
    <td>{curElem.type}</td>
    <td>{curElem.notice_date}</td>
    <td>{curElem.termination_by_name}</td>
    <td><span class="badge badge-sm badge-green">Active</span></td>
    <td><NavLink to={`/add-termination/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
    <button class="btn btn-danger btn-rounded btn-sm">Delete</button></td>
</tr>
)

})
): (
<>
<tr>
<td colspan="8"><b>No Record Found....</b></td>
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

export default Termination