import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../utils/utils.js';
import TransactionList from '../TransactionList'
import Deposit from '../Deposit'

import styles from './user.css'

export default class User extends Component {
  constructor(props){
    super(props);

    calculateBalance(props.data);

    this.state = {
      id:props.data.id,
      name:props.data.name,
      balance:props.data.balance,
      transactions:props.data.transactions,
      nSodas:props.data.transactions.filter(a => a.value < 0).length
    }
  }

  render() {
    return (
      <div>
        <h2 className={styles.name}>{this.state.name}</h2>
        <div className={styles.spacing}>
          <div>
            Current balance:
            <span className={getValueClass(this.state.balance)}>
              {this.state.balance},-
            </span><br/>
            Sodas bought: {this.state.nSodas}
          </div>
          <Deposit />
        </div>
        <TransactionList transactions={this.state.transactions} />
        <a href="/list">Back</a>
      </div>
    );
  }
}
