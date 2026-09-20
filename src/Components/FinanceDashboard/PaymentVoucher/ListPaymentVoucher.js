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
import { PaymentVoucherAction } from '../../../redux/action/PaymentVoucherAction';
import moment from 'moment';
import Swal from 'sweetalert2';


const ListPaymentVoucher = () => {

  const navigate = useNavigate();

  const [CompaniesResult,setCompaniesResult]= useState([]);

  const resultPaymentVoucherList = useSelector(state => state.PaymentVouchereducers.paymentvoucherdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompaniesResult(await GetArray);
  }

  const [Amount,setAmount] = useState('');
  const [TransactionDate,setTransactionDate] = useState('');
  const [CompanyId,setCompanyId] = useState('');
  const [Status,setStatus] = useState('');
  const [PayTo,setPayTo] = useState('');
  const [PaymentType,setPaymentType] = useState('');
  
  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(PaymentVoucherAction(1,12,Amount,TransactionDate,CompanyId,Status,PayTo,PaymentType,AuthData.company_id));
    ListCompanies();
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(PaymentVoucherAction(1,12,Amount,TransactionDate,CompanyId,Status,PayTo,PaymentType,AuthData.company_id));
  }

   const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(PaymentVoucherAction(currentPage,12,Amount,TransactionDate,CompanyId,Status,PayTo,PaymentType,AuthData.company_id));
    }


    const DeleteVoucher = (id) => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      if (window.confirm("Do You Want to Delete this Record?")){

        fetch(`${actionConfig.REACT_APP_URL}paymentvoucher/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(dataex => {
          console.log("dataex",dataex);
          if(dataex.code == '200'){
            Swal.fire(
              'Good job!',
              dataex.message,
              'success'
            );
            dispatch(PaymentVoucherAction(1,12,Amount,TransactionDate,CompanyId,Status,PayTo,PaymentType,AuthData.company_id));
            navigate("/payment-voucher-list");
             
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
<h2 className="hk-pg-title font-weight-600">Payment Voucher List</h2>
</div>
<div>
<NavLink to="/add-new-payment-voucher" className="btn btn-primary btn-rounded btn-sm">Add New Payment Voucher</NavLink>
</div>

</div>

<OtherNavigation/>

<div class="row pb-3">
<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Amount</label>
<input type="number" className="form-control" name="Amount" placeholder='Searching....' onChange={(e) => setAmount(e.target.value)} value={Amount} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Pay To</label>
<input type="text" className="form-control" name="PayTo" placeholder='Searching....' onChange={(e) => setPayTo(e.target.value)} value={PayTo} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Transaction Date</label>
<input type="date" className="form-control" name="TransactionDate" placeholder='Searching....' onChange={(e) => setTransactionDate(e.target.value)} value={TransactionDate} />
</div>
</div>

<div className="form-group col-md-2">
  <label htmlFor="">Company</label>
  <select name="Company" id="" className="form-control"  onChange={e=>setCompanyId(e.target.value)} value={CompanyId}>
    <option value="" selected>Select Company</option>
    {
      CompaniesResult && CompaniesResult.map((item,key) => {
        return (
          <option value={item.id}>{item.company_name}</option>
        )
      })
    }
  </select>
</div>

<div className="form-group col-md-2">
    <label htmlFor="">Status Approval</label>
    <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
      <option value="" selected>Select Status</option>
      <option value="1">Approved</option>      
      <option value="0">Pending</option>      
    </select>
  </div>

  <div className="form-group col-md-2">
    <label htmlFor="">Payment Type*</label>
    <select name="PaymentType" id="" className="form-control" onChange={e=>setPaymentType(e.target.value)} value={PaymentType} required>
        <option value="">Select Type</option>
        <option value="cashPaymentVoucher">Cash Payment Voucher (CPV)</option>
        {/* <option value="bankPaymentVoucher">Bank Payment Voucher (BPV)</option>
        <option value="pettyCashVoucher">Petty Cash Voucher (PCV)</option> */}
        <option value="cashRecieptVoucher">Cash Reciept Voucher (CRV)</option>
        <option value="bankRecieptVoucher">Bank Reciept Voucher (BRV)</option>
        <option value="journalVoucher">Journal Voucher (JV)</option>
      </select>
  </div>

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultPaymentVoucherList.TotalCount}</span></h4>
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
  <thead>
      <tr>
          <th>Voucher No</th>
          <th>Company Name</th>
          <th>Voucher Date</th>
          <th>Transaction Date</th>
          <th>Pay To</th>
          <th>Amount</th>
          <th>Payment Type</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultPaymentVoucherList.data == null ? (
  <>Loading.....</>
):(

    resultPaymentVoucherList.data.length > 0 ? (
        resultPaymentVoucherList.data.map((curElem , index) => {
return (
    <tr>
        <td width={190}>{curElem.voucherNo}</td>
        <td width={210}>{curElem.company_name}</td>
        <td>{curElem.voucherDate}</td>
        <td>{curElem.transactionDate}</td>
        <td>{curElem.payTo}</td>
        <td>{curElem.sumAmount}</td>
        <td>{curElem.paymentType == 'bankPaymentVoucher' ? 'Bank Payment Voucher (BPV)' : curElem.paymentType == 'cashPaymentVoucher' ? 'Cash Payment Voucher (CPV)' : curElem.paymentType == 'journalVoucher' ? 'Journal Voucher (JV)' : curElem.paymentType == 'cashRecieptVoucher' ? 'Cash Reciept Voucher (CRV)' : curElem.paymentType == 'bankRecieptVoucher' ? 'Bank Reciept Voucher (BRV)' : curElem.paymentType == 'pettyCashVoucher' ? 'Petty Cash Voucher (PCV)' : curElem.paymentType}</td>
        <td>{curElem.PayDesc}</td>
        <td><span className={`badge badge-${curElem.status == 0 ? 'danger' :'primary'}`}>{curElem.status == 0 ? 'Pending' : 'Approved'}</span></td>
        <td width={350}>
        <NavLink to={`/list-payment-voucher/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">View Payment Voucher</button></NavLink>
        <NavLink to={`/add-new-payment-voucher/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteVoucher(curElem.id)}>Delete</button>
        
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
pageCount={Math.ceil(resultPaymentVoucherList.TotalCount/12)}
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

export default ListPaymentVoucher