import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux";
import AffiliateNav from '../../../Includes/AffiliateNav';
import { NavLink } from "react-router-dom";
import { FaPenSquare , FaTrash , FaFileImport } from "react-icons/fa";
import { InventoriesAction } from '../../../redux/action/InventoriesAction';
import Swal from 'sweetalert2';
import { actionConfig } from '../../../configuration';

const InventoriesAffiliates = () => {

  const resultInventories = useSelector(state => state.inventoriesreducer.inventoriesdata);
  const dispatch = useDispatch();

    useEffect(() => {

      dispatch(InventoriesAction());

      const interval = setInterval(() => {
        
      }, 3000);
        return () => clearInterval(interval);
  },[]);

  console.log("resultInventories",resultInventories);

const countInv  = resultInventories.length;

const handleRemove = (id) => {
  
  const FeildData = {proid:id}

  const requestOptions = {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(FeildData)
  };
  fetch(`${actionConfig.REACT_APP_URL}project/${id}`, requestOptions)
  .then(response => response.json())
  .then(dataex => {
    if(dataex.code == '200'){
      Swal.fire(
        'Good job!',
        dataex.message,
        'success'
        );
    }else{
      Swal.fire(
        'Error!',
        dataex.message,
        'error'
        );
    }

  });

  }


  
  return (
    <>
<AffiliateNav />
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3">
<div>
<h2 className="hk-pg-title font-weight-600">Inventories</h2>
</div>
</div>

<div className="hk-row">
{
 
 resultInventories.length == '0' ? '' : resultInventories.data.map((curElem,index) => {
  return (
  
    <div className="col-lg-3 col-sm-6 col-6" key={index}>
  <div className="card card-sm h-80">
  <div className="card-body ">
  <div className="align-items-center d-flex justify-content-between">
    
  <NavLink to={`/affiliates/list-inventories/${curElem.id}`}>
  <span className="d-block font-11 font-weight-500 text-dark text-uppercase mb-0">{curElem.project_name}</span>
  </NavLink>
  {/* <div className="inline-block dropdown">
  <a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more font-20"/></a>
  <div className="dropdown-menu dropdown-menu-right">
  <NavLink className="dropdown-item" to={`/add-projects/${curElem.id}`}><FaPenSquare /> Edit</NavLink>
  <NavLink className="dropdown-item" to="#" onClick={()=>{handleRemove(curElem.id)}}><FaTrash /> Delete</NavLink>
  <NavLink className="dropdown-item" to={`/list-inventories/${curElem.id}`}><FaFileImport /> Import</NavLink>
  </div>
  </div> */}
  </div>
  <div className="align-items-center d-flex justify-content-between">
  <div>
  <span className="d-block">
  <span className="display-5 font-weight-400 text-dark">{curElem.totalInventories}</span>
  <small>Total</small>
  </span>
  </div>
  <img className="w-120p" src={curElem.project_asset_path == '' ? '' : `${actionConfig.REACT_APP_MAIN}${curElem.project_asset_path}`} alt="icon" />
  
  </div>
  </div>
  </div>
  </div>
  
  )
  
  })

}

</div>

</div>
    </>
  )
}

export default InventoriesAffiliates