import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { NotInterestedAction } from '../../redux/action/NotInterestedAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import ReactPaginate from 'react-paginate';
import CheckboxNointerested from './CheckboxNointerested';

function ListNotintersted() {
 
  const EmpData2 = JSON.parse(localStorage.getItem('empTeam'));

  const resultNotinterestedData = useSelector(state => state.NotinterestedLeadsreducers.Notinterestedleaddata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultlistdashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
  const dispatch = useDispatch();

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);

  const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');
const [search,setSearch]= useState('');
const [SalesConsul,setSalesConsul]= useState('');
const [isCheck, setIsCheck] = useState([]);

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
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(NotInterestedAction(AuthData.id == null ? '' : AuthData.id,1,15,'',SalesConsul));
      }else{
        dispatch(NotInterestedAction('all',1,15,EmpData.teamObj,SalesConsul));
      }
    }else{
      dispatch(NotInterestedAction('all',1,15,'',SalesConsul));
    }
  },[]);

  const handlePageClick = (data) => {

    let currentPage = data.selected + 1
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(NotInterestedAction(AuthData.id,currentPage,15,'',SalesConsul));
      }else{
        dispatch(NotInterestedAction('all',currentPage,15,EmpData.teamObj,SalesConsul));
      }
   
    }else{
    dispatch(NotInterestedAction('all',currentPage,15,'',SalesConsul));
    }

  }

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    const EmpData = JSON.parse(localStorage.getItem('empTeam'));
    if(SuperCon.length == 0){
      if(EmpData == '' || EmpData == null || EmpData == undefined){
        dispatch(NotInterestedAction(AuthData.id == null ? '' : AuthData.id,1,15,'',SalesConsul));
      }else{
        dispatch(NotInterestedAction('all',1,15,EmpData.teamObj,SalesConsul));
      }
    }else{
      dispatch(NotInterestedAction('all',1,15,'',SalesConsul));
    }
  }

  return (
    <>
    <Navigation />
        <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
        <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
            <div>
                <h2 className="hk-pg-title font-weight-600">Not Interested Leads</h2>
            </div>
        </div>

        <div class="row pb-3">
  
  <div className="col-md-2">
    <div className="form-group">
      <label htmlFor="">Search Anything</label>
    <input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
    </div>
  </div>

  <div class="col-md-3">
<div class="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" class="form-control" onChange={(e) => setSalesConsul(e.target.value)}>
  <option value="">Select All</option>
  {
    resultlistdashboard == '' || resultlistdashboard == null || resultlistdashboard == undefined || resultlistdashboard.code == 'ERR_NETWORK' ? (
      <></>
    ):(
      resultlistdashboard.empAll.map((items,key) => {
        return (
        items.id == '' ? (
          <></>
        ):(
            <option value={items.id} key={key+1}>{items.emp_name}</option>
          )
        )
    
    })
    )
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

<div class="col-md-2">
  <div class="form-group" style={{marginTop:'33px'}}>
      <button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
  </div>
</div>
</div>
<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultNotinterestedData.TotalCount}</span></h4>
</div>
</div>
        <div className="row">
        <div className="col-sm">
        <div className="table-wrap">

        <table className="table display pb-30">
        <thead className="thead-dark">
        <tr>
        { SuperCon.length > 0 || EmpData2 !='' ? <th>Consultant Name</th> : '' }
        <th>Customer Name</th>
        <th>Project Name</th>
        <th>Designation</th>
        { SuperCon.length == 0 ? '' : <th>Lead Type</th> }
        <th>Reason Title</th>
        <th>Budget Price</th>
        <th>Date</th>
        </tr>
        </thead>
        <tbody>
        {

resultNotinterestedData.data == null ? (
  <>Loading.....</>
  ):(
  
    resultNotinterestedData.data.length > 0 ? (
    resultNotinterestedData.data.map((curElem , index) => {
  
  return (
    <tr>

{
  SuperCon.length > 0 || EmpData2 !='' ? (
    <>
      <td style={{width:270}}>
        <div className='d-flex align-items-center'>
        <label className="form-check-label">
     
        
        <CheckboxNointerested
            key={index+1}
            type="checkbox"
            name={curElem.leadid}
            id={curElem.leadid}
            handleClick={handleClick}
          />
         <span className='pl-2'>{curElem.emp_name}</span>
        </label>
        </div></td>
        </>
        ):(<></>)
      }
      <td>{curElem.clientName == null ? '' : curElem.clientName}</td>
      <td>{curElem.clientProject == null ? '' : curElem.clientProject}</td>
      <td>{curElem.clientDesignation == '' || curElem.clientDesignation == null ? 'N/a' : curElem.clientDesignation}</td>
      {SuperCon.length == 0 ? '' : <td><span className={curElem.LeadType == 'My Leads' ? `badge badge-primary` : `badge badge-danger`}>{curElem.LeadType}</span></td> }
      <td>{curElem.reasonTitle}</td>
      <td>{curElem.budgetPrice == null ? ( <>N/a</> ): (<>{curElem.budgetPrice}</>) }</td>
      <td>{curElem.created_at}</td>
    </tr>
  )

})

): (
<>
<tr>
<td colSpan="6"><b>No record Found....</b></td>
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
pageCount={Math.ceil(resultNotinterestedData.TotalCount/15)}
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

export default ListNotintersted