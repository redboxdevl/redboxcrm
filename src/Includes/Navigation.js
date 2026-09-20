import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { actionConfig } from '../configuration';
import { EmployeeRolesAction } from '../redux/action/EmployeeRolesAction';
import { SingleEmpAction } from '../redux/action/SingleEmpAction';
import { PermissionDataAction } from '../redux/action/PermissionDataAction';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { getDashCountData } from '../redux/action/DashboardCountAction';


const Navigation = ({dataPerm}) => {

let navigate = useNavigate();
const dispatch = useDispatch();
const EmpData = useSelector(state => state.SingleEmpreducers.singleempdata);

const resultRole = useSelector(state => state.EmployeeRolereducers.employeeroledata);
const resultRolePermssion = useSelector(state => state.Permissiondatareducers.singledataredu);

const [managerStatus,setmanagerStatus]=useState(true);
// console.log("navigation",resultRolePermssion);

const Logout = () =>{
localStorage.removeItem("EmployeeRolereducers");
localStorage.removeItem("dashCountReducer");
localStorage.clear();
navigate('/');
}

const ImportList = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 86 && edx.sub_features == 'List');
const InventoriesList = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 100 && edx.sub_features == 'List' || edx.sub_features == 'View');
const InventoriesCreate = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 100 && edx.sub_features == 'Create');
const InventoriesProj = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 99 && edx.sub_features == 'Create');

const ManagerCon = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 139 && edx.sub_features == 'List');
// console.log("Navigation",resultRolePermssion);

const TaskManagementHrmanager = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 6);

const assetRegister = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.feature_id == 153);

const FinanceMode = resultRolePermssion == '' ? '' : resultRolePermssion.filter(edx => edx.role_id == 20 || edx.module_id == 4 || edx.module_name == 'Finance');


// console.log("resultRolePermssion",resultRolePermssion);

// console.log("InventoriesList",InventoriesList);
const SwitchAccess = (checked) => {
// console.log(checked);
const AuthData = JSON.parse(localStorage.getItem('authdata'));
if(checked == true){
dispatch(getDashCountData(AuthData.id));
setmanagerStatus(true);
}else if(checked == false){
  dispatch(getDashCountData(''));
  setmanagerStatus(false);
}else{
  dispatch(getDashCountData(AuthData.id));
  setmanagerStatus(true);
}
}

// console.log("resultRolePermssion",resultRolePermssion);

return (
<>
<div className="hk-wrapper hk-alt-nav">
<nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
<a className="navbar-toggle-btn nav-link-hover navbar-toggler" href="#!" data-toggle="collapse" data-target="#navbarCollapseAlt" aria-controls="navbarCollapseAlt" aria-expanded="false" aria-label="Toggle navigation"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span></a>
<a className="navbar-brand" href="#!">
<img className="brand-img d-inline-block align-top" src="FrontAsset/vendors/dist/img/logo-light.png" alt="brand" />
</a>
<div className="collapse navbar-collapse" id="navbarCollapseAlt">
<ul className="navbar-nav">



<li className="nav-item">
<a className="nav-link" href="javascript:;">Documentation</a>
</li>

</ul>

</div>
<ul className="navbar-nav hk-navbar-content">




<li className="nav-item dropdown dropdown-notifications">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span></span></a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
<h6 className="dropdown-header">Notifications <a href="#!" className="">View all</a></h6>
<div className="slimScrollDiv"><div className="notifications-nicescroll-bar" tabIndex="-50">
<a href="#!" className="dropdown-item">
<div className="media">
<div className="media-img-wrap">
<div className="avatar avatar-sm">
<img src="FrontAsset/vendors/dist/img/avatar1.jpg" alt="user" className="avatar-img rounded-circle" />
</div>
</div>
<div className="media-body">
<div>
<div className="notifications-text"><span className="text-dark text-capitalize">Evie Ono</span> accepted your invitation to join the team</div>
<div className="notifications-time">12m</div>
</div>
</div>
</div>
</a>
<div className="dropdown-divider"></div>

</div>
<div className="slimScrollBar" tabIndex="-50" ></div><div className="slimScrollRail" ></div></div>
</div>
</li>
<li className="nav-item dropdown dropdown-authentication">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<div className="media">
<div className="media-img-wrap">
<div className="avatar">
<img src="FrontAsset/vendors/dist/img/avatar12.jpg" alt="user" className="avatar-img rounded-circle" />
</div>
<span className="badge badge-success badge-indicator"></span>
</div>
<div className="media-body">
<span>Madelyn Shane<i className="zmdi zmdi-chevron-down"></i></span>
</div>
</div>
</a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
<NavLink className="dropdown-item" to="/profile"><i className="dropdown-icon zmdi zmdi-account"></i><span>Profile</span></NavLink>
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-card"></i><span>My balance</span></a>
{/* <NavLink className="dropdown-item" to="/inbox"><i className="dropdown-icon zmdi zmdi-email"></i><span>Inbox</span></NavLink>
<NavLink className="dropdown-item" to="/chat"><i className="dropdown-icon zmdi zmdi-email"></i><span>Chat</span></NavLink>
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-settings"></i><span>Settings</span></a> */}
<div className="dropdown-divider"></div>
<div className="sub-dropdown-menu show-on-hover">
<a href="#!" className="dropdown-toggle dropdown-item no-caret"><i className="zmdi zmdi-check text-success"></i>Online</a>
<div className="dropdown-menu open-left-side">
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-check text-success"></i><span>Online</span></a>
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-circle-o text-warning"></i><span>Busy</span></a>
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-minus-circle-outline text-danger"></i><span>Offline</span></a>
</div>
</div>
<div className="dropdown-divider"></div>
<a className="dropdown-item" href="#!" onClick={Logout}><i className="dropdown-icon zmdi zmdi-power"></i><span>Log out</span></a>
</div>
</li>
</ul>
</nav><nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
<a className="navbar-toggle-btn nav-link-hover navbar-toggler" href="#!" data-toggle="collapse" data-target="#navbarCollapseAlt" aria-controls="navbarCollapseAlt" aria-expanded="false" aria-label="Toggle navigation"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span></a>
<NavLink className="navbar-brand" to="/dashboard">
<img className="brand-img d-inline-block align-top" width="140" src="../../../FrontAsset/dist/img/logo2.png" alt="brand" />
</NavLink>
<div className="collapse navbar-collapse" id="navbarCollapseAlt">
<ul className="navbar-nav"> 


<li className="nav-item">
<NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
</li>

<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
Inventories
</a>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">


{
InventoriesList.length == 0 || TaskManagementHrmanager.length > 0 ? (
<></>
):(
<NavLink className="dropdown-item" to="/inventories">Inventories</NavLink>
)
}

{
FinanceMode.length == 0 ? (
<></>
):(
  <NavLink className="dropdown-item" to="/add-inventories">Add Inventories</NavLink>
)
}

{
InventoriesProj.length == 0 ? (
<></>
):(
  <NavLink className="dropdown-item" to="/add-projects">Add Projects</NavLink>
)
}

{/* 
<NavLink className="dropdown-item" to="/add-new-sales-form">Add Sales Form</NavLink>
<NavLink className="dropdown-item" to="/sales-form-list">List Sales Form</NavLink> */}

</div>
</li>

{
FinanceMode.length == 0 ? (
<></>
):(
<li class="nav-item dropdown ">
  <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Finance
</a>
  <div class="dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Security Files</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/security-files">Security Files List</NavLink>
            <NavLink className="dropdown-item" to="/add-Security-files">Add Security Files</NavLink>
            <NavLink className="dropdown-item" to="/security-files-report">Security Files Report</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Fixed Asset Register</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/fixed-asset-register">Fixed Asset Register List</NavLink>
            <NavLink className="dropdown-item" to="/add-new-asset">Add New Asset</NavLink>
            <NavLink className="dropdown-item" to="/asset-report">Asset Report</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Payment Plan</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/payment-plan">Payment Plan</NavLink>
            <NavLink className="dropdown-item" to="/add-new-payment-plan">Add New Payment Plan</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Payment Reciept</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/payment-reciepts">Payment Reciept</NavLink>
            <NavLink className="dropdown-item" to="/add-new-payment-reciepts">Add New Payment Reciept</NavLink>
            <NavLink className="dropdown-item" to="/report-payment-reciepts">Report Payment Reciept</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Cheque Book Register</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/bank-list">Bank Accounts</NavLink>
            <NavLink className="dropdown-item" to="/add-new-cheque-book">New Cheque Book</NavLink>
            <NavLink className="dropdown-item" to="/list-cheque-book">List Cheque Book</NavLink>
            <NavLink className="dropdown-item" to="/add-cheque-outward-register">Cheque Outward Register</NavLink>
            <NavLink className="dropdown-item" to="/list-cheque-outward-register">List Cheque Outward Register</NavLink>
            <NavLink className="dropdown-item" to="/report-cheque-outward-register">Report Cheque Outward Register</NavLink>
            <NavLink className="dropdown-item" to="/add-post-dated-cheque">Add Post Dated Cheque</NavLink>
            <NavLink className="dropdown-item" to="/list-post-dated-cheque">List Post Dated Cheque</NavLink>
            <NavLink className="dropdown-item" to="/report-post-dated-cheque">Report Post Dated Cheque</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Payment Voucher</a>
          <div class="dropdown-menu open-right-side">
          <NavLink className="dropdown-item" to="/payment-voucher-list">Payment Voucher List</NavLink>
      <NavLink className="dropdown-item" to="/add-new-payment-voucher">Add New Payment Voucher</NavLink>
      <NavLink className="dropdown-item" to="/report-payment-voucher">Payment Voucher Report</NavLink>
          </div>
      </div>

      <a class="dropdown-item" href="#">Profile</a>
  </div>
</li>
)
}


<li class="nav-item dropdown ">
  <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Marketing Documents
</a>
  <div class="dropdown-menu" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
      

      {/* <a class="dropdown-item" href="#">Profile</a> */}
      <NavLink className="dropdown-item" to="/marketing-document">Marketing Documents</NavLink>
      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Company Information</a>
          <div class="dropdown-menu open-right-side">
            <NavLink className="dropdown-item" to="/company/redbox-estate">Redbox Estate</NavLink>
            <NavLink className="dropdown-item" to="/company/al-barsha-developers">Al Barsha Developers</NavLink>
          </div>
      </div>

      <div class="sub-dropdown-menu show-on-hover">
          <a href="#" class="dropdown-toggle dropdown-item">Project Schedule</a>
          <div class="dropdown-menu open-right-side">
          <NavLink className="dropdown-item" to="/projects/al-barsha-city">Al Barsha City</NavLink>
          </div>
      </div>
  </div>
</li>


{/* {
TaskManagementHrmanager.length > 0 ? (
<></>
):(
<li className="nav-item">
  <NavLink className="nav-link" to="/add-lead">Add Leads</NavLink>
</li>
)
} */}

{
ImportList.length == 0 ? (
<></>
):(
<li className="nav-item">
<NavLink className="nav-link" to="/import-leads">Import Leads</NavLink>
</li>
)
}


<li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
Sales Form
</a>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">

<NavLink className="dropdown-item" to="/add-new-sales-form">Add Sales Form</NavLink>
<NavLink className="dropdown-item" to="/sales-form-list">List Sales Form</NavLink>

</div>
</li>





{/* <li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
Project Schedule
</a>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">
<NavLink className="dropdown-item" to="/projects/al-barsha-city">Al Barsha City</NavLink>

</div>
</li> */}

{/* <li className="nav-item">
<NavLink className="nav-link" to="/marketing-document">Marketing Documents</NavLink>
</li> */}


{/* {
assetRegister.length == 0 ? (
<></>
):(
<li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
  Fixed Asset Register
  </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">

  <NavLink className="dropdown-item" to="/fixed-asset-register">Fixed Asset Register List</NavLink>
  <NavLink className="dropdown-item" to="/add-new-asset">Add New Asset</NavLink>

  </div>
  </li>
)
} */}


{/* <li className="nav-item dropdown">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
Company Information
</a>
<div className="dropdown-menu" aria-labelledby="navbarDropdown">

<NavLink className="dropdown-item" to="/company/redbox-estate">Redbox Estate</NavLink>
<NavLink className="dropdown-item" to="/company/al-barsha-developers">Al Barsha Developers</NavLink>

</div>
</li> */}


</ul>

</div>
<ul className="navbar-nav hk-navbar-content">

{
ManagerCon.length == 0 ? (
<></>
):(
<li className="nav-item">
<BootstrapSwitchButton checked={managerStatus} width={80} onstyle="dark" onlabel="manager" offlabel="team" size="xs" onChange={(checked)=>SwitchAccess(checked)} />
</li>
)

}

<li className="nav-item dropdown dropdown-notifications">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span></span></a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
<h6 className="dropdown-header">Notifications <a href="#!" className="">View all</a></h6>
<div className="slimScrollDiv" ><div className="notifications-nicescroll-bar" tabIndex="-50" >


{/* <a href="#!" className="dropdown-item">
<div className="media">
<div className="media-img-wrap">
<div className="avatar avatar-sm">
<span className="avatar-text avatar-text-warning rounded-circle">
<span className="initial-wrap"><span><i className="zmdi zmdi-notifications font-18"></i></span></span>
</span>
</div>
</div>
<div className="media-body">
<div>
<div className="notifications-text">Last 2 days left for the project</div>
<div className="notifications-time">15d</div>
</div>
</div>
</div>
</a> */}

</div>


<div className="slimScrollBar" tabIndex="-50" ></div><div className="slimScrollRail"></div></div>
</div>
</li>
<li className="nav-item dropdown dropdown-authentication">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<div className="media">
<div className="media-img-wrap">
<div className="avatar">

<img src={EmpData.profile_pic == '' ? `../../../FrontAsset/dist/img/avatar12.jpg` : `${actionConfig.REACT_APP_MAIN}${EmpData.profile_pic}`} alt="user" className="avatar-img rounded-circle" />
</div>
<span className="badge badge-success badge-indicator"></span>
</div>
<div className="media-body">
<span>{EmpData == null ? '':EmpData.emp_name}<i className="zmdi zmdi-chevron-down"></i></span>
</div>
</div>
</a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
<NavLink className="dropdown-item" to="/profile"><i className="dropdown-icon zmdi zmdi-account"></i><span>Profile</span></NavLink>
<NavLink className="dropdown-item" to="/inbox"><i className="dropdown-icon zmdi zmdi-email"></i><span>Inbox</span></NavLink>
<NavLink className="dropdown-item" to="/chat"><i className="dropdown-icon zmdi zmdi-email"></i><span>Chat</span></NavLink>
<a className="dropdown-item" href="#!"><i className="dropdown-icon zmdi zmdi-settings"></i><span>Settings</span></a>

<div className="dropdown-divider"></div>
<a className="dropdown-item" href="#!" onClick={Logout}><i className="dropdown-icon zmdi zmdi-power"></i><span>Log out</span></a>
</div>
</li>

</ul>
</nav>
</div>

</>
)
}

export default Navigation