/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Login from "./views/Login/login"

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { Provider } from 'react-redux';
import myReducers from './reducers/index';
import { createStore } from 'redux';
import PrivateRoute from './components/routecustom/privateroute';
import './assets/css/style.css'

const store = createStore(
  myReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route exact path="/login" component={Login} />  
        <PrivateRoute path="/" component={Admin} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
