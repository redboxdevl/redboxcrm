import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import Swal from 'sweetalert2'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';

const AddNewTraining = () => {

  const navigate = useNavigate();
  let { id } = useParams();


  
  const [SingleTrainingresult,setSingleTrainingresult]= useState([]);
  const [TrainingTypeId,setTrainingTypeId]=useState('');
  const [TrainingName,setTrainingName]=useState('');
  const [TrainingDesc,setTrainingDesc]=useState('');
  const [TrainingTitle,setTrainingTitle]=useState('');
  const [TrainingStartDate,setTrainingStartDate]=useState('');
  const [TrainingExpireDate,setTrainingExpireDate]=useState('');
  const [DeptID,setDeptID]=useState('');
  const [TrainingId,setTrainingId]=useState(id);
  const [Starttime,setStarttime]=useState('');
  const [Expiretime,setExpiretime]=useState('');
  

  function convertDatePickerTimeToMySQLTime(str) {
    var month, day, year, hours, minutes, seconds;
    var date = new Date(str),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    return [mySQLDate, mySQLTime].join(" ");
}

  const onApply = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
    const newData = dateData.split(" ");
    setTrainingStartDate(newData[0]);
    setStarttime(newData[1]);
    
  };

  const onApplyExpiry = (event, picker) => {
    const dateData = convertDatePickerTimeToMySQLTime(picker._d);
    const newData = dateData.split(" ");
    setTrainingExpireDate(newData[0]);
    setExpiretime(newData[1]);
  };

const locale = {
  format: 'YYYY-MM-DD HH:mm:ss',
};

  const [Depresult,setDepResult]= useState([]);
  const [TrainingTResult,setTrainingTResult]= useState([]);

  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepResult(await GetArray);
    }

    const ListTrainingType = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}trainingtype?agentId=1`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setTrainingTResult(await GetArray);
      }

      const SingleTrainingRecords = async () => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}training/${id}`);
        const dataxs = await response.json();
        setSingleTrainingresult(await dataxs.data);
        
        setTrainingTypeId(dataxs.data.training_type_id);
        setTrainingName(dataxs.data.trainee_name);
        setTrainingDesc(dataxs.data.description);
        setTrainingTitle(dataxs.data.training_title);
        setTrainingStartDate(dataxs.data.from_date);
        setTrainingExpireDate(dataxs.data.to_date);
        setStarttime(dataxs.data.start_time);
        setExpiretime(dataxs.data.end_time);
        setDeptID(dataxs.data.department_id);

        setTrainingId(id);
        
    }


    useEffect(() => {
      ListDepartment();
      ListTrainingType();
      SingleTrainingRecords();
  },[]);
  


  const AddTrainingFormData = (e) =>{
    e.preventDefault();
    
    const FeildData = { emp_id:'1',trainee_name:TrainingName,department_id:DeptID,training_type_id:TrainingTypeId,training_title:TrainingTitle,description:TrainingDesc,from_date:TrainingStartDate,to_date:TrainingExpireDate,start_time:Starttime,end_time:Expiretime,status:'active' }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FeildData)
    };
    
    fetch(`${actionConfig.REACT_APP_URL}training`, requestOptions)
        .then(response => response.json())
        .then(dataex => {
            console.log(dataex);
            if(dataex.message == 'Data saved successfully!'){
              Swal.fire(
                'Good job!',
                dataex.message,
                'success'
              );
              navigate("/training");
               
            }else{
              Swal.fire(
                'Error!',
                dataex.message,
                'error'
              );
            }

        });
      
    
  }
    
    
    const UpdateTrainingFormData = (e) =>{
      e.preventDefault();

      
      const FeildData = { emp_id:'1',trainee_name:TrainingName,department_id:DeptID,training_type_id:TrainingTypeId,training_title:TrainingTitle,description:TrainingDesc,from_date:TrainingStartDate,to_date:TrainingExpireDate,start_time:Starttime,end_time:Expiretime,status:'active' }
    
      const requestOptions = {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(FeildData)
      };
      
      fetch(`${actionConfig.REACT_APP_URL}training/${TrainingId}`, requestOptions)
          .then(response => response.json())
          .then(dataex => {
              console.log(dataex);
              if(dataex.message == 'Data updated successfully!'){
                Swal.fire(
                  'Good job!',
                  dataex.message,
                  'success'
                );
                navigate("/training");
                 
              }else{
                Swal.fire(
                  'Error!',
                  dataex.message,
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
<h2 className="hk-pg-title font-weight-600">Training</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-training" className="btn btn-primary btn-rounded btn-sm">Add New Training</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">
        <form onSubmit={id == null ? AddTrainingFormData : UpdateTrainingFormData}>
<div class="row">


<div class="form-group col-md-4
">
<div class="form-group">
<label for="inputAddress">Training Type*</label>
<select class="form-control" name="trainingType" required="" onChange={e=>setTrainingTypeId(e.target.value)} value={TrainingTypeId}>
<option value="" selected="">Select Training Type</option>
{

TrainingTResult.length > 0 ? (

  TrainingTResult.map((curElem) => {

return (
  <option value={curElem.id}>{curElem.training_type_name}</option>

)

})
): (
<>
<option>No Record Found</option>
</>
)


}

</select>

</div>
</div>
<div class="form-group col-md-4">
<label for="inputPassword4">Training Title</label>
<input type="text" class="form-control" name="training_title" placeholder="Enter Title" required="" autocomplete="off" onChange={e=>setTrainingTitle(e.target.value)} value={TrainingTitle}/>
</div>
<div class="form-group col-md-4">
<label for="inputPassword4">Training Name</label>
<input type="text" class="form-control" name="training_name" placeholder="Enter Title" required="" autocomplete="off" onChange={e=>setTrainingName(e.target.value)} value={TrainingName}/>
</div>


<div class="form-group col-md-12">
<label for="inputPassword4">Training Description</label>
<textarea class="form-control" rows="3" placeholder="Enter Training Description" onChange={e=>setTrainingDesc(e.target.value)} value={TrainingDesc}></textarea>
</div>

</div>

<div class="row">


<div class="form-group col-md-4">
<label for="inputPassword4">Start Date</label>
{/* <input type="date" class="form-control" name="birth_date" required="" autocomplete="off" onChange={e=>setTrainingStartDate(e.target.value)} value={TrainingStartDate}/> */}
<DateRangePicker
initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale ,opens: 'center',drops:'up' }}
onCallback={onApply}
>
  <input class="form-control" type="text" value={TrainingStartDate+' '+Starttime} />
</DateRangePicker>

</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Expirey Date</label>
{/* <input type="date" class="form-control" name="user_nic" placeholder="CNIC Number" required="" autocomplete="off" onChange={e=>setTrainingExpireDate(e.target.value)} value={TrainingExpireDate}/> */}

<DateRangePicker
initialSettings={{ singleDatePicker:true , timePicker:true , timePicker24Hour:true , locale ,opens: 'center',drops:'up' }}
onCallback={onApplyExpiry}
>
  <input class="form-control" type="text" value={TrainingExpireDate+' '+Expiretime}/>
</DateRangePicker>

</div>
</div>

<div class="form-group col-md-4
">
<div class="form-group">
<label for="inputAddress">Assing Department*</label>
<select class="form-control" name="emp_dept_name" required="" onChange={e=>setDeptID(e.target.value)} value={DeptID}>
<option value="" selected="">Select Department</option>
{

Depresult.length > 0 ? (

  Depresult.map((curElem) => {

return (
  <option value={curElem.id}>{curElem.department_name}</option>

)

})
): (
<>
<option>No Record Found</option>
</>
)


}

</select>

</div>
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

export default AddNewTraining