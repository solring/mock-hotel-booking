import { Dropdown } from 'react-bootstrap';
import { LANGUAGES } from '../utils/language';

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/loginSlicer';

import { INDEX, LOGIN, MEMBER } from '../utils/links';

function Header(props) {
  const {simple} = props;

  let bgStyle = simple ? "" : "bg-light";
  let navbarStyle = "navbar navbar-expand-md " + bgStyle;

  // login state
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.authorized);
  const user = useSelector(state => state.login.name);
  const profilePic = useSelector(state => state.login.profilePic);

  const doLogout = () => {
    dispatch(logout());
    window.location.href = INDEX;
  }

  const memberOptions = () => {
    if(login) {
      return (
        <li className="nav-item ml-4">
          <Dropdown>
            <Dropdown.Toggle variant="light" bsPrefix="no-toggle" className="d-flex centering-total-row px-3">
              <img src={profilePic} alt="profile picture thumbnail" className="border border-primary thumbnail-sm rounded-circle mr-2" />
              <span className="d-none d-md-inline">{user}</span>
              <span className="material-icons p d-none d-md-inline">arrow_drop_down</span>
            </Dropdown.Toggle >
            <Dropdown.Menu aria-labelledby="DropdownMember">
              <Dropdown.Item key='acc' href={MEMBER}>Account</Dropdown.Item>
              <Dropdown.Item key='booking' href={MEMBER}>My bookings</Dropdown.Item>
              <Dropdown.Item key='privacy' href={INDEX}>Privacy</Dropdown.Item>
              <Dropdown.Item key='logout' onClick={doLogout}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      );
    } else {
      return (
        <li className="nav-item ml-4">
            <a href={LOGIN} className="nav-link">Login</a>
        </li>
      );
    }
  };

  const genDropdown = () => {
    if (simple) return;

    return (
      <ul className="navbar-nav">
        <div className="navbar-collapse collapse" id="navbarContent">
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle id="languageDropdown"
                variant="light" className="centering-total-row">
                <span className="material-icons icon-md">language</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="languageDropdown">
                {
                  LANGUAGES.map((lan) => (<Dropdown.Item key={lan}><a href="#">{lan}</a></Dropdown.Item>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {
            !login &&
            <li className="nav-item ml-4">
              <a href="" className="nav-link">Sign up</a>
            </li>
          }
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

        <h1 className="navbar-brand logo"><a href={INDEX}>ALOHA</a></h1>

        {genDropdown()}
      </div>
    </div>
  );
}

export default Header;