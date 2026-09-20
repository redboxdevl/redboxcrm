import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Swal from 'sweetalert2';

const Departments = () => {


  const navigate = useNavigate();

  const [result,setResult]= useState([]);

  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      ListDepartment();
  },[]);


  var countDepartment = result.length;


  const DeleteDepartments = (id) => {

    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}department/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          ListDepartment();
          navigate("/department");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
        
      });

    }else{

    }
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Department</h2>

</div>
<div class="d-flex">
<NavLink to="/add-department" className="btn btn-primary btn-rounded btn-sm">Add New Department</NavLink>
</div>


</div>

<OtherNavigation/>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
<thead class="thead-dark">
  <tr>
      <th>Dep ID</th>
      <th>Department Name</th>
      <th>Status</th>
      <th>Actions</th>
  </tr>
</thead>
<tbody>
{

countDepartment > 0 ? (

  result.map((curElem) => {

return (
  <tr>
  <td>DEP-{curElem.id}</td>
  <td>{curElem.department_name}</td>
  <td><span class="badge badge-sm badge-green">Active</span></td>
  <td><NavLink to={`/add-department/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
    <button class="btn btn-danger btn-rounded btn-sm" type="button" onClick={() => DeleteDepartments(curElem.id)}>Delete</button>
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

export default Departments