import React, {Component} from 'react';
import Header from '../Header';
import User from './User';
import testData from '../../../testData';

import styles from './style.css'

export default class UserProfile extends Component {
  constructor(props){//TODO: fix teit løsning
    super(props);

    const user = parseInt(props.params.user);

    this.state = {};

    const userData = testData.users.filter(u => (u.id == user));

    if (userData.length != 0)
      this.state.userData = userData[0];

  }

  render() {
    return (
      <div className={styles.userProfile}>
        <Header />
        {this.state.userData && <User data={this.state.userData} />}
      </div>
    );
  }
}
