import React, {Component} from 'react';
import Header from '../Header';
import AddUser from './AddUser';
import UserList from './UserList';
import {calculateBalance} from '../../utils/utils';
import testData from '../../../testData';

import styles from './style.css'

export default class List extends Component {


  render() {
    testData.users.map(u => (calculateBalance(u)));
    return (
      <div className={styles.list}>
        <Header />
        <AddUser />
        <UserList users={testData.users} />
      </div>
    );
  }
}
