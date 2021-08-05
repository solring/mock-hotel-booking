import { useState } from 'react';
import { Reveal } from 'react-reveal';

import Header from '../components/Header/Header';

import { useSelector, useDispatch } from 'react-redux';
import { doLogin } from '../features/loginSlicer';
import {
  AJAX_STATUES_LOADING,
} from '../features/fetchStatus'

import { MEMBER } from '../utils/links';

function Page (){

  // Form data
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const status = useSelector(state => state.login.status);
  const authorized = useSelector(state => state.login.authorized);

  const [validating, setValidating] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errServer = "Something is wrong with the server. Please try again later.";
  const errAuthFail = "Incorrect email or password.";

  const login = async (e) => {
    e.preventDefault();

    if (authorized) window.location.href = MEMBER;

    setValidating('was-validated');
    if (e.target.checkValidity()===false) return;

    setValidating("");
    // submit
    if(status !== AJAX_STATUES_LOADING) {
      const r = await dispatch(doLogin({user, pwd}));
      if(!r.payload){
        setErrMsg(errServer);
      } else if(r.payload.success === true) {
        window.location.href = MEMBER;
      } else {
        setErrMsg(errAuthFail);
      }
    }
  };

  const loginForm = (
    <form className={validating} noValidate onSubmit={login} >
      <h2 className="mb-3">Login</h2>

      <div className="form-group">
        <label className="text-secondary" htmlFor="loginEmail">Email</label>
        <input id="loginEmail" type="email" className="form-control form-control-lg"
          required aria-label="Login Email"
          value={user} onChange={(e) => setUser(e.target.value)}
        />
        <div className="invalid-feedback">Please enter valid email.</div>
      </div>
      <div className="form-group">
        <label className="text-secondary" htmlFor="loginPwd">Password</label>
        <input id="loginPwd" type="password" className="form-control form-control-lg"
          required aria-label="Login Password"
          value={pwd} onChange={(e) => setPwd(e.target.value)}
        />
        <div className="invalid-feedback">Please enter password.</div>
        <div className="invalid-feedback d-inline">{errMsg}</div>
      </div>


      <p className="small text-secondary mt-4">
        By signing in or creating an account, you agree with our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Statement</a>
      </p>

      <ul className="mt-3 mb-5">
          <li key="unrated" className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input"
              id="rememberCheck" title="rememberCheck"
              value={remember} onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="rememberCheck" className="custom-control-label text-secondary">Remember me</label>
          </li>
      </ul>

      <button className="btn btn-primary btn-block btn-lg text-uppercase" type="submit">login</button>
      <p className="text-sub text-secondary mt-2">
        Don’t have an account yet?  <a href="#" className="font-weight-bold">Sign up</a>
      </p>
    </form>
  );

  const slogan = (
    <div className="row position-relative">
      <div className="col-9" >
        <h2 className="fz-title mb-3">An ideal hotel makes a wonderful Trip.</h2>
        <p className="text-sub text-secondary">Discover your dream destination and hotel on ALOHA.com</p>
      </div>
    </div>
  );

  const locationTag = (
    <div className="bg-dark rounded px-3 py-2 text-light d-none d-sm-inline-block text-sub Login__location text-nowrap">
      <span className="material-icons">place</span>Osaka Castel, Japan
    </div>
  );

  return (
    <div>
      {/* Full-screen background */}
      <div className="Login__background login-bg position-fixed vh-100"></div>

      <nav className="fixed-top">
        <Header simple={true} />
      </nav>

      <div className="container vh-100 position-relative Login__content">
        <div className="row h-100 justify-content-center">
          <div className="d-none d-lg-block col-lg-8 Login__padding">
            <Reveal effect="fadeInUp">
              {slogan}
            </Reveal>
          </div>

          <div className="col-md-6 col-lg-4 Login__padding Login__right">
            <Reveal effect="fadeIn">{loginForm}</Reveal>
          </div>
        </div>

        {locationTag}
      </div>
    </div>
  );
}

export default Page;