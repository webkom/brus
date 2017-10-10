import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import User from './app/components/User';
import List from './app/components/UserList';
//import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={List} />
    <Route path="/user/:user" component={User} />
    <Route path="/list" component={List} />
  </Router>,
  document.getElementById('container')
);
