import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as links from './utils/links';

import Loading from './components/Loading';
import NotFound from './pages/NoFound';

const HomePage = React.lazy(() => import('./pages/Home'));
const SearchPage = React.lazy(() => import('./pages/Search'));
const DetailPage = React.lazy(() => import('./pages/Detail'));
const OrderPage = React.lazy(() => import('./pages/Order'));
const ConfirmedOrderPage = React.lazy(() => import('./pages/ConfirmedOrder'));
const MemberPage = React.lazy(() => import('./pages/Member'));
const LoginPage = React.lazy(() => import('./pages/Login'));


export default function Routes(props){
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path={links.SEARCH} component={SearchPage} />
          <Route path={links.DETAIL} component={DetailPage} />
          <Route path={links.ORDER} component={OrderPage} />
          <Route path={links.CONFIRMATION} component={ConfirmedOrderPage} />
          <Route path={links.MEMBER} component={MemberPage} />
          <Route path={links.LOGIN} component={LoginPage} />

          <Route path="*" component={NotFound} />

        </Switch>
      </Suspense>
    </Router>
  )
}