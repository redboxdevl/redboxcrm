import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation'
import QuickNav from '../../../Includes/QuickNav';
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import { CircularPolicyACtion } from '../../../redux/action/CircularPolicyACtion';
import { ComplainmanageAction } from '../../../redux/action/ComplainmanageAction';

const Complainmanagementlist = () => {

  var CurrentDate = moment().format('YYYY-MM-DD');
  const navigate = useNavigate();

  const [result,setResult]= useState([]);
  const [ListCircularResult,setListCircularResult]= useState([]);
  const [CircularCategory,setCircularCategory]=useState('');
  const [subjectName,setsubjectName]=useState('');
  const [policyDate,setpolicyDate]=useState('');

  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultComplainData = useSelector(state => state.Complainreducers.complainlistdata);
  const dispatch = useDispatch();

  const SuperCondition = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20 || edx.role_id === 18 || edx.role_id === 12);
  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.role_id == 12);

  console.log("resultRolePermssion",resultRolePermssion);

  const ListCirculePolicy = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}circularpolicy`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }

    const ListCircularCategory = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}circularpolicycategory`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setListCircularResult(await GetArray);
      }

    useEffect(() => {
      // const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
      //   ListCirculePolicy();
      //   ListCircularCategory();
      //   dispatch(ComplainmanageAction('all',1,12));

      const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4);
    if(SuperCon.length === 0){
      if(EmpData === null || EmpData === ''){
        if(FinanceMode.length > 0){
          dispatch(ComplainmanageAction('all','',1,12));
        }else{
          dispatch(ComplainmanageAction(AuthData.id,AuthData.department_id,1,12));
        }
      }else{
        dispatch(ComplainmanageAction('all',AuthData.Hod == 'yes' ? AuthData.department_id : '',1,12));
      }
    }else{
      dispatch(ComplainmanageAction('all','',1,12));
    }
  },[]);


  var countPolicy = result.length;
  var countCircular = ListCircularResult.length;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(ComplainmanageAction('all',1,12));
  }

  const DeleteComplainPolicy = (id) =>{
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}complainmanagement/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/complain-management");
          // dispatch(ComplainmanageAction('all',1,12));
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
        
      });

    }else{

    }

  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Complain Management</h2>

</div>
<div class="d-flex">
<NavLink to="/add-new-complain" className="btn btn-primary btn-rounded btn-sm">Add New Complain</NavLink>
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
        <th>Complain Note</th>
        <th>Status</th>
        {SuperCondition.length == 0 ? '' : <th>Actions</th>}
    </tr>
  </thead>
  <tbody>

  {

resultComplainData.data == null ? (
<>Loading.....</>
):(

  resultComplainData.data.length > 0 ? (
    resultComplainData.data.map((curElem , index) => {

return (
<tr>
  <td>{curElem.id}</td>
  <td>{curElem.complainNote}</td>
  <td><span class="badge badge-sm badge-green">{curElem.status == 0 ? 'Pending' : 'Active'}</span></td>
  {
    SuperCondition.length == 0 ? '' : <td><NavLink to={`/add-new-complain/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
    <button class="btn btn-danger btn-rounded btn-sm" type='button' onClick={() => DeleteComplainPolicy(curElem.id)}>Delete</button>
  </td>
  }
 
</tr>
)

})

): (
<>
<tr>
<td colspan="7">No Record Found</td>  
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

export default Complainmanagementlist