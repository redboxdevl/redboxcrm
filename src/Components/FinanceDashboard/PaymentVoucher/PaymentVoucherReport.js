import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import { useReactToPrint } from 'react-to-print';
import { SecurityFiltersAction } from '../../../redux/action/SecurityFiltersAction';
import { ChequeOutwardFilterAction } from '../../../redux/action/ChequeOutwardFilterAction';
import { BankListAction } from '../../../redux/action/BankListAction';
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import { PaymentRecieptFilterAction } from '../../../redux/action/PaymentRecieptFilterAction';
import { PaymentVoucherReportAction } from '../../../redux/action/PaymentVoucherReportAction';

const PaymentVoucherReport = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultVoucherFilters= useSelector(state => state.PaymentVoucherReportreducers.paymentvoucherfiltersdata);
const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
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

const [DateOfTransactionFrom,setDateOfTransactionFrom]=useState('');
const [DateOfTransactionTo,setDateOfTransactionTo]=useState('');

const [VoucherDateFrom,setVoucherDateFrom]=useState('');
const [VoucherDateTo,setVoucherDateTo]=useState('');

const [AmountFrom,setAmountFrom]=useState('');
const [AmountTo,setAmountTo]=useState('');

const [PaymentTypeFrom,setPaymentTypeFrom]=useState('');
const [PaymentTypeTo,setPaymentTypeTo]=useState('');

const [CompanyFrom,setCompanyFrom]=useState('');
const [CompanyTo,setCompanyTo]=useState('');

const [PayToFrom,setPayToFrom]=useState('');
const [PayToTo,setPayToTo]=useState('');



const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(PaymentVoucherReportAction(DateOfTransactionFrom,DateOfTransactionTo,VoucherDateFrom,VoucherDateTo,AmountFrom,AmountTo,PaymentTypeFrom,PaymentTypeTo,CompanyFrom,CompanyTo,PayToFrom,PayToTo));
},[]);

useEffect(() => {
    dispatch(BankListAction(FiltersSecurity.length == 0 ? '':'all',1,12));
},[]);

const ChequeNoList = async (AccountNo) => {
    if(AccountNo == '' || AccountNo == null || AccountNo == undefined){
      setChequeNoListResult('');
    }else{
  
      const response2 = await fetch(`${actionConfig.REACT_APP_URL}chequelistno/${AccountNo}?acc=all`);
      const dataxs2 = await response2.json();
      const GetArray2 = dataxs2.data;
      setChequeNoListResult(await GetArray2);
    }
   
  
  
  }

const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
  }


useEffect(() => {
dispatch(getDashCountData('all',''));
ListCompanies();
},[]);


const FilterReports = () => {

setCheckPrint(true);

dispatch(PaymentVoucherReportAction(DateOfTransactionFrom,DateOfTransactionTo,VoucherDateFrom,VoucherDateTo,AmountFrom,AmountTo,PaymentTypeFrom,PaymentTypeTo,CompanyFrom,CompanyTo,PayToFrom,PayToTo));

}

const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle:'testprint',
    onAfterPrint:()=>console.log("Print Success")
  });


return (
<>
{/* 
<style type="text/css" media="print">{"\
  @page {\ size: landscape;\ }\
"}</style> */}

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payment Voucher Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/payment-voucher-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Company:</p>
</div>
<div className="form-group col-md-5">
<select name="CompanyFrom" id="" className="form-control" onChange={e=>setCompanyFrom(e.target.value)} value={CompanyFrom}>
<option value="" selected>Select Company</option>
{
      CompaniesResult && CompaniesResult.map((item,key) => {
        return (
          <option value={item.id}>{item.company_name}</option>
        )
      })
    }
</select>
</div>
<div className="form-group col-md-5">
<select name="CompanyTo" id="" className="form-control" onChange={e=>setCompanyTo(e.target.value)} value={CompanyTo}>
<option value="" selected>Select Company</option>
{
      CompaniesResult && CompaniesResult.map((item,key) => {
        return (
          <option value={item.id}>{item.company_name}</option>
        )
      })
    }
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Transaction Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="DateOfTransactionFrom" className="form-control" onChange={e=>setDateOfTransactionFrom(e.target.value)} value={DateOfTransactionFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="DateOfTransactionTo" className="form-control" onChange={e=>setDateOfTransactionTo(e.target.value)} value={DateOfTransactionTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Voucher Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="VoucherDateFrom" className="form-control" onChange={e=>setVoucherDateFrom(e.target.value)} value={VoucherDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="VoucherDateTo" className="form-control" onChange={e=>setVoucherDateTo(e.target.value)} value={VoucherDateTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Amount:</p>
</div>
<div className="form-group col-md-5">
<input type="number" name="AmountFrom" className="form-control" onChange={e=>setAmountFrom(e.target.value)} value={AmountFrom} placeholder="Amount" />
</div>
<div className="form-group col-md-5">
<input type="number" name="AmountTo" className="form-control" onChange={e=>setAmountTo(e.target.value)} value={AmountTo} placeholder="Amount"  />
</div>
</div>



<div className="row">
<div className="form-group col-md-2">
<p>Payment Type:</p>
</div>
<div className="form-group col-md-5">
<select name="PaymentTypeFrom" id="" className="form-control" onChange={e=>setPaymentTypeFrom(e.target.value)} value={PaymentTypeFrom}>
<option value="" selected>Select Payment Type</option>
<option value="cashPaymentVoucher">Cash Payment Voucher (CPV)</option>
<option value="bankPaymentVoucher">Bank Payment Voucher (BPV)</option>
<option value="pettyCashVoucher">Petty Cash Voucher (PCV)</option>
<option value="cashRecieptVoucher">Cash Reciept Voucher (CRV)</option>
<option value="bankRecieptVoucher">Bank Reciept Voucher (BRV)</option>
<option value="journalVoucher">Journal Voucher (JV)</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="PaymentTypeTo" id="" className="form-control" onChange={e=>setPaymentTypeTo(e.target.value)} value={PaymentTypeTo}>
<option value="" selected>Select Payment Type</option>
<option value="cashPaymentVoucher">Cash Payment Voucher (CPV)</option>
<option value="bankPaymentVoucher">Bank Payment Voucher (BPV)</option>
<option value="pettyCashVoucher">Petty Cash Voucher (PCV)</option>
<option value="cashRecieptVoucher">Cash Reciept Voucher (CRV)</option>
<option value="bankRecieptVoucher">Bank Reciept Voucher (BRV)</option>
<option value="journalVoucher">Journal Voucher (JV)</option>
</select>
</div>
</div>


<div className="row">
<div className="form-group col-md-2">
<p>PayTo:</p>
</div>
<div className="form-group col-md-5">
<input type="text" className="form-control" name="PayToFrom" placeholder='Searching....' onChange={(e) => setPayToFrom(e.target.value)} value={PayToFrom} />
</div>
<div className="form-group col-md-5">
<input type="text" className="form-control" name="PayToTo" placeholder='Searching....' onChange={(e) => setPayToTo(e.target.value)} value={PayToTo} />
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Payment Voucher Reporting</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Voucher No</th>
        <th>Company Name</th>
        <th>Voucher Date</th>
        <th>Transaction Date</th>
        <th>Pay To</th>
        <th>Amount</th>
        <th>Payment Type</th>
        <th>Description</th>
        <th>Status</th>
    </tr>
</thead>
<tbody>

{

resultVoucherFilters.data == null ? (
<>Loading.....</>
):(

    resultVoucherFilters.data.length > 0 ? (
        resultVoucherFilters.data.map((curElem , index) => {

return (
<tr>
    <td width={190}>{curElem.voucherNo}</td>
    <td width={210}>{curElem.company_name}</td>
    <td>{curElem.voucherDate}</td>
    <td>{curElem.transactionDate}</td>
    <td>{curElem.payTo}</td>
    <td>{curElem.sumAmount}</td>
    <td>{curElem.paymentType == 'bankPaymentVoucher' ? 'Bank Payment Voucher (BPV)' : curElem.paymentType == 'cashPaymentVoucher' ? 'Cash Payment Voucher (CPV)' : curElem.paymentType == 'journalVoucher' ? 'Journal Voucher (JV)' : curElem.paymentType == 'cashRecieptVoucher' ? 'Cash Reciept Voucher (CRV)' : curElem.paymentType == 'bankRecieptVoucher' ? 'Bank Reciept Voucher (BRV)' : curElem.paymentType == 'pettyCashVoucher' ? 'Petty Cash Voucher (PCV)' : curElem.paymentType}</td>
    <td>{curElem.PayDesc}</td>
    <td><span className={`badge badge-${curElem.status == 0 ? 'danger' :'primary'}`}>{curElem.status == 0 ? 'Pending' : 'Approved'}</span></td>
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

<tr>
<td colspan="5" style={{textAlign:'right',fontWeight:'bolder'}}>Total Amount</td>  
<td colspan="3" style={{textAlign:'left'}}>{resultVoucherFilters == '' || resultVoucherFilters == null ? 0 : resultVoucherFilters.TotalCountLogic}</td>  
<td colspan="4"></td>  
</tr>
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

export default PaymentVoucherReport