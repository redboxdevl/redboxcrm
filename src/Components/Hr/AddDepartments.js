import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddDepartments = () => {

    const navigate = useNavigate();

let { id } = useParams();

useEffect(() => {
    SingleBranchRecords();
    ListBranch();
},[]);

const [result,setResult]= useState([]);
const [SingleCompanyresult,setSingleCompanyresult]= useState([]);

const [DepartmentName,setDepartmentName]= useState('');
const [BranchItem,setBranchItem]=useState('');
const [DepartmentId,setDepartment]=useState(id);


const ListBranch = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}branch?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
}

const SingleBranchRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}department/${id}`);
const dataxs = await response.json();
console.log(dataxs);
setSingleCompanyresult(await dataxs.data);

setDepartmentName(dataxs.data.department_name);
setBranchItem(dataxs.data.branch_id);
setDepartment(id);

}

var countBranch = result.length;



const AddDepartmentFormData = (e) =>{
e.preventDefault();

const FeildData = { department_name:DepartmentName,branch_id:BranchItem }

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}department`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/department");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}


const UpdateDepartmentFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { department_name:DepartmentName,branch_id:BranchItem}
  
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}department/${DepartmentId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/department");
             
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
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Departments') : ('Update Departments')}</h2>
</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<div className="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddDepartmentFormData : UpdateDepartmentFormData}>
<div className="row">

</div>

<div className="row">
<div className="form-group col-md-4">
<label for="inputPassword4">Department Name*</label>
<input type="text" className="form-control" name="department_name" placeholder="Name" required="" autocomplete="off" onChange={e=>setDepartmentName(e.target.value)} value={DepartmentName} />
</div>
<div className="form-group col-md-4">
<label for="inputCity">Branch*</label>
<select name="branch_id" className="form-control" required="" onChange={e=>setBranchItem(e.target.value)} value={BranchItem}>
<option selected="" value="">Select Branch</option>
{

countBranch > 0 ? (

  result.map((curElem) => {

return (
<option value={curElem.id}>{curElem.branch_name}</option>
)

})
): (
<>
<option><b>Loading....</b></option>
</>
)


}
</select>
</div>

</div>


{/* <div className="row">
<div className="form-group col-md-4">
<label for="inputCity">Fax*</label>
<input type="text" className="form-control" name="company_fax" placeholder="Fax" required="" autocomplete="off" />
</div>
</div> */}


<hr />

<button type="submit" className="btn btn-primary">Save</button>
</form>

</div>
</section>
</div>
</div>

</div>

    </>
  )
}

export default AddDepartments