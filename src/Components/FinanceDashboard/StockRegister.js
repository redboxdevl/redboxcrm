import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';
import { StockRegAction } from '../../redux/action/StockRegAction';
import { actionConfig } from '../../configuration';
import { getDashCountData } from '../../redux/action/DashboardCountAction';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';


const StockRegister = () => {

    const result = useSelector(state => state.dashCountReducer.dashboardcount);
    const resultStock = useSelector(state => state.Stockregreducers.stocklistdata);
    const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
    const dispatch = useDispatch();

    const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

   
    const [DocumentType,setDocumentType]=useState('');
    const [search,setSearch]= useState('');
    const [PropertyType,setPropertyType]=useState('');
    const [DocumentReference,setDocumentReference]=useState('');
    const [DocumentStatus,setDocumentStatus]=useState('');
    const [ReleasedTo,setReleasedTo]=useState('');
    const [ReleasedDate,setReleasedDate]=useState('');
    
    const [StockNatureId,setStockNatureId]=useState('');
    const [ProjectId,setProjectId]=useState('');
    const [StockTypeId,setStockTypeId]=useState('');

    const [ProjectResult,setProjectResult]= useState([]);

    const Listproject = async () => {
      const response = await fetch(`${actionConfig.REACT_APP_URL}project`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setProjectResult(await GetArray);
    }

    useEffect(() => {
      Listproject();
      dispatch(getDashCountData('all',''));
   },[]);

    useEffect(() => {
      dispatch(StockRegAction(FiltersSecurity.length == 0 ? '':'all',1,12,StockNatureId,ProjectId,StockTypeId));
  },[]);

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(StockRegAction(FiltersSecurity.length == 0 ? '':'all',1,12,StockNatureId,ProjectId,StockTypeId));
    }

    const handlePageClick = (data) => {
      let currentPage = data.selected + 1
      dispatch(StockRegAction(FiltersSecurity.length == 0 ? '':'all',currentPage,12,StockNatureId,ProjectId,StockTypeId));
    }

    
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
      content:() => componentRef.current,
      documentTitle:'testprint',
      onAfterPrint:()=>alert("Print Success")
    })

    console.log("result",result);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Stock List</h2>
{/* <button onClick={handlePrint}>Print this out!</button> */}

<div ref={componentRef} style={{width:'100%',height:'auto'}}>
  {/* <h1>This is Testing Print</h1> */}
</div>
</div>
<div>
<NavLink to="/stock-inword-register" className="btn btn-danger btn-rounded btn-sm">Stock In</NavLink>
<NavLink to="/stock-outword-register" className="btn btn-primary btn-rounded btn-sm">Stock Out</NavLink>
<NavLink to="/stock-cancel-register" className="btn btn-warning btn-rounded btn-sm text-dark">Stock Cancel</NavLink>
<NavLink to="/stock-reports" className="btn btn-dark btn-rounded btn-sm text-white">Stock Reports</NavLink>
</div>

</div>



<OtherNavigation/>

<div class="row pb-3">
<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Stock Type</label>
<select name="StockTypeId" id="" className="form-control" onChange={e=>setStockTypeId(e.target.value)} value={StockTypeId}>
  <option value="">Select Stock Type</option>
  {
result.code == 'ERR_NETWORK' || result.code == 'ERR_BAD_REQUEST' || result.length == 0 ? (
  <></>
):(
    result.stockType.length > 0 ? (
      result.stockType.map((curElem,index) => {
    return (
      <option value={curElem.id}>{curElem.typeName}</option>
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

<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Stock Nature</label>
<select name="StockNatureId" id="" className="form-control" onChange={e=>setStockNatureId(e.target.value)} value={StockNatureId}>
   <option value="">Select Stock Nature</option>
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

<div className="col-md-3">
<div className="form-group">
<label htmlFor="">Projects</label>
<select name="ProjectId" id="" className="form-control" onChange={e=>setProjectId(e.target.value)} value={ProjectId}>
<option value="">Select Projects</option>
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


<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" name="find" class="btn btn-primary" style={{width:'100%'}} onClick={handleSearch}>Search</button>
</div>
</div>
</div>

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
          <th>Projects</th>
          <th>Type</th>
          <th>Nature</th>
          <th>Total Qty</th>
          <th>Qty Out</th>
          <th>Qty Cancel</th>
          <th>Balance Qty</th>
      </tr>
  </thead>
  <tbody>
  {

resultStock.data == null ? (
  <>Loading.....</>
):(

    resultStock.data.length > 0 ? (
        resultStock.data.map((curElem , index) => {

return (
    <tr>
        <td>{curElem.project_name}</td>
        <td>{curElem.typeName}</td>
        <td>{curElem.natureTitle}</td>
        <td>{curElem.quantityIn}</td>
        <td>0</td>
        <td>0</td>
        <td>{curElem.remainingQty}</td>
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

<ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultStock.TotalCount/12)}
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

export default StockRegister