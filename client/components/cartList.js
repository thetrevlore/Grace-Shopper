import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/index';

const CartList = (props) => {
  const cartItems = props.items;
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          cartItems &&
          cartItems.map((item, idx) => {
             return (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td><button onClick={props.delete}>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>)
}

export default CartList;
