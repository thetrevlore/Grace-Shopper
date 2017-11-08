import React from 'react'
import { addToCart, updateInventory, postToCart } from '../store'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AddProduct (props) {

  const { selectedProduct, handleSubmit, user, currentQuantityInCart } = props
  const { inventoryAmount } = selectedProduct;
  var quantity = 0;
  const orderToPost = {
    userId: user.id,
    email: user.email,
    status: 'Created',
    orderItem:{
      title: selectedProduct.title,
      productId: selectedProduct.id,
      price: selectedProduct.price
    }
  }

  return (
    <div>
      <form>
        <select onChange={(e)=> { quantity = +e.target.value }} >
          {
            new Array(selectedProduct.inventoryAmount + 1).fill(0)
              .map((_, index) => index)
              .map((amt) => <option key={amt} value={amt}>{amt}</option>)
          }
        </select>
      </form>
      <button onClick={() => { handleSubmit(selectedProduct, quantity, orderToPost, user.id, selectedProduct.id, selectedProduct.inventoryAmount - quantity) }}>
        Add to cart
      </button>
      <h5>{`${selectedProduct.title}s in cart: ${currentQuantityInCart}`}</h5>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedProduct: ownProps.selectedProduct,
  orderId: state.orderId,
  user: state.user,
  cart: state.cart,
  value: ""
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(selectedProduct, quantity, orderToSave, userId, selectedProductId, inventoryAmount){
      const postToCartThunk = postToCart(orderToSave, userId, quantity, selectedProduct);
      dispatch(postToCartThunk);
      const updateInventoryThunk = updateInventory(selectedProductId, inventoryAmount)
      dispatch(updateInventoryThunk);
      ownProps.history.push('/products');
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
