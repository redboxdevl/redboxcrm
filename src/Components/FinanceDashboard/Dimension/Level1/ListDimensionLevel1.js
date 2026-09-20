import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../../Includes/OtherNavigation';
import { actionConfig } from '../../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { AssetListAction } from '../../../../redux/action/AssetListAction';
import { ChequeBookListAction } from '../../../../redux/action/ChequeBookListAction';
import { DimensionLevel1Action } from '../../../../redux/action/DimensionLevel1Action';
import moment from 'moment';
import Swal from 'sweetalert2';


const ListDimensionLevel1 = () => {

  const navigate = useNavigate();

  const resultChartlevel1 = useSelector(state => state.Dimensionlevelreducers.dimensionlevel1data);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    dispatch(DimensionLevel1Action(1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(DimensionLevel1Action(1,12));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(DimensionLevel1Action(currentPage,12));
  }

  const DeleteLevel1 = (id) => {

    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}dimensionlevel1/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(DimensionLevel1Action(1,12));
          navigate("/dimension-code-level-1");
           
        }else{
          Swal.fire(
            'Error!',
            dataex.message,
            'error'
          );
        }
        
      });

    }else{

    }

      
    
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">List Dimension Level 1</h2>
</div>
<div>
<NavLink to="/add-dimension-level-1" className="btn btn-primary btn-rounded btn-sm">Add New Dimension Level 1</NavLink>
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
          <th>Level 1 Code</th>
          <th>Level 1 Description</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultChartlevel1.data == null ? (
  <>Loading.....</>
):(

  resultChartlevel1.data.length > 0 ? (
    resultChartlevel1.data.map((curElem , index) => {

return (
  <tr>
    <td>{curElem.Code}</td>
    <td>{curElem.Description}</td>
    <td><span className={`badge badge-primary`}>Pending</span></td>
    <td><NavLink to={`/add-dimension-level-1/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink> <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteLevel1(curElem.id)}>Delete</button></td>
  </tr>

)
  

})

): (
  <>
  <tr>
        <td colspan="13">No Record Found</td>  
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
pageCount={Math.ceil(resultChartlevel1.TotalCount/12)}
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

export default ListDimensionLevel1