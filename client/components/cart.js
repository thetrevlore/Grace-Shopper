import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { removeFromCart } from '../store/index';
import CartList from './cartList';

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Your Cart</h2>
        <CartList items={this.props.cart} delete={this.props.removeFromCart}/>
        <div>
        <h4>Enter shipping information:</h4>
        <form className="addForm">
          <input type="text" name="firstName" placeholder="Enter first name..." /><br/>
          <input type="text" name="lastName" placeholder="Enter last name..." /><br/>
          <input type="text" name="address" placeholder="Enter address..." /><br/>
          <input type="submit" value="Place Order" /><br />
        </form>
        </div>
        <Link to="/products">Continue shopping.</Link>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({cart: state.cart});

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => {
      return dispatch(removeFromCart(product))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
