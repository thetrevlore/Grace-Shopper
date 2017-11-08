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
    paddingLeft: "35px"
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={navStyle}>
        <Link className="navbar-brand" to="/"><h1 id="navlogo">The Money Store</h1></Link>
        {
          isLoggedIn
            ? <div className="collapse navbar-collapse" id="navbarResponsive">
            {/* The navbar will show these links after you log in */}
              <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link className="nav-link" to="/products">View Catalog</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/home">My Account</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" onClick={handleClick}>Logout</a></li>
              </ul>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link className="nav-link" to="/products">View Catalog</Link>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Sign Up</Link>
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
