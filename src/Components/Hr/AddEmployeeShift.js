import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddEmployeeShift = () => {

    const navigate = useNavigate();

let { id } = useParams();

useEffect(() => {
    SingleShiftRecords();
},[]);

const [SingleCompanyresult,setSingleCompanyresult]= useState([]);

const [ShiftName,setShiftName]= useState('');
const [ShiftIn,setShiftIn]=useState('');
const [ShiftOut,setShiftOut]=useState('');
const [ShiftId,setDepartment]=useState(id);

const SingleShiftRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}employeeshift/${id}`);
const dataxs = await response.json();
console.log(dataxs);
setSingleCompanyresult(await dataxs.data);

setShiftName(dataxs.data.shift_name);
setShiftIn(dataxs.data.shift_in);
setShiftOut(dataxs.data.shift_out);
setDepartment(id);

}


const AddShiftFormData = (e) =>{
e.preventDefault();

const FeildData = { shift_name:ShiftName,shift_in:ShiftIn,shift_out:ShiftOut }

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}employeeshift`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/employee-shift");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}


const UpdateShiftFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { shift_name:ShiftName,shift_in:ShiftIn,shift_out:ShiftOut,shift_id:ShiftId }
  
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}employeeshift/${ShiftId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/employee-shift");
             
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
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Shift') : ('Update Shift')}</h2>
</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<div className="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddShiftFormData : UpdateShiftFormData}>
<div className="row">

</div>

<div className="row">
<div className="form-group col-md-4">
<label for="inputPassword4">Shift Name*</label>
<input type="text" className="form-control" name="department_name" placeholder="Name" required autocomplete="off" onChange={e=>setShiftName(e.target.value)} value={ShiftName} />
</div>

<div className="form-group col-md-4">
<label for="inputPassword4">Shift In*</label>
<input type="time" className="form-control" name="shiftIn" placeholder="Shift In" required autocomplete="off" onChange={e=>setShiftIn(e.target.value)} value={ShiftIn} />
</div>

<div className="form-group col-md-4">
<label for="inputPassword4">Shift Out*</label>
<input type="time" className="form-control" name="shiftOut" placeholder="Shift Out" required autocomplete="off" onChange={e=>setShiftOut(e.target.value)} value={ShiftOut} />
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

export default AddEmployeeShift