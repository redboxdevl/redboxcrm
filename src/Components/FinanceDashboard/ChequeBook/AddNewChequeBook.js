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

const AddNewChequeBook = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [ChequeResult,setChequeResult]= useState([]);
  const [ChequeListResult,setChequeListResult]= useState([]);

  
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [CuDate,setCuDate]=useState(CurrentDate);
  const [AccountNo,setAccountNo]=useState('0');
  const [AccountTitle,setAccountTitle]=useState('-');
  const [BankName,setBankName]=useState('-');
  const [BranchName,setBranchName]=useState('-');
  const [StartSerialNo,setStartSerialNo]=useState('');
  const [EndSerialNo,setEndSerialNo]=useState('');
  const [NoofCheque,setNoofCheque]=useState('0');
  const [LoadingS,setLoadingS]=useState(false);
  const [Status,setStatus]=useState(false);


  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(BankListAction(1,12,AuthData.company_id));
},[]);

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

  useEffect(() => {
    if(AccountNo == undefined){
    }else{
      SingleNewCheque(AccountNo);
    }
},[AccountNo == undefined ? '' : AccountNo]);


const SingleNewChequeList = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}chequeregister/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setChequeListResult(await GetArray3);

  console.log("GetArray3",GetArray3);

  setCuDate(GetArray3.chequeDate);
  setAccountNo(GetArray3.AccountNoId);
  setStartSerialNo(GetArray3.SerialStart);
  setEndSerialNo(GetArray3.SerialEnd);
  setStatus(GetArray3.status);

  }

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewChequeList(id);
    }
},[id == undefined || id == null ? '' : id]);



  const AddNewChequeBook = (e) => {
    
    e.preventDefault();

    setLoadingS(true);
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const formData = new FormData();
  
    formData.append('CuDate',CuDate);
    formData.append('AccountNo',AccountNo);
    formData.append('AccountTitle',AccountTitle);
    formData.append('BankName',BankName);
    formData.append('BranchName',BranchName);
    formData.append('StartSerialNo',StartSerialNo);
    formData.append('EndSerialNo',EndSerialNo);
    formData.append('NoofCheque',NoofCheque);
    formData.append('company_id',AuthData.company_id);

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}chequeregister`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/list-cheque-book");
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


  const UpdateNewChequeBook = (e) => {

    e.preventDefault();
    
    setLoadingS(true);
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const formData = new FormData();
    
    formData.append('CuDate',CuDate);
    formData.append('AccountNo',AccountNo);
    formData.append('AccountTitle',AccountTitle);
    formData.append('BankName',BankName);
    formData.append('BranchName',BranchName);
    formData.append('StartSerialNo',StartSerialNo);
    formData.append('EndSerialNo',EndSerialNo);
    formData.append('NoofCheque',NoofCheque);
    formData.append('status', Status);
    formData.append('company_id',AuthData.company_id);

    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}chequeregister/${id}`, requestOptions)
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
          navigate("/list-cheque-book");
           
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
<h2 className="hk-pg-title font-weight-600">Add New Cheque Register</h2>

</div>
<div class="d-flex">
<NavLink to="/list-cheque-book" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewChequeBook : UpdateNewChequeBook}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Date*</label>
    <input type="date" name="purchasedDate" className="form-control" onChange={e=>setCuDate(e.target.value)} value={CuDate} disabled />
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
    <label htmlFor="">Serial No Start</label>
    {
      id == null || id == '' || id == undefined ? (
        <input type="text" name="startSerialNo" className="form-control" onChange={e=>setStartSerialNo(e.target.value)} value={StartSerialNo} placeholder='Serial No Start' />
      ):(
        <input type="text" name="startSerialNo" className="form-control" onChange={e=>setStartSerialNo(e.target.value)} value={StartSerialNo} placeholder='Serial No Start' disabled />
      )
    }
    
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Serial No End</label>
    {
      id == null || id == '' || id == undefined ? (
        <input type="text" name="endSerialNo" className="form-control" onChange={e=>setEndSerialNo(e.target.value)} value={EndSerialNo} placeholder='Serial No End' />
      ):(
        <input type="text" name="endSerialNo" className="form-control" onChange={e=>setEndSerialNo(e.target.value)} value={EndSerialNo} placeholder='Serial No End' disabled />
      )
    }
    
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">No Of Cheque</label>



    <input type="text" name="noofCheque" className="form-control" onChange={e=>setNoofCheque(e.target.value)} value={NoofCheque} disabled placeholder='No Of Cheque' />
  </div>

{
  id == null || id == '' ? '' : <div className="form-group col-md-4">
  <label htmlFor="">Status</label>
  <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
    <option value="" selected>Select Status</option>
    <option value="0">Pending</option>
    <option value="1">Approved</option>
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

export default AddNewChequeBook