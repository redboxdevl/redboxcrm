import React , {useState, useEffect} from 'react';
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import Navigation from '../../../Includes/Navigation'
import QuickNav from '../../../Includes/QuickNav'
import Swal from 'sweetalert2'
import { actionConfig } from '../../../configuration';
import Select from 'react-select'


const PaymentPlanOpt = [
   { value: '3', label: '3 Year' },
   { value: '4', label: '4 Year' },
   { value: '5', label: '5 Year' }
 ]

const AddProjects = () => {

const navigate = useNavigate();

let { id } = useParams();

const [countryresult,setCountryresult]= useState([]);
const [Cityresult,setCityresult]= useState([]);
const [Locationresult,setLocationresult]= useState([]);

const [checked, setChecked] = useState([]);
const [SingleProjecthresult,setProjecthresult]= useState([]);

const [countryItem,setCountryItem]=useState('');
const [CityItem,setCityItem]=useState('');
const [LocationItem,setLocationItem]=useState('');
const [ProjectName,setProjectName]=useState('');
const [Address,setAddress]=useState('');
const [Commission,setCommission]=useState('');
const [Kam,setKam]=useState('');
const [ProjectLogo,setProjectLogo]=useState('');
const [ProjectCat,setProjectCat]=useState('');
const [CondCheck,setCondCheck]=useState(false);

const [PaymentPlan,setPaymentPlan]=useState('');
const [ProjectShortName,setProjectShortName]=useState('');



const [ProjectId,setProjectId]=useState(id);

const checkList = ["Residencial", "Commercial", "Farm House"];


const PaymentScheduleHandler = (value)=>{
   setPaymentPlan(value);
   }


   const mapData = JSON.stringify([...PaymentPlan]);

// const PaymentPlanObj = JSON.parse(JSON.stringify(PaymentPlan));
console.log("mapData",mapData);


const handleInputChange = (event) => {
var updatedList = [...checked];
if (event.target.checked) {
updatedList = [...checked, event.target.value];
} else {
updatedList.splice(checked.indexOf(event.target.value), 1);
}
setChecked(updatedList);

}

const checkedItems = checked.length
? checked.reduce((total, item) => {
return total + ", " + item;
})
: "";




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

const GetLocation = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}location?cityid=${CityItem}`);
const dataxs = await response.json();
setLocationresult(await dataxs.data);
}


const SingleProjectRecords = async () => {
if(ProjectId == null){

}else{

const response = await fetch(`${actionConfig.REACT_APP_URL}project/${ProjectId}`);
const dataxs = await response.json();
setProjecthresult(await dataxs.data);

const NewData = dataxs.data[0];

setProjectName(NewData.project_name);
setAddress(NewData.address);
setCountryItem(NewData.country_id);
setCityItem(NewData.city_id);
setLocationItem(NewData.location_id);
setCommission(NewData.commission);
setKam(NewData.kam);
setProjectLogo(NewData.project_asset_path);
setProjectShortName(NewData.project_short_name);

const commaSep = NewData.project_category.map(u => u.project_category_name);
setProjectCat(commaSep);
setChecked(commaSep);

}

}


var isChecked = (item) =>
checked.includes(item) ? "checked-item" : "not-checked-item";

useEffect(() => {
GetCountry();
GetCity();
GetLocation();
SingleProjectRecords();

},[countryItem,CityItem,LocationItem,ProjectId]);

const changeHandler = (event) => {
setProjectLogo(event.target.files[0]);
};



const AddProjectData = (e) =>{
e.preventDefault();

const AuthData = JSON.parse(localStorage.getItem('authdata'));

const formData = new FormData();

formData.append('project_name', ProjectName);
formData.append('project_short_name', ProjectShortName);
// formData.append('PaymentPlan', mapData);
formData.append('location_id', LocationItem);
formData.append('country_id', countryItem);
formData.append('city_id', CityItem);
formData.append('address', Address);
formData.append('commission', Commission);
formData.append('kam', Kam);
formData.append('category', checked);
formData.append('projectLogo', ProjectLogo);
formData.append('companyId', AuthData.company_id);

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}project`, requestOptions)
.then(response => response.json())
.then(result => {

if(result.code == '200'){
   Swal.fire(
   'Good job!',
   result.message,
   'success'
   );
   navigate("/inventories");
   
}else{
   Swal.fire(
   'Error!',
   result.message,
   'error'
   );
}


}).catch((error) => {
//console.error('Error:', error);
});

}


const UpdateProjectData = (e) =>{
e.preventDefault();

const AuthData = JSON.parse(localStorage.getItem('authdata'));

const formData = new FormData();

formData.append('project_name', ProjectName);
formData.append('project_short_name', ProjectShortName);
// formData.append('PaymentPlan', mapData);
formData.append('location_id', LocationItem);
formData.append('country_id', countryItem);
formData.append('city_id', CityItem);
formData.append('address', Address);
formData.append('commission', Commission);
formData.append('kam', Kam);
formData.append('category', checked);
formData.append('projectLogo', ProjectLogo);
formData.append('ProjectId', ProjectId);
formData.append('companyId', AuthData.company_id);
formData.append('_method', 'PATCH');

// const FeildData = { project_name:ProjectName,location_id:LocationItem,country_id:countryItem,city_id:CityItem,commission:Commission,address:Address,kam:Kam,category:checked,projectLogo: ProjectLogo}

const requestOptions = {
method: 'POST',
body: formData,

};

fetch(`${actionConfig.REACT_APP_URL}project/${ProjectId}`, requestOptions)
.then(response => response.json())
.then(result => {
console.log('Success:', result);
if(result.code == '200'){
   Swal.fire(
   'Good job!',
   result.message,
   'success'
   );
   navigate("/inventories");
   
}else{
   Swal.fire(
   'Error!',
   result.message,
   'error'
   );
}


}).catch((error) => {
//console.error('Error:', error);
});

}


if(ProjectId == ''){
var FileRequ = 'required';
}else{
var FileRequ = ''
}

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Add Projects</h2>
</div>
</div>

<Navigation/>

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">
<form onSubmit={id == null ? AddProjectData : UpdateProjectData}>
<h5 className="hk-sec-title">Details</h5>
<div className="row">

<div className="form-group col-md-4">
<label htmlFor="inputAddress">Project Name*</label>
<input type="text" className="form-control" name="project_name" placeholder="Project Name" required autoComplete="off" onChange={e=>setProjectName(e.target.value)} value={ProjectName}/> 
</div>

<div className="form-group col-md-4">
<label htmlFor="inputAddress">Project Short Name</label>
<input type="text" className="form-control" name="project_short_name" placeholder="Project Short Name"  autoComplete="off" onChange={e=>setProjectShortName(e.target.value)} value={ProjectShortName}/> 
</div>

<div className="form-group col-md-4">
<div className="form-group">
<label htmlFor="inputAddress">Address*</label>
<input type="text" className="form-control" name="address" placeholder="Address" required autoComplete="off" onChange={e=>setAddress(e.target.value)} value={Address}/> </div>
</div>
<div className="form-group col-md-4">
<label htmlFor="inputCity">Country*</label>
<select name="country_id" className="form-control" required onChange={e=>setCountryItem(e.target.value)} value={countryItem}>
<option defaultValue>Select Country</option>
{
countryresult.map((curElem,index) => {
return (
<option value={curElem.id} key={index+1}>{curElem.country_name}</option>
)
})
}
</select>
</div>
<div className="form-group col-md-4">
<label htmlFor="inputState">City*</label>
<select name="city_id" className="form-control" required onChange={e=>setCityItem(e.target.value)} value={CityItem}>
<option defaultValue>Select City</option>
{
Cityresult == undefined ? (
<>No Data</>
) : (

Cityresult.map((curElem,index) => {
return (
<option value={curElem.id} key={index+1}>{curElem.cityName}</option>
)
})

)

}
</select>
</div>
<div className="form-group col-md-4">
<label htmlFor="inputState">Location*</label>
<select name="location_id" id="" className="form-control" onChange={e=>setLocationItem(e.target.value)} value={LocationItem}>
<option defaultValue>Select Location</option>
{
CityItem.length == 0 ?(
<></>
):(

Locationresult.length == 0 ? (
<>No Data</>
) : (

   Locationresult.map((curElem,index) => {
return (
<option value={curElem.id} key={index+1}>{curElem.location_name}</option>
)
})

)

)


}

</select> </div>

</div>
<div className=" mt-10 row">

{checkList.map((item, index) => (
<div className="col- ml-15 mr-15 mt-1" key={index}>
<div className="form-check">
<label className="form-check-label">
<input type="checkbox" className="form-check-input" name="category" value={item} onChange={handleInputChange}/>
<span className={isChecked(item)}>{item}</span>
</label>
</div>
</div>
))}

<div className="col- mr-15">
{/* <button data-toggle="modal" data-target="#exampleModalForms" className="btn btn-primary btn-wth-icon btn-rounded icon-right btn-sm"><span className="btn-text">Add</span> <span className="icon-label"><i className="fa fa-plus"></i> </span></button> */}
</div>
</div>
<hr />
<div className="row">
<div className="form-group col-md-4">
<label htmlFor="inputCity">Project Logo (*)</label>
<div className="input-group-prepend" style={{border:'1px solid #e0e3e4'}}> <span className="input-group-text">Image</span> <input type="file" name="files" onChange={changeHandler} style={{padding:5}} /></div>
{ProjectId == null ? '' : <img className="w-120p" src={ProjectLogo == '' ? '' : `${actionConfig.REACT_APP_MAIN}${ProjectLogo}`} alt="icon" /> }

</div>

<div className="form-group col-md-4">
<label htmlFor="inputState">Commission</label>
<input type="text" className="form-control" name="commission" placeholder="Commission" autoComplete="off" onChange={e=>setCommission(e.target.value)} value={Commission}/> </div>

<div className="form-group col-md-4">
<label htmlFor="inputState">KAM</label>
<input type="text" className="form-control" name="kam" placeholder="KAM" autoComplete="off" onChange={e=>setKam(e.target.value)} value={Kam}/> </div>


{/* <div className="form-group col-md-4">
<label for="">Payment Plan Yearly </label>
<Select isMulti defaultInputValue='' placeholder='Select Payment Plan' options={PaymentPlanOpt} onChange={PaymentScheduleHandler} />
</div> */}


</div>
<hr />
<button type="submit" className="btn btn-primary mr-10">Submit</button>
<button type="submit" className="btn btn-light">Cancel</button>
</form>
</section>
</div>
</div>


</div>

</>
)
}

export default AddProjects