import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import UserProfile from './app/components/UserProfile';
import List from './app/components/UserList';
//import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={List} />
    <Route path="/user/:user" component={UserProfile} />
    <Route path="/list" component={List} />
  </Router>,
  document.getElementById('container')
);
