import React from 'react'
import AffiliateNav from '../../Includes/AffiliateNav'

const AffiliateTraining = () => {
return (
<>

<div class="hk-wrapper">

<div class="hk-pg-wrapper hk-auth-wrapper" style={{backgroundImage:`url('FrontAsset/dist/img/agent-bg.jpg')` , backgroundSize:'cover'}}>
<header class="d-flex justify-content-between align-items-center">
<a class="d-flex auth-brand" href="#">
<img class="brand-img" style={{display:'none'}} src="FrontAsset/dist/img/logo-white.png" width="100px" alt="brand" />
</a>
<img class="brand-img" src="FrontAsset/dist/img/logo-white.png" width="100px" alt="brand" />
</header>
<div class="container-fluid">
<div class="row">
<div class="col-xl-5 pa-0">
<div class="auth-cover-img">
<div class="auth-cover-info py-xl-0 pt-100 pb-50">
<div class="auth-cover-content w-xxl-75 w-sm-90 w-100">
<img class="brand-img" src="FrontAsset/dist/img/bg-image.png" width="90%"alt="brand" />
<p class="text-white text-center">Selmore Unity brings you Agents Academy
with specialized real estate coaching.</p>
<div class="form-row mt-20">
<div class="col-sm-6 mb-20">
    <button class="btn btn-danger btn-block"> <span class="btn-text text-uppercase">Download Calendar</span></button>
</div>
<div class="col-sm-6 mb-20">
    <button class="btn btn-danger btn-block"> <span class="btn-text text-uppercase">Download Prospectus</span></button>
</div>
</div>
</div>
</div>
<div class="bg-overlay bg-trans-dark-50"></div>
</div>
</div>
<div class="col-xl-7 pa-0">
<div class="auth-form-wrap py-xl-0 py-50">
<div class="auth-form w-xxl-55 w-xl-75 w-sm-90 w-100">
<form>
<h1 class="display-4 mb-10 text-white">Traning Form</h1>
<p class="mb-30 text-white">Create your account and start your free trial today</p>
<div class="form-row">
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Date of Training" value="" type="text" />
</div>
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Subject" value="" type="text" />
</div>
</div>
<div class="form-row">
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="TIme Slots" value="" type="text" />
</div>
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Slots Available" value="" type="text" />
</div>
</div>
<div class="form-row">
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="First name" value="" type="text" />
</div>
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Last name" value="" type="text" />
</div>
</div>
<div class="form-row">
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Mobile Country Code" value="" type="text" />
</div>
<div class="col-md-6 form-group">
    <input class="form-control" placeholder="Mobile Phone" value="" type="text" />
</div>
</div>
<div class="form-group">
<input class="form-control" placeholder="Email" type="email" />
</div>
<div class="form-row">
{/* <div class="col-sm-6 mb-20">
    <button class="btn btn-danger btn-block"> <span class="btn-text">Add Attendee</span></button>
</div> */}
<div class="col-sm-6 mb-20">
    <button class="btn btn-danger btn-block"> <span class="btn-text">Book Your Session</span></button>
</div>
</div>
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

export default AffiliateTraining