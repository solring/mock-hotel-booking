import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from './App';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import DetailPage from './pages/Detail';
import OrderPage from './pages/Order';
import ConfirmedOrderPage from './pages/ConfirmedOrder';
import MemberPage from './pages/Member';
import LoginPage from './pages/Login';

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/index" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/detail" component={DetailPage} />
        <Route path="/order" component={OrderPage} />
        <Route path="/confirmation" component={ConfirmedOrderPage} />
        <Route path="/member" component={MemberPage} />
        <Route path="/login" component={LoginPage} />

      </Switch>
    </Router>
  )
}