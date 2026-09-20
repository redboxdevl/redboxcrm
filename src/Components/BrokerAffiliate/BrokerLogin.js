import React , {useEffect, useState} from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration';

const BrokerLogin = () => {

    let navigate = useNavigate();

	const [Email,setEmail]= useState('');
	const [Password,setPassword]= useState('');

	useEffect(() => {
        if(localStorage.getItem('affiliateauthdata')){
            navigate('/affiliate-dashboard');
        }
        },[]);


		const AffiliateLogin = (e) => {
			e.preventDefault();

			const FeildData = { email_address:Email,password:Password }
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(FeildData)
        };
        
        fetch(`${actionConfig.REACT_APP_URL}affiliatelogin`, requestOptions)
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
<div class="auth-form-wrap myauth pt-xl-0 pt-70">
<div class="auth-form w-xl-30 w-lg-55 w-sm-75 w-100">
<a class="auth-brand text-center d-block mb-20" href="#">
	<img class="brand-img" src="FrontAsset/dist/img/logo-white.png" width="160" alt="brand"/>
</a>
<form onSubmit={AffiliateLogin}>
	<h1 class="display-4 text-center mb-10 text-white">Welcome Back :)</h1>
	<p class="text-center mb-30 text-white">Sign in to your account and enjoy unlimited perks.</p> 
	<div class="form-group">
		<input class="form-control" placeholder="Email" type="email"  onChange={e=>setEmail(e.target.value)} value={Email} required/>
	</div>
	<div class="form-group">
		<div class="input-group">
			<input class="form-control" placeholder="Password" type="password" onChange={e=>setPassword(e.target.value)} value={Password} required/>
			<div class="input-group-append">
				<span class="input-group-text"><span class="feather-icon"><i data-feather="eye-off"></i></span></span>
			</div>
		</div>
	</div>
	{/* <div class="custom-control custom-checkbox mb-25">
		<input class="custom-control-input" id="same-address" type="checkbox" checked />
		<label class="custom-control-label font-14" for="same-address">Keep me logged in</label>
	</div> */}
	<button type='submit' className='btn btn-primary btn-block'>Login</button>
	{/* <NavLink className="btn btn-primary btn-block" to="/affiliate-dashboard">Login</NavLink> */}
	<p class="text-center mt-10 text-white" style={{paddingTop:'2rem'}}>Do have an account yet? <NavLink to="/affiliate-register" style={{color:'#fff'}}>Sign Up</NavLink></p>
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

export default BrokerLogin