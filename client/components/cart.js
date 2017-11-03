
'use strict';

import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
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
        <h1>Your mama's Cart</h1>
        <CartList items={this.props.cart}/>
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
