import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

const AffiliateNav = () => {

  const EmpData = JSON.parse(localStorage.getItem('affiliateauthdata'));

  const navigate = useNavigate();
  const Logout = () =>{
    localStorage.removeItem('affiliateauthdata');
    navigate('/affiliate-program');
  }
  

  return (
    <>
 <div className="hk-wrapper hk-alt-nav">
<nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
<a className="navbar-toggle-btn nav-link-hover navbar-toggler" href="#!" data-toggle="collapse" data-target="#navbarCollapseAlt" aria-controls="navbarCollapseAlt" aria-expanded="false" aria-label="Toggle navigation"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span></a>
<a className="navbar-brand" href="#!">
<img className="brand-img d-inline-block align-top" src="../FrontAsset/vendors/dist/img/logo-light.png" alt="brand" />
</a>
<div className="collapse navbar-collapse" id="navbarCollapseAlt">
<ul className="navbar-nav">



<li className="nav-item">
<a className="nav-link" href="documentation.html">Documentation</a>
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
<img src="../FrontAsset/vendors/dist/img/avatar1.jpg" alt="user" className="avatar-img rounded-circle" />
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
<img src="../../../../FrontAsset/vendors/dist/img/avatar12.jpg" alt="user" className="avatar-img rounded-circle" />
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
<div className="dropdown-divider"></div>
<a className="dropdown-item" href="#!" onClick={Logout}><i className="dropdown-icon zmdi zmdi-power"></i><span>Log out</span></a>
</div>
</li>
</ul>
</nav><nav className="navbar navbar-expand-xl navbar-light fixed-top hk-navbar hk-navbar-alt">
<a className="navbar-toggle-btn nav-link-hover navbar-toggler" href="#!" data-toggle="collapse" data-target="#navbarCollapseAlt" aria-controls="navbarCollapseAlt" aria-expanded="false" aria-label="Toggle navigation"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></span></a>
<NavLink className="navbar-brand" to="/affiliate-dashboard">
<img className="brand-img d-inline-block align-top" width="120px" src="../../../../../FrontAsset/dist/img/logo2.png" alt="brand" />
</NavLink>
<div className="collapse navbar-collapse" id="navbarCollapseAlt">
<ul className="navbar-nav"> 



<li className="nav-item">
<NavLink className="nav-link" to="/affiliate-dashboard">Dashboard</NavLink>
</li>

<li className="nav-item">
<NavLink className="nav-link" to="/affiliate-document">Marketing Documents</NavLink>
</li>

{/* <li className="nav-item">
<NavLink className="nav-link" to="/affiliate-training">Trainings</NavLink>
</li> */}

{/* <li className="nav-item">
<NavLink className="nav-link" to="#">Faqs</NavLink>
</li> */}

<li className="nav-item">
<NavLink className="nav-link" to="/affiliates/inventories">Inventories</NavLink>
</li>

<li className="nav-item">
<NavLink className="nav-link" to="/affiliates/list-view-deals">List View Deals</NavLink>
</li>




<li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
  Company Information
  </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">

  <NavLink className="dropdown-item" to="/company/redbox-estate/affiliates">Redbox Estate</NavLink>
  <NavLink className="dropdown-item" to="/company/al-barsha-developers/affiliates">Al Barsha Developers</NavLink>

  </div>
  </li>

  <li className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
 Project Schedule
  </a>
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
  <NavLink className="dropdown-item" to="/projects/al-barsha-city/affiliates">Al Barsha City</NavLink>

  </div>
  </li>

</ul>

</div>
<ul className="navbar-nav hk-navbar-content">

<li className="nav-item dropdown dropdown-notifications">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="feather-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"></path></svg></span><span className="badge-wrap"><span className="badge badge-primary badge-indicator badge-indicator-sm badge-pill pulse"></span></span></a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
<h6 className="dropdown-header">Notifications <a href="#!" className="">View all</a></h6>
<div className="slimScrollDiv" ><div className="notifications-nicescroll-bar" tabIndex="-50" >


<a href="#!" className="dropdown-item">
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
</a>

</div>


<div className="slimScrollBar" tabIndex="-50" ></div><div className="slimScrollRail"></div></div>
</div>
</li>
<li className="nav-item dropdown dropdown-authentication">
<a className="nav-link dropdown-toggle no-caret" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<div className="media">
<div className="media-img-wrap">
<div className="avatar">
<img src="../../../../../FrontAsset/dist/img/avatar12.jpg" alt="user" className="avatar-img rounded-circle" />
</div>
<span className="badge badge-success badge-indicator"></span>
</div>
<div className="media-body">
<span>{EmpData == null ? '':EmpData[0].full_name}<i className="zmdi zmdi-chevron-down"></i></span>
</div>
</div>
</a>
<div className="dropdown-menu dropdown-menu-right" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
{/* <NavLink className="dropdown-item" to="#"><i className="dropdown-icon zmdi zmdi-account"></i><span>Profile</span></NavLink> */}
<div className="dropdown-divider"></div>
<a className="dropdown-item" href="#" onClick={Logout}><i className="dropdown-icon zmdi zmdi-power"></i><span>Log out</span></a>
</div>
</li>
</ul>
</nav>
</div>

    </>
  )
}

export default AffiliateNav