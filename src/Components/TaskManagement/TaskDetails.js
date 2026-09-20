import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { SingleEmpAction } from '../../redux/action/SingleEmpAction';
import { ListformAction } from '../../redux/action/ListformAction';
import moment from 'moment';

const TaskDetails = () => {

let { id } = useParams();
const navigate = useNavigate();

const AuthDatas = JSON.parse(localStorage.getItem('authdata'));

const [result,setResult]= useState([]);

const ListEmployee = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}employee`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setResult(await GetArray);
}

const ListData = useSelector(state => state.Listformreducer.listformdata);

const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
const dispatch = useDispatch();
const [checked, setChecked] = useState([]);
const [CheckedPjl, setCheckedPjl] = useState([]);

const [CommentData,setCommentData]=useState('');
const [TaskAssignTo,setTaskAssignTo]=useState('');
const [TaskStatus,setTaskStatus]=useState('');
const [TaskStTaskChecListatus,setTaskChecList]=useState('');
const [TaskChecListEd,setTaskChecListEd]=useState('');
const [TaskStartStatus,setTaskStartStatus]=useState('');

const [SingleTaskresult,setSingleTaskresult]= useState([]);

useEffect(() => {
const AuthData = JSON.parse(localStorage.getItem('authdata'));
dispatch(ListformAction(AuthData.id));
ListEmployee();
setTaskChecList(checked);
// onCheckUpdateData(CheckedPjl.join(","));
},[]);

useEffect(() => {
SingleTaskRecords();
},[]);

const SingleTaskRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}task/${id}`);
const dataxs = await response.json();
setSingleTaskresult(await dataxs.data[0]);

setTaskStartStatus(dataxs.data[0].taskStatusId);

}

// const onCheckUpdateData = (chekcckItm) => {
//   const FeildData = { task_id_pk:id,checklist_item:chekcckItm}
//   const requestOptions = {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(FeildData)
//     };
    
//     fetch(`${actionConfig.REACT_APP_URL}taskchecklist/${id}`, requestOptions)
//     .then(response => response.json())
//     .then(dataex => {

//     if(dataex.code == '200'){
//     Swal.fire(
//     'Good job!',
//     dataex.message,
//     'success'
//     );
//     navigate(`/task/${id}`);

//     }else{
//     Swal.fire(
//     'Error!',
//     dataex.message,
//     'error'
//     );
//     }


//     });

//         console.log(requestOptions);
// }

const handleInputChange = (e) => {
const {value,checked} = e.target;

console.log(`${value} is ${checked}`);
if(checked){
setCheckedPjl([...CheckedPjl,value]);
}else{
setCheckedPjl(CheckedPjl.filter((e) => e !== value));
}

}

const SendCommment = () => {

const FeildData = { task_id_pk:id,emp_id:AuthDatas.id,comment:CommentData}
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}taskcomment`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.message == 'Data saved successfully!'){
Swal.fire(
'Good job!',
dataex.message,
'success'
);
navigate(`/task/${id}`);

setCommentData('');

}else{
Swal.fire(
'Error!',
dataex.message,
'error'
);
}


});

}

var countEmployee = result.length;


const AssignChange = (e) => {

  const FeildData = { task_id_pk:id,assigned_by:AuthDatas.id,assigned_to:e.target.value}
  const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(FeildData)
  };

  fetch(`${actionConfig.REACT_APP_URL}taskassigned`, requestOptions)
  .then(response => response.json())
  .then(dataex => {

  if(dataex.code == '200'){
  Swal.fire(
  'Good job!',
  dataex.message,
  'success'
  );
  navigate(`/task/${id}`);

  }else{
  Swal.fire(
  'Error!',
  dataex.message,
  'error'
  );
  }


  });


}

const StatusStartChange = (e) => {

  let statusId = e.target.value;

  const FeildData = { task_id_pk:id,status:statusId}
  const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(FeildData)
  };

  fetch(`${actionConfig.REACT_APP_URL}taskchangeLog`, requestOptions)
  .then(response => response.json())
  .then(dataex => {

    console.log("dataex",dataex);
    if(dataex.code == '200'){
    Swal.fire(
    'Good job!',
    dataex.message,
    'success'
    );
    // navigate(`/task/${id}`);
    navigate(`/task-management`);

    }else{
    Swal.fire(
    'Error!',
    dataex.message,
    'error'
    );
    }


  });


}

// const StatusChange = (e) => {
  
//   alert(e.target.value);
//   // setTaskStatus(e.target.value);

//   // const FeildData = { task_id_pk:id,status_changed_by:AuthDatas.id,status:e.target.value}
//   // const requestOptions = {
//   // method: 'PATCH',
//   // headers: { 'Content-Type': 'application/json' },
//   // body: JSON.stringify(FeildData)
//   // };

//   // fetch(`${actionConfig.REACT_APP_URL}taskhistory/${id}`, requestOptions)
//   // .then(response => response.json())
//   // .then(dataex => {

//   // if(dataex.code == '200'){
//   // Swal.fire(
//   // 'Good job!',
//   // dataex.message,
//   // 'success'
//   // );
//   // navigate(`/task/${id}`);

//   // }else{
//   // Swal.fire(
//   // 'Error!',
//   // dataex.message,
//   // 'error'
//   // );
//   // }


//   // });

// }

const targetTime = moment(SingleTaskresult.dueDate);

const [currentTime, setCurrentTime] = useState(moment());
const timeBetween = moment.duration(targetTime.diff(currentTime));

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentTime(moment());
  }, 1000);

  return () => clearInterval(interval);
}, []);

const TaskUpdateChecklist = () => {
  console.log("CheckedPjl",CheckedPjl);

  const FeildData = { task_id_pk:id,checklist_item:CheckedPjl}
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
    };
  
    fetch(`${actionConfig.REACT_APP_URL}taskchecklistlog`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
      console.log("dataex",dataex);
    if(dataex.code == '200'){
    Swal.fire(
    'Good job!',
    dataex.message,
    'success'
    );
    navigate(`/task/${id}`);

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
<h2 className="hk-pg-title font-weight-600">TASK-{SingleTaskresult.task_id}</h2>
<p className="counter">
  
        {/* <span>{timeBetween.years()} Year </span>
        <span>{timeBetween.months()} Month </span>
        <span>{timeBetween.days()} Days </span> */}
        <span> </span>
        {/* <span>{timeBetween.minutes()} Minutes </span>
        <span>{timeBetween.seconds()} Second </span> */}
      </p>
</div>

</div>

<OtherNavigation/>

<div class="row">
<div class="col-xl-12">
<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<form>

<div className="row">
  <div className="col-md-4">
  <h5>{SingleTaskresult.task_title}</h5>
  </div>
  <div className="col-md-2">
  <h5>Priority: <span class="badge badge-danger">{SingleTaskresult.PriorityData == null ? '' : SingleTaskresult.PriorityData.priorityTitle}</span></h5>
  </div>
  <div className="col-md-2">
  <h5>{SingleTaskresult.AssignByEmp == null ? '' : SingleTaskresult.AssignByEmp.emp_name}</h5>
  </div>
  <div className="col-md-2">
    {
      SingleTaskresult.taskStatusId == 0 ? 'Not Started Task' : <h4>{SingleTaskresult == null ? '' : timeBetween.hours() } Hours Left</h4>
    }
  
  </div>
  <div className="col-md-2">
    <div className="form-group">
  <select name="TaskStatys" id="" className="form-control" onChange={StatusStartChange} value={TaskStartStatus}>
    <option value="">Select Status</option>
     <option value="0">Pending</option>
    <option value="1">Open</option>
    <option value="2">On Going</option>
   <option value="3">Complete</option>
  </select>
</div>
  </div>
</div>

<div className="row pt-3">
  <div className="col-md-6">
<div class="form-group">
<label for="address">Check List</label>
{
SingleTaskresult.getcheckList == null ? (
<></>
):(
SingleTaskresult.getcheckList.map((data,Index)=>{
return (
<div class="col-md-4 mt-15">

<div class="form-check">
<label class="form-check-label">
  {
    data.status == 1 ? <><input type="checkbox" class="form-check-input" disabled /> <strike>{data.checklist_item}</strike></> : <><input type="checkbox" class="form-check-input" value={data.id} id={data.checklist_item} onChange={(e) => handleInputChange(e)} /> {data.checklist_item}</>
  }

</label>
</div>
</div>
)
})
)
}
</div>


  </div>
  <div className="col-md-6">
  <div class="form-group">
<label for="email">Descripation</label>
<p>{SingleTaskresult.description}</p>
</div>
{
  SingleTaskresult.attachement == null ? (
    <></>
  ):(
<div class="form-group">
<label for="input_tags">Attachement</label>
<div class="row">
<div class="col-sm-6 col-md-2 mt-15">
<img src={SingleTaskresult.attachement == null ? '../../../FrontAsset/dist/img/img-thumb.jpg' : `${actionConfig.REACT_APP_MAIN}${SingleTaskresult.attachement}` } alt="user" class="avatar-img w-150p mr-10" />
</div>
</div>
</div>
  )
}

  </div>

</div>

{/* <button class="btn btn-primary" type='submit'>Update</button> */}


</form>
</div>
</div>
</section>
</div>
</div>

{
  SingleTaskresult.taskStatus == 'Pending' ? (
    <></>
  ):(
<div className="row">

<div class="col-lg-12">
<div class="card">
{/* <div class="col-md-4 mb-10 mt-3">
<div className="form-group">
<label for="country">Status</label> 
<select class="form-control custom-select d-block w-100 Status" id="Status" onChange={StatusChange} value={TaskStatus}>
<option value="">Choose...</option>
{
resultlistdashboard.TaskStatus == '' ? (
<></>
):(
resultlistdashboard.TaskStatus.map((item,key)=>{
return (
<option value={item.id}>{item.statusTitle}</option>
)
})
)
}
</select>
</div>
</div> */}
<div class="card-header card-header-action">
<h6>Comments</h6>
</div>
<div class="card-body">
<div class="user-activity user-activity-sm">
  {
    SingleTaskresult == '' ? (
      <></>
    ):(
      SingleTaskresult.gettaskComment.map((comData,index)=>{
        return (
          <div class="media">
              <div class="media-img-wrap">
                  <div class="avatar avatar-xs">
                      {/* <img src={comData.empdata.profile_pic == null ? '../FrontAsset/dist/img/avatar6.jpg' : `${actionConfig.REACT_APP_MAIN}${comData.empdata.profile_pic}` } alt="user" class="avatar-img rounded-circle" /> */}
                  </div>
              </div>
              <div class="media-body">
                  <div>
                      <span class="d-block mb-5"><span class="font-weight-500 text-dark text-capitalize"></span><span class="pl-5">{comData.comment}</span></span>
                      <span class="d-block font-13">{comData.comment_date_time}</span>
                  </div>
              </div>
          </div>
        )
      })
    )
  }



</div>
<div class="form-group">
<label for="email">Comments</label>
<textarea class="form-control mt-15" rows="5" placeholder="Textarea" onChange={e=>setCommentData(e.target.value)} value={CommentData}></textarea>
</div>
<div class="d-flex">
<button class="btn btn-primary btn-sm" type='button' onClick={SendCommment}> Send</button>
</div>
</div>
</div>
</div>
</div>
  )
}

{ SingleTaskresult.taskStatusId == 0 ? '' : <button class="btn btn-primary" type='button' onClick={TaskUpdateChecklist}>Update</button>}

{/* <div className="row">
<div className="col-md-6">
<p>Task Id: {SingleTaskresult.task_id}</p>
<p className='pt-2 pb-2'>Task Title: {SingleTaskresult.task_title}</p>
<p>Task Description: {SingleTaskresult.description}</p>

<h3 className='pt-4 pb-2'>Check List</h3>
<ul>
{
SingleTaskresult.checklist == null ? (
<></>
):(
SingleTaskresult.checklist.map((data,Index)=>{
return (
<li style={{border:'1px solid #333',borderRadius:20, padding:5, marginBottom:10,}}>{data.checklist_item}</li>
)
})
)
}

</ul>

<h3 className='pt-4 pb-2'>Attachement</h3>
<p>{SingleTaskresult.attachement}</p>
<p>{SingleTaskresult.attachement_date_time}</p>

</div>
<div className="col-md-4 offset-md-2">
<div className="form-group">
<label htmlFor="">Status</label>
<select name="status" id="" className="form-control">
<option value='Todo' selected>Todo</option>
<option value='In progress'>In progress</option>
<option value='completed'>completed</option>
</select>
</div>
<p>Assign By: {SingleTaskresult.taskhistory == null ? '' : SingleTaskresult.taskhistory.assigned_by}</p>
<p>Assign To: {SingleTaskresult.taskhistory == null ? '' : SingleTaskresult.taskhistory.assigned_to}</p>
<p>Comments: {SingleTaskresult.comment}</p>
<p>Comments Date: {SingleTaskresult.comment_date_time}</p>
<p>Priority: {SingleTaskresult.taskhistory == null ? '' : SingleTaskresult.taskhistory.priority}</p>
<p>Due Date: {SingleTaskresult.taskhistory == null ? '' : SingleTaskresult.taskhistory.due_date}</p>

<button className='btn btn-sm btn-primary' type='button'>Task Start</button>
<button className='btn btn-sm btn-warning' disabled type='button'>Task End</button>
</div>
</div> */}



</div>
</>
)
}

export default TaskDetails