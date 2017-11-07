import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct'
import { addToCart, postItemToCart } from '../store';

function Products (props) {
  const { products, addToCart, cart, value } = props;

  return (
    <div>
      <h1>Products</h1>
      <div className="all-products-container">
      {
        products.map(product => {
            return (
              <div key={product.id} className="single-product-container">
                <div>
                  <h3><span>{product.title}</span></h3>
                </div>
                <NavLink to={`/products/${product.id}`}>
                  <img src={product.photos[0]} width="200" height="200" />
                  <div>
                    <h5><span>{product.description}</span>
                    <span>{`$${product.price}`}</span></h5>
                  </div>
                </NavLink>
                <AddProduct
                  selectedProduct={product}
                  currentQuantityInCart={ cart[product.id] && cart[product.id].quantity || 0 }
                />
              </div>
            )
          }
        )
      }
      </div>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    products: state.products,
    cart: state.cart
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
