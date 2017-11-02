import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/index'

function Products (props) {
  const { products } = props;

  return(
    <div>
      <h1>Products</h1>
      {
        products.map(product => {
            return (
              <div key={product.id}>
                <NavLink to={`/products/${product.id}`}>
                  <img src={product.photos[0]} />
                  <div>
                    <h5><span>{product.title}</span></h5>
                  </div>
                </NavLink>
              </div>
            )
          }
        )
      }
     {
      //  <Route path="/products/:productId" render={(props) => <SingleProduct {...props} product={this.state.selectedProduct} />} />
      }
    </div>
  )
}



const mapStateToProps = function (state) {
  return {
    products: state.products,
  }
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {}

  }


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
