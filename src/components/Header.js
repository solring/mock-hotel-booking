import { Dropdown } from 'react-bootstrap';
import { LANGUAGES } from '../utils/language';

import profilePic from '../assets/images/profile.jpg'


function Header(props) {
  const {simple, member} = props;

  let bgStyle = simple ? "" : "bg-light";
  let navbarStyle = "navbar navbar-expand-md " + bgStyle;

  const signUpLink = () => {
    if (member) return;
    return (
      <li className="nav-item ml-4">
        <a href="sign-up.html" className="nav-link">Sign up</a>
      </li>
    );
  };

  const memberOptions = () => {
    if(member) {
      return (
        <li className="nav-item ml-4">
          <Dropdown>
            <Dropdown.Toggle variant="light" bsPrefix="no-toggle" className="d-flex centering-total-row px-3">
              <img src={profilePic} alt="profile picture thumbnail" className="border border-primary thumbnail-sm rounded-circle mr-2" />
              <span className="d-none d-md-inline">David Lin</span>
              <span className="material-icons p d-none d-md-inline">arrow_drop_down</span>
            </Dropdown.Toggle >
            <Dropdown.Menu aria-labelledby="DropdownMember">
              <Dropdown.Item key='acc' ><a href="account.html">Account</a></Dropdown.Item>
              <Dropdown.Item key='booking' ><a href="booking.html">My bookings</a></Dropdown.Item>
              <Dropdown.Item key='privacy' ><a href="privacy.html">Privacy</a></Dropdown.Item>
              <Dropdown.Item key='logout' ><a href="logout.html">Log out</a></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );
    } else {
      return (
        <li className="nav-item ml-4">
            <a href="login.html" className="nav-link">Login</a>
        </li>
      );
    }
  };

  const genDropdown = (props) => {
    if (simple) return;

    return (
      <ul className="navbar-nav">
      <div className="navbar-collapse collapse" id="navbarContent">
        <li className="nav-item">
          <Dropdown>
            <Dropdown.Toggle variant="light" className="centering-total-row ">
              <span className="material-icons icon-md">language</span>
            </Dropdown.Toggle>
            <Dropdown.Menu aria-labelledby="DropdownLang">
              {
                LANGUAGES.map((lan) => (<Dropdown.Item key={lan}><a href="#">{lan}</a></Dropdown.Item>))
              }
            </Dropdown.Menu>
          </Dropdown>
        </li>
        {signUpLink()}
      </div>
      {memberOptions()}
    </ul>
    );
  };

  return (
    <div className={navbarStyle}>
      <div className="container justify-content-between">
        {simple &&(
          <button className="navbar-toggler" type="button" data-toggle="Dropdown" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="material-icons">menu</span>
          </button>
        )}

        <h1 className="navbar-brand logo"><a href="index.html">ALOHA</a></h1>

        {genDropdown()}
      </div>
    </div>
  );
}

export default Header;