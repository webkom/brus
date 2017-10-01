import React, {Component} from 'react';
import User from './User';
import {getValueClass} from '../../../logic/logic';

export default class UserList extends Component {

  constructor(props){
    super(props);

    this.state = {users:props.users};

    this.state.balance = this.getTotalBalance();

  }

  getTotalBalance(){
    return this.state.users.reduce((sum, u) => (sum + parseInt(u.balance)), 0);
  }

  handleUserChange(i){

  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th className="value">Balance</th>
              <th>Buy</th>
              <th>Deposit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(u => (<User key={u.id} userId={u.id} name={u.name} balance={u.balance} />))}
            <tr>
              <td>Total balance</td>
              <td className={getValueClass(this.state.balance)}>{this.state.balance},-</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
