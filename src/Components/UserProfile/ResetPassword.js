import React , {useEffect, useState} from 'react';
import { useNavigate , NavLink, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';

const ResetPassword = () => {

    const navigate = useNavigate();
    let { id } = useParams();

    const [NewPassword,setNewPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');

    const ResetPasswordsub = (e) => {
        e.preventDefault();

        if(NewPassword == ConfirmPassword){

            const FeildData = { resetCode:id,newpassword:NewPassword}

            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
            };
            
            fetch(`${actionConfig.REACT_APP_URL}resetpassword`, requestOptions)
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

        }else{
            alert("Password Not Match");
        }


    }

  return (
    <>
<div className="hk-wrapper">

<div className="hk-pg-wrapper hk-auth-wrapper">
<header className="d-flex justify-content-between align-items-center">
<NavLink className="d-flex auth-brand" to="">
<img className="brand-img" src="../FrontAsset/dist/img/logo-white.png" style={{width:'100px'}} alt="brand" />
</NavLink>
<div className="btn-group btn-group-sm">

</div>
</header>
<div className="container-fluid">
<div className="row">
<div className="col-xl-5 pa-0">
<div id="owl_demo_1" className="">
<div className="fadeOut item auth-cover-img overlay-wrap" style={{backgroundImage:'url(../FrontAsset/dist/img/bg2.jpg)'}}>
<div className="auth-cover-info py-xl-0 pt-100 pb-50">
<div className="auth-cover-content text-center w-xxl-75 w-sm-90 w-xs-100">
    <h1 className="display-3 text-white mb-20">Understand and look deep into nature.</h1>
    <p className="text-white">The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. Again during the 90s as desktop publishers bundled the text with their software.</p>
</div>
</div>
<div className="bg-overlay bg-trans-dark-50"></div>
</div>

</div>
</div>
<div className="col-xl-7 pa-0">
<div className="auth-form-wrap py-xl-0 py-50">
<div className="auth-form w-xxl-55 w-xl-75 w-sm-90 w-xs-100">

<form onSubmit={ResetPasswordsub}>
<h1 className="display-4 mb-10">Reset Password</h1>

<div className="form-group">
    <div className="input-group">
        <input className="form-control" name="password" placeholder="New Password" type="password" required onChange={(e)=>setNewPassword(e.target.value)} value={NewPassword}/>
        <div className="input-group-append">
            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
        </div>
    </div>
</div>
<div className="form-group">
    <div className="input-group">
        <input className="form-control" name="password" placeholder="Confirm Password" type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} value={ConfirmPassword}/>
        <div className="input-group-append">
            <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
        </div>
    </div>
</div>
<button type="submit" className="btn btn-primary btn-block">Reset Password</button>

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

export default ResetPassword