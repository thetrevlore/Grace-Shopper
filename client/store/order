import axios from 'axios'

const intitialState = []
/**
 * ACTION TYPES
 */
const POST_ORDER = 'POST_ORDER';
const ADD_ORDER = 'ADD_ORDER';

/**
 * ACTION CREATORS
 */

const addOrder = order => ({ action: ADD_ORDER, order })

/**
 * THUNK CREATORS
 */


export const postOrder = (cart, history) =>

  function postOrderThunk (dispatch, getState){
    const { user, address } = getState();
    axios.post('/api/orders', {
      userId: user.id,
      orderItems: cart, //cart should be an array of item objects with title, id, quantity, price
      address: address
    })
      .then(() => {
        history.push('/products'); //this is a placeholder, we can push the page to an order confirmation later
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
