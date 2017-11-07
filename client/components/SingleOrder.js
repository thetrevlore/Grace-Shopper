import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct'
import { addToCart, postItemToCart, removeFromCart } from '../store';

const SingleProduct = props => {

  const itemId = +props.match.params.id
  const { products, cart, addToCart } = props;
  const selectedProduct = products.filter(product => product.id === itemId)[0];

  console.log('single product props', props)

  return (
<div>
              <h5>Order ID</h5>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                   {this.props.orders && this.props.orders.map((ordersArr, idx) => {
                      return ordersArr.orderItems.map((item, idx)=> {
                        return (
                          <tr key={idx}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                          </tr>
                        )
                      })
                  })}
                </tbody>
              </table>
            </div>
      )}
