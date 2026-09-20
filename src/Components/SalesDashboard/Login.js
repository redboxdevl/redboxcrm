import React , {useState, useEffect} from 'react';
import { useDispatch } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration'
import { PermissionDataAction } from '../../redux/action/PermissionDataAction';
import { requestForToken } from '../../firebase';
import LoadingSpinner from '../FinanceDashboard/LoadingSpinner';

const Login = () => {

let navigate = useNavigate();
const dispatch = useDispatch();

const [Token, setToken] = useState('');
const [LoadingS,setLoadingS]=useState(false);
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

requestForToken(setToken);
useEffect(() => {
if(localStorage.getItem('authdata')){
  navigate('/dashboard');
}
},[navigate]);


const login = (e) =>{
e.preventDefault();

setLoadingS(true);

const FeildData = { email:email,password:password,Token:Token}
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(FeildData)
};
fetch(`${actionConfig.REACT_APP_URL}login`, requestOptions)
  .then(response => response.json())
  .then(dataLog => {
      if(dataLog.code === '200'){
        Swal.fire({
          position:'top-end',
          icon:'success',
          title:`Welcome ${dataLog.data.emp_name}`,
          timer:1500,
          showConfirmButton: false,        }
        );
        localStorage.setItem('authdata', JSON.stringify(dataLog.data));
        localStorage.setItem('empTeam', JSON.stringify(dataLog.empTeam));
        setLoadingS(false);
        let FeaturesData = [];
        dataLog.rolepermission.forEach((el)=>{
          FeaturesData.push(
            {
              "feature_name":el.features.feature_name,
              "feature_id":el.features.feature_id,
              "sub_features":el.sub_features,
              "module_id":el.module_id,
              "module_name":el.module_name,
              "role_id":el.role_id,
            }
          );
        });
        dispatch(PermissionDataAction(FeaturesData));
        navigate("/dashboard");
      }else{
        Swal.fire(
          'Error!',
          dataLog.message,
          'error'
        );
        setLoadingS(false);
      }
  });
}

return (
<>

{LoadingS === true ? <LoadingSpinner /> : '' }

<div className="hk-wrapper">
<div className="hk-pg-wrapper hk-auth-wrapper">
<header className="d-flex justify-content-between align-items-center">
<div className="btn-group btn-group-sm">
<NavLink to="/affiliate-program" className="btn btn-secondary">Affiliates Program</NavLink>
</div>
</header>
<div className="container-fluid">
<div className="row">
<div className="col-xl-5 pa-0">
<div className="">
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
<form onSubmit={login}>
{/* <h1 className="display-4 mb-10 pb-3 text-center">Sign In</h1> */}
<div className="form-group">
<input className="form-control" name="email" placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
</div>
<div className="form-group">
<div className="input-group">
<input className="form-control" name="password" placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required autoComplete="on"/>
<div className="input-group-append">
  <span className="input-group-text"><span className="feather-icon"><i data-feather="eye-off"></i></span></span>
</div>
</div>
</div>
<div className="d-flex justify-content-between">
<div className="custom-control custom-checkbox mb-25">
<input className="custom-control-input" id="same-address" type="checkbox"  />
<label className="custom-control-label font-14" htmlFor="same-address">Keep me logged in</label>
</div>
<div className="custom-control custom-checkbox mb-25">
<NavLink to="/forgot-password" className='text-primary'>Forgot Password</NavLink>
</div>
</div>
{LoadingS === true ? <button type="submit" className="btn btn-primary btn-block" disabled>Login</button> : <button type="submit" className="btn btn-primary btn-block">Login</button> }
{/* <p style={{paddingTop:'6rem',textAlign:'center'}}>Don't have an account yet ? <NavLink to="/sign-up">Sign Up</NavLink></p> */}
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

export default Login