import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../../Includes/Navigation';
import { SuperDatabaseReportAction } from '../../redux/action/SuperDatabaseReportAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { actionConfig } from '../../configuration';

function Selfleads() {

let navigate = useNavigate();

const superDatabaseData = useSelector(state => state.Superdatabasereducers.superdatabasedata);
const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);

const EmpData = JSON.parse(localStorage.getItem('empTeam'));
const dispatch = useDispatch();

const [search,setSearch]= useState('');
const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');
const [SalesConsul,setSalesConsul]= useState('');
const [ProjectN,setProjectN]= useState('');
const [LeadStatys,setLeadStatys]= useState('');
const [ReminderStatus,setReminderStatus]= useState('');



function convertDatePickerTimeToMySQLTime(str) {
var month, day, year, hours, minutes, seconds;
var date = new Date(str),
month = ("0" + (date.getMonth() + 1)).slice(-2),
day = ("0" + date.getDate()).slice(-2);
hours = ("0" + date.getHours()).slice(-2);
minutes = ("0" + date.getMinutes()).slice(-2);
seconds = ("0" + date.getSeconds()).slice(-2);

var mySQLDate = [date.getFullYear(), month, day].join("-");
var mySQLTime = [hours, minutes, seconds].join(":");
return [mySQLDate].join(" ");
}

const handleEvent = (event, picker) => {
const dateData = convertDatePickerTimeToMySQLTime(picker._d);
}

const onApply = (start, end, label) => {
const startDate = convertDatePickerTimeToMySQLTime(start._d);
const EndDate = convertDatePickerTimeToMySQLTime(end._d);
setStartDate(startDate); 
setEndDate(EndDate); 
};

const locale = {
format: 'YYYY-MM-DD',
};


console.log("superDatabaseData",superDatabaseData);

useEffect(() => {
    if(EmpData === null || EmpData === ''){
        dispatch(SuperDatabaseReportAction(1,20,search,StartDates,EndDate,'',SalesConsul,ProjectN,LeadStatys,ReminderStatus));
    }else{
        dispatch(SuperDatabaseReportAction(1,20,search,StartDates,EndDate,EmpData.teamObj,SalesConsul,ProjectN,LeadStatys,ReminderStatus));
    }

},[]);

const handlePageClick = (data) => {
let currentPage = data.selected + 1;
if(EmpData === null || EmpData === ''){
    dispatch(SuperDatabaseReportAction(currentPage,15,search,StartDates,EndDate,'',SalesConsul,ProjectN,LeadStatys,ReminderStatus));
}else{
    dispatch(SuperDatabaseReportAction(currentPage,15,search,StartDates,EndDate,EmpData.teamObj,SalesConsul,ProjectN,LeadStatys,ReminderStatus));
}

}

const handleSearch = async (e) => {
e.preventDefault();
if(EmpData === null || EmpData === ''){
    dispatch(SuperDatabaseReportAction(1,15,search,StartDates,EndDate,'',SalesConsul,ProjectN,LeadStatys,ReminderStatus));
}else{
    dispatch(SuperDatabaseReportAction(1,15,search,StartDates,EndDate,EmpData.teamObj,SalesConsul,ProjectN,LeadStatys,ReminderStatus));
}

}

const SuperDatabaseExport = () => {
alert("done");
}

return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Self Leads</h2>
</div>
</div>


<div className="row">

</div>

<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>0</span></h4>
</div>
</div>

<div className="row">
<div className="col-sm">
<div className="table-wrap table-responsive">

<table id="datable_1" className="table table-hover w-100 display pb-30">
<thead className="thead-dark">
<tr>
  <th>Agent Name</th>
<th>LEAD NAME</th>
<th>LEAD NUMBER</th>
<th>LEAD EMAIL</th>
<th>PROJECTS</th>
<th>LEAD Created DATE</th>
<th>LEAD STATUS</th>
<th>LAST CALL</th>
<th>LAST ACTIVITY</th>
<th>TRANSFER STATUS</th>
</tr>
</thead>
<tbody>

    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>

</tbody>

</table>

</div>
</div>
</div>



</div>
</>
)
}

export default Selfleads