import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers, fetchAllOrders, fetchAllProducts, makeAdmin} from '../store';
import AdminProducts from './adminProducts';
import AdminUsers from './adminUsers';
import {removeUser, deleteProduct} from "../store/admin";

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
        <AdminProducts items={products} delete={this.props.deleteProduct}/>
        <h3>Users</h3>
        <AdminUsers users={users} promote={this.props.promoteUser} remove={this.props.deleteUser} />
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
    },
    deleteUser(id){
      dispatch(removeUser(id))
    },
    deleteProduct(id){
      dispatch(deleteProduct(id))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(AdminPanel);

