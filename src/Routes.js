import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import App from './App';
import HomePage from './pages/Home';
import SearchPage from './pages/Search';
import DetailPage from './pages/Detail';

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/index" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/detail" component={DetailPage} />

      </Switch>
    </Router>
  )
}