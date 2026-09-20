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

const ReportChequeOutward = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultChequeOutwardFilters= useSelector(state => state.ChequeOutwardFiltersreducers.chequeoutwardfiltersdata);

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

const [IssueDateFrom,setIssueDateFrom]=useState('');
const [IssueDateTo,setIssueDateTo]=useState('');

const [ChequeDateFrom,setChequeDateFrom]=useState('');
const [ChequeeDateTo,setChequeeDateTo]=useState('');

const [AccountNoFrom,setAccountNoFrom]=useState('');
const [AccountNoTo,setAccountNoTo]=useState('');

const [ChequeNoFrom,setChequeNoFrom]=useState('');
const [ChequeNoTo,setChequeNoTo]=useState('');

const [StatusFrom,setStatusFrom]=useState('');
const [StatusTo,setStatusTo]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(ChequeOutwardFilterAction(IssueDateFrom,IssueDateTo,ChequeDateFrom,ChequeeDateTo,AccountNoFrom,AccountNoTo,ChequeNoFrom,ChequeNoTo,StatusFrom,StatusTo));
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

useEffect(() => {
if(AccountNoFrom == undefined){
}else{
ChequeNoList(AccountNoFrom);
}
console.log("AccountNo",AccountNoFrom);
},[AccountNoFrom == undefined ? '' : AccountNoFrom]);

const FilterReports = () => {

setCheckPrint(true);

dispatch(ChequeOutwardFilterAction(IssueDateFrom,IssueDateTo,ChequeDateFrom,ChequeeDateTo,AccountNoFrom,AccountNoTo,ChequeNoFrom,ChequeNoTo,StatusFrom,StatusTo));

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
<h2 className="hk-pg-title font-weight-600">Cheque Outward Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/list-cheque-outward-register" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Issue Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="IssueDateFrom" className="form-control" onChange={e=>setIssueDateFrom(e.target.value)} value={IssueDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="IssueDateTo" className="form-control" onChange={e=>setIssueDateTo(e.target.value)} value={IssueDateTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Cheque Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="ChequeDateFrom" className="form-control" onChange={e=>setChequeDateFrom(e.target.value)} value={ChequeDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="ChequeeDateTo" className="form-control" onChange={e=>setChequeeDateTo(e.target.value)} value={ChequeeDateTo} />
</div>
</div>


<div className="row">
<div className="form-group col-md-2">
<p>Account No:</p>
</div>
<div className="form-group col-md-5">
<select name="AccountNoFrom" id="" className="form-control" onChange={e=>setAccountNoFrom(e.target.value)} value={AccountNoFrom}>
<option value="" selected>Select Account No</option>
{

resultBankList.data == null ? (
<>Loading.....</>
):(

resultBankList.data.length > 0 ? (
  resultBankList.data.map((curElem , index) => {

return (
<option value={curElem.id}>{curElem.accountno} ({curElem.bankname})</option>
)


})

): (
<>
</>
)

)

}
</select>
</div>
<div className="form-group col-md-5">
<select name="AccountNoTo" id="" className="form-control" onChange={e=>setAccountNoTo(e.target.value)} value={AccountNoTo}>
<option value="" selected>Select Account No</option>
{

resultBankList.data == null ? (
<>Loading.....</>
):(

resultBankList.data.length > 0 ? (
  resultBankList.data.map((curElem , index) => {

return (
<option value={curElem.id}>{curElem.accountno} ({curElem.bankname})</option>
)


})

): (
<>
</>
)

)

}
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Cheque No:</p>
</div>
<div className="form-group col-md-5">
<select name="ChequeNoFrom" id="" className="form-control" onChange={e=>setChequeNoFrom(e.target.value)} value={ChequeNoFrom}>
<option value="" selected>Select Cheque No</option>
{

ChequeNoListResult  == undefined || ChequeNoListResult.length == 0 ? (
<>Loading.....</>
):(
    ChequeNoListResult.map((curElem , index) => {

    return (
    <option value={curElem.id}>{curElem.chequeNo}</option>
    )
    

    })

    )

}
</select>
</div>
<div className="form-group col-md-5">
<select name="ChequeNoTo" id="" className="form-control" onChange={e=>setChequeNoTo(e.target.value)} value={ChequeNoTo}>
<option value="" selected>Select Cheque No</option>
{

ChequeNoListResult  == undefined || ChequeNoListResult.length == 0 ? (
<>Loading.....</>
):(
    ChequeNoListResult.map((curElem , index) => {

    return (
    <option value={curElem.id}>{curElem.chequeNo}</option>
    )
    

    })

    )

}
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Status:</p>
</div>
<div className="form-group col-md-5">
<select name="StatusFrom" id="" className="form-control" onChange={e=>setStatusFrom(e.target.value)} value={StatusFrom}>
<option value="" selected>Select Status</option>
<option value="Released">Uncleared</option>
    <option value="Cleared">Cleared</option>
    <option value="Hold">Hold</option>
    <option value="Stop">Stop</option>
    <option value="Cancelled">Cancelled</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="StatusTo" id="" className="form-control" onChange={e=>setStatusTo(e.target.value)} value={StatusTo}>
<option value="" selected>Select Status</option>
<option value="Released">Uncleared</option>
    <option value="Cleared">Cleared</option>
    <option value="Hold">Hold</option>
    <option value="Stop">Stop</option>
    <option value="Cancelled">Cancelled</option>
</select>
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Cheque Outward Reporting</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Issue Date</th>
        <th>Cheque No</th>
        <th>Cheque Date</th>
        <th>Amount</th>
        <th>Issue To</th>
        <th>Purpose</th>
        <th>Cheque Status</th>
        <th>Cleared Date</th>
        <th>Title</th>
        <th>Bank Name</th>
        <th>Branch Name</th>
        <th>Account No</th>
    </tr>
</thead>
<tbody>

{

resultChequeOutwardFilters.data == null ? (
<>Loading.....</>
):(

    resultChequeOutwardFilters.data.length > 0 ? (
        resultChequeOutwardFilters.data.map((curElem , index) => {

return (
<tr>
    <td>{curElem.issueDateC}</td>
    <td>{curElem.Chequelist == '' || curElem.Chequelist == null ? '' : curElem.Chequelist.chequeNo}</td>
    <td>{curElem.chequeDateC}</td>
    <td>{curElem.chequeAmount}</td>
    <td>{curElem.IssuedTo}</td>
    <td>{curElem.Purpose}</td>
    <td>{curElem.Chequelist == '' || curElem.Chequelist == null ? '' : curElem.Chequelist.cheqStatus == 'Released' ? 'Uncleared' : curElem.Chequelist.cheqStatus}</td>
    <td>{curElem.clearedDate}</td>
    <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.title}</td>
    <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.bankname}</td>
    <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.branch}</td>
    <td>{curElem.Banklist == '' || curElem.Banklist == null ? '' : curElem.Banklist.accountno}</td>
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

export default ReportChequeOutward