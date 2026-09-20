import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { AssetListAction } from '../../../redux/action/AssetListAction';
import { ChequeBookListAction } from '../../../redux/action/ChequeBookListAction';
import { DimensionLevel1Action } from '../../../redux/action/DimensionLevel1Action';
import { GemerateMappingAction } from '../../../redux/action/GemerateMappingAction';
import moment from 'moment';
import Swal from 'sweetalert2';


const Generatemapping = () => {

  const navigate = useNavigate();

  const resultgeneratemappingdata = useSelector(state => state.Generatemappingreducers.generatemappingdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    dispatch(GemerateMappingAction(1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(GemerateMappingAction(1,12));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(GemerateMappingAction(currentPage,12));
  }

  const DeleteMapping = (id) => {

    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}generatemapping/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(GemerateMappingAction(1,12));
          navigate("/generate-mapping");
           
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
<h2 className="hk-pg-title font-weight-600">Generate Mapping</h2>
</div>
<div>
<NavLink to="/add-generate-mapping" className="btn btn-primary btn-rounded btn-sm">Add Generate Mapping</NavLink>
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
          <th>Level 3 Code</th>
          <th>Level 3 Description</th>
          <th>Dimension Level 2</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>

  {

resultgeneratemappingdata.data == null ? (
  <>Loading.....</>
):(

  resultgeneratemappingdata.data.length > 0 ? (
    resultgeneratemappingdata.data.map((curElem , index) => {

return (
  <tr>
    <td>{curElem.getLevel3 == null || curElem.getLevel3 == '' ? '' : curElem.getLevel3.Code}</td>
    <td>{curElem.getLevel3 == null || curElem.getLevel3 == '' ? '' : curElem.getLevel3.Description}</td>
    <td>
      {
       curElem.dimensionL2D == '' || curElem.dimensionL2D == null || curElem.dimensionL2D.length == 0 ? '' : curElem.dimensionL2D.map((item,key) => {
          return (
            <><li>{item.label}</li></>
          )
        })
      }
    </td>
    <td><span className={`badge badge-primary`}>Pending</span></td>
    <td><NavLink to={`/add-generate-mapping/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink> <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteMapping(curElem.id)}>Delete</button></td>
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
pageCount={Math.ceil(resultgeneratemappingdata.TotalCount/12)}
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

export default Generatemapping