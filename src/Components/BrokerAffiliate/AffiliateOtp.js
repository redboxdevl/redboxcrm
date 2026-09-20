import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { actionConfig } from '../../configuration';

const AffiliateOtp = () => {

    const navigate = useNavigate();

    const AffiliateAuthData = JSON.parse(localStorage.getItem('affiliateauthdata'));

    useEffect(() => {
        if(localStorage.getItem('affiliateauthdata')){
            navigate('/affiliate-dashboard');
        }
        },[]);

    const [OtpData,setOtpData]= useState('');

    const OtpSubmitData = (e) => {
        e.preventDefault();

        const FeildData = { otpCode:OtpData }
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}optverification`, requestOptions)
            .then(response => response.json())
            .then(dataex => {
                
                if(dataex.code == '200'){
                Swal.fire(
                    'Good job!',
                    dataex.message,
                    'success'
                );
                localStorage.setItem('affiliateauthdata', JSON.stringify(dataex.data));
                navigate("/affiliate-dashboard");
                    
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
<div class="hk-wrapper">
<div class="hk-pg-wrapper hk-auth-wrapper">
<div class="container-fluid">
<div class="row">
<div class="col-xl-12 pa-0">
<div class="auth-form-wrap pt-xl-0 pt-70">
<div class="auth-form w-xl-30 w-lg-55 w-sm-75 w-100">
    <a class="auth-brand text-center d-block mb-20" href="#">
        <img class="brand-img" src="FrontAsset/dist/img/logo2.png" width="200px" alt="brand"/>
    </a>
    <form onSubmit={OtpSubmitData}>
        <h1 class="display-4 text-center mb-10">OTP :)</h1>
        <p class="text-center mb-30">Sign in to your account and enjoy unlimited perks.</p> 
        <div class="form-group">
            <input class="form-control" placeholder="Enter OTP" maxlength="6" type="password" onChange={e=>setOtpData(e.target.value)} value={OtpData} required/>
        </div>
        <button type='submit' className='btn btn-primary btn-block'>Finish</button>
        {/* <NavLink className="btn btn-primary btn-block" to="/affiliate-dashboard">Finish</NavLink> */}
        <p class="text-center mt-10"><a href="#">Resend OTP</a></p>
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

export default AffiliateOtp