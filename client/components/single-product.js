import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import AddProduct from './AddProduct'
import store, { addToCart, removeFromCart } from '../store/index';

const SingleProduct = props => {
  const itemId = +props.match.params.id
  const { products } = props;
  const selectedProduct = products.filter( product => product.id === itemId)[0]
  console.log(props.cart)

  return (
    <div>
      <h1>{selectedProduct.title}</h1>
      {
        selectedProduct.photos.map((photo) => (<span key={photo}>
          <img src={photo} width="200" />
          </span>))
      }
      <div>
        <h3>Description</h3>
        <p>{selectedProduct.description}</p>
      </div>
      <div>
        <h3>Price</h3>
        <p>{selectedProduct.price}</p>
      </div>
      <AddProduct
        selectedProduct={selectedProduct}
        addToCart={props.addToCart}
        cart = {props.cart}
      />
    </div>
  )
}

const mapStateToProps = ({ products, cart }) => ({ products, cart })

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, quantity) => {
      return dispatch(addToCart(product, quantity))
    },
    removeFromCart: (product) => {
      return dispatch(removeFromCart(product))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))
