import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginAction = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password,
    })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={loginAction}>
      <div>
        username
        <input
          type='text'
          value={username}
          id='username'
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          id='password'
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
