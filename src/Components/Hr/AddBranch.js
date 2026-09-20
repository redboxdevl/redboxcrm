import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import Swal from 'sweetalert2'
import QuickNav from '../../Includes/QuickNav';
import { actionConfig } from '../../configuration';

const AddBranch = () => {

const navigate = useNavigate();

let { id } = useParams();

useEffect(() => {
ListCompanies();
SingleBranchRecords();
},[]);

const [countryresult,setCountryresult]= useState([]);
const [Cityresult,setCityresult]= useState([]);
const [ListCompaniesResult,setListCompaniesResult]= useState([]);
const [SingleBranchresult,setSingleBranchresult]= useState([]);

const [countryItem,setCountryItem]=useState('');
const [CityItem,setCityItem]=useState('');
const [BranchId,setBranchId]=useState(id);
const [BranchTitleItem,setBranchTitleItem]=useState('');
const [CompanyItem,setCompanyItem]=useState('');
const [postalCodeItem,setpostalCodeItem]=useState('');
const [AddressItem,setAddressItem]=useState('');
const [ContactItem,setContactItem]=useState('');

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

const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setListCompaniesResult(await GetArray);
}


const SingleBranchRecords = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}branch/${id}`);
const dataxs = await response.json();
setSingleBranchresult(await dataxs.data);

setBranchTitleItem(dataxs.data.branch_name);
setCountryItem(dataxs.data.country_id);
setCityItem(dataxs.data.city_id);
setpostalCodeItem(dataxs.data.postal_code);
setAddressItem(dataxs.data.address);
setContactItem(dataxs.data.contact_number);
setBranchId(id);
setCompanyItem(dataxs.data.company_id);

}


useEffect(() => {
GetCountry();
GetCity();

},[countryItem,CityItem]);

var countCompanies = ListCompaniesResult.length;

const AddBranchFormData = (e) =>{
e.preventDefault();

const FeildData = { branch_name:BranchTitleItem,company_id:CompanyItem,country_id:countryItem,city_id:CityItem,postal_code:postalCodeItem,address:AddressItem,contact_number:ContactItem }

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}branch`, requestOptions)
    .then(response => response.json())
    .then(dataex => {
        
        if(dataex.message == 'Data saved successfully!'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          navigate("/branch");
            
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }


    });

}

const UpdateBranchFormData = (e) =>{
  e.preventDefault();
  
  const FeildData = { branch_name:BranchTitleItem,company_id:CompanyItem,country_id:countryItem,city_id:CityItem,postal_code:postalCodeItem,address:AddressItem,contact_number:ContactItem }
  
  const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(FeildData)
  };
  
  fetch(`${actionConfig.REACT_APP_URL}branch/${BranchId}`, requestOptions)
      .then(response => response.json())
      .then(dataexe => {
          if(dataexe.message == 'Data updated successfully!'){
            Swal.fire(
              'Good job!',
              dataexe.message,
              'success'
            );
            navigate("/branch");
              
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
<h2 className="hk-pg-title font-weight-600">Branch</h2>

</div>
<div class="d-flex">
<NavLink to="/branch" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>


<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<form onSubmit={id == null ? AddBranchFormData : UpdateBranchFormData}>
<div class="row">



<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Branch Name</label>
<input type="text" className="form-control" name="branch_name" onChange={e=>setBranchTitleItem(e.target.value)} value={BranchTitleItem}/>
</div>
</div>
<div class="form-group col-md-6">
<label for="inputPassword4">Company</label>
<select class="form-control" name="company_id" required="" onChange={e=>setCompanyItem(e.target.value)} value={CompanyItem}>
<option value="" selected="">Select Company</option>
{

countCompanies > 0 ? (

ListCompaniesResult.map((curElem) => {
return (
<option value={curElem.id}>{curElem.company_name}</option>
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



<div class="form-group col-md-6">
<label for="inputPassword4">Country*</label>
<select class="form-control" name="country_id" required="" onChange={e=>setCountryItem(e.target.value)} value={countryItem}>
<option value="" selected="">Select Country</option>
{
countryresult.map((curElem) => {
return (
<option value={curElem.id}>{curElem.country_name}</option>
)
})
}
</select>
</div>

<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">City*</label>
<select class="form-control" name="city_id" required="" onChange={e=>setCityItem(e.target.value)} value={CityItem}>
<option value="" selected="">Select City</option>
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
<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Postal Code*</label>
<input type="text" class="form-control" name="postal_code" placeholder="Postal Code" required="" autocomplete="off" onChange={e=>setpostalCodeItem(e.target.value)} value={postalCodeItem}/>
</div>
</div>
<div class="form-group col-md-6">
<div class="form-group">
<label for="inputAddress">Address*</label>
<input type="text" class="form-control" name="address" placeholder="Address" required="" autocomplete="off" onChange={e=>setAddressItem(e.target.value)} value={AddressItem}/>
</div>
</div>
<div class="form-group col-md-12">
<label for="inputPassword4">Contact No</label>
<input type="text" class="form-control" name="contact_number" placeholder="Contact No" required="" autocomplete="off" onChange={e=>setContactItem(e.target.value)} value={ContactItem}/>
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

export default AddBranch