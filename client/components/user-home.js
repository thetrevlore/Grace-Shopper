import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Login} from './auth-form'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3 className="my-4">{email ? `Welcome, ${email}` : 'Please log in to view your account.'}</h3>
      {!email && <Login />}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
