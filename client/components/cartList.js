import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateInventoryThunk, removeOneFromCart } from '../store';

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
                <td><button onClick={()=>{props.decrementQuantity(item, targetedProduct)}}>-</button> {item.quantity} <button onClick={props.incrementQuantity(item, targetedProduct)}>+</button></td>
                <td><button onClick={()=>{props.delete(item, targetedProduct)}}>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
      <h3>{`TOTAL: $${total}.00`}</h3>
    </div>)
}


// const mapStateToProps = (state) => ({
//   cartArray: Object.keys(state.cart).map(item => {
//     state.cart[item].productId = +item
//     return state.cart[item]
//   }),
//   user: state.user,
//   products: state.products
// });

const mapDispatchToProps = (dispatch) => {
  return {
    // need to make a 
    // item???
    // newQuantity???
    // oldQuantity???
    // ev.preventDefault() somewhere...
    // YOU'RE ON MASTER RIGHT NOW. STOP!!!
    decrementQuantity: (item, selectedProduct) => {
        dispatch(removeOneFromCart(item.productId))
        selectedProduct.inventoryAmount+=item.quantity
        dispatch(updateInventoryThunk(selectedProduct))
    },
    incrementQuantity: (item, selectedProduct) => {
        dispatch(addToCart(selectedProduct, quantity))
        selectedProduct.inventoryAmount-=quantity
        dispatch(updateInventoryThunk(selectedProduct))
      }
      
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartList));