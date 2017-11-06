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
        addToCart={addToCart}
        currentQuantityInCart={ cart[selectedProduct.id] && cart[selectedProduct.id].quantity || 0 }
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products,
  cart:state.cart })

const mapDispatchToProps = (dispatch) => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))

