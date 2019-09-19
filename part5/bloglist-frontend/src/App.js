import React, {useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

function App() {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null) 

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      setErrorStatus(true)
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setErrorStatus(null)
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    //console.log(blogObject)
    blogService
      .create(blogObject)
      .then(data => {

        setNotificationMessage('A new blog ' +  title + ' by ' +  author +  ' added')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setBlogs(blogs.concat(data))
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        Title: 
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url: 
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
      <div>
        Username: 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} error={errorStatus} />
      {user === null ?
        loginForm() :
          <div>
            <p> {user.name} logged in. 
            <button onClick={logoutHandler}>
              logout
            </button>
            </p>
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
}


export default App;
