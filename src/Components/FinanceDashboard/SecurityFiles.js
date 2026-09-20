import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { SecurityFilesAction } from '../../redux/action/SecurityFilesAction';
import { actionConfig } from '../../configuration';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';


const SecurityFiles = () => {

    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultSecurity = useSelector(state => state.SecurityFilesReducers.securityfiledata);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
    const dispatch = useDispatch();

    const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

   
    const [DocumentType,setDocumentType]=useState('');
    const [search,setSearch]= useState('');
    const [PropertyType,setPropertyType]=useState('');
    const [DocumentReference,setDocumentReference]=useState('');
    const [DocumentStatus,setDocumentStatus]=useState('');
    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    const [IssuingAuthority,setIssuingAuthority]=useState('');
    

    useEffect(() => {
      dispatch(getDashCountData('all',''));
   },[]);

    useEffect(() => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',1,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description,IssuingAuthority,AuthData.company_id));
  },[]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const AuthData = JSON.parse(localStorage.getItem('authdata'));
        dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',1,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description,IssuingAuthority,AuthData.company_id));
    }

    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>alert("Print Success")
    })

    console.log("result",result);

     const handlePageClick = (data) => {
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
    let currentPage = data.selected + 1;
    dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',currentPage,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description,IssuingAuthority,AuthData.company_id));
    
    }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Security Files</h2>
{/* <button onClick={handlePrint}>Print this out!</button> */}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
  {/* <h1>This is Testing Print</h1> */}
</div>
</div>
<div>
<NavLink to="/add-security-files" className="btn btn-primary btn-rounded btn-sm">Add Security Files</NavLink>
</div>

</div>

    <div class="row pb-3">
{/* <div className="col-md-3">
<div className="form-group">
<label htmlFor="">Search Anything</label>
<input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
</div>
</div> */}
<div class="col-md-3">
<div class="form-group">
<label for="">Document Type</label>
<select id="documentType" name="documentType" class="form-control" required="" onChange={e=>setDocumentType(e.target.value)} value={DocumentType}>
    <option value="" selected>Select Option</option>
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
    <option value="others">Others</option>
  </select>
</div>
</div>

<div class="form-group col-md-3">
  <label for="inputPassword4">Issuing Authority*</label>
  <select id="IssuingAuthority" name="IssuingAuthority" class="form-control" onChange={e=>setIssuingAuthority(e.target.value)} value={IssuingAuthority} required>
    <option value="" selected>Select Option</option>
    {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 || result.code == 'ERR_BAD_RESPONSE' ? (
  <></>
):(
    result.Issuingauthority.length > 0 ? (
      result.Issuingauthority.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.issuingTitle}</option>
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

<div class="col-md-3">
<div class="form-group">
  <label for="inputPassword4">Property Type*</label>
  <select id="propertyType" name="propertyType" class="form-control" required onChange={e=>setPropertyType(e.target.value)} value={PropertyType}>
    <option value="" selected>Select Option</option>
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



<div class={`form-group col-md-3`}>
<label for="inputPassword4">Document Reference</label>
<input type="text" class="form-control" name="documentReference" placeholder="Document Reference" autocomplete="off" onChange={e=>setDocumentReference(e.target.value)} value={DocumentReference}/> 
</div>

<div class="form-group col-md-3">
  <label for="inputPassword4">Document Status</label>
  <select id="documentStatus" name="documentStatus" class="form-control" required onChange={e=>setDocumentStatus(e.target.value)} value={DocumentStatus}>
    <option value="" selected>Select Option</option>
    <option value="Held">Held</option>
    <option value="Released">Released</option>
  </select>
</div>

<div class={`form-group col-md-3`}>
  <label for="inputPassword4">Title</label>
  <input type="text" class="form-control" name="title" placeholder="Title" autocomplete="off" onChange={e=>setTitle(e.target.value)} value={Title}/> 
  </div>

  <div class={`form-group col-md-3`}>
  <label for="inputPassword4">Description</label>
  <input type="text" class="form-control" name="description" placeholder="Description" autocomplete="off" onChange={e=>setDescription(e.target.value)} value={Description}/> 
  </div>

{/* <div class={`form-group col-md-3`}>
  <label for="inputPassword4">Released Name</label>
  <input type="text" class="form-control" name="releasedTo" placeholder="Released Name" autocomplete="off" onChange={e=>setReleasedTo(e.target.value)} value={ReleasedTo}/> 
  </div>

  <div class={`form-group col-md-3`}>
  <label for="inputPassword4">Released Date</label>
  <input type="date" class="form-control" name="releasedDate" placeholder="Released Date" autocomplete="off" onChange={e=>setReleasedDate(e.target.value)} value={ReleasedDate}/> 
  </div> */}


<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>


<OtherNavigation/>

<div class="hk-row">
<div class="col-lg-12">
<div class="card">
<div class="card-body">
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<div class="table-responsive">
<table class="table table-hover table-bordered mb-0">
  <thead>
      <tr>
          <th>Serial No</th>
          <th>Doc Type</th>
          <th>Property Type</th>
          <th>Description</th>
          <th>Title</th>
          <th>Nature</th>
          <th>Doc Status</th>
          <th>Released Name</th>
          <th>Released Date</th>
          <th>Attachement</th>
          <th>Status</th>
          <th>Publish Date</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultSecurity.data == null ? (
  <>Loading.....</>
):(

  resultSecurity.data.length > 0 ? (
    resultSecurity.data.map((curElem , index) => {

return (
    <tr>
      <td>{curElem.company_abbr}/<Moment format="YYYY">{curElem.created_at}</Moment>/<Moment format="MM">{curElem.created_at}</Moment>/{curElem.rec_id}</td>
      <td>{curElem.document_title}</td>
      <td>{curElem.type_name}</td>
      <td>{curElem.docDesc}</td>
      <td>{curElem.ownerShipTitle}</td>
      <td>{curElem.docNature}</td>
      <td><span className='badge badge-primary'>{curElem.docStatus}</span></td>
      <td>{curElem.releaseName}</td>
      <td>{curElem.releaseDate}</td>
      
      
      <td><a href={`${actionConfig.REACT_APP_MAIN}${curElem.Attachement}`} download target='_blank'>Download File</a> <a href={`${actionConfig.REACT_APP_MAIN}${curElem.Attachement}`} className='badge badge-primary' target='_blank'>Preview File</a></td>
      <td><span className="badge badge-danger">{curElem.status}</span></td>
      <td>{curElem.publish_date}</td>
      <td>
        <NavLink to={`/add-security-files/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink></td>
    </tr>

)
  

})

): (
  <>
  <tr>
        <td colspan="11">No Record Found</td>  
    </tr>
  </>
  )

)

}
  </tbody>
</table>

<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultSecurity.TotalCount/12)}
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
</div>
</div>

</div>

</div>
</>
)
}

export default SecurityFiles