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
import axios from 'axios';

const GenerateGatePass = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
  const SUperFinance = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);

  const [SingleRes,setSingleRes]= useState([]);
  const [Employeeresult,setEmployeeresult]= useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [GatePassDate,setGatePassDate]=useState(CurrentDate);
  const [GatePassTime,setGatePassTime]=useState('-');
  const [Quantity,setQuantity]=useState('-');
  const [PlaceToGo,setPlaceToGo]=useState('-');
  const [Purpose,setPurpose]=useState('-');
  const [AssetImage1,setAssetImage1]=useState('-');
  const [AssetImage2,setAssetImage2]=useState('-');
  const [LoadingS,setLoadingS]=useState(false);
  const [GetAgentId,setGetAgentId]= useState('');

  const changeHandler1 = (event) => {
    setAssetImage1(event.target.files[0]);
  };
  const changeHandler2 = (event) => {
    setAssetImage2(event.target.files[0]);
  };

  const GetEmployeeData = async () => {

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    const response = await axios(`${actionConfig.REACT_APP_URL}listemployee`,{cancelToken: source.token}).then((res)=>{
    return res.data;
    }).catch((thrown) => {
    return thrown;
    });
    setEmployeeresult(response.data);

  }

  useEffect(() => {
    GetEmployeeData();
    },[]);

  // const SingleBankDepositRecords = async (id) => {
  //   const response = await fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`);
  //   const dataxs = await response.json();
  //   const GetArray = dataxs.data[0];
  //   setSingleRes(await dataxs.data);
  //   // setBankId(GetArray == '' || GetArray == null ? '' : GetArray.BankId);
  // }
  
    // useEffect(() => {
    //     SingleBankDepositRecords(id);
    // },[id == undefined ? '' : id]);
  
  const AddNewGatePass = (e) => {
    
    e.preventDefault();

    setLoadingS(true);
    const formData = new FormData();
  
    formData.append('assetId',id);
    formData.append('agentId',GetAgentId);
    formData.append('GatePassDate',GatePassDate);
    formData.append('GatePassTime',GatePassTime);
    formData.append('Quantity',Quantity);
    formData.append('PlaceToGo',PlaceToGo);
    formData.append('Purpose',Purpose);
    formData.append('AssetImage1',AssetImage1);
    formData.append('AssetImage2',AssetImage2);
    formData.append('status',0);
  
    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}generategatepass`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/fixed-asset-register");
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


  // const UpdateNewGatePasst = (e) => {

  //   e.preventDefault();
    
  //   setLoadingS(true);

  //   const formData = new FormData();
  
  //   // formData.append('BankId',BankId);
  //   // formData.append('status',BankDepStatus);
    
  //   formData.append('_method', 'PATCH');

  //   const requestOptions = {
  //     method: 'POST',
  //     body: formData
  //   };
        
  //   fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`, requestOptions)
  //   .then(response => response.json())
  //   .then(dataex => {

  //       console.log("dataex",dataex);
  //       // if(dataex.code == '200'){
  //       //   Swal.fire(
  //       //     'Good job!',
  //       //     dataex.message,
  //       //     'success'
  //       //   );
  //       //   navigate("/bank-deposit-list");
  //       //   setLoadingS(false);
           
  //       // }else{
  //       //   Swal.fire(
  //       //     'Error!',
  //       //     dataex.message,
  //       //     'error'
  //       //   );
  //       // }

  //   });

  // }


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Generate Gate Pass</h2>

</div>
<div class="d-flex">
<NavLink to="/fixed-asset-register" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={AddNewGatePass}>
<div class="row">

<div className="form-group col-md-4">
<label >Select Agent</label>
<select name="agentid" className="form-control" onChange={e=>setGetAgentId(e.target.value)} value={GetAgentId} required>
<option value="">Select Agent...</option>
{
Employeeresult.map((curElem,index) => {
return (
curElem.id == AuthDataxs.id ? (<></>) : (<><option key={curElem.id} value={curElem.id}>{curElem.emp_name}</option></>)
)
})
}
</select>
</div>
  <div className="form-group col-md-4">
    <label htmlFor="">Gate Pass Date</label>
    <input type="date" name="GatePassDate" className="form-control" onChange={e=>setGatePassDate(e.target.value)} value={GatePassDate} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Gate Pass Time</label>
    <input type="time" name="GatePassTime" className="form-control" onChange={e=>setGatePassTime(e.target.value)} value={GatePassTime} />
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Quantity</label>
    <input type="number" name="Quantity" className="form-control" onChange={e=>setQuantity(e.target.value)} value={Quantity} placeholder='Quantity'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Place To Go</label>
    <input type="text" name="PlaceToGo" className="form-control" onChange={e=>setPlaceToGo(e.target.value)} value={PlaceToGo} placeholder='Place To Go'/>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Purpose (Reason)</label>
    <input type="text" name="Purpose" className="form-control" onChange={e=>setPurpose(e.target.value)} value={Purpose} placeholder='Purpose'/>
  </div>

  

  <div className="form-group col-md-4">
    <label htmlFor="">Attachement 1</label>
    <input type="file" name="Attachement1" className="form-control" onChange={changeHandler1} />
  </div>
  <div className="form-group col-md-4">
    <label htmlFor="">Attachement 2</label>
    <input type="file" name="Attachement2" className="form-control" onChange={changeHandler2} />
  </div>
  
</div>
{
  LoadingS == true ? <button type="submit" class="btn btn-primary" disabled>Submit</button> : <button type="submit" class="btn btn-primary">Submit</button>
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

export default GenerateGatePass