import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Swal from 'sweetalert2'
import Navigation from '../../Includes/Navigation';
import { useNavigate , NavLink } from 'react-router-dom';
import { ListViewDealsAction } from '../../redux/action/ListViewDealsAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { FaPenSquare } from 'react-icons/fa';
import Moment from 'react-moment';
import { NumericFormat } from 'react-number-format';
import { actionConfig } from '../../configuration';
import ReactPaginate from 'react-paginate';
import AffiliateNav from '../../Includes/AffiliateNav';


const ListViewDeals = () => {

const resultListing = useSelector(state => state.listviewdealsreducers.listviewdealdata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);

const FinCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.module_id == 4);

const dispatch = useDispatch();

const [StartDates,setStartDate]= useState('');
const [EndDate,setEndDate]= useState('');
const [search,setSearch]= useState('');
const [PlotNo,setPlotNo]= useState('');
const [BlockName,setBlockName]= useState('');
const [Size,setSize]= useState('');
const [Project,setProject]= useState('');
const [Category,setCategory]= useState('');
const [FileStatus,setFileStatus]= useState('');
const [InvStatus,setInvStatus]= useState('');

const AffiliateAuthData = JSON.parse(localStorage.getItem('affiliateauthdata'));
const AuthData = JSON.parse(localStorage.getItem('authdata'));
console.log("AffiliateAuthData",AffiliateAuthData);

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

const HrCOn = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 16);
const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

console.log("resultRolePermssion",resultRolePermssion);

const FinanceModeCOn2 = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.role_id == 21);


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
  dispatch(ListViewDealsAction(AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? FiltersSecurity.length == 0 ? AuthData.id:'' : AffiliateAuthData[0].id,1,12,PlotNo,BlockName,Size,Project,Category,InvStatus,AuthData.company_id));
  // const interval = setInterval(() => {
  // }, 3000);
  //   return () => clearInterval(interval);
},[]);

const handleSearch = async (e) => {
  e.preventDefault();
  
  console.log("searching....");

  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  dispatch(ListViewDealsAction(AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? FiltersSecurity.length == 0 ? AuthData.id:'' : AffiliateAuthData[0].id,1,12,PlotNo,BlockName,Size,Project,Category,InvStatus,AuthData.company_id));
}


const handlePageClick = (data) => {

let currentPage = data.selected + 1
const AuthData = JSON.parse(localStorage.getItem('authdata'));
dispatch(ListViewDealsAction(AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? FiltersSecurity.length == 0 ? AuthData.id:'' : AffiliateAuthData[0].id,currentPage,12,PlotNo,BlockName,Size,Project,Category,InvStatus,AuthData.company_id));
}


console.log("resultListing",resultListing);


const onChangeFileStatus = (event,id) => {
  const value = event.target.value;
  setFileStatus(value);

  Swal.fire({
    title: 'Do you want to change the Status ?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    // denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      const formData = new FormData();

      formData.append('FileStatus', value);
      formData.append('dealId', id);

    const requestOptions = {
      method: 'POST',
      body: formData
    };
      
      fetch(`${actionConfig.REACT_APP_URL}fileStatus`, requestOptions)
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        Swal.fire('Successfully Done!', '', 'success')

      });

      
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })


};


console.log("resultInventories",resultInventories);


return (
<>

{
  AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? <Navigation /> : <AffiliateNav />
}


<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex flex-row justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">List Deals Done</h2>
</div>
<div className="">
  {
  FinCon.length == 0 ? (
    <></>
  ):(
<button className='btn btn-danger mr-1' type="button" onClick={(e) => {
  e.preventDefault();
  window.location.href=`${actionConfig.REACT_APP_URL}exportdealdonereport?proid=${Project}`;
  }}>Export</button>
  )
}
</div>
</div>

<div class="row pb-3">

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Plot No</label>
<input type="text" className="form-control" name="PlotNo" placeholder='Plot No....' onChange={(e) => setPlotNo(e.target.value)} value={PlotNo}/>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Block</label>
<input type="text" className="form-control" name="Block" placeholder='Block Name....' onChange={(e) => setBlockName(e.target.value)} value={BlockName}/>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Size</label>
<input type="text" className="form-control" name="Size" placeholder='Size....' onChange={(e) => setSize(e.target.value)} value={Size}/>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Project</label>
<select name="Project" id="" className="form-control" onChange={(e) => setProject(e.target.value)} value={Project}>
  <option value="">Select Project</option>
  {
    resultInventories.length == '0' || resultInventories == null || resultInventories.code == 'ERR_BAD_REQUEST' || resultInventories.code == "ERR_NETWORK" ? '' : resultInventories.data.map((curElem,index) => {
    return (
    <option value={curElem.id} key={curElem.id}>{curElem.project_name}</option>
    )

  })

  }
</select>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Status</label>
<select name="InvStatus" id="" className="form-control" onChange={(e) => setInvStatus(e.target.value)} value={InvStatus}>
  <option value="">Select Status</option>
  <option value="Requested">Requested ( Sales Dept )</option>
      <option value="In Process">In Process ( Finance Dept )</option>
      <option value="Issued">Issued ( Builder Office )</option>
      <option value="Executed">Executed ( RB Office )</option>
      <option value="Handed Over">Handed Over ( Client )</option>
      <option value="Duplicate File Submitted to Builder">Duplicate File Submitted to Builder</option>
</select>
</div>
</div>

<div className="col-md-2">
<div className="form-group">
<label htmlFor="">Category</label>
<input type="text" className="form-control" name="Category" placeholder='Category....' onChange={(e) => setCategory(e.target.value)} value={Category}/>
</div>
</div>

{/* <div className="col-md-4">
<div className="form-group">
<label htmlFor="">Search Anything</label>
<input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
</div>
</div> */}

{/* <div className="col-md-3">
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
</div> */}

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

<div className="row">
<div className="col-md-12 pb-3">
 <h4>Total Records : <span className='badge badge-danger'>{resultListing.TotalCount}</span></h4>
</div>
</div>

<div className="row">
<div className="col-sm">
<div className="table-wrap">
<table className="table table-hover w-100 display pb-30">
<thead className="thead-dark">
<tr>
<th>Client Name</th>
<th>Mobile Number</th>
<th className="text-center">Project</th>
<th>Property No</th>
<th>Size</th>
<th>Block</th>
<th>Category</th>
<th>Date</th>
<th>File Status</th>
<th>Action</th>

</tr>
</thead>
<tbody>
{

resultListing == null || resultListing == '' || resultListing == undefined ? (
<>Loading.....</>
):(

resultListing.data.length > 0 ? (

resultListing.data.map((curElem , index) => {

  // var stringValue = parseFloat(curElem.jsonFormat.total_price.replace(/,/g, ""));

return (
// <td><NavLink to={`/sales-view-form/${curElem.id}`}>{curElem.clientName} <br /><span className='badge badge-secondary'>{curElem.Mystatus == 'normal' ? '' : curElem.Mystatus}</span></NavLink></td>
<tr>
  <td>{curElem.clientName} <br /><span className='badge badge-secondary'>{curElem.Mystatus == 'normal' ? '' : curElem.Mystatus}</span></td>
  <td>{curElem.mobileNo}</td>
  <td className="text-center"><img className="" width="50%" src={curElem.project_asset_path == '' ? '' : `${actionConfig.REACT_APP_MAIN}${curElem.project_asset_path}`} alt="icon" /></td>
  <td><span className='badge badge-danger'>{curElem.jsonFormat == null || curElem.jsonFormat == '' ? '' : curElem.jsonFormat.property_no}</span></td>
  <td><span className='badge badge-primary'>{curElem.jsonFormat == null || curElem.jsonFormat == '' ? '' : curElem.jsonFormat.size}</span> {curElem.jsonFormat == null || curElem.jsonFormat == '' ? '' : curElem.jsonFormat.measuring_unit}</td>
  <td><span className='badge badge-secondary'>{curElem.jsonFormat == null || curElem.jsonFormat == '' ? '' : curElem.jsonFormat.block}</span></td>
  <td><span className='badge badge-warning text-dark'>{curElem.jsonFormat == null || curElem.jsonFormat == '' ? '' : curElem.jsonFormat.property_category}</span></td>
  <td><Moment format="YYYY-MM-DD">{curElem.created_at}</Moment></td>
  <td><span className='badge badge-danger'>{curElem.status}</span></td>
  <td>
  {
    FiltersSecurity.length == 0 ? (

      AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? (
        <>
         <NavLink to={`/add-file-request/${curElem.id}`}><button className="btn btn-sm btn-dark">File Req</button></NavLink>
        </>
      ):(
        <>
         <div className="inline-block dropdown">
      <a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more font-20"/> <span className='badge badge-danger badge-sm'>For Customer Verification</span> </a>
      <div className="dropdown-menu dropdown-menu-right">
        <NavLink className="dropdown-item" to={`/booking-form/customer/${curElem.id}/7756400`}>Booking Form</NavLink>
      </div>
      </div>
        </>
      )

     
    ):(
      <>

      
        
      <div className="inline-block dropdown">
      <a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more font-20"/> <span className='badge badge-danger badge-sm'>For Customer Verification</span> </a>
      <div className="dropdown-menu dropdown-menu-right">
        <NavLink className="dropdown-item" to={`/booking-form/customer/${curElem.id}/7756400`}>Booking Form</NavLink>
      </div>
      </div>

      {
        AffiliateAuthData == '' || AffiliateAuthData == undefined || AffiliateAuthData.length == 0 ? (
          <><div className="inline-block dropdown">
          <a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more font-20"/> <span className='badge badge-primary badge-sm'>For Finance Department</span> </a>
          <div className="dropdown-menu dropdown-menu-right">
            <NavLink className="dropdown-item" to={`/allocation/${curElem.id}`}>Allocation</NavLink>
            <NavLink className="dropdown-item" to={`/booking-form/${curElem.id}`}>Booking Form</NavLink>
            <NavLink className="dropdown-item" to={`/confirmation/${curElem.id}`}>Confirmation</NavLink>
            <NavLink className="dropdown-item" to={`/provisional-allotment/${curElem.id}`}>Provisional Allotment</NavLink>
          </div>
          </div></>
        ) : (
        <></>
        )
      }
      
      
      </>
    )
  }

  <div className="form-group">
    <select name="" id="" className="form-control" onChange={(e)=>onChangeFileStatus(e,curElem.id)}>
      <option value="">Pending</option>
      {
        FinanceModeCOn2.length > 0 ? (
          <>
          {
            curElem.status == 'Requested' ? (
              <option value="Requested" selected>Requested ( Sales Dept )</option>
            ):(
              <option value="Requested">Requested ( Sales Dept )</option>
            )
          }
          {
            curElem.status == 'In Process' ? (
              <option value="In Process" selected>In Process ( Finance Dept )</option>
            ):(
              <option value="In Process">In Process ( Finance Dept )</option>
            )
          }

          {
            curElem.status == 'Issued' ? (
              <option value="Issued" selected>Issued ( Builder Office )</option>
            ):(
              <option value="Issued">Issued ( Builder Office )</option>
            )
          }

{
            curElem.status == 'Executed' ? (
              <option value="Executed" selected>Executed ( RB Office )</option>
            ):(
              <option value="Executed">Executed ( RB Office )</option>
            )
          }

{
            curElem.status == 'Handed Over' ? (
              <option value="Handed Over" selected>Handed Over ( Client )</option>
            ):(
              <option value="Handed Over">Handed Over ( Client )</option>
            )
          }

{
            curElem.status == 'Duplicate File Submitted to Builder' ? (
              <option value="Duplicate File Submitted to Builder" selected>Duplicate File Submitted to Builder</option>
            ):(
              <option value="Duplicate File Submitted to Builder">Duplicate File Submitted to Builder</option>
            )
          }
      
          </>
        ):(
          <>
          <option value="Requested">Requested ( Sales Dept )</option>
          </>
        )
      }
      
      
    </select>
  </div>
  
  </td>
  
</tr>

)

})
): (
<>
<tr>
<td colSpan="9"><b>No record Found....</b></td>
</tr>


</>
)

)



}

</tbody>

</table>

<div className='col-12'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultListing.TotalCount/12)}
marginPagesDisplayed={1}
pageRangeDisplayed={3}
onPageChange={handlePageClick}
containerClassName={`pagination justify-content-center `}
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

export default ListViewDeals