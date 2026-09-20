import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';
import { PayrollAction } from '../../redux/action/PayrollAction';
import ReactPaginate from 'react-paginate';


const Payrolls = () => {

  const [StartDates,setStartDate]= useState('');
  const [EndDate,setEndDate]= useState('');
  const [search,setSearch]= useState('');


  const resultPayroll = useSelector(state => state.Payrollreducer.payrolldata);

  const dispatch = useDispatch();

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

useEffect(() => {
  dispatch(PayrollAction(1,50,StartDates,EndDate));
  const interval = setInterval(() => {
    
  }, 3000);
    return () => clearInterval(interval);
},[]);

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


const handlePageClick = (data) => {

  let currentPage = data.selected + 1
  dispatch(PayrollAction(currentPage,12,StartDates,EndDate));
  
  }

const handleSearch = async (e) => {
e.preventDefault();

dispatch(PayrollAction(1,12,StartDates,EndDate));

}

const GeneratePayroll = () => {


  if(StartDates == null || StartDates == ''){
    Swal.fire(
      'Error!',
      'Please Select Date Range',
      'error'
    );
  }else{

    const FeildData = { StartDates:StartDates,EndDate:EndDate}
  
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(FeildData)
      };
      
      fetch(`${actionConfig.REACT_APP_URL}payroll`, requestOptions)
          .then(response => response.json())
          .then(dataex => {
            console.log("dataex",dataex);

            if(dataex.code == '200'){
              Swal.fire(
                'Success!',
                dataex.message,
                'success'
              );
            }
      
          });

  }

}

console.log("resultPayroll",resultPayroll);


const calculateTax = (amount) => {

  var taxAmount = 0;
  if(amount > 600000 && amount <= 1200000) {
      amount -= 600000;
      taxAmount = amount * 0.025;
  } else if(amount > 1200000 && amount <= 2400000) {			
      amount -= 1200000;
      taxAmount = 15000 + amount * 0.125;
  } else if(amount > 2400000 && amount <= 3600000) {
      amount -= 2400000;
      taxAmount = 165000 + amount * 0.2;
  } else if(amount > 3600000 && amount <= 6000000) {
      amount -= 3600000;
      taxAmount = 405000 + amount * 0.25;
  } else if(amount > 6000000 && amount <= 12000000) {
      amount -= 6000000;
      taxAmount = 1005000 + amount * 0.325;
  } else if(amount > 12000000) {
      amount -= 12000000;
      taxAmount = 2955000 + amount * 0.35;
  } 

  return Math.round(taxAmount);
}



const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const round = (num) => {
  return +(Math.round(num));
}



  return (
    <>
    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payroll</h2>

</div>
<div class="d-flex">
<a href="#" class="btn btn-danger btn-rounded btn-sm" onClick={GeneratePayroll}>Bulk Generate Salary</a>
</div>



</div>

<div class="row pb-3">
<div className="col-md-4">
<div className="form-group">
<label htmlFor="">Search Anything</label>
<input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" class="form-control" >
  <option value="">Select All</option>
</select>
</div>
</div>

<div class="col-md-2">
<div class="form-group">
<label for="">Date</label>
<DateRangePicker
  initialSettings={{ startDate:true ,endDate:true, timePicker:false , timePicker24Hour:false , locale  }}
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

<OtherNavigation/>

{/* <div className="row">
  <div className="col-md-12">
    <h3 className='pb-3 text-center'>Salary for the month of November -2022</h3>
  </div>
</div> */}

<div class="row">
<div class="col-sm">
<div class="table-wrap">
<table id="datable_1" class="table table-hover w-100 display pb-30">
<thead class="thead-dark">
  <tr>
      <th>ID</th>
      <th>Employee Name</th>
      <th>Designation</th>
      <th>Basic Salary</th>
      <th>Days Count</th>
      <th>Gross Salary</th>
      <th>CL</th>
      <th>SL</th>
      <th>AL</th>
      <th>Fuel</th>
      <th>Mobile</th>
      <th>Loan</th>
      <th>Account No</th>
      <th>Bank</th>
      <th>Tax</th>
      <th>Net Salary</th>
      <th>Payroll Date</th>
      <th>Actions</th>
  </tr>
</thead>
<tbody>
{

resultPayroll == null || resultPayroll.code == 'ERR_BAD_RESPONSE' || resultPayroll.code == 'ERR_NETWORK' ? (
  <>Loading.....</>
):(

  resultPayroll.data && resultPayroll.data.map((curElem , index) => {
    
    const Fuel = 0;
    const mobilecharge = 0;
    const loan = 0;
    const Tax = 750;


    const GrossSalary = parseFloat(curElem.getEmployee.salary_amount) / 30 * parseFloat(curElem.attendance_count);

    const netSalary = parseFloat(Fuel) + parseFloat(mobilecharge) - parseFloat(loan) - parseFloat(Tax) + GrossSalary ;

    const monthlySalary = curElem.getEmployee == '' || curElem.getEmployee == null || curElem.getEmployee.salary_amount == 'null' ? 'N/a' : curElem.getEmployee.salary_amount;

    const taxAmount = calculateTax(monthlySalary * 12);
    
    return (
    <tr>
      <td>{curElem.id}</td>
      <td>{curElem.getEmployee == '' || curElem.getEmployee == null ? '' : curElem.getEmployee.emp_name}</td>
      <td>{curElem.designation_name}</td>
      <td>{curElem.getEmployee == '' || curElem.getEmployee == null || curElem.getEmployee.salary_amount == 'null' ? 'N/a' : curElem.getEmployee.salary_amount}</td>
      <td>{curElem.attendance_count}</td>
      
      <td>{Math.round(GrossSalary)}</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>{Fuel}</td>
      <td>{mobilecharge}</td>
      <td>{loan}</td>
      <td>123884774</td>
      <td>Meezan</td>
      <td>{numberWithCommas(round(taxAmount/12))}</td>
      <td>{Math.round(netSalary)}</td>
      <td>{curElem.payrollMonth} {curElem.payrollYear}</td>
      <td><a href="#" className='btn btn-primary'>PaySlip</a></td>
    </tr>
  )
      
  })
  )

  }
</tbody>
</table>

<div className='col-12'>
<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultPayroll.TotalCount/50)}
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

export default Payrolls