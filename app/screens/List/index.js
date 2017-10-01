import React, {Component} from 'react';
import Header from './components/Header';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import {calculateBalance} from '../../logic/logic';
import testData from '../../../testData';

export default class List extends Component {
  render() {
    testData.users.map(u => (calculateBalance(u)));
    return (
      <div className="divList">
        <Header />
        <AddUser />
        <UserList users={testData.users} />
      </div>
    );
  }
}
