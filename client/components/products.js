import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import AddProduct from './AddProduct'
import { postItemToCart, addToCart } from '../store';

function Products (props) {

  const { products, cart } = props;

  return (
    <div>
      <h1>Products</h1>
      <div className="row">
      {
        products.map(product => (
          <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <div key={product.id} className="card h-100">
                <NavLink to={`/products/${product.id}`}><img className="card-img-top" src={product.photos[0]} width="300" height="130" /></NavLink>
                <div className="card-body">
                  <h4 className="card-title">{product.title}</h4>
                  <h5>{`$${product.price}`}</h5>
                  <div className="card-footer">
                    <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                  </div>
                </div>
                <AddProduct
                  selectedProduct={product}
                  currentQuantityInCart={ cart[product.id] && cart[product.id].quantity || 0 }
                />
              </div>
          </div>))}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product, quantity) => {
      dispatch(addToCart(product, quantity))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
