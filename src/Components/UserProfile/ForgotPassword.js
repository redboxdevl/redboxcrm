import React , {useEffect, useState} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';

const ForgotPassword = () => {

const navigate = useNavigate();
const [ForgotEmail,setForgotEmail] = useState('');

const ForgotPass = (e) => {
e.preventDefault();

const FeildData = { email:ForgotEmail}

const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(FeildData)
};

fetch(`${actionConfig.REACT_APP_URL}forgotpassword`, requestOptions)
.then(response => response.json())
.then(dataex => {

if(dataex.code == '200'){
Swal.fire(
'Good job!',
dataex.message,
'success'
);
navigate("/");

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
<div className="hk-wrapper">

<div className="hk-pg-wrapper hk-auth-wrapper">

<div className="container-fluid">
<div className="row">
<div className="col-xl-5 pa-0">
<div id="owl_demo_1" className="">
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
<form onSubmit={ForgotPass}>
<h1 className="display-4 mb-10">Forgot Password</h1>

<div className="form-group">
<div className="input-group">
<input className="form-control" name="email" placeholder="Email Address" type="email" onChange={(e)=>setForgotEmail(e.target.value)} value={ForgotEmail} required/>
<div className="input-group-append">
<span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
</div>
</div>
</div>

<button type="submit" className="btn btn-primary btn-block">Reset Password</button>
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

export default ForgotPassword