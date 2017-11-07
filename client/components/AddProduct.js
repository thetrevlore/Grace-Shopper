import React from 'react'
import { addToCart, updateInventory, postToCart } from '../store'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AddProduct (props) {

  const { selectedProduct, handleSubmit, user } = props
  console.log('user!!!', user)
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
  };

  return (
    <div>
      <form>
        <select onChange={(e)=> quantity = +e.target.value} >
          {
            new Array(inventoryAmount + 1).fill(0)
              .map((_, index) => index)
              .map((amt) => <option key={amt} value={amt}>{amt}</option>)
          }
        </select>
      </form>
      <button onClick={() => { handleSubmit(selectedProduct, quantity, orderToPost, user.id) }}>
        Add to cart
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedProduct: ownProps.selectedProduct,
  orderId: state.orderId,
  user: state.user,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(selectedProduct, quantity, orderToSave, userId){
      const addToCartThunk = addToCart(selectedProduct, quantity)
      dispatch(addToCartThunk);
      const postToCartThunk = postToCart(orderToSave, userId, quantity)
      dispatch(postToCartThunk);
      selectedProduct.inventoryAmount-=quantity;
      console.log('UPDATEINVENTORYAMOUNT',selectedProduct.inventoryAmount)
      const updateInventoryThunk = updateInventory(selectedProduct.id, selectedProduct.inventoryAmount)
      dispatch(updateInventoryThunk);
      ownProps.history.push('/products');
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
