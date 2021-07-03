import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from './App';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/index" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
      </Switch>
    </Router>
  )
}