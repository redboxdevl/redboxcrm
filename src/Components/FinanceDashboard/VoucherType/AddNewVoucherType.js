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

const AddNewVoucherType = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);


  const [VoucherResult,setVoucherResult]= useState([]);

  const [typeTitle,settypeTitle]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
 

const SingleNewVoucherList = async (id) => {
  
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}vouchertypes/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setVoucherResult(await GetArray3);
  settypeTitle(GetArray3.typeTitle);
}

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewVoucherList(id);
    }
},[id == undefined || id == null ? '' : id]);



  const AddNewVoucherType = (e) => {
    
    e.preventDefault();

    setLoadingS(true);

    const formData = new FormData();
  
    formData.append('typeTitle',typeTitle);

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}vouchertypes`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/voucher-type");
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


  const UpdateNewVoucherType = (e) => {

    e.preventDefault();
    
    // setLoadingS(true);
  
    const formData = new FormData();
    
    formData.append('typeTitle',typeTitle);
    
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}vouchertypes/${id}`, requestOptions)
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
          navigate("/voucher-type");
           
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
<h2 className="hk-pg-title font-weight-600">Add New Voucher Type</h2>

</div>
<div class="d-flex">
<NavLink to="/voucher-type" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewVoucherType : UpdateNewVoucherType}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Voucher Type*</label>
    <input type="text" name="VoucherType" className="form-control" onChange={e=>settypeTitle(e.target.value)} value={typeTitle} required />
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

export default AddNewVoucherType