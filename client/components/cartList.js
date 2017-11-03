import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/index';

const CartList = (props) => {
  const cartItems = props.items;
  console.log('carttttttt', cartItems)
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {
          cartItems.length &&
          cartItems.map(item => {
            //cart is an obj, needs a for in loop???
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default CartList;
