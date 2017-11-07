import axios from 'axios'
import {removeFromCart, updateInventory} from './index'

const initialState = NaN
/**
 * ACTION TYPES
 */

const ADD_ORDER_ID = 'ADD_ORDER_ID';


/**
 * ACTION CREATORS
 */

export const addOrderId = order => ({ type: ADD_ORDER_ID, order });

/**
 * THUNK CREATORS
 */

export const fetchOrderId = userId =>
  dispatch =>
    axios.get(`/api/orders/${userId}`)
      .then(res =>{
        if(res.data){
          dispatch(addOrderId(res.data.id))
        }
      })
      .catch(console.error)

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
    .then(()=>{
      dispatch(removeFromCart(itemProductId))
      const updateInventoryThunk = updateInventory(itemProductId, updatedInventoryAmount);
      dispatch(updateInventoryThunk)
    })
    .catch(console.error);

  };

/**
 * REDUCER
 */

export default function (state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case ADD_ORDER_ID:
      return action.order;
    default:
      return state
  }
}
