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
import { InventoryFilterdataAction } from '../../../redux/action/InventoryFilterdataAction';

const AddDealForm = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));
  const AuthData = JSON.parse(localStorage.getItem('authdata'));

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  
  const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);

  const resultprojectfiltersdata = useSelector((state) => state.Inventoryfilterdatareducers.inventoryfilterdata);

  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


  const [SingleRes,setSingleRes]= useState([]);
  const [BankListResult,setBankListResult]=useState([]);
  const [PropertyNoResult,setPropertyNoResult]=useState([]);
  const [PropertyDetailsResult,setPropertyDetailsResult]=useState([]);
  
  const [Status,setStatus]=useState('');
  const [PaymentType,setPaymentType]=useState('');

  const [DealDate,setDealDate]=useState(CurrentDate);
  const [ProjectId,setProjectId]=useState('');
  const [Size,setSize]=useState('-');
  const [PropertyType,setPropertyType]=useState('');
  const [PropertyNo,setPropertyNo]=useState('0');
  const [BlockNo,setBlockNo]=useState('0');
  const [CustomerName,setCustomerName]=useState('-');
  const [SaleAmount,setSaleAmount]=useState('0');
  const [Discount,setDiscount]=useState('0');
  const [MeasuringUnit,setMeasuringUnit]=useState('0');
  const [SalePerson,setSalePerson]=useState('0');
  const [DevelopmentCharges,setDevelopmentCharges]=useState('0');
  const [DealPrice,setDealPrice]=useState('0');
  const [InvoiceAmount,setInvoiceAmount]=useState('0');
  const [RecievedAmount,setRecievedAmount]=useState('0');
  const [RecievedAmountPercentage,setRecievedAmountPercentage]=useState('0');
  const [TotalRebate,setTotalRebate]=useState('0');
  const [RebatePerUnit,setRebatePerUnit]=useState('0');
  const [RebateDue,setRebateDue]=useState('0');
  const [AgentCommission,setAgentCommission]=useState('0');
  const [AgentCommissionPercentage,setAgentCommissionPercentage]=useState('0');
  const [ManagerCommissionApplicable,setManagerCommissionApplicable]=useState('0');
  const [ManagerCommission,setManagerCommission]=useState('0');
  const [ManagerCommissionPerc,setManagerCommissionPerc]=useState('0');
  const [CategoryName,setCategoryName]=useState('0');
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
    
    setinputList([...inputList, {payRecieptEntryId:'',PayDate:'',payMethod:'',CheqPoNo:'',BankName:'',ReferenceId:'',TransferTo:'',PayAmt:''}]);

  }

  useEffect(() => {
   dispatch(getDashCountData('all',''));
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

  useEffect(() => {
    ListCompanies();
    ListDepartment();
  },[]);


// const AddNewPaymentVoucherForm = (e) => {
//   e.preventDefault();

//   // setLoadingS(true);

//   const formData = new FormData();
  
//   formData.append('dateOfReciept',DateOfReciept);
//   formData.append('ProjectId',ProjectId);
//   formData.append('CompanyId',CompanyId);
//   formData.append('PropTypeId',PropertyType);
//   formData.append('ProNo',PropertyNo);
//   formData.append('BlockNo',BlockNo);
//   formData.append('Size',Size);
//   formData.append('CustomerName',CustomerName);
//   formData.append('Cnic',Cnic);
//   formData.append('ContactNo',ContactNo);
//   formData.append('Reference',Reference);
//   formData.append('ReferenceContactNo',ReferenceContactNo);
//   formData.append('SaleAmount',SaleAmount);
//   formData.append('Discount',Discount);
//   formData.append('Remarks',Remarks);
//   formData.append('inputList',JSON.stringify(inputList));
//   formData.append('PostedBy',AuthData.id);
  

//   const requestOptions = {
//     method: 'POST',
//     body: formData
//   };
    
//     fetch(`${actionConfig.REACT_APP_URL}payreciepts`, requestOptions)
//     .then(response => response.json())
//     .then(dataex => {

//       console.log(dataex);
//       if(dataex.code == '200'){
//         Swal.fire(
//           'Good job!',
//           dataex.message,
//           'success'
//         );
//         navigate("/payment-reciepts");
//         setLoadingS(false);
         
//       }else{
//         Swal.fire(
//           'Error!',
//           dataex.message,
//           'error'
//         );
//       }

//     });


// }

// const UpdateNewPaymentVoucherForm = (e) => {
//   e.preventDefault();
  
//   setLoadingS(true);

//   const formData = new FormData();
  
//   formData.append('dateOfReciept',DateOfReciept);
//   formData.append('ProjectId',ProjectId);
//   formData.append('CompanyId',CompanyId);
//   formData.append('PropTypeId',PropertyType);
//   formData.append('ProNo',PropertyNo);
//   formData.append('BlockNo',BlockNo);
//   formData.append('Size',Size);
//   formData.append('CustomerName',CustomerName);
//   formData.append('Cnic',Cnic);
//   formData.append('ContactNo',ContactNo);
//   formData.append('Reference',Reference);
//   formData.append('ReferenceContactNo',ReferenceContactNo);
//   formData.append('SaleAmount',SaleAmount);
//   formData.append('Discount',Discount);
//   formData.append('Remarks',Remarks);
//   formData.append('inputList',JSON.stringify(inputList));
  
//   formData.append('_method', 'PATCH');

//   const requestOptions = {
//     method: 'POST',
//     body: formData
//   };
    
//     fetch(`${actionConfig.REACT_APP_URL}payreciepts/${id}`, requestOptions)
//     .then(response => response.json())
//     .then(dataex => {
      
//       console.log("dataex",dataex);
//       if(dataex.code == '200'){
//         Swal.fire(
//           'Good job!',
//           dataex.message,
//           'success'
//         );
//         setLoadingS(false);
//         navigate("/payment-reciepts");
         
//       }else{
//         Swal.fire(
//           'Error!',
//           dataex.message,
//           'error'
//         );
//       }
//     });

// }


const ChequeAmountAct = (e,i) => {
  let val = e.target.value;
  val = val.replace(/\D/g,"");
  val = val.replace(/(\d)(\d{3})$/,"$1,$2");
  val = val.replace(/(?=(\d{3})+(\D))\B/g,", ");

  handleinputchangeData(e,i);
}


useEffect(() => {
    // console.log("ProjectId",ProjectId);
    dispatch(InventoryFilterdataAction(ProjectId));
},[ProjectId]);
useEffect(() => {
  console.log("BlockNo",BlockNo);
  console.log("ProjectId",ProjectId);
  GetPropertyNo(BlockNo,ProjectId);
  // dispatch(InventoryFilterdataAction(BlockNo));
},[BlockNo,ProjectId]);


const GetPropertyNo = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}getPropertyNo?BlockNo=${BlockNo}&ProjectId=${ProjectId}`);
const dataxs = await response.json();
const GetArray = dataxs;
setPropertyNoResult(await GetArray);
console.log("GetArray",GetArray);

}

  useEffect(() => {
    console.log("BlockNo",BlockNo);
    console.log("ProjectId",ProjectId);
    console.log("PropertyNo",PropertyNo);
    GetPropertyDetailsNo(BlockNo,ProjectId,PropertyNo);
    // dispatch(InventoryFilterdataAction(BlockNo));
  },[BlockNo,ProjectId]);

  const GetPropertyDetailsNo = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}getPropertyDetails?BlockNo=${BlockNo}&ProjectId=${ProjectId}&PropertyNo=${PropertyNo}`);
    const dataxs = await response.json();
    const GetArray = dataxs;
    if(PropertyNo == null){
      setPropertyDetailsResult("");
    }else{
      setPropertyDetailsResult(await GetArray);
    }
    
    console.log("GetArray",GetArray);
    
    }

console.log("PropertyDetailsResult",PropertyDetailsResult);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Deal Form</h2>

</div>
<div class="d-flex">
<NavLink to="/deal-form-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit="">
<div class="row">

  <div className="form-group col-md-3">
    <label htmlFor="">Deal Date*</label>
    <input type="date" name="DealDate" id="" className="form-control" onChange={e=>setDealDate(e.target.value)} value={DealDate} required />
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
    <label htmlFor="">Block No / Tower</label>
    <select name="BlockNo" id="" className="form-control"  onChange={e=>setBlockNo(e.target.value)} value={BlockNo}>
      <option value="">Select Option</option>
      {
        resultprojectfiltersdata == null || resultprojectfiltersdata == '' || resultprojectfiltersdata.length == 0 || resultprojectfiltersdata.getBlockData && resultprojectfiltersdata.getBlockData.map((item,key)=>{
          const jsnfrmt = JSON.parse(item.jsonFormat);
          return (
            <option value={jsnfrmt.tower == null || jsnfrmt.tower == undefined || jsnfrmt.tower == '' ? jsnfrmt.block : jsnfrmt.tower}>{jsnfrmt.tower == null || jsnfrmt.tower == undefined || jsnfrmt.tower == '' ? jsnfrmt.block : jsnfrmt.tower}</option>
          )
        })
      }
    </select>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Property No</label>
    <select name="PropertyNo" id="" className="form-control" onChange={e=>setPropertyNo(e.target.value)} value={PropertyNo}>
      <option value="">Select Option</option>
      {
        
        PropertyNoResult.length == 0 ? '' : PropertyNoResult && PropertyNoResult.data.map((curElem,index) => {
        return (
        <option value={curElem.plotno}>{curElem.plotno}</option>
        )
        })

      }
    </select>
    
  </div>
  
  

  <div className="form-group col-md-3">
    <label htmlFor="">Property Type*</label>
    <input type="text" name="PropertyType" disabled className="form-control"  onChange={e=>setPropertyType(e.target.value)} value={PropertyType} />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Category</label>
    <input type="text" name="CategoryName" disabled className="form-control"  onChange={e=>setCategoryName(e.target.value)} value={CategoryName} />
  </div>

  

  
  <div className="form-group col-md-3">
    <label htmlFor="">Size*</label>
    <input type="text" name="Size" id="" className="form-control" onChange={e=>setSize(e.target.value)} value={Size} required disabled />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Measuring Unit*</label>
    <select name="MeasuringUnit" id="" className="form-control" onChange={e=>setMeasuringUnit(e.target.value)} value={MeasuringUnit} disabled required>
      <option value="">Select Measuring Unit</option>
      <option value="Sqyd">Sqyd</option>
      <option value="Sqft">Sqft</option>
    </select>
  </div>

  
  <div className="form-group col-md-3">
    <label htmlFor="">Customer Name*</label>
    <input type="text" name="CustomerName" id="" className="form-control" onChange={e=>setCustomerName(e.target.value)} value={CustomerName} required disabled />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Sale Person*</label>
    <input type="text" name="SalePerson" id="" className="form-control" onChange={e=>setSalePerson(e.target.value)} value={SalePerson} required disabled />
  </div>

  
  <div className="form-group col-md-3">
    <label htmlFor="">Sale Amount*</label>
    <input type="number" name="SaleAmount" id="" className="form-control" onChange={e=>setSaleAmount(e.target.value)} value={SaleAmount} required disabled />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Discount</label>
    <input type="number" name="Discount" id="" className="form-control" onChange={e=>setDiscount(e.target.value)} value={Discount} />
  </div>


  <div className="form-group col-md-3">
    <label htmlFor="">Deal Price</label>
    <input type="text" name="DealPrice" id="" className="form-control" disabled onChange={e=>setDealPrice(e.target.value)} value={DealPrice} required/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Development Charges</label>
    <input type="number" name="DevelopmentCharges" id="" className="form-control" onChange={e=>setDevelopmentCharges(e.target.value)} value={DevelopmentCharges} required/>
  </div>

 

  <div className="form-group col-md-3">
    <label htmlFor="">Invoice Amount</label>
    <input type="text" name="invoiceAmount" id="" className="form-control" disabled onChange={e=>setInvoiceAmount(e.target.value)} value={InvoiceAmount}/>
  </div>
  <div className="form-group col-md-3">
    <label htmlFor="">Recievied Amount</label>
    <input type="text" name="RecievedAmount" id="" className="form-control" disabled onChange={e=>setRecievedAmount(e.target.value)} value={RecievedAmount}/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Recievied Amount (%)</label>
    <input type="text" name="RecievedAmountPercentage" id="" className="form-control" disabled onChange={e=>setRecievedAmountPercentage(e.target.value)} value={RecievedAmountPercentage}/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Total Rebate</label>
    <input type="text" name="TotalRebate" id="" className="form-control" disabled onChange={e=>setTotalRebate(e.target.value)} value={TotalRebate}/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Rebate Per Unit</label>
    <input type="number" name="RebatePerUnit" id="" className="form-control" onChange={e=>setRebatePerUnit(e.target.value)} value={RebatePerUnit}/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Rebate Due</label>
    <input type="text" name="RebateDue" id="" className="form-control" onChange={e=>setRebateDue(e.target.value)} value={RebateDue} disabled/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Agent Commission</label>
    <input type="text" name="AgentCommission" id="" className="form-control" onChange={e=>setAgentCommission(e.target.value)} value={AgentCommission} disabled/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Agent Commission (%)</label>
    <input type="text" name="AgentCommissionPercentage" id="" className="form-control" onChange={e=>setAgentCommissionPercentage(e.target.value)} value={AgentCommissionPercentage} />
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Manager Commission Applicable</label>
    <select name="ManagerCommissionApplicable" id="" className="form-control" onChange={e=>setManagerCommissionApplicable(e.target.value)} value={ManagerCommissionApplicable} required>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Manager Commission</label>
    <input type="text" name="ManagerCommission" id="" className="form-control" onChange={e=>setManagerCommission(e.target.value)} value={ManagerCommission} disabled/>
  </div>

  <div className="form-group col-md-3">
    <label htmlFor="">Manager Commission (%)</label>
    <input type="text" name="setManagerCommissionPerc" id="" className="form-control" onChange={e=>setManagerCommissionPerc(e.target.value)} value={ManagerCommissionPerc} />
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

export default AddDealForm