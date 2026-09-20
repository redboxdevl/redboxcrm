import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
// import $ from 'jquery';
import Navigation from '../../Includes/Navigation';
import { actionConfig } from '../../configuration';
import axios from 'axios';
import { ListformAction } from '../../redux/action/ListformAction';

const AddLeadForm = ({dataId}) => {

const navigate = useNavigate();
// $('body').find(".modal-backdrop").removeClass();
// $('body').removeClass("modal-open");

const ListFormData = useSelector(state => state.Listformreducer.listformdata);
const SingleAssignLEads = useSelector(state => state.SingleAssignLeadsreducers.singleassignleads);
const AuthData = JSON.parse(localStorage.getItem('authdata'));
const dispatch = useDispatch();


const [countryresult,setCountryresult]= useState([]);
const [Cityresult,setCityresult]= useState([]);
const [Projectresult,setProjectresult]= useState([]);
const [ProTyperesult,setProTyperesult]= useState([]);
// const [ProDetailsresult,setProDetailsresult]= useState([]);
const [Pronatureresult,setProNatureresult]= useState([]);

const [CityItem,setCityItem]= useState('1');
const [MoreFields,setMoreFields]= useState(false);
const [countryItem,setCountryItem]=useState('1');
const [ProjectIdItem,setProjectIdItem]=useState('');
const [ProTypeIdItem,setProTypeIdItem]=useState('');
const [ClientStatus,setClientItem]=useState('Buy');
const [ClientGender,setClientGender]=useState('Male');
const [ClientName,setClientName]=useState('');
const [ClientEmail,setClientEmail]=useState('@');
const [ClientMobileNo,setMobileNo]=useState('');
const [ClientCnic,setCnic]=useState('');
const [ClientWhatsapp,setWhatsapp]=useState('');
const [ClientPrefLanguage,setPrefLanguage]=useState('');
const [ClientBudget,setBudget]=useState('');
const [ClientTimeFrame,setTimeFrame]=useState('');
const [ClientRefferedBy,setRefferedBy]=useState('');
const [ClientHoWMuchInter,setHoWMuchInter]=useState('');
const [ClientDescrip,setDescrip]=useState('');
const [ProPrefItem,setProPrefItem]=useState('');
const [ActivityMediumItem,setActivityMediumItem]=useState('21');

useEffect(() => {
if(!localStorage.getItem('authdata')){
navigate('/');
}
},[navigate]);


const GetCountry = async () => {
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const response = await axios(`${actionConfig.REACT_APP_URL}assigncountry`,{cancelToken: source.token}).then((res)=>{
return res.data;
}).catch((error) => {
return error;
});
setCountryresult(response.data);
}
const GetCity = async (countryItem) => {
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const response = await axios(`${actionConfig.REACT_APP_URL}assigncity?countryid=${countryItem}`,{cancelToken: source.token}).then((res)=>{
return res.data;
}).catch((error) => {
return error;
});
setCityresult(response);
}
const GetProjects = async (CityItem) => {
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const response = await axios(`${actionConfig.REACT_APP_URL}assignprojects?cityid=${CityItem}`,{cancelToken: source.token}).then((res)=>{
return res.data.data;
}).catch((error) => {
return error;
});
setProjectresult(response);
}
const GetProType = async (ProjectIdItem) => {
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const response = await axios(`${actionConfig.REACT_APP_URL}assignprotype?proid=${ProjectIdItem}`,{cancelToken: source.token}).then((res)=>{
return res.data.data;
}).catch((error) => {
return error;
});
setProTyperesult(response);

}
const GetProNature = async (ProTypeIdItem) => {
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const response = await axios(`${actionConfig.REACT_APP_URL}assignnature?typeid=${ProTypeIdItem}`,{cancelToken: source.token}).then((res)=>{
console.log("res",res);
return res.data.data;
}).catch((error) => {
return error;
});
setProNatureresult(response);
}

useEffect(() => {
GetCountry();
GetCity(countryItem);
GetProjects(CityItem);
GetProType(ProjectIdItem);
GetProNature(ProTypeIdItem);
},[countryItem,CityItem,ProjectIdItem,ProTypeIdItem]);



useEffect(() => {
const AuthData = JSON.parse(localStorage.getItem('authdata'));
if(!localStorage.getItem('authdata')){
navigate('/');
}else{
dispatch(ListformAction(AuthData.id));
}   

if(dataId === null || dataId === '' || dataId === undefined){
}else{
GetSIngleRecords(dataId);
}
},[dataId,SingleAssignLEads,navigate,dispatch]);

const GetSIngleRecords = async (leadid) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    const response = await axios(`${actionConfig.REACT_APP_URL}listassignleads?leadid=${leadid}`,{cancelToken: source.token}).then((res)=>{
    return res.data.data[0];
    }).catch((error) => {
    return error;
    });
    
    
    setClientName(response.getleads === '' || response.getleads === null || response.code === 'ERR_BAD_REQUEST' ? '' : response.getleads.clientName);
    setMobileNo(response.getleads === '' || response.getleads === null || response.code === 'ERR_BAD_REQUEST' ? '' : response.getleads.clientPhone);
    }

const AddLeadFormData = (e) =>{
e.preventDefault();


const FeildData = { leadid:dataId === null || dataId === '' || dataId === undefined ? 0 : dataId,agentid:AuthData.id,city:CityItem,clientName:ClientName,clientStatus:ClientStatus,country:countryItem,desc:ClientDescrip,gender:ClientGender,interested:ClientHoWMuchInter,mobileNo:ClientMobileNo,projectPrefer:ProjectIdItem,propertyType:ProTypeIdItem,propertyPrefer:ProPrefItem,activityMedium:ActivityMediumItem,companyId:AuthData.company_id }

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}assignleadadd`, requestOptions)
.then(response => response.json())
.then(dataex => {
    // console.log("dataex",dataex);
    if(dataex.message === 'Lead Id Not Valid Please Enter Valid Id'){
        Swal.fire(
            'Error!',
            dataex.message,
            'error'
            );
    }else{
        Swal.fire(
            'Good job!',
            dataex.message,
            'success'
            );
        navigate(`/activities/0/${dataex.lastleadid}`);
    }
});
}

return (
<>
<Navigation />
<div class="container-fluid mt-xl-50 mt-sm-30 mt-15" style={{paddingTop:"3rem"}}>

<div class="hk-pg-header">
<div>
<h2 class="hk-pg-title font-weight-600 mb-10">Add Leads</h2>
</div>
<div class="d-flex">
</div>
</div>

<div class="row">
<div class="col-xl-12">

<section class="hk-sec-wrapper">
<div class="row">
<div class="col-sm">
<form onSubmit={AddLeadFormData}>
<div class="row">
<div class="col-md-4 form-group">
<label for="clientName">Client Name<span class="text-danger">*</span></label>
<input class="form-control" name="clientName" id="clientName" placeholder="Name" onChange={e=>setClientName(e.target.value)} value={ClientName} type="text" required/>
</div>
<div class="col-md-4 form-group">
<label for="clientStatus">Client Status<span class="text-danger"></span></label>
<select class="form-control custom-select d-block w-100" name="clientStatus" id="clientStatus" onChange={e=>setClientItem(e.target.value)} value={ClientStatus} >
<option value="">Select Status...</option>
{
ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
    ListFormData.dataClientStatus.map((curElem) => {
    return (
        <option value={curElem.clientTitle}>{curElem.clientTitle}</option>
    )
    })
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="gender">Gender<span class="text-danger"></span></label>
<select class="form-control custom-select d-block w-100" name="gender" id="gender" onChange={e=>setClientGender(e.target.value)} value={ClientGender} >
<option value="">Select Gender...</option>
{
ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
ListFormData.status === 429 ? (
        <></>
    ):(
    ListFormData.dataGender.map((curElem) => {
        return (
            <option value={curElem.genderTitle}>{curElem.genderTitle}</option>
        )
    }) 
    )
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="email">Email</label>
<input class="form-control" id="email" name="email" placeholder="abc@yourdomain.com" type="text" onChange={e=>setClientEmail(e.target.value)} value={ClientEmail} />
</div>
<div class="col-md-4 form-group">
<label for="mobileNo">Mobile No#<span class="text-danger">*</span></label>
<input class="form-control" name="mobileNo" id="mobileNo" placeholder="xxxx-xxxxxxx" onChange={e=>setMobileNo(e.target.value)} value={ClientMobileNo} type="text" required/>
</div>
<div class="col-md-4 form-group">
<label for="country">Country<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 country" name="country" id="country" onChange={e=>setCountryItem(e.target.value)} value={countryItem} required>
<option value="">Select Country...</option>
{
countryresult === '' || countryresult === null || countryresult === undefined ? (
    <></>
):(
    countryresult.map((curElem) => {
        return (
            <option value={curElem.id}>{curElem.country_name}</option>
        )
    })
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="city">City<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 city" name="city" id="city" onChange={e=>setCityItem(e.target.value)} value={CityItem} required>
<option value="">Select City...</option>
{
Cityresult.length === 0 || Cityresult.message === 'Select Country First' || Cityresult === '' || Cityresult === undefined || Cityresult.code === 'ERR_BAD_REQUEST' ? (
    <></>
) :(
    Cityresult.data.length > 0 ? (
        Cityresult.data.map((curElem) => {
            return (
                <option value={curElem.id}>{curElem.cityName}</option>
            )
        })
    ):(
        <></>
    )
)

}
</select>
</div>
<div class="col-md-4 form-group">
<label for="projectPrefer">Project Prefer<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 projectPrefer" name="projectPrefer" id="projectPrefer" onChange={e=>setProjectIdItem(e.target.value)} value={ProjectIdItem} required>
<option value="">Select Project Prefer...</option>

{
Projectresult === null || Projectresult === '' || Projectresult === undefined || Projectresult.code === 'ERR_BAD_REQUEST' || Projectresult.length === 0  ? (
    <></>
):(
Projectresult.code === 403 ? '' : Projectresult.map((curElem) => {
        return (
            <option value={curElem.id}>{curElem.title}</option>
        )
    })
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="propertyType">Property Type<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 propertyType" name="propertyType" id="propertyType" onChange={e=>setProTypeIdItem(e.target.value)} value={ProTypeIdItem} required>
<option value="">Select Property Type...</option>
{
ProTyperesult === undefined ||  ProTyperesult === '' || ProTyperesult === null || ProTyperesult.length === 0 || ProTyperesult.code === 'ERR_BAD_REQUEST' ? (
    <></>
):(
    ProTyperesult.map((curElem) => {
        return (
            <option value={curElem.id}>{curElem.typeName}</option>
        )
    })
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="propertyPrefer">Property Prefer<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 propertyPrefer" onChange={e=>setProPrefItem(e.target.value)} value={ProPrefItem} name="propertyPrefer" id="propertyPrefer" required>
<option value="">Select Property Prefer...</option>
{
Pronatureresult === undefined || Pronatureresult === '' || Pronatureresult === null || Pronatureresult.code === 'ERR_BAD_REQUEST' || Pronatureresult.length === 0 ? (
    <></>
):(
    Pronatureresult.code === 403 ? '' : Pronatureresult.map((curElem) => {
        return (
            <option value={curElem.id}>{curElem.natureName}</option>
        )
    })
)
}

</select>
</div>
<div class="col-md-4 form-group">
<label for="activityMedium">Lead Source<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100" name="activityMedium" onChange={e=>setActivityMediumItem(e.target.value)} value={ActivityMediumItem} id="activityMedium" required>
<option value="">Select Lead Source...</option>
{
ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
    ListFormData.status === 429 ? (
        <></>
    ):(
ListFormData.dataActivityMedium.map((curElem) => {
    return (
        <option value={curElem.id}>{curElem.activityName}</option>
    )
    })
    )
)
}
</select>
</div>

<div class="col-md-4 form-group">
<label for="interested">Lead Status<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 interested" name="interested" id="interested" onChange={e=>setHoWMuchInter(e.target.value)} value={ClientHoWMuchInter} required>
<option value="">Select Interested...</option>
{
ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
ListFormData.status === 429 ? (
    <></>
):(
    ListFormData.leadStatus.map((curElem) => {
    return (
        <option value={curElem.id}>{curElem.PercentageTitle}</option>
    )
    })
        )
)
}
</select>
</div>
<div class="col-md-12">
<div class={ ClientHoWMuchInter === '' ? ('form-group desc'):('form-group')}>
<label for="referredBy">Description</label>
<textarea name="desc" id="" cols="30" rows="5" class="form-control" onChange={e=>setDescrip(e.target.value)} value={ClientDescrip} required></textarea>
</div>

<div class="form-group form-check-inline" >
<label class="form-check-label">
<input type="checkbox" class="form-check-input" name="optradio" onChange={e=>setMoreFields(e.target.checked)} value={MoreFields}/>If u Interested Fill Optional Fields Please Click this link
</label>
</div>

</div>
<div className={MoreFields === false ? ('MyClas hidex'):('MyClas')}>
<div class="col-md-4 form-group">
<label for="passCnic">Passport/CNIC</label>
<input class="form-control" id="passCnic" name="passCnic" placeholder="Passport/CNIC" onChange={e=>setCnic(e.target.value)} value={ClientCnic} type="text" />
</div>
<div class="col-md-4 form-group">
<label for="whatsapp">WhatsApp</label>
<input class="form-control" id="whatsapp" name="whatsapp" placeholder="WhatsApp" onChange={e=>setWhatsapp(e.target.value)} value={ClientWhatsapp} type="text" />
</div>
<div class="col-md-4 form-group">
<label for="preferredLang">Preferred Language</label>
<select class="form-control custom-select d-block w-100" name="preferredLang" id="preferredLang" onChange={e=>setPrefLanguage(e.target.value)} value={ClientPrefLanguage}>
<option value="">Select Language...</option>
{
    ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
    ListFormData.status === 429 ? (
        <></>
    ):(
    ListFormData.dataLanguage.map((curElem) => {
    return (
        <option value={curElem.languageTitle}>{curElem.languageTitle}</option>
    )
    })
    )
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="budget">Budget</label>
<select class="form-control custom-select d-block w-100" name="budget" id="budget" onChange={e=>setBudget(e.target.value)} value={ClientBudget}>
<option value="">Select Budget...</option>
{
    ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
        ListFormData.status === 429 ? (
            <></>
        ):(
    ListFormData.dataBudget.map((curElem) => {
    return (
        <option value={curElem.BudgetTitle}>{curElem.BudgetTitle}</option>
    )
    })
        )
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="timeFrame">Time Frame</label>
<select class="form-control custom-select d-block w-100" name="timeFrame" id="timeFrame" onChange={e=>setTimeFrame(e.target.value)} value={ClientTimeFrame}>
<option value="">Select Time Frame...</option>
{
ListFormData === '' || ListFormData === null || ListFormData === undefined || ListFormData.length === 0 || ListFormData.code === 'ERR_BAD_REQUEST' || ListFormData.code === 'ERR_NETWORK' ? (
    <></>
):(
ListFormData.status === 429 ? (
    <></>
):(
ListFormData.dataTimeFrame.map((curElem) => {
return (
<option value={curElem.timeFrame}>{curElem.timeFrame}</option>
)
})
)
)
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="referredBy">Referred by</label>
<input class="form-control" id="referredBy" name="referredBy" placeholder="Referred By" onChange={e=>setRefferedBy(e.target.value)} value={ClientRefferedBy} type="text" />
</div>

</div>

</div>
<hr />
<button class="btn btn-primary" type="submit">Save Lead</button>
</form>
</div>
</div>
</section>
</div>
</div>

</div>
</>
)
}

export default AddLeadForm