import React from 'react'

const loginForm = ({onSubmit, handleUsernameChange, handlePasswordChange, username, password}) => {
    return(
        <div>
        <h2>Log in to application</h2>
        <form onSubmit={onSubmit}>
        <div>
          Username: 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password: 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default loginForm