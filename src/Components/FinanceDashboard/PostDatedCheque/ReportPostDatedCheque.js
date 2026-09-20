import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../../redux/action/DashboardCountAction';
import { useReactToPrint } from 'react-to-print';
import { PostDatedFilterAction } from '../../../redux/action/PostDatedFilterAction';
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';

const ReportPostDatedCheque = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultPostDatedFilters= useSelector(state => state.PostDatedFilterreducers.postdatedchequefilterdata);

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');

const [BankListResult,setBankListResult]=useState([]);
// const handlePrint = 
const resultBankList = useSelector(state => state.Bankreducers.banklistdata);

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const AuthData = JSON.parse(localStorage.getItem('authdata'));

const [CompaniesResult,setCompaniesResult]= useState([]);
const [ChequeNoListResult,setChequeNoListResult]= useState([]);

const [RecievedDateFrom,setRecievedDateFrom]=useState('');
const [RecievedDateTo,setRecievedDateTo]=useState('');

const [ChequeDateFrom,setChequeDateFrom]=useState('');
const [ChequeeDateTo,setChequeeDateTo]=useState('');

const [BankNameFrom,setBankNameFrom]=useState('');
const [BankNameTo,setBankNameTo]=useState('');

const [PayeeTypeFrom,setPayeeTypeFrom]=useState('');
const [PayeeTypeTo,setPayeeTypeTo]=useState('');

const [StatusFrom,setStatusFrom]=useState('');
const [StatusTo,setStatusTo]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(PostDatedFilterAction(RecievedDateFrom,RecievedDateTo,ChequeDateFrom,ChequeeDateTo,BankNameFrom,BankNameTo,PayeeTypeFrom,PayeeTypeTo,StatusFrom,StatusTo));
},[]);

const ListBankData = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}listbanks`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setBankListResult(await GetArray);
    }

    useEffect(() => {
        ListBankData();
        },[]);

// const ListCompanies = async () => {
//   const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
//   const dataxs = await response.json();
//   const GetArray = dataxs.data;
//   setCompaniesResult(await GetArray);
//   }

const FilterReports = () => {

setCheckPrint(true);
dispatch(PostDatedFilterAction(RecievedDateFrom,RecievedDateTo,ChequeDateFrom,ChequeeDateTo,BankNameFrom,BankNameTo,PayeeTypeFrom,PayeeTypeTo,StatusFrom,StatusTo));

}

const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle:'testprint',
    onAfterPrint:()=>console.log("Print Success")
  });


return (
<>

{/* <style type="text/css" media="print">{"\
  @page {\ size: landscape;\ }\
"}</style> */}

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Post Dated Cheque Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/list-post-dated-cheque" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Recieved Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="RecievedDateFrom" className="form-control" onChange={e=>setRecievedDateFrom(e.target.value)} value={RecievedDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="RecievedDateTo" className="form-control" onChange={e=>setRecievedDateTo(e.target.value)} value={RecievedDateTo} />
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
<select name="BankNameFrom" id="" className="form-control" onChange={e=>setBankNameFrom(e.target.value)} value={BankNameFrom}>
<option value="" selected>Select Bank Name</option>
{
BankListResult && BankListResult.map((item,key) => {
    return (
    <option value={item.id}>{item.banktitle}</option>
    )
})
}
</select>
</div>
<div className="form-group col-md-5">
<select name="BankNameTo" id="" className="form-control" onChange={e=>setBankNameTo(e.target.value)} value={BankNameTo}>
<option value="" selected>Select Bank Name</option>
{
BankListResult && BankListResult.map((item,key) => {
    return (
    <option value={item.id}>{item.banktitle}</option>
    )
})
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
<option value="Held">Held</option>
<option value="Deposited">Deposited</option>
<option value="Released">Released</option>
<option value="Returned">Returned</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="StatusTo" id="" className="form-control" onChange={e=>setStatusTo(e.target.value)} value={StatusTo}>
<option value="" selected>Select Status</option>
<option value="Held">Held</option>
<option value="Deposited">Deposited</option>
<option value="Released">Released</option>
<option value="Returned">Returned</option>
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Payee Type:</p>
</div>
<div className="form-group col-md-5">
<select name="PayeeTypeFrom" id="" className="form-control" onChange={e=>setPayeeTypeFrom(e.target.value)} value={PayeeTypeFrom}>
<option value="" selected>Select Status</option>
<option value="Cash">Cash</option>
<option value="Cross">Cross</option>
<option value="Beneficiary">Beneficiary</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="PayeeTypeTo" id="" className="form-control" onChange={e=>setPayeeTypeTo(e.target.value)} value={PayeeTypeTo}>
<option value="" selected>Select Status</option>
<option value="Cash">Cash</option>
<option value="Cross">Cross</option>
<option value="Beneficiary">Beneficiary</option>
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Post Dated Cheque Reporting</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Cheque Date</th>
        <th>Recieved Dat</th>
        <th>Amount</th>
        <th>Bank Nam</th>
        <th>Branch Name</th>
        <th>Cheque No</th>
        <th>Recieved From</th>
        <th>Purpose Type</th>
        <th>Payee Type</th>
        <th>Status</th>
    </tr>
</thead>
<tbody>

{

resultPostDatedFilters.data == null ? (
<>Loading.....</>
):(

    resultPostDatedFilters.data.length > 0 ? (
        resultPostDatedFilters.data.map((curElem , index) => {

return (
<tr>
   <td>{curElem.chequeDate}</td>
   <td>{curElem.RecievedDate}</td>
   <td>{curElem.Amount}</td>
   <td>{curElem.BankName}</td>
   <td>{curElem.BranchName}</td>
   <td>{curElem.ChequeNo}</td>
   <td>{curElem.RecievedFrom}</td>
   <td>{curElem.Purpose}</td>
   <td>{curElem.PayeeType}</td>
   <td>{curElem.Status}</td>
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

export default ReportPostDatedCheque