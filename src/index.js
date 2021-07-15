import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';

import qs from 'query-string';
import { update } from './features/search/searchSlicer';

import configureAppStore from './store';
import { Provider } from 'react-redux';

import MockServer from './api/mockServer';

import './vendors.js';

const store = configureAppStore();

const query = qs.parse(window.location.search);
if (Object.keys(query).length !== 0) store.dispatch(update(query));

MockServer();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
