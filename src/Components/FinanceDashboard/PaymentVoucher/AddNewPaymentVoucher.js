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

const AddNewPaymentVoucher = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  
  var CurrentDate = moment().format('YYYY-MM-DD');


  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  
  const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu)

  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const HrCOn = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 16);
  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

  const AssetRegister = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 153 && edx.sub_features === 'Import');

  const [SingleRes,setSingleRes]= useState([]);

  const [AssetId,setAssetId]=useState('');
  const [AssetType,setAssetType]=useState('');
  const [OtherAssetType,setOtherAssetType]=useState('');
  const [PurchaseDate,setPurchaseDate]=useState(CurrentDate);
  const [AssetBookValue,setAssetBookValue]=useState('0');
  const [AssetLife,setAssetLife]=useState('');
  const [AssetLocation,setAssetLocation]=useState('-');
  const [CompanyId,setCompanyId]=useState('');
  const [DepartementId,setDepartementId]=useState('');
  const [Quantity,setQuantity]=useState('0');
  const [AssetImage,setAssetImage]=useState('');
  const [AssetImageExtension,setAssetImageExtension]=useState('');
  const [AssetImage1,setAssetImage1]=useState('');
  const [AssetImage1Extension,setAssetImage1Extension]=useState('');
  const [AssetImage2,setAssetImage2]=useState('');
  const [AssetImage2Extension,setAssetImage2Extension]=useState('');
  const [Description,setDescription]=useState('');
  const [Status,setStatus]=useState('');
  const [TransactionDate,setTransactionDate]=useState('');
  const [PayTo,setPayTo]=useState('');
  const [PaymentType,setPaymentType]=useState('');
  const [GLCode,setGLCode]=useState('');
  const [GLDescription,setGLDescription]=useState('');
  const [DimensionCode,setDimensionCode]=useState('');
  const [DimensionDesc,setDimensionDesc]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  
  

  
  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);


  const [inputList, setinputList]= useState([{voucherEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',PayAmt:''}]);


  const handleinputchangeData=(e, index)=>{
    const {name, value}= e.target;
    const list= [...inputList];
    list[index][name]= value;
    setinputList(list);
  }

  const handleremove= index=>{
    const list=[...inputList];
    list.splice(index,1);
    setinputList(list);
  }
  
  const handleaddclick=()=>{ 
    
    console.log("inputListTouqeer",inputList);
    setinputList([...inputList, {voucherEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',PayAmt:''}]);

  }

  console.log("inputList",inputList);

  useEffect(() => {
   dispatch(getDashCountData('all',''));
},[]);

console.log("resultDashboard",resultDashboard);

const [CompaniesResult,setCompaniesResult]= useState([]);
const [DepartmentResult,setDepartmentResult]= useState([]);
const [DimensionResult,setDimensionResult]= useState([]);
const [GLCodeResult,setGLCodeResult]= useState([]);

const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
}

const ListGlCode = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}glcode`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setGLCodeResult(await GetArray);
}
// GLDescription

const SingleListGlCode = async (glId) => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}glcode/${glId}`);
  const dataxs = await response.json();
  const GetArray = dataxs.data[0];
  console.log("GetArray",GetArray);
  console.log("glId",GetArray);
    setGLCode(GetArray.code);
  // setGLCodeResult(await GetArray);
}

useEffect(() => {
  if(GLDescription == undefined || GLDescription == null || GLDescription == ''){
    setGLCode('');
  }else{
    SingleListGlCode(GLDescription);
  }
},[GLDescription == undefined || GLDescription == null || GLDescription == '' ? '' : GLDescription]);

const ListDimension = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}dimension`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setDimensionResult(await GetArray);
}

const SingleListDimensionCode = async (dimensionId) => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}dimension/${dimensionId}`);
  const dataxs = await response.json();
  const GetArray = dataxs.data[0];
  setDimensionCode(GetArray.code);
  // setGLCodeResult(await GetArray);
}

useEffect(() => {
  if(DimensionDesc == undefined || DimensionDesc == null || DimensionDesc == ''){
    setDimensionCode('');
  }else{
    SingleListDimensionCode(DimensionDesc);
  }
},[DimensionDesc == undefined || DimensionDesc == null || DimensionDesc == '' ? '' : DimensionDesc]);




  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartmentResult(await GetArray);
    }


    const SinglePaymentVoucherRecords = async (id) => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}paymentvoucher/${id}`);
      const dataxs = await response.json();
      setSingleRes(await dataxs.data);
      setAssetId(dataxs.data[0].id);
      setTransactionDate(dataxs.data[0].transactionDates);
      setCompanyId(dataxs.data[0].companyId);
      setGLDescription(dataxs.data[0].Glid);
      setDimensionDesc(dataxs.data[0].dimensionId);
      setPayTo(dataxs.data[0].payTo);
      setPaymentType(dataxs.data[0].paymentType);
      setDescription(dataxs.data[0].PayDesc);
      setStatus(dataxs.data[0].status);

      let Voucherentry = dataxs.data[0].Voucherentry;

      console.log("datxentry",Voucherentry);
      setinputList(JSON.parse(Voucherentry));
      // let edata = [];
      // Voucherentry.map((datx) => {
      //   
      //   edata.push(datx);
      //   // setinputList([datx]);
      // });
      // setAssetType(dataxs.data[0].assetTypeId);
    }


    
  useEffect(() => {
    ListDimension();
    ListGlCode();
},[]);

    useEffect(() => {
      if(id == undefined){
      }else{
        SinglePaymentVoucherRecords(id);
      }
  },[id == undefined ? '' : id]);

  useEffect(() => {
    ListCompanies();
    ListDepartment();
},[]);

console.log(JSON.stringify(inputList));


const AddNewPaymentVoucherForm = (e) => {
  e.preventDefault();
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  setLoadingS(true);

  const formData = new FormData();
  
  formData.append('companyId',CompanyId);
  formData.append('GLDescription',GLDescription);
  formData.append('DimensionDesc',DimensionDesc);
  formData.append('transactionDate',TransactionDate);
  formData.append('payTo',PayTo);
  formData.append('paymentType',PaymentType);
  formData.append('PayDesc',Description);
  formData.append('company_id',AuthData.company_id);
  formData.append('inputList',JSON.stringify(inputList));

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}paymentvoucher`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

      console.log("dataex",dataex);
     
      if(dataex.code == '200'){
        Swal.fire(
          'Good job!',
          dataex.message,
          'success'
        );
        navigate("/payment-voucher-list");
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

const UpdateNewPaymentVoucherForm = (e) => {
  e.preventDefault();
  
  setLoadingS(true);
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  const formData = new FormData();
  
  formData.append('companyId',CompanyId);
  formData.append('GLDescription',GLDescription);
  formData.append('DimensionDesc',DimensionDesc);
  formData.append('transactionDate',TransactionDate);
  formData.append('payTo',PayTo);
  formData.append('paymentType',PaymentType);
  formData.append('PayDesc',Description);
  formData.append('inputList',JSON.stringify(inputList));
  formData.append('status',Status);
  formData.append('company_id',AuthData.company_id);

  formData.append('_method', 'PATCH');

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}paymentvoucher/${id}`, requestOptions)
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
        navigate("/payment-voucher-list");
         
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
<h2 className="hk-pg-title font-weight-600">Add New Payment Voucher</h2>

</div>
<div class="d-flex">
<NavLink to="/payment-voucher-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewPaymentVoucherForm : UpdateNewPaymentVoucherForm}>
<div class="row">

  <div className="form-group col-md-3">
    <label htmlFor="">Transaction Date*</label>
    <input type="date" name="TransactionDate" id="" className="form-control" onChange={e=>setTransactionDate(e.target.value)} value={TransactionDate} required />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Company*</label>
    <select name="Company" id="" className="form-control"  onChange={e=>setCompanyId(e.target.value)} value={CompanyId} required>
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

  <div className="form-group col-md-3">
    <label htmlFor="">Pay To*</label>
    <input type="text" name="PayTo" id="" className="form-control" onChange={e=>setPayTo(e.target.value)} value={PayTo} required />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Payment Type*</label>
    <select name="PaymentType" id="" className="form-control" onChange={e=>setPaymentType(e.target.value)} value={PaymentType} required>
        <option value="">Select Type</option>
        <option value="cashPaymentVoucher">Cash Payment Voucher (CPV)</option>
        {/* <option value="bankPaymentVoucher">Bank Payment Voucher (BPV)</option>
        <option value="pettyCashVoucher">Petty Cash Voucher (PCV)</option> */}
        <option value="cashRecieptVoucher">Cash Reciept Voucher (CRV)</option>
        {/* <option value="bankRecieptVoucher">Bank Reciept Voucher (BRV)</option> */}
        <option value="journalVoucher">Journal Voucher (JV)</option>
      </select>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">GL Code</label>
    <input type="text" name="GLCode" id="" className="form-control" onChange={e=>setGLCode(e.target.value)} value={GLCode} disabled/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">GL Description</label>
    <select name="GLDescription" id="" className="form-control" onChange={e=>setGLDescription(e.target.value)} value={GLDescription}>
        <option value="">Select GL Description</option>
        {
          GLCodeResult && GLCodeResult.map((item,key) => {
            return (
              <option value={item.id}>{item.glDesc}</option>
            )
          })
        }
      </select>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Dimension Code</label>
    <input type="text" name="DimensionCode" id="" className="form-control" onChange={e=>setDimensionCode(e.target.value)} value={DimensionCode} disabled/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Dimension Description</label>
    <select name="DimensionDesc" id="" className="form-control" onChange={e=>setDimensionDesc(e.target.value)} value={DimensionDesc}>
        <option value="">Select Dimension Description</option>
        {
          DimensionResult && DimensionResult.map((item,key) => {
            return (
              <option value={item.id}>{item.dimensionDesc}</option>
            )
          })
        }
      </select>
  </div>

  <div className="form-group col-md-12">
    <label htmlFor="">Description*</label>
 <textarea name="Description" id="" cols="30" rows="5" className="form-control" onChange={e=>setDescription(e.target.value)} value={Description} required></textarea>
  </div>


  <div className="col-md-12">
    <table className='table table-striped table-bordered'>
      <thead>
        <tr>
          
          <th>Payment Method *</th>
          <th>Cheque / PO No / References</th>
          <th>Date*</th>
          <th>Bank Name</th>
          <th>Amount*</th>
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
           <select name="payMethod" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.payMethod} required>
              <option value="">Select Method</option>
             
              {
                PaymentType == 'cashPaymentVoucher' || PaymentType == 'pettyCashVoucher' ? (
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
            <input type="text" name="CheqPoNo" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.CheqPoNo} />
          </div>
          </td>
          <td>
          <div className="form-group">
            <input type="date" name="PayDate" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} placeholder="Feature Name" dataId={x.id} value={x.PayDate} required />
          </div>
          </td>
          <td>
          <div className="form-group">
           <select name="BankName" id="" className="form-control" onChange={ e=>handleinputchangeData(e,i)} dataId={x.id} value={x.BankName}>
              <option value="">Select Bank</option>
              {

                resultBankList.data == null ? (
                  <>Loading.....</>
                ):(

                  resultBankList.data.length > 0 ? (
                    resultBankList.data.map((curElem , index) => {

                return (
                    <option value={curElem.id}>{curElem.bankname} ({curElem.title})</option>
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
          </td>
          <td>
          <div className="form-group">
            <input type="number" name="PayAmt" id="" className="form-control" onChange={ e=>ChequeAmountAct(e,i)} dataId={x.id} value={x.PayAmt} placeholder="0" required />
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

  {
    id == '' || id == null ? <></> : 
    <div className="form-group col-md-4">
    <label htmlFor="">Status Approval*</label>
    <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
      <option value="" selected>Select Status</option>
      <option value="1">Approved</option>      
      <option value="0">Pending</option>      
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

export default AddNewPaymentVoucher