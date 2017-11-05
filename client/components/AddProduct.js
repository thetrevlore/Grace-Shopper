import React from 'react'
import { addToCart } from '../store/cart'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function AddProduct (props) {
  let quantity = 0;

  const { inventoryAmount } = props.selectedProduct
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
      ownProps.history.push('/products')
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
