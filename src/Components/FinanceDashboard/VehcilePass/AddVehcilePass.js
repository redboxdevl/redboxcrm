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

const AddVehcilePass = () => {

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

const resultBankList = useSelector(state => state.Bankreducers.banklistdata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');
const SUperFinance = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 20);

const [SingleRes,setSingleRes]= useState([]);
const [CompaniesResult,setCompaniesResult]= useState([]);

var CurrentDate = moment().format('YYYY-MM-DD');

const [GatePassDate,setGatePassDate]=useState(CurrentDate);
const [GatePassTime,setGatePassTime]=useState('-');
const [Quantity,setQuantity]=useState('-');
const [PlaceToGo,setPlaceToGo]=useState('-');
const [Purpose,setPurpose]=useState('-');

const [PassDatetime,setPassDatetime]=useState(CurrentDate);
const [DepartmentId,setDepartmentId]=useState('-');
const [VehcileType,setVehcileType]=useState('-');
const [PlaceToVisit,setPlaceToVisit]=useState('-');
const [PurposeofVisit,setPurposeofVisit]=useState('-');
const [Meterreading,setMeterreading]=useState('-');
const [TimeIn,setTimeIn]=useState('-');
const [TimeOut,setTimeOut]=useState('-');
const [MeterreadingArrival,setMeterreadingArrival]=useState('-');
const [DistanceCovered,setDistanceCovered]=useState('-');
const [TotalDuration,setTotalDuration]=useState('-');

const [LoadingS,setLoadingS]=useState(false);

const SingleBankDepositRecords = async (id) => {
const response = await fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`);
const dataxs = await response.json();
const GetArray = dataxs.data[0];
setSingleRes(await dataxs.data);
// setBankId(GetArray == '' || GetArray == null ? '' : GetArray.BankId);
}



const ListCompanies = async () => {
const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
const dataxs = await response.json();
const GetArray = dataxs.data;
setCompaniesResult(await GetArray);
}

useEffect(() => {
  ListCompanies();
},[]);
  

useEffect(() => {
SingleBankDepositRecords(id);
},[id == undefined ? '' : id]);

const AddNewVehiclePass = (e) => {

e.preventDefault();

setLoadingS(true);

const formData = new FormData();

formData.append('agentId',AuthDataxs.id);
formData.append('PassDatetime',PassDatetime);
formData.append('DepartmentId',DepartmentId);
formData.append('VehcileType',VehcileType);
formData.append('PlaceToVisit',PlaceToVisit);
formData.append('PurposeofVisit',PurposeofVisit);
formData.append('Meterreading',Meterreading);
formData.append('TimeIn',TimeIn);
formData.append('TimeOut',TimeOut);
formData.append('MeterreadingArrival',MeterreadingArrival);
formData.append('DistanceCovered',DistanceCovered);
formData.append('TotalDuration',TotalDuration);
formData.append('status',0);

const requestOptions = {
method: 'POST',
body: formData
};

fetch(`${actionConfig.REACT_APP_URL}vehiclepass`, requestOptions)
.then(response => response.json())
.then(dataex => {

console.log("dataex",dataex);
// if(dataex.code == '200'){
//   Swal.fire(
//     'Good job!',
//     dataex.message,
//     'success'
//   );
//   navigate("/bank-deposit-list");
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


const UpdateNewVehcilePasst = (e) => {

// e.preventDefault();
// setLoadingS(true);
// const formData = new FormData();

// // formData.append('BankId',BankId);
// // formData.append('status',BankDepStatus);

// formData.append('_method', 'PATCH');

// const requestOptions = {
//   method: 'POST',
//   body: formData
// };

// fetch(`${actionConfig.REACT_APP_URL}bankdeposits/${id}`, requestOptions)
// .then(response => response.json())
// .then(dataex => {

//     console.log("dataex",dataex);
//     // if(dataex.code == '200'){
//     //   Swal.fire(
//     //     'Good job!',
//     //     dataex.message,
//     //     'success'
//     //   );
//     //   navigate("/bank-deposit-list");
//     //   setLoadingS(false);
  
//     // }else{
//     //   Swal.fire(
//     //     'Error!',
//     //     dataex.message,
//     //     'error'
//     //   );
//     // }

// });

}


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Generate Vehicle Pass</h2>

</div>
<div class="d-flex">
<NavLink to="/vehcile-pass" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<form onSubmit={id == null ?  AddNewVehiclePass : UpdateNewVehcilePasst}>
<div class="row">

<div className="form-group col-md-4">
<label htmlFor="">Date Time</label>
<input type="date" name="PassDatetime" className="form-control" onChange={e=>setPassDatetime(e.target.value)} value={PassDatetime} />
</div>

<div className="form-group col-md-4">
<label htmlFor="">Department</label>
<select name="DepartmentId" id="DepartmentId" className="form-control" onChange={e=>setDepartmentId(e.target.value)} value={DepartmentId}>
<option value="">Select Department</option>
{
CompaniesResult && CompaniesResult.map((item,key) => {
return (
  <option value={item.id}>{item.department_name}</option>
)
})
}
</select>
</div>

<div className="form-group col-md-4">
<label htmlFor="">Vehcile Type</label>
<select name="VehcileType" id="VehcileType" className="form-control" onChange={e=>setVehcileType(e.target.value)} value={VehcileType}>
<option value="">Select Vehcile Type</option>
<option value="1">Bike</option>
</select>
</div>

<div className="form-group col-md-4">
<label htmlFor="">Place To Visit</label>
<input type="text" name="PlaceToVisit" className="form-control" onChange={e=>setPlaceToVisit(e.target.value)} value={PlaceToVisit} placeholder='Place To Visit'/>
</div>

<div className="form-group col-md-4">
<label htmlFor="">Purpose Of Visit</label>
<input type="text" name="PurposeofVisit" className="form-control" onChange={e=>setPurposeofVisit(e.target.value)} value={PurposeofVisit} placeholder='Purpose'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Meter Reading (at Departure)</label>
<input type="text" name="Meterreading" className="form-control" onChange={e=>setMeterreading(e.target.value)} value={Meterreading} placeholder='Meter Reading'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Time In</label>
<input type="time" name="TimeIn" className="form-control" onChange={e=>setTimeIn(e.target.value)} value={TimeIn} placeholder='Time In'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Time Out</label>
<input type="time" name="TimeOut" className="form-control" onChange={e=>setTimeOut(e.target.value)} value={TimeOut} placeholder='Time Out'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Meter Reading (at Arrival)</label>
<input type="text" name="MeterreadingArrival" className="form-control" onChange={e=>setMeterreadingArrival(e.target.value)} value={MeterreadingArrival} placeholder='Meter Reading at Arrival'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Distance Covered (In Km)</label>
<input type="text" name="DistanceCovered" className="form-control" onChange={e=>setDistanceCovered(e.target.value)} value={DistanceCovered} disabled placeholder='Distance Covered'/>
</div>

<div className={`form-group col-md-4 ${SUperFinance.length == 0 ? 'd-none' : ''}`}>
<label htmlFor="">Total Duration (In Minute)</label>
<input type="text" name="TotalDuration" className="form-control" onChange={e=>setTotalDuration(e.target.value)} value={TotalDuration} disabled placeholder='Total Duration'/>
</div>


</div>
{
LoadingS == true ? <button type="submit" class="btn btn-primary" disabled>Submit</button> : <button type="submit" class="btn btn-primary">Submit</button>
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

export default AddVehcilePass