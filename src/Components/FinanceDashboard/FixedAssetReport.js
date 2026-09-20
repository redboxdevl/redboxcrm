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
import { SecurityFiltersAction } from '../../redux/action/SecurityFiltersAction';
import { FixedAssetFiltersAction } from '../../redux/action/FixedAssetFiltersAction';
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';

const FixedAssetReport = () => {

const componentRef = useRef();

const resultDashboard = useSelector(state => state.dashCountReducer.dashboardcount);
const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultSecurityFilters= useSelector(state => state.FixedAssetFiltersreducers.fixedassetfiltersdata);

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');


// const handlePrint = 


const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const AuthData = JSON.parse(localStorage.getItem('authdata'));

const [DocumentType,setDocumentType]=useState('');

const [AssetTypeFrom,setAssetTypeFrom]=useState('');
const [AssetTypeTo,setAssetTypeTo]=useState('');

const [PurchasedDateFrom,setPurchasedDateFrom]=useState('');
const [PurchasedDateTo,setPurchasedDateTo]=useState('');

const [DepartmentIdFrom,setDepartmentIdFrom]=useState('');
const [DepartmentIdTo,setDepartmentIdTo]=useState('');

const [CompanyIdFrom,setCompanyIdFrom]=useState('');
const [CompanyIdTo,setCompanyIdTo]=useState('');

const [AssetBookValueFrom,setAssetBookValueFrom]=useState('');
const [AssetBookValueTo,setAssetBookValueTo]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


const [CompaniesResult,setCompaniesResult]= useState([]);
const [DepartmentResult,setDepartmentResult]= useState([]);

const ListCompanies = async () => {
  const response = await fetch(`${actionConfig.REACT_APP_URL}company?agentId=1`);
  const dataxs = await response.json();
  const GetArray = dataxs.data;
  setCompaniesResult(await GetArray);
}


  const ListDepartment = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}department?agentId=1`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDepartmentResult(await GetArray);
    }


useEffect(() => {
dispatch(FixedAssetFiltersAction(AssetTypeFrom,AssetTypeTo,PurchasedDateFrom,PurchasedDateTo,DepartmentIdFrom,DepartmentIdTo,CompanyIdFrom,CompanyIdTo,AssetBookValueFrom,AssetBookValueTo));
    ListCompanies();
    ListDepartment();
},[]);


useEffect(() => {
dispatch(getDashCountData('all',''));
},[]);


const FilterReports = () => {

setCheckPrint(true);

dispatch(FixedAssetFiltersAction(AssetTypeFrom,AssetTypeTo,PurchasedDateFrom,PurchasedDateTo,DepartmentIdFrom,DepartmentIdTo,CompanyIdFrom,CompanyIdTo,AssetBookValueFrom,AssetBookValueTo));

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
<h2 className="hk-pg-title font-weight-600">Fixed Assets Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/fixed-asset-register" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Asset Type:</p>
</div>
<div className="form-group col-md-5">
<select name="AssetType" id="" className="form-control" onChange={e=>setAssetTypeFrom(e.target.value)} value={AssetTypeFrom}>
<option value="" selected>Select Asset Type</option>
{
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
      <></>
    ):(
      resultDashboard.AssetTypeData.length > 0 ? (
        resultDashboard.AssetTypeData.map((curElem,index) => {
        return (
          <option value={curElem.id}>{curElem.assetType}</option>
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
<select name="AssetTypeTo" id="" className="form-control" onChange={e=>setAssetTypeTo(e.target.value)} value={AssetTypeTo}>
<option value="" selected>Select Asset Type</option>
{
    resultDashboard.code == 'ERR_NETWORK' || resultDashboard.code == 'ERR_BAD_REQUEST' || resultDashboard.length == 0 || resultDashboard.code == 'ERR_BAD_RESPONSE' ? (
      <></>
    ):(
      resultDashboard.AssetTypeData.length > 0 ? (
        resultDashboard.AssetTypeData.map((curElem,index) => {
        return (
          <option value={curElem.id}>{curElem.assetType}</option>
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
<p>Company:</p>
</div>
<div className="form-group col-md-5">
<select name="CompanyIdFrom" id="" className="form-control" onChange={e=>setCompanyIdFrom(e.target.value)} value={CompanyIdFrom}>
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
<select name="CompanyIdTo" id="" className="form-control" onChange={e=>setCompanyIdTo(e.target.value)} value={CompanyIdTo}>
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
<p>Departments:</p>
</div>
<div className="form-group col-md-5">
<select name="DepartmentIdFrom" id="" className="form-control" onChange={e=>setDepartmentIdFrom(e.target.value)} value={DepartmentIdFrom}>
<option value="" selected>Select Department</option>
{
DepartmentResult && DepartmentResult.map((item,key) => {
    return (
    <option value={item.id}>{item.department_name}</option>
    )
})
}
</select>
</div>
<div className="form-group col-md-5">
<select name="DepartmentIdTo" id="" className="form-control" onChange={e=>setDepartmentIdTo(e.target.value)} value={DepartmentIdTo}>
<option value="" selected>Select Department</option>
{
DepartmentResult && DepartmentResult.map((item,key) => {
    return (
    <option value={item.id}>{item.department_name}</option>
    )
})
}
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Purchased Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="PurchasedDateFrom" className="form-control" onChange={e=>setPurchasedDateFrom(e.target.value)} value={PurchasedDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="PurchasedDateTo" className="form-control" onChange={e=>setPurchasedDateTo(e.target.value)} value={PurchasedDateTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Asset Book Value:</p>
</div>
<div className="form-group col-md-5">
<input type="number" name="AssetBookValueFrom" className="form-control" onChange={e=>setAssetBookValueFrom(e.target.value)} value={AssetBookValueFrom} />
</div>
<div className="form-group col-md-5">
<input type="number" name="AssetBookValueTo" className="form-control" onChange={e=>setAssetBookValueTo(e.target.value)} value={AssetBookValueTo} />
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

<div className="d-flex justify-content-end">

</div>

{
CheckPrint == false ? '' : (

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
<table width="100%" border="0" className='myTable' style={{border:'0',borderCollapse:'inherit'}}>
<thead>
<tr>
<td colSpan={12} align='right'>
<button className="btn btn-danger btn-rounded " onClick={handlePrint}>Print</button>
</td>
</tr>
<tr>

<td colSpan={4} style={{padding:10,verticalAlign:'middle',textAlign:'left'}}><img src="../FrontAsset/images/logoRb.webp" alt="" width="220" className='imgBoxx imgBoxx2s' style={{verticalAlign:'middle'}}/></td>
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Fixed Asset Register</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Asset Type</th>
        <th>Asset Expiry</th>
        <th>Residue Life</th>
        <th>Depricatio Amount</th>
        <th>Book Value</th>
        <th>Purchased Date</th>
        <th>Description</th>
        <th>Location</th>
        <th>Company</th>
        <th>Department</th>
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
        <td>{curElem.assetType}</td>
        <td>{curElem.ExpiryDate}</td>
        <td>{curElem.residueLife}</td>
        <td>{Math.round(curElem.depForm)}</td>
        <td>{curElem.AssetBookValue}</td>
        <td>{curElem.purchasedDate}</td>
        <td>{curElem.AssetDesc}</td>
        <td>{curElem.locationName}</td>
        <td>{curElem.company_name}</td>
        <td>{curElem.department_name}</td>
        <td>{curElem.Quantity}</td>
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

export default FixedAssetReport