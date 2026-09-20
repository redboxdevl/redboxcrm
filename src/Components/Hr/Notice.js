import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { NoticeBoardAction } from '../../redux/action/NoticeBoardAction';

const Notice = () => {

  const Noticeresult = useSelector(state => state.Noticeboardreducers.noticeboardleaddata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);

  const [result,setResult]= useState([]);

  const ListNoticeBoard = async () => {

    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if(SuperCon.length == 0){
      var response = await fetch(`${actionConfig.REACT_APP_URL}noticeboard?agentId=${AuthData.id == null ? '' : AuthData.id}`);
    }else{
      var response = await fetch(`${actionConfig.REACT_APP_URL}noticeboard?agentId=all`);
    }
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      dispatch(NoticeBoardAction());
      ListNoticeBoard();
  },[]);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">CEO Note</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-notice" className="btn btn-primary btn-rounded btn-sm">Add New Notice</NavLink>
</div>


</div>

<OtherNavigation/>


<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        {/* <th>Title</th> */}
        <th>Description</th>
        {/* <th>Publish Date</th> */}
        {/* <th>Status</th> */}
        <th>Actions</th>
    </tr>
  </thead>
  <tbody>
  {

result.length > 0 ? (

  result.map((curElem,index) => {

return (
  <tr>
        <td>{index+1}</td>
        {/* <td>{curElem.notice_title}</td> */}
        <td>{curElem.description}</td>
        {/* <td>{curElem.published_date}</td> */}
        {/* <td><span class="badge badge-sm badge-green">{curElem.status}</span></td> */}
        <td><NavLink to={`/add-new-notice/${curElem.id}`}><button className="btn btn-primary btn-rounded btn-sm">Update</button></NavLink>
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

export default Notice