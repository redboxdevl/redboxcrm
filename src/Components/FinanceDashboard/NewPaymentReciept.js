import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import LoadingSpinner from './LoadingSpinner';
import moment from 'moment';
const NewPaymentReciept = () => {

  let { id,sid } = useParams();
   
  const navigate = useNavigate();
  // let { id } = useParams();
  const dispatch = useDispatch();

    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    var CurrentDate = moment().format('YYYY-MM-DD');

    const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);


    const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
    
  
  const [SinglePaymentResult,setSinglePaymentResult]= useState([]);

  const ListPaymentDataSingle = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}paymentplandata/${id}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data[0];
    setSinglePaymentResult(await GetArray);
    }

    useEffect(() => {
      ListPaymentDataSingle();
  },[]);


  const [PaymentDate,setPaymentDate]=useState(CurrentDate);

  const [DueAmount,setDueAmount]=useState('0');
  const [RecievedAmount,setRecievedAmount]=useState('0');
  const [PropId,setPropId]=useState('');
  const [BlockId,setBlockId]=useState('');
 ;

  const [LoadingS,setLoadingS]=useState(false);
  const [ModeCheck,setModeCheck]=useState('');

  const [CashAmount,setCashAmount]=useState('0');
  const [CashVoucherNo,setCashVoucherNo]=useState('0');
  const [BankOnlineAmt,setBankOnlineAmt]=useState('0');
  const [BankOnlineName,setBankOnlineName]=useState('-');
  const [BankTransactionId,setBankTransactionId]=useState('0');
  const [ChequeAmt,setChequeAmt]=useState('0');
  const [ChequeNo,setChequeNo]=useState('0');
  const [ChequeDate,setChequeDate]=useState('null');
  const [ChequeBankName,setChequeBankName]=useState('-');
  const [PayorderAmt,setPayorderAmt]=useState('0');
  const [PayorderNo,setPayorderNo]=useState('0');
  const [PayorderDate,setPayorderDate]=useState('null');
  const [PayorderBankName,setPayorderBankName]=useState('-');
  const [FileAmt,setFileAmt]=useState('0');
  const [FileNo,setFileNo]=useState('0');

  const [CashCond,setCashCond]=useState(false);
  const [BankCond,setBankCond]=useState(false);
  const [ChequeCond,setChequeCond]=useState(false);
  const [PayOrderCond,setPayOrderCond]=useState(false);
  const [FileCond,setFileCond]=useState(false);
  const [Message,setMessage]=useState('');



  const ModeOfPayment = (event) => {
    var updatedList = [...ModeCheck];
    if (event.target.checked) {
    updatedList = [...ModeCheck, event.target.value];
    } else {
    updatedList.splice(ModeCheck.indexOf(event.target.value), 1);
    }
    setModeCheck(updatedList);
  }

  const cashCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'cash');
  const ChequeCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'Cheque');
  const BankCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'Bank (Online)');
  const payorderCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'Pay Order | DD');
  const fileMergingCon = ModeCheck == '' ? '' : ModeCheck.filter(st => st === 'File (Merging)');




  const NewPaymentReciept = (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append('recieptDate', PaymentDate);
    formData.append('agentId', AuthData.id == null ? '' : AuthData.id);
    formData.append('RecievedAmount', RecievedAmount);
    formData.append('planId', sid);
    formData.append('statementId', id);
    
    formData.append('ModeOfPayment', ModeCheck);
    formData.append('cashAmount', CashAmount);
    formData.append('cashVoucherNo', CashVoucherNo);
    formData.append('bankonlineAmount', BankOnlineAmt);
    formData.append('bankonlineName', BankOnlineName);
    formData.append('BankTransactionId', BankTransactionId);
    formData.append('chequeAmount', ChequeAmt);
    formData.append('chequeNo', ChequeNo);
    formData.append('ChequeDate', ChequeDate);
    formData.append('ChequeBankName', ChequeBankName);
    formData.append('payorderAmount', PayorderAmt);
    formData.append('payorderNo', PayorderNo);
    formData.append('payorderDate', PayorderDate);
    formData.append('payorderBankName', PayorderBankName);
    formData.append('fileAmount', FileAmt);
    formData.append('fileNo', FileNo);


    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}paymentreciept`, requestOptions)
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){

          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );

          navigate(`/payment-statement/${sid}`);
          //setLoadingS(false);
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }

      });


  }

  useEffect(() => {
    
},[]);

  // console.log("SinglePaymentResult",SinglePaymentResult);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payment Reciept</h2>

</div>
<div class="d-flex">
<NavLink to={`/payment-statement/${sid}`} className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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

  <h4 className='badge badge-primary'><b>Account Head :</b> {SinglePaymentResult == '' ? '' : SinglePaymentResult.accountHead}</h4>
<form onSubmit={NewPaymentReciept}>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Date*</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="date" className="form-control" placeholder='Date' onChange={e=>setPaymentDate(e.target.value)} value={PaymentDate} />
</div>
</div>
</div>


<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Due Amount*</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="text" className="form-control" placeholder='Due Amount' onChange={e=>setDueAmount(e.target.value)} value={SinglePaymentResult == '' ? '0' : SinglePaymentResult.dueAmount} disabled />
</div>
</div>
</div>

<div className='row'>
<div className="col-md-2 pr-0">
<div className="form-group text-right">
<label htmlFor="" className='pt-2'>Recieved Amount*</label>
</div>
</div>
<div className="col-md-5">
<div className="form-group">
<input type="text" className="form-control" placeholder='Recieved Amount' onChange={e=>setRecievedAmount(e.target.value)} value={RecievedAmount} />

{
  RecievedAmount == '' ? (
    <></>
  ):(
    <>
    {
      RecievedAmount <= parseFloat(SinglePaymentResult.dueAmount) ? '' : <span className="badge badge-danger">Amount Not Correctly</span>
    }
    </>
  )
}


</div>
</div>
</div>

<div className="row">
<div class={`form-group col-md-2 text-right pt-3`}>
  <label for="inputPassword4" class="font-weight-bolder">Mode Of Payment*</label>
</div>
<div className="col-md-12">
<div className="row">
  <div className="col-md-2 text-right" style={{display:'flex',flexDirection:'column',alignItems:'self-end',justifyContent:'space-around',height:'63vh'}}>
  <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input" name="blocktype" value="cash" onChange={ModeOfPayment} />Cash
    </label>
  </div>
  <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input" name="blocktype" value="Bank (Online)" onChange={ModeOfPayment}/>Bank (Online)
    </label>
  </div>
  <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input" name="blocktype" value="Cheque" onChange={ModeOfPayment}/>Cheque
    </label>
  </div>
 
  <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input" name="blocktype" value="Pay Order | DD" onChange={ModeOfPayment}/>Pay Order | DD
    </label>
  </div>

  <div className="form-check">
    <label className="form-check-label">
      <input type="checkbox" className="form-check-input" name="blocktype" value="File (Merging)" onChange={ModeOfPayment} />File (Merging)
    </label>
  </div>
  </div>
  <div className="col-md-10" style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
  <div className={`row`}>
<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Amount</label>
  {
    cashCon.length == 0 ? <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setCashAmount(e.target.value)} value={CashAmount} disabled/>  : <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setCashAmount(e.target.value)} value={CashAmount}/> 
  }
  
</div>
<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Voucher # / Reciept / Slip</label>
  {
    cashCon.length == 0 ? <input type="text" name="voucherNo" class="form-control" placeholder="Voucher No" onChange={e=>setCashVoucherNo(e.target.value)} value={CashVoucherNo} disabled/>  : <input type="text" name="voucherNo" class="form-control" placeholder="Voucher No" onChange={e=>setCashVoucherNo(e.target.value)} value={CashVoucherNo}/> 
  }
  
</div>
</div>

<div className={`row`}>
<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Amount</label>
  {
    BankCon.length == 0 ? <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setBankOnlineAmt(e.target.value)} value={BankOnlineAmt} disabled/>  : <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setBankOnlineAmt(e.target.value)} value={BankOnlineAmt}/> 
  }
  
</div>

<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Bank Name</label>
  {
    BankCon.length == 0 ? <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setBankOnlineName(e.target.value)} value={BankOnlineName} disabled/>  : <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setBankOnlineName(e.target.value)} value={BankOnlineName} /> 
  }
  
</div>

<div class={`form-group col-md-4`}>
  <label for="inputPassword4">Transaction Id / Reference</label>
  {
    BankCon.length == 0 ? <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setBankTransactionId(e.target.value)} value={BankTransactionId} disabled/>  : <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setBankTransactionId(e.target.value)} value={BankTransactionId}/> 
  }
  
</div>
</div>

<div className={`row`}>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Amount</label>
  {
    ChequeCon.length == 0 ?  <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setChequeAmt(e.target.value)} value={ChequeAmt} disabled/> :  <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setChequeAmt(e.target.value)} value={ChequeAmt}/> 
  }
 
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Cheque #</label>
  {
    ChequeCon.length == 0 ? <input type="text" name="voucherNo" class="form-control" placeholder="Cheque No" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo} disabled/> : <input type="text" name="voucherNo" class="form-control" placeholder="Cheque No" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo}/>
  }
   
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Cheque Date</label>
  {
    ChequeCon.length == 0 ? <input type="date" name="chequeDate" class="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate} disabled/> : <input type="date" name="chequeDate" class="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate}/> 
  }
  
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Bank Name</label>
  {
    ChequeCon.length == 0 ? <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setChequeBankName(e.target.value)} value={ChequeBankName} disabled/> : <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setChequeBankName(e.target.value)} value={ChequeBankName}/>
  }
   
</div>
</div>

<div className={`row`}>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Amount</label>
  {
    payorderCon.length == 0 ? <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setPayorderAmt(e.target.value)} value={PayorderAmt} disabled/> : <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setPayorderAmt(e.target.value)} value={PayorderAmt}/>
  }
   
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">PO #</label>
  {
    payorderCon.length == 0 ? <input type="text" name="voucherNo" class="form-control" placeholder="PO #" onChange={e=>setPayorderNo(e.target.value)} value={PayorderNo} disabled/> : <input type="text" name="voucherNo" class="form-control" placeholder="PO #" onChange={e=>setPayorderNo(e.target.value)} value={PayorderNo}/>
  }
   
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">PO Date</label>
  {
    payorderCon.length == 0 ? <input type="date" name="chequeDate" class="form-control" onChange={e=>setPayorderDate(e.target.value)} value={PayorderDate} disabled/> : <input type="date" name="chequeDate" class="form-control" onChange={e=>setPayorderDate(e.target.value)} value={PayorderDate}/>
  }
  
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Bank Name</label>
  {
    payorderCon.length == 0 ? <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setPayorderBankName(e.target.value)} value={PayorderBankName} disabled/> : <input type="text" name="chequeDate" class="form-control" placeholder="Bank Name" onChange={e=>setPayorderBankName(e.target.value)} value={PayorderBankName}/> 
  }
  
</div>
</div>

<div className={`row`}>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Amount</label>
  {
    fileMergingCon.length == 0 ? <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setFileAmt(e.target.value)} value={FileAmt} disabled/> : <input type="text" name="modeAmount" class="form-control" placeholder="Amount" onChange={e=>setFileAmt(e.target.value)} value={FileAmt} />
  }
   
</div>
<div class={`form-group col-md-3`}>
  <label for="inputPassword4">File #</label>
  {
    fileMergingCon.length == 0 ? <input type="text" name="voucherNo" class="form-control" placeholder="File #" onChange={e=>setFileNo(e.target.value)} value={FileNo} disabled/>  : <input type="text" name="voucherNo" class="form-control" placeholder="File #" onChange={e=>setFileNo(e.target.value)} value={FileNo}/> 
  }
  
</div>

</div>


  </div>
</div>

</div>
</div>

{
  RecievedAmount <= parseFloat(SinglePaymentResult.dueAmount) ? <button type="submit" class="btn btn-primary">Submit</button> : <button type="submit" class="btn btn-primary" disabled>Submit</button>
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

export default NewPaymentReciept