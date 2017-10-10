import React, {Component} from 'react';
import {getValueClass} from '../../utils/utils';
import Deposit from '../Deposit'

import styles from './user.css'

const SODA_PRICE = 18;


export default class User extends Component {
  constructor(props){
    super(props);

    this.state = {name:props.name, balance:parseInt(props.balance)};

    this.handleBuySoda = this.handleBuySoda.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
  }
  handleBuySoda(e){//Husk setstate oppdaterer neste render
    const newBalance = this.state.balance - SODA_PRICE;
    this.setState({balance:newBalance});
    console.log(`User ${this.state.name} bought a soda for ${SODA_PRICE},-
      new balace ${newBalance}`);
  }
  handleDeposit(amount){
    //e.preventDefault()
    if (!amount ||  amount < 0)
      return;

    const newBalance = this.state.balance + amount;

    this.setState({balance:newBalance});
    console.log(`User ${this.state.name} deposited ${amount},
      new balance: ${newBalance}`);

  }
  render() {
    return (
      <tr className={styles.row}>
        <td><a href={"/user/"+this.props.userId}>{this.state.name}</a></td>
        <td className={getValueClass(this.state.balance)}>
          {this.state.balance},-
        </td>
        <td>
          <button className={styles.withraw}
            onClick={this.handleBuySoda}>Buy soda</button>
        </td>
        <td>
          <Deposit onDeposit={this.handleDeposit} />
        </td>
      </tr>
    );
  }
}
