import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Select from 'react-select'
import Swal from 'sweetalert2'
import QuickNav from '../../../Includes/QuickNav'
import OtherNavigation from '../../../Includes/OtherNavigation'
import { NavLink , useNavigate } from 'react-router-dom';
import { VideoRequestAction } from '../../../redux/action/VideoRequestAction';
import Moment from 'react-moment';


const ViewVideoRequest = () => {
  
  const navigate = useNavigate();

  const resultVideoreq = useSelector(state => state.Videorequestreducer.videoreqdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3);

  const dispatch = useDispatch();

  useEffect(() => {
    
    const interval = setInterval(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      if(SuperCon.length == 0){
        dispatch(VideoRequestAction(AuthData.id,1,12));
      }else{
        dispatch(VideoRequestAction('all',1,12));
      }
      
    }, 3000);
      return () => clearInterval(interval);
  },[]);

  const VideoRequestAct = (id) => {
    navigate(`/view-video-request/${id}`);
  }

  // console.log(resultVideoreq);

  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
    <div>
    <h2 className="hk-pg-title font-weight-600">Video Request Form Dashboard</h2>
    </div>
    <div>
    <NavLink className="btn btn-primary" to="/video-request-form"><span>Add Video Request Form</span></NavLink>
    </div>

    

    </div>

    <OtherNavigation/>
    
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table class="table table-hover w-100 pb-30">
<thead class="thead-dark">
<tr>
<th>Id</th>
<th>Face Name</th>
<th>Category</th>
<th>Topic</th>
<th>Status</th>
<th>Shoot Time</th>
<th>Date</th>
</tr>
</thead>
<tbody>

{

resultVideoreq.data == null ? (
  <>Loading.....</>
):(

  resultVideoreq.data.length > 0 ? (

    resultVideoreq.data.map((curElem , index) => {
    return (
      <tr onClick={(e)=>VideoRequestAct(curElem.id)}>
        <td>YV-{index+1}</td>
        <td>{curElem.emp_name}</td>
        <td>{curElem.video_category_name}</td>
        <td>{curElem.video_topic}</td>
        <td><span class={curElem.status == 'Pending' ? 'badge badge-danger badge-sm' : 'badge badge-primary badge-sm'}>{curElem.status}</span></td>
        <td><span class="badge badge-danger badge-sm">N/a</span></td>
        <td><Moment format="YYYY-MM-DD HH:mm">{curElem.created_at}</Moment></td>
      </tr>

      )
    
    })
    ): (
    <>
    <tr>
    <td colSpan="7"><b>No record Found....</b></td>
    </tr>
    
    
    </>
    )

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

export default ViewVideoRequest