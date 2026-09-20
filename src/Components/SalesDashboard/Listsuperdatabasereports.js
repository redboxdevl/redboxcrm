import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Navigation from '../../Includes/Navigation';
import { SuperDatabaseReportAction } from '../../redux/action/SuperDatabaseReportAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { SuperDatabaseReportActions } from '../../redux/action/SuperDatabaseReportActions';

function Listsuperdatabasereports() {

let navigate = useNavigate();

const superDatabaseData = useSelector(state => state.Superdatabasesreducers.superdatabasesdata);

const dispatch = useDispatch();

const [search,setSearch]= useState('');
const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');

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
dispatch(SuperDatabaseReportActions(1,20,search,StartDates,EndDate));
},[]);

const handlePageClick = (data) => {
let currentPage = data.selected + 1
dispatch(SuperDatabaseReportActions(currentPage,20,search,StartDates,EndDate));
}

const handleSearch = async (e) => {
e.preventDefault();
dispatch(SuperDatabaseReportActions(1,20,search,StartDates,EndDate));
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
<h2 className="hk-pg-title font-weight-600">Super Database Reporting</h2>
</div>
<div className="form-group ">
{/* <button className='btn btn-danger mr-1' type="button" onClick={SuperDatabaseExport}>Export</button> */}
</div>
</div>


<div class="row pb-3">
<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Search Anything</label>
<input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
</div>
</div>
<div className="col-md-3">
<div class="form-group">
<label for="clientName">DateRange<span class="text-danger">*</span></label>
<DateRangePicker
initialSettings={{ startDate:true ,endDate:true, timePicker:false , timePicker24Hour:false , locale }}
onCallback={onApply}
handleEvent={handleEvent}
>
<input class="form-control" type="text" />
</DateRangePicker>
</div>
</div>
<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

<div className="row">

</div>



<div className="row">
<div className="col-sm">
<div className="table-wrap table-responsive">

<table id="datable_1" className="table table-hover w-100 display pb-30">
<thead className="thead-dark">
<tr>
<th>LEAD NAME</th>
<th>LEAD NUMBER</th>
<th>LEAD EMAIL</th>
<th>PROJECTS</th>
<th>ASSIGN CONSULTANT</th>
<th>LEAD ASSIGN DATE</th>
<th>DUPLICATION STATUS</th>
<th>LEAD STATUS</th>
<th>NATURE PROJECTS</th>
<th>TRANSFER STATUS</th>
</tr>
</thead>
<tbody>
{

superDatabaseData.data == null ? (
<>Loading.....</>
):(

superDatabaseData.data.length > 0 ? (
superDatabaseData.data.map((curElem , index) => {

return (
<tr key={index+1}>
<td>{curElem.clientName}</td>
<td>{curElem.clientPhone}</td>
<td>{curElem.clientemail}</td>
<td>{curElem.clientProject}</td>
<td><span className='badge badge-secondary'>{curElem.emp_name}</span></td>
<td>{curElem.assignDate}</td>
<td><span className='badge badge-primary'>{curElem.duplicateStatus}</span>
{
curElem.duplicateEmployeeName == '' || curElem.duplicateEmployeeName == null || curElem.duplicateEmployeeName == undefined ? '' : curElem.duplicateEmployeeName.map((curData,Ind) => {
    return (
        <><p className='pb-1'>
            <span className='badge badge-danger'>{curData.agentName}</span> <br/>
            <span className='badge badge-secondary'>{curData.LeadTypes}</span>
            </p></>
    )
})
}
</td>
<td><span className='badge badge-danger'>{curElem.LeadnatureStatus}</span></td>
<td>{curElem.nature}</td>
<td></td>
</tr>
)


})

): (
<>
<tr>
<td colSpan="10"><b>No record Found....</b></td>
</tr>


</>
)

)

}

</tbody>

</table>

<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(superDatabaseData.TotalCount/20)}
marginPagesDisplayed={3}
pageRangeDisplayed={3}
onPageChange={handlePageClick}
containerClassName={`pagination justify-content-center`}
pageClassName={`page-item`}
pageLinkClassName={`page-link`}
previousClassName={`page-item`}
previousLinkClassName={`page-link`}
nextLinkClassName={`page-link`}
nextClassName={`page-item`}
breakLinkClassName={`page-link`}
breakClassName={`page-item`}
activeClassName={`active`}
/>

</div>
</div>
</div>



</div>
</>
)
}

export default Listsuperdatabasereports