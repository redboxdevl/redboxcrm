import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import { LeadStatusReportAction } from '../../redux/action/LeadStatusReportAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function LeadStatusReport() {

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

    const resultLeadsReport = useSelector(state => state.Leadstatusreportreducers.leadstatusreport);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
    const dispatch = useDispatch();

    const SuperCon = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.role_id === 3 || edx.role_id === 4 || edx.feature_id == 145);

    const handleSearch = async (e) => {
        e.preventDefault();
         const AuthData = JSON.parse(localStorage.getItem('authdata'));
        if(SuperCon.length === 0){
          
          dispatch(LeadStatusReportAction(AuthData.id,StartDates,EndDate));
        }else{
        
          dispatch(LeadStatusReportAction('all',StartDates,EndDate));
        }
    }

    useEffect(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
        if(SuperCon.length === 0){
          dispatch(LeadStatusReportAction(AuthData.id,StartDates,EndDate));
        }else{
        
          dispatch(LeadStatusReportAction('all',StartDates,EndDate));
        }
  },[]);

console.log("resultLeadsReport",resultLeadsReport);

return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
    <div>
        <h2 className="hk-pg-title font-weight-600">Leads Status Reporting</h2>
    </div>
</div>

<div className="row">
<div className="col-md-4">
<div className="form-group">
<label htmlFor="">Date Range</label>
{/* <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/> */}
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
<div className="col-sm">
<div className="table-wrap">

<table id="datable_1" className="table table-hover table-bordered w-100 display pb-30">
<thead className="thead-dark">
<tr>
<th>AGENT</th>
{/* <th>TOTAL ASSIGN LEADS</th> */}
<th>ASSIGN LEADS</th>
<th>MY LEADS</th>
<th>HOT LEADS</th>
<th>NOT INTERESTED</th>
<th>UNTABBED LEADS</th>
<th>DEAL DONE</th>
</tr>
</thead>
<tbody>
    
{

resultLeadsReport == null || resultLeadsReport == '' || resultLeadsReport == undefined || resultLeadsReport.code == 'ERR_BAD_REQUEST' || resultLeadsReport.code == 'ECONNABORTED' || resultLeadsReport.length == 0 || resultLeadsReport.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
    resultLeadsReport == undefined || resultLeadsReport == '' || resultLeadsReport == null ? '' || resultLeadsReport.length == 0 || resultLeadsReport.code == 'ERR_BAD_RESPONSE' : resultLeadsReport.data.map((curElem , index) => {
return ( 
  curElem.emp_name == 'Tabassum Iqbal' || curElem.emp_name == 'Haleema Hassan' ? (
    <></>
  ):(
     
    <tr>
        <td>{curElem.emp_name}</td>
        {/* <td>{curElem.TotalAssignLeadsCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.TotalAssignCountAgent}</span> / <span className='badge badge-danger'>Today: {curElem.TodayAssignCountAgent}</span></td>
        {/* <td>{curElem.MyLeadsCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.MyLeadsCount}</span> / <span className='badge badge-danger'>Today: {curElem.MyLeadsTodayCount}</span></td>
        {/* <td>{curElem.HoLeadsCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.AllListHotLeadCount}</span> / <span className='badge badge-danger'>Today: {curElem.TodayListHotLeadCount}</span></td>
        {/* <td>{curElem.NotInterestedCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.AllListNotInterestedLeadCount}</span> / <span className='badge badge-danger'>Today: {curElem.TodayListNotInterestedLeadCount}</span></td>
        {/* <td>{curElem.UntabbedLeadsCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.untabbedAllLeadsCount}</span> / <span className='badge badge-danger'>Today: {curElem.untabbedTodayLeadsCount}</span></td>
        {/* <td>{curElem.InventorysoldCount}</td> */}
        <td><span className='badge badge-primary'>Total: {curElem.InventorysoldAllCount}</span> / <span className='badge badge-danger'>Today: {curElem.InventorysoldTodayCount}</span></td>
    </tr>
    
  )
)

})

)

}
  
</tbody>

{/* <tfoot>
    <tr>
      <td>TOTAL</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tfoot> */}
</table>

</div>
</div>
</div>



</div>
</>
)
}

export default LeadStatusReport