import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store/index';

const testDummy = {
  id: 2,
  title: 'US Dollar',
  description: 'Popular currency in the 20th and 21st centuries.',
  price: '9 btc',
  photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/US20-front.jpg/250px-US20-front.jpg'],
  inventoryAmount: 1111
}

export const SingleProduct = (props) => {
  // const itemId = props.match.params.id
  // const itemObj = props.products.filter((product) => {
  //   return product.id === itemId;
  // })

  return (
    <div>
      <h1>{testDummy.title}</h1>
      {
        testDummy.photos.map((photo) => (<span key={photo}>
          <img src={photo} width="200" />
          </span>))
      }
      <div>
        <h3>Description</h3>
        <p>{testDummy.description}</p>
      </div>
      <div>
        <h3>Price</h3>
        <p>{testDummy.price}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct))
