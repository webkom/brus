import React, {Component} from 'react';

import styles from './logo.css'

export default class Logo extends Component {
  render() {
    return (
      <img className={styles.logo} src="/webkom.png" />
    );
  }
}
