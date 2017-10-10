import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../utils/utils.js';

import styles from './transaction.css'

const ADMIN = true;//tmp

export default class Transaction extends Component {
  render(){
    return (
      <tr>
        <td>{this.props.data.date.toString()}</td>
        <td className={getValueClass(this.props.data.value)}>
          {this.props.data.value},-
        </td>
        {ADMIN && <td className={styles.delete}>
          <button className="delete">X</button>
        </td>}
      </tr>
    );
  }
}
