import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h3>There's nothing here!</h3>
      <Link to="/products">Return to catalog.</Link>
    </div>
  )
};

export default NotFound;
