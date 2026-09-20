import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { DailyLeadsReportingAction } from '../../redux/action/DailyLeadsReportingAction';

function DailyLeadsReporting() {

    const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultDailyReporting = useSelector(state => state.Dailyleadsreportingreducers.dailyleadsreportingdata);
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch(DailyLeadsReportingAction());
      },[]);

      console.log(resultDailyReporting);

return (
<>
<Navigation />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
    <div>
        <h2 className="hk-pg-title font-weight-600">Daily Leads Reporting</h2>
    </div>
</div>

<div className="row">
    
</div>



<div className="row">
<div className="col-sm">
<div className="table-wrap">

<table id="datable_1" className="table table-hover w-100 display pb-30">
<thead className="thead-dark">
<tr>
<th>AGENT</th>
<th>Today Leads</th>
<th>Yesterday Leads</th>
<th>Project Wise</th>
</tr>
</thead>
<tbody>
{

resultDailyReporting == null || resultDailyReporting == '' || resultDailyReporting == undefined || resultDailyReporting.code == 'ERR_BAD_REQUEST' || resultDailyReporting.code == 'ECONNABORTED' || resultDailyReporting.length == 0 || resultDailyReporting.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
    resultDailyReporting == undefined || resultDailyReporting == '' || resultDailyReporting == null ? '' || resultDailyReporting.length == 0 || resultDailyReporting.code == 'ERR_BAD_RESPONSE' : resultDailyReporting.data.map((curElem , index) => {

return (
<tr>
    <td>{curElem.emp_name}</td>
    <td>{curElem.assignToday}</td>
    <td>{curElem.yesterDayLeads}</td>
    <td>{
        curElem.dataxs == '' || curElem.dataxs == null ? <><span className='badge badge-danger'>0</span></> : curElem.dataxs.map((proitem) => {
            return (
                <>
                <p>{proitem.clientProject}</p>
                <span className='badge badge-primary'>{proitem.user_count}</span>    
                </>
            )
        })
        }</td>
</tr>
  )

})

)



}

</tbody>

<tfoot>
    <tr>
      <td>TOTAL</td>
      <td>{resultDailyReporting == '' || resultDailyReporting == null ? '' : resultDailyReporting.TotalAssignLead}</td>
      <td>{resultDailyReporting == '' || resultDailyReporting == null ? '' : resultDailyReporting.TotalAssignWeeklyLead}</td>
      <td>{resultDailyReporting == '' || resultDailyReporting == null ? '' : resultDailyReporting.TotalProjectsLead}</td>
    </tr>
  </tfoot>
</table>

</div>
</div>
</div>



</div>
</>
)
}

export default DailyLeadsReporting