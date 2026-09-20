import React from 'react'
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';


const GraphicDashboard = () => {
return (
<>

<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Graphic Designer Dashboard</h2>
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
<a href="list_assign_lead.php">
<span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Total Videos</span>                    </a>


</div>
<div class="d-flex align-items-center justify-content-between position-relative">
<div>
<span class="d-block">
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">0</span></span>

</span>
</div>
<div class="position-absolute r-0">
<span id="sparkline_1" class="d-flex easy-pie-chart" data-percent="86"><canvas width="100" height="50" style={{display:"inline-block",width:'100px', height:'50px',verticalAlign:'top'}}></canvas></span>
</div>
</div>

</div>


</div>

</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between">
<span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Today Videos</span>

</div>
<div class="d-flex align-items-center justify-content-between position-relative">
<div>
<span class="d-block">
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">0</span></span>

</span>
</div>
<div class="position-absolute r-0">
<span id="sparkline_2" class="d-flex easy-pie-chart" data-percent="86"><canvas width="115" height="50" style={{display:"inline-block",width:'115px', height:'50px',verticalAlign:'top'}}></canvas></span>
</div>
</div>
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between">
<span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Pending Videos</span>

</div>
<div class="d-flex align-items-end justify-content-between">
<div>
<span class="d-block">
<span class="display-5 font-weight-400 text-dark">0</span>

</span>
</div>
<div>
<span class="text-success font-12 font-weight-600">+0%</span>
</div>
</div>
</div>
</div>
</div>
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between">
<span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Done Videos</span>

</div>
<div class="d-flex align-items-end justify-content-between">
<div>
<span class="d-block">
<span class="display-5 font-weight-400 text-dark">0</span>

</span>
</div>
<div>
<span class="text-danger font-12 font-weight-600">0%</span>
</div>
</div>
</div>
</div>
</div>

</div>

<div class="hk-row">
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Project wise videos</h6>
<div class="d-flex align-items-center card-action-wrap">
<div class="inline-block dropdown">
<a class="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="ion ion-ios-more"></i></a>
<div class="dropdown-menu dropdown-menu-right" style={{willChange:'transform'}}>
<a class="dropdown-item" href="#">Today</a>
<a class="dropdown-item" href="#">Week</a>
<a class="dropdown-item" href="#">Month</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item" href="#">Year</a>
</div>
</div>
</div>
</div>
<div class="card-body">
<div class="hk-legend-wrap mb-20">
{/* <div class="hk-legend">
<span class="d-10 bg-primary rounded-circle d-inline-block"></span><span>Users</span>
</div>
<div class="hk-legend">
<span class="d-10 bg-neon-light-1 rounded-circle d-inline-block"></span><span>Sessions</span>
</div> */}
</div>
{/* <div id="e_chart_6" class="echart" style={{height:'311px'}}></div> */}
</div>


</div>
</div>
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>face wise videos</h6>
</div>
<div class="card-body">
<div class="hk-row text-center">
<div class="col-3 mb-15">
<div class="w-100">
<img src="FrontAsset/dist/img/avatar1.jpg" alt="user" class="img-fluid rounded" />
</div>
<span class="d-block font-14 text-truncate">Rafay Siddqui</span>
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

export default GraphicDashboard