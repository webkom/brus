import React, {Component} from 'react';
import {addUser} from '../../../testData';

import styles from './adduser.css'

export default class AddUser extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();

    if (!this.state.name)
      return;

    this.state.balance = this.state.balance || 0;

    //addUser(this.state.name, this.state.balance);
    console.log(`Submit new user ${this.state.name}
      with initial balance ${this.state.balance}`);
  }
  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]:value});
  }

  render() {
    return (
      <div className={styles.div}>
        <h2>Add user</h2>
        <form role='form' onSubmit={this.handleSubmit}>
          <input name="name" type='text'
            value={this.state.name || ""}
            onChange={this.handleChange}
            placeholder='Name' />
          <input name="balance" type='number'
            value={this.state.balance || ""}
            onChange={this.handleChange}
            placeholder='Balance' className={styles.balance} />
          <button type='submit' className={styles.button}>
            Add
          </button>
        </form>
      </div>
    );
  }
}
