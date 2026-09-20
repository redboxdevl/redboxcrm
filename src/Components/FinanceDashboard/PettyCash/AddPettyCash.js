import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams, Link } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import moment from 'moment/moment';
import { BankListAction } from '../../../redux/action/BankListAction';
import { InventoriesAction } from '../../../redux/action/InventoriesAction';
import InputMask from "react-input-mask";

const AddPettyCash = () => {

const navigate = useNavigate();
let { id } = useParams();

var CurrentDate = moment().format('YYYY-MM-DD');


const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));
const AuthData = JSON.parse(localStorage.getItem('authdata'));

const resultBankList = useSelector(state => state.Bankreducers.banklistdata);

const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);

const dispatch = useDispatch();

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

const HrCOn = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 16);
const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');
const SUperFinance = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);


const AssetRegister = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 153 && edx.sub_features === 'Import');

const [SingleRes,setSingleRes]= useState([]);
const [BankListResult,setBankListResult]=useState([]);

const [DateOfCash,setDateOfCash]=useState(CurrentDate);
const [CompanyId,setCompanyId]=useState('');
const [CashAmount,setCashAmount]=useState('0');
const [ModeOfPayment,setModeOfPayment]=useState('');
const [ChequeNo,setChequeNo]=useState('0');
const [ChequeDate,setChequeDate]=useState(CurrentDate);
const [BankId,setBankId]=useState('-');
const [BalanaceAmount,setBalanaceAmount]=useState('0');
const [Payee,setPayee]=useState('-');
const [LoadingS,setLoadingS]=useState(false);


const ListBankData = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}listbanks`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setBankListResult(await GetArray);
}

useEffect(() => {
dispatch(InventoriesAction());
dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
ListBankData();
},[]);

const [inputList, setinputList]= useState([{payEntryId:'',PayDate:'',PayDetails:'-',PayAmt:'0',PayTo:'-',status:'0'}]);

const handleinputchangeData=(e, index)=>{
  const {name, value}= e.target;
  const list= [...inputList];
  list[index][name]= value;
  setinputList(list);
}
  
const handleaddclick=()=>{ 
setinputList([...inputList, {payEntryId:'',PayDate:'',PayDetails:'-',PayAmt:'0',PayTo:'-',status:'0'}]);
}

const handleremove= (index,ex) =>{
  if(window.confirm('Do you want to Delete this record')){
    console.log("indexasd",ex);

    fetch(`${actionConfig.REACT_APP_URL}destroy2/${ex.payEntryId}`, { method: 'POST' })
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          // dispatch(GemerateMappingAction(1,12));
          navigate("/petty-cash-list");

          const list=[...inputList];
          list.splice(index,1);
          setinputList(list);
           
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

useEffect(() => {
dispatch(getDashCountData('all',''));
},[]);

const [CompaniesResult,setCompaniesResult]= useState([]);

const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setCompaniesResult(await GetArray);
}


const SinglePettyCashRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}pettycash/${id}`);
const dataxs = await response.json();
setSingleRes(await dataxs.data[0]);
const finalItems = dataxs.data[0];
// setAssetId(dataxs.data[0].id);

setDateOfCash(finalItems.dateOfCash);
setCompanyId(finalItems.CompanyId);
setCashAmount(finalItems.CashAmount);
setModeOfPayment(finalItems.ModeOfPayment);
setChequeNo(finalItems.ChequeNo);
setChequeDate(finalItems.ChhequeDate);
setBankId(finalItems.BankId);
setBalanaceAmount(finalItems.balanceAmountFormat);
setPayee(finalItems.Payee);

setinputList(finalItems.PettyCashEntry == '[]' || finalItems.PettyCashEntry == '' ? [{payEntryId:'',PayDate:'',PayDetails:'-',PayAmt:'0',PayTo:'-',status:'0'}] : JSON.parse(finalItems.PettyCashEntry));



}

useEffect(() => {
if(id == undefined){
}else{
 SinglePettyCashRecords(id);
}
},[id == undefined ? '' : id]);

useEffect(() => {
ListCompanies();
},[]);

const AddNewPettyForm = (e) => {
e.preventDefault();

const AuthData = JSON.parse(localStorage.getItem('authdata'));
setLoadingS(true);
const formData = new FormData();

formData.append('agentId',AuthData.id);
formData.append('DateOfCash',DateOfCash);
formData.append('CompanyId',CompanyId);
formData.append('CashAmount',CashAmount);
formData.append('ModeOfPayment',ModeOfPayment);
formData.append('ChequeNo',ChequeNo);
formData.append('ChequeDate',ChequeDate);
formData.append('BankId',BankId);
formData.append('Payee',Payee);
formData.append('company_id',AuthData.company_id);
formData.append('payDetails',JSON.stringify(inputList));

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}pettycash`, requestOptions)
.then(response => response.json())
.then(dataex => {
  console.log("dataex",dataex);
if(dataex.code == '200'){
Swal.fire(
  'Good job!',
  dataex.message,
  'success'
);
navigate("/petty-cash-list");
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

const UpdatePettyForm = (e) => {
e.preventDefault();
const AuthData = JSON.parse(localStorage.getItem('authdata'));
setLoadingS(true);

const formData = new FormData();

formData.append('DateOfCash',DateOfCash);
formData.append('CompanyId',CompanyId);
formData.append('CashAmount',CashAmount);
formData.append('ModeOfPayment',ModeOfPayment);
formData.append('ChequeNo',ChequeNo);
formData.append('ChequeDate',ChequeDate);
formData.append('BankId',BankId);
formData.append('Payee',Payee);
formData.append('payDetails',JSON.stringify(inputList));
formData.append('company_id',AuthData.company_id);
formData.append('_method', 'PATCH');

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}pettycash/${id}`, requestOptions)
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
navigate("/petty-cash-list");
  
}else if(dataex.code == '203'){
  Swal.fire(
    'Error!',
    dataex.message,
    'error'
  );
  setLoadingS(false);
  // navigate("/petty-cash-list");
    
  }else{
Swal.fire(
  'Error!',
  dataex.message,
  'error'
);
}

});

}


const ChequeAmountAct = (e,i) => {
let val = e.target.value;
val = val.replace(/\D/g,"");
val = val.replace(/(\d)(\d{3})$/,"$1,$2");
val = val.replace(/(?=(\d{3})+(\D))\B/g,", ");

handleinputchangeData(e,i);
}
  

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Petty Cash</h2>

</div>
<div class="d-flex">
<NavLink to="/petty-cash-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form  onSubmit={id == null ? AddNewPettyForm : UpdatePettyForm}>
<div class="row">

<div className="form-group col-md-3">
<label htmlFor="">Date Of Cash*</label>
<input type="date" name="DateOfCash" id="" className="form-control" onChange={e=>setDateOfCash(e.target.value)} value={DateOfCash} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Company*</label>
<select name="CompanyId" id="" className="form-control" onChange={e=>setCompanyId(e.target.value)} value={CompanyId} required>
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

<div className="form-group col-md-3">
<label htmlFor="">Amount</label>
{
  id == '' || id == undefined || id == null ? <input type="number" name="CashAmount" id="" className="form-control" onChange={e=>setCashAmount(e.target.value)} value={CashAmount} /> : <input type="number" name="CashAmount" id="" className="form-control" onChange={e=>setCashAmount(e.target.value)} value={CashAmount} disabled />
}

</div>

<div className="form-group col-md-3">
<label htmlFor="">Mode Of Payment*</label>
<select name="ModeOfPayment" id="" className="form-control" onChange={e=>setModeOfPayment(e.target.value)} value={ModeOfPayment} required>
<option value="">Select Option</option>
<option value="Cash">Cash</option>
<option value="Cheque">Cheque</option>
<option value="Online">Online</option>
</select>
</div>

<div className={`form-group col-md-3 ${ModeOfPayment === 'Cash' || ModeOfPayment === '' ? 'd-none' : ''}`}>
<label htmlFor="">Cheque No</label>
<input type="text" name="ChequeNo" id="" className="form-control" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo} />
</div>

<div className={`form-group col-md-3 ${ModeOfPayment === 'Cash' || ModeOfPayment === '' ? 'd-none' : ''}`}>
<label htmlFor="">Cheque Date</label>
<input type="date" name="ChequeDate" id="" className="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate} />
</div>

<div className={`form-group col-md-3 ${ModeOfPayment === 'Cash' || ModeOfPayment === '' ? 'd-none' : ''}`}>
<label htmlFor="">Bank Name</label>
<select name="BankId" id="" className="form-control" onChange={e=>setBankId(e.target.value)} value={BankId} >
    <option value="">Select Option</option>
    {
        BankListResult && BankListResult.map((item,key) => {
          return (
            <option value={item.id}>{item.banktitle}</option>
          )
        })
      }
</select>
</div>

<div className={`form-group col-md-3`}>
<label htmlFor="">Payee / Beneficiary / Paid To</label>
<input type="text" name="Payee" id="" className="form-control" onChange={e=>setPayee(e.target.value)} value={Payee} />
</div>

{
  FinanceMode == '' ? (
    <></>
  ):(
    <div className="col-md-12">
       <div className="form-group">
       <input type="text" className="form-control" disabled placeholder={`Balance Amount - ${BalanaceAmount}`} />
       </div>
<h4 className='pb-2'>Payments Details</h4>
<table className='table table-striped table-bordered'>
<thead>
<tr>
  
  <th>Date</th>
  <th>Payment Details</th>
  <th>Amount</th>
  <th>Pay To</th>
  {SUperFinance.length == 0 ? '' : <th>Status</th> }
  <th>Action</th>
</tr>
</thead>
<tbody>
{ 
inputList.map( (x,i)=>{
return(
<tr>
  
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="date" name="PayDate" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="" dataId={x.id} value={x.PayDate} /> : <input type="date" name="PayDate" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="" dataId={x.id} value={x.PayDate} disabled />
    }
  </div>
  </td>
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="text" name="PayDetails" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.PayDetails} /> : <input type="text" name="PayDetails" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.PayDetails} disabled />
    }
  </div>
  </td>
  
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="number" name="PayAmt" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayAmt} /> : <input type="number" name="PayAmt" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayAmt} disabled />
    }
    
  </div>
  </td>
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="text" name="PayTo" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayTo} /> : <input type="text" name="PayTo" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayTo} disabled />
    }
  </div>
  </td>
  {SUperFinance.length == 0 ? '' : <td>
  <div className="form-group">
    {
      x.payEntryId == null || x.payEntryId == '' || x.payEntryId == undefined ? 
        <select name="status" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.status}>
          <option value="">Select Status</option>
          {x.status == 1 ? <option value="1" selected>Approved</option> : <option value="1">Approved</option> }
          {x.status == 0 ? <option value="0" selected>Pending</option> : <option value="0">Pending</option> }
        </select> :
        <select name="status" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.status}>
          <option value="">Select Status</option>
          {x.status == 1 ? <option value="1" selected>Approved</option> : <option value="1">Approved</option> }
          {x.status == 0 ? <option value="0" selected>Pending</option> : <option value="0">Pending</option> }
        </select>
    }
  </div>
  </td>
  }
  <td width={200}>
    {
      inputList.length!==1 &&
      <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i,x)}>Remove</button>
    }
    { inputList.length-1===i &&
        <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
    }

    {
      id == '' || id == null || id == undefined ? (
        <></>
      ):(
        <Link to={`/petty-cash-voucher/${x.payEntryId}`}><button type="button" class="btn btn-block btn-secondary btn-sm">Print Voucher</button></Link>
      )
    }
  </td>
</tr>
)
} )}
</tbody>
</table>
</div>
  )
}


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

export default AddPettyCash