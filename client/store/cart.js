/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'
const REMOVE_ONE = 'REMOVE_ONE'

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
export const removeOneFromCart = (product) => ({ type: REMOVE_ONE, product });

/**
 * THUNK CREATORS
 */


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
      return initialState;

    case REMOVE_ONE:
      if (newState[action.product.id]){
        newState[action.product.id].quantity -= 1;
      }
      return newState;

    default:
      return state
  }
}

