import axios from 'axios'
import {fetchOrderId} from './index'

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
export const removeFromCart = itemProductId => ({ type: REMOVE_FROM_CART, itemProductId });
export const clearCart = () => ({ type: CLEAR_CART });

/**
 * THUNK CREATORS
 */

export const postToCart = (itemToPost, userId, quantity, product) =>

  function postOrderToCartThunk (dispatch, getState){
    itemToPost.quantity = quantity;
    axios.post(`/api/orders/${userId}`, itemToPost)
      .then(res=> {
        dispatch(addToCart(product, quantity));
        const order = JSON.parse(res.config.data)
        dispatch(fetchOrderId(order.userId))
        return res.data
      })
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
        const cart = {};
        fetchedOrder.orderItems.map(item =>{
          cart[+item.productId]=item
        })
        dispatch(getCart(cart))
        dispatch(addOrderId(fetchedOrder.id))
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
      delete newState[action.itemProductId]
      return newState

    case CLEAR_CART:
      return initialState;

    default:
      return state
  }
}

