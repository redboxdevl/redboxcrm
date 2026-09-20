import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../LoadingSpinner';
import { BankListAction } from '../../../redux/action/BankListAction';
import moment from 'moment/moment';

const AddPostDatedCheque = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  var CurrentDate = moment().format('YYYY-MM-DD');

  const [PostDatedListResult,setPostDatedListResult]=useState([]);
  const [BankListResult,setBankListResult]=useState([]);
  
  
  const [ChequeDate,setChequeDate]=useState(CurrentDate);
  const [RecievedDate,setRecievedDate]=useState(CurrentDate);
  const [Amount,setAmount]=useState('0');
  const [AmountInWords,setAmountInWords]=useState('-');
  const [ChequeNo,setChequeNo]=useState('0');
  const [RecievedFrom,setRecievedFrom]=useState('');
  const [BankName,setBankName]=useState('');
  const [BranchName,setBranchName]=useState('');
  const [Purpose,setPurpose]=useState('');
  const [PayeeType,setPayeeType]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [Status,setStatus]=useState('');
  const [DateOfDeposit,setDateOfDeposit]=useState('');
  const [ACDeposit,setACDeposit]=useState('');
  const [DateOfReleased,setDateOfReleased]=useState('');
  const [ReleasedTitle,setReleasedTitle]=useState('-');
  const [BeneficiaryTitle,setBeneficiaryTitle]=useState('-');
  const [DateOfReturned,setDateOfReturned]=useState('');
  const [ReturnedTitle,setReturnedTitle]=useState('-');
  const [DocFiles,setDocFiles]=useState('');


  const SingleNewPostDatedList = async (id) => {
   
    const response2 = await fetch(`${actionConfig.REACT_APP_URL}postdatedcheque/${id}`);
    const dataxs2 = await response2.json();
    const GetArray3 = dataxs2.data[0];
    setPostDatedListResult(await GetArray3);
  
    console.log("GetArray3",GetArray3);

    setChequeDate(GetArray3.chequeDate);
    setRecievedDate(GetArray3.RecievedDate);
    setAmount(GetArray3.Amount);
    setAmountInWords(GetArray3.AmountInWords);
    setChequeNo(GetArray3.ChequeNo);
    setRecievedFrom(GetArray3.RecievedFrom);
    setBankName(GetArray3.BankName);
    setBranchName(GetArray3.BranchName);
    setPurpose(GetArray3.Purpose);
    setPayeeType(GetArray3.PayeeType);
    setStatus(GetArray3.Status);
    setBeneficiaryTitle(GetArray3.BeneficiaryTitle);
    setDocFiles(GetArray3.AttachementImage);

    setDateOfDeposit(GetArray3.DateOfDeposit);
    setACDeposit(GetArray3.AcDeposit);
    setDateOfReleased(GetArray3.DateOfReleased);
    setReleasedTitle(GetArray3.ReleasedTitle);
    setDateOfReturned(GetArray3.DateOfReturned);
    setReturnedTitle(GetArray3.ReturnTitle);

  
    }


    const changeHandler = (event) => {
      setDocFiles(event.target.files[0]);
    };
  
    useEffect(() => {
      if(id == undefined || id == null){
      }else{
        SingleNewPostDatedList(id);
      }
  },[id == undefined || id == null ? '' : id]);


  const ListBankData = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listbanks`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBankListResult(await GetArray);
    }

  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
  ListBankData();
  },[]);


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
  const AmountInWords = convertNumberToWords(Amount);
  setAmountInWords(AmountInWords == '' ? '' : "Rupees "+AmountInWords+" Only");
  },[Amount == '' || Amount == null ? '' : Amount]);
  
  
  const AddNewPostDatedCheque = (e) => {
    
    e.preventDefault();

    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('chequeDate',ChequeDate);
    formData.append('RecievedDate',RecievedDate);
    formData.append('Amount',Amount);
    formData.append('AmountInWords',AmountInWords);
    formData.append('BankName',BankName);
    formData.append('BranchName',BranchName);
    formData.append('ChequeNo',ChequeNo);
    formData.append('RecievedFrom',RecievedFrom);
    formData.append('Purpose',Purpose);
    formData.append('Status',Status);
    formData.append('PayeeType',PayeeType);
    formData.append('BeneficiaryTitle',BeneficiaryTitle);
    formData.append('Attachement', DocFiles);

    formData.append('DateOfDeposit',DateOfDeposit);
    formData.append('AcDeposit',ACDeposit);
    formData.append('DateOfReleased',DateOfReleased);
    formData.append('ReleasedTitle',ReleasedTitle);
    formData.append('DateOfReturned',DateOfReturned);
    formData.append('ReturnTitle',ReturnedTitle);

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}postdatedcheque`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/list-post-dated-cheque");
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


  const UpdateNewPostDatedCheque = (e) => {

    e.preventDefault();

    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('chequeDate',ChequeDate);
    formData.append('RecievedDate',RecievedDate);
    formData.append('Amount',Amount);
    formData.append('AmountInWords',AmountInWords);
    formData.append('BankName',BankName);
    formData.append('BranchName',BranchName);
    formData.append('ChequeNo',ChequeNo);
    formData.append('RecievedFrom',RecievedFrom);
    formData.append('Purpose',Purpose);
    formData.append('Status',Status);
    formData.append('PayeeType',PayeeType);
    formData.append('BeneficiaryTitle',BeneficiaryTitle);
    formData.append('Attachement', DocFiles);

    formData.append('DateOfDeposit',DateOfDeposit);
    formData.append('AcDeposit',ACDeposit);
    formData.append('DateOfReleased',DateOfReleased);
    formData.append('ReleasedTitle',ReleasedTitle);
    formData.append('DateOfReturned',DateOfReturned);
    formData.append('ReturnTitle',ReturnedTitle);

    formData.append('_method', 'PATCH');

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}postdatedcheque/${id}`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/list-post-dated-cheque");
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



return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Post Dated Cheque</h2>

</div>
<div class="d-flex">
<NavLink to="/list-post-dated-cheque" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewPostDatedCheque : UpdateNewPostDatedCheque}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Cheque Date*</label>
    <input type="date" name="ChequeDate" className="form-control" onChange={e=>setChequeDate(e.target.value)} value={ChequeDate}  />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Recieved Date*</label>
    <input type="date" name="RecievedDate" className="form-control" onChange={e=>setRecievedDate(e.target.value)} value={RecievedDate}  />
  </div>


  <div className="form-group col-md-4">
    <label htmlFor="">Amount</label>
    <input type="text" name="Amount" className="form-control" onChange={e=>setAmount(e.target.value)} value={Amount} placeholder='Amount' />
  </div>

   <div className="form-group col-md-12">
    <label htmlFor="">Amount In Words</label>
    <input type="text" name="AmountInWords" className="form-control" onChange={e=>setAmountInWords(e.target.value)} value={AmountInWords} disabled placeholder='Amount' />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Bank Name</label>
    <select name="BankName" id="" className="form-control" onChange={e=>setBankName(e.target.value)} value={BankName} >
      <option value="" selected>Select Company</option>
      {
        BankListResult && BankListResult.map((item,key) => {
          return (
            <option value={item.id}>{item.banktitle}</option>
          )
        })
      }
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Branch Name</label>
    <input type="text" name="BranchName" className="form-control" onChange={e=>setBranchName(e.target.value)} value={BranchName}  placeholder='Branch Name'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Cheque No</label>
    <input type="text" name="ChequeNo" className="form-control" onChange={e=>setChequeNo(e.target.value)} value={ChequeNo}  placeholder='Cheque Name'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Recieved From</label>
    <input type="text" name="RecievedFrom" className="form-control" onChange={e=>setRecievedFrom(e.target.value)} value={RecievedFrom}  placeholder='Recieved From'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Purpose</label>
    <input type="text" name="Purpose" className="form-control" onChange={e=>setPurpose(e.target.value)} value={Purpose}  placeholder='Purpose'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Status</label>
    <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
        <option value="">Select Status</option>
        <option value="Held">Held</option>
        <option value="Deposited">Deposited</option>
        <option value="Released">Released</option>
        <option value="Returned">Returned</option>
    </select>
   
  </div>

  <div className='col-md-12'>
    <div className={`row ${Status == 'Deposited' ? '' : 'd-none'}`}>
      <div className="form-group col-md-4">
        <label htmlFor="">Date Of Deposit</label>
        <input type="date" name="DateOfDeposit" className="form-control" onChange={e=>setDateOfDeposit(e.target.value)} value={DateOfDeposit}  placeholder='Date Of Deposit'/>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="">A/C Deposited</label>
        <select name="ACDeposit" id="" className="form-control" onChange={e=>setACDeposit(e.target.value)} value={ACDeposit}>
              <option value="">Select Bank</option>
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
            </select>
        {/* <input type="date" name="ACDeposit" className="form-control" onChange={e=>setACDeposit(e.target.value)} value={ACDeposit}  placeholder='A/C Deposited'/> */}
      </div>
    </div>

    <div className={`row ${Status == 'Released' ? '' : 'd-none'}`}>
      <div className="form-group col-md-4">
        <label htmlFor="">Date Of Released</label>
        <input type="date" name="DateOfReleased" className="form-control" onChange={e=>setDateOfReleased(e.target.value)} value={DateOfReleased}  placeholder='Date Of Released'/>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="">Released Title</label>
        <input type="text" name="ReleasedTitle" className="form-control" onChange={e=>setReleasedTitle(e.target.value)} value={ReleasedTitle}  placeholder='Released Title'/>
      </div>
    </div>

    <div className={`row ${Status == 'Returned' ? '' : 'd-none'}`}>
      <div className="form-group col-md-4">
        <label htmlFor="">Date Of Returned</label>
        <input type="date" name="DateOfReturned" className="form-control" onChange={e=>setDateOfReturned(e.target.value)} value={DateOfReturned}  placeholder='Date Of Returned'/>
      </div>

      <div className="form-group col-md-4">
        <label htmlFor="">Returned Title</label>
        <input type="text" name="ReturnedTitle" className="form-control" onChange={e=>setReturnedTitle(e.target.value)} value={ReturnedTitle}  placeholder='Returned Title'/>
      </div>
    </div>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Payee Type</label>
    <select name="Status" id="" className="form-control" onChange={e=>setPayeeType(e.target.value)} value={PayeeType}>
        <option value="">Select Payee Type</option>
        <option value="Cash">Cash</option>
        <option value="Cross">Cross</option>
        <option value="Beneficiary">Beneficiary</option>
    </select>
  </div>
  
  <div className={`form-group col-md-4 ${PayeeType == 'Beneficiary' ? '' : 'd-none'}`}>
    <label htmlFor="">Beneficiary Title</label>
    <input type="text" name="beneficiaryTitle" className="form-control" onChange={e=>setBeneficiaryTitle(e.target.value)} value={BeneficiaryTitle}  placeholder='Beneficiary Title'/>
  </div>

  <div class={`form-group col-md-4`}>
  <label for="inputPassword4">Attachement</label>
  <input type="file" class="form-control" name="Attachement" onChange={changeHandler}/> 
  {
    id == null ? (
      <></>
    ):(
      DocFiles == '' || DocFiles == null ? '' : <a href={`${actionConfig.REACT_APP_MAIN}${DocFiles}`} download target='_blank'>Download File</a>
      
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

export default AddPostDatedCheque