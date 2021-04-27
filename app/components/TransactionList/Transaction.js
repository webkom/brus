import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../utils/utils.js';

import styles from './transaction.css'


export default class Transaction extends Component {
  render(){
    return (
      <tr>
        <td>{this.props.data.date.toString()}</td>
        <td className={getValueClass(this.props.data.value)}>
          {this.props.data.value},-
        </td>
        {this.props.admin && <td className={styles.delete}>
          <span onClick={e => (this.props.onDeleteTransaction(this.props.id))}>X</span>
        </td>}
      </tr>
    );
  }
}
