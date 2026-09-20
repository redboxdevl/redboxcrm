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
import { BankDepositListAction } from '../../../redux/action/BankDepositListAction';
import moment from 'moment';
import Swal from 'sweetalert2';

const ListBankDeposit = () => {

  const navigate = useNavigate();
  
  const resultBankDepositdata = useSelector(state => state.Bankdepositreducers.bankdepositsdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(BankDepositListAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12,AuthData.company_id));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(BankDepositListAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12,AuthData.company_id));
  }


   const handlePageClick = (data) => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
  let currentPage = data.selected + 1
  dispatch(BankDepositListAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',currentPage,12,AuthData.company_id));
  
  }

  const DeleteDepositCash = (id) =>{
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(BankDepositListAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12,AuthData.company_id));
          navigate("/bank-deposit-list");
           
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
<h2 className="hk-pg-title font-weight-600">Bank Deposit List</h2>
</div>
<div>
<NavLink to="/add-deposit" className="btn btn-primary btn-rounded btn-sm">Add New Bank Deposit</NavLink>
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
          <th><b>Account Title</b></th>
          <th><b>Bank Name</b></th>
          <th><b>Account No</b></th>
          <th><b>Deposited Date</b></th>
          <th><b>Deposited Amount</b></th>
          <th><b>Mode Of Deposit</b></th>
          <th><b>Transaction Details</b></th>
          <th><b>Recieved From</b></th>
          <th><b>Status</b></th>

          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultBankDepositdata.data == null ? (
  <>Loading.....</>
):(

  resultBankDepositdata.data.length > 0 ? (
    resultBankDepositdata.data.map((curElem , index) => {
return (
  <tr>
    <td>{curElem.getAccountdetails == '' || curElem.getAccountdetails == null ? '' : curElem.getAccountdetails.title}</td>
    <td>{curElem.getAccountdetails == '' || curElem.getAccountdetails == null ? '' : curElem.getAccountdetails.bankname}</td>
    <td>{curElem.getAccountdetails == '' || curElem.getAccountdetails == null ? '' : curElem.getAccountdetails.accountno}</td>
    <td>{curElem.depositDate}</td>
    <td>{curElem.depositAmount}</td>
    <td>{curElem.modeofdeposit}</td>
    <td>{curElem.transactionDetails}</td>
    <td>{curElem.recievedFrom}</td>
    <td>{curElem.statusTitle}</td>
    <td width={300}>
        <NavLink to={`/list-bank-deposit-voucher/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">View Bank Deposit Voucher</button></NavLink>
        <NavLink to={`/add-deposit/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteDepositCash(curElem.id)}>Delete</button>
        </td>
  </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="6">No Record Found</td>  
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
pageCount={Math.ceil(resultBankDepositdata.TotalCount/12)}
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

export default ListBankDeposit