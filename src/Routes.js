import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import App from './App';

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/home" component={App} />
      </Switch>
    </Router>
  )
}