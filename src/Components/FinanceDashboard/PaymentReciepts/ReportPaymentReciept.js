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

const ReportPaymentReciept = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultRecieptFilters= useSelector(state => state.PaymentRecieptfilterreducers.paymentrecieptfiltersdata);
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

const [DateOfRecieptFrom,setDateOfRecieptFrom]=useState('');
const [DateOfRecieptTo,setDateOfRecieptTo]=useState('');

const [PropertyNoFrom,setPropertyNoFrom]=useState('');
const [PropertyNoTo,setPropertyNoTo]=useState('');

const [CustomerNameFrom,setCustomerNameFrom]=useState('');
const [CustomerNameTo,setCustomerNameTo]=useState('');

const [ProjectFrom,setProjectFrom]=useState('');
const [ProjectTo,setProjectTo]=useState('');

const [CompanyFrom,setCompanyFrom]=useState('');
const [CompanyTo,setCompanyTo]=useState('');

const [ReferenceFrom,setReferenceFrom]=useState('');
const [ReferenceTo,setReferenceTo]=useState('');

const [PropertyTypeFrom,setPropertyTypeFrom]=useState('');
const [PropertyTypeTo,setPropertyTypeTo]=useState('');


const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(PaymentRecieptFilterAction(DateOfRecieptFrom,DateOfRecieptTo,PropertyNoFrom,PropertyNoTo,ProjectFrom,ProjectTo,CompanyFrom,CompanyTo,PropertyTypeFrom,PropertyTypeTo));
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

dispatch(PaymentRecieptFilterAction(DateOfRecieptFrom,DateOfRecieptTo,PropertyNoFrom,PropertyNoTo,ProjectFrom,ProjectTo,CompanyFrom,CompanyTo,PropertyTypeFrom,PropertyTypeTo));

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
<h2 className="hk-pg-title font-weight-600">Payment Reciept Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/payment-reciepts" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Date Of Reciept:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="DateOfRecieptFrom" className="form-control" onChange={e=>setDateOfRecieptFrom(e.target.value)} value={DateOfRecieptFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="DateOfRecieptTo" className="form-control" onChange={e=>setDateOfRecieptTo(e.target.value)} value={DateOfRecieptTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Property No:</p>
</div>
<div className="form-group col-md-5">
<input type="text" name="PropertyNoFrom" className="form-control" onChange={e=>setPropertyNoFrom(e.target.value)} value={PropertyNoFrom} placeholder="Property No" />
</div>
<div className="form-group col-md-5">
<input type="text" name="PropertyNoTo" className="form-control" onChange={e=>setPropertyNoTo(e.target.value)} value={PropertyNoTo} placeholder="Property No"  />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Customer Name:</p>
</div>
<div className="form-group col-md-5">
<input type="text" name="CustomerNameFrom" className="form-control" onChange={e=>setCustomerNameFrom(e.target.value)} value={CustomerNameFrom} placeholder="Customer Name"  />
</div>
<div className="form-group col-md-5">
<input type="text" name="CustomerNameTo" className="form-control" onChange={e=>setCustomerNameTo(e.target.value)} value={CustomerNameTo} placeholder="Customer Name" />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Reference:</p>
</div>
<div className="form-group col-md-5">
<input type="text" name="ReferenceFrom" className="form-control" onChange={e=>setReferenceFrom(e.target.value)} value={ReferenceFrom} placeholder="Reference" />
</div>
<div className="form-group col-md-5">
<input type="text" name="ReferenceTo" className="form-control" onChange={e=>setReferenceTo(e.target.value)} value={ReferenceTo} placeholder="Reference" />
</div>
</div>


<div className="row">
<div className="form-group col-md-2">
<p>Projects:</p>
</div>
<div className="form-group col-md-5">
<select name="ProjectFrom" id="" className="form-control" onChange={e=>setProjectFrom(e.target.value)} value={ProjectFrom}>
<option value="" selected>Select Project</option>
{
       resultInventories.length == '0' || resultInventories == null || resultInventories.code == 'ERR_BAD_REQUEST' || resultInventories.code == "ERR_NETWORK" ? '' : resultInventories.data.map((curElem,index) => {
        return (
        <option value={curElem.id} key={curElem.id}>{curElem.project_name}</option>
        )

      })

      }
</select>
</div>
<div className="form-group col-md-5">
<select name="ProjectTo" id="" className="form-control" onChange={e=>setProjectTo(e.target.value)} value={ProjectTo}>
<option value="" selected>Select Project</option>
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
<p>Property Type:</p>
</div>
<div className="form-group col-md-5">
<select name="PropertyTypeFrom" id="" className="form-control" onChange={e=>setPropertyTypeFrom(e.target.value)} value={PropertyTypeFrom}>
<option value="" selected>Select Type</option>
 {
resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
  resultDashboard.propertyType.length > 0 ? (
    resultDashboard.propertyType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.type_name}</option>
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
<select name="PropertyTypeTo" id="" className="form-control" onChange={e=>setPropertyTypeTo(e.target.value)} value={PropertyTypeTo}>
<option value="" selected>Select Type</option>
{
resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
  resultDashboard.propertyType.length > 0 ? (
    resultDashboard.propertyType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.type_name}</option>
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Payment Reciept Reporting</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Project</th>
        <th>Property Type</th>
        <th>Property No</th>
        <th>Customer Name</th>
        <th>Contact No</th>
        <th>Reference</th>
        <th>Reference No</th>
        <th>Net Sale</th>
        <th>Outstanding</th>
    </tr>
</thead>
<tbody>

{

resultRecieptFilters.data == null ? (
<>Loading.....</>
):(

    resultRecieptFilters.data.length > 0 ? (
        resultRecieptFilters.data.map((curElem , index) => {

return (
<tr>
    <td>{curElem.ProjectTitle}</td>
    <td>{curElem.type_name}</td>
    <td>{curElem.ProNo}</td>
    <td>{curElem.CustomerName}</td>
    <td>{curElem.ContactNo}</td>
    <td>{curElem.Reference}</td>
    <td>{curElem.ReferenceContactNo}</td>
    <td>{curElem.SaleAmountDa}</td>
    <td>{curElem.recivedAmt}</td>
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

export default ReportPaymentReciept