import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as links from './utils/links';

import App from './App';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import DetailPage from './pages/Detail';
import OrderPage from './pages/Order';
import ConfirmedOrderPage from './pages/ConfirmedOrder';
import MemberPage from './pages/Member';
import LoginPage from './pages/Login';

import NotFound from './pages/NoFound';

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path={links.INDEX} component={HomePage} />
        <Route path={links.SEARCH} component={SearchPage} />
        <Route path={links.DETAIL} component={DetailPage} />
        <Route path={links.ORDER} component={OrderPage} />
        <Route path={links.CONFIRMATION} component={ConfirmedOrderPage} />
        <Route path={links.MEMBER} component={MemberPage} />
        <Route path={links.LOGIN} component={LoginPage} />

        <Route path="*" component={NotFound} />

      </Switch>
    </Router>
  )
}