import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, isCurrentUser }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDeleteButton = { display: isCurrentUser ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} onClick={toggleVisibility} className="titleAndAuthor">
        {blog.title} {blog.author}
      </div>

      <div style={showWhenVisible} className="togglableContent">
        <div  onClick={toggleVisibility}>
          {blog.title} {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={likeBlog}>Like</button>
        </div>
        <div>
          Added by {blog.author}
        </div>
        <div style={showDeleteButton}>
          <button onClick={deleteBlog}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog