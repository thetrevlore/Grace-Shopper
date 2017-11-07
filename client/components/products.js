import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct'
import { addToCart } from '../store';

function Products (props) {
  const { products, addToCart, cart } = props;

  return (
    <div>
      <h1>Products</h1>
      {
        products.map(product => {
            return (
              <div key={product.id}>
                <div>
                  <h3><span>{product.title}</span></h3>
                </div>
                <NavLink to={`/products/${product.id}`}>
                  <img src={product.photos[0]} width="200" height="200" />
                  <div>
                    <h5><span>{product.description}</span>
                    <span>{`     $${product.price}`}</span></h5>
                  </div>
                </NavLink>
                <AddProduct
                  selectedProduct={product}
                  addToCart={addToCart}
                  cart ={cart}
                />
              </div>
            )
          }
        )
      }
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    products: state.products,
    cart: state.cart
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, quantity) => {
      dispatch(addToCart(product, quantity))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
