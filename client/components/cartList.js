import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateInventory, removeOneFromCart, addToCart, postToCart } from '../store';

const CartList = (props) => {
  const cartItems = props.items;
  const { products, orderId } = props;
  const total = cartItems.reduce((acc, cur) => acc+=cur.quantity * cur.price, 0)



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
            const targetedProduct = products.filter(product => +product.id === +item.productId)[0];
            const orderToPost = {
              userId: props.user.id,
              email: props.user.email,
              status: 'Created',
              quantity: item.quantity,
              orderItem:{
                title: item.title,
                productId: item.productId,
                price: item.price
              }
            }
             return (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{`$${+item.price * (+item.quantity)}.00`}</td>
                <td>
                  { item.quantity > 1 &&
                    <button onClick={()=>{props.decrementQuantity(item, targetedProduct, props.user.id, orderToPost, targetedProduct.inventoryAmount+1)}}>-</button>
                  }
                  {` ${item.quantity} `}
                  {
                    targetedProduct.inventoryAmount > 0 &&
                    <button onClick={()=>props.incrementQuantity(item, targetedProduct, props.user.id, orderToPost, targetedProduct.inventoryAmount-1)}>+</button>
                  }
                </td>

                <td><button onClick={()=>{props.delete(item.productId, orderId, products.filter(product => +product.id === +item.productId)[0].inventoryAmount + item.quantity)}}>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
      <h3>{`TOTAL: $${total}.00`}</h3>
    </div>)
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  cart: state.cart,
  value: ""
});

const mapDispatchToProps = (dispatch) => {
  return {
    decrementQuantity(item, selectedProduct, userId, orderToSave, inventoryAmount){
      const postToCartThunk = postToCart(orderToSave, userId, -1, selectedProduct);
      dispatch(postToCartThunk);
      const updateInventoryThunk = updateInventory(selectedProduct.id, inventoryAmount)
      dispatch(updateInventoryThunk);
    },
    incrementQuantity(item, selectedProduct, userId, orderToSave, inventoryAmount){
      const postToCartThunk = postToCart(orderToSave, userId, 1, selectedProduct);
      dispatch(postToCartThunk);
      const updateInventoryThunk = updateInventory(selectedProduct.id, inventoryAmount)
      dispatch(updateInventoryThunk);
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartList));
