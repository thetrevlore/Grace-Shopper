import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function OrderConfirmation(props){

    return (
      <div>
        <h2>Thanks {props.user.email}! Your order has been placed.</h2>
        <br />
        <h4>Your order number is: {props.match.params.orderId}</h4>
        <br />
        <Link to="/products">Continue shopping.</Link>
      </div>
    );
}


const mapStateToProps = (state) => ({
  user: state.user
});

export default withRouter(connect(mapStateToProps)(OrderConfirmation));
