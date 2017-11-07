import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers, fetchAllOrders, fetchAllProducts, makeAdmin} from '../store';
import AdminProducts from './adminProducts';
import AdminUsers from './adminUsers';

class AdminPanel extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getData();
  }

  render () {
    console.log("MY PROPSSSSSS", this.props)
    const {users, orders, products} = this.props.data;
    return (
      <div>
        <h3>Products</h3>
        <AdminProducts items={products} />
        <h3>Users</h3>
        <AdminUsers users={users} promote={this.props.promoteUser} />
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    data: state.admin
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getData(){
      dispatch(fetchAllUsers());
      dispatch(fetchAllProducts());
      dispatch(fetchAllOrders());
    },
    promoteUser(id) {
      dispatch(makeAdmin(id));
    }
  }
}

export default connect(mapState, mapDispatchToProps)(AdminPanel);

