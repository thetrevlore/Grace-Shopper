import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import store from '../store/index';

const testDummy = {
  id: 2,
  title: 'US Dollar',
  description: 'Popular currency in the 20th and 21st centuries.',
  price: '9 btc',
  photos: ['https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/US20-front.jpg/250px-US20-front.jpg', 'https://cdn.jmbullion.com/wp-content/uploads/2013/09/peace-silver-dollar.jpg'],
  inventoryAmount: 1111
}


export const SingleProduct = (props) => {
  const {item} = props;

  return (
    <div>
      <h1>{testDummy.title}</h1>
      {
        testDummy.photos.map((photo) => (<span>
          <img src={photo} key={Math.random()} width='200' />
          </span>))
      }
      <img href={testDummy.photos[0]} />
    </div>
  )
}