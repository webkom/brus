import React, {Component} from 'react';
import {getValueClass} from '../../../logic/logic';


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
  handleDeposit(e){
    e.preventDefault()
    if (!this.depositAmount.value ||  this.depositAmount.value < 0)
      return;

    const newBalance = this.state.balance + parseInt(this.depositAmount.value);

    this.setState({balance:newBalance});
    console.log(`User ${this.state.name} deposited ${this.depositAmount.value},
      new balance: ${newBalance}`);//TODO: logger feil balanse

  }
  render() {
    return (
      <tr>
        <td><a href={"/user/"+this.props.userId}>{this.state.name}</a></td>
        <td className={getValueClass(this.state.balance)}>
          {this.state.balance},-
        </td>
        <td>
          <button className="btnWithraw"
            onClick={this.handleBuySoda}>Buy soda</button>
        </td>
        <td>
          <form role="form" onSubmit={this.handleDeposit}>
            <input type="number"
              ref={ref => (this.depositAmount = ref)}
              className="inpDeposit"/>
            <button type="submit" className="btnDeposit">Deposit</button>
          </form>
        </td>
      </tr>
    );
  }
}
