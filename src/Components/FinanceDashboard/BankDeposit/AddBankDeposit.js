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

const AddBankDeposit = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  const SUperFinance = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);

  const [ChequeResult,setChequeResult]= useState([]);
  const [ChequeNoListResult,setChequeNoListResult]= useState([]);
  const [CompaniesResult,setCompaniesResult]= useState([]);
  const [BankListResult,setBankListResult]=useState([]);
  const [SingleRes,setSingleRes]= useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [ChequeAmountInWords,setChequeAmountInWords]=useState('0');
  const [AccountNo,setAccountNo]=useState('0');
  const [AccountTitle,setAccountTitle]=useState('-');
  const [BankName,setBankName]=useState('-');
  const [BranchName,setBranchName]=useState('-');

  const [DateOfDeposit,setDateOfDeposit]=useState(CurrentDate);
  const [AmountDeposit,setAmountDeposit]=useState('');
  const [ReferenceNo,setReferenceNo]=useState('');
  const [ModeOfDeposit,setModeOfDeposit]=useState('');
  const [TransactionDetails,setTransactionDetails]=useState('');
  const [RecievedFrom,setRecievedFrom]=useState('');
  const [BankDepStatus,setBankDepStatus]=useState('');
  const [CompanyId,setCompanyId]=useState('');
  const [ChequeNo,setChequeNo]=useState('0');
  const [ChequeDate,setChequeDate]=useState(CurrentDate);
  const [BankId,setBankId]=useState('-');

  const [LoadingS,setLoadingS]=useState(false);

  const ListCompanies = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setCompaniesResult(await GetArray);
  }

  const ListBankData = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listbanks`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBankListResult(await GetArray);
    }
  
useEffect(() => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  ListCompanies();
  ListBankData();
  dispatch(BankListAction(1,12,AuthData.company_id));
},[]);



  const SingleNewCheque = async (AccountNo) => {
   
    const response = await fetch(`${actionConfig.REACT_APP_URL}banklist/${AccountNo}`);
    const dataxs = await response.json();
    const GetArray = dataxs.data[0];
    setChequeResult(await GetArray);
    setAccountTitle(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.title);
    setBankName(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.bankname);
    setBranchName(AccountNo == '' || AccountNo == null ? '-' : GetArray == undefined ? '-' : GetArray.branch);
    }
    const SingleBankDepositRecords = async (id) => {
        const response = await fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`);
        const dataxs = await response.json();
        const GetArray = dataxs.data[0];
        setSingleRes(await dataxs.data);

        setDateOfDeposit(GetArray == '' || GetArray == null ? '' : GetArray.depositDate);
        setAmountDeposit(GetArray == '' || GetArray == null ? '' : GetArray.depositAmount);
        setReferenceNo(GetArray == '' || GetArray == null ? '' : GetArray.referenceNo);
        setModeOfDeposit(GetArray == '' || GetArray == null ? '' : GetArray.modeofdeposit);
        setTransactionDetails(GetArray == '' || GetArray == null ? '' : GetArray.transactionDetails);
        setRecievedFrom(GetArray == '' || GetArray == null ? '' : GetArray.recievedFrom);
        setAccountNo(GetArray == '' || GetArray == null ? '' : GetArray.accountId);
        setChequeAmountInWords(GetArray == '' || GetArray == null ? '' : GetArray.amountinwords);
        setBankDepStatus(GetArray == '' || GetArray == null ? '' : GetArray.status);
        setCompanyId(GetArray == '' || GetArray == null ? '' : GetArray.CompanyId);
        setChequeNo(GetArray == '' || GetArray == null ? '' : GetArray.ChequeNo);
        setChequeDate(GetArray == '' || GetArray == null ? '' : GetArray.ChequeDate);
        setBankId(GetArray == '' || GetArray == null ? '' : GetArray.BankId);

      }
  
      useEffect(() => {
        SingleBankDepositRecords(id);
    },[id == undefined ? '' : id]);
  


    const ChequeNoList = async (AccountNo) => {
    
        const response2 = await fetch(`${actionConfig.REACT_APP_URL}chequelistno/${AccountNo}`);
        const dataxs2 = await response2.json();
        const GetArray2 = dataxs2.data;
        setChequeNoListResult(await GetArray2);

    }

useEffect(() => {
if(AccountNo == undefined){
}else{
    SingleNewCheque(AccountNo);
    ChequeNoList(AccountNo);
}
},[AccountNo == undefined ? '' : AccountNo]);


  const AddNewBankDeposit = (e) => {
    
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('accountId',AccountNo);
    formData.append('depositDate',DateOfDeposit);
    formData.append('depositAmount',AmountDeposit);
    formData.append('referenceNo',ReferenceNo);
    formData.append('modeofdeposit',ModeOfDeposit);
    formData.append('transactionDetails',TransactionDetails);
    formData.append('recievedFrom',RecievedFrom);
    formData.append('amountinwords',ChequeAmountInWords);
    formData.append('CompanyId',CompanyId);
    formData.append('ChequeNo',ChequeNo);
    formData.append('ChequeDate',ChequeDate);
    formData.append('BankId',BankId);
    formData.append('company_id',AuthData.company_id);
    formData.append('status',0);
  
    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}bankdeposits`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/bank-deposit-list");
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


  const UpdateNewBankDeposit = (e) => {

    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('accountId',AccountNo);
    formData.append('depositDate',DateOfDeposit);
    formData.append('depositAmount',AmountDeposit);
    formData.append('referenceNo',ReferenceNo);
    formData.append('modeofdeposit',ModeOfDeposit);
    formData.append('transactionDetails',TransactionDetails);
    formData.append('recievedFrom',RecievedFrom);
    formData.append('amountinwords',ChequeAmountInWords);
    formData.append('CompanyId',CompanyId);
    formData.append('ChequeNo',ChequeNo);
    formData.append('ChequeDate',ChequeDate);
    formData.append('BankId',BankId);
    formData.append('status',BankDepStatus);
    formData.append('company_id',AuthData.company_id);
    
    formData.append('_method', 'PATCH');

    const requestOptions = {
      method: 'POST',
      body: formData
    };
        
    fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/bank-deposit-list");
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
    const AmountInWords = convertNumberToWords(AmountDeposit);
    setChequeAmountInWords(AmountInWords == '' ? '' : "Rupees "+AmountInWords+" Only");
    },[AmountDeposit == '' || AmountDeposit == null ? '' : AmountDeposit]);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Bank Deposit</h2>

</div>
<div class="d-flex">
<NavLink to="/bank-deposit-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ?  AddNewBankDeposit : UpdateNewBankDeposit}>
<div class="row">

<div className="form-group col-md-4">
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

  <div className="form-group col-md-4">
    <label htmlFor="">Account #*</label>
        <select name="AccountNo" id="" className="form-control" onChange={e=>setAccountNo(e.target.value)} value={AccountNo}>
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
    <label htmlFor="">Date Of Deposit*</label>
    <input type="date" name="DateOfDeposit" className="form-control" onChange={e=>setDateOfDeposit(e.target.value)} value={DateOfDeposit} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Amount Deposit*</label>
    <input type="number" name="AmountDeposit" className="form-control" onChange={e=>setAmountDeposit(e.target.value)} value={AmountDeposit} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Reference No*</label>
    <input type="text" name="ReferenceNo" className="form-control" onChange={e=>setReferenceNo(e.target.value)} value={ReferenceNo} />
  </div>
  

  <div className="form-group col-md-4">
    <label htmlFor="">Mode Of Deposit*</label>
    <select name="ModeOfDeposit" id="" className="form-control" onChange={e=>setModeOfDeposit(e.target.value)} value={ModeOfDeposit}>
      <option value="">Select Option</option>
      <option value="Cash">Cash</option>
      <option value="Cheque">Cheque</option>
      <option value="payorder">Pay Order</option>
      <option value="bankonline">Bank ( Online )</option>
    </select>
  </div>


  <div className={`form-group col-md-3 ${ModeOfDeposit === 'Cash' || ModeOfDeposit === '' ? 'd-none' : ''}`}>
<label htmlFor="">Cheque No</label>
<input type="text" name="ChequeNo" id="" className="form-control" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo} />
</div>

<div className={`form-group col-md-3 ${ModeOfDeposit === 'Cash' || ModeOfDeposit === '' ? 'd-none' : ''}`}>
<label htmlFor="">Cheque Date</label>
<input type="date" name="ChequeDate" id="" className="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate} />
</div>

<div className={`form-group col-md-3 ${ModeOfDeposit === 'Cash' || ModeOfDeposit === '' ? 'd-none' : ''}`}>
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

  <div className="form-group col-md-12">
    <label htmlFor="">Transaction Detail*</label>
    <textarea name="TransactionDetails" id="" cols="30" rows="5" className="form-control"  onChange={e=>setTransactionDetails(e.target.value)} value={TransactionDetails}></textarea>
  </div>

  <div className="form-group col-md-12">
    <label htmlFor="">Recieved From*</label>
    <input type="text" name="RecievedFrom" className="form-control" onChange={e=>setRecievedFrom(e.target.value)} value={RecievedFrom} />
  </div>

  <div className="form-group col-md-12">
    <label htmlFor="">Amount in Words</label>
    <input type="text" name="ChequeAmountInWords" className="form-control" onChange={e=>setChequeAmountInWords(e.target.value)} value={ChequeAmountInWords} readOnly placeholder='Cheque Amount In Words' />
  </div>

  {
  SUperFinance.length == 0 ? (
    <></>
  ):(
    id == null ? (
      <></>
    ):(
    <div class="form-group col-md-4">
      <label for="inputPassword4">Status*</label>
      <select id="BankDepStatus" name="BankDepStatus" class="form-control" onChange={e=>setBankDepStatus(e.target.value)} value={BankDepStatus} required>
        <option value="" selected>Select Option</option>
        <option value="0">Pending</option>
        <option value="1">Approved</option>
      </select>
    </div>
    )

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

export default AddBankDeposit