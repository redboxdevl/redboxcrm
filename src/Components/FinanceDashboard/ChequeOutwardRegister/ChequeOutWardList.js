import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { ChequeBookListAction } from '../../../redux/action/ChequeBookListAction';
import { ChequeOutwardAction } from '../../../redux/action/ChequeOutwardAction';
import { BankListAction } from '../../../redux/action/BankListAction';
import moment from 'moment';
import Swal from 'sweetalert2';


const ChequeOutWardList = () => {


  const navigate = useNavigate();

  const resultChequeOutWordList = useSelector(state => state.ChequeOutwardreducers.chequeoutwardlist);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [ChequeNoListResult,setChequeNoListResult]= useState([]);
  const [IssueDate,setIssueDate]=useState('');
  const [ChequeDate,setChequeDate]=useState('');
  const [ChequeAmount,setChequeAmount]=useState('');
  const [ChequeNo,setChequeNo]=useState('');
  const [AccountNo,setAccountNo]=useState('');
  const [ChequeStatus,setChequeStatus]=useState('');
  const [Title,setTitle]=useState('');
  
  
  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
  },[]);

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(ChequeOutwardAction(1,12,IssueDate,ChequeDate,ChequeNo,ChequeStatus,AccountNo,ChequeAmount,Title,AuthData.company_id));
},[]);

const ChequeNoList = async (AccountNo) => {
  if(AccountNo == '' || AccountNo == null || AccountNo == undefined){
    setChequeNoListResult('');
  }else{

    const response2 = await fetch(`${actionConfig.REACT_APP_URL}chequelistno/${AccountNo}?acc=all`);
    const dataxs2 = await response2.json();
    const GetArray2 = dataxs2.data;
    setChequeNoListResult(await GetArray2);
  }
 


}

useEffect(() => {
if(AccountNo == undefined){
}else{
ChequeNoList(AccountNo);
}
console.log("AccountNo",AccountNo);
},[AccountNo == undefined ? '' : AccountNo]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(ChequeOutwardAction(1,12,IssueDate,ChequeDate,ChequeNo,ChequeStatus,AccountNo,ChequeAmount,Title,AuthData.company_id));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1;
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  dispatch(ChequeOutwardAction(currentPage,12,IssueDate,ChequeDate,ChequeNo,ChequeStatus,AccountNo,ChequeAmount,Title,AuthData.company_id));
  
  }

console.log("ChequeNoListResult",ChequeNoListResult);

const ChequeAmountAct = (e) => {
  let val = e.target.value;
  val = val.replace(/\D/g,"");
  val = val.replace(/(\d)(\d{3})$/,"$1,$2");
  val = val.replace(/(?=(\d{3})+(\D))\B/g,", ");
  setChequeAmount(val);
}


const DeleteChequeOutward = (id) => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
      if (window.confirm("Do You Want to Delete this Record?")){

        fetch(`${actionConfig.REACT_APP_URL}chequeoutwardregister/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(dataex => {
          console.log("dataex",dataex);
          if(dataex.code == '200'){
            Swal.fire(
              'Good job!',
              dataex.message,
              'success'
            );
            dispatch(ChequeOutwardAction(1,12,IssueDate,ChequeDate,ChequeNo,ChequeStatus,AccountNo,ChequeAmount,Title,AuthData.company_id));
            navigate("/list-cheque-outward-register");
             
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
<h2 className="hk-pg-title font-weight-600">Cheque Outward Register List</h2>
</div>
<div>
<NavLink to="/add-cheque-outward-register" className="btn btn-primary btn-rounded btn-sm">Add New Cheque Outward Register</NavLink>
</div>

</div>

<div class="row pb-3">

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Issue Date</label>
  <input type="date" class="form-control" name="issueDate" placeholder="Issue Date" autocomplete="off" onChange={e=>setIssueDate(e.target.value)} value={IssueDate}/> 
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Check Date</label>
  <input type="date" class="form-control" name="checkDate" placeholder="Title" autocomplete="off" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate}/> 
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Title</label>
  <input type="text" class="form-control" name="Title" placeholder="Title" autocomplete="off" onChange={e=>setTitle(e.target.value)} value={Title}/> 
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Amount</label>
  <input type="text" class="form-control" name="ChequeAmount" placeholder="Amount" autocomplete="off" onChange={(e)=>ChequeAmountAct(e)} value={ChequeAmount}/> 
</div>

<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Account No</label>
    <select name="AccountNo" id="" className="form-control" onChange={e=>setAccountNo(e.target.value)} value={AccountNo}>
    <option value="">Select Account No</option>
    {

    resultBankList.data == null ? (
    <>Loading.....</>
    ):(

    resultBankList.data.length > 0 ? (
      resultBankList.data.map((curElem , index) => {

    return (
    <option value={curElem.id}>{curElem.accountno} ({curElem.bankname}) ({curElem.title})</option>
    )


    })

    ): (
    <>
    </>
    )

    )

    }
  </select>
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Cheque No</label>
        <select name="chequeNo" id="chequeNo" className="form-control" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo}>
        <option value="">Selected Cheque No</option>
        {

        ChequeNoListResult  == undefined || ChequeNoListResult.length == 0 ? (
        <>Loading.....</>
        ):(
            ChequeNoListResult.map((curElem , index) => {

            return (
            <option value={curElem.id}>{curElem.chequeNo}</option>
            )
            

            })

            )

        }
    </select>
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Status</label>
  <select name="Status" id="" className="form-control" onChange={e=>setChequeStatus(e.target.value)} value={ChequeStatus}>
    <option value="">Select All</option>
    <option value="Released">Uncleared</option>
    <option value="Cleared">Cleared</option>
    <option value="Hold">Hold</option>
    <option value="Stop">Stop</option>
    <option value="Cancelled">Cancelled</option>
  </select>
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
          <th width={200}>Issue Date</th>
          <th>Cheque No</th>
          <th width={200}>Cheque Date</th>
          <th>Amount</th>
          <th>Issued To</th>
          <th>Purpose</th>
          <th>Cheque Status</th>
          <th>Cleared Date</th>

          <th>Title</th>
          <th>Bank Name</th>
          <th>Branch Name</th>
          <th width={200}>Account No</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultChequeOutWordList.data == null ? (
  <>Loading.....</>
):(

  resultChequeOutWordList.data.length > 0 ? (
    resultChequeOutWordList.data.map((curElem , index) => {

return (
    <tr>

        <td>{curElem.issueDateC}</td>
        <td>{curElem.Chequelist == '' || curElem.Chequelist == null ? '' : curElem.Chequelist.chequeNo}</td>
        <td>{curElem.chequeDateC}</td>
        <td>{curElem.chequeAmount}</td>
        <td>{curElem.IssuedTo}</td>
        <td>{curElem.Purpose}</td>
        <td>{curElem.Chequelist == '' || curElem.Chequelist == null ? '' : curElem.Chequelist.cheqStatus == 'Released' ? 'Uncleared' : curElem.Chequelist.cheqStatus}</td>
        <td>{curElem.clearedDate}</td>

        <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.title}</td>
        <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.bankname}</td>
        <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.branch}</td>
        <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.accountno}</td>
        
        <td style={{width:200}}>
        <NavLink to={`/add-cheque-outward-register/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteChequeOutward(curElem.id)}>Delete</button>
        <NavLink to={`/cheque-outward-voucher/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">Print Voucher</button></NavLink>
        </td>
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
pageCount={Math.ceil(resultChequeOutWordList.TotalCount/12)}
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

export default ChequeOutWardList