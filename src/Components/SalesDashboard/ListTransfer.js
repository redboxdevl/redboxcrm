import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import Navigation from '../../Includes/Navigation';
import { actionConfig } from '../../configuration';
import { TransferLeadsAction } from '../../redux/action/TransferLeadsAction';
import ReactPaginate from 'react-paginate';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

function ListTransfer() {


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

  const [result,setResult]= useState([]);
  const AuthDatas = JSON.parse(localStorage.getItem('authdata'));

  const resultTransferLeads = useSelector(state => state.TransferLeadsreducers.singletransferleadsdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3);
  
  const GetTransferLead = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}listransferleads?agentid=${AuthDatas.id}`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  const FinalArray = GetArray.data;
  setResult(await FinalArray);
  }
  
  useEffect(() => {
    // GetTransferLead();
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if(SuperCon.length == 0){
      dispatch(TransferLeadsAction(AuthData.id,1,12));
    }else{
      dispatch(TransferLeadsAction('all',1,12));
    }
  },[]);
  
  var countTransfer = result.length;

  const handlePageClick = (data) => {
    console.log('click.....',data);
    let currentPage = data.selected + 1
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if(SuperCon.length == 0){
      dispatch(TransferLeadsAction(AuthData.id,currentPage,12));
    }else{
      dispatch(TransferLeadsAction('all',currentPage,12));
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
                <h2 className="hk-pg-title font-weight-600">Transfer & Share Leads</h2>
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
        <div className="col-sm">
        <div className="table-wrap">

        <table id="datable_1" className="table table-hover w-100 display pb-30">
        <thead className="thead-dark">
        <tr>
        <th>Customer Name</th>
        <th>Project Name</th>
        <th>Agent</th>
        <th>Type</th>
        <th>Note</th>
        <th>Status</th>
        <th>Date</th>
        </tr>
        </thead>
        <tbody>


        {

resultTransferLeads.data == null ? (
  <>Loading.....</>
):(

  resultTransferLeads.data.length > 0 ? (

    resultTransferLeads.data.map((curElem , index) => {
    return (
      
      <tr>
        <td>{curElem.lead_data == null ? '' : curElem.lead_data.clientName}</td>
        <td>{curElem.lead_data == null ? '' : curElem.lead_data.clientProject}</td>
        <td>{curElem.to_agent == null || curElem.to_agent == '' ? '' : curElem.to_agent.emp_name}</td>
        <td>{curElem.statusType}</td>
        <td>{curElem.transferNote}</td>
        <td>{curElem.publishStatus}</td>
        <td>{curElem.created_at}</td>
      </tr>

      )
    
    })
    ): (
    <>
    <tr>
    <td colSpan="7"><b>No record Found....</b></td>
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
pageCount={Math.ceil(resultTransferLeads.total/12)}
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

export default ListTransfer