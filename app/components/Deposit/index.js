import React, {Component} from 'react';

import styles from './deposit.css'

export default class Deposit extends Component {
  constructor(props){
    super(props);

    this.state = {
      onDeposit: this.props.onDeposit
    }

    this.handleDeposit = this.handleDeposit.bind(this);
  }

  handleDeposit(e){
    e.preventDefault();
    this.state.onDeposit(parseInt(this.depositAmount.value));
  }

  render() {
    return (
      <form role="form" onSubmit={this.handleDeposit}>
        <input type="number"
          ref={ref => (this.depositAmount = ref)}
          className={styles.input}/>
        <button type="submit" className={styles.button}>Deposit</button>
      </form>
    );
  }
}
