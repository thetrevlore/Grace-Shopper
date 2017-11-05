import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct'
import { addToCart, postItemToCart, removeFromCart } from '../store';

const SingleProduct = props => {
  console.log('singleProduct props', props)
  const itemId = +props.match.params.id
  const { products } = props;
  const selectedProduct = products.filter(product => product.id === itemId)[0];
  console.log('props', selectedProduct)

  return (
    <div>
      <h1>{selectedProduct.title}</h1>
      {
        selectedProduct.photos.map((photo) => (<span key={photo}>
          <img src={photo} width="200"/>
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
        cart={props.cart}
        postItemToCart={props.postItemToCart}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  cart:state.cart })

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

