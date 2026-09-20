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
import { useRef } from 'react';
import moment from 'moment';
import Moment from 'react-moment';

const SecurityFilesReport = () => {

const componentRef = useRef();

const singleAttendanceData = useSelector(state => state.SingleAttendancereducers.singleattendance);
const result = useSelector(state => state.dashCountReducer.dashboardcount);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
const resultSecurityFilters= useSelector(state => state.SecurityFiltersreducers.securityfiltersdata);

const navigate = useNavigate();
let { id } = useParams();
const dispatch = useDispatch();

let CurrentDate = moment().format('YYYY-MM-DD');


// const handlePrint = 


const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');


const AuthData = JSON.parse(localStorage.getItem('authdata'));

const [CompaniesResult,setCompaniesResult]= useState([]);

const [DocumentType,setDocumentType]=useState('');

const [SerialNoStart,setSerialNoStart]=useState('');
const [SerialNoEnd,setSerialNoEnd]=useState('');

const [EntryDateFrom,setEntryDateFrom]=useState('');
const [EntryDateTo,setEntryDateTo]=useState('');

const [ReleaseDateFrom,setReleaseDateFrom]=useState('');
const [ReleaseDateTo,setReleaseDateTo]=useState('');

const [DocTypeFrom,setDocTypeFrom]=useState('');
const [DocTypeTo,setDocTypeTo]=useState('');

const [DocNatureFrom,setDocNatureFrom]=useState('');
const [DocNatureTo,setDocNatureTo]=useState('');

const [PropTypeFrom,setPropTypeFrom]=useState('');
const [PropTypeTo,setPropTypeTo]=useState('');

const [CompaniesStartId,setCompaniesStartId]=useState('');
const [CompaniesEndId,setCompaniesEndId]=useState('');

const [CheckPrint,setCheckPrint]=useState(false);


useEffect(() => {
dispatch(SecurityFiltersAction(SerialNoStart,SerialNoEnd,EntryDateFrom,EntryDateTo,ReleaseDateFrom,ReleaseDateTo,DocTypeFrom,DocTypeTo,DocNatureFrom,DocNatureTo,PropTypeFrom,PropTypeTo,CompaniesStartId,CompaniesEndId));
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

dispatch(SecurityFiltersAction(SerialNoStart,SerialNoEnd,EntryDateFrom,EntryDateTo,ReleaseDateFrom,ReleaseDateTo,DocTypeFrom,DocTypeTo,DocNatureFrom,DocNatureTo,PropTypeFrom,PropTypeTo,CompaniesStartId,CompaniesEndId));

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
<h2 className="hk-pg-title font-weight-600">Security Files Reporting</h2>

</div>
<div class="d-flex">
<NavLink to="/security-files" className="btn btn-primary btn-rounded btn-sm">Back</NavLink>
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
<p>Serial No:</p>
</div>
<div className="form-group col-md-5">
<input type="text" name="SerialNoStart" className="form-control" onChange={e=>setSerialNoStart(e.target.value)} value={SerialNoStart} placeholder='SS/2023/02/0001' />
</div>
<div className="form-group col-md-5">
<input type="text" name="SerialNoEnd" className="form-control" onChange={e=>setSerialNoEnd(e.target.value)} value={SerialNoEnd} placeholder='SS/2023/02/0001' />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Entry Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="EntryDateFrom" className="form-control" onChange={e=>setEntryDateFrom(e.target.value)} value={EntryDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="EntryDateTo" className="form-control" onChange={e=>setEntryDateTo(e.target.value)} value={EntryDateTo} />
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Release Date:</p>
</div>
<div className="form-group col-md-5">
<input type="date" name="ReleaseDateFrom" className="form-control" onChange={e=>setReleaseDateFrom(e.target.value)} value={ReleaseDateFrom} />
</div>
<div className="form-group col-md-5">
<input type="date" name="ReleaseDateTo" className="form-control" onChange={e=>setReleaseDateTo(e.target.value)} value={ReleaseDateTo} />
</div>
</div>


<div className="row">
<div className="form-group col-md-2">
<p>Document Type:</p>
</div>
<div className="form-group col-md-5">
<select name="DocTypeFrom" id="" className="form-control" onChange={e=>setDocTypeFrom(e.target.value)} value={DocTypeFrom}>
<option value="" selected>Select Document Type</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
result.DocumentType.length > 0 ? (
    result.DocumentType.map((curElem,index) => {
    return (
    <option value={curElem.id}>{curElem.document_title}</option>
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
<select name="DocTypeTo" id="" className="form-control" onChange={e=>setDocTypeTo(e.target.value)} value={DocTypeTo}>
<option value="" selected>Select Document Type</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
result.DocumentType.length > 0 ? (
    result.DocumentType.map((curElem,index) => {
    return (
    <option value={curElem.id}>{curElem.document_title}</option>
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
<p>Document Nature:</p>
</div>
<div className="form-group col-md-5">
<select name="DocNatureFrom" id="" className="form-control" onChange={e=>setDocNatureFrom(e.target.value)} value={DocNatureFrom}>
<option value="" selected>Select Document Nature</option>
<option value="Original">Original</option>
<option value="Copy">Copy</option>
<option value="Certified Copy">Certified Copy</option>
</select>
</div>
<div className="form-group col-md-5">
<select name="DocNatureTo" id="" className="form-control" onChange={e=>setDocNatureTo(e.target.value)} value={DocNatureTo}>
<option value="" selected>Select Document Nature</option>
<option value="Original">Original</option>
<option value="Copy">Copy</option>
<option value="Certified Copy">Certified Copy</option>
</select>
</div>
</div>

<div className="row">
<div className="form-group col-md-2">
<p>Property Type:</p>
</div>
<div className="form-group col-md-5">
<select name="PropTypeFrom" id="" className="form-control" onChange={e=>setPropTypeFrom(e.target.value)} value={PropTypeFrom}>
<option value="" selected>Select Property Type</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
result.propertyType.length > 0 ? (
result.propertyType.map((curElem,index) => {
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
<select name="PropTypeTo" id="" className="form-control" onChange={e=>setPropTypeTo(e.target.value)} value={PropTypeTo}>
<option value="" selected>Select Property Type</option>
{
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
<></>
):(
result.propertyType.length > 0 ? (
result.propertyType.map((curElem,index) => {
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


<div className="row">
<div className="form-group col-md-2">
<p>Companies:</p>
</div>
<div className="form-group col-md-5">
<select name="companyId" id="" className="form-control" onChange={e=>setCompaniesStartId(e.target.value)} value={CompaniesStartId}>
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
<select name="companyId" id="" className="form-control" onChange={e=>setCompaniesEndId(e.target.value)} value={CompaniesEndId} >
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
<td colSpan={4} style={{padding:0,fontSize:20,verticalAlign:'middle',textAlign:'center'}}><p style={{fontSize:'30px'}}>Security Files</p></td>
<td colSpan={4} style={{padding:0,textAlign:'right',verticalAlign:'middle',fontSize:20,paddingRight:10}}><p>Date: 2022-01-01</p></td>
</tr>
</thead>
<tbody style={{border:'10px solid #F88D25'}}>
<tr className="dPlot">
<td colSpan={12} style={{padding:20}} className='paddingAdd'>
<table className='wrapBox Securiyt' width="100%" align="center">
<thead>
    <tr>
        <th>Serial #</th>
        <th>Company</th>
        <th>Property Type</th>
        <th>DOc Type</th>
        <th>DOc Ref</th>
        <th>DOc Nature</th>
        <th>DOc Description</th>
        <th>Entry Date</th>
        <th>Released Date</th>
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
        <td>{curElem.company_abbr}/<Moment format="YYYY">{curElem.created_at}</Moment>/<Moment format="MM">{curElem.created_at}</Moment>/{curElem.rec_id}</td>
        <td>{curElem.company_name}</td>
        <td>{curElem.type_name}</td>
        <td>{curElem.document_title}</td>
        <td>{curElem.docRef}</td>
        <td>{curElem.docNature}</td>
        <td>{curElem.docDesc}</td>
        <td><Moment format="DD-mm-YYYY">{curElem.created_at}</Moment></td>
        <td>{curElem.releaseDate}</td>
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

export default SecurityFilesReport