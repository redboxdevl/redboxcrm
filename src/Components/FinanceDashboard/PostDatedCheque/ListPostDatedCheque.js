import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { AssetListAction } from '../../../redux/action/AssetListAction';
import { ChequeBookListAction } from '../../../redux/action/ChequeBookListAction';
import { PostDatedChequeAction } from '../../../redux/action/PostDatedChequeAction';
import moment from 'moment';


const ListPostDatedCheque = () => {

  const resultPostDatedChequeList = useSelector(state => state.PostDatedChequereducers.postdatedchequedata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    dispatch(PostDatedChequeAction(1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(PostDatedChequeAction(1,12));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(PostDatedChequeAction(currentPage,12));
  
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Post Dated Cheque List</h2>
</div>
<div>
<NavLink to="/add-post-dated-cheque" className="btn btn-primary btn-rounded btn-sm">Add New Post Dated Cheque</NavLink>
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
          <th>Cheque Date</th>
          <th>Recieved Date</th>
          <th>Amount</th>
          <th>Bank Name</th>
          <th>Branch Name</th>
          <th>Cheque No</th>
          <th>Recieved From</th>
          <th>Purpose Type</th>
          <th>Payee Type</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  
  {

resultPostDatedChequeList.data == null ? (
  <>Loading.....</>
):(

  resultPostDatedChequeList.data.length > 0 ? (
    resultPostDatedChequeList.data.map((curElem , index) => {

return (
    <tr>
        <td>{curElem.chequeDate}</td>
        <td>{curElem.RecievedDate}</td>
        <td>{curElem.Amount}</td>
        <td>{curElem.BankName}</td>
        <td>{curElem.BranchName}</td>
        <td>{curElem.ChequeNo}</td>
        <td>{curElem.RecievedFrom}</td>
        <td>{curElem.Purpose}</td>
        <td>{curElem.Status}</td>
        <td>{curElem.PayeeType}</td>
        <td>
        <NavLink to={`/add-post-dated-cheque/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        </td>
    </tr>
    )
  

  })
  
  ): (
    <>
    <tr>
          <td colspan="10">No Record Found</td>  
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
pageCount={Math.ceil(resultPostDatedChequeList.TotalCount/12)}
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

export default ListPostDatedCheque