import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const JobPost = () => {

  const [result,setResult]= useState([]);

  const ListJobPost = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}jobpost?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
        ListJobPost();
  },[]);


  var countBranch = result.length;

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Job Post</h2>

</div>
<div class="d-flex">
<NavLink to="/add-job-post" className="btn btn-primary btn-rounded btn-sm">Add Job Post</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>Job ID</th>
        <th>Job Title</th>
        <th>Application End Date</th>
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
  <td>Des-{index+1}</td>
  <td>{curElem.job_title}</td>
  <td>{curElem.deadline}</td>
  <td><span class="badge badge-sm badge-green">{curElem.status}</span></td>
  <td><NavLink to={`/add-job-post/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
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

export default JobPost