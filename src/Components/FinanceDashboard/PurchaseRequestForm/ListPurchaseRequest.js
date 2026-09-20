import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { SalesFormAction } from '../../../redux/action/SalesFormAction';
import { PettyCashAction } from '../../../redux/action/PettyCashAction';
import { PurchasereqFormAction } from '../../../redux/action/PurchasereqFormAction';
import moment from 'moment';
import Swal from 'sweetalert2';

const ListPurchaseRequest = () => {

  const navigate = useNavigate();
  
  const resultpurchaseformdata = useSelector(state => state.Purchasereqformreducers.purchaseformdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const dispatch = useDispatch();

  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.role_id == 12);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  

  const [TypeId,setTypeId] = useState('');
  const [DepartmentId,setDepartmentId] = useState('');
  const [Status,setStatus] = useState('');
  const [User,setUser] = useState('');
  const [TotalCost,setTotalCost] = useState('');
  const [DisbursedAmt,setDisbursedAmt] = useState('');

  const [CompaniesResult,setCompaniesResult]= useState([]);
  const [ItemResult,setItemResult]=useState([]);

  const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
  }

  const ListItemType = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}itemtype?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setItemResult(await GetArray);
    }

  useEffect(() => {
    ListCompanies();
    ListItemType();
    },[]);


  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    console.log("AuthData",AuthData);
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4);
    if(SuperCon.length === 0){
      if(EmpData === null || EmpData === ''){
        if(FinanceMode.length > 0){
          dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
        }else{
          dispatch(PurchasereqFormAction(AuthData.Hod == 'yes' ? 'all' : AuthData.id,AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
        }
      }else{
        dispatch(PurchasereqFormAction('all',AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
      }
    }else{
      dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
    }
    // dispatch(PurchasereqFormAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4);
    if(SuperCon.length === 0){
      if(EmpData === null || EmpData === ''){
        if(FinanceMode.length > 0){
          dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
        }else{
          dispatch(PurchasereqFormAction(AuthData.Hod == 'yes' ? 'all' : AuthData.id,AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
        }
      }else{
        dispatch(PurchasereqFormAction('all',AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
      }
    }else{
      dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,1,12,AuthData.company_id));
    }
    
  }


   const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4);
    if(SuperCon.length === 0){
      if(EmpData === null || EmpData === ''){
        if(FinanceMode.length > 0){
          dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,currentPage,12,AuthData.company_id));
        }else{
          dispatch(PurchasereqFormAction(AuthData.Hod == 'yes' ? 'all' : AuthData.id,AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,currentPage,12,AuthData.company_id));
        }
      }else{
        dispatch(PurchasereqFormAction('all',AuthData.Hod == 'yes' ? AuthData.department_id : '',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,currentPage,12,AuthData.company_id));
      }
    }else{
      dispatch(PurchasereqFormAction('all','',TypeId,DepartmentId,Status,User,TotalCost,DisbursedAmt,currentPage,12,AuthData.company_id));
    }
  
  }

  const DeletePurchaseForm = (id) =>{
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}purchasereqform/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/purchase-request-form-list");
           
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

  console.log("resultRolePermssion",resultRolePermssion);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Requirement Form List</h2>
</div>
<div>
<NavLink to="/add-new-purchase-request-form" className="btn btn-primary btn-rounded btn-sm">Add New Requirement Form</NavLink>
</div>
</div>

<OtherNavigation/>

<div class="row pb-3">


<div className="form-group col-md-2">
<label htmlFor="">Type*</label>
<select name="TypeId" id="" className="form-control" onChange={e=>setTypeId(e.target.value)} value={TypeId} required>
<option value="">Select Type</option>
{
ItemResult && ItemResult.map((item,key) => {
return (
  <option value={item.id}>{item.typeTitle}</option>
)
})
}
</select>
</div>

<div className="form-group col-md-2">
<label htmlFor="">Department*</label>
<select name="DepartmentId" id="" className="form-control" onChange={e=>setDepartmentId(e.target.value)} value={DepartmentId} required>
<option value="">Select Department</option>
{
CompaniesResult && CompaniesResult.map((item,key) => {
return (
  <option value={item.id}>{item.department_name}</option>
)
})
}
</select>
</div>

<div className="form-group col-md-2">
<label htmlFor="">Status*</label>
<select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status} required>
<option value="">Select Status</option>
<option value="0">Pending</option>
<option value="1">Authorized</option>
<option value="2">Approved</option>
<option value="3">Disbursed</option>
<option value="4">Rejected</option>
</select>
</div>

<div className="form-group col-md-2">
<label htmlFor="">User*</label>
<select name="User" id="" className="form-control" onChange={e=>setUser(e.target.value)} value={User} required>
<option value="">Select User</option>
{
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAllS.map((items,key) => {
        return (
       <><option value={items.id} key={key+1}>{items.emp_name}</option></>
        )
    
    })
    )
  }
</select>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Total Cost</label>
<input type="number" className="form-control" name="TotalCost" placeholder='Total Cost' onChange={(e) => setTotalCost(e.target.value)} value={TotalCost} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Disbursed Amount</label>
<input type="number" className="form-control" name="DisbursedAmt" placeholder='Disbursed Amount' onChange={(e) => setDisbursedAmt(e.target.value)} value={DisbursedAmt} />
</div>
</div>

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

<div class="hk-row">
<div class="col-lg-12">
<div class="card">
<div class="card-body">
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<div class="table-responsive">
<table class="table table-hover table-bordered mb-0">
<thead className='thead-dark'>
      <tr>
          <th><b>Type</b></th>
          <th><b>User</b></th>
          {/* <th><b>Ref No</b></th> */}
          <th><b>Department</b></th>
          <th><b>Purpose</b></th>
          <th><b>Estimated Budget</b></th>
          <th><b>Total Cost</b></th>
          <th><b>Disbursed Amount</b></th>
          <th><b>Required Date</b></th>
          <th><b>Attachement</b></th>
          <th><b>Status</b></th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
    
  {

resultpurchaseformdata.data == null ? (
  <>Loading.....</>
):(

  resultpurchaseformdata.data.length > 0 ? (
    resultpurchaseformdata.data.map((curElem , index) => {

      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      const EmpData = JSON.parse(localStorage.getItem('empTeam'));
      const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4);
      
      if(SuperCon.length === 0){
        if(EmpData === null || EmpData === ''){
          if(FinanceMode.length > 0){
            
          }else{

          }
        }else{

        }
      }else{

      }
        

return (
  <tr>
    <td>{curElem.typeTitle}</td>
    <td>{curElem.emp_name}</td>
    <td>{curElem.department_name}</td>
    <td>{curElem.Purpose}</td>
    <td>{curElem.EstimatedBudget}</td>
    <td>{curElem.sumAmount}</td>
    <td>{curElem.DisbursedAmt == null ? '0' : curElem.DisbursedAmt}</td>
    <td>{curElem.RequiredDate}</td>
    <td><a href={`${actionConfig.REACT_APP_MAIN}${curElem.AttachementImage}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a></td>
    <td><span className='badge badge-primary'>{curElem.statusField}</span></td>
    <td width={300}>
        <NavLink to={`/print-purchase-form/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">View Purchase Form</button></NavLink>
       
        {
        SuperCon.length === 0 && FinanceMode.length === 0 ? (
          curElem.status == 0 ? (
            <><NavLink to={`/add-new-purchase-request-form/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink></>
          ):(
            <></>
          )
        ):(
          <><NavLink to={`/add-new-purchase-request-form/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink></>
        )
       }
        
        {/* <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeletePurchaseForm(curElem.id)}>Delete</button> */}
        </td>
  </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="9">No Record Found</td>  
    </tr>
  </>
  )

)

}
  </tbody>
</table>


<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultpurchaseformdata.TotalCount/12)}
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

</div>
</div>
</div>
</div>
</div>
</div>
</div>

</div>

</div>
</>
)
}

export default ListPurchaseRequest