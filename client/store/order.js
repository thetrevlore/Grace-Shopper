import axios from 'axios'

const initialState = []
/**
 * ACTION TYPES
 */

const ADD_ORDER = 'ADD_ORDER';
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'

/**
 * ACTION CREATORS
 */

const addOrder = order => ({ action: ADD_ORDER, order })
const getUserOrders = orders => ({type: GET_USER_ORDERS, orders})
const getSingleOrder = order => ({type: GET_SINGLE_ORDER, order})

/**
 * THUNK CREATORS
 */

export const postOrder = (order, history) => {
  return function postOrderThunk (dispatch, getState){
    axios.post('/api/orders', order)
      .then(res => res.data)
      .then((createdOrder) => {
        history.push(`/order-confirmation/${createdOrder.id}`); //this is a placeholder, we can push the page to an order confirmation later
      })
      .catch(console.error);
  };
}

export const fetchUserOrders = (userId) => {
  return function fetchUserOrdersThunk (dispatch) {
    axios.get(`/api/users/${userId}`)
    .then( res => res.data)
    .then((orders) => {
      dispatch(getUserOrders(orders))
    })
  .catch(err => console.log(err));
  }
}

export const fetchOrder = (orderId) => {
  return function fetchOrderThunk (dispatch) {
    axios.get(`/api/orders/${orderId}`)
    .then( res => res.data)
    .then((order) => {
      dispatch(getSingleOrder(order))
    })
  .catch(err => console.log(err));
  }
}

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order];
    case GET_USER_ORDERS:
      return action.orders;
    case GET_SINGLE_ORDER:
      return action.order;
    default:
      return state
  }
}
