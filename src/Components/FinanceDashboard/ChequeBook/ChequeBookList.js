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
import moment from 'moment';


const ChequeBookList = () => {

  const resultChequeList = useSelector(state => state.ChequeBookListreducers.chequebooklist);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(ChequeBookListAction(1,12,AuthData.company_id));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(ChequeBookListAction(1,12,AuthData.company_id));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1;
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  dispatch(ChequeBookListAction(currentPage,12,AuthData.company_id));
  
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Cheque Book List</h2>
</div>
<div>
<NavLink to="/add-new-cheque-book" className="btn btn-primary btn-rounded btn-sm">Add New Cheque Book</NavLink>
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
          <th>Account No</th>
          <th>Bank Name</th>
          <th>Title</th>
          <th>Branch Name</th>
          <th>City</th>
          <th>Serial Start</th>
          <th>Serial End</th>
          <th>No Of Cheque</th>
          <th>Remaining Cheque</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultChequeList.data == null ? (
  <>Loading.....</>
):(

  resultChequeList.data.length > 0 ? (
    resultChequeList.data.map((curElem , index) => {

return (
    <tr>
        <td width={190}>{curElem.AccountNo}</td>
        <td width={210}>{curElem.BankName}</td>
        <td>{curElem.AccountTitle}</td>
        <td>{curElem.BranchName}</td>
        <td>{curElem.cityName}</td>
        <td>{curElem.SerialStart}</td>
        <td>{curElem.SerialEnd}</td>
        <td>{curElem.NoofCheque}</td>
        <td>0</td>
        <td><span className={`badge badge-${curElem.status == 0 ? 'danger' :'primary'}`}>{curElem.status == 0 ? 'Pending' : 'Approved'}</span></td>
        <td>
        <NavLink to={`/add-new-cheque-book/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        </td>
    </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="13">No Record Found</td>  
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
</div>
</div>
</div>

</div>

</div>
</>
)
}

export default ChequeBookList