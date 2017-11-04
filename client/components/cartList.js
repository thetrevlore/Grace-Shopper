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
          Object.keys(cartItems).map((key, idx) => {
             return (
              <tr key={idx}>
                <td>{cartItems[key].title}</td>
                <td>{cartItems[key].price}</td>
                <td>{cartItems[key].quantity}</td>
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
