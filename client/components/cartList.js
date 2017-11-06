import React from 'react';

const CartList = (props) => {
  const cartItems = props.items;
  const { products } = props
  const total = cartItems.reduce((acc, cur) => cur.quantity * cur.price, 0)

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
          <th></th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          cartItems &&
          cartItems.map((item, idx) => {
            console.log(item.price * item.quantity)
             return (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{item.price * item.quantity}</td>
                <td>{item.quantity}</td>
                <td><button onClick={()=>{
                  props.delete(item, products.filter(product => +product.id === +item.productId)[0])
                }
                }>&times;</button></td>
                <td></td>
                <td>{total}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>)
}

export default CartList;
