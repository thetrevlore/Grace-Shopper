import axios from 'axios';

/**
 * ACTION TYPES
 */

const GET_ALL_USERS = 'GET_ALL_USERS';
const GET_ALL_ORDERS = 'GET_ALL_ORDERS';
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const PROMOTE_USER = 'PROMOTE_USER';
const DELETE_USER = 'DELETE_USER';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';


/**
 * INITIAL STATE
 */

const adminData = {
  users: [],
  products: [],
  orders: []
}

/**
 * ACTION CREATORS
 */

const getAllUsers = (users) => ({type: GET_ALL_USERS, users});
const getAllOrders = (orders) => ({type: GET_ALL_ORDERS, orders});
const getAllProducts = (products) => ({type: GET_ALL_PRODUCTS, products});
const promoteUser = (user) => ({type: PROMOTE_USER, user});
const deleteUser = (userId) => ({type: DELETE_USER, userId});
const removeProduct = (productId) => ({type: REMOVE_PRODUCT, productId });


/**
 * THUNK CREATORS
 */
export const fetchAllUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then(res => {
        dispatch(getAllUsers(res.data));
      })
      .catch(err => console.log(err))

export const fetchAllOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => {
        dispatch(getAllOrders(res.data));
      })
      .catch(err => console.log(err))

export const fetchAllProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => {
        dispatch(getAllProducts(res.data));
      })
      .catch(err => console.log(err))

export const makeAdmin = (id) =>
  dispatch =>
    axios.put(`api/users/${id}`, {isAdmin: true})
      .then(res => dispatch(promoteUser(res.data)))
      .catch(err => console.log(err))

export const removeUser = (id) =>
  dispatch =>
    axios.delete(`api/users/${id}`)
      .then(res => dispatch(deleteUser(id)))
      .catch(err => console.log(err))

export const deleteProduct = (id) =>
  dispatch =>
    axios.delete(`api/products/${id}`)
      .then(res => dispatch(removeProduct(id)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = adminData, action) {

  switch (action.type) {
    case GET_ALL_USERS:
      return Object.assign({}, state, {users: action.users});
    case GET_ALL_ORDERS:
      return Object.assign({}, state, {orders: action.orders});
    case GET_ALL_PRODUCTS:
      return Object.assign({}, state, {products: action.products});
    case PROMOTE_USER:
      return Object.assign({}, state, {users: state.users.filter(user => user.id !== action.user.id).concat(action.user)});
    case DELETE_USER:
      return Object.assign({}, state, {users: state.users.filter(user => user.id !== action.userId)});
    case REMOVE_PRODUCT:
      return Object.assign({}, state, {products: state.products.filter(product => product.id !== action.productId)});
    default:
      return state
  }
}
