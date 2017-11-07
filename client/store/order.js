import axios from 'axios'
import {removeFromCart, updateInventory} from './index'

const initialState = 0
/**
 * ACTION TYPES
 */

const ADD_ORDER_ID = 'ADD_ORDER_ID';


/**
 * ACTION CREATORS
 */

export const addOrderId = orderId => ({ type: ADD_ORDER_ID, orderId });

/**
 * THUNK CREATORS
 */

export const postOrder = (order, history) =>

  function postOrderThunk (dispatch, getState){
    axios.post('/api/orders', order)
      .then(res=>res.data)
      .then((createdOrder) => {
        history.push(`/order-confirmation/${createdOrder.id}`); //this is a placeholder, we can push the page to an order confirmation later
      })
      .catch(console.error);
  };

export const removeItemFromOrder = (itemProductId, orderId, updatedInventoryAmount) =>
  dispatch => {
  axios.delete(`/api/order-items/${orderId}/${itemProductId}`)
    .catch(console.error)
    dispatch(removeFromCart(itemProductId))
    console.log('!!!!!!!!!!!!!!!!!!')
    const updateInventoryThunk = updateInventory(itemProductId, updatedInventoryAmount);
    dispatch(updateInventoryThunk)
  }

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER_ID:
      return action.orderId;
    default:
      return state
  }
}
