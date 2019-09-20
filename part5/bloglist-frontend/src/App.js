import React, {useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'

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

  //  LOGIN
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
      setPassword('')
      setErrorStatus(true)
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setErrorStatus(null)
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const logoutHandler = (event) => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  //  ADD BLOG
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const likeBlog = async id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1}

    try{
      blogService
      .update(id, changedBlog)
      .then(returnedBlog =>{
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
    }catch (exception) {
      setPassword('')
      setErrorStatus(true)
      setNotificationMessage("That blog has already been removed from the server")
      setTimeout(() => {
        setErrorStatus(null)
        setNotificationMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const renderBlogs = () => blogs.sort((a, b) => b.likes - a.likes).map(blog =>
    <Blog 
      key={blog.id} 
      blog={blog}
      likeBlog={() => likeBlog(blog.id)} 
    />
  )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} error={errorStatus} />
      {user === null ?
        <LoginForm
          onSubmit={handleLogin} 
          handleUsernameChange={handleUsernameChange} 
          handlePasswordChange={handlePasswordChange} 
          username={username} 
          password={password} 
        /> :
          <div>
            <p> {user.name} logged in. 
            <button onClick={logoutHandler}>
              logout
            </button>
            </p>
            <Togglable buttonLabel="New blog">
              <BlogForm 
                onSubmit={addBlog}
                handleTitleChange={handleTitleChange}
                handleAuthorChange={handleAuthorChange}
                handleUrlChange={handleUrlChange}
                title={title}
                author={author}
                url={url}
              />
            </Togglable>
            {renderBlogs()}
          </div>
      }
    </div>
  )
}


export default App;
