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
import { DimensionLevel3Action } from '../../../../redux/action/DimensionLevel3Action';
import moment from 'moment';
import Swal from 'sweetalert2';


const ListDimensionLevel3 = () => {

  const navigate = useNavigate();

  const resultChartlevel3 = useSelector(state => state.Dimensionlevel3reducers.dimensionlevel3data);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  const [DimensionLevelResult,setDimensionLevelResult]= useState([]);
  const [ChartofAccLevel2Result,setChartofAccLevel2Result]=useState([]);

  const [Level1Id,setLevel1Id]=useState('');
  const [Level2Id,setLevel2Id]=useState('');

  useEffect(() => {
    dispatch(DimensionLevel3Action(1,12,Level1Id,Level2Id));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(DimensionLevel3Action(1,12,Level1Id,Level2Id));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(DimensionLevel3Action(currentPage,12,Level1Id,Level2Id));
  
  }

  const DeleteLevel3 = (id) => {

    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}chartofaccountlevel3/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {
        console.log("dataex",dataex);
        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(DimensionLevel3Action(1,12,Level1Id,Level2Id));
          navigate("/dimension-code-level-3");
           
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

  const ListChartOfAccountLevel2 = async (Level1Id) => {

    if(Level1Id == null || Level1Id == ''){
      setChartofAccLevel2Result('');
    }else{
      const response = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevelitems/${Level1Id}`);
      const dataxs = await response.json();
      const GetArray = dataxs.data;
      setChartofAccLevel2Result(await GetArray);
    }
    
  }

  const ListDimensionLevel1 = async () => {
    const response = await fetch(`${actionConfig.REACT_APP_URL}dimensionlevelitems`);
    const dataxs = await response.json();
    const GetArray = dataxs.data;
    setDimensionLevelResult(await GetArray);
  }

  useEffect(() => {

    if(Level1Id == null){
      setChartofAccLevel2Result('');
    }
    ListChartOfAccountLevel2(Level1Id);
  },[Level1Id == null ? '' : Level1Id]);

  useEffect(() => {
    ListDimensionLevel1();
  },[]);


return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">List Dimension Level 3</h2>
</div>
<div>
<NavLink to="/add-dimension-level-3" className="btn btn-primary btn-rounded btn-sm">Add New Dimension Level 3</NavLink>
</div>

</div>


<OtherNavigation/>

<div class="row pb-3">

<div className="form-group col-md-3">
  <label htmlFor="">Level 1*</label>
  <select name="Level1Id" id="" className="form-control" onChange={e=>setLevel1Id(e.target.value)} value={Level1Id}>
    <option value="">Select Level 1</option>
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

<div className="form-group col-md-3">
  <label htmlFor="">Level 2*</label>
  <select name="Level2Id" id="" className="form-control" onChange={e=>setLevel2Id(e.target.value)} value={Level2Id}>
    <option value="">Select Level 2</option>
    {

ChartofAccLevel2Result.length > 0 ? (

  ChartofAccLevel2Result.map((curElem) => {

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
          <th>Level 3 Code</th>
          <th>Level 3 Description</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {

resultChartlevel3.data == null ? (
  <>Loading.....</>
):(

  resultChartlevel3.data.length > 0 ? (
    resultChartlevel3.data.map((curElem , index) => {

return (
  <tr>
    <td>{curElem.level1Codes}</td>
    <td>{curElem.getLevel1 == null || curElem.getLevel1 == '' ? '' : curElem.getLevel1.Description}</td>
    <td>{curElem.level1Codes}-{curElem.level2Codes}</td>
    <td>{curElem.getLevel2 == null || curElem.getLevel2 == '' ? '' : curElem.getLevel2.Description}</td>
    <td>{curElem.level1Codes}-{curElem.level2Codes}-{curElem.Code}</td>
    <td>{curElem.Description}</td>
    <td><span className={`badge badge-primary`}>Pending</span></td>
    <td><NavLink to={`/add-dimension-level-3/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">Update</button></NavLink> <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeleteLevel3(curElem.id)}>Delete</button></td>
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
pageCount={Math.ceil(resultChartlevel3.TotalCount/12)}
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

export default ListDimensionLevel3