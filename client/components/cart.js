
'use strict';

import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store, {removeFromCart}from '../store/index';

const Cart = (props) => {
  return (
    <h1>Hello World</h1>
  );
}


const mapStateToProps = ({ cart }) => ({ cart });

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => {
      return dispatch(removeFromCart(product))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
