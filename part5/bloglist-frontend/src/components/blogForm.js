import React from 'react'

const blogForm = ({ onSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, title, author, url }) => {
  return(
    <form onSubmit={onSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default blogForm