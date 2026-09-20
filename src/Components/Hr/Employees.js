import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { HrEmployeesAction } from '../../redux/action/HrEmployeesAction';

const Employees = () => {

  const navigate = useNavigate();

  
const AuthDatas = JSON.parse(localStorage.getItem('authdata'));
// console.log("AuthDatas",AuthDatas);

  const HrEmployeeData = useSelector(state => state.Hremployeereducers.hremployeedata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const InventoriesList = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 100 || edx.role_id === 18);

   const InventoriesList2 = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 2);

  const dispatch = useDispatch();
  const [result,setResult]= useState([]);
  const [search,setSearch]= useState('');

  const ListEmployee = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}employee`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setResult(await GetArray);
    }


    useEffect(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(HrEmployeesAction(InventoriesList2.length > 0 ? AuthData.id : InventoriesList.length == 0 ? AuthData.id : 'all' ,1,12,search,AuthData.company_id));
      ListEmployee();
  },[]);


  var countEmployee = result.length;

  // console.log("resultRolePermssion",resultRolePermssion);

  const handlePageClick = (data) => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    let currentPage = data.selected + 1
    dispatch(HrEmployeesAction(InventoriesList2.length > 0 ? AuthData.id : InventoriesList.length == 0 ? AuthData.id : 'all' ,currentPage,12,search,AuthData.company_id));
    
    }

    const ChangeStatus = (status,agentId) => {

      const FeildData = { emp_id:agentId,status:status}
  
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(FeildData)
      };
      
      fetch(`${actionConfig.REACT_APP_URL}employeeStatus`, requestOptions)
          .then(response => response.json())
          .then(dataex => {
              
              if(dataex.code == '200'){
                Swal.fire(
                  'Good job!',
                  dataex.message,
                  'success'
                );
                navigate("/employee");
                 
              }else{
                Swal.fire(
                  'Error!',
                  dataex.message,
                  'error'
                );
              }
      
      
          }); 

    }

    const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(HrEmployeesAction( InventoriesList2.length > 0 ? AuthData.id : InventoriesList.length == 0 ? AuthData.id : 'all' ,1,12,search));

    }

    // console.log("InventoriesList",InventoriesList);
    
return (
<>


<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">


{
  InventoriesList.length == 0 ? (
    <></>
  ):(

<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Employees</h2>

</div>
<div class="d-flex">
  {
    AuthDatas.lockStatus == 'new' ? (
      <></>
    ):(
      <NavLink to="/add-new-employees" className="btn btn-primary btn-rounded btn-sm">Add New Employees</NavLink>
    )
  }

{/* <NavLink to="/role-category" className="btn btn-warning btn-rounded btn-sm">Role Category</NavLink> */}
{/* <NavLink to="/crm-modules" className="btn btn-danger btn-rounded btn-sm">Crm Module</NavLink> */}
</div>


</div>

  )
}

{
  InventoriesList.length == 0 ? (
    <></>
  ):(

    AuthDatas.lockStatus == 'new' ? (
      <></>
    ):(
      <div class="row pb-3">
      <div className="col-md-3">
      <div className="form-group">
      <label htmlFor="">Search Anything</label>
      <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
      </div>
      </div>

      <div class="col-md-2">
      <div class="form-group" style={{marginTop:'33px'}}>
      <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
      </div>
      </div>
      </div>
    )


  )
}


<OtherNavigation/>

<div class="row pt-5">
<div class="col-sm">
<div class="table-wrap table-responsive">
  <table id="datable_1" class="table table-hover w-100 display pb-30">
      <thead class="thead-dark">
        <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Date of Joining</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>

      {

HrEmployeeData.data == null ? (
  <>Loading.....</>
):(

  HrEmployeeData.data.length > 0 ? (
    HrEmployeeData.data.map((curElem , index) => {

return (
<tr key={index+1}>
      <td class="align-items-center d-flex"><img src={curElem.profile_pic == null ? 'FrontAsset/dist/img/avatar1.jpg' : `${actionConfig.REACT_APP_MAIN}${curElem.profile_pic}` } alt="user" class="avatar-img w-50p mr-10 rounded-circle" />EMP-0{curElem.id}</td>
      <td>{curElem.emp_name}<br /><small>{curElem.email}</small></td>
      <td>{curElem.department_name}</td>
      <td>{curElem.designation_name}</td>
      <td>{curElem.joining_date}</td>
      <td>-</td>
      <td><span class={`badge badge-sm badge-${curElem.status == 'active' ?`green`:`danger`}`}>{curElem.status}</span></td>
      <td><NavLink to={`/add-new-employees/${curElem.id}`}><button className="btn btn-primary btn-rounded btn-sm">Update</button></NavLink>
      {
        
  InventoriesList.length == 0 || InventoriesList2.length > 0 ? (
    <></>
  ):(
        <button className={`btn btn-${curElem.status == 'active' ?`dark`:`danger`} btn-rounded btn-sm`} onClick={() =>ChangeStatus(curElem.status,curElem.id)}>{curElem.status == 'active' ? 'Deactive' : 'Active'}</button>
  )}
      </td>
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

{
  HrEmployeeData.TotalCount >= 9 ? (
    <ReactPaginate 
      previousLabel={`previous`}
      nextLabel={`next`}
      breakLabel={`...`}
      pageCount={Math.ceil(HrEmployeeData.TotalCount/12)}
      marginPagesDisplayed={3}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName={`pagination justify-content-center`}
      pageClassName={`page-item`}
      pageLinkClassName={`page-link`}
      previousClassName={`page-item`}
      previousLinkClassName={`page-link`}
      nextLinkClassName={`page-link`}
      nextClassName={`page-item`}
      breakLinkClassName={`page-link`}
      breakClassName={`page-item`}
      activeClassName={`active`}
      />
        ):(
          <></>
        )
}
  
</div>
</div>
</div>

</div>
</>
)
}

export default Employees