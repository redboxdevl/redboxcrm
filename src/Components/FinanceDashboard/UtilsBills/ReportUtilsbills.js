import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { PayablebillsFilterAction } from '../../../redux/action/PayablebillsFilterAction';

const ReportUtilsbills = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultPayablebills= useSelector(state => state.PayablebillsFilterreducers.payablebillsFilterdata);
const resultDashboard = useSelector(state => state.dashboardListReducers.dashboardlistcount);
const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');


// const handlePrint = 
const resultBankList = useSelector(state => state.Bankreducers.banklistdata);

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const AuthData = JSON.parse(localStorage.getItem('authdata'));

const [CompaniesResult,setCompaniesResult]= useState([]);
const [ChequeNoListResult,setChequeNoListResult]= useState([]);

const [Duedatefrom,setDuedatefrom]=useState('');
const [Duedateto,setDuedateto]=useState('');

const [Billingmonthfrom,setBillingmonthfrom]=useState('');
const [Billingmonthto,setBillingmonthto]=useState('');

const [Ballanceamountfrom,setBallanceamountfrom]=useState('');
const [Ballanceamountto,setBallanceamountto]=useState('');

const [Billnofrom,setBillnofrom]=useState('');
const [Billnoto,setBillnoto]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(PayablebillsFilterAction(Duedatefrom,Duedateto,Billingmonthfrom,Billingmonthto,Ballanceamountfrom,Ballanceamountto,Billnofrom,Billnoto));
},[]);

useEffect(() => {
dispatch(getDashCountData('all',''));
},[]);


const FilterReports = () => {

setCheckPrint(true);
dispatch(PayablebillsFilterAction(Duedatefrom,Duedateto,Billingmonthfrom,Billingmonthto,Ballanceamountfrom,Ballanceamountto,Billnofrom,Billnoto));

}

const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle:'testprint',
    onAfterPrint:()=>console.log("Print Success")
  });
console.log("resultPayablebills",resultPayablebills);
return (
<>
{/* 
<style type="text/css" media="print">{"\
  @page {\ size: landscape;\ }\
"}</style> */}

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payable Bills Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/bills-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
</div>


</div>

<OtherNavigation/>

<div className="row">
<div className="col-md-12">
<section className="hk-sec-wrapper">

<div class="row">
<div class="col-md-12">
<section class="hk-sec-wrapper">
<div class="col-md-12 col-xs-12 col-sm-12">


<div className="row">
<div className="form-group col-md-2">
<p>Due Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="Duedatefrom" className="form-control" onChange={e=>setDuedatefrom(e.target.value)} value={Duedatefrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="Duedateto" className="form-control" onChange={e=>setDuedateto(e.target.value)} value={Duedateto} />
</div>
</div>


<div className="row">
<div className="form-group col-md-2">
<p>Billing Month:</p>
</div>
<div className="form-group col-md-5">
<select name="Billingmonthfrom" id="" className="form-control" onChange={e=>setBillingmonthfrom(e.target.value)} value={Billingmonthfrom}>
<option value="" selected>Select Billing Month</option>
{
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' || resultDashboard.getMonth == 0 ? (
      <></>
    ):(
      resultDashboard.getMonth.length > 0 ? (
        resultDashboard.getMonth.map((curElem,index) => {
        return (
          <option value={curElem}>{curElem}</option>
        )
      })
      ): (
      <>
      <option>No Record Found....</option>
      </>
      )
    )

        }
</select>
</div>
<div className="form-group col-md-5">
<select name="Billingmonthto" id="" className="form-control" onChange={e=>setBillingmonthto(e.target.value)} value={Billingmonthto}>
<option value="" selected>Select Billing Month</option>
{
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' || resultDashboard.getMonth == 0 ? (
      <></>
    ):(
      resultDashboard.getMonth.length > 0 ? (
        resultDashboard.getMonth.map((curElem,index) => {
        return (
          <option value={curElem}>{curElem}</option>
        )
      })
      ): (
      <>
      <option>No Record Found....</option>
      </>
      )
    )

        }
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Balance Amount:</p>
</div>
<div className="form-group col-md-5">
<select name="Ballanceamountfrom" id="" className="form-control" onChange={e=>setBallanceamountfrom(e.target.value)} value={Ballanceamountfrom}>
<option value="" selected>Select Balance Amount</option>
<option value="Greater Than">Greater Than</option>
<option value="Equal To">Equal To</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="Ballanceamountto" id="" className="form-control" onChange={e=>setBallanceamountto(e.target.value)} value={Ballanceamountto}>
<option value="" selected>Select Balance Amount</option>
<option value="Greater Than">Greater Than</option>
<option value="Equal To">Equal To</option>
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Bill No:</p>
</div>
<div className="form-group col-md-5">
<input type="number" name="Billnofrom" className="form-control" onChange={e=>setBillnofrom(e.target.value)} value={Billnofrom} placeholder="Bill No"  />
</div>
<div className="form-group col-md-5">
<input type="text" name="Billnoto" className="form-control" onChange={e=>setBillnoto(e.target.value)} value={Billnoto} placeholder="Bill No" />
</div>
</div>

<button onClick={FilterReports} class="btn btn-primary">Filter</button>
</div>
</section>
</div>
</div>

</section>
</div>
</div>

{
CheckPrint == false ? '' : (

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<table width="100%" border="0" className='myTable' style={{border:'0',borderCollapse:'inherit'}}>
<thead>
<tr>
<td colSpan={12} align='right'>
<button className="btn btn-primary btn-rounded btn-sm" onClick={handlePrint}>Print</button>
</td>
</tr>
<tr>

<td colSpan={4} style={{padding:10,verticalAlign:'middle',textAlign:'left'}}><img src="../FrontAsset/images/logoRb.webp" alt="" width="220" className='imgBoxx imgBoxx2s' style={{verticalAlign:'middle'}}/></td>
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Payable Bills Reporting</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Type Name</th>
        <th>Company Name</th>
        <th>Beneficiary</th>
        <th>Bill Date</th>
        <th>Bill No</th>
        <th>Due Date</th>
        <th>Bill Amount</th>
        <th>Bill Month</th>
        <th>Paid Amount</th>
        <th>Balance</th>
        <th>Status</th>
    </tr>
</thead>
<tbody>

{

resultPayablebills.data == null ? (
<>Loading.....</>
):(

    resultPayablebills.data.length > 0 ? (
        resultPayablebills.data.map((curElem , index) => {

return (
<tr>
    <td>{curElem.typeTitle}</td>
    <td>{curElem.company_name}</td>
    <td>{curElem.Beneficiary}</td>
    <td>{curElem.billDateFormat}</td>
    <td>{curElem.billNo}</td>
    <td>{curElem.dueDateFromat}</td>
    <td>{curElem.BillAmount}</td>
    <td>{curElem.BillMonth}</td>
    <td>{curElem.PaidAmount == null ? 0 : curElem.PaidAmount}</td>
    <td>{curElem.balanaceAmount == null ? 0 : curElem.balanaceAmount}</td>
    <td><span className='badge badge-primary'>{curElem.statusInfo}</span></td>
</tr>
)


})

): (
<>
<tr>
<td colspan="12">No Record Found</td>  
</tr>
</>
)

)

}
</tbody>
</table>
</td>

</tr>

<tr>
<td colSpan={1} className="footerS">
<img src="../FrontAsset/images/footerlogo.png" alt="" width="60" style={{display:'block',marginLeft:'auto',marginRight:17}}/>
</td>
<td className="footerS" colSpan={11} style={{verticalAlign:'middle',paddingLeft:25,borderLeft:'1px solid #333'}}>
<p >Head Office B-275, Block, Gulshan-E-Iqbal, Karachi.<br />info@thecity108.com | thecity108.com | 021-34833244</p>
</td>
</tr>

</tbody>


</table>
</div>
)
}



</div>
</>
)
}

export default ReportUtilsbills