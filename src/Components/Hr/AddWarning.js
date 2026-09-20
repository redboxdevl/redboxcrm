import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';


const AddWarning = () => {

  const navigate = useNavigate();

  let { id } = useParams();
  
  useEffect(() => {
    SingleWarningRecords();
      ListBranch();
      ListEmployee();
  },[]);
  
  const [result,setResult]= useState([]);
  const [EmpResult,setEmpResult]= useState([]);
  const [SingleCompanyresult,setSingleCompanyresult]= useState([]);
  
  const [DepartmentName,setDepartmentName]= useState('');
  const [BranchItem,setBranchItem]=useState('');
  const [WarningId,setWarningId]=useState(id);

  const [Description,setDescription]=useState('');
  const [WarningBy,setWarningBy]=useState('');
  const [WarningDate,setWarningDate]=useState('');
  const [SubjectDate,setSubjectDate]=useState('');
  const [WarningType,setWarningType]=useState('');
  const [EmployeeItem,setEmployeeItem]=useState('');
  
  
  const ListBranch = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}branch?agentId=1`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setResult(await GetArray);
  }

  const ListEmployee = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employee?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setEmpResult(await GetArray);
    }
  
  const SingleWarningRecords = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}warning/${id}`);
  const dataxs = await response.json();
  console.log(dataxs);
  setSingleCompanyresult(await dataxs.data);
  
  setDepartmentName(dataxs.data.department_name);
  setWarningBy(dataxs.data.warning_by);
  setEmployeeItem(dataxs.data.emp_id);
  setWarningDate(dataxs.data.warning_date);
  setWarningType(dataxs.data.type);
  setSubjectDate(dataxs.data.subject);
  setDescription(dataxs.data.description);
  
  setWarningId(id);
  
  }
  
  var countBranch = result.length;
  
  
  
  const AddWarningFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { emp_id:EmployeeItem,subject:SubjectDate,type:WarningType,description:Description,warning_date:WarningDate,warning_by:WarningBy}
  
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}warning`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
          
          if(dataex.message == 'Data saved successfully!'){
            Swal.fire(
              'Good job!',
              dataex.message,
              'success'
            );
            navigate("/warning");
             
          }else{
            Swal.fire(
              'Error!',
              dataex.message,
              'error'
            );
          }
  
  
      });
  
  }
  
  
  const UpdateWarningFormData = (e) =>{
    e.preventDefault();
    
    const FeildData = { emp_id:EmployeeItem,subject:SubjectDate,type:WarningType,description:Description,warning_date:WarningDate,warning_by:WarningBy}
    
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FeildData)
    };
    
    fetch(`${actionConfig.REACT_APP_URL}warning/${WarningId}`, requestOptions)
        .then(response => response.json())
        .then(dataexe => {
            if(dataexe.message == 'Data updated successfully!'){
              Swal.fire(
                'Good job!',
                dataexe.message,
                'success'
              );
              navigate("/warning");
               
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
<h2 className="hk-pg-title font-weight-600">Warning</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-warning" className="btn btn-primary btn-rounded btn-sm">Add New Warning</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">
        <form onSubmit={id == null ? AddWarningFormData : UpdateWarningFormData}>
<div class="row">
<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Employee</label>
<select class="form-control" name="emp_dept_name" required="" onChange={e=>setEmployeeItem(e.target.value)} value={EmployeeItem}>
<option value="" selected="">Select Emp</option>
{

EmpResult.length > 0 ? (
EmpResult.map((curElem) => {
return (
<option value={curElem.id} >{curElem.emp_name}</option>
)
})
): (
<>
<option value="" >No Record Found</option>
</>
)


}


</select>
</div>
</div>
<div class="form-group col-md-6">
<label for="inputPassword4">Warning Type</label>
<input type="text" class="form-control" name="birth_date" required="" autocomplete="off" onChange={e=>setWarningType(e.target.value)} value={WarningType}/>
</div>



<div class="form-group col-md-6">
<label for="inputPassword4">Subject</label>
<input type="text" class="form-control" name="birth_date" required="" autocomplete="off" onChange={e=>setSubjectDate(e.target.value)} value={SubjectDate}/>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Warning Date</label>
<input type="date" class="form-control" name="user_nic" placeholder="CNIC Number" required="" autocomplete="off" onChange={e=>setWarningDate(e.target.value)} value={WarningDate}/>
</div>
</div>

<div class="form-group col-md-12
">
<div class="form-group">
<label for="inputAddress">Warning By*</label>
<select class="form-control" name="emp_dept_name" required="" onChange={e=>setWarningBy(e.target.value)} value={WarningBy}>
<option value="" selected>Select Warning By</option>
{

EmpResult.length > 0 ? (
EmpResult.map((curElem) => {
return (
<option value={curElem.id} >{curElem.emp_name}</option>
)
})
): (
<>
<option value="" >No Record Found</option>
</>
)


}
</select>
</div>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">Description</label>
<textarea class="form-control" rows="5" placeholder="Enter Description" onChange={e=>setDescription(e.target.value)} value={Description}></textarea>
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

export default AddWarning