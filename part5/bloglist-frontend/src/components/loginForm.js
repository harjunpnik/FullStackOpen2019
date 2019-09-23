import React from 'react'

const loginForm = ({ onSubmit, username, password }) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input
            type='username'
            value={username.value}
            name="Username"
            onChange={username.onChange}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password.value}
            name="Password"
            onChange={password.onChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default loginForm