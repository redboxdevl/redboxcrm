import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../../configuration';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../LoadingSpinner';
import { BankListAction } from '../../../../redux/action/BankListAction';
import moment from 'moment/moment';

const AddNewLevel1 = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [Level1ListResult,setLevel1ListResult]= useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [Code,setCode]=useState('0');
  const [Description,setDescription]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [Errors,setErrors]=useState('');

  const limit = 2;
    const handleNumChange = event => {
      setCode(event.target.value.slice(0, limit));
    };

  useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

const SingleNewLevel1List = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel1/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setLevel1ListResult(await GetArray3);

  console.log("GetArray3",GetArray3);

  setCode(GetArray3.Code);
  setDescription(GetArray3.Description);

  }

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewLevel1List(id);
    }
},[id == undefined || id == null ? '' : id]);

  const AddNewLevel1 = (e) => {
    
    e.preventDefault();

    // setLoadingS(true);

    const formData = new FormData();
  
    formData.append('Code',Code);
    formData.append('Description',Description);

    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel1`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          // setErrors({type:'succ',data:dataex.message});
          Swal.fire(
          'Good job!',
          dataex.message,
          'success'
          );
          navigate("/chart-of-account-level-1");
        }else if(dataex.code == '203'){
          // setErrors({type:'succ',data:dataex.message});
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }else{
          // setErrors({type:'error',data:dataex.response.message});
            Swal.fire(
              'Error!',
              dataex.response.message,
              'error'
            );
        }
        // if(dataex.code == '200'){
        //   Swal.fire(
        //     'Good job!',
        //     dataex.message,
        //     'success'
        //   );
        //   navigate("/list-cheque-book");
        //   setLoadingS(false);
           
        // }else if(dataex.code == '201'){
        //   Swal.fire(
        //     'Error!',
        //     dataex.message,
        //     'error'
        //   );
        //   setLoadingS(false);
        // }else{
        //   Swal.fire(
        //     'Error!',
        //     dataex.message,
        //     'error'
        //   );
        // }
    });

  }


  const UpdateNewLevel1 = (e) => {

    e.preventDefault();
    
    // setLoadingS(true);
  
    const formData = new FormData();
    
    formData.append('Code',Code);
    formData.append('Description',Description);
    // formData.append('status', Status);
    
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel1/${id}`, requestOptions)
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
          navigate("/chart-of-account-level-1");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
      });

  }

console.log("Errors",Errors);
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Level 1</h2>

</div>
<div class="d-flex">
<NavLink to="/chart-of-account-level-1" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
  {/* {
    Errors == null || Errors == '' || Errors.length == 0 ? '' :
    <div class={`${Errors.type == 'succ' ? 'alert alert-primary' : 'alert alert-danger'}`} role="alert">
      {Errors.data}
    </div>
  } */}

<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddNewLevel1 : UpdateNewLevel1}>
<div class="row">

  <div className="form-group col-md-4">
    <label htmlFor="">Code*</label>
    <input type="number" name="Code" className="form-control" onChange={handleNumChange} value={Code} maxLength = "2" />
  </div>

  <div className="form-group col-md-12">
    <label htmlFor="">Description*</label>
    <textarea name="Description" id="Description" cols="30" rows="4" className="form-control" onChange={e=>setDescription(e.target.value.toUpperCase())} value={Description} placeholder='Enter Description'></textarea>
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

export default AddNewLevel1