import axios from 'axios'

const initialState = []
/**
 * ACTION TYPES
 */

const ADD_ORDER = 'ADD_ORDER';

/**
 * ACTION CREATORS
 */

const addOrder = order => ({ action: ADD_ORDER, order })

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
/**
 * REDUCER
 */

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order];
    default:
      return state
  }
}
