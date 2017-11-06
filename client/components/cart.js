import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, postOrder, clearCart, updateInventoryThunk } from '../store';
import CartList from './cartList';

function Cart(props){

    const { cartArray, products, handleSubmitOrder, removeFromCart } = props
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
        <CartList items={cartArray} delete={removeFromCart} products={products}/>
        <div>
        <h4>Enter shipping information:</h4>
        <form className="addForm" onSubmit={(e)=> handleSubmitOrder(e, order)}>
          <input
            title=""
            type="text"
            name="address"
            placeholder="Enter address"
          />
          <input type="submit" value="Place Order"  /><br />
        </form>
        </div>
        <br />
        <Link to="/products">Continue shopping.</Link>
      </div>
    );
}


const mapStateToProps = (state) => ({
  cartArray: Object.keys(state.cart).map(item => {
    state.cart[item].productId = +item
    return state.cart[item]
  }),
  user: state.user,
  products: state.products
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromCart: (item, product) => {
      dispatch(removeFromCart(item.productId))
      product.inventoryAmount+=item.quantity
      dispatch(updateInventoryThunk(product))
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
