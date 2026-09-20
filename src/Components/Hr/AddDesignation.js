import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddDesignation = () => {

    const navigate = useNavigate();

let { id } = useParams();

const [resultDepart,setresultDepart]= useState([]);

const ListDepartment = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setresultDepart(await GetArray);
  }


  useEffect(() => {
    ListDepartment();
    ListDepartment();
},[]);


useEffect(() => {
    SingleDesignationRecords();
},[]);

const [SingleDesignresult,setSingleDesignresult]= useState([]);

const [DesignationName,setDesignationName]= useState('');
const [DepartmentName,setDepartmentName]= useState('');

const [DesignationId,setDesignation]=useState(id);

const SingleDesignationRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}designation/${id}`);
const dataxs = await response.json();
console.log(dataxs);
setSingleDesignresult(await dataxs.data);

setDesignationName(dataxs.data.designation_name);
setDepartmentName(dataxs.data.department_name);
setDesignation(id);

}


const AddDesignationFormData = (e) =>{
e.preventDefault();

const FeildData = { designation_name:DesignationName,department_name:DepartmentName}

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}designation`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/designation");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}


const UpdateDesignationFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { designation_name:DesignationName,department_name:DepartmentName}
  
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}designation/${DesignationId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/designation");
             
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
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Designation') : ('Update Designation')}</h2>
</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<div className="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddDesignationFormData : UpdateDesignationFormData}>
<div className="row">

</div>

<div className="row">
<div className="form-group col-md-4">
<label for="inputPassword4">Department Name*</label>
<select name="DepartmentName" id="" className="form-control" onChange={e=>setDepartmentName(e.target.value)} value={DepartmentName} required>
  <option value="">Select Option</option>
  {

resultDepart.length > 0 ? (

  resultDepart.map((curElem) => {

        return (
        <option value={curElem.id}>{curElem.department_name}</option>
        )

        })
        ): (
        <>
        <option><b>No Data Found</b></option>
        </>
        )


        }
</select>
</div>
<div className="form-group col-md-4">
<label for="inputPassword4">Designation Name*</label>
<input type="text" className="form-control" name="designation_name" placeholder="Name" required="" autocomplete="off" onChange={e=>setDesignationName(e.target.value)} value={DesignationName} />
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

export default AddDesignation