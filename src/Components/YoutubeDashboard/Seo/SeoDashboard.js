import React from 'react'
import { actionConfig } from '../../../configuration';
import ProjectWiseGraph from '../VideoGraphs/ProjectWiseGraph';

const SeoDashboard = ({data}) => {

    console.log(data);

  return (
    <>

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
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">{data.totalVideos}</span></span>

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
<span class="display-5 font-weight-400 text-dark"><span class="counter-anim">{data.todayVideos}</span></span>

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
<span class="display-5 font-weight-400 text-dark">{data.pendingVideos}</span>

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
<span class="display-5 font-weight-400 text-dark">{data.ApprovedVideos}</span>

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
{/* <div class="hk-legend-wrap mb-20">
<div class="hk-legend">
<span class="d-10 bg-primary rounded-circle d-inline-block"></span><span>Users</span>
</div>
<div class="hk-legend">
<span class="d-10 bg-neon-light-1 rounded-circle d-inline-block"></span><span>Sessions</span>
</div>
</div> */}
<ProjectWiseGraph projectGraph={data.ProjectWiseDataGraph}/>
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
    {
        data.FaceWiseDataGraph == null ? (
            <></>
        ):(

            data.FaceWiseDataGraph.map((faceItme,key) => {
                return (
                    <div class="col-3 mb-15">
                        <div class="w-100 h-70">
                            <img src={faceItme.profile_pic == '' ? `https://via.placeholder.com/150x150` : `${actionConfig.REACT_APP_MAIN}${faceItme.profile_pic}`} alt="user" class="img-fluid rounded w-100 h-100" />
                        </div>
                        <span class="d-block font-14 text-truncate pt-3">{faceItme.emp_name} <span class="badge badge-primary">{faceItme.total_count}</span></span>
                        
                    </div>
                )
            })

        )
        
    }
      
      
   </div> 
</div>
</div>
</div>

</div>


<div class="hk-row">
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Keywords Pending</h6>
</div>
<div class="card-body">
<div class="table-wrap">
<div class="table-responsive">
<table class="table table-sm table-hover mb-0">
<thead>
<tr>
   <th>Face</th>
   <th>Title</th>
   <th>Project</th>
   <th>Category</th>
   <th>Time</th>
   
</tr>
</thead>
<tbody>
<tr>
   <td colSpan={5}>No Record Found</td>
</tr>
{/* <tr>
   <td><img class="img-fluid rounded" src="FrontAsset/dist/img/logo1.jpg" alt="icon" /></td>
   <td class="text-primary">Site Update of Narkins Boutique Apartment</td>
   <td>Narkins</td>
   <td>Solo</td>
   <td>12:34 PM</td>
   
</tr> */}

</tbody>
</table>
</div>
</div>
</div>


</div>
</div>
<div class="col-lg-6">
<div class="card">
<div class="card-header card-header-action">
<h6>Keywords Wise</h6>
</div>
<div class="card-body">
<div class="row">
        <div class="col-md-4 form-group">
            <label for="firstName">Time</label>
            <select class="form-control custom-select d-block w-100" id="country">
                <option value="">Choose...</option>
                <option>United States</option>
            </select>
        </div>
        <div class="col-md-4 form-group">
            <label for="lastName">Project</label>
            <select class="form-control custom-select d-block w-100" id="country">
                <option value="">Choose...</option>
                <option>United States</option>
            </select>
        </div>
        <div class="col-md-4 form-group">
            <label for="lastName">Face Name</label>
            <select class="form-control custom-select d-block w-100" id="country">
                <option value="">Choose...</option>
                <option>United States</option>
            </select>
        </div>
    </div>
</div>
</div>
</div>

</div>

    </>
  )
}

export default SeoDashboard