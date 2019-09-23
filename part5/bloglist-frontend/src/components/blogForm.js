import React from 'react'

const blogForm = ({ onSubmit, title, author, url }) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input {...title}/>
      </div>
      <div>
        Author:
        <input {...author}/>
      </div>
      <div>
        Url:
        <input {...url}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default blogForm