import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const Warning = () => {

  const [result,setResult]= useState([]);

  const ListWarning = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}warning?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      ListWarning();
  },[]);


  var countWarning = result.length;

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Warning</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-warning" className="btn btn-primary btn-rounded btn-sm">Add New Warning</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
    <thead class="thead-dark">
      <tr>
          <th>War ID</th>
          <th>Employee Name</th>
          <th>Warning Date</th>
          <th>Subject</th>
          <th>Warning Type</th>
          <th>Warning By</th>
          <th>Actions</th>
      </tr>
    </thead>
    <tbody>

    {

countWarning > 0 ? (

  result.map((curElem,index) => {

return (
<tr>
        <td>WAR-{index+1}</td>
        <td>{curElem.emp_id}</td>
        <td>{curElem.warning_date}</td>
        <td>{curElem.subject}</td>
        <td>{curElem.type}</td>
        <td>{curElem.warning_by}</td>
        <td><NavLink to={`/add-new-warning/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink></td>
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

export default Warning