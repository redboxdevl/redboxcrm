import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams} from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const AddCompanies = () => {

const navigate = useNavigate();

let { id } = useParams();

useEffect(() => {
  SingleCompanyRecords();
},[]);

const [countryresult,setCountryresult]= useState([]);
const [Cityresult,setCityresult]= useState([]);
const [SingleCompanyresult,setSingleCompanyresult]= useState([]);

const [CompanyName,setCompanyName]= useState('');
const [countryItem,setCountryItem]=useState('');
const [CompanyId,setCompanyId]=useState(id);
const [postalCodeItem,setpostalCodeItem]=useState('');
const [AddressItem,setAddressItem]=useState('');
const [ContactItem,setContactItem]=useState('');
const [CityItem,setCityItem]=useState('');
const [Company_abbr,setCompany_abbr]=useState('');
const [CompanyLogo,setCompanyLogo]=useState('');


const changeHandler = (event) => {
  setCompanyLogo(event.target.files[0]);
};

const GetCountry = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}assigncountry`);
const dataxs = await response.json();
setCountryresult(await dataxs.data);
}

const GetCity = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}assigncity?countryid=${countryItem}`);
const dataxs = await response.json();
setCityresult(await dataxs.data);
}

const SingleCompanyRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company/${id}`);
const dataxs = await response.json();
setSingleCompanyresult(await dataxs.data);

setCompanyName(dataxs.data.company_name);
setCountryItem(dataxs.data.country_id);
setCityItem(dataxs.data.city_id);
setpostalCodeItem(dataxs.data.postal_code);
setAddressItem(dataxs.data.address);
setContactItem(dataxs.data.contact_number);
setCompany_abbr(dataxs.data.company_abbr);
setCompanyId(id);
setCompanyLogo(dataxs.data.companyLogo);

}



useEffect(() => {
GetCountry();
GetCity();

},[countryItem,CityItem]);


const AddCOmpanyFormData = (e) =>{
e.preventDefault();

const formData = new FormData();

formData.append('company_name', CompanyName);
formData.append('country_id', countryItem);
formData.append('city_id', CityItem);
formData.append('postal_code', postalCodeItem);
formData.append('address', AddressItem);
formData.append('contact_number', ContactItem);
formData.append('company_abbr', Company_abbr);
formData.append('companyLogo', CompanyLogo);

const requestOptions = {
  method: 'POST',
  body: formData
};

// const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(FeildData)
// };

fetch(`${actionConfig.REACT_APP_URL}company`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/company");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}


const UpdateCOmpanyFormData = (e) =>{
  e.preventDefault();
  
  const formData = new FormData();

  formData.append('company_name', CompanyName);
formData.append('country_id', countryItem);
formData.append('city_id', CityItem);
formData.append('postal_code', postalCodeItem);
formData.append('address', AddressItem);
formData.append('contact_number', ContactItem);
formData.append('company_abbr', Company_abbr);
formData.append('companyLogo', CompanyLogo);
formData.append('_method', 'PATCH');

const requestOptions = {
  method: 'POST',
  body: formData
};
  
  fetch(`${actionConfig.REACT_APP_URL}company/${CompanyId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/company");
             
          }else{
            Swal.fire(
              'Error!',
              dataexe.message,
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
<h2 className="hk-pg-title font-weight-600">{id == null ? ('Add Companies') : ('Update Companies')}</h2>
</div>


</div>

<OtherNavigation/>
<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<div className="col-md-12 col-xs-12 col-sm-12">
<form onSubmit={id == null ? AddCOmpanyFormData : UpdateCOmpanyFormData}>
<div className="row">

</div>

<div className="row">
<div className="form-group col-md-4">
<label for="inputPassword4">Company Name*</label>
<input type="text" className="form-control" name="company_name" placeholder="Name" required autocomplete="off" onChange={e=>setCompanyName(e.target.value)} value={CompanyName} />
</div>

<div className="form-group col-md-4">
<label for="inputPassword4">Company Abbreviation*</label>
<input type="text" className="form-control" name="company_abbr" placeholder="Company Abbreviation" required autocomplete="off" onChange={e=>setCompany_abbr(e.target.value)} value={Company_abbr} />
</div>
<div className="form-group col-md-4">
<label for="inputCity">Country*</label>
<select name="country_id" className="form-control" required="" onChange={e=>setCountryItem(e.target.value)} value={countryItem}>
<option selected="" value="">Select Country</option>
{
countryresult.map((curElem) => {
return (
<option value={curElem.id}>{curElem.country_name}</option>
)
})
}
</select>
</div>
<div className="form-group col-md-4">
<label for="inputState">City*</label>
<select name="city_id" className="form-control" required="" onChange={e=>setCityItem(e.target.value)} value={CityItem}>
<option selected="" value="">Select City</option>
{
Cityresult == undefined ? (
<>No Data</>
) : (

Cityresult.map((curElem) => {
return (
  <option value={curElem.id}>{curElem.cityName}</option>
)
})

)

}
</select>
</div>
</div>
<div className="row">
<div className="form-group col-md-4">
<label for="inputCity">Postal Code*</label>
<input type="text" className="form-control" name="postal_code" placeholder="Postal Code" required="" autocomplete="off" onChange={e=>setpostalCodeItem(e.target.value)} value={postalCodeItem}/>
</div>
<div className="form-group col-md-4">
<div className="form-group">
<label for="inputAddress">Address*</label>
<input type="text" className="form-control" name="company_address" placeholder="Address" required="" autocomplete="off" onChange={e=>setAddressItem(e.target.value)} value={AddressItem}/>
</div>
</div>
<div className="form-group col-md-4">
<label for="inputState">Contact No*</label>
<input type="text" className="form-control" name="company_contact_no" placeholder="Contact No" required="" autocomplete="off" onChange={e=>setContactItem(e.target.value)} value={ContactItem}/>
</div>
</div>


<div class="form-group col-md-4">
<label for="inputCity">Company Logo (*)</label>
<input type="file" name="files" onChange={changeHandler} style={{padding:5}} className="form-control" />

{
id == null ? (
  <></>
):(
    <>
    <a href={`${actionConfig.REACT_APP_MAIN}${CompanyLogo}`} download><img src={`${actionConfig.REACT_APP_MAIN}${CompanyLogo}`} width="50" /></a>
    </>
)
}

</div>

{/* <div className="row">
<div className="form-group col-md-4">
<label for="inputCity">Fax*</label>
<input type="text" className="form-control" name="company_fax" placeholder="Fax" required="" autocomplete="off" />
</div>
</div> */}

{/* <div className="row">
<div className="form-group col-md-4">
<label for="inputCity">Logo</label>
<div className="fileinput input-group fileinput-new" data-provides="fileinput">
<div className="input-group-prepend">
<span className="input-group-text">Image</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="hidden" value="" name="..." /><input type="hidden" value="" name="..." /><input type="file" name="" />
</span>
<a href="#" className="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>

<div className="form-group col-md-4">
<label for="inputCity">Documents</label>
<div className="fileinput input-group fileinput-new" data-provides="fileinput">
<div className="input-group-prepend">
<span className="input-group-text">Image</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="hidden" value="" name="..." /><input type="hidden" value="" name="..." /><input type="file" name="" />
</span>
<a href="#" className="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>


<div className="form-group col-md-4">
<label for="inputCity">CNIC ( Front) </label>
<div className="fileinput input-group fileinput-new" data-provides="fileinput">
<div className="input-group-prepend">
<span className="input-group-text">Image</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="hidden" value="" name="..." /><input type="hidden" value="" name="..." /><input type="file" name="" />
</span>
<a href="#" className="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>

<div className="form-group col-md-4">
<label for="inputCity">CNIC ( Back)</label>
<div className="fileinput input-group fileinput-new" data-provides="fileinput">
<div className="input-group-prepend">
<span className="input-group-text">Image</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="hidden" value="" name="..." /><input type="hidden" value="" name="..." /><input type="file" name="" />
</span>
<a href="#" className="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>

<div className="form-group col-md-4">
<label for="inputCity">Letter Head</label>
<div className="fileinput input-group fileinput-new" data-provides="fileinput">
<div className="input-group-prepend">
<span className="input-group-text">Image</span>
</div>
<div className="form-control text-truncate" data-trigger="fileinput"><i className="glyphicon glyphicon-file fileinput-exists"></i> <span className="fileinput-filename"></span></div>
<span className="input-group-append">
<span className=" btn btn-primary btn-file"><span className="fileinput-new">Select file</span><span className="fileinput-exists">Change</span>
<input type="hidden" value="" name="..." /><input type="hidden" value="" name="..." /><input type="file" name="" />
</span>
<a href="#" className="btn btn-danger fileinput-exists" data-dismiss="fileinput">Remove</a>
</span>
</div>
</div>
</div> */}
<hr />

<button type="submit" className="btn btn-primary">Save</button>
</form>

</div>
</section>
</div>
</div>

</div>
</>
)
}

export default AddCompanies