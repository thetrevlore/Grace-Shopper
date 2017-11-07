import React, {Component} from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, {fetchOrder} from '../store'

export class SingleOrder extends Component {

  componentWillMount() {
    const orderId = this.props.match.params.id
    store.dispatch(fetchOrder(orderId))
  }

  render () {
    const {orderItems} = this.props
    return(
      <div>
        <h1>Single Order</h1>
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
            {orderItems && orderItems.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
      </div>
    )
  }
}
/**CONTAINER*/

const mapState = (state) => {
  return {
    orderItems: state.order.orderItems || null
  }
}

const mapDispatchToProps = {fetchOrder}

export default withRouter(connect(mapState, mapDispatchToProps)(SingleOrder))
