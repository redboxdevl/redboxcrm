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
import { AllPaymentRecieptAction } from '../../redux/action/AllPaymentRecieptAction';


const PaymentReciept = () => {

    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultSecurity = useSelector(state => state.SecurityFilesReducers.securityfiledata);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
    
    const allpaymentreciept = useSelector(state => state.AllPaymentRecieptreducers.allpaymentreciept);
    const dispatch = useDispatch();

    const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

   
    const [DocumentType,setDocumentType]=useState('');
    const [search,setSearch]= useState('');
    const [PropertyType,setPropertyType]=useState('');
    const [DocumentReference,setDocumentReference]=useState('');
    const [DocumentStatus,setDocumentStatus]=useState('');
    const [Title,setTitle]=useState('');
    const [Description,setDescription]=useState('');
    

    useEffect(() => {
      dispatch(getDashCountData('all',''));
   },[]);

    useEffect(() => {
      dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',1,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description));
  },[]);

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',1,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description));
    }

    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>alert("Print Success")
    })

    console.log("result",result);

     const handlePageClick = (data) => {
    let currentPage = data.selected + 1
    dispatch(SecurityFilesAction(FiltersSecurity.length == 0 ? '':'all',currentPage,12,DocumentType,PropertyType,DocumentReference,DocumentStatus,Title,Description));
    
    }

    useEffect(() => {
      dispatch(AllPaymentRecieptAction(1,12));
    },[]);

    console.log("allpaymentreciept",allpaymentreciept);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payment Reciept</h2>
{/* <button onClick={handlePrint}>Print this out!</button> */}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
  {/* <h1>This is Testing Print</h1> */}
</div>
</div>
<div>
<NavLink to="/add-new-payment-reciept" className="btn btn-primary btn-rounded btn-sm">Add New Payment Reciept</NavLink>
</div>

</div>

    {/* <div class="row pb-3"> */}
{/* <div className="col-md-3">
<div className="form-group">
<label htmlFor="">Search Anything</label>
<input type="text" className="form-control" name="search" placeholder='Searching....' onChange={(e) => setSearch(e.target.value)}/>
</div>
</div> */}
{/* <div class="col-md-3">
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
  </div> */}

{/* <div class={`form-group col-md-3`}>
  <label for="inputPassword4">Released Name</label>
  <input type="text" class="form-control" name="releasedTo" placeholder="Released Name" autocomplete="off" onChange={e=>setReleasedTo(e.target.value)} value={ReleasedTo}/> 
  </div>

  <div class={`form-group col-md-3`}>
  <label for="inputPassword4">Released Date</label>
  <input type="date" class="form-control" name="releasedDate" placeholder="Released Date" autocomplete="off" onChange={e=>setReleasedDate(e.target.value)} value={ReleasedDate}/> 
  </div> */}


{/* <div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div> */}


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
          <th>Sales Consultant</th>
          <th>Project Name</th>
          <th>Company</th>
          <th>Client Name</th>
          <th>Plot No</th>
          <th>Block</th>
          <th>Size</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

allpaymentreciept.data == null ? (
  <>Loading.....</>
):(

  allpaymentreciept.data.length > 0 ? (
    allpaymentreciept.data.map((curElem , index) => {

return (
    <tr>
      <td>{curElem.emp_name}</td>
      <td>{curElem.project_name}</td>
      <td>{curElem.company_name}</td>
      <td>{curElem.clientName}</td>
      <td>{curElem.PropertyNo}</td>
      <td>{curElem.BlockName == '' || curElem.BlockName == null ? 'N/a' : curElem.BlockName}</td>
      <td>{curElem.Size}</td>
      <td>{curElem.TotalAmount}</td>
      <td><span className={`badge badge-${curElem.status == 0 ? 'danger' :'primary'}`}>{curElem.status == 0 ? 'Pending' : 'Approved'}</span></td>
      <td>
        {/* <NavLink to={`/payment-reciept/plan/${curElem.id}`} className='badge badge-secondary'>Generate Payment Plan</NavLink> */}
        </td>
    </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="10">No Record Found</td>  
    </tr>
  </>
  )

)

}
  </tbody>
</table>

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

export default PaymentReciept