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

const AddChequeOutwardRegister = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const AuthData = JSON.parse(localStorage.getItem('authdata'));

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [ChequeResult,setChequeResult]= useState([]);
  const [ChequeNoListResult,setChequeNoListResult]= useState([]);
  const [SingleRes,setSingleRes]= useState([]);
  const [BankListDataResult,setBankListDataResult]= useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [ChequeDate,setChequeDate]=useState(CurrentDate);
  const [IssueDate,setIssueDate]=useState(CurrentDate);
  const [ChequeNo,setChequeNo]=useState('0');
  const [ChequeAmount,setChequeAmount]=useState('0');
  const [ChequeAmountInWords,setChequeAmountInWords]=useState('0');
  const [AccountNo,setAccountNo]=useState('0');
  const [AccountTitle,setAccountTitle]=useState('-');
  const [BankName,setBankName]=useState('-');
  const [BranchName,setBranchName]=useState('-');
  const [StartSerialNo,setStartSerialNo]=useState('');
  const [EndSerialNo,setEndSerialNo]=useState('');
  const [NoofCheque,setNoofCheque]=useState('0');
  const [ChequeStatus,setChequeStatus]=useState('');
  const [Purpose,setPurpose]=useState('');
  const [IssuedTo,setIssuedTo]=useState('');

  const [ClearedDate,setClearedDate]=useState('');
  const [ClearedReason,setClearedReason]=useState('');
  const [ClearedStatus,setClearedStatus]=useState(false);

  const [StopDate,setStopDate]=useState('');
  const [StopReason,setStopReason]=useState('');
  const [StopStatus,setStopStatus]=useState(false);

  const [CancelledDate,setCancelledDate]=useState('');
  const [CancelledReason,setCancelledReason]=useState('');
  const [CancelledStatus,setCancelledStatus]=useState(false);

  const [HoldDate,setHoldDate]=useState('');
  const [HoldReason,setHoldReason]=useState('');
  const [HoldStatus,setHoldStatus]=useState(false);

  const [LoadingS,setLoadingS]=useState(false);

  
useEffect(() => {
  dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

useEffect(() => {
    if(ChequeStatus == 'Released'){
      setClearedStatus(false);
      setStopStatus(false);
      setCancelledStatus(false);
      setHoldStatus(false);
    }else if(ChequeStatus == 'Cleared'){
      setClearedStatus(true);
      setStopStatus(false);
      setCancelledStatus(false);
      setHoldStatus(false);
    }else if(ChequeStatus == 'Stop'){
      setClearedStatus(false);
      setStopStatus(true);
      setCancelledStatus(false);
      setHoldStatus(false);
    }else if(ChequeStatus == 'Hold'){
      setClearedStatus(false);
      setStopStatus(false);
      setCancelledStatus(false);
      setHoldStatus(true);
    }else if(ChequeStatus == 'Cancelled'){
      setClearedStatus(false);
      setStopStatus(false);
      setCancelledStatus(true);
      setHoldStatus(false);
    }else{
      setClearedStatus(false);
      setStopStatus(false);
      setCancelledStatus(false);
      setHoldStatus(false);
    }
},[ChequeStatus == '' || ChequeStatus == undefined || ChequeStatus == null ? '' : ChequeStatus]);


useEffect(() => {
  
  if(StartSerialNo == ''){
    var StartSerial = '';
  }else{
    var StartSerial = StartSerialNo;
    var sFinal = StartSerial.slice(-5);
  }
  
  if(EndSerialNo == ''){
    var EndSerial = '';
  }else{
    var EndSerial = EndSerialNo;
    var eFinal = EndSerial.slice(-5);
  }
  
  var NofOfCheck = parseInt(eFinal) - parseFloat(sFinal) + 1;

  setNoofCheque(NofOfCheck);

},[EndSerialNo]);



  const SingleNewCheque = async (AccountNo) => {
   
    const response = await fetch(`${actionConfig.REACT_APP_URL}banklist/${AccountNo}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data[0];
    setChequeResult(await GetArray);

    console.log("GetArray",GetArray);
    setAccountTitle(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.title);
    setBankName(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.bankname);
    setBranchName(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.branch);

    }


    const SingleChequeOutwardRecords = async (id) => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}chequeoutwardregister/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        setSingleRes(await dataxs.data);
        console.log("GetArray",GetArray);

        setChequeDate(GetArray == '' || GetArray == null ? '' : GetArray.chequeDate);
        setIssueDate(GetArray == '' || GetArray == null ? '' : GetArray.issueDate);
        setAccountNo(GetArray == '' || GetArray == null ? '' : GetArray.accountId);
        setChequeNo(GetArray == '' || GetArray == null ? '' : GetArray.chequeNoId);
        setPurpose(GetArray == '' || GetArray == null ? '' : GetArray.Purpose);
        setIssuedTo(GetArray == '' || GetArray == null ? '' : GetArray.IssuedTo);

        setClearedDate(GetArray == '' || GetArray == null ? '' : GetArray.clearedDate);
        setStopDate(GetArray == '' || GetArray == null ? '' : GetArray.stopDate);
        setStopReason(GetArray == '' || GetArray == null ? '' : GetArray.stopReason);
        setCancelledDate(GetArray == '' || GetArray == null ? '' : GetArray.cancelledDate);
        setCancelledReason(GetArray == '' || GetArray == null ? '' : GetArray.cancelledReason);
        setHoldDate(GetArray == '' || GetArray == null ? '' : GetArray.holdDate);
        setHoldReason(GetArray == '' || GetArray == null ? '' : GetArray.holdReason);


        setChequeStatus(GetArray == '' || GetArray == null || GetArray.Chequelist == '' || GetArray.Chequelist == null || GetArray.Chequelist == undefined ? '' : GetArray.Chequelist.cheqStatus);
        setChequeAmount(GetArray == '' || GetArray == null ? '' : GetArray.chequeAmount);
        setChequeAmountInWords(GetArray == '' || GetArray == null ? '' : GetArray.ChequeAmountInWord);
        setIssuedTo(GetArray == '' || GetArray == null ? '' : GetArray.IssuedTo);

        if(GetArray.Chequelist.cheqStatus == 'Released'){
          setClearedStatus(false);
          setStopStatus(false);
          setCancelledStatus(false);
          setHoldStatus(false);
        }else if(GetArray.Chequelist.cheqStatus == 'Cleared'){
          setClearedStatus(true);
          setStopStatus(false);
          setCancelledStatus(false);
          setHoldStatus(false);
        }else if(GetArray.Chequelist.cheqStatus == 'Stop'){
          setClearedStatus(false);
          setStopStatus(true);
          setCancelledStatus(false);
          setHoldStatus(false);
        }else if(GetArray.Chequelist.cheqStatus == 'Cancelled'){
          setClearedStatus(false);
          setStopStatus(false);
          setCancelledStatus(true);
          setHoldStatus(false);
        }else if(GetArray.Chequelist.cheqStatus == 'Hold'){
          setClearedStatus(false);
          setStopStatus(false);
          setCancelledStatus(false);
          setHoldStatus(true);
        }else{
          setClearedStatus(false);
          setStopStatus(false);
          setCancelledStatus(false);
          setHoldStatus(false);
        }
          
  
      }
  
      useEffect(() => {
        SingleChequeOutwardRecords(id);
    },[id == undefined ? '' : id]);
  


    const ChequeNoList = async (AccountNo) => {
    
        const response2 = await fetch(`${actionConfig.REACT_APP_URL}chequelistno/${AccountNo}`);
        const dataxs2 = await response2.json();
        const GetArray2 = dataxs2.data;
        setChequeNoListResult(await GetArray2);

    }

    const GetBankListData = async () => {
      const AuthDatax = JSON.parse(localStorage.getItem('authdata'));
      const response2 = await fetch(`${actionConfig.REACT_APP_URL}getbanklistdata?company_id=${AuthDatax.company_id}`);
      const dataxs2 = await response2.json();
      const GetArray2 = dataxs2.data;
      setBankListDataResult(await GetArray2);

  }

  useEffect(() => {
    GetBankListData();
    },[]);

useEffect(() => {
if(AccountNo == undefined){
}else{
    SingleNewCheque(AccountNo);
    ChequeNoList(AccountNo);
}
},[AccountNo == undefined ? '' : AccountNo]);


  const AddNewChequeBook = (e) => {
    
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('chequeNoId',ChequeNo);
    formData.append('accountId',AccountNo);
    formData.append('issueDate',IssueDate);
    formData.append('chequeDate',ChequeDate);
    formData.append('chequeAmount',ChequeAmount);
    formData.append('ChequeAmountInWord',ChequeAmountInWords);
    formData.append('IssuedTo',IssuedTo);
    formData.append('Purpose',Purpose);
    formData.append('company_id',AuthData.company_id);
  
    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}chequeoutwardregister`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/list-cheque-outward-register");
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


  const UpdateNewChequeBook = (e) => {

    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('chequeNoId',ChequeNo);
    formData.append('accountId',AccountNo);
    formData.append('issueDate',IssueDate);
    formData.append('chequeDate',ChequeDate);
    formData.append('chequeAmount',ChequeAmount);
    formData.append('ChequeAmountInWord',ChequeAmountInWords);
    formData.append('IssuedTo',IssuedTo);
    formData.append('clearedDate',ClearedDate);
    formData.append('stopDate',StopDate);
    formData.append('stopReason',StopReason);
    formData.append('cancelledDate',CancelledDate);
    formData.append('cancelledReason',CancelledReason);
    formData.append('holdDate',HoldDate);
    formData.append('holdReason',HoldReason);
    formData.append('cheqStatus',ChequeStatus);
    formData.append('Purpose',Purpose);
    formData.append('company_id',AuthData.company_id);
    formData.append('_method', 'PATCH');

    const requestOptions = {
      method: 'POST',
      body: formData
    };
        
    fetch(`${actionConfig.REACT_APP_URL}chequeoutwardregister/${id}`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/list-cheque-outward-register");
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

  
  const convertNumberToWords = (amount) => {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        var value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}

  useEffect(() => {
    const AmountInWords = convertNumberToWords(ChequeAmount);
    setChequeAmountInWords(AmountInWords == '' ? '' : "Rupees "+AmountInWords+" Only");
    },[ChequeAmount == '' || ChequeAmount == null ? '' : ChequeAmount]);


console.log("ChequeNoListResult",ChequeNoListResult);


const ChequeAmountAct = (e) => {
  let val = e.target.value;
  val = val.replace(/\D/g,"");
  // val = val.replace(/(\d)(\d{3})$/,"$1,$2");
  val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // val = val.replace(/(?=(\d{3})+(\D))\B/g,", ");
  setChequeAmount(val);
}

console.log("BankListDataResult",BankListDataResult);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Cheque Register</h2>

</div>
<div class="d-flex">
<NavLink to="/list-cheque-outward-register" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ?  AddNewChequeBook : UpdateNewChequeBook}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Issue Date*</label>
    <input type="date" name="issueDate" className="form-control" onChange={e=>setIssueDate(e.target.value)} value={IssueDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Cheque Date*</label>
    <input type="date" name="chequeDate" className="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Account #*</label>
    {
      id == '' || id == null || id == undefined ? (
        <select name="AccountNo" id="" className="form-control" onChange={e=>setAccountNo(e.target.value)} value={AccountNo}>
        <option value="">Select Account No</option>
        {
  
  BankListDataResult == null ? (
    <>Loading.....</>
  ):(
  
    BankListDataResult.length > 0 ? (
      BankListDataResult.map((curElem , index) => {
  
  return (
    <option value={curElem.id}>{curElem.accountno} ({curElem.bankname})</option>
    )
    
  
  })
  
  ): (
    <>
    <tr>
          <td colspan="1">No Record Found</td>  
      </tr>
    </>
    )
  
  )
  
  }
      </select>
      ):(
        <select name="AccountNo" id="" className="form-control" onChange={e=>setAccountNo(e.target.value)} value={AccountNo} disabled>
      <option value="">Select Account No</option>
      {

resultBankList.data == null ? (
  <>Loading.....</>
):(

  resultBankList.data.length > 0 ? (
    resultBankList.data.map((curElem , index) => {

return (
  <option value={curElem.id}>{curElem.accountno} ({curElem.bankname})</option>
  )
  

})

): (
  <>
  <tr>
        <td colspan="1">No Record Found</td>  
    </tr>
  </>
  )

)

}
    </select>
      )
    }
    
    
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">A/C Title</label>
    <input type="text" name="AccountTitle" className="form-control" onChange={e=>setAccountTitle(e.target.value)} value={AccountTitle} disabled placeholder='Account Title' />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bank Name</label>
    <input type="text" name="BankName" className="form-control" onChange={e=>setBankName(e.target.value)} value={BankName} disabled placeholder='Bank Name' />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Branch Name</label>
    <input type="text" name="BranchName" className="form-control" onChange={e=>setBranchName(e.target.value)} value={BranchName} disabled placeholder='Branch Name'/>
  </div>


  <div className="form-group col-md-4">
    <label htmlFor="">Cheque No *</label>
    {
      id == '' || id == null || id == undefined ? (

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

      ):(
        <select name="chequeNo" id="chequeNo" className="form-control" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo} disabled>
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
      )

    }
   
  </div>


  <div className="form-group col-md-4">
    <label htmlFor="">Purpose</label>
    <input type="text" name="Purpose" className="form-control" onChange={e=>setPurpose(e.target.value)} value={Purpose} placeholder='Purpose' />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Issued To</label>
    <input type="text" name="IssuedTo" className="form-control" onChange={e=>setIssuedTo(e.target.value)} value={IssuedTo} placeholder='Issued To' />
  </div>

 

  <div className="form-group col-md-4">
    <label htmlFor="">Amount</label>
    <input type="text" name="ChequeAmount" className="form-control" onChange={(e)=>ChequeAmountAct(e)} value={ChequeAmount} placeholder='Cheque Amount' />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Amount in Words</label>
    <input type="text" name="ChequeAmountInWords" className="form-control" onChange={e=>setChequeAmountInWords(e.target.value)} value={ChequeAmountInWords} placeholder='Cheque Amount In Words' />
  </div>

  {
    id == '' || id == null ? '' : (
      <>
        <div className="form-group col-md-4">
          <label htmlFor="">Cheque Status</label>
          <select name="chequeNo" id="chequeStatus" className="form-control" onChange={e=>setChequeStatus(e.target.value)} value={ChequeStatus}>
              <option value="">Selected Cheque Status</option>
              <option value="Released">Uncleared</option>
              <option value="Cleared">Cleared</option>
              <option value="Stop">Stop</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Hold">Hold</option>
          </select>
        </div>
        
        <div className={`col-md-12 ${ClearedStatus == false ? 'd-none' : ''}`}>
          <div className='row'>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Cleared Date</label>
              <input type="date" name="ClearedDate" className="form-control" onChange={e=>setClearedDate(e.target.value)} value={ClearedDate} />
            </div>
          </div>
        </div>

        <div className={`col-md-12 ${StopStatus == false ? 'd-none' : ''}`}>
          <div className='row'>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Stop Date</label>
              <input type="date" name="StopDate" className="form-control" onChange={e=>setStopDate(e.target.value)} value={StopDate} />
            </div>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Stop Reason</label>
              <input type="text" name="StopReason" className="form-control" onChange={e=>setStopReason(e.target.value)} value={StopReason} />
            </div>
          </div>
        </div>

        <div className={`col-md-12 ${CancelledStatus == false ? 'd-none' : ''}`}>
          <div className='row'>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Cancelled Date</label>
              <input type="date" name="CancelledDate" className="form-control" onChange={e=>setCancelledDate(e.target.value)} value={CancelledDate} />
            </div>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Cancelled Reason</label>
              <input type="text" name="CancelledReason" className="form-control" onChange={e=>setCancelledReason(e.target.value)} value={CancelledReason} />
            </div>
          </div>
        </div>

        <div className={`col-md-12 ${HoldStatus == false ? 'd-none' : ''}`}>
          <div className='row'>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Hold Date</label>
              <input type="date" name="HoldDate" className="form-control" onChange={e=>setHoldDate(e.target.value)} value={HoldDate} />
            </div>
            <div className={`form-group col-md-4`}>
              <label htmlFor="">Hold Reason</label>
              <input type="text" name="HoldReason" className="form-control" onChange={e=>setHoldReason(e.target.value)} value={HoldReason} />
            </div>
          </div>
        </div>

     
      </>

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

export default AddChequeOutwardRegister