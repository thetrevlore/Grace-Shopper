import React from 'react'
import { addToCart, updateInventoryThunk } from '../store'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AddProduct (props) {
  let quantity

  const { inventoryAmount } = props.selectedProduct
  return (
    <div>
      <form>
        <select onChange={(e)=> quantity = +e.target.value} >
          {
            new Array(inventoryAmount+1).fill()
              .map((_, index) => index)
              .map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
          }
        </select>
      </form>
      <button onClick={() => { props.handleSubmit(props.selectedProduct, quantity) }}>
        Add to cart
      </button>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  selectedProduct: ownProps.selectedProduct
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
