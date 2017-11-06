import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'

const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props
  const navStyle = {
    overflow: "hidden",
    backgroundColor: "white",
    position: "fixed", /* Set the navbar to fixed position */
    top: "0", /* Position the navbar at the top of the page */
    width: "100%" /* Full width */
  }

  const containerStyle = {
    paddingTop: "130px",
  }

  return (
    <div>
      <nav className="navBar" style={navStyle}>
        <Link to="/"><h1 id="navlogo">The Money Store</h1></Link>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/products">View Catalog</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/home">My Account</Link>
              <a href="#" onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/products">View Catalog</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
        }
      </nav>
      <hr />
  <div style={containerStyle}>
      {children}
  </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
};

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
