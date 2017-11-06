import React from 'react';

const CartList = (props) => {

  const { products } = props
  const cartItems = props.items;
  const total = cartItems.reduce((acc, cur) =>{ return cur.quantity * cur.price },0)

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
                <td>{`$${+item.price * (+item.quantity)}.00`}</td>
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
      <h3>{`TOTAL: $${total}.00`}</h3>
    </div>)
}

export default CartList;
