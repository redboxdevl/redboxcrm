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
import { VoucherTypeAction } from '../../../redux/action/VoucherTypeAction';
import moment from 'moment';


const VoucherTypeList = () => {

  const resultVoucherTypeList = useSelector(state => state.Vouchertypereducers.vouchertypesdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    dispatch(VoucherTypeAction(1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      dispatch(VoucherTypeAction(1,12));
  }


   const handlePageClick = (data) => {
  let currentPage = data.selected + 1
  dispatch(VoucherTypeAction(currentPage,12));
  
  }

return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Voucher Type List</h2>
</div>
<div>
<NavLink to="/add-new-voucher-type" className="btn btn-primary btn-rounded btn-sm">Add New Voucher Type</NavLink>
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
          <th>Type Title</th>
          <th>Code</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>

  {

resultVoucherTypeList.data == null ? (
  <>Loading.....</>
):(
  resultVoucherTypeList.data.length > 0 ? (
    resultVoucherTypeList.data.map((curElem , index) => {

return (
    <tr>
        <td >{curElem.typeTitle}</td>
        <td>{curElem.code}</td>
        <td>
        <NavLink to={`/add-new-voucher-type/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        </td>
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

export default VoucherTypeList