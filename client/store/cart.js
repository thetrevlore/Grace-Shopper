/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */

const initialState = {}

/**
 * ACTION CREATORS
 */

export const addToCart = (product, quantity) => ({ type: ADD_TO_CART, product, quantity });
export const getCart = cart => ({ type: GET_CART, cart });
export const postItemToCart = (product, quantity) => {};
export const removeFromCart = productId => ({ type: REMOVE_FROM_CART, productId })

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
      const item = {
          title: action.product.title,
          quantity: action.quantity,
          price: action.product.price,
          photo: action.product.photos[0],
        }
      newState[action.product.id] = item
      return newState

    case GET_CART:
      return action.cart

    case REMOVE_FROM_CART:
      delete newState[action.productId]
      return newState

    default:
      return state
  }
}

