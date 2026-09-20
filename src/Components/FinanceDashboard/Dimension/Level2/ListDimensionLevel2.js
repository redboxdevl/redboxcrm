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
import { DimensionLevel2Action } from '../../../../redux/action/DimensionLevel2Action';
import moment from 'moment';
import Swal from 'sweetalert2';


const ListDimensionLevel2 = () => {

  const navigate = useNavigate();

  const resultChartlevel2 = useSelector(state => state.Dimensionlevel2reducers.dimensionlevel2data);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [DimensionLevelResult,setDimensionLevelResult]= useState([]);
  
  const [Level1Code,setLevel1Code]=useState('');

  useEffect(() => {
    dispatch(DimensionLevel2Action(1,12,Level1Code));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(DimensionLevel2Action(1,12,Level1Code));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(DimensionLevel2Action(currentPage,12,Level1Code));
  
  }

  const DeleteLevel2 = (id) => {

    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}dimesionlevel2/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(DimensionLevel2Action(1,12,Level1Code));
          navigate("/dimension-code-level-2");
           
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

  
  const ListDimensionLevel1 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevelitems`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDimensionLevelResult(await GetArray);
  }

  useEffect(() => {
    ListDimensionLevel1();
  },[]);

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">List Dimension Level 2</h2>
</div>
<div>
<NavLink to="/add-dimension-level-2" className="btn btn-primary btn-rounded btn-sm">Add New Dimension Level 2</NavLink>
</div>

</div>


<OtherNavigation/>

<div class="row pb-3">

<div className="form-group col-md-3">
<label htmlFor="">Level 1 Code*</label>
<select name="Level1Code" id="" className="form-control" onChange={e=>setLevel1Code(e.target.value)} value={Level1Code} >
  <option value="">Select Level 1 Code</option>
  {

DimensionLevelResult.length > 0 ? (

DimensionLevelResult.map((curElem) => {

  return (
  <option value={curElem.id}>{curElem.Code}-{curElem.Description}</option>
  )

  })
  ): (
  <>
  <option><b>No Data Found</b></option>
  </>
  )


  }
</select>
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
          <th>Level 1 Code</th>
          <th>Level 1 Description</th>
          <th>Level 2 Code</th>
          <th>Level 2 Description</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultChartlevel2.data == null ? (
  <>Loading.....</>
):(

  resultChartlevel2.data.length > 0 ? (
    resultChartlevel2.data.map((curElem , index) => {

return (
  <tr>
    <td>{curElem.level11Code}</td>
    <td>{curElem.getLevel1 == null || curElem.getLevel1 == '' ? '' : curElem.getLevel1.Description}</td>
    <td>{curElem.level11Code}-{curElem.Code}</td>
    <td>{curElem.Description}</td>
    <td><span className={`badge badge-primary`}>Pending</span></td>
    <td><NavLink to={`/add-dimension-level-2/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink> <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteLevel2(curElem.id)}>Delete</button></td>
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
pageCount={Math.ceil(resultChartlevel2.TotalCount/12)}
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

export default ListDimensionLevel2