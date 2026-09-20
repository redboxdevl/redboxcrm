import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import QuickNav from '../../../Includes/QuickNav';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import moment from 'moment/moment';
import LoadingSpinner from '../../FinanceDashboard/LoadingSpinner';

const AddComplainManagement = () => {

const navigate = useNavigate();

let { id } = useParams();
const AuthData = JSON.parse(localStorage.getItem('authdata'));
var CurrentDate = moment().format('YYYY-MM-DD');

useEffect(() => {
  SingleComplainRecords(id);
},[id == '' || id == null ? '' : id]);

const [SingleComplainresult,setSingleComplainresult]= useState([]);
const [Cityresult,setCityresult]= useState([]);
const [ListCompaniesResult,setListCompaniesResult]= useState([]);
const [SingleBranchresult,setSingleBranchresult]= useState([]);
const [ListCircularResult,setListCircularResult]= useState([]);


const [countryItem,setCountryItem]=useState('');
const [CityItem,setCityItem]=useState('');
const [BranchId,setBranchId]=useState(id);
const [BranchTitleItem,setBranchTitleItem]=useState('');
const [CompanyItem,setCompanyItem]=useState('');
const [postalCodeItem,setpostalCodeItem]=useState('');
const [AddressItem,setAddressItem]=useState('');
const [ContactItem,setContactItem]=useState('');
const [Status,setStatus]=useState('');

const [ComplainDetails,setComplainDetails]=useState('');

const [AssetImage,setAssetImage]=useState('');
const [circularCategoryId,setcircularCategoryId]=useState('');
const [subjectName,setsubjectName]=useState('');
const [policyDate,setpolicyDate]=useState(CurrentDate);
const [LoadingS,setLoadingS]=useState(false);


const ListCircularCategory = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}circularpolicycategory`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setListCircularResult(await GetArray);
}


const SingleComplainRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}complainmanagement/${id}`);
const dataxs = await response.json();
setSingleComplainresult(await dataxs.data[0]);

const newData = dataxs.data[0];
console.log("newData",newData);
setComplainDetails(newData.complainNote);
setStatus(newData.status);

}



var countCircular = ListCircularResult.length;

const AddCOmplainFormData = (e) =>{
e.preventDefault();

setLoadingS(true);

  const formData = new FormData();
  
  formData.append('agentId', AuthData.id);
  formData.append('complainNote', ComplainDetails);
  formData.append('status', 0);

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}complainmanagement`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

      console.log("dataex",dataex);
     
      if(dataex.code == '200'){
        Swal.fire(
          'Good job!',
          dataex.message,
          'success'
        );
        navigate("/complain-management");
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

const UpdateComplainFormData = (e) =>{
  e.preventDefault();
  
  setLoadingS(true);

  const formData = new FormData();
  
  formData.append('agentId', AuthData.id);
  formData.append('complainNote', ComplainDetails);
  formData.append('status', Status);
  formData.append('_method', 'PATCH');

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}complainmanagement/${id}`, requestOptions)
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
        navigate("/complain-management");
         
      }else{
        Swal.fire(
          'Error!',
          dataex.message,
          'error'
        );
      }
    });
  
  }

    const changeHandler = (event) => {
    setAssetImage(event.target.files[0]);
    };

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add New Complain Management</h2>

</div>
<div class="d-flex">
<NavLink to="/complain-management" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>
{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<form onSubmit={id == null ? AddCOmplainFormData : UpdateComplainFormData}>
<div class="row">




<div class="form-group col-md-12">
<div class="form-group">
<label for="inputAddress">Complain Details</label>
<textarea name="complainDetails" id="" cols="30" rows="10" className='form-control' onChange={e=>setComplainDetails(e.target.value)} value={ComplainDetails}></textarea>
{/* <input type="text" className="form-control" name="subjectName" onChange={e=>setsubjectName(e.target.value)} value={subjectName}/> */}
</div>
</div>

{
  id == null ? <></> : (
    <><div className="form-group col-md-3">
    <label htmlFor="">Status Approval*</label>
    <select name="Status" id="" className="form-control" onChange={e=>setStatus(e.target.value)} value={Status}>
      <option value="" selected>Select Status</option>
      <option value="1">Accept</option>      
      <option value="2">Reject</option>      
      <option value="3">Resolved</option>      
      <option value="0">Pending</option>      
    </select>
  </div></>
  )
}



</div>

<button type="submit" class="btn btn-primary">Save</button>
</form>

</section>
</div>
</div>

</div>

</>
)
}

export default AddComplainManagement