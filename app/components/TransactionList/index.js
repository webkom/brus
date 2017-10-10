import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../utils/utils.js';
import Transaction from './Transaction'

import styles from './style.css'

const ADMIN = true;//tmp


export default class TransactionList extends Component {
  render() {
    let i = 0;
    return (
      <table>
        <thead>
          <tr>
              <th>Date</th>
              <th className={getValueClass(0)}>Transaction</th>
              {ADMIN && <th className={styles.delete}>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {this.props.transactions.map(t => (<Transaction key={i++} data={t}/>))}
        </tbody>
      </table>
    );
  }

}
