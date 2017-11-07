import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Login} from './auth-form'
import store, {fetchUserOrders} from '../store'

/**
 * COMPONENT
 */

// const total = cartItems.reduce((acc, cur) => acc += cur.quantity * cur.price, 0)

export class UserHome extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchUserOrders(this.props.id);
  }

  render () {
    const {email} = this.props
    console.log('state= ', this.state)
    console.log('props_ORDERSSSSS', this.props.orders)
  return (
    <div>
      {email
      ? <div>
          <h3> {`Welcome, ${email}`} </h3>
            <h4>Order History</h4>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                   {this.props.orders && this.props.orders.map((order, idx) => {
                      return (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.createdAt.slice(0,10)}</td>
                          <td>$100 hardcoded</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
        </div>
      : <div>
        <h3>Please log in to view your account</h3>
        <Login />
      </div>
    }
    </div>
  )}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    id: state.user.id,
    orders: state.order.orders || null
  }
}

const mapDispatchToProps = {fetchUserOrders}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
