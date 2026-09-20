import React , {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , NavLink } from 'react-router-dom';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation'
import QuickNav from '../../../Includes/QuickNav';
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import { CircularPolicyACtion } from '../../../redux/action/CircularPolicyACtion';

const Circularpolicylist = () => {

  var CurrentDate = moment().format('YYYY-MM-DD');
  const navigate = useNavigate();

  const [result,setResult]= useState([]);
  const [ListCircularResult,setListCircularResult]= useState([]);
  const [CircularCategory,setCircularCategory]=useState('');
  const [subjectName,setsubjectName]=useState('');
  const [policyDate,setpolicyDate]=useState('');

  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultCircularPol = useSelector(state => state.Circularpolicyreducers.circularlistdata);
  const dispatch = useDispatch();

  const SuperCondition = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20 || edx.role_id === 18 || edx.role_id === 12);

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
      const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

        ListCirculePolicy();
        ListCircularCategory();
        dispatch(CircularPolicyACtion(1,12,'all',CircularCategory,subjectName,policyDate));
  },[]);


  var countPolicy = result.length;
  var countCircular = ListCircularResult.length;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(CircularPolicyACtion(1,12,'all',CircularCategory,subjectName,policyDate));
  }

  const DeleteCircularPolicy = (id) =>{
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}circularpolicy/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/circular-policy");
          ListCirculePolicy();
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
<h2 className="hk-pg-title font-weight-600">Circular Policy</h2>

</div>
<div class="d-flex">
{SuperCondition.length == 0 ? '' : <NavLink to="/add-circular-policy" className="btn btn-primary btn-rounded btn-sm">Add New Circular Policy</NavLink> }
</div>


</div>

<OtherNavigation/>

<div class="row pb-3">
<div className="form-group col-md-3">
    <label htmlFor="">Circular Category*</label>
    <select name="CircularCategory" id="" className="form-control" onChange={e=>setCircularCategory(e.target.value)} value={CircularCategory}>
      <option value="" selected>Select Circular Category</option>
      {

      countCircular > 0 ? (

      ListCircularResult.map((curElem) => {
      return (
      <option value={curElem.id}>{curElem.categoryTitle}</option>
      )

      })
      ): (
      <>
      <option><b>Loading....</b></option>

      </>
      )


      }
    </select>
  </div>

  <div class="form-group col-md-3">
<div class="form-group">
<label for="inputAddress">Subject Name</label>
<input type="text" className="form-control" name="subjectName" onChange={e=>setsubjectName(e.target.value)} value={subjectName}/>
</div>
</div>

<div class="form-group col-md-3">
<div class="form-group">
<label for="inputAddress">Policy Date</label>
<input type="date" className="form-control" name="policyDate" onChange={e=>setpolicyDate(e.target.value)} value={policyDate}/>
</div>
</div>

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
  <thead class="thead-dark">
    <tr>
        <th>ID</th>
        <th>Category Name</th>
        <th>Subject Name</th>
        <th>Policy Date</th>
        <th>Attachments</th>
        <th>Status</th>
        {SuperCondition.length == 0 ? '' : <th>Actions</th>}
    </tr>
  </thead>
  <tbody>

  {

resultCircularPol.data == null ? (
<>Loading.....</>
):(

  resultCircularPol.data.length > 0 ? (
    resultCircularPol.data.map((curElem , index) => {

return (
<tr>
  <td>{curElem.id}</td>
  <td>{curElem.categoryTitle}</td>
  <td>{curElem.subjectName}</td>
  <td>{curElem.policyDate}</td>
  <td><a href={`${actionConfig.REACT_APP_MAIN}${curElem.Attachment}`}>Preview File</a></td>
  <td><span class="badge badge-sm badge-green">Active</span></td>
  {
    SuperCondition.length == 0 ? '' : <td><NavLink to={`/add-circular-policy/${curElem.id}`}><button class="btn btn-primary btn-sm btn-rounded">Update</button></NavLink>
    <button class="btn btn-danger btn-rounded btn-sm" type='button' onClick={() => DeleteCircularPolicy(curElem.id)}>Delete</button>
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

export default Circularpolicylist