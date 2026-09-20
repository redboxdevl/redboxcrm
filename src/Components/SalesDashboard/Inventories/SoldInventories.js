import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import Navigation from '../../../Includes/Navigation'
import { FaHandPaper , FaShareAlt , FaHome } from "react-icons/fa";
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SingleInventories } from '../../../redux/action/SingleInventories';
import { SinglemyleadAction } from '../../../redux/action/SinglemyleadAction';
import { SingleProjectInventoriesdata } from '../../../redux/action/SingleProjectInventoriesdata';
import { actionConfig } from '../../../configuration';
import AffiliateNav from '../../../Includes/AffiliateNav';
import InputMask from "react-input-mask";
import LoadingSpinner from '../../FinanceDashboard/LoadingSpinner';



const SoldInventories = () => {

   const AuthDatax = JSON.parse(localStorage.getItem('authdata'));
   const AffiliateAuthDatas = JSON.parse(localStorage.getItem('affiliateauthdata'));
   
const navigate = useNavigate();
const resultSingleProject = useSelector(state => state.SingleInventoriesreducer.singleinventoriesdata);
const resultSingleCustomer = useSelector(state => state.Singlemyleadreducers.singlecustomerdata);
const resultSingleProjectInv = useSelector(state => state.SingleProInventoriesreducer.singleproinventoriesdata);
const dispatch = useDispatch();

let { invid } = useParams();
let { custId } = useParams();
let { proId } = useParams();
let {affiliatestatus} = useParams();
console.log("CustomerId",custId);

const checkList = ["Meezan Bank", "Bank Alfalah", "Askari Bank"];

const SingleProjecthresult = resultSingleProject[0];
const Customerresult = resultSingleCustomer;
const Inventoryrresult = resultSingleProjectInv[0];

console.log("Customerresult",Customerresult);
const [InstallmentCond,setInstallmentCond]=useState(false);
const [ReferneceCond,setReferneceCond]=useState(false);
const [PaymentRefCond,setPaymentRefCond]=useState(false);
const [OccupationListResult,setOccupationListResult]=useState([]);
const [Soldresult,setSoldresult]=useState([]);


const [ProjectId,setProjectId]=useState(proId);
const [CustomerId,setCustomerId]=useState(custId);
const [InventoryId,setInventoryId]=useState(invid);
const [FatherName,setFatherName]=useState('');
const [DoB,setDoB]=useState('');
const [ClientAddress,setClientAddress]=useState('');
const [ClientImage,setClientImage]=useState('');
const [ClientCnic,setClientCnic]=useState('');
const [ClientCnicFront,setClientCnicFront]=useState('');
const [ClientCnicBack,setClientCnicBack]=useState('');
const [RelationshipTitle,setRelationshipTitle]=useState('');
const [NomineeName,setNomineeName]=useState('');
const [NomineeHusbandFatherName,setNomineeHusbandFatherName]=useState('-');
const [NomineeImg,setNomineeImg]=useState('');
const [NomineeCnic,setNomineeCnic]=useState('');
const [NomineeCell,setNomineeCell]=useState('');
const [NomineeCnicFront,setNomineeCnicFront]=useState('');
const [NomineeCnicBack,setNomineeCnicBack]=useState('');
const [NomineeAddress,setNomineeAddress]=useState('');
const [DiscountAmt,setDiscountAmt]=useState(0);
const [AfterDiscountAmt,setAfterDiscountAmt]=useState(0);
const [RecievedAmt,setRecievedAmt]=useState('');
const [PaymentType,setPaymentType]=useState('');
const [ChequeNo,setChequeNo]=useState(0);
const [ModeOfPayment,setModeOfPayment]=useState('');
const [ReferenceType,setReferenceType]=useState('');
const [BankName,setBankName]=useState('');
const [InstallmentDate,setInstallmentDate]=useState('');
const [InstallmentAmt,setInstallmentAmt]=useState('');
const [Occupation,setOccupation]=useState('');
const [OtherOccupation,setOtherOccupation]=useState('');
const [Nationality,setNationality]=useState('');

const [LoadingS,setLoadingS]=useState(false);

const [inputList, setinputList]= useState([{installment_date:'', installment_amount:''}]);






const HandlerClientImg = (event) => {
   setClientImage(event.target.files[0]);
};
const HandlerCNicFrontImg = (event) => {
   setClientCnicFront(event.target.files[0]);
};
const HandlerCNicBackImg = (event) => {
   setClientCnicBack(event.target.files[0]);
};
const HandlerNomineeImg = (event) => {
   setNomineeImg(event.target.files[0]);
};
const HandlerNomineeCNicFrontImg = (event) => {
   setNomineeCnicFront(event.target.files[0]);
};
const HandlerNomineeCNicBackImg = (event) => {
   setNomineeCnicBack(event.target.files[0]);
};


const GetoccupationsList = async (id) => {
   
   const response2 = await fetch(`${actionConfig.REACT_APP_URL}occupations`);
   const dataxs2 = await response2.json();
   const GetArray3 = dataxs2.data;
   setOccupationListResult(await GetArray3);
 
}

useEffect(() => {
   GetoccupationsList();
},[]);

useEffect(() => {
   dispatch(SinglemyleadAction(custId));
},[custId]);

console.log("CustomerId",CustomerId);

useEffect(() => {
   dispatch(SingleInventories(ProjectId));
   dispatch(SingleProjectInventoriesdata(InventoryId));
},[ProjectId,InventoryId]);

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
   setinputList([...inputList, { installment_date:'', installment_amount:''}]);
 }

const handleInputChange = (event) => {
   var updatedList = [...BankName];
   if (event.target.checked) {
   updatedList = [BankName, event.target.value];
   } else {
   updatedList.splice(BankName.indexOf(event.target.value), 1);
   }
   setBankName(updatedList);

}

useEffect(() => {
   if(PaymentType == 'fullcash'){
      setInstallmentCond(false);
   }else if(PaymentType == ''){
      setInstallmentCond(false);
   }else{
      setInstallmentCond(true);
   }

   if(ReferenceType == 'redbox'){
      setReferneceCond(true);
   }else if(ReferenceType == ''){
      setReferneceCond(false);
   }else{
      setReferneceCond(false);
   }

   if(ModeOfPayment == 'cheque'){
      setPaymentRefCond(true);
   }else if(ModeOfPayment == ''){
      setPaymentRefCond(false);
   }else{
      setPaymentRefCond(false);
   }


   if(DiscountAmt == 0){
      setAfterDiscountAmt(Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.total_price);
   }else{
      const DiscountAmtxs = Inventoryrresult.jsonFormat.total_price - DiscountAmt;
      setAfterDiscountAmt(DiscountAmtxs);
   }

},[ProjectId,CustomerId,InventoryId,InstallmentCond,PaymentType,ReferenceType,ModeOfPayment,Inventoryrresult,AfterDiscountAmt,DiscountAmt]);



const SingleSoldInveRecords = async () => {
   if(custId == '' || custId == null){
   }else{
      const response = await fetch(`${actionConfig.REACT_APP_URL}inventorysold?cusid=${custId}`);
      const dataxs = await response.json();
      const getData = dataxs.data[0];
      setSoldresult(getData);
      setFatherName(getData.father_name);
      setDoB(getData.date_of_birth);
      setClientAddress(getData.client_address);
      setClientCnic(getData.cnic);
      setRelationshipTitle(getData.relationship_title);
      setNomineeName(getData.nominee_name);
      setNomineeHusbandFatherName(getData.nomineeFatherHusbandName);
      setNomineeCnic(getData.nominee_cnic);
      setNomineeCell(getData.nominee_cell);
      setOccupation(getData.OccupationId);
      setNationality(getData.Nationality);
      setNomineeAddress(getData.nominee_address);
      setClientImage(getData.client_image);
      setClientCnicFront(getData.nominee_cnic_front);
      setClientCnicBack(getData.nominee_cnic_back);
      setNomineeImg(getData.nominee_image);
      setNomineeCnicFront(getData.nominee_cnic_front);
      setNomineeCnicBack(getData.nominee_cnic_back);
      
      

      
   }
   
}


useEffect(() => {
   SingleSoldInveRecords(custId);
},[custId == '' || custId == null ? '' : custId]);

const AddSoldInventory = (e) => {

   e.preventDefault();

   setLoadingS(true);

   // const instamentDateArry = [];
   // const instamentAmtArry = [];
   // inputList.map((data,index) => {
   //    instamentDateArry.push(data.installment_date);
   //    instamentAmtArry.push(data.installment_amount);
   // });
   // const InstallmentData = instamentDateArry.join(",");
   // const InstallmentAmount = instamentAmtArry.join(",");

   const formData = new FormData();
  
      formData.append('inventory_id', InventoryId);
      formData.append('customer_id', CustomerId);
      formData.append('employee_id', affiliatestatus == '' || affiliatestatus == undefined ? AuthDatax.id : AffiliateAuthDatas[0].id);
      formData.append('father_name', FatherName);
      formData.append('date_of_birth', DoB);
      formData.append('client_address', ClientAddress);
      formData.append('client_image', ClientImage);
      formData.append('cnic', ClientCnic);
      formData.append('cnic_front_image', ClientCnicFront);
      formData.append('cnic_back_image', ClientCnicBack);
      formData.append('relationship_title', RelationshipTitle);
      formData.append('nominee_name', NomineeName);
      formData.append('nomineeFatherHusbandName', NomineeHusbandFatherName);
      formData.append('nominee_image', NomineeImg);
      formData.append('nominee_cnic', NomineeCnic);
      formData.append('nominee_cell', NomineeCell);
      formData.append('nominee_cnic_front', NomineeCnicFront);
      formData.append('nominee_cnic_back', NomineeCnicBack);
      formData.append('nominee_address', NomineeAddress);
      formData.append('Occupation', Occupation);
      formData.append('OtherOccupation',OtherOccupation == null || OtherOccupation == '' ? '0' : OtherOccupation);
      formData.append('Nationality', Nationality);
      
      formData.append('myStatus', affiliatestatus == '' || affiliatestatus == undefined ? 'normal' : 'affiliate');
      // formData.append('discount_amount', DiscountAmt);
      // formData.append('after_discount_amount', AfterDiscountAmt);
      // formData.append('received_amount', RecievedAmt);
      // formData.append('payment_type', PaymentType);
      // formData.append('cheque_no', ChequeNo);
      // formData.append('mode_of_payment', ModeOfPayment);
      // formData.append('reference_type', ReferenceType);
      // formData.append('bank_name', BankName);
      // formData.append('installment_date',InstallmentData);
      // formData.append('installment_amount',InstallmentAmount);
  
      const requestOptions = {
          method: 'POST',
          body: formData
      };
      
      fetch(`${actionConfig.REACT_APP_URL}inventorysold`, requestOptions)
          .then(response => response.json())
          .then(result => {
           console.log('Success:', result);
            if(result.code == '200'){
               Swal.fire(
               'Good job!',
               result.message,
               'success'
               );
               if(affiliatestatus == '' || affiliatestatus == undefined){
               navigate("/inventories");
               setLoadingS(false);
               }else{
                  navigate("/affiliates/inventories");
                  setLoadingS(false);
               }
               
            }else{
               Swal.fire(
               'Error!',
               result.message,
               'error'
               );
            }
            
  
          }).catch((error) => {
            //console.error('Error:', error);
          });

}

const NumericOnly= (e) => { //angka only
   const reg = /^[0-9\b]+$/
   let preval=e.target.value
   if (e.target.value === '' || reg.test(e.target.value)) return true
   else e.target.value = preval.substring(0,(preval.length-1))
}


const handleInputNomineeCnic = ({ target: { value } }) => setNomineeCnic(value);

console.log("Customerresult",Customerresult);
return (
<>

{
  affiliatestatus == '' || affiliatestatus == undefined ? <Navigation /> :<AffiliateNav />
}

{LoadingS == true ? <LoadingSpinner /> : '' }
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Sold Inventoriess</h2>
</div>
</div>

<div class="row">
<div class="col-md-12">
<form method="post" onSubmit={AddSoldInventory}>
<section class="hk-sec-wrapper">
<div class="col-md-6 col-xs-12 col-sm-12">
<h3>{Customerresult == undefined || Customerresult.length == 0 ? '' : Customerresult.clientName}</h3>
<p class="mb-30"><b>Phone No: {Customerresult == undefined || Customerresult.length == 0 ? '' : Customerresult.mobileNo}</b> | <b>Email: {Customerresult == undefined || Customerresult.length == 0 ? '' : Customerresult.email == undefined || Customerresult.length == 0 ? 'N/a' : Customerresult.email}</b> | <b>Gender: {Customerresult == undefined || Customerresult.length == 0 ? '' : Customerresult.Gender == undefined ? 'N/a' : Customerresult.Gender}</b> <br /> <b>{Customerresult == undefined || Customerresult.length == 0 ? '' : Customerresult.project_data.title == undefined ? 'N/a' : Customerresult.project_data.title}</b></p>
</div>
<div class="col-md-12 col-xs-12 col-sm-12">

<div class="row ">


<div class="col-md-6">
<div class="form-group">
<label for="">Father Name</label>
<input type="text" name="father_name" class="form-control" placeholder="Enter father Name" onChange={e=>setFatherName(e.target.value)} value={FatherName} required/>
</div>
</div>

<div class="col-md-6">
<div class="form-group">
<label for="">D.O.B <span class="text-danger">*</span></label>
<input type="date" name="client_dob" class="form-control" required onChange={e=>setDoB(e.target.value)} value={DoB}/>
</div>
</div>
<div class="col-md-12">
<div class="form-group">
<label for="">Client Address <span class="text-danger">*</span></label>
<textarea class="form-control" rows="3" placeholder="Enter Client Address" onChange={e=>setClientAddress(e.target.value)} value={ClientAddress} required></textarea>
</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">Client Image <span class="text-danger">*</span></label>
<div class="fileinput input-group fileinput-new">
         <div class="input-group-prepend">
             <span class="input-group-text">Upload</span>
         </div>
         <div className="form-control">
            {
               Soldresult != '' ? (
                  <input type="file" name="clientImage"  onChange={HandlerClientImg}/>
               ):(
                  <input type="file" name="clientImage"  onChange={HandlerClientImg} required/>
               )
            }
         
         </div>
         
     </div>
     <img src={`${actionConfig.REACT_APP_MAIN}${ClientImage}`} alt="" width={50} />
</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">CNIC # (e.g XXXXX-XXXXXXX-X with dash) <span class="text-danger">*</span></label>
{/* <input type="text" name="client_cnic" class="form-control" placeholder="XXXXX-XXXXXXX-X" required onChange={e=>setClientCnic(e.target.value)} maxLength={13} value={ClientCnic} pattern="[0-9]{5}[-]{1}[0-9]{7}[-]{1}[0-9]{1}" title="CNIC # (e.g XXXXX-XXXXXXX-X With dash)"/> */}
<InputMask name="client_cnic" mask="99999-9999999-9" className="form-control" onChange={e=>setClientCnic(e.target.value)} value={ClientCnic} />

</div>
</div>
<div class="col-md-6">

<div class="form-group">
<label for="">CNIC Front <span class="text-danger">*</span></label>
 <div class="fileinput input-group fileinput-new">
         <div class="input-group-prepend">
             <span class="input-group-text">Upload</span>
         </div>
         <div className="form-control">
         {
               Soldresult != '' ? (
                  <input type="file" name="cnicfront" onChange={HandlerCNicFrontImg}/>
               ):(
                  <input type="file" name="cnicfront" onChange={HandlerCNicFrontImg} required/>
               )
         }
         
         </div>
     </div>
     <img src={`${actionConfig.REACT_APP_MAIN}/public/storage/cnicFront/${ClientCnicFront}`} alt="" width={50} />
</div>

</div>
<div class="col-md-6">
<div class="form-group">
<label for="">CNIC Back <span class="text-danger">*</span></label>
 <div class="fileinput input-group fileinput-new">
         <div class="input-group-prepend">
             <span class="input-group-text">Upload</span>
         </div>
         <div className="form-control">
         {
               Soldresult != '' ? (
                  <input type="file" name="cnicback" onChange={HandlerCNicBackImg} />
               ):(
                  <input type="file" name="cnicback" onChange={HandlerCNicBackImg} required/>
               )
         }
         
         </div>
     </div>
     <img src={`${actionConfig.REACT_APP_MAIN}/public/storage/cnicBack/${ClientCnicBack}`} alt="" width={50} />
</div>
</div>


</div>



</div>
</section>
<section class="hk-sec-wrapper">
<h5 class="hk-sec-title">Nominee Details</h5>

<div class="row">
<div class="col-md-6">
<div class="form-group">
<label for="">Relationship <span class="text-danger">*</span></label>
<input type="text" name="nominee_relationship" class="form-control" placeholder="Enter Relationship Title" required onChange={e=>setRelationshipTitle(e.target.value)} value={RelationshipTitle}/>
</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">Name <span class="text-danger">*</span></label>
<input type="text" name="nominee_name" class="form-control" placeholder="Enter Nominee Name" required onChange={e=>setNomineeName(e.target.value)} value={NomineeName}/>
</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">Father's/Husband's Name </label>
<input type="text" name="nominee_husbandfather" class="form-control" placeholder="Enter Nominee Father Husband Name" onChange={e=>setNomineeHusbandFatherName(e.target.value)} value={NomineeHusbandFatherName}/>
</div>
</div>
<div class="col-md-12">
<div class="form-group">
<label for="">Nominee Image <span class="text-danger">*</span></label>
<div class="fileinput fileinput-new input-group">
<div class="input-group-prepend">
<span class="input-group-text">Upload</span>
</div>
<div className="form-control">
{
   Soldresult != '' ? (
      <input type="file" name="nomineeImg" onChange={HandlerNomineeImg} />
   ):(
      <input type="file" name="nomineeImg" onChange={HandlerNomineeImg} required/>
   )
}

</div>
</div>
<img src={`${actionConfig.REACT_APP_MAIN}${NomineeImg}`} alt="" width={50} />
</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">CNIC # (e.g XXXXX-XXXXXXX-X With dash) <span class="text-danger">*</span></label>
{/* <input type="text" name="nominee_cnic" class="form-control" placeholder="XXXXX-XXXXXXX-X" maxLength={13} required onChange={e=>setNomineeCnic(e.target.value)} value={NomineeCnic} pattern="[0-9]{5}[-]{1}[0-9]{7}[-]{1}[0-9]{1}" title="CNIC # (e.g XXXXX-XXXXXXX-X With dash)"/> */}
<InputMask name="nominee_cnic" mask="99999-9999999-9" className="form-control" onChange={e=>setNomineeCnic(e.target.value)} value={NomineeCnic} />

</div>
</div>
<div class="col-md-6">
<div class="form-group">
<label for="">Cell # (e.g 02345678901)<span class="text-danger">*</span></label>
<input type="text" name="nominee_cellno" class="form-control" placeholder="Enter Nominee Cell No" maxLength={11} required onChange={e=>setNomineeCell(e.target.value)} onInput={NumericOnly} value={NomineeCell} />
</div>
</div>
<div class="col-md-6">

<div class="form-group">
<label for="">Nominee CNIC Front <span class="text-danger">*</span></label>
<div class="fileinput fileinput-new input-group">
<div class="input-group-prepend">
<span class="input-group-text">Upload</span>
</div>
<div className="form-control">
   {
   Soldresult != '' ? (
      <input type="file" name="nomineecnicback" onChange={HandlerNomineeCNicFrontImg}/>
   ):(
      <input type="file" name="nomineecnicback" onChange={HandlerNomineeCNicFrontImg} required/>
   )
   }

</div>
{/* <div class="form-control text-truncate" data-trigger="fileinput"><i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div>
<span class="input-group-append">
    <span class=" btn btn-primary btn-file"><span class="fileinput-new">Select file</span><span class="fileinput-exists">Change</span>

</span>
<a href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span> */}
</div>
<img src={`${actionConfig.REACT_APP_MAIN}/public/storage/nomineeCnincFront/${NomineeCnicFront}`} alt="" width={50} />
</div>


</div>
<div class="col-md-6">
<div class="form-group">
<label for="">Nominee CNIC Back <span class="text-danger">*</span></label>
<div class="fileinput fileinput-new input-group">
<div class="input-group-prepend">
<span class="input-group-text">Upload</span>
</div>
<div className="form-control">
{
   Soldresult != '' ? (
      <input type="file" name="nomineecnicback" onChange={HandlerNomineeCNicBackImg}/>
   ):(
      <input type="file" name="nomineecnicback" onChange={HandlerNomineeCNicBackImg} required/>
   )
}

</div>
{/* <div class="form-control text-truncate" data-trigger="fileinput"><i class="glyphicon glyphicon-file fileinput-exists"></i> <span class="fileinput-filename"></span></div>
<span class="input-group-append">
    <span class=" btn btn-primary btn-file"><span class="fileinput-new">Select file</span><span class="fileinput-exists">Change</span>

</span>
<a href="#" class="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span> */}
</div>
<img src={`${actionConfig.REACT_APP_MAIN}/public/storage/nomineeCnincBack/${NomineeCnicBack}`} alt="" width={50} />
</div>
</div>

<div class="col-md-6">
<div class="form-group">
<label for="">Occupation </label>
<select name="Occupation" id="" className="form-control" onChange={e=>setOccupation(e.target.value)} value={Occupation}>
   <option value="">Select Occupation</option>
   {

OccupationListResult == null ? (
  <>Loading.....</>
):(

   OccupationListResult.length > 0 ? (
      OccupationListResult.map((curElem , index) => {

return (
  <option value={curElem.id}>{curElem.OccuptationTitle}</option>
  )
  

})

): (
  <>
  
  </>
  )

)

}
<option value="Other">Other</option>
</select>
</div>
</div>

<div class={`col-md-6 ${Occupation == 'Other' ? '' : 'd-none'}`}>
<div class="form-group">
   <label htmlFor="">Other Occupation</label>
<input type="text" name="OtherOccupation" className="form-control" onChange={e=>setOtherOccupation(e.target.value)} value={OtherOccupation} />
</div>
</div>

<div class={`col-md-6`}>
<div class="form-group">
   <label htmlFor="">Nationality</label>
<input type="text" name="Nationality" className="form-control" onChange={e=>setNationality(e.target.value)} value={Nationality} />
</div>
</div>

<div class="col-md-12">
<div class="form-group">
<label for="">Address <span class="text-danger">*</span></label>
<textarea class="form-control" rows="3" placeholder="Enter Nominees Address" onChange={e=>setNomineeAddress(e.target.value)} value={NomineeAddress} required></textarea>
</div>
</div>

</div>
</section>

<section class="hk-sec-wrapper hk-invoice-wrap pa-35">
{/* <div class="invoice-from-wrap">
<div class="row">
<div class="col-md-7 mb-20">

{SingleProjecthresult == null ? '' : <img class="img-fluid invoice-brand-img d-block mb-20" src={SingleProjecthresult.asset_name == '' ? '' : `https://redbox.com.pk/${SingleProjecthresult.project_asset_path}`} alt="brand" /> }
 
 <h4 class="mb-5 font-weight-600 text-uppercase">{SingleProjecthresult == null ? '' : SingleProjecthresult.project_name}</h4>
 <address>

 {

SingleProjecthresult == null ? (
<></>

):(

SingleProjecthresult.project_category.map((curElem) => {
return (
   <span class="badge badge-success">{curElem.project_category_name}</span>
   )
})
)

}

<span class="d-block">{SingleProjecthresult == null ? '' : SingleProjecthresult.address}, {SingleProjecthresult == null ? '' : SingleProjecthresult.location_id}</span>
<span class="d-block">{SingleProjecthresult == null ? '' : SingleProjecthresult.city_id}, {SingleProjecthresult == null ? '' : SingleProjecthresult.country_id}</span>
</address>
</div>
<div class="col-md-5 mb-20">
 <h4 class="mb-35 font-weight-600">{Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.category}-{Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.plot}</h4>
 <span class="d-block">Block:<span class="pl-10 text-dark">{Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.block}</span></span>
 <span class="d-block">Sector:<span class="pl-10 text-dark">{Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.sector}</span></span>
 <span class="d-block">Size:<span class="pl-10 text-dark">{Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.sqyd} {Inventoryrresult == undefined ? '': Inventoryrresult.jsonFormat.size }</span></span>
 <span class="d-block">Unit Cost:<span class="pl-10 text-dark">PKR {Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.total_amount} {Inventoryrresult == undefined ? '' : Inventoryrresult.jsonFormat.total_price}</span></span>
 <span class="d-block">After Discount Cost:<span class="pl-10 text-dark">PKR {AfterDiscountAmt}</span></span>
 <span class="d-block">Category Type:<span class="pl-10 text-dark">
 {Inventoryrresult == undefined ? '' : <span class="badge badge-primary">{Inventoryrresult.jsonFormat.park_facing}</span>}
 {Inventoryrresult == undefined ? '' : <span class="badge badge-primary">{Inventoryrresult.jsonFormat.west_open}</span>}
 {Inventoryrresult == undefined ? '' : <span class="badge badge-primary">{Inventoryrresult.jsonFormat.general}</span>}
   
 </span></span>
</div>
</div>
</div>
<hr class="mt-0"  />
<div class="pb-20">
<div class="row">
   <div class="col-md-4">
      <div class="form-group">
         <label for="">Discount Amount</label>
         <input type="number" name="discountAmt" class="form-control" placeholder="Enter Discount Amount" onChange={e=>setDiscountAmt(e.target.value)} value={DiscountAmt}/>
      </div>
   </div>
   <div class="col-md-4">
      <div class="form-group">
         <label for="">After Discount Amount</label>
         <input type="text" name="afterdiscountamt" class="form-control" placeholder="After Discount Amount" disabled onChange={e=>setAfterDiscountAmt(e.target.value)} value={AfterDiscountAmt}/>
      </div>
   </div>
   <div class="col-md-4">
      <div class="form-group">
         <label for="">Received Amount <span class="text-danger">*</span></label>
         <input type="text" name="dramount" class="form-control" placeholder="Enter Amount" required onChange={e=>setRecievedAmt(e.target.value)} value={RecievedAmt}/>
      </div>
   </div>
   <div class="col-md-4">
      <div class="form-group">
         <label for="">Payment <span class="text-danger">*</span></label>
         <select name="dpayment" class="form-control" required onChange={e=>setPaymentType(e.target.value)} value={PaymentType}>
            <option value="">Select Payment Type</option>
            <option value="token">Token</option>
            <option value="downpayment">Down Payment</option>
            <option value="installment">Installment</option>
            <option value="fullcash">Full Cash</option>
         </select>
      </div>
   </div>
   <div class="col-md-4">
      <div class="form-group">
         <label for="">Mode of Payment <span class="text-danger">*</span></label>
         <select name="dmop" id="" class="form-control" required onChange={e=>setModeOfPayment(e.target.value)} value={ModeOfPayment}>
            <option value="">Select Mode Type</option>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="transfer">Transfer</option>
         </select>
      </div>
   </div>

   {
      PaymentRefCond == true ? (

         <div class="col-md-4">
            <div class="form-group">
               <label for="">Cheque No</label>
               <input type="text" name="chequeNo" class="form-control" placeholder="Enter Chaque No" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo}/>
            </div>
         </div>
         
      ):(
         <></>
      )
   }
   
   
   <div class="col-md-4">
      <div class="form-group">
         <label for="">Reference <span class="text-danger">*</span></label>
         <select name="dreference" id="" class="form-control" required onChange={e=>setReferenceType(e.target.value)} value={ReferenceType}>
            <option value="">Select Reference Type</option>
            <option value="redbox">Redbox</option>
            <option value="builder">Builder</option>
            <option value="naveedshah">Naveed Shah</option>
            <option value="saeedshah">Saeed Shah</option>
         </select>
      </div>
   </div>

{
   ReferneceCond == true ? (

      <div class="col-md-12">
      <label class="mb-0"> Bank List</label>
      <div class="mb-15 row">

      {checkList.map((item, index) => (
      <div className="col- ml-15 mr-15 mt-1" key={index}>
      <div class="form-radio">
      <label class="form-radio-label">
         <input type="radio" class="form-radio-input" name="bankList" value={item} onChange={handleInputChange}/>
         <span>{item}</span>
      </label>
      </div>
      </div>
      ))}

 </div>
   </div>

   ):(
      <></>
   ) 
}




{
   InstallmentCond == true ? (

      <div class="col-md-12">
   <div class="table-responsive">
 <table class="table table-bordered">
     <thead>
         <tr class="table-dark">
             <th class="">Installment Date</th>
             <th class="">Installment Amount</th>
             <th class="">Action</th>
         </tr>
     </thead>
     <tbody>
      { 
            inputList.map( (x,i)=>{
              return(
            <>
            <tr>
               <td><input type="date" name="installment_date" class="form-control" onChange={ e=>handleinputchangeData(e,i)}/></td>
               <td><input type="text" name="installment_amount" class="form-control" placeholder="Enter Amount" onChange={ e=>handleinputchangeData(e,i) }/></td>
               <td>
               {
                  inputList.length!==1 &&
                  <button type="button" class="btn btn-block btn-danger btn-sm"  onClick={()=> handleremove(i)}>Remove</button>
               }
               { inputList.length-1===i &&
                  <button type="button" class="btn btn-block btn-primary btn-sm" onClick={handleaddclick}>Add Row</button>
               }
               </td>
            </tr>
           </>
         );
         } )} 
     </tbody>
 </table>
</div>
</div>

   ):(
      <></>
   )
}

   


</div>
</div> */}
<hr />

{
    LoadingS == true ? (
      <button type="button" class="btn btn-primary mr-10" disabled>Submit</button>
    ):(
      <button type="submit" class="btn btn-primary mr-10">Submit</button>
    )
}
   <button type="submit" class="btn btn-light">Cancel</button>




</section>
</form>
</div>
</div>
</div>

</>
)
}

export default SoldInventories