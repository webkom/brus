import React, {Component} from 'react';
import Logo from './Logo'

import styles from './style.css'


export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Logo />
        <h1>Brusliste for Webkom</h1>
      </div>
    );
  }
}
