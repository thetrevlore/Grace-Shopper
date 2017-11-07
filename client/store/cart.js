import axios from 'axios'


/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART';
const GET_CART = 'GET_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

/**
 * INITIAL STATE
 */

const initialState = {}

/**
 * ACTION CREATORS
 */

export const addToCart = (product, quantity) => ({ type: ADD_TO_CART, product, quantity });
export const getCart = cart => ({ type: GET_CART, cart });
export const removeFromCart = itemId => ({ type: REMOVE_FROM_CART, itemId })
export const clearCart = () => ({ type: CLEAR_CART });

/**
 * THUNK CREATORS
 */

export const postToCart = (itemToPost, userId, quantity) =>

  function postOrderToCartThunk (dispatch, getState){
    itemToPost.quantity = quantity;
    axios.post(`/api/orders/${userId}`, itemToPost)
      .then(res=>res.data)
      .catch(console.error)
  };

export const saveCart = (order, orderId) =>

  function saveCartThunk (dispatch, getState){
    axios.put(`/api/orders/${orderId}`, order)
      .then(res=>res.data)
      .catch(console.error);
  };

export const fetchCartOrder = (userId) =>
  dispatch =>
    axios.get(`/api/orders/${userId}`)
      .then( res => res.data)
      .then( fetchedOrder => {
        dispatch(getCart(fetchedOrder.orderItems))
      })
      .catch(err => {});


/**
 * REDUCER
 */

export default function (state = initialState, action) {
  let newState = {...state}
  switch (action.type) {

    case ADD_TO_CART:
      if (newState[action.product.id]){
        newState[action.product.id].quantity = newState[action.product.id].quantity + action.quantity
      } else {
        const item = {
          title: action.product.title,
          quantity: action.quantity,
          price: action.product.price,
          photo: action.product.photos[0],
        }
        newState[action.product.id] = item
      }
      return newState

    case GET_CART:
      return action.cart

    case REMOVE_FROM_CART:
      delete newState[action.itemId]
      return newState

    case CLEAR_CART:
      return newState = {};

    default:
      return state
  }
}

