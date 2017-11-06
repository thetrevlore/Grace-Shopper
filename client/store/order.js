import axios from 'axios'

const initialState = []
/**
 * ACTION TYPES
 */

const ADD_ORDER = 'ADD_ORDER';
const GET_USER_ORDERS = 'GET_USER_ORDERS'

/**
 * ACTION CREATORS
 */

const addOrder = order => ({ action: ADD_ORDER, order })
const getUserOrders = orders => ({type: GET_USER_ORDERS, orders})

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

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order];
    case GET_USER_ORDERS:
      return action.orders;
    default:
      return state
  }
}
