import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { VirginLeadsAction } from '../../redux/action/VirginLeadsAction';
import ReactPaginate from 'react-paginate';
import { actionConfig } from '../../configuration';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

const ListVirginLeads = () => {

  const EmpData2 = JSON.parse(localStorage.getItem('empTeam'));
  const resultVirginData = useSelector(state => state.VirginLeadsreducers.virginleaddata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const DashboardData = useSelector(state => state.dashCountReducer.dashboardcount);

  const dispatch = useDispatch();

  const [search,setSearch]= useState('');
  const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');

  const [LeadNature,setLeadNature]= useState('');
  const [SalesConsul,setSalesConsul]= useState('');
  const [ProjectN,setProjectN]= useState('');
  const [DateWeekly,setDateWeekly]= useState('');
  
  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);


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

  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(AuthData == null){

    }else{
      if(SuperCon.length == 0){
        if(EmpData == '' || EmpData == null || EmpData == undefined){
          dispatch(VirginLeadsAction(AuthData.id,1,12,SalesConsul,ProjectN,''));
        }else{
          dispatch(VirginLeadsAction('all',1,12,SalesConsul,ProjectN,EmpData.teamObj));
        }
        
      }else{
        dispatch(VirginLeadsAction('all',1,12,SalesConsul,ProjectN,''));
      }
      
    }
    
  },[]);


  const handlePageClick = (data) => {
    console.log('click.....',data);
    let currentPage = data.selected + 1
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(VirginLeadsAction(AuthData.id,currentPage,12,SalesConsul,ProjectN,''));
      }else{
        dispatch(VirginLeadsAction('all',currentPage,12,SalesConsul,ProjectN,EmpData.teamObj));
      }
      
    }else{
      dispatch(VirginLeadsAction('all',currentPage,12,SalesConsul,ProjectN,''));
    }
   
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(VirginLeadsAction(AuthData.id,1,12,SalesConsul,ProjectN,''));
      }else{
        dispatch(VirginLeadsAction('all',1,12,SalesConsul,ProjectN,EmpData.teamObj));
      }
      
    }else{
      dispatch(VirginLeadsAction('all',1,12,SalesConsul,ProjectN,''));
    }
  
  }

  return (
    <>
    <Navigation/>
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
            <div>
                <h2 className="hk-pg-title font-weight-600">Virign Leads</h2>
            </div>
        </div>

      {
       SuperCon.length == 0 ? (
        <></>
       ):(
        <div class="row pb-3">
          <div className="col-md-2">
        <div className="form-group">
          <label htmlFor="">Search Anything</label>
        <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
        <div class="col-md-2">
          <div class="form-group">
              <label for="">Consultants</label>
              <select name="ConsultantNmae" id="" class="form-control" onChange={(e) => setSalesConsul(e.target.value)}>
                  <option value="">Select All</option>
                  {
                    DashboardData.empall.map((items,key) => {
                        return (
                        items.id == '' ? (
                          <></>
                        ):(
                            <option value={items.id} key={key+1}>{items.emp_name}</option>
                          )
                        )
                    
                    })
                  }
              </select>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
              <label for="">Projects</label>
              <select name="projectN" id="" class="form-control" onChange={(e) => setProjectN(e.target.value)}>
                  <option value="">Select All</option>
                  {
                    DashboardData.getAllProjects.map((items,key) => {
                        return (
                        items.clientProject == '' ? (
                          <></>
                        ):(
                            <option value={items.clientProject} key={key+1}>{items.clientProject}</option>
                          )
                        )
                    
                    })
                  }
              </select>
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
        {/* <div class="col-md-2">
          <div class="form-group">
              <label for="">Date</label>
              <select class="form-control" name="dateWeekly" onChange={(e) => setDateWeekly(e.target.value)}>
                  <option value="">1 Week</option>
                  <option value="15">15 Days</option>
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="1">1 Year</option>
                  <option value="all">Life Time</option>
              </select>
          </div>
        </div> */}
        <div class="col-md-2">
          <div class="form-group" style={{marginTop:'33px'}}>
              <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
          </div>
        </div>
        </div>
       )
      }
      
      <div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultVirginData.total}</span></h4>
</div>
</div>
        <div className="row">
        <div className="col-sm">
        <div className="table-wrap">

        <table id="datable_1" className="table table-hover w-100 display pb-30">
        <thead className="thead-dark">
        <tr>
        { SuperCon.length > 0 || EmpData2 !='' ? <th>Consultant Name</th> : '' }
        <th>Name</th>
        <th>Project Name</th>
        <th>Assign By</th>
        <th>Reminder Priority</th>
        <th>Lead Status</th>
        <th>Assigned At</th>
        </tr>
        </thead>
        <tbody>
        {

resultVirginData == '' ? (
  <>Loading.....</>
):(

  resultVirginData.data.length > 0 ? (

 resultVirginData.data.map((curElem) => {

  let data='';

  if (curElem.reminder_data == null) {
    data = "Not Set";
  }else{
    data = curElem.reminder_data.priority;
  }

  return (

    <tr>
        {
      SuperCon.length > 0 || EmpData2 !='' ? (<td>{curElem.get_employee == '' || curElem.get_employee == null ? '' : curElem.get_employee.emp_name}</td>) : (<></>)
      }
      <td>{curElem.getleads == null ? '' : curElem.getleads == null ? '' : curElem.getleads == null ? '' : curElem.getleads.clientName == '' ? 'No Name' : curElem.getleads.clientName}</td>
      <td>{curElem.getleads == null ? '' : curElem.getleads.clientProject}</td>
      <td>
      <div className="align-items-center media">
    <div className="media-img-wrap">
    <div className="avatar mr-1" style={{width:'50px',height:'50px'}}>
        <img src={`../frontAsset/dist/img/redbox.png`} alt="user" className="avatar-img rounded-circle" style={{objectFit:'scale-down'}}/>
    </div>
    </div>
    <div className="media-body">
    <span></span>
    </div>
    </div>
      </td>
      <td><span className="badge badge-danger badge-indicator"></span> {data}</td>
      <td><span class="badge badge-danger  badge-pill">Untouch Lead</span></td>
      
      <td>{curElem.publishAgentDate}</td>
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

}
        </tbody>
        </table>

        <div className='pb-3 pt-0'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultVirginData.total/12)}
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

export default ListVirginLeads