import Layout from '../layout/Layout';

import Header from '../components/Header';

import { MEMBER } from '../utils/links';

function Page (){

  const loginForm = (
    <form action={MEMBER} method="get" data-aos="fade-left">
      <h2 className="mb-3">Login</h2>

      <div className="form-group">
        <label className="text-secondary" for="loginEmail">Email</label>
        <input id="loginEmail" type="text" className="form-control form-control-lg" />
      </div>
      <div className="form-group">
        <label className="text-secondary" for="loginPwd">Password</label>
        <input id="loginPwd" type="password" className="form-control form-control-lg" />
      </div>

      <p className="small text-secondary mt-4">
        By signing in or creating an account, you agree with our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Statement</a>
      </p>

      <div className="custom-form custom-checkbox mt-3 mb-5 ml-4">
        <input type="checkbox" id="rememberCheck" className="custom-control-input" />
        <label for="rememberCheck" className="custom-control-label text-secondary">Remember me</label>
      </div>

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