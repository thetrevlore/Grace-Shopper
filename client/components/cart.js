import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { removeFromCart, postOrder, clearCart } from '../store/index';
import CartList from './cartList';

function Cart(props){

    const { cartArray } = props
    const order = {
      userId: props.user.id,
      email: props.user.email,
      orderItems: props.cartArray,
      status: 'Completed',
      hasBeenPlaced: true
    }

    return (
      <div>
        <h2>Your Cart</h2>
        <CartList items={cartArray} delete={props.removeFromCart}/>
        <div>
        <h4>Enter shipping information:</h4>
        <form className="addForm" onSubmit={(e)=>props.handleSubmitOrder(e, order)}>
          <input
            title=""
            type="text"
            name="address"
            placeholder="Enter address"
          />
          <input type="submit" value="Place Order"  /><br />
        </form>
        </div>
        <Link to="/products">Continue shopping.</Link>
      </div>
    );
}


const mapStateToProps = (state) => ({
  cartArray: Object.keys(state.cart).map(item => {
    state.cart[item].productId = +item
    return state.cart[item]
  }),
  user: state.user
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromCart: (product) => {
      return dispatch(removeFromCart(product))
    },
    handleSubmitOrder (evt, order) {
      evt.preventDefault();
      order.shippingAddress = evt.target.address.value
      dispatch(postOrder(order, ownProps.history));
      dispatch(clearCart());
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
