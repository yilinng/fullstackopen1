import React from 'react'
import LoginForm from './LoginForm'
import PropTypes from 'prop-types'

const loginForm = (handleLogin) => (
  <div className='loginForm'>
    <h2>Log in to application</h2>
    <LoginForm handleLogin={handleLogin} />
  </div>
)

const LoginPage = ({ user, handleLogin }) => {
  console.log('login page', user)

  return user === null && loginForm(handleLogin)
}

LoginForm.propTypes = {
  user: PropTypes.any,
  handleLogin: PropTypes.func.isRequired,
}

export default LoginPage
