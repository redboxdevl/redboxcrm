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

const AddPurchaseRequest = () => {

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
const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3);

const AssetRegister = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 153 && edx.sub_features === 'Import');

const [SingleRes,setSingleRes]= useState([]);
const [BankListResult,setBankListResult]=useState([]);
const [ItemResult,setItemResult]=useState([]);

const [DateOfCash,setDateOfCash]=useState(CurrentDate);
const [CompanyId,setCompanyId]=useState('');
const [CashAmount,setCashAmount]=useState('0');
const [ModeOfPayment,setModeOfPayment]=useState('');
const [ChequeNo,setChequeNo]=useState('0');
const [ChequeDate,setChequeDate]=useState(CurrentDate);
const [BankId,setBankId]=useState('-');
const [RequestType,setRequestType]=useState('-');
const [DateOfRequest,setDateOfRequest]=useState(CurrentDate);
const [DepartmentId,setDepartmentId]=useState('-');
const [Purpose,setPurpose]=useState('-');
const [EstimatedBudget,setEstimatedBudget]=useState('0');
const [RequiredDate,setRequiredDate]=useState(CurrentDate);
const [BalanaceAmount,setBalanaceAmount]=useState('0');
const [CurrentSalary,setCurrentSalary]=useState('0');
const [RequestedAmount,setRequestedAmount]=useState('0');
const [TransferFrom,setTransferFrom]=useState('-');
const [TransferTo,setTransferTo]=useState('-');
const [PriorityId,setPriorityId]=useState('-');
const [Status,setStatus]=useState('0');
const [otherRequestType,setotherRequestType]=useState('');
const [DisbursedAmt,setDisbursedAmt]=useState('0');
const [LoadingS,setLoadingS]=useState(false);
const [AttachementImage,setAttachementImage]=useState('-');


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

const [inputList, setinputList]= useState([{ItemId:'',ItemName:'-',ItemQty:'0',ItemCost:'0',TotalCost:'0',status:'0'}]);
const [inputListSchedule, setinputListSchedule]= useState([{ScheduleId:'',RepaymentAmount:'0',RepaymentDate:'-'}]);

const handleinputchangeData=(e, index)=>{
  const {name, value}= e.target;
  const list= [...inputList];
  list[index][name]= value;
  setinputList(list);
}

const handleRepaymentinputchangeData=(e, index)=>{
  const {name, value}= e.target;
  const list= [...inputListSchedule];
  list[index][name]= value;
  setinputListSchedule(list);
}
  
const handleaddclick=()=>{ 
setinputList([...inputList, {ItemId:'',ItemName:'-',ItemQty:'0',ItemCost:'0',TotalCost:'0',status:'0'}]);
}

const handleaddScheduleclick=()=>{ 
  setinputListSchedule([...inputListSchedule, {ScheduleId:'',RepaymentAmount:'0',RepaymentDate:'-'}]);
  }

const handleremove= (index,x)=>{

  if (window.confirm("Do You Want to Delete this Record?")){
    
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
    console.log("index",x.ItemId);
    
    const formData = new FormData();
    formData.append('ItemId',x.ItemId);

    const requestOptions = {
    method: 'POST',
    body: formData
    };

    fetch(`${actionConfig.REACT_APP_URL}itemdetails`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
    console.log("dataex",dataex);
    if(dataex.code == '200'){
    Swal.fire(
    'Good job!',
    dataex.message,
    'success'
    );
    navigate("/purchase-request-form-list");
    setLoadingS(false);

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

const handleScheduleremove= index=>{
  const list=[...inputListSchedule];
  list.splice(index,1);
  setinputListSchedule(list);
  }

useEffect(() => {
dispatch(getDashCountData('all',''));
},[]);

const [CompaniesResult,setCompaniesResult]= useState([]);

const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setCompaniesResult(await GetArray);
}


const ListItemType = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}itemtype?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setItemResult(await GetArray);
  }
  

const SinglePettyCashRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}purchasereqform/${id}`);
const dataxs = await response.json();
setSingleRes(await dataxs.data[0]);
const finalItems = dataxs.data[0];
// setAssetId(dataxs.data[0].id);
setRequestType(finalItems.reqtypeId);
setDateOfRequest(finalItems.dateofReq);
setDepartmentId(finalItems.departmentId);
setPurpose(finalItems.Purpose);
setEstimatedBudget(finalItems.EstimatedBudget);
setRequiredDate(finalItems.RequiredDate);
setBalanaceAmount('');
setCurrentSalary(finalItems.CurrentSalary);
setRequestedAmount(finalItems.RequestedAmount);
setTransferFrom(finalItems.TransferFrom);
setTransferTo(finalItems.TransferTo);
setPriorityId(finalItems.PriorityId);
setStatus(finalItems.status);
setDisbursedAmt(finalItems.DisbursedAmt);

// setDateOfCash(finalItems.dateOfCash);
// setCompanyId(finalItems.CompanyId);
// setCashAmount(finalItems.CashAmount);
// setModeOfPayment(finalItems.ModeOfPayment);
// setChequeNo(finalItems.ChequeNo);
// setChequeDate(finalItems.ChhequeDate);
// setBankId(finalItems.BankId);
// setBalanaceAmount(finalItems.balanceAmountFormat);

setinputList(finalItems.getitemsDetails == '[]' || finalItems.getitemsDetails == '' ? [{ItemId:'',ItemName:'-',ItemQty:'0',ItemCost:'0',TotalCost:'0',status:'0'}] : JSON.parse(finalItems.getitemsDetails));

setinputListSchedule(finalItems.getRepaymentSchedule == '[]' || finalItems.getRepaymentSchedule == '' ? [{ScheduleId:'',RepaymentAmount:'0',RepaymentDate:'-'}] : JSON.parse(finalItems.getRepaymentSchedule));

}

useEffect(() => {
if(id == undefined){
}else{
 SinglePettyCashRecords(id);
}
},[id == undefined ? '' : id]);

useEffect(() => {
ListCompanies();
ListItemType();
},[]);

const AddNewPurchaseForm = (e) => {
e.preventDefault();

const AuthData = JSON.parse(localStorage.getItem('authdata'));
setLoadingS(true);
const formData = new FormData();

formData.append('agentId',AuthData.id);
formData.append('reqtypeId',RequestType);
formData.append('otherrequestTypeId', otherRequestType == null || otherRequestType == '' ? '0' : otherRequestType);
formData.append('dateofReq',DateOfRequest);
formData.append('departmentId',DepartmentId);
formData.append('Purpose',Purpose);
formData.append('EstimatedBudget',EstimatedBudget);
formData.append('RequiredDate',RequiredDate);
formData.append('CurrentSalary',CurrentSalary);
formData.append('RequestedAmount',RequestedAmount);
formData.append('TransferFrom',TransferFrom);
formData.append('TransferTo',TransferTo);
formData.append('PriorityId',PriorityId);
formData.append('status',Status);
formData.append('DisbursedAmt',DisbursedAmt);
formData.append('AttachementImage',AttachementImage);
formData.append('company_id',AuthData.company_id);
formData.append('inputList',RequestType == 3 || RequestType == 5 ? '' : JSON.stringify(inputList));
formData.append('inputListSchedule',RequestType == 3 || RequestType == 5 ? JSON.stringify(inputListSchedule) : '');



const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}purchasereqform`, requestOptions)
.then(response => response.json())
.then(dataex => {
  console.log("dataex",dataex);
if(dataex.code == '200'){
Swal.fire(
  'Good job!',
  dataex.message,
  'success'
);
navigate("/purchase-request-form-list");
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

const UpdatePurchaseForm = (e) => {
e.preventDefault();

// setLoadingS(true);

const AuthData = JSON.parse(localStorage.getItem('authdata'));
setLoadingS(true);
const formData = new FormData();

formData.append('agentId',AuthData.id);
formData.append('reqtypeId',RequestType);
formData.append('otherrequestTypeId', otherRequestType == null || otherRequestType == '' ? '0' : otherRequestType);
formData.append('dateofReq',DateOfRequest);
formData.append('departmentId',DepartmentId);
formData.append('Purpose',Purpose);
formData.append('EstimatedBudget',EstimatedBudget);
formData.append('RequiredDate',RequiredDate);
formData.append('CurrentSalary',CurrentSalary);
formData.append('RequestedAmount',RequestedAmount);
formData.append('TransferFrom',TransferFrom);
formData.append('TransferTo',TransferTo);
formData.append('PriorityId',PriorityId);
formData.append('status',Status);
formData.append('DisbursedAmt',DisbursedAmt);
formData.append('AttachementImage',AttachementImage);
formData.append('inputList',RequestType == 3 || RequestType == 5 ? '' : JSON.stringify(inputList));
formData.append('inputListSchedule',RequestType == 3 || RequestType == 5 ? JSON.stringify(inputListSchedule) : '');
formData.append('company_id',AuthData.company_id);
formData.append('_method', 'PATCH');

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}purchasereqform/${id}`, requestOptions)
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
navigate("/purchase-request-form-list");
  
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
  
const changeHandler = (event) => {
  setAttachementImage(event.target.files[0]);
};


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Purchase Requirement Form</h2>

</div>
<div class="d-flex">
<NavLink to="/purchase-request-form-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form  onSubmit={id == null ? AddNewPurchaseForm : UpdatePurchaseForm}>
<div class="row">

<div className="form-group col-md-3">
<label htmlFor="">Requirement Item Type*</label>
<select name="RequestType" id="" className="form-control" onChange={e=>setRequestType(e.target.value)} value={RequestType} required>
<option value="">Select Option</option>
{
ItemResult && ItemResult.map((item,key) => {
return (
  <option value={item.id}>{item.typeTitle}</option>
)
})
}
{SUperFinance.length == 0 ? '' : <option value="others">Others</option>}
</select>
</div>

<div class={`form-group col-md-2 ${RequestType == 'others' ? `d-block` : `d-none`}`}>
  <label for="inputPassword4">Other Request Item Type*</label>
  <input type="text" class="form-control" name="otherRequestType" placeholder="Other Request Type" autocomplete="off" onChange={e=>setotherRequestType(e.target.value)} value={otherRequestType}/> 
  </div>

<div className="form-group col-md-3">
<label htmlFor="">Date Of Requirement*</label>
<input type="date" name="DateOfRequest" id="" className="form-control" onChange={e=>setDateOfRequest(e.target.value)} value={DateOfRequest} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Department*</label>
<select name="DepartmentId" id="" className="form-control" onChange={e=>setDepartmentId(e.target.value)} value={DepartmentId} required>
<option value="">Select Department</option>
{
CompaniesResult && CompaniesResult.map((item,key) => {
return (
  <option value={item.id}>{item.department_name}</option>
)
})
}
</select>
</div>

<div className={`form-group col-md-3`}>
<label htmlFor="">Purpose</label>
<input type="text" name="Purpose" id="" className="form-control" onChange={e=>setPurpose(e.target.value)} value={Purpose} />
</div>

<div className={`form-group col-md-3`}>
<label htmlFor="">Estimated Budget</label>
<input type="number" name="EstimatedBudget" id="" className="form-control" onChange={e=>setEstimatedBudget(e.target.value)} value={EstimatedBudget} />
</div>

<div className={`form-group col-md-3`}>
<label htmlFor="">Required Date</label>
<input type="date" name="RequiredDate" id="" className="form-control" onChange={e=>setRequiredDate(e.target.value)} value={RequiredDate} />
</div>

<div className={`form-group col-md-3 ${RequestType == 3 || RequestType == 5 ? '':'d-none'}`}>
<label htmlFor="">Current Salary</label>
<input type="number" name="CurrentSalary" id="" className="form-control" onChange={e=>setCurrentSalary(e.target.value)} value={CurrentSalary} />
</div>

<div className={`form-group col-md-3 ${RequestType == 3 || RequestType == 5 ? '':'d-none'}`}>
<label htmlFor="">Requested Amount</label>
<input type="number" name="RequestedAmount" id="" className="form-control" onChange={e=>setRequestedAmount(e.target.value)} value={RequestedAmount} />
</div>

<div className={`form-group col-md-3 ${RequestType == 2 ? '':'d-none'}`}>
<label htmlFor="">Transfer From</label>
<input type="text" name="TransferFrom" id="" className="form-control" onChange={e=>setTransferFrom(e.target.value)} value={TransferFrom} />
</div>

<div className={`form-group col-md-3 ${RequestType == 2 ? '':'d-none'}`}>
<label htmlFor="">Transfer To</label>
<input type="text" name="TransferTo" id="" className="form-control" onChange={e=>setTransferTo(e.target.value)} value={TransferTo} />
</div>


<div className="form-group col-md-3">
<label htmlFor="">Priority*</label>
<select name="PriorityId" id="" className="form-control" onChange={e=>setPriorityId(e.target.value)} value={PriorityId} required>
<option value="">Select Priority</option>
<option value="Most Urgent">Most Urgent</option>
<option value="Urgent">Urgent</option>
<option value="Normal">Normal</option>
</select>
</div>

<div className="form-group col-md-3">
    <label htmlFor="">Attachement</label>
    <input type="file" name="AttachementFile" className="form-control" onChange={changeHandler} />

    {/* {
    id == null ? (
      <></>
    ):(
      
      AssetImageExtension == 'jpg' || AssetImageExtension == 'png' ||  AssetImageExtension == 'webp' ||  AssetImageExtension == 'jpeg' ? (
        <><img src={`${actionConfig.REACT_APP_MAIN}${AssetImage}`} width="50" /></>
      ):(
        <a href={`${actionConfig.REACT_APP_MAIN}${AssetImage}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>
      )
      

    
    )
  } */}
  </div>

{
 SuperCon.length == 0 && AuthData.Hod == 'no' && SUperFinance.length == 0 ? (
    <></>
  ):(
    <div className="form-group col-md-3">
      <label htmlFor="">Status</label>
      <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status} required>
      <option value="">Select Status</option>
      
      {SuperCon.length == 0 ? <><option value="0">Pending</option>
      <option value="1">Authorized</option> </> : <><option value="2">Approved</option> <option value="4">Rejected</option></>}
      {AuthData.Hod == 'yes' ? <option value="4">Rejected</option> : '' }
      {SUperFinance.length == 0 ? '' : <option value="3">Disbursed</option>}

      </select>
      </div>
  )
}

<div className={`form-group col-md-3 ${Status == 3 ? '':'d-none'}`}>
<label htmlFor="">Disbursed Amount</label>
<input type="text" name="DisbursedAmt" id="" className="form-control" onChange={e=>setDisbursedAmt(e.target.value)} value={DisbursedAmt} />
</div>

    <div className="col-md-12">
       
<h4 className='pb-2'>{RequestType == 3 || RequestType == 5 ? 'Repayment Schedule' : 'Input Details'}</h4>

{
  RequestType == 3 || RequestType == 5 ? (
    <><table className='table table-striped table-bordered'>
    <thead>
    <tr>
      
      <th>Repayment Amount</th>
      <th>Repayment Date</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    { 
    inputListSchedule.map( (x,i)=>{
    return(
    <tr>
      
      <td>
      <div className="form-group">
        {
          <input type="number" name="RepaymentAmount" id="" className="form-control" onChange={ e=>handleRepaymentinputchangeData(e,i)} placeholder="" dataId={x.id} value={x.RepaymentAmount} />
        }
      </div>
      </td>
      <td>
      <div className="form-group">
        {
          <input type="date" name="RepaymentDate" id="" className="form-control" onChange={ e=>handleRepaymentinputchangeData(e,i)} dataId={x.id} value={x.RepaymentDate} />
        }
      </div>
      </td>
      
      <td width={200}>
        {
          inputListSchedule.length!==1 &&
          <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleScheduleremove(i)}>Remove</button>
        }
        { inputListSchedule.length-1===i &&
            <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddScheduleclick}>Add Row</button>
        }
    
        {/* {
          id == '' || id == null || id == undefined ? (
            <></>
          ):(
            <Link to={`/petty-cash-voucher/${x.payEntryId}`}><button type="button" class="btn btn-block btn-secondary btn-sm">Print Voucher</button></Link>
          )
        } */}
      </td>
    </tr>
    )
    } )}
    </tbody>
    </table></>
  ):(
    <>
    <table className='table table-striped table-bordered'>
<thead>
<tr>
  
  <th>Item Name</th>
  <th>QTY</th>
  <th>Unit Cost</th>
  <th>Total Cost</th>
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
      x.status == 0 ? <input type="text" name="ItemName" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="" dataId={x.id} value={x.ItemName} /> : <input type="text" name="ItemName" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="" dataId={x.id} value={x.ItemName} disabled />
    }
  </div>
  </td>
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="number" name="ItemQty" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.ItemQty} /> : <input type="number" name="ItemQty" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.ItemQty} disabled />
    }
  </div>
  </td>
  
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="number" name="ItemCost" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.ItemCost} /> : <input type="number" name="ItemCost" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.ItemCost} disabled />
    }
    
  </div>
  </td>
  <td>
  <div className="form-group">
    {
      x.status == 0 ? <input type="text" name="TotalCost" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.TotalCost} disabled /> : <input type="text" name="TotalCost" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.TotalCost} disabled />
    }
  </div>
  </td>
  <td width={200}>
    {
      inputList.length!==1 &&
      <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i,x)}>Remove</button>
    }
    { inputList.length-1===i &&
        <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
    }

    {/* {
      id == '' || id == null || id == undefined ? (
        <></>
      ):(
        <Link to={`/petty-cash-voucher/${x.payEntryId}`}><button type="button" class="btn btn-block btn-secondary btn-sm">Print Voucher</button></Link>
      )
    } */}
  </td>
</tr>
)
} )}
</tbody>
</table>
    </>
  )
}



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

export default AddPurchaseRequest