import React from 'react';
import PropTypes from 'prop-types';

import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import MemberMenu from './MemberMenu';
import { LANGUAGES } from '../../utils/constants';
import { INDEX } from '../../utils/links';

function Header(props) {
  const {simple} = props;

  const login = useSelector(state => state.login.authorized);

  const genNavs = () => {
    if (simple) return;

    return (
      <React.Fragment>
      <Navbar.Collapse id="navbar-menu" className="order-3 order-md-2">
        <Nav as="ul" className="ml-auto align-items-md-center">
          <li className="nav-item">
            <Dropdown>
              <Dropdown.Toggle id="languageDropdown"
                variant="light" className="centering-total-row">
                <span className="material-icons icon-md">language</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="languageDropdown">
                {
                  LANGUAGES.map((lan) => (<Dropdown.Item key={lan}>{lan}</Dropdown.Item>))
                }
              </Dropdown.Menu>
            </Dropdown>
          </li>
          {
            !login &&
            <li className="nav-item">
              <a className="nav-link" href="/index">
                Sign up
              </a>
            </li>
          }
        </Nav>
      </Navbar.Collapse>
      <Nav as="ul" className="order-2 order-md-3">
        <MemberMenu />
      </Nav>
      </React.Fragment>
    );
  };

  return (
    <Navbar as="header" expand="md" className={simple ? "" : "bg-light"}>
      <div className="container justify-content-between">
        {!simple &&
          <Navbar.Toggle aria-controls="navbar-menu">
          <span className="material-icons">menu</span>
          </Navbar.Toggle>
        }

        <h1 className="navbar-brand logo mx-auto mx-md-0"><a href={INDEX}>ALOHA</a></h1>

        {genNavs()}
      </div>
    </Navbar>
  );
}

Header.propTypes = {
  simple: PropTypes.bool,
}

export default Header;