import React from 'react'
import { useNavigate , NavLink } from 'react-router-dom';
import OtherNavigation from '../../../Includes/OtherNavigation';
import QuickNav from '../../../Includes/QuickNav';
import ContentWriterGraph from './ContentWriterGraph';
import ContentWriterLineGraph from './ContentWriterLineGraph';

const ContentwriterDashboard = () => {
  return (
    <>
<div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
<div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
<div>
<h2 className="hk-pg-title font-weight-600">Content Writer Dashboard</h2>
<p>Welcome to Customer Relationship Management for SellMore..</p>
</div>

<QuickNav />

</div>

<OtherNavigation/>


<section class="hk-sec-wrapper p-3">
<div class="col-md-12 col-xs-12 col-sm-12">
<form method="post" class="agent_form" enctype="multipart/form-data">
<div class="row">
 <div class="col-md-2">
<div class="form-group">
<label for="">Source</label>
<select name="agentNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div class="col-md-2">
<div class="form-group">
<label for="">Nature</label>
<select name="agentNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div class="col-md-2">
<div class="form-group">
<label for="">Consultant</label>
<select name="agentNmae" id="" class="form-control">
<option value="">Select All</option>

</select>
</div>
</div>
<div class="col-md-2">
<div class="form-group">
<label for="">Projects</label>
<select name="agentNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div class="col-md-2">
<div class="form-group">
<label for="">Date</label>
<input type="date" class="form-control" name="" /> </div>
</div>
<div class="col-md-2">
<div class="form-group" style={{marginTop:'23px'}}>
<button type="submit" style={{width:'100%'}} name="find" class="btn btn-primary mt-10">Search</button>
</div>
</div>
</div>
</form>
</div>
</section>


<div class="hk-row">
<div class="col-lg-3 col-sm-6 col-6">
<div class="card card-sm">
<div class="card-body">
<div class="align-items-center d-flex justify-content-between">
   <a href="list_assign_lead.php"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Total Keywords</span> </a>
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
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Today Word Counts</span> </div>
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
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">Publish Count Words</span> </div>
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
<div class="align-items-center d-flex justify-content-between"> <span class="d-block font-11 font-weight-500 text-dark text-uppercase mb-10">My Rating</span> </div>
<div class="d-flex align-items-end justify-content-between">
   <div> <span class="d-block">
<span class="display-5 font-weight-400 text-dark">0</span> </span>
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
<h6>Content Anylatics</h6>
<div class="d-flex align-items-center card-action-wrap">
   <div class="inline-block dropdown"> <a class="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i class="ion ion-ios-more"></i></a>
      <div class="dropdown-menu dropdown-menu-right" style={{willChange:'transform'}}> <a class="dropdown-item" href="#">Today</a> <a class="dropdown-item" href="#">Week</a> <a class="dropdown-item" href="#">Month</a>
         <div class="dropdown-divider"></div> <a class="dropdown-item" href="#">Year</a> </div>
   </div>
</div>
</div>
<div class="card-body">
   <ContentWriterGraph />
{/* <div id="cwpie" style={{height:'400px'}}></div> */}
</div>
</div>
</div>
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Content Anylatics Graph View</h6> </div>
<div class="card-body">
<ContentWriterLineGraph />
</div>
</div>
</div>
</div>

</div>
    
    </>
  )
}

export default ContentwriterDashboard