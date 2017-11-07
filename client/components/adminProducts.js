import React from 'react';

const AdminProducts = (props) => {

  const products = props.items;

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Current Inventory</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
          products &&
          products.map((item, idx) => {
             return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{`$${item.price}`}</td>
                <td>{item.inventoryAmount}</td>
                <td><button onClick={() => { props.delete(item, products.filter(product => +product.id === +item.productId)[0])}
                }>&times;</button></td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </div>)
}

export default AdminProducts;
