import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { actionConfig } from '../../configuration';
import Moment from 'react-moment';
import { BankListAction } from '../../redux/action/BankListAction';
import ReactPaginate from 'react-paginate';


const BankAccounts = () => {

  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(BankListAction(1,12,AuthData.company_id));
},[]);

const handlePageClick = (data) => {
  let currentPage = data.selected + 1;
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  dispatch(BankListAction(currentPage,12,AuthData.company_id));
  
  }


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Bank Account</h2>
</div>
<div>
<NavLink to="/add-bank-list" className="btn btn-primary btn-rounded btn-sm">Add Bank List</NavLink>
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
  <thead>
      <tr>
          <th>Title</th>
          <th>Bank Name</th>
          <th>Branch</th>
          <th>Branch Code</th>
          <th>City</th>
          <th>Account No</th>
          <th>iBAN</th>
          <th>image</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultBankList.data == null ? (
  <>Loading.....</>
):(

  resultBankList.data.length > 0 ? (
    resultBankList.data.map((curElem , index) => {

return (
    <tr>
        <td>{curElem.title}</td>
        <td>{curElem.bankname}</td>
        <td>{curElem.branch}</td>
        <td>{curElem.branchcode}</td>
        <td>{curElem.cityName}</td>
        <td>{curElem.accountno}</td>
        <td>{curElem.iban}</td>
        <td><img src={`${actionConfig.REACT_APP_MAIN}${curElem.bankimage}`} alt="" width={100} /></td>
        <td><NavLink to={`/add-bank-list/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink></td>
    </tr>
 )
  

})

): (
  <>
  <tr>
        <td colspan="11">No Record Found</td>  
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
pageCount={Math.ceil(resultBankList.TotalCount/12)}
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

export default BankAccounts