import React from 'react'
import { addToCart, updateInventoryThunk } from '../store'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AddProduct (props) {

  let { currentQuantityInCart, selectedProduct, value } = props
  let quantity = 0;

  return (
    <div className="d-flex justify-content-around">
      <form>
        <button id="addToCart" onClick={() => { props.handleSubmit(selectedProduct, quantity) }}>
          Add to cart
        </button>
        <select onChange={(e)=> { quantity = +e.target.value }} >
          {
            new Array(selectedProduct.inventoryAmount + 1).fill(0)
              .map((_, index) => index).filter(amount => amount !== 0)
              .map((amt) => <option key={amt} value={amt}>{amt}</option>)
          }
        </select>
      </form>
      <h5>{`${selectedProduct.title}s in cart: ${currentQuantityInCart}`}</h5>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedProduct: ownProps.selectedProduct,
  cart: state.cart,
  value: ""
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit(selectedProduct, quantity){
      dispatch(addToCart(selectedProduct, quantity))
      selectedProduct.inventoryAmount-=quantity
      dispatch(updateInventoryThunk(selectedProduct))
      ownProps.history.push('/products')
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
