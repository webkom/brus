import React, {Component} from 'react';
import {calculateBalance, getValueClass} from '../../../logic/logic.js';

const ADMIN = true;//tmp

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
    let i = 0;
    return (
      <div>
        <h2>{this.state.name}</h2>
        <div>
          Current balance: <span className={getValueClass(this.state.balance)}>{this.state.balance},-</span><br/>
          Sodas bought: {this.state.nSodas}
        </div>
        <table>
          <thead>
            <tr>
                <th>Date</th>
                <th className="value">Transaction</th>
                {ADMIN && <th className="delete">Delete</th>}
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.map(t => (
              <tr key={i++}>
                <td>{t.date.toString()}</td>
                <td className={getValueClass(t.value)}>{t.value},-</td>
                {ADMIN && <td className="delete"><button className="delete">X</button></td>}
              </tr>
            ))}
          </tbody>
        </table>
        <a href="/list">Back</a>
      </div>
    );
  }
}
