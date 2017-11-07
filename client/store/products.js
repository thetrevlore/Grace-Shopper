import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
const UPDATE_INVENTORY = 'UPDATE_INVENTORY'

/**
 * ACTION CREATORS
 */
const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products })
const updateInventoryStore = (productId, updatedInventoryAmount) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  return ({type: UPDATE_INVENTORY, productId, updatedInventoryAmount })
}

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

export const updateInventory = (itemProductId, inventoryAmount) =>
  dispatch =>
    axios.put(`/api/products/${itemProductId}`, { inventoryAmount: inventoryAmount })
      .then( res => res.data)
      .then(() => {
        dispatch(updateInventoryStore(itemProductId.id, inventoryAmount))
      })
      .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function (products = [], action) {
  switch (action.type) {

    case UPDATE_INVENTORY:
      products.filter(product => product.id === action.productId)[0].inventoryAmount = action.updatedInventoryAmount
      return products

    case GET_ALL_PRODUCTS:
      return action.products;
    default:
      return products
  }
}
