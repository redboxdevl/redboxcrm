import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { PaymentPlanAction } from '../../redux/action/PaymentPlanAction';
import { actionConfig } from '../../configuration';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';


const PaymentPlan = () => {

    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultPaymentPlan = useSelector(state => state.PaymentPlanreducers.paymentplandata);
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
    

    useEffect(() => {
      dispatch(getDashCountData('all',''));
   },[]);

    useEffect(() => {
      dispatch(PaymentPlanAction(1,12));
  },[]);

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(PaymentPlanAction(1,12));
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
    dispatch(PaymentPlanAction(currentPage,12));
    
    }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Payment Plan</h2>
{/* <button onClick={handlePrint}>Print this out!</button> */}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
  {/* <h1>This is Testing Print</h1> */}
</div>
</div>
<div>
<NavLink to="/add-new-payment-plan" className="btn btn-primary btn-rounded btn-sm">Add New Payment Plan</NavLink>
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
          <th>Booking Date</th>
          <th>Client Name</th>
          <th>Plot No</th>
          <th>Size</th>
          <th>Category</th>
          <th>Block</th>
          <th>Project Name</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultPaymentPlan.data == null ? (
  <>Loading.....</>
):(

  resultPaymentPlan.data.length > 0 ? (
    resultPaymentPlan.data.map((curElem , index) => {

return (
    <tr>
      <td>{curElem.bookingDate}</td>
      <td>{curElem.clientName}</td>
      <td>{curElem.PropertyNo}</td>
      <td>{curElem.Size}</td>
      <td>{curElem.Category}</td>
      <td>{curElem.BlockName}</td>
      <td>{curElem.project_name}</td>
      <td>
        <NavLink to={`/payment-statement/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">View Plan Statement</button></NavLink></td>
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

export default PaymentPlan