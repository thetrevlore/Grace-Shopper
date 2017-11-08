import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchOrder } from '../store'

export class SingleOrder extends Component {

  componentWillMount() {
    const orderId = this.props.match.params.id
    store.dispatch(fetchOrder(orderId))
  }

  render() {
    const { orderItems } = this.props;


    if (orderItems) {
      const total = orderItems.reduce((acc, cur) => acc += cur.quantity * cur.price, 0);
      const orderId = this.props.match.params.id;

    return (
      <div>
        <h4>Order {orderId}</h4>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              orderItems && orderItems.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}.00</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <h3>{`TOTAL: $${total}.00`}</h3>
      </div>
    )
  } else return <h3>No order to display</h3>
  }
}
/**CONTAINER*/

const mapState = (state) => {
  return {
    orderItems: state.order.orderItems || null
  }
}

const mapDispatchToProps = { fetchOrder }

export default withRouter(connect(mapState, mapDispatchToProps)(SingleOrder))
