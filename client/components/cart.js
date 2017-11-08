import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postOrder, clearCart, removeItemFromOrder } from '../store';
import CartList from './cartList';

function Cart(props){

    const { cartArray, products, handleSubmitOrder, removeFromCart, orderId } = props
    const order = {
      userId: props.user.id,
      email: props.user.email,
      orderItems: props.cartArray,
      status: 'Completed'
    }

    return (
      <div>
        <h2>Your Cart</h2>
        <CartList items={cartArray} delete={removeFromCart} products={products} orderId={orderId}/>
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
  products: state.products,
  orderId: state.order
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFromCart: (itemProductId, orderId, updatedInventoryAmount ) => {
      const removeItemfromOrderThunk = removeItemFromOrder(itemProductId, orderId, updatedInventoryAmount)
      dispatch(removeItemfromOrderThunk);
    },
    handleSubmitOrder (evt, order) {
      evt.preventDefault();
      order.shippingAddress = evt.target.address.value;
      const postOrderThunk = postOrder(order, ownProps.history);
      dispatch(postOrderThunk);
      dispatch(clearCart());
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
