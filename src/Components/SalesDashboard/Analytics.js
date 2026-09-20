import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import QuickNav from '../../Includes/QuickNav';
import OtherNavigation from '../../Includes/OtherNavigation';
import VirginGraphs from './DashboardGraphs/VirginGraphs';
import CallingStatusGraph from './DashboardGraphs/CallingStatusGraph';
import LeadPieChart from './DashboardGraphs/LeadPieChart';
import LeadLineGraph from './DashboardGraphs/LeadLineGraph';
import TransferSharePie from './DashboardGraphs/TransferSharePie';
import ShareTransferLine from './DashboardGraphs/ShareTransferLine';
import YoutubePieGraph from './DashboardGraphs/YoutubePieGraph';
import YoutubeLineChart from './DashboardGraphs/YoutubeLineChart';
import { AnalyticsActions } from '../../redux/action/AnalyticsActions';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {

  const result = useSelector(state => state.dashCountReducer.dashboardcount);
  const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);
  const resultAnalytics = useSelector(state => state.Analyticsreducers.analyticsdata);

  const DashboardGraphs = result.ubtabbedGraphDashboard;


  const DashboardGraphsCalling = result.GraphCallingZOng;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AuthDataxs = JSON.parse(localStorage.getItem('authdata'));

  const SuperCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 3 || edx.role_id == 4);
  const AssignExport = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 50 && edx.sub_features == 'Export');

  useEffect(() => {
  const AuthData = JSON.parse(localStorage.getItem('authdata'));
  if(SuperCon.length == 0){
  dispatch(AnalyticsActions(AuthData.id == null ? '' : AuthData.id,1,12));
  }else{
  dispatch(AnalyticsActions('all',1,12));
  }
  },[]);
  
  useEffect(() => {
    if(!localStorage.getItem('authdata')){
      navigate('/');
    }
  },[]);

  console.log("resultAnalytics",resultAnalytics);

  return (
    <>

    <div className="container-fluid mt-xl-50 mt-sm-30 mt-15 pt-4">
    <div className="hk-pg-header pt-4 pb-4 mt-2 mb-3 d-flex justify-content-between">
        <div>
            <h2 className="hk-pg-title font-weight-600">Analytics Dashboard</h2>
            <p>Welcome to Customer Relationship Management for SellMore..</p>
        </div>

        <QuickNav />

    </div>

    <OtherNavigation/>

    <div className="hk-row">
<div className="col-lg-6">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>
<div className="card-header card-header-action">
<h6>Vigrin Leads</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-radio-button-off"/>
</a>
<div className="inline-block dropdown">
<a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more"/></a>
<div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#">Action</a>
</div>
</div>
</div>
</div>
<div className="card-body p-0">
  <VirginGraphs dataGraph={DashboardGraphs} />
</div>
</div>
</div>
<div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Calling Status</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-arrow-down"></i>
</a>
<a href="#" className="inline-block full-screen mr-15">
<i className="ion ion-md-expand"></i>
</a>
<a className="inline-block card-close" href="#" data-effect="fadeOut">
<i className="ion ion-md-close"></i>
</a>
</div>
</div>
<div className="card-body">
<CallingStatusGraph dataCalling={DashboardGraphsCalling}/>
</div>
</div>
</div>
</div>


{/* <div className="row pt-3 pb-3">
<div className="col-md-2">
<div className="form-group">
<label for="">Source</label>
<select name="ConsultantNmae" id="" className="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div className="col-md-2">
<div className="form-group">
<label for="">Nature</label>
<select name="ConsultantNmae" id="" className="form-control">
<option value="">Select All</option>
<option value="11">Old</option>
<option value="17">Fresh</option>
</select>
</div>
</div>
<div className="col-md-2">
<div className="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" className="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div className="col-md-2">
<div className="form-group">
<label for="">Projects</label>
<select name="ConsultantNmae" id="" className="form-control">
<option value="">Select All</option>
</select>
</div>
</div>
<div className="col-md-2">
<div className="form-group">
<label for="">Date</label>
  <select className="form-control">
    <option value="">1 Week</option>
    <option value="17">15 Days</option>
    <option value="17">1 Month</option>
    <option value="17">3 Months</option>
    <option value="17">6 Months</option>
    <option value="17">1 Year</option>
    <option value="17">Life Time</option>
        </select>  
    </div>
</div>
<div className="col-md-2">
<div className="form-group" style={{marginTop:'33px'}} >
<button type="submit" style={{width:'100%'}} name="find" className="btn btn-primary">Search</button>
</div>
</div>

</div> */}

<div className="hk-row">
<div className="col-lg-6">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>
<div className="card-header card-header-action">
<h6>Leads Pie</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-radio-button-off"/>
</a>
<div className="inline-block dropdown">
<a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more"/></a>
<div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#">Action</a>
</div>
</div>
</div>
</div>
<div className="card-body p-0">
  <LeadPieChart data={resultAnalytics == '' || resultAnalytics == null || resultAnalytics == undefined || resultRolePermssion.length == 0 ? '' : resultAnalytics.data.leadPie}/>
</div>
</div>
</div>
<div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Leads Graph</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-arrow-down"></i>
</a>
<a href="#" className="inline-block full-screen mr-15">
<i className="ion ion-md-expand"></i>
</a>
<a className="inline-block card-close" href="#" data-effect="fadeOut">
<i className="ion ion-md-close"></i>
</a>
</div>
</div>
<div className="card-body">
<LeadLineGraph data={resultAnalytics == '' || resultAnalytics == null || resultAnalytics == undefined || resultRolePermssion.length == 0 ? '' : resultAnalytics.data.leadGraphs} />
</div>
</div>
</div>
</div>


{/* <div class="row pt-3 pb-3">
<div class="col-md-3">
<div class="form-group">
<label for="">Data</label>
<select name="ConsultantNmae" id="" class="form-control">
<option value="">Select All</option>
<option value="11">CRM</option>
<option value="17">CRD</option>
</select>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>


</div>

<div class="col-md-2">
<div class="form-group">
<label for="">Projects</label>
<select name="ConsultantNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>

<div class="col-md-2">
<div class="form-group">
<label for="">Date</label>
<select class="form-control">
<option value="">1 Week</option>
<option value="17">15 Days</option>
<option value="17">1 Month</option>
<option value="17">3 Months</option>
<option value="17">6 Months</option>
<option value="17">1 Year</option>
<option value="17">Life Time</option>
</select>                 
</div>

</div>

<div class="col-md-2">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" style={{width:'100%'}} name="find" class="btn btn-primary">Search</button>
</div>
</div>
</div> */}

<div className="hk-row">
<div className="col-lg-6">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>
<div className="card-header card-header-action">
<h6>Sharing & Transfer</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-radio-button-off"/>
</a>
<div className="inline-block dropdown">
<a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more"/></a>
<div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#">Action</a>
</div>
</div>
</div>
</div>
<div className="card-body p-0">
  <TransferSharePie data={resultAnalytics == '' || resultAnalytics == null || resultAnalytics == undefined ? '' : resultAnalytics.data.sharetransfer}/>
</div>
</div>
</div>
<div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Sharing & Transfer Graph View</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-arrow-down"></i>
</a>
<a href="#" className="inline-block full-screen mr-15">
<i className="ion ion-md-expand"></i>
</a>
<a className="inline-block card-close" href="#" data-effect="fadeOut">
<i className="ion ion-md-close"></i>
</a>
</div>
</div>
<div className="card-body">
<ShareTransferLine data={resultAnalytics == '' || resultAnalytics == null || resultAnalytics == undefined || resultRolePermssion.length == 0 ? '' : resultAnalytics.data.transferGraphsView}/>
</div>
</div>
</div>
</div>

{/* <div class="row pt-3 pb-3">
<div class="col-md-3">
<div class="form-group">
<label for="">Consultants</label>
<select name="ConsultantNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label for="">Playlist</label>
<select name="ConsultantNmae" id="" class="form-control">
<option value="">Select All</option>
</select>
</div>
</div>

<div class="col-md-3">
<div class="form-group">
<label for="">Date</label>
<select class="form-control">
<option value="">1 Week</option>
<option value="17">15 Days</option>
<option value="17">1 Month</option>
<option value="17">3 Months</option>
<option value="17">6 Months</option>
<option value="17">1 Year</option>
<option value="17">Life Time</option>
</select>                  
</div>

</div>

<div class="col-md-3">
<div class="form-group" style={{marginTop:'33px'}}>
<button type="submit" style={{width:'100%'}} name="find" class="btn btn-primary">Search</button>
</div>
</div>
</div>


<div className="hk-row">
<div className="col-lg-6">
<div className="card card-refresh">
<div className="refresh-container">
<div className="loader-pendulums"></div>
</div>
<div className="card-header card-header-action">
<h6>Youtube</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-radio-button-off"/>
</a>
<div className="inline-block dropdown">
<a className="dropdown-toggle no-caret" data-toggle="dropdown" href="#" aria-expanded="false" role="button"><i className="ion ion-md-more"/></a>
<div className="dropdown-menu dropdown-menu-right">
<a className="dropdown-item" href="#">Action</a>
</div>
</div>
</div>
</div>
<div className="card-body p-0">
  <YoutubePieGraph />
</div>
</div>
</div>
<div className="col-lg-6">
<div className="card">
<div className="card-header card-header-action">
<h6>Youtube Graph View</h6>
<div className="d-flex align-items-center card-action-wrap">
<a href="#" className="inline-block refresh mr-15">
<i className="ion ion-md-arrow-down"></i>
</a>
<a href="#" className="inline-block full-screen mr-15">
<i className="ion ion-md-expand"></i>
</a>
<a className="inline-block card-close" href="#" data-effect="fadeOut">
<i className="ion ion-md-close"></i>
</a>
</div>
</div>
<div className="card-body">
<YoutubeLineChart />
</div>
</div>
</div>
</div> */}


    </div>

    </>
  )
}

export default Analytics