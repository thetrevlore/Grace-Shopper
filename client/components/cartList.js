import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateInventoryThunk, removeOneFromCart, addToCart } from '../store';

const CartList = (props) => {

  const { products } = props
  const cartItems = props.items;
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
             return (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{`$${+item.price * (+item.quantity)}.00`}</td>
                <td><button onClick={()=>{props.decrementQuantity(item, targetedProduct)}}>-</button> {item.quantity} <button onClick={()=>props.incrementQuantity(item, targetedProduct)}>+</button></td>
                <td><button onClick={()=>{props.delete(item)}}>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
      <h3>{`TOTAL: $${total}.00`}</h3>
    </div>)
}

const mapState = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    decrementQuantity(item, selectedProduct){
        dispatch(removeOneFromCart(selectedProduct))
        selectedProduct.inventoryAmount+=1
        dispatch(updateInventoryThunk(selectedProduct))
    },
    incrementQuantity(item, selectedProduct){
        dispatch(addToCart(selectedProduct, 1))
        selectedProduct.inventoryAmount-=1
        dispatch(updateInventoryThunk(selectedProduct))
    }
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(CartList));