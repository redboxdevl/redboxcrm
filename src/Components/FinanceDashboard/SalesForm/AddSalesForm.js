import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
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

const AddSalesForm = () => {

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



const AssetRegister = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 153 && edx.sub_features === 'Import');

const [SingleRes,setSingleRes]= useState([]);
const [BankListResult,setBankListResult]=useState([]);

const [Status,setStatus]=useState('');
const [PaymentType,setPaymentType]=useState('');

const [DateOfReciept,setDateOfReciept]=useState(CurrentDate);
const [ProjectId,setProjectId]=useState('');
const [CompanyId,setCompanyId]=useState('');
const [Size,setSize]=useState('-');
const [PropertyType,setPropertyType]=useState('');
const [PropertyNo,setPropertyNo]=useState('0');
const [BlockName,setBlockName]=useState('-');
const [CustomerName,setCustomerName]=useState('-');
const [Cnic,setCnic]=useState('-');
const [ContactNo,setContactNo]=useState('-');
const [Reference,setReference]=useState('');
const [ReferenceContactNo,setReferenceContactNo]=useState('-');
const [SaleAmount,setSaleAmount]=useState('0');
const [Discount,setDiscount]=useState('0');
const [Remarks,setRemarks]=useState('');
const [DateOfCost,setDateOfCost]=useState('');
const [AgentName,setAgentName]=useState('');
const [TotalCommission,setTotalCommission]=useState('');
const [Unit,setUnit]=useState('');
const [CategoryName,setCategoryName]=useState('');
const [DateOfSale,setDateOfSale]=useState('');


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


const [inputList, setinputList]= useState([{payRecieptEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',ReferenceId:'',TransferTo:'',PayAmt:''}]);
const [inputCommisisonList, setinputCommisisonList]= useState([{commissionId:'',agentName:'',sharePercentage:''}]);


const handleinputchangeData=(e, index)=>{
  const {name, value}= e.target;
  const list= [...inputList];
  list[index][name]= value;
  setinputList(list);
  }


const handlecommissioninputchangeData=(e, index)=>{
const {name, value}= e.target;
const list= [...inputCommisisonList];
list[index][name]= value;
setinputCommisisonList(list);
}

const handlecomissionaddclick=()=>{ 
  setinputCommisisonList([...inputCommisisonList, {commissionId:'',agentName:'',sharePercentage:''}]);
}

const handlecommissionremove= index=>{
  const list=[...inputCommisisonList];
  list.splice(index,1);
  setinputCommisisonList(list);
  }
  
  const handleaddclick=()=>{ 
  
    console.log("inputListTouqeer",inputList);
    setinputList([...inputList, {payRecieptEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',ReferenceId:'',TransferTo:'',PayAmt:''}]);
    
    }

const handleremove= index=>{
const list=[...inputList];
list.splice(index,1);
setinputList(list);
}



useEffect(() => {
dispatch(getDashCountData('all',''));
},[]);

useEffect(() => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  // console.log("AuthData",AuthData);
  // setAgentName(AuthData.emp_name)
},[]);

const [CompaniesResult,setCompaniesResult]= useState([]);
const [DepartmentResult,setDepartmentResult]= useState([]);

const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setCompaniesResult(await GetArray);
}


const ListDepartment = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setDepartmentResult(await GetArray);
}


const SinglePaymentRecieptsecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}saleformdata/${id}`);
const dataxs = await response.json();
setSingleRes(await dataxs.data[0]);
const finalItems = dataxs.data[0];
// setAssetId(dataxs.data[0].id);

setDateOfReciept(finalItems.dateOfReciept);
setDateOfSale(finalItems.dateOfSale);

setProjectId(finalItems.ProjectId);
setCompanyId(finalItems.CompanyId);
setSize(finalItems.Size);
setPropertyType(finalItems.PropTypeId);
setPropertyNo(finalItems.ProNo);
setBlockName(finalItems.BlockName);
setCustomerName(finalItems.CustomerName);
setCnic(finalItems.Cnic);
setContactNo(finalItems.ContactNo);
setReference(finalItems.Reference);
setReferenceContactNo(finalItems.ReferenceContactNo);
setSaleAmount(finalItems.SaleAmountVal);
setDiscount(finalItems.DiscountVal);
setRemarks(finalItems.Remarks);
setTotalCommission(finalItems.totalCommissionVal);
setCategoryName(finalItems.categoryName);
setUnit(finalItems.Unit);
setStatus(finalItems.status);
setAgentName(finalItems.salesConsultant);


console.log("transactionHistory",finalItems.transactionHistory)
setinputCommisisonList(finalItems.commissionHistory == '[]' || finalItems.commissionHistory == '' ? [{commissionId:'',agentName:'',sharePercentage:''}] : JSON.parse(finalItems.commissionHistory));

setinputList(finalItems.transactionHistory == '[]' || finalItems.transactionHistory == '' ? [{payRecieptEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',ReferenceId:'',TransferTo:'',PayAmt:''}] : JSON.parse(finalItems.transactionHistory));



}

useEffect(() => {
if(id == undefined){
}else{
SinglePaymentRecieptsecords(id);
}
},[id == undefined ? '' : id]);

useEffect(() => {
ListCompanies();
ListDepartment();
},[]);

const AddNewSalesForm = (e) => {
e.preventDefault();

const AuthData = JSON.parse(localStorage.getItem('authdata'));

// setLoadingS(true);
const formData = new FormData();

formData.append('agentId',AuthData.id);
formData.append('projectId',ProjectId);
formData.append('typeId',PropertyType);
formData.append('propertyNo',PropertyNo);
formData.append('Size',Size);
formData.append('sizeType',Unit);
formData.append('categoryName',CategoryName);
formData.append('SaleAmount',SaleAmount);
formData.append('Discount',Discount);
formData.append('customerName',CustomerName);
formData.append('Cnic',Cnic);
formData.append('contactNo',ContactNo);
formData.append('totalCommission',TotalCommission);
formData.append('commissionlist',JSON.stringify(inputCommisisonList));
formData.append('transactionlist',FinanceMode == '' ? '' : JSON.stringify(inputList));
formData.append('CompanyId',CompanyId);
formData.append('blockName',BlockName);
formData.append('dateOfSale',DateOfSale);
formData.append('ReferenceContactNo',ReferenceContactNo);
formData.append('salesConsultant',AgentName);
formData.append('company_id',AuthData.company_id);

formData.append('status','pending');


const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}saleformdata`, requestOptions)
.then(response => response.json())
.then(dataex => {
console.log("dataex",dataex);
if(dataex.code == '200'){
Swal.fire(
  'Good job!',
  dataex.message,
  'success'
);
navigate("/sales-form-list");
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

const UpdateSalesForm = (e) => {
e.preventDefault();

// setLoadingS(true);
const AuthData = JSON.parse(localStorage.getItem('authdata'));
const formData = new FormData();

formData.append('projectId',ProjectId);
formData.append('typeId',PropertyType);
formData.append('propertyNo',PropertyNo);
formData.append('Size',Size);
formData.append('sizeType',Unit);
formData.append('categoryName',CategoryName);
formData.append('SaleAmount',SaleAmount);
formData.append('Discount',Discount);
formData.append('customerName',CustomerName);
formData.append('Cnic',Cnic);
formData.append('contactNo',ContactNo);
formData.append('totalCommission',TotalCommission);
formData.append('commissionlist',JSON.stringify(inputCommisisonList));
formData.append('transactionlist',JSON.stringify(inputList));
formData.append('CompanyId',CompanyId);
formData.append('blockName',BlockName);
formData.append('status',Status);
formData.append('dateOfSale',DateOfSale);
formData.append('ReferenceContactNo',ReferenceContactNo);
formData.append('salesConsultant',AgentName);
formData.append('company_id',AuthData.company_id);
formData.append('_method', 'PATCH');

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}saleformdata/${id}`, requestOptions)
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
navigate("/sales-form-list");
  
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

console.log("resultInventories",resultInventories);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Sales Form</h2>

</div>
<div class="d-flex">
<NavLink to="/sales-form-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form  onSubmit={id == null ? AddNewSalesForm : UpdateSalesForm}>
<div class="row">

<div className="form-group col-md-3">
<label htmlFor="">Date Of Sale*</label>
<input type="date" name="DateOfCost" id="" className="form-control" onChange={e=>setDateOfSale(e.target.value)} value={DateOfSale} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Projects*</label>
<select name="Projects" id="" className="form-control"  onChange={e=>setProjectId(e.target.value)} value={ProjectId} required>
<option value="" selected>Select Projects</option>
{
resultInventories.length == '0' || resultInventories == null || resultInventories.code == 'ERR_BAD_REQUEST' || resultInventories.code == "ERR_NETWORK" ? '' : resultInventories.data.map((curElem,index) => {
return (
<option value={curElem.id} key={curElem.id}>{curElem.project_name}</option>
)

})

}
</select>
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
<label htmlFor="">Property Type*</label>
<select name="PropertyType" id="" className="form-control"  onChange={e=>setPropertyType(e.target.value)} value={PropertyType} required>
<option value="" selected>Select Property Type</option>
{
resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
resultDashboard.propertyType.length > 0 ? (
resultDashboard.propertyType.map((curElem,index) => {
return (
<option value={curElem.id}>{curElem.type_name}</option>
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

<div className="form-group col-md-3">
<label htmlFor="">Property No</label>
<input type="text" name="PropertyNo" id="" className="form-control" onChange={e=>setPropertyNo(e.target.value)} value={PropertyNo} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Block Name</label>
<input type="text" name="BlockName" id="" className="form-control" onChange={e=>setBlockName(e.target.value)} value={BlockName} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Category Name</label>
<input type="text" name="CategoryName" id="" className="form-control" onChange={e=>setCategoryName(e.target.value)} value={CategoryName} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Size*</label>
<input type="text" name="Size" id="" className="form-control" onChange={e=>setSize(e.target.value)} value={Size} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Unit*</label>
<select name="Unit" id="" className="form-control"  onChange={e=>setUnit(e.target.value)} value={Unit} required>
  <option value="">Select Unit</option>
  <option value="Sq-Yard">Sq Yard</option>
  <option value="Sq-Ft">Sq Ft</option>
</select>
</div>

<div className="form-group col-md-3">
<label htmlFor="">Customer Name*</label>
<input type="text" name="CustomerName" id="" className="form-control" onChange={e=>setCustomerName(e.target.value)} value={CustomerName} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">CNIC</label>
<input type="text" name="Cnic" id="" className="form-control" onChange={e=>setCnic(e.target.value)} value={Cnic} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Contact No*</label>
<input type="text" name="ContactNo" id="" className="form-control" onChange={e=>setContactNo(e.target.value)} value={ContactNo} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Agent Name*</label>
<input type="text" name="agentName" id="" className="form-control" onChange={e=>setAgentName(e.target.value)} value={AgentName} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Reference No</label>
<input type="text" name="ReferenceContactNo" id="" className="form-control" onChange={e=>setReferenceContactNo(e.target.value)} value={ReferenceContactNo} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Sale Amount*</label>
<input type="number" name="SaleAmount" id="" className="form-control" onChange={e=>setSaleAmount(e.target.value)} value={SaleAmount} required />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Discount</label>
<input type="number" name="Discount" id="" className="form-control" onChange={e=>setDiscount(e.target.value)} value={Discount} />
</div>

<div className="form-group col-md-3">
<label htmlFor="">Total Commission</label>
<input type="number" name="TotalCommission" id="" className="form-control" onChange={e=>setTotalCommission(e.target.value)} value={TotalCommission} />
</div>


{
  FinanceMode == '' ? (
    <></>
  ):(
    <div className="col-md-12">
<h4 className='pb-2'>Transaction Details</h4>
<table className='table table-striped table-bordered'>
<thead>
<tr>
  
  <th>Mode Of Payment</th>
  <th>Date</th>
  <th>References No</th>
  <th>Bank</th>
  <th>Reference</th>
  <th>Transfer To</th>
  <th>Amount</th>
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
    <select name="payMethod" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.payMethod}>
      <option value="">Select Method</option>
      
      {
        PaymentType == 'cashPaymentVoucher' ? (
          <option value="Cash">Cash</option>
        ): PaymentType == 'bankPaymentVoucher' ? (
          <>
          <option value="Cheque">Cheque</option>
          <option value="payorder">Pay Order</option>
          <option value="bankonline">Bank ( Online )</option>
          <option value="File">File</option>
          </>
        ):(
          <>
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
          <option value="payorder">Pay Order</option>
          <option value="bankonline">Bank ( Online )</option>
          <option value="File">File</option>
          </>
        )
      }
      
    </select>
    </div>
  </td>
  <td>
  <div className="form-group">
  <input type="date" name="PayDate" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="Feature Name" dataId={x.id} value={x.PayDate} />
  </div>
  </td>
  <td>
  <div className="form-group">
  <input type="text" name="CheqPoNo" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.CheqPoNo} />
    
  </div>
  </td>
  <td>
  <div className="form-group">
    
    <select name="BankName" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.BankName}>
      <option value="">Select Bank</option>
      {
        BankListResult && BankListResult.map((item,key) => {
          return (
            <option value={item.id}>{item.banktitle}</option>
          )
        })
      }
    </select>
    </div>
  </td>
  <td>
  <div className="form-group">
    <select name="ReferenceId" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.ReferenceId}>
      <option value="">Select Reference</option>
      {
      CompaniesResult && CompaniesResult.map((item,key) => {
        return (
          <option value={item.id}>{item.company_name}</option>
        )
      })
    }
    </select>
    </div>
  </td>
  <td>
  <div className="form-group">
    <select name="TransferTo" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.TransferTo}>
      <option value="">Select Transfer To</option>
      {

        resultBankList.data == null ? (
          <>Loading.....</>
        ):(

          resultBankList.data.length > 0 ? (
            resultBankList.data.map((curElem , index) => {

        return (
            <option value={curElem.id}>{curElem.accountno} ({curElem.title})</option>
            )
        })

        ): (
          <>
          
          </>
          )

        )

        }
      <option value="Cash In Hand">Cash In Hand</option>
    </select>
    </div>
  </td>
  <td>
  <div className="form-group">
    <input type="number" name="PayAmt" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayAmt} />
  </div>
  </td>
  <td width={200}>
    {
      inputList.length!==1 &&
      <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i)}>Remove</button>
    }
    { inputList.length-1===i &&
        <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
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




<div className="col-md-12">
<h4 className='pb-2'>Commission Details</h4>
<table className='table table-striped table-bordered'>
<thead>
<tr>
  
  <th>Co Agent Name</th>
  <th>Co Agent Percentage (%)</th>
  <th>Status</th>
</tr>
</thead>
<tbody>
{ 
inputCommisisonList.map( (x,i)=>{
return(
<tr>
    <td>
        <div className="form-group">
           <input type="text" name="agentName" id="" className="form-control"  onChange={ e=>handlecommissioninputchangeData(e,i)} dataId={x.id} value={x.agentName} />
        </div>
    </td>
    <td>
        <div className="form-group">
            <input type="number" name="sharePercentage" className="form-control"  onChange={ e=>handlecommissioninputchangeData(e,i)} dataId={x.id} value={x.sharePercentage} />
        </div>
    </td>
    <td>
    {
      inputCommisisonList.length!==1 &&
      <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handlecommissionremove(i)}>Remove</button>
    }
    { inputCommisisonList.length-1===i &&
        <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handlecomissionaddclick}>Add Row</button>
    }
    </td>
</tr>
)
} )}


</tbody>
</table>
</div>

{
id == '' || id == null ? <></> :

FinanceMode == '' ? '' : 
<div className="form-group col-md-4">
<label htmlFor="">Status Approval*</label>
<select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
<option value="" selected>Select Status</option>
<option value="approved">Approved</option>      
<option value="pending">Pending</option>      
<option value="reject">Reject</option>      
<option value="verified">Verified</option>      
</select>
</div>
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

export default AddSalesForm