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

const AddNewLevel2 = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
 

  const [Level1ListResult,setLevel1ListResult]= useState([]);
  
  var CurrentDate = moment().format('YYYY-MM-DD');

  const [Level1Code,setLevel1Code]=useState('0');
  const [Code,setCode]=useState('0');
  const [Description,setDescription]=useState('');
  const [LoadingS,setLoadingS]=useState(false);
  const [Errors,setErrors]=useState('');

  const limit = 3;
    const handleNumChange = event => {
      setCode(event.target.value.slice(0, limit));
    };

const SingleNewLeve21List = async (id) => {
   
  const response2 = await fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel2/${id}`);
  const dataxs2 = await response2.json();
  const GetArray3 = dataxs2.data[0];
  setLevel1ListResult(await GetArray3);

  console.log("GetArray3",GetArray3);

  setCode(GetArray3.Code);
  setDescription(GetArray3.Description);
  setLevel1Code(GetArray3.level1Code);
  
  }

  useEffect(() => {
    if(id == undefined || id == null){
    }else{
      SingleNewLeve21List(id);
    }
},[id == undefined || id == null ? '' : id]);

  const AddNewLevel2 = (e) => {
    
    e.preventDefault();

    const formData = new FormData();
  
    formData.append('level1Code',Level1Code);
    formData.append('Code',Code);
    formData.append('Description',Description);


    const requestOptions = {
        method: 'POST',
        body: formData
      };
        
    fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel2`, requestOptions)
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
          navigate("/chart-of-account-level-2");
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


  const UpdateNewLevel2 = (e) => {

    e.preventDefault();
    
    // setLoadingS(true);
  
    const formData = new FormData();
    
    formData.append('level1Code',Level1Code);
    formData.append('Code',Code);
    formData.append('Description',Description);
    // formData.append('status', Status);
    
    formData.append('_method', 'PATCH');
  
    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel2/${id}`, requestOptions)
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
          navigate("/chart-of-account-level-2");
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
        //   setLoadingS(false);
        //   navigate("/list-cheque-book");
           
        // }else{
        //   Swal.fire(
        //     'Error!',
        //     dataex.message,
        //     'error'
        //   );
        // }
      });

  }

console.log("resultlistdashboard",resultlistdashboard);
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Level 2</h2>

</div>
<div class="d-flex">
<NavLink to="/chart-of-account-level-2" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ? AddNewLevel2 : UpdateNewLevel2}>
<div class="row">

<div className="form-group col-md-4">
    <label htmlFor="">Level 1 Code*</label>
    <select name="Level1Code" id="" className="form-control" onChange={e=>setLevel1Code(e.target.value)} value={Level1Code} >
      <option value="">Select Level 1 Code</option>
    {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.Chartlevel1.map((items,key) => {
        return (
            <option value={items.id} key={key+1}>{items.Code}-{items.Description}</option>
          )
    })
    )
  }
    </select>
  </div>

  <div className="form-group col-md-4">
    <label htmlFor="">Level 2 Code*</label>
    <input type="number" name="Code" className="form-control" onChange={handleNumChange} value={Code} maxLength = "3" />
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

export default AddNewLevel2