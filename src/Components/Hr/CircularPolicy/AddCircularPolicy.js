import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import QuickNav from '../../../Includes/QuickNav';
import { actionConfig } from '../../../configuration';
import OtherNavigation from '../../../Includes/OtherNavigation';
import moment from 'moment/moment';
import LoadingSpinner from '../../FinanceDashboard/LoadingSpinner';

const AddCircularPolicy = () => {

const navigate = useNavigate();

let { id } = useParams();

var CurrentDate = moment().format('YYYY-MM-DD');

useEffect(() => {
SingleCircularRecords(id);
},[id == '' || id == null ? '' : id]);

const [countryresult,setCountryresult]= useState([]);
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


const SingleCircularRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}circularpolicy/${id}`);
const dataxs = await response.json();
setSingleBranchresult(await dataxs.data[0]);

const newData = dataxs.data[0];
console.log("newData",newData);
setcircularCategoryId(newData.catpolicyId);
setsubjectName(newData.subjectName);
setpolicyDate(newData.policyDate);


}


useEffect(() => {
ListCircularCategory();
},[]);

var countCircular = ListCircularResult.length;

const AddCircularFormData = (e) =>{
e.preventDefault();

setLoadingS(true);

  const formData = new FormData();
  
  formData.append('catpolicyId',circularCategoryId);
  formData.append('subjectName', subjectName);
  formData.append('policyDate', policyDate);
  formData.append('Attachment', AssetImage);

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}circularpolicy`, requestOptions)
    .then(response => response.json())
    .then(dataex => {

      console.log("dataex",dataex);
     
      if(dataex.code == '200'){
        Swal.fire(
          'Good job!',
          dataex.message,
          'success'
        );
        navigate("/circular-policy");
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

const UpdateCircularFormData = (e) =>{
  e.preventDefault();
  
  setLoadingS(true);

  const formData = new FormData();
  
  formData.append('catpolicyId',circularCategoryId);
  formData.append('subjectName', subjectName);
  formData.append('policyDate', policyDate);
  formData.append('Attachment', AssetImage);
  formData.append('_method', 'PATCH');

  const requestOptions = {
    method: 'POST',
    body: formData
  };
    
    fetch(`${actionConfig.REACT_APP_URL}circularpolicy/${id}`, requestOptions)
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
        navigate("/circular-policy");
         
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
<h2 className="hk-pg-title font-weight-600">Add New Circular Policy</h2>

</div>
<div class="d-flex">
<NavLink to="/circular-policy" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>
{LoadingS == true ? <LoadingSpinner /> : '' }

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<form onSubmit={id == null ? AddCircularFormData : UpdateCircularFormData}>
<div class="row">



<div class="form-group col-md-4">
<label for="inputPassword4">Circular Category</label>
<select class="form-control" name="circularCategoryId" required="" onChange={e=>setcircularCategoryId(e.target.value)} value={circularCategoryId}>
<option value="" selected="">Select Circular Category</option>
{

countCircular > 0 ? (

ListCircularResult.map((curElem) => {
return (
<option value={curElem.id}>{curElem.categoryTitle}</option>
)

})
): (
<>
<option><b>Loading....</b></option>

</>
)


}
</select>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Subject Name</label>
<input type="text" className="form-control" name="subjectName" onChange={e=>setsubjectName(e.target.value)} value={subjectName}/>
</div>
</div>

<div class="form-group col-md-4">
<div class="form-group">
<label for="inputAddress">Policy Date</label>
<input type="date" className="form-control" name="policyDate" onChange={e=>setpolicyDate(e.target.value)} value={policyDate}/>
</div>
</div>

<div className="form-group col-md-4">
    <label htmlFor="">Attachments</label>
    <input type="file" name="Attachments" className="form-control" onChange={changeHandler} />

    {
    id == null ? (
      <></>
    ):(
      <a href={`${actionConfig.REACT_APP_MAIN}${SingleBranchresult.Attachment}`} download><img src="../FrontAsset/images/doc.svg" width="50" /></a>
    )
  }
 
  </div>




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

export default AddCircularPolicy