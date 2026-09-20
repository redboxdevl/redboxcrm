import React , {useState, useEffect} from 'react';
import { useDispatch , useSelector } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration'
import { EmployeeRolesAction } from '../../redux/action/EmployeeRolesAction';
import { PermissionDataAction } from '../../redux/action/PermissionDataAction';
import { requestForToken,onMessageListener } from '../../firebase';

const SignUp = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [FullName,setFullName]=useState("");
    const [PhoneNo,setPhoneNo]=useState("");
    const [Company,setCompany]=useState("");
    const [CompanyLogo,setCompanyLogo]=useState("");

  return (
    <>
<div className="hk-wrapper">

<div className="hk-pg-wrapper hk-auth-wrapper">
<header className="d-flex justify-content-between align-items-center">
{/* <NavLink className="d-flex auth-brand" to="">
<img className="brand-img" src="FrontAsset/dist/img/logo-white.png" style={{width:'100px'}} alt="brand" />
</NavLink> */}
<div className="btn-group btn-group-sm">
{/* <NavLink to="/affiliate-program" className="btn btn-outline-secondary">Affiliates Program</NavLink> */}
{/* <NavLink to="" className="btn btn-outline-secondary">Help</NavLink>
<NavLink to="" className="btn btn-outline-secondary">About Us</NavLink> */}
</div>
</header>
<div className="container-fluid">
<div className="row">
<div className="col-xl-5 pa-0">
<div id="owl_demo_1" className="">
{/* <div className="fadeOut item auth-cover-img overlay-wrap" style={{backgroundImage:'url(FrontAsset/dist/img/bg2.jpg)'}}> */}
<div className="fadeOut item auth-cover-img bgCollxs" >
<div className="auth-cover-info py-xl-0 pt-100 pb-50">
<div className="auth-cover-content text-center w-xxl-95 w-sm-90 w-xs-100">
  <img src="FrontAsset/images/loginBg.png" alt="" className='img-fluid mb-2' width={350} />
    <h1 className="display-3 text-white mb-20">Sell More with These Proven Strategies</h1>
    <p className="text-white">Sellmore is a cloud-based sales platform that helps businesses increase their sales and customer engagement. It provides features such as customer relationship management (CRM), lead management, sales automation, and analytics. It also offers integrations with third-party services</p>
</div>
</div>
<div className="bg-overlay bg-trans-dark-50"></div>
</div>

</div>
</div>
<div className="col-xl-7 pa-0">
<div className="auth-form-wrap py-xl-0 py-50">
<div className="auth-form w-xxl-65 w-xl-75 w-sm-90 w-xs-100">
<div className='d-block text-center' style={{marginBottom:'3rem'}}>
  <img src="FrontAsset/dist/img/logo2.png" alt="" width={230} />
</div>
<form>
<h1 className="display-4 mb-10 pb-3 text-center">Sign Up</h1>
{/* <p className="mb-30">Sign in to your account and enjoy unlimited perks.</p> */}

<div className="form-group">
    <input className="form-control" name="name" placeholder="Full Name" type="text" onChange={(e)=>setFullName(e.target.value)} value={FullName} required/>
</div>
<div className="form-group">
    <input className="form-control" name="number" placeholder="Phone No" type="text" onChange={(e)=>setPhoneNo(e.target.value)} value={PhoneNo} required/>
</div>
<div className="form-group">
    <input className="form-control" name="email" placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
</div>
<div className="form-group">
    <input className="form-control" name="company" placeholder="Company Name" type="text" onChange={(e)=>setCompany(e.target.value)} value={Company} required/>
</div>
<div className="form-group">
    <input className="form-control" name="companyLogo" placeholder="Company Name" type="file" onChange={(e)=>setCompanyLogo(e.target.value)} value={CompanyLogo} required/>
</div>
<div className="form-group">
    <div className="input-group">
        <input className="form-control" name="password" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required autoComplete="on"/>
        <div className="input-group-append">
            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
        </div>
    </div>
</div>

<button type="submit" className="btn btn-primary btn-block">Sign Up</button>
{/* <div className="option-sep">Bussines Partner</div>
<div className="row">
    <div className="col-sm-4">
    <img className="brand-img" src="FrontAsset/dist/img/imake.png" style={{width:'100px'}} alt="brand" />
    </div>
    <div className="col-sm-4">
    <img className="brand-img" src="FrontAsset/dist/img/BTInv.png" style={{width:'130px'}} alt="brand" />
    </div>
    <div className="col-sm-4">
    <img className="brand-img" src="FrontAsset/dist/img/redbox.png" style={{width:'100px'}} alt="brand" />
    </div>
</div> */}

<p style={{paddingTop:'6rem',textAlign:'center'}}><NavLink to="/">Back to Login</NavLink></p>

</form>
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

export default SignUp