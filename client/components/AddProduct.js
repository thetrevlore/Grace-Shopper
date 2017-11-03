import React, { Component } from 'react'
import axios from 'axios'

export default class AddProduct extends Component {

  constructor(props) {
    super(props)

    this.state = {
      quantity: 1
    }

    this.selectedProduct = this.props.selectedProduct
    this.productId = this.selectedProduct.id
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   axios.post('/api/cart', nextProps.cart)
  //     .catch(console.error)
  // }

  handleSelectChange(e) {
    this.setState({quantity: +e.target.value})
  }

  render() {
    const inventoryAmount = this.selectedProduct.inventoryAmount
    const buckets = [...Array(+inventoryAmount+1)]
    return (
      <div>
        <form>
          <select onChange={this.handleSelectChange} value={this.state.quantity}>
            {
              <option key={1} value={1}>{1}</option>
              // buckets.map((_, index) => index)
              //   .map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)
            }
          </select>
        </form>
        <button onClick={() => { this.props.addToCart(this.selectedProduct, this.state.quantity) }}>
          Add to cart
        </button>
      </div>
    )
  }
}
