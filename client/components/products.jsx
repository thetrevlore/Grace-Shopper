import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/index'

function Products (props) {
  const { products } = props;
  const divStyle = {
    position: "absolute"
  };

  return(
    <div>
      <h1>Products</h1>
      {
        products.map(product => {
            return (
              <div className="col-xs-4" key={product.id}>
                <button style={divStyle} className="btn" name="campusDelete" id={product.id} onClick={handleDeleteClick}>×</button>
                <NavLink className="thumbnail" to={`/products/${product.id}`}>
                  <img src={product.photos[0]} />
                  <div className="caption">
                    <h5><span>{product.title}</span></h5>
                  </div>
                </NavLink>
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
  }
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {

    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
