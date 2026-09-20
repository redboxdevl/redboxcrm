import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddNotice = () => {

  
  useEffect(() => {
    ListEmployee();
    SingleNoticeRecords();
},[]);

  const navigate = useNavigate();

  let { id } = useParams();

  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const dispatch = useDispatch();

  const [SingleNoticeresult,setSingleNoticeresult]= useState([]);
  const [Empresult,setEmpResult]= useState([]);
  

  const ListEmployee = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employee?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setEmpResult(await GetArray);
  }
  

  const [EmpID,setEmpID]= useState('');
  const [NoticeTitle,setNoticeTitle]= useState('');
  const [NoticeDesc,setNoticeDesc]= useState('');
  // const [NoticeAttachment,setNoticeAttachment]= useState('');
  const [PublishDate,setPublishDate]= useState('');
  const [NoticeId,setNoticeId]= useState('');

  
  const SingleNoticeRecords = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}noticeboard/${id}`);
    const dataxs = await response.json();
    console.log(dataxs);
    setSingleNoticeresult(await dataxs.data);
    
    // setEmpID(dataxs.data.emp_id);
    // setNoticeTitle(dataxs.data.notice_title);
    setNoticeDesc(dataxs.data.description);
    // setPublishDate(dataxs.data.published_date);
    setNoticeId(dataxs.data.id);
    
    }


  const AddNoticeFormData = (e) =>{
    e.preventDefault();

    const FeildData = { description:NoticeDesc,status:'active'}
  
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}noticeboard`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
          
          if(dataex.message == 'Data saved successfully!'){
            Swal.fire(
              'Good job!',
              dataex.message,
              'success'
            );
            navigate("/notice");
             
          }else{
            Swal.fire(
              'Error!',
              dataex.message,
              'error'
            );
          }
  
  
      });

  }

  const UpdateNoticeFormData = (e) =>{
    e.preventDefault();
    
    const FeildData = { description:NoticeDesc,status:'active'}
    
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(FeildData)
    };
    
    fetch(`${actionConfig.REACT_APP_URL}noticeboard/${id}`, requestOptions)
        .then(response => response.json())
        .then(dataexe => {
            if(dataexe.message == 'Data updated successfully!'){
              Swal.fire(
                'Good job!',
                dataexe.message,
                'success'
              );
              navigate("/notice");
               
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
<h2 className="hk-pg-title font-weight-600">Notice</h2>

</div>
<div class="d-flex">
<NavLink to="/notice" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
    <div className="col-md-12">
        <section className="hk-sec-wrapper">

        <form onSubmit={id == null ? AddNoticeFormData : UpdateNoticeFormData}>
<div class="row">


{/* <div class="form-group col-md-4">
<label for="inputPassword4">Employee</label>
<select name="emp_id" id="" className="form-control" onChange={e=>setEmpID(e.target.value)} value={EmpID}>
  <option value="">Select Employee</option> 
  <option value="0">All Employees</option>
    {

result.empall.length > 0 ? (
  result.empall.map((curElem,index) => {
return (
  <option value={curElem.id}>{curElem.emp_name}</option>
)

})
): (
<>
<option>No Record Found....</option>
</>
)

}
  
</select>
</div> */}

{/* <div class="form-group col-md-4">
<label for="inputPassword4">Title</label>
<input type="text" class="form-control" name="notice_title" placeholder="Enter Title" required="" autocomplete="off" onChange={e=>setNoticeTitle(e.target.value)} value={NoticeTitle}/>
</div> */}
{/* <div class="form-group col-md-4">
<label for="inputPassword4">Publish Date</label>
<input type="date" class="form-control" name="published_date" placeholder="Enter Title" required="" autocomplete="off" onChange={e=>setPublishDate(e.target.value)} value={PublishDate}/>
</div> */}
<div class="form-group col-md-12">
<label for="inputPassword4">Description</label>
<textarea name="description" class="form-control" rows="3" placeholder="Enter Description" onChange={e=>setNoticeDesc(e.target.value)} value={NoticeDesc}></textarea>
</div>

</div>

<div class="row">

{/* <div class="form-group col-md-4">
<label for="inputPassword4">Publish Date</label>
<input type="date" class="form-control" name="birth_date" required="" autocomplete="off" />
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Expirey Date</label>
<input type="date" class="form-control" name="user_nic" placeholder="CNIC Number" required="" autocomplete="off" />
</div>
</div> */}



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

export default AddNotice