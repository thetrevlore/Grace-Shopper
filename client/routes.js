import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, Products, SingleProduct, Cart, Welcome, NotFound, OrderConfirmation} from './components'
import store, {me, fetchProducts, fetchCartOrder} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }


  componentWillMount() {
    const productsThunk = fetchProducts();
    const userThunk = me();
    store.dispatch(productsThunk);
    store.dispatch(userThunk);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextprops:", nextProps)
    console.log('userID from routes', store.getState().user.id);
    const userId = store.getState().user.id
    if(userId) {
      const getCartThunk = fetchCartOrder(store.getState().user.id);
      store.dispatch(getCartThunk)
    }
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/order-confirmation/:orderId" component={OrderConfirmation} />
            <Route path="/home" component={UserHome} />
            <Route component={NotFound} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
