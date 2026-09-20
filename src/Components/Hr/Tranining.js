import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const Tranining = () => {

  
  const [TrainingResult,setTrainingResult]= useState([]);

  const ListTraining = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}training?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setTrainingResult(await GetArray);
    }


    useEffect(() => {
      ListTraining();
  },[]);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Trainings</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-training" className="btn btn-primary btn-rounded btn-sm mr-1">Add New Training</NavLink>
<NavLink to="/add-training-type" className="btn btn-danger btn-rounded btn-sm">Add Training Type</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Description</th>
        <th>Date</th>
        <th>Assign Departments</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>

  {

TrainingResult.length > 0 ? (

  TrainingResult.map((curElem,index) => {

return (
<tr>
      <td>{index+1}</td>
      <td>{curElem.training_title}</td>
      <td>{curElem.description}</td>
      <td>
        {curElem.from_date}<br />
        {curElem.to_date}
      </td>
      <td>{curElem.department_id}</td>
      <td><span class="badge badge-sm badge-green">{curElem.status}</span></td>
      <td><NavLink to={`/add-new-training/${curElem.id}`}><button className="btn btn-primary btn-rounded btn-sm">Update</button></NavLink>
      
      </td>
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

export default Tranining