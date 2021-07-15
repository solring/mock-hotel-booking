import { useState } from 'react';

import Layout from '../layout/Layout';
import Header from '../components/Header';

import api, { Login } from '../api/mockApi';
import { MEMBER } from '../utils/links';

function Page (){

  // Form data
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [remember, setRemember] = useState(false);

  const [validating, setValidating] = useState("");

  const login = (e) => {
    e.preventDefault();
    setValidating('was-validated');

    if (e.target.checkValidity()===false) return;

    console.log("Login");
    // remember username/pwd if needed
    // submit
    api(Login(user, pwd)).then((r) => {
      if(r.success === true) {
        window.location.href = MEMBER;
      } else {
        throw Error("Server: Login failed.")
      }
    }).catch((e) => {
      console.error("Failed trying login.");
      console.error(e);
    })
  };

  const loginForm = (
    <form className={validating} noValidate data-aos="fade-left"
      onSubmit={login}
    >
      <h2 className="mb-3">Login</h2>

      <div className="form-group">
        <label className="text-secondary" forHtml="loginEmail">Email</label>
        <input id="loginEmail" type="email" className="form-control form-control-lg"
          required aria-label="Login Email"
          value={user} onChange={(e) => setUser(e.target.value)}
        />
        <div className="invalid-feedback">Please enter valid email.</div>
      </div>
      <div className="form-group">
        <label className="text-secondary" forHtml="loginPwd">Password</label>
        <input id="loginPwd" type="password" className="form-control form-control-lg"
          required pattern="[\w\d\!\?\$\^%@#-]+" aria-label="Login Password"
          value={pwd} onChange={(e) => setPwd(e.target.value)}
        />
        <div className="invalid-feedback">Please enter password.</div>
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
        <div className="col-9" data-aos="fade-up">
          <h2 className="fz-title mb-3">An ideal hotel makes a wonderful Trip.</h2>
          <p className="text-sub text-secondary">Discover your dream destination and hotel on ALOHA.com</p>
        </div>
    </div>
  );

  const Content = () => {
    return (
<div className="container vh-100 position-relative Login__content">
  <div className="row h-100 justify-content-center">
    <div className="d-none d-lg-block col-lg-8 Login__padding">
      {slogan}
    </div>

    <div className="col-md-6 col-lg-4 Login__padding Login__right">
      {loginForm}
    </div>
  </div>
  <div className="bg-dark rounded px-3 py-2 text-light d-none d-sm-inline-block text-sub Login__location text-nowrap">
    <span className="material-icons">place</span>Osaka Castel, Japan
  </div>
</div>
    );
  }

  return (
    <div>
      {/* Full-screen background */}
      <div className="Login__background login-bg position-fixed vh-100"></div>

      <nav className="fixed-top">
        <Header simple={true} member={false} />
      </nav>
      <Layout.Content>
        {Content()}
      </Layout.Content>

    </div>
  );
}

export default Page;