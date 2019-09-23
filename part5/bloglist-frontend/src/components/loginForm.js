import React from 'react'

const loginForm = ({ onSubmit, username, password }) => {
  return(
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <input {...username}/>
        </div>
        <div>
          Password:
          <input {...password}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default loginForm