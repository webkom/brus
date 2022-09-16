import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../utils/utils.js';
import Transaction from './Transaction'

import styles from './style.css'

const ADMIN = true;//tmp


export default class TransactionList extends Component {
  constructor(props){
    super(props)

    this.state = {
      transactions:this.props.transactions
    };

    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
  }


  handleDeleteTransaction(id){
    console.log("Deleted transaction:");
    console.log(this.state.transactions[id]);
    const t = this.state.transactions;
    t.splice(id, 1);
    this.setState({transactions:t})
  }

  render() {
    let i = 0;
    return (
      <table className={styles.table}>
        <thead>
          <tr>
              <th>Date</th>
              <th className={getValueClass(0)}>Transaction</th>
              {ADMIN && <th className={styles.delete}>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {this.state.transactions.map(t => (<Transaction key={i} id={i++} data={t}
            onDeleteTransaction={this.handleDeleteTransaction} admin={ADMIN}/>))}
        </tbody>
      </table>
    );
  }

}
