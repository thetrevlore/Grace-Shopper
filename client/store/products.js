import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const UPDATE_INVENTORY = 'UPDATE_INVENTORY';

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products })
const updateInventory = product => ({type: UPDATE_INVENTORY, product });

/**
 * THUNK CREATORS
 */

export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then( res => res.data)
      .then( fetchedProducts => {

        dispatch(getAllProducts(fetchedProducts))
      })
      .catch(err => console.log(err));

export const updateInventoryThunk = (selectedProduct) =>
  dispatch =>
    axios.put(`/api/products/${selectedProduct.id}`, { inventoryAmount: +selectedProduct.inventoryAmount })
      .then( res => res.data)
      .then(() => {
        dispatch(updateInventory(selectedProduct))
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (products = [], action) {
  switch (action.type) {

    case UPDATE_INVENTORY:
      products.filter(product => product.id === action.product.id)[0].inventoryAmount = action.product.inventoryAmount
      return products

    case GET_ALL_PRODUCTS:
      return action.products;


    default:
      return products
  }
}
