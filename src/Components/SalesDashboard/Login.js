import React , {useState, useEffect} from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { useDispatch } from "react-redux"
import { useNavigate , NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'
import { actionConfig } from '../../configuration'
import { PermissionDataAction } from '../../redux/action/PermissionDataAction';
import { requestForToken } from '../../firebase';
import LoadingSpinner from '../FinanceDashboard/LoadingSpinner';

const LoginScreen = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  background: #fff;
  color: #20242c;

  *, *::before, *::after { box-sizing: border-box; }

  .login-header {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    padding: 28px 40px;
  }
  .affiliate-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #a1262e;
    font-size: 13px;
    font-weight: 500;
  }
  a:hover { color: #b3232a; }
  a:focus-visible, button:focus-visible, input:focus-visible {
    outline: 3px solid #b3232a;
    outline-offset: 4px;
  }
  .login-layout {
    display: grid;
    grid-template-columns: 5fr 7fr;
    min-height: 100vh;
    min-height: 100dvh;
  }
  .login-intro {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 72px 48px;
    background: #781c25;
    border-right: 1px solid #781c25;
  }
  .intro-content { width: 100%; max-width: 460px; }
  .login-team-image {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 0 32px;
  }
  .intro-eyebrow {
    display: block;
    margin-bottom: 18px;
    color: #f5c5ca;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .intro-title {
    margin: 0 0 20px;
    color: #fff;
    font-size: clamp(28px, 3vw, 40px);
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -1.2px;
  }
  .intro-description {
    margin: 0;
    color: #f0d5d8;
    font-size: 15px;
    line-height: 1.8;
  }
  .login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 104px 48px 64px;
  }
  .login-form { width: 100%; max-width: 390px; }
  .login-logo { display: block; width: 168px; height: auto; margin-bottom: 40px; }
  .form-title {
    margin: 0 0 10px;
    color: #20242c;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -0.8px;
  }
  .form-description { margin: 0 0 32px; color: #737983; font-size: 14px; line-height: 1.6; }
  .login-field { margin-bottom: 22px; }
  .field-label { display: block; margin-bottom: 9px; font-size: 13px; font-weight: 600; }
  .login-input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: 1px solid #dce0e4;
    border-radius: 8px;
    background: #fff;
    color: #20242c;
    font: inherit;
    font-size: 14px;
    transition: border-color 150ms ease, box-shadow 150ms ease;
  }
  .login-input::placeholder { color: #9298a1; }
  .login-input:focus {
    border-color: #b3232a;
    outline: none;
    box-shadow: 0 0 0 3px rgba(179, 35, 42, 0.12);
  }
  .password-field { position: relative; }
  .password-field .login-input { padding-right: 52px; }
  .password-toggle {
    position: absolute;
    top: 3px;
    right: 4px;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #777e88;
    cursor: pointer;
  }
  .password-toggle:hover { color: #a1262e; background: #fff3f3; }
  .login-options { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin: 4px 0 28px; font-size: 12px; }
  .remember-label { display: flex; align-items: center; gap: 8px; margin: 0; color: #616772; cursor: pointer; }
  .remember-label input { width: 15px; height: 15px; margin: 0; accent-color: #b3232a; }
  .forgot-link { color: #a1262e; font-weight: 600; }
  .login-submit {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    min-height: 50px;
    padding: 12px 20px;
    border: 1px solid #b3232a;
    border-radius: 8px;
    background: #b3232a;
    color: #fff;
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 150ms ease;
  }
  .login-submit:hover { background: #941d24; border-color: #941d24; }
  .login-submit:disabled { opacity: 0.65; cursor: wait; }

  @media (max-width: 991px) {
    .login-intro { padding: 64px 28px; }
    .login-form-wrap { padding-right: 32px; padding-left: 32px; }
  }
  @media (max-width: 767px) {
    .login-header { position: relative; padding: 20px 24px; text-align: right; border-bottom: 1px solid #eeece9; }
    .login-layout { grid-template-columns: 1fr; min-height: auto; }
    .login-intro { padding: 32px 24px; border-right: 0; }
    .intro-content { max-width: 390px; }
    .login-team-image { max-height: 220px; margin-bottom: 24px; }
    .intro-eyebrow { margin-bottom: 12px; }
    .intro-title { font-size: 28px; margin-bottom: 12px; }
    .intro-description { font-size: 13px; line-height: 1.7; }
    .login-form-wrap { padding: 36px 24px 48px; }
    .login-logo { width: 140px; margin-bottom: 28px; }
  }
`;

const Login = () => {

let navigate = useNavigate();
const dispatch = useDispatch();

const [Token, setToken] = useState('');
const [LoadingS,setLoadingS]=useState(false);
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [showPassword, setShowPassword] = useState(false);

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
  <LoginScreen>
    {LoadingS && <LoadingSpinner />}
    <header className="login-header">
      <NavLink to="/affiliate-program" className="affiliate-link">
        Affiliates Program <FiArrowRight aria-hidden="true" />
      </NavLink>
    </header>
    <main className="login-layout">
      <section className="login-intro" aria-labelledby="login-intro-title">
        <div className="intro-content">
          <img src="/FrontAsset/images/sales-team-floor.png" alt="Sales professionals collaborating at workstations on a modern open-plan sales floor" className="login-team-image" width={1536} height={1024} />
          <span className="intro-eyebrow">Better data. Stronger sales.</span>
          <h1 id="login-intro-title" className="intro-title">“Turn well-managed data into stronger relationships and greater sales.”</h1>
          <p className="intro-description">
            Bring every lead, conversation, and opportunity together. Give your team the clarity to follow up with purpose and close with confidence.
          </p>
        </div>
      </section>
      <section className="login-form-wrap" aria-labelledby="login-form-title">
        <div className="login-form">
          <img src="FrontAsset/dist/img/logo2.png" alt="Sellmore" className="login-logo" />
          <h2 id="login-form-title" className="form-title">Welcome back</h2>
          <p className="form-description">Sign in to continue to your workspace.</p>
          <form onSubmit={login} aria-busy={LoadingS}>
            <div className="login-field">
              <label htmlFor="login-email" className="field-label">Email address</label>
              <input id="login-email" className="login-input" name="email" placeholder="you@company.com" type="email" autoComplete="username" onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </div>
            <div className="login-field">
              <label htmlFor="login-password" className="field-label">Password</label>
              <div className="password-field">
                <input id="login-password" className="login-input" name="password" placeholder="Enter your password" type={showPassword ? 'text' : 'password'} onChange={(e)=>setPassword(e.target.value)} value={password} required autoComplete="current-password" />
                <button type="button" className="password-toggle" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} aria-controls="login-password">
                  {showPassword ? <FiEyeOff size={18} aria-hidden="true" /> : <FiEye size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>
            <div className="login-options">
              <label className="remember-label" htmlFor="same-address">
                <input id="same-address" type="checkbox" />
                Keep me logged in
              </label>
              <NavLink to="/forgot-password" className="forgot-link">Forgot password?</NavLink>
            </div>
            <button type="submit" className="login-submit" disabled={LoadingS}>
              {LoadingS ? 'Signing in…' : 'Sign in'}
              {!LoadingS && <FiArrowRight size={16} aria-hidden="true" />}
            </button>
          </form>
        </div>
      </section>
    </main>
  </LoginScreen>
)
}

export default Login;
