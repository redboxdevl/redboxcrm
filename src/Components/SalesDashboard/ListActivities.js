import React , {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { ActivitiesAction } from '../../redux/action/ActivitiesAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function ListActivities() {

  const resultActivitiesData = useSelector(state => state.Activitiesreducers.activitiesleaddata);
  const EmpData2 = JSON.parse(localStorage.getItem('empTeam'));
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  

  const dispatch = useDispatch();

const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');
const [search,setSearch]= useState('');

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

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);
  
  const AuthDatas = JSON.parse(localStorage.getItem('authdata'));
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(ActivitiesAction(AuthData.id,1,12,''));
      }else{
        dispatch(ActivitiesAction('all',1,12,EmpData.teamObj));
      }
      
    }else{
      dispatch(ActivitiesAction('all',1,12,''));
    }
    
  },[]);
  
    var countActivities = resultActivitiesData.length;

    const handlePageClick = (data) => {
    console.log('click.....',data);
    let currentPage = data.selected + 1
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(ActivitiesAction(AuthData.id,currentPage,12,''));
      }else{
        dispatch(ActivitiesAction('all',currentPage,12,EmpData.teamObj));
      }
      
    }else{
      dispatch(ActivitiesAction('all',currentPage,12,''));
    }
   
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    // console.log("searching....");
    // const AuthData = JSON.parse(localStorage.getItem('authdata'));
    // if(SuperCon.length == 0){
    //   dispatch(MyLeadsAction(AuthData.id,1,12,search));
    // }else{
    //   dispatch(MyLeadsAction('all',1,12,search));
    // }
  
  }

  return (
    <>
    <Navigation />
       <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
            <div>
                <h2 className="hk-pg-title font-weight-600">Activities Log</h2>
            </div>
        </div>

        <div class="row pb-3">
  
  <div className="col-md-4">
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
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultActivitiesData.total}</span></h4>
</div>
</div>

        <div className="row">
        <div className="col-sm">
        <div className="table-wrap">

        <table id="datable_1" className="table table-hover w-100 display pb-30">
        <thead className="thead-dark">
        <tr>
        { SuperCon.length > 0 || EmpData2 !='' ? <th>Consultant Name</th> : '' }
        <th>Customer Name</th>
        <th>Activity Type</th>
        <th>Activity Outcome</th>
        <th>Details</th>
        <th>Status</th>
        <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {

resultActivitiesData == '' || resultActivitiesData.length == 0 || resultActivitiesData == undefined ? (
  <>Loading.....</>
):(
  
  resultActivitiesData.data.length == 0 || resultActivitiesData.data == '' || resultActivitiesData.data == null ? (
    <></>
  ):(
    resultActivitiesData.data.length > 0 ? (

      resultActivitiesData.data.map((curElem) => {
  
  
    return ( 
      <tr>
         {
SuperCon.length > 0 || EmpData2 !='' ? (<td>{curElem.get_employee_details == '' || curElem.get_employee_details == null ? '' : curElem.get_employee_details.emp_name}</td>) : (<></>)
}
          <td>{curElem.customer_data == null ? 'N/a' : curElem.customer_data.clientName}</td>
          <td>{curElem.customer_activity_type == null ? '' : curElem.customer_activity_type.activityName}</td>
          <td>{curElem.customer_activity_outcome == null ? '' : curElem.customer_activity_outcome.outcomeTitle}</td>
          <td>{curElem.activityDetails}</td>
          <td>{curElem.actStatus == '' ? 'Ongoing' : curElem.actStatus}</td>
          <td>{curElem.created_at}</td>
        </tr>
    )
  
  })
  ): (
  <>
    <tr>
      <td colSpan="7"><b>Loading.....</b></td>
    </tr>
  </>
  )
  
  )
  
  )
  

}

        </tbody>
        </table>

        <div className='pb-3 pt-0'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultActivitiesData.total/12)}
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



    </div>
    </>
  )
}

export default ListActivities