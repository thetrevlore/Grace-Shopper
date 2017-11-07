import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAllUsers} from '../store';

class AdminPanel extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getData();
    console.log(this.props);
  }

  render () {
    const {users, orders, products} = this.props.data;
    return (
      <div>
        <h3>Hello</h3>
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
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapState, mapDispatchToProps)(AdminPanel);

