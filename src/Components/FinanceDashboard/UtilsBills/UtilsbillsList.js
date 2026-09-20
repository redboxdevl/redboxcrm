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
import { FinbillsAction } from '../../../redux/action/FinbillsAction';
import moment from 'moment';


const UtilsbillsList = () => {

  const resultChequeList = useSelector(state => state.ChequeBookListreducers.chequebooklist);
  const resultUtlisList = useSelector(state => state.Finbillsreducers.findbleaddata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultDashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


  const [BillAmount,setBillAmount] = useState('');
  const [PaidAmount,setPaidAmount] = useState('');
  const [DueDate,setDueDate] = useState('');
  const [BillType,setBillType] = useState('');
  const [Beneficiary,setBeneficiary] = useState('');
  const [BillMonth,setBillMonth] = useState('');
  const [Lastpaymentdate,setLastpaymentdate] = useState('');
  
  const [BillsTYpeResult,setBillsTYpeResult]= useState([]);

  const ListBillType = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}billstype`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBillsTYpeResult(await GetArray);
    }
  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(FinbillsAction('all',BillAmount,PaidAmount,DueDate,BillType,Beneficiary,BillMonth,1,12,Lastpaymentdate,AuthData.company_id));
    ListBillType();
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(FinbillsAction('all',BillAmount,PaidAmount,DueDate,BillType,Beneficiary,BillMonth,1,12,Lastpaymentdate,AuthData.company_id));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1;
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  dispatch(FinbillsAction('all',BillAmount,PaidAmount,DueDate,BillType,Beneficiary,BillMonth,currentPage,12,Lastpaymentdate,AuthData.company_id));
  
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payables List</h2>
</div>
<div>
<NavLink to="/add-new-bills" className="btn btn-primary btn-rounded btn-sm">Add New Payables</NavLink>
</div>

</div>
<div class="row pb-3">
<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Bill Amount</label>
<input type="number" className="form-control" name="BillAmount" placeholder='Bill Amount' onChange={(e) => setBillAmount(e.target.value)} value={BillAmount} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Paid Amount</label>
<input type="number" className="form-control" name="PaidAmount" placeholder='Paid Amount' onChange={(e) => setPaidAmount(e.target.value)} value={PaidAmount} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Due Date</label>
<input type="date" className="form-control" name="DueDate" placeholder='Bill Amount' onChange={(e) => setDueDate(e.target.value)} value={DueDate} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Last Payment Date</label>
<input type="date" className="form-control" name="Lastpaymentdate" placeholder='Last Payment Date' onChange={(e) => setLastpaymentdate(e.target.value)} value={Lastpaymentdate} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Beneficiary</label>
<input type="text" className="form-control" name="Beneficiary" placeholder='Beneficiary' onChange={(e) => setBeneficiary(e.target.value)} value={Beneficiary} />
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Bill Type</label>
<select name="BillType" id="" className="form-control" onChange={e=>setBillType(e.target.value)} value={BillType}>
      <option value="" selected>Select Bill Type</option>
      {
      BillsTYpeResult && BillsTYpeResult.map((item,key) => {
      return (
        <option value={item.id}>{item.typeTitle}</option>
      )
      })
      }
    </select>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Bill Month</label>
<select name="BillType" id="" className="form-control" onChange={e=>setBillMonth(e.target.value)} value={BillMonth}>
      <option value="" selected>Select Bill Month</option>
      {
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' || resultDashboard.getMonth == 0 ? (
      <></>
    ):(
      resultDashboard.getMonth.length > 0 ? (
        resultDashboard.getMonth.map((curElem,index) => {
        return (
          <option value={curElem}>{curElem}</option>
        )
      })
      ): (
      <>
      <option>No Record Found....</option>
      </>
      )
    )

        }
    </select>
</div>
</div>


<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
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
          <th>Type Name</th>
          <th>Company Name</th>
          <th>Beneficiary</th>
          <th>Bill Date</th>
          <th>Bill No</th>
          <th>Due Date</th>
          <th>Bill Amount</th>
          <th>Bill Month</th>
          <th>Paid Amount</th>
          <th>Balanace</th>
          <th>Attachement</th>
          <th>Last Payment Date</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultUtlisList.data == null ? (
  <>Loading.....</>
):(

  resultUtlisList.data.length > 0 ? (
    resultUtlisList.data.map((curElem , index) => {

return (
    <tr>
        <td>{curElem.typeTitle}</td>
        <td>{curElem.company_name}</td>
        <td>{curElem.Beneficiary}</td>
        <td>{curElem.billDateFormat}</td>
        <td>{curElem.billNo}</td>
        <td>{curElem.dueDateFromat}</td>
        <td>{curElem.BillAmount}</td>
        <td>{curElem.BillMonth}</td>
        <td>{curElem.PaidAmount == null ? 0 : curElem.PaidAmount}</td>
        <td>{curElem.balanaceAmount == null ? 0 : curElem.balanaceAmount}</td>
        <td><a href={`${actionConfig.REACT_APP_MAIN}${curElem.billattachement}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a></td>
        <td>{curElem.LastpaymentDate}</td>
        <td><span className='badge badge-primary'>{curElem.statusInfo}</span></td>
        <td>
        <NavLink to={`/add-new-bills/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
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

<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultUtlisList.TotalCount/12)}
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

export default UtilsbillsList