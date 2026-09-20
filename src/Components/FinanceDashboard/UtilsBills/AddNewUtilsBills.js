import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import { BankListAction } from '../../../redux/action/BankListAction';
import moment from 'moment/moment';

const AddNewUtilsBills = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultDashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [ChequeResult,setChequeResult]= useState([]);
  const [ChequeListResult,setChequeListResult]= useState([]);
  const [BillsListResult,setBillsListResult]= useState([]);

  
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [CuDate,setCuDate]=useState(CurrentDate);
  const [AccountNo,setAccountNo]=useState('0');
  const [AccountTitle,setAccountTitle]=useState('-');
  const [BankName,setBankName]=useState('-');
  const [BranchName,setBranchName]=useState('-');
  const [StartSerialNo,setStartSerialNo]=useState('');
  const [EndSerialNo,setEndSerialNo]=useState('');
  const [NoofCheque,setNoofCheque]=useState('0');


  const [CompanyId,setCompanyId]=useState('');
  const [BilltypeId,setBilltypeId]=useState('');
  const [BillDate,setBillDate]=useState(CurrentDate);
  const [BillNo,setBillNo]=useState('0');
  const [BillAmount,setBillAmount]=useState('0');
  const [otherBilltypeId,setotherBilltypeId]=useState('');
  const [Beneficiary,setBeneficiary]=useState('');
  const [DueDate,setDueDate]=useState(CurrentDate);
  const [AssetImage1,setAssetImage1]=useState('');
  const [BillMonth,setBillMonth]=useState('');
  const [PaidAmount,setPaidAmount]=useState('');
  const [LastpaymentDate,setLastpaymentDate]=useState('');

  

  const [LoadingS,setLoadingS]=useState(false);
  const [Status,setStatus]=useState(false);

  const [CompaniesResult,setCompaniesResult]= useState([]);
  const [BillsTYpeResult,setBillsTYpeResult]= useState([]);

  const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
  }

  const ListBillType = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}billstype`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBillsTYpeResult(await GetArray);
    }

  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
    ListCompanies();
    ListBillType();
},[]);

const SingleNewBillsList = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}finbills/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setBillsListResult(await GetArray3);

  console.log("BillsListResult",BillsListResult);

  setCompanyId(GetArray3.companyId);
  setBilltypeId(GetArray3.billTypeId);
  setBillDate(GetArray3.billDate);
  setBillNo(GetArray3.billNo);
  setBillAmount(GetArray3.BillAmount);
  setBeneficiary(GetArray3.Beneficiary);
  setDueDate(GetArray3.dueDate);
  setStatus(GetArray3.status);
  setBillMonth(GetArray3.BillMonth);
  setPaidAmount(GetArray3.PaidAmount);
  setLastpaymentDate(GetArray3.LastpaymentDate);
  
  // setAccountNo(GetArray3.AccountNoId);
  // setStartSerialNo(GetArray3.SerialStart);
  // setEndSerialNo(GetArray3.SerialEnd);
  // setStatus(GetArray3.status);

  }

  const changeHandler2 = (event) => {
    setAssetImage1(event.target.files[0]);
  };

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewBillsList(id);
    }
},[id == undefined || id == null ? '' : id]);



  const AddNewBills = (e) => {
    
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('companyId',CompanyId);
    formData.append('billTypeId',BilltypeId);
    formData.append('otherbillTypeId', otherBilltypeId == null || otherBilltypeId == '' ? '0' : otherBilltypeId);
    formData.append('Beneficiary',Beneficiary);
    formData.append('billDate',BillDate);
    formData.append('billNo',BillNo);
    formData.append('dueDate',DueDate);
    formData.append('BillAmount',BillAmount);
    formData.append('AssetImage1',AssetImage1);
    formData.append('BillMonth',BillMonth);
    formData.append('PaidAmount',PaidAmount);
    formData.append('LastpaymentDate',LastpaymentDate);
    formData.append('company_id',AuthData.company_id);
    formData.append('status',0);
    
    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}finbills`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/bills-list");
          setLoadingS(false);
           
        }else if(dataex.code == '201'){
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
          setLoadingS(false);
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
    });

  }


  const UpdateNewBills = (e) => {

    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    // setLoadingS(true);
  
    const formData = new FormData();
    
    formData.append('companyId',CompanyId);
    formData.append('billTypeId',BilltypeId);
    formData.append('otherbillTypeId', otherBilltypeId == null || otherBilltypeId == '' ? '0' : otherBilltypeId);
    formData.append('Beneficiary',Beneficiary);
    formData.append('billDate',BillDate);
    formData.append('billNo',BillNo);
    formData.append('dueDate',DueDate);
    formData.append('status',Status);
    formData.append('BillAmount',BillAmount);
    formData.append('AssetImage1',AssetImage1);
    formData.append('BillMonth',BillMonth);
    formData.append('PaidAmount',PaidAmount);
    formData.append('LastpaymentDate',LastpaymentDate);
    formData.append('company_id',AuthData.company_id);
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}finbills/${id}`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          setLoadingS(false);
          navigate("/bills-list");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
      });

  }

console.log("resultDashboard",resultDashboard);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Payables</h2>

</div>
<div class="d-flex">
<NavLink to="/bills-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddNewBills : UpdateNewBills}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Company</label>
    <select name="CompanyId" id="" className="form-control" onChange={e=>setCompanyId(e.target.value)} value={CompanyId}>
      <option value="">Select Company</option>
      {
      CompaniesResult && CompaniesResult.map((item,key) => {
      return (
        <option value={item.id}>{item.company_name}</option>
      )
      })
      }
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill Type</label>
    <select name="BilltypeId" id="" className="form-control" onChange={e=>setBilltypeId(e.target.value)} value={BilltypeId}>
      <option value="">Select Bill Type</option>
      {
      BillsTYpeResult && BillsTYpeResult.map((item,key) => {
      return (
        <option value={item.id}>{item.typeTitle}</option>
      )
      })
      }
      <option value="others">Others</option>
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill Month</label>
    <select name="BillMonth" id="" className="form-control" onChange={e=>setBillMonth(e.target.value)} value={BillMonth}>
      <option value="">Select Bill Month</option>
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

  <div class={`form-group col-md-4 ${BilltypeId == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Asset Type*</label>
  <input type="text" class="form-control" name="otherBilltypeId" placeholder="Other Bill Type" autocomplete="off" onChange={e=>setotherBilltypeId(e.target.value)} value={otherBilltypeId}/> 
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Beneficiary</label>
    <input type="text" name="Beneficiary" className="form-control" onChange={e=>setBeneficiary(e.target.value)} value={Beneficiary} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill Date</label>
    <input type="date" name="BillDate" className="form-control" onChange={e=>setBillDate(e.target.value)} value={BillDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Due Date</label>
    <input type="date" name="DueDate" className="form-control" onChange={e=>setDueDate(e.target.value)} value={DueDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill No</label>
    <input type="number" name="BillNo" className="form-control" onChange={e=>setBillNo(e.target.value)} value={BillNo} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill Amount</label>
    <input type="number" name="BillAmount" className="form-control" onChange={e=>setBillAmount(e.target.value)} value={BillAmount} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bill Attachement</label>
    <input type="file" name="billAttachment" className="form-control" onChange={changeHandler2} />
  
    {
    id == null ? (
      <></>
    ):(

      BillsListResult.billattachement == null ? '' : <a href={`${actionConfig.REACT_APP_MAIN}${BillsListResult.billattachement}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>

    
    )
  }
  </div>

{
  id == null || id == '' ? '' : <div className="form-group col-md-4">
  <label htmlFor="">Status</label>
  <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
    <option value="" selected>Select Status</option>
    <option value="0">Pending</option>
    <option value="1">Paid</option>
    <option value="2">Partial Paid</option>
  </select>
</div>
}

<div className={`form-group col-md-4 ${Status == 1 || Status == 2 ? '' : 'd-none'}`}>
<label htmlFor="">Paid Amount</label>
<input type="number" name="PaidAmount" className="form-control" onChange={e=>setPaidAmount(e.target.value)} value={PaidAmount} />
</div>


<div className={`form-group col-md-4 ${Status == 1 || Status == 2 ? '' : 'd-none'}`}>
<label htmlFor="">Last Payment Date</label>
<input type="date" name="LastpaymentDate" className="form-control" onChange={e=>setLastpaymentDate(e.target.value)} value={LastpaymentDate} />
</div>

  
</div>
{
  LoadingS == true ? <button type="submit" class="btn btn-primary" disabled>{id == null ? 'Submit':'Update'}</button> : <button type="submit" class="btn btn-primary">{id == null ? 'Submit':'Update'}</button>
  }


</form>
</div>
</section>
</div>
</div>

</section>
</div>
</div>

</div>
</>
)
}

export default AddNewUtilsBills