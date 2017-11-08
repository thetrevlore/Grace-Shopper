import React from 'react';
import {Link} from 'react-router-dom';

const AdminOrders = (props) => {

  const orders = props.orders;

  return (
    <div>
    <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>View Order</th>
              </tr>
            </thead>
            <tbody>
                {orders && orders.map((order, idx) => {
                  return (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.userId}</td>
                        <td>{order.status}</td>
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
    </div>)
}

export default AdminOrders;

