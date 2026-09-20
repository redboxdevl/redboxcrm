import React from 'react'
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../Includes/OtherNavigation'
import QuickNav from '../../Includes/QuickNav';

const OperationDashboard = () => {
return (
<>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Operation Dashboard</h2>
<p>Welcome to Customer Relationship Management for SellMore..</p>
</div>

<QuickNav />

</div>

<OtherNavigation/>

<div class="hk-row">
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between">
<span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Total Files</span> 
</div>
<div class="d-flex align-items-center justify-content-between position-relative">
<div> <span class="d-block">
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">0</span></span>
</span>
</div>
</div>
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Inprocess Files</span> </div>
<div class="d-flex align-items-center justify-content-between position-relative">
<div> <span class="d-block">
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">0</span></span>
</span>
</div>
</div>
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Deliverd Files</span> </div>
<div class="d-flex align-items-end justify-content-between">
<div> <span class="d-block">
<span class="display-5 font-weight-400 text-dark">0</span> </span>
</div>
<div> </div>
</div>
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Pending Fils</span> </div>
<div class="d-flex align-items-end justify-content-between">
<div> <span class="d-block">
<span class="display-5 font-weight-400 text-danger">0</span> </span>
</div>
<div> </div>
</div>
</div>
</div>
</div>
</div>
<div class="hk-row">
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Files Status</h6>
<div class="d-flex align-items-center card-action-wrap">
<div class="inline-block dropdown"> <a class="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="ion ion-ios-more"></i></a>
<div class="dropdown-menu dropdown-menu-right" > <a class="dropdown-item" href="#">Week</a> <a class="dropdown-item" href="#">Month</a>
<div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Year</a> </div>
</div>
</div>
</div>
<div class="card-body">
<div id="attpie" style={{height:'400px'}}></div>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Files Status Graph View</h6> 
<div class="d-flex align-items-center card-action-wrap">
<div class="inline-block dropdown"> <a class="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="ion ion-ios-more"></i></a>
<div class="dropdown-menu dropdown-menu-right"> <a class="dropdown-item" href="#">Week</a> <a class="dropdown-item" href="#">Month</a>
<div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Year</a> </div>
</div>
</div>
</div>
<div class="card-body">
<div id="attgraph" style={{height:'400px'}}></div>
</div>
</div>
</div>
</div>
<div class="hk-row">
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Pending Client</h6>

</div>
<div class="card-body">
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<div class="table-responsive">
<table class="table table-hover table-bordered mb-0">
  <thead>
      <tr>
          <th>Client Name</th>
          <th>Plot No</th>
          <th>Project</th>
          <th>Pending Reason</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
    <tr>
        <td colspan="3">No Record Found</td>  
    </tr>
      {/* <tr>
          <td>Abdul Sami Khan</td>
          <td>R-123</td>
          <td>Marwa Hills View</td>
          <td><span class="badge badge-sm btn-primary">CNIC</span> <span class="badge badge-sm btn-primary">Pictures</span></td>
          <td>
              <button class="btn btn-primary btn-sm">Notify</button>
          </td>
      </tr> */}
  </tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Delaverd File</h6> </div>
<div class="card-body">
<div class="row">
<div class="col-sm">
<div class="table-wrap">
<div class="table-responsive">
<table class="table table-hover table-bordered mb-0">
  <thead>
      <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>
    <tr>
        <td colspan="3">No Record Found</td>  
    </tr>
      {/* <tr>
            <td class="align-items-center d-flex"><img  src="FrontAsset/dist/img/avatar1.jpg" alt="user" class="avatar-img w-45p mr-10 rounded-circle" />Abdul Sami Khan</td>
          <td>10-March-2022</td>
          <td>
              <button class="btn btn-primary btn-sm">Thank U</button>
          </td>
      </tr> */}
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

export default OperationDashboard