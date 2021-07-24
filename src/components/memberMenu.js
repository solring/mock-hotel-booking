import React, { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Nav, Button, Dropdown, Collapse } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/loginSlicer';

import { BS_BREAKPOINT_MD } from '../utils/constants';

import { INDEX, LOGIN, MEMBER } from '../utils/links';

export default (props) => {

  // login state
  const dispatch = useDispatch();
  const login = useSelector(state => state.login.authorized);
  const user = useSelector(state => state.login.name);
  const profilePic = useSelector(state => state.login.profilePic);

  // For collapse
  const [on, setOn] = useState(false);

  const isSmallScreen = useMediaQuery(`(max-width: ${BS_BREAKPOINT_MD})`);

  const doLogout = () => {
    dispatch(logout());
    window.location.href = INDEX;
  }

  const userBtn = () => (
    <React.Fragment>
      <img src={profilePic} alt="profile thumbnail" className="border border-primary thumbnail-sm rounded-circle mr-2" />
      <span className="d-none d-md-inline">{user}</span>
      <span className="material-icons p d-none d-md-inline">arrow_drop_down</span>
    </React.Fragment>
  );

  const userDropdown = () => {
    if(!isSmallScreen) {
      return (
        <Dropdown>
          <Dropdown.Toggle id="UserOptions" variant="light" bsPrefix="no-toggle"
            className="d-flex centering-total-row px-3">
            {userBtn()}
          </Dropdown.Toggle >
          <Dropdown.Menu as="ul" aria-labelledby="UserOptions"
            className="dropdown-menu-right position-absolute">
            <Dropdown.Item as="li" key='acc' href={MEMBER}>Account</Dropdown.Item>
            <Dropdown.Item as="li" key='booking' href={MEMBER}>My bookings</Dropdown.Item>
            <Dropdown.Item as="li" key='privacy' href={INDEX}>Privacy</Dropdown.Item>
            <Dropdown.Item as="li" key='logout' onClick={doLogout}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
    } else {
      return (
        <React.Fragment>
        <Button id="UserOptions"
          variant="light" className="d-flex centering-total-row px-3"
          onClick={() => setOn(!on)}>
          {userBtn()}
        </Button>
        <Collapse in={on} aria-labelledby="UserOptions"
          className="w-100 bg-light collapse-absolute collapse-disabled-md">
          <Nav as="ul" className="pl-5 py-2">
            <Nav.Item as="li" key='acc'><Nav.Link href={MEMBER}>Account</Nav.Link></Nav.Item>
            <Nav.Item as="li" key='booking'><Nav.Link href={MEMBER}>My bookings</Nav.Link></Nav.Item>
            <Nav.Item as="li" key='privacy'><Nav.Link href={INDEX}>Privacy</Nav.Link></Nav.Item>
            <Nav.Item as="li" key='logout' ><Nav.Link onClick={doLogout}>Log out</Nav.Link></Nav.Item>
          </Nav>
        </Collapse>
        </React.Fragment>
      );
    }
  }

  if(login) {
    return (
      <li className="nav-item ml-4">
        {userDropdown()}
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