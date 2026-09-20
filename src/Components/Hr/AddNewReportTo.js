import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddNewReportTo = () => {

    const navigate = useNavigate();

let { id } = useParams();

const [resultDepart,setresultDepart]= useState([]);
const [ResultDesignation,setResultDesignation]= useState([]);

const ListDepartment = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setresultDepart(await GetArray);
  }
 


useEffect(() => {
    SingleDesignationRecords();
},[]);

const [SingleDesignresult,setSingleDesignresult]= useState([]);


const [DepartmentName,setDepartmentName]= useState('');
const [DesignationName,setDesignationName]= useState('');
const [ReportToName,setReportToName]= useState('');

const [ReportId,setReportId]=useState(id);

const SingleDesignationRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}designation/${id}`);
const dataxs = await response.json();
console.log(dataxs);
setSingleDesignresult(await dataxs.data);

setDesignationName(dataxs.data.designation_name);
setDepartmentName(dataxs.data.department_name);
setReportId(id);

}

const ListDesignation = async (DepartmentName) => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}designation?agentId=1&departmentId=${DepartmentName}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResultDesignation(await GetArray);
    }

  useEffect(() => {
    ListDepartment();
    ListDesignation(DepartmentName);
},[DepartmentName == '' || DepartmentName == null ? '' : DepartmentName]);

const AddReportFormData = (e) =>{
e.preventDefault();

const FeildData = { DepartmentName:DepartmentName,DesignationName:DesignationName,ReportToName:ReportToName}

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}reportto`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/report-to");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}


const UpdateReportFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { DepartmentName:DepartmentName,DesignationName:DesignationName,ReportToName:ReportToName}
  
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}reportto/${ReportId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/report-to");
             
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
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Report To') : ('Update Report To')}</h2>
</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<div className="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddReportFormData : UpdateReportFormData}>
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
<select name="DepartmentName" id="" className="form-control" onChange={e=>setDesignationName(e.target.value)} value={DesignationName} required>
  <option value="">Select Option</option>
  
  {
DepartmentName == '' ? (
    <></>
):(
    ResultDesignation.length > 0 ? (

        ResultDesignation.map((curElem) => {
    
            return (
            <option value={curElem.id}>{curElem.designation_name}</option>
            )
    
            })
            ): (
            <>
            <option><b>No Data Found</b></option>
            </>
            )
    
)


        }
</select>
</div>
<div className="form-group col-md-4">
<label for="inputPassword4">Report To Name*</label>
<input type="text" className="form-control" name="ReportToName" placeholder="Name" required="" autocomplete="off" onChange={e=>setReportToName(e.target.value)} value={ReportToName} />
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

export default AddNewReportTo