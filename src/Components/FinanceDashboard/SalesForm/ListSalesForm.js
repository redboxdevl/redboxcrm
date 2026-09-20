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
import moment from 'moment';

const ListSalesForm = () => {

  const navigate = useNavigate();
  
  const resultpayrecieptsdata = useSelector(state => state.Salesformreducers.salesformdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(SalesFormAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12,AuthData.company_id));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(SalesFormAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12,AuthData.company_id));
  }


   const handlePageClick = (data) => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
  let currentPage = data.selected + 1
  dispatch(SalesFormAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',currentPage,12,AuthData.company_id));
  
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Sales Form List</h2>
</div>
<div>
<NavLink to="/add-new-sales-form" className="btn btn-primary btn-rounded btn-sm">Add New Sales Form</NavLink>
</div>

</div>


<OtherNavigation/>

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
          <th><b>Agent Name</b></th>
          <th><b>Client</b></th>
          <th><b>Project</b></th>
          <th><b>Type</b></th>
          <th><b>Unit #</b></th>
          <th><b>Amount</b></th>
      </tr>
  </thead>
  <tbody>
  {

resultpayrecieptsdata.data == null ? (
  <>Loading.....</>
):(

  resultpayrecieptsdata.data.length > 0 ? (
    resultpayrecieptsdata.data.map((curElem , index) => {
return (
    <tr style={{background:`${curElem.status == 'pending' ? 'rgb(233 30 99 / 13%)' : ''}`,color:`${curElem.status == 'pending' ? '#000' : '#000'}`,boxShadow:'0px 4px 6px #97979733'}} onClick={()=>navigate(`/print-sales-form/${curElem.id}`)}>
        <td>{curElem.emp_name}</td>
        <td>{curElem.CustomerName}</td>
        <td>{curElem.ProjectTitle}</td>
        <td>{curElem.type_name}</td>
        <td>{curElem.ProNo}</td>
        <td>{curElem.SaleAmount}</td>
    </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="12">No Record Found</td>  
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
pageCount={Math.ceil(resultpayrecieptsdata.TotalCount/12)}
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

export default ListSalesForm