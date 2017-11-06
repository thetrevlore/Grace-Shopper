import React from 'react';

const CartList = (props) => {
  const cartItems = props.items;
  const { products } = props

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          cartItems &&
          cartItems.map((item, idx) => {
             return (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td><button onClick={()=>{
                  props.delete(item, products.filter(product => +product.id === +item.productId)[0])
                }
                }>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>)
}

export default CartList;
