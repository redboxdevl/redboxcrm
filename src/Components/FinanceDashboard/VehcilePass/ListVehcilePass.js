import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import { actionConfig } from '../../../configuration';
import Moment from 'react-moment';
import { useReactToPrint } from 'react-to-print';
import ReactPaginate from 'react-paginate';
import { SalesFormAction } from '../../../redux/action/SalesFormAction';
import { PettyCashAction } from '../../../redux/action/PettyCashAction';
import moment from 'moment';
import Swal from 'sweetalert2';

const ListVehcilePass = () => {

  const navigate = useNavigate();
  
  const resultPettyCashdata = useSelector(state => state.PettyCashreducers.pettycashdata);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const dispatch = useDispatch();

  const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');

  const FiltersSecurity = resultRolePermssion === '' ? '' : resultRolePermssion.filter(edx => edx.feature_id === 150 && edx.sub_features === 'Report');

  
  useEffect(() => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    dispatch(PettyCashAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12));
},[]);

  const handleSearch = async (e) => {
      e.preventDefault();
      const AuthData = JSON.parse(localStorage.getItem('authdata'));
      dispatch(PettyCashAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12));
  }


   const handlePageClick = (data) => {
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
  let currentPage = data.selected + 1
  dispatch(PettyCashAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',currentPage,12));
  
  }

  const DeletePettyCash = (id) =>{
    const AuthData = JSON.parse(localStorage.getItem('authdata'));
    if (window.confirm("Do You Want to Delete this Record?")){

      fetch(`${actionConfig.REACT_APP_URL}pettycash/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(dataex => {

        if(dataex.code == '200'){
          Swal.fire(
            'Good job!',
            dataex.message,
            'success'
          );
          dispatch(PettyCashAction(FinanceMode == '' || FinanceMode == null ?  AuthData.id : 'all',1,12));
          navigate("/petty-cash-list");
           
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
<h2 className="hk-pg-title font-weight-600">Vehcile Pass List</h2>
</div>
<div>
<NavLink to="/add-new-vehcile-pass" className="btn btn-primary btn-rounded btn-sm">Add New Vehcile Pass</NavLink>
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
<thead className='thead-dark'>
      <tr>
          <th><b>Date</b></th>
          <th><b>Department</b></th>
          <th><b>Vehcile No</b></th>
          <th><b>Driver Name</b></th>
          <th><b>Meter Reading</b></th>
          <th><b>Time In</b></th>
          <th><b>Distance Convered</b></th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
  {/* {

resultPettyCashdata.data == null ? (
  <>Loading.....</>
):(

  resultPettyCashdata.data.length > 0 ? (
    resultPettyCashdata.data.map((curElem , index) => {
return (
  <tr>
    <td>{curElem.emp_name}</td>
    <td>{curElem.referenceId}</td>
    <td>{curElem.CashAmountFormat}</td>
    <td>{curElem.sumAmountFormat}</td>
    <td>{curElem.balanceAmountFormat}</td>
    <td width={300}>
        <NavLink to={`/print-petty-cash/${curElem.id}`}><button className="btn btn-secondary btn-sm btn-rounded">View Petty Cash</button></NavLink>
        <NavLink to={`/add-new-petty-cash/${curElem.id}`}><button className="btn btn-primary btn-sm btn-rounded">{FiltersSecurity.length == 0 ? 'View' : 'Update'}</button></NavLink>
        <button className="btn btn-danger btn-sm btn-rounded" type="button" onClick={() => DeletePettyCash(curElem.id)}>Delete</button>
        </td>
  </tr>
  )
  

})

): (
  <>
  <tr>
        <td colspan="5">No Record Found</td>  
    </tr>
  </>
  )

)

} */}
  </tbody>
</table>


{/* <ReactPaginate 
previousLabel={`previous`}
nextLabel={`next`}
breakLabel={`...`}
pageCount={Math.ceil(resultPettyCashdata.TotalCount/12)}
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
/> */}

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

export default ListVehcilePass