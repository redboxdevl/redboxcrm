import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import { useNavigate , NavLink , useParams } from 'react-router-dom';
import $ from 'jquery';
import AffiliateNav from '../../Includes/AffiliateNav';
import { SingleAffiliateActivityAction } from '../../redux/action/SingleAffiliateActivityAction';
import { actionConfig } from '../../configuration';

const AffiliateActivity = () => {

let { id } = useParams();


const resultListing = useSelector(state => state.SingleAffiliateActivityreducers.singleaffiliateactivtydata);
const dispatch = useDispatch();

const navigate = useNavigate();
const [result,setResult]= useState([]);
const [resultOutcome,setResultOutcome]= useState([]);

const [GetActivityId,setGetActivityId]= useState('');
const [GetActivityOutcomeId,setActivityOutcomeId]= useState('');
const [ActivityInterestId,setActivityInterestId]= useState('');
const [ActivityDescId,setActivityDescId]= useState('');
const [ActivityStatusId,setActivityStatusId]= useState('');

useEffect(() => {
dispatch(SingleAffiliateActivityAction(id));
GetActivityTypes();
GetActivityOutcomeTypes(GetActivityId);
},[GetActivityId,id]);

const GetActivityTypes = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}myleadactivitytype`);
const dataxs = await response.json();
const GetArray = dataxs.data;
const FinalArray = GetArray.data;
setResult(await GetArray);

}

const GetActivityOutcomeTypes = async (activityId) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}myleadactivityoutcome?activityId=${activityId}`);
const dataxs = await response.json();
const GetArray = dataxs.data;
const FinalArray = GetArray.data;
setResultOutcome(await GetArray);
}


const AddActivitiesFormData = (e) =>{
e.preventDefault();
const FeildData = {affiliate_lead_id:id,typeId:GetActivityId,outcomeId:GetActivityOutcomeId,InterestPercentage:ActivityInterestId,activityDetails:ActivityDescId,actStatus:ActivityStatusId}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}affiliateactivity`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.code == '200'){
Swal.fire(
'Good job!',
dataex.message,
'success'
);
navigate("/affiliate-dashboard");

}else{
Swal.fire(
'Error!',
dataex.message,
'error'
);
}

});


}

console.log(resultListing);

return (
<>

<AffiliateNav />

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-0">
<div>
<h2 className="hk-pg-title font-weight-600 pb-0">Client Details</h2>
</div>
</div>

<div class="row">
<div class="col-sm">
<form onSubmit={AddActivitiesFormData}>

<div class="row">


<div class="col-md-4 form-group">
<label for="clientStatus">Activity Type<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100 select2 ActivityType" name="ActivityType" id="ActivityType" onChange={e=>setGetActivityId(e.target.value)} value={GetActivityId}>
<option value="">Select Type...</option>
{
result.map((curElem,index) => {
return (
<option key={index} value={curElem.id}>{curElem.activityName}</option>
)
})
}
</select>
</div>
<div class="col-md-4 form-group">
<label for="clientStatus">Activity Outcome</label>
<select class="form-control custom-select d-block w-100 Outcome" name="Outcome" id="Outcome" onChange={e=>setActivityOutcomeId(e.target.value)} value={GetActivityOutcomeId}>
<option value="">Select Outcome...</option>
{
resultOutcome.map((curElem,index) => {
return (
<option key={index} value={curElem.id}>{curElem.outcomeTitle}</option>
)
})
}
</select>
</div>

<div class="col-md-4 form-group">
<label for="clientStatus">Client Interest<span class="text-danger">*</span></label>
<select class="form-control custom-select d-block w-100" name="clientInterest" id="clientInterest" onChange={e=>setActivityInterestId(e.target.value)} value={ActivityInterestId}>
<option value="">Select Interest...</option>
<option value="10">10%</option>
<option value="20">20%</option>
<option value="30">30%</option>
<option value="40">40%</option>
<option value="50">50%</option>
<option value="60">60%</option>
<option value="70">70%</option>
<option value="80">80%</option>
<option value="90">90%</option>
<option value="100">100%</option>
</select>
</div>

<div class="col-md-12 form-group">
<label for="clientName">Description<span class="text-danger">*</span></label>
<textarea name="desc" id="" cols="30" rows="5" class="form-control" onChange={e=>setActivityDescId(e.target.value)} value={ActivityDescId}>{ActivityDescId}</textarea>
</div>

<div class="col-md-12 form-group">
<label for="clientName">Activity Status<span class="text-danger">*</span></label>
<select name="activityStatus" id="" class="form-control" onChange={e=>setActivityStatusId(e.target.value)} value={ActivityStatusId}>
<option value="">Select Status</option>
<option value="On Going">On Going</option>    
<option value="Complete">Complete</option>
</select>
</div>

</div>
<hr/>
<button class="btn btn-primary" type="submit">Update Activity</button>
</form>
</div>

</div>


<div class="row pt-20">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30 ">
<thead class="thead-dark">
<tr>
<th>Activity Type</th>
<th>Activity Outcome</th>
<th>Client Percentage</th>
<th>Details</th>
<th>Status</th>
<th>Date</th>
</tr>
</thead>
<tbody>
{
resultListing == '' ? (
<tr>
    <td colSpan={6}>No Record Found</td>
</tr>
):(
resultListing.length > 0 ? (

resultListing.map((curElem,index)=>{
return (
<tr>
<td>{curElem.typeId}</td>
<td>{curElem.outcomeId}</td>
<td>{curElem.InterestPercentage}</td>
<td>{curElem.activityDetails}</td>
<td>{curElem.actStatus}</td>
<td></td>
</tr>
)
})

):(
<tr>
    <td colSpan={6}>No Record Found</td>
</tr>
)
)
}


</tbody>
</table>
</div>


</div>
</div>

</div>

</>
)
}

export default AffiliateActivity