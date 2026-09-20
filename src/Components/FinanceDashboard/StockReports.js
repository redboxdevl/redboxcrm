import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { actionConfig } from '../../configuration';
import Swal from 'sweetalert2';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import SecurityPrint from './Print/SecurityPrint';
import { useReactToPrint } from 'react-to-print';
import { StockFiltersAction } from '../../redux/action/StockFiltersAction';
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';

const StockReports = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultSecurityFilters= useSelector(state => state.stockFiltersreducers.stockfiltersdata);

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');

const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

const AuthData = JSON.parse(localStorage.getItem('authdata'));

const [CompaniesResult,setCompaniesResult]= useState([]);

const [DocumentType,setDocumentType]=useState('');

const [StockInDateStart,setStockInDateStart]=useState('');
const [StockInDateEnd,setStockInDateEnd]=useState('');

const [ProjectsFrom,setProjectsFrom]=useState('');
const [ProjectsTo,setProjectsTo]=useState('');

const [StockNatureFrom,setStockNatureFrom]=useState('');
const [StockNatureTo,setStockNatureTo]=useState('');

const [RecivedByFrom,setRecivedByFrom]=useState('');
const [RecievedByTo,setRecievedByTo]=useState('');

const [DocNatureFrom,setDocNatureFrom]=useState('');
const [DocNatureTo,setDocNatureTo]=useState('');

const [PropTypeFrom,setPropTypeFrom]=useState('');
const [PropTypeTo,setPropTypeTo]=useState('');

const [CompaniesStartId,setCompaniesStartId]=useState('');
const [CompaniesEndId,setCompaniesEndId]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


const [ProjectResult,setProjectResult]= useState([]);

const Listproject = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setProjectResult(await GetArray);
  }

useEffect(() => {
    Listproject();
dispatch(StockFiltersAction(StockInDateStart,StockInDateEnd,ProjectsFrom,ProjectsTo,StockNatureFrom,StockNatureTo,RecivedByFrom,RecievedByTo));
},[]);


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

dispatch(StockFiltersAction(StockInDateStart,StockInDateEnd,ProjectsFrom,ProjectsTo,StockNatureFrom,StockNatureTo,RecivedByFrom,RecievedByTo));

}

const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle:'testprint',
    onAfterPrint:()=>console.log("Print Success")
  });


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Stock Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/stock-list" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Stock In Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="StockInDateStart" className="form-control" onChange={e=>setStockInDateStart(e.target.value)} value={StockInDateStart} placeholder='' />
</div>
<div className="form-group col-md-5">
<input type="date" name="StockInDateEnd" className="form-control" onChange={e=>setStockInDateEnd(e.target.value)} value={StockInDateEnd} placeholder='' />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Projects:</p>
</div>
<div className="form-group col-md-5">
<select name="ProjectsFrom" id="" className="form-control" onChange={e=>setProjectsFrom(e.target.value)} value={ProjectsFrom}>
<option value="" selected>Select Projects</option>
{
    ProjectResult && ProjectResult.map((item,key) => {
    return (
    <option value={item.id}>{item.project_name}</option>
    )
    })
}
</select>
</div>
<div className="form-group col-md-5">
<select name="ProjectsTo" id="" className="form-control" onChange={e=>setProjectsTo(e.target.value)} value={ProjectsTo}>
<option value="" selected>Select Projects</option>
{
    ProjectResult && ProjectResult.map((item,key) => {
    return (
    <option value={item.id}>{item.project_name}</option>
    )
    })
}
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Stock Nature:</p>
</div>
<div className="form-group col-md-5">
<select name="StockNatureFrom" id="" className="form-control" onChange={e=>setStockNatureFrom(e.target.value)} value={StockNatureFrom}>
<option value="" selected>Select Stock Nature</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
<></>
):(
result.stockNature.length > 0 ? (
    result.stockNature.map((curElem,index) => {
return (
    <option value={curElem.id}>{curElem.natureTitle}</option>
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
<select name="StockNatureTo" id="" className="form-control" onChange={e=>setStockNatureTo(e.target.value)} value={StockNatureTo}>
<option value="" selected>Select Stock Nature</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
<></>
):(
result.stockNature.length > 0 ? (
    result.stockNature.map((curElem,index) => {
return (
    <option value={curElem.id}>{curElem.natureTitle}</option>
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
<p>Recieved By:</p>
</div>
<div className="form-group col-md-5">
<select name="RecivedByFrom" id="" className="form-control" onChange={e=>setRecivedByFrom(e.target.value)} value={RecivedByFrom}>
<option value="" selected>Select Recieved By</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.Stockrecby.length > 0 ? (
      result.Stockrecby.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.rec_title}</option>
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
<select name="RecievedByTo" id="" className="form-control" onChange={e=>setRecievedByTo(e.target.value)} value={RecievedByTo}>
<option value="" selected>Select Recieved By</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.Stockrecby.length > 0 ? (
      result.Stockrecby.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.rec_title}</option>
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Stock List</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Stock In Date</th>
        <th>Projects</th>
        <th>Stock Type</th>
        <th>Stock Nature</th>
        <th>Stock Recieved By</th>
        <th>Stock Delivered By</th>
        <th>Quantity</th>
    </tr>
</thead>
<tbody>


{

resultSecurityFilters.data == null ? (
<>Loading.....</>
):(

resultSecurityFilters.data.length > 0 ? (
resultSecurityFilters.data.map((curElem , index) => {

return (
    <tr>
        <td>{curElem.stockIndate}</td>
        <td>{curElem.project_name}</td>
        <td>{curElem.typeName}</td>
        <td>{curElem.natureTitle}</td>
        <td>{curElem.stockrecby}</td>
        <td>{curElem.stockdeliveredby}</td>
        <td>{curElem.quantityIn}</td>
    </tr>

)


})

): (
<>
<tr>
<td colspan="8">No Record Found</td>  
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

export default StockReports