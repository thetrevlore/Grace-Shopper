import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Login} from './auth-form'
import {Link} from 'react-router-dom';
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
    const {orders} = this.props
  return (
    <div>
      {email
      ? <div>
          <h3>{`Welcome, ${email}`}</h3>
            <h4>Order History</h4>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>View Order</th>
                  </tr>
                </thead>
                <tbody>
                   {orders && orders.map((order, idx) => {
                      return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.createdAt.slice(0,10)}</td>
                            <td><Link to = {`home/orders/${order.id}`}>
                              {<img src='https://cdn3.iconfinder.com/data/icons/touch-gesture-outline/512/double_click_touch_click_finger_hand_select_gesture-512.png'
                              height = '30px'
                              width = '30px'/>}
                              </Link>
                            </td>
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
