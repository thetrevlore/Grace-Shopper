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
          <div>
            <h4>Order History</h4>

            <div>

              <h5>Order ID</h5>
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
                   {this.props.orders && this.props.orders.map((ordersArr, idx) => {




                      return ordersArr.orderItems.map((item, idx)=> {
                        return (
                          <tr key={idx}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                          </tr>
                        )
                      })


                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      : <div>
        <h3>Please log in to view your account</h3>
        <Login />
      </div>
    }
    </div>
  )
}

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
