import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import Togglable from './components/Togglable'
import  { useField } from './hooks/index'

function App() {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  //const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  //const [url, setUrl] = useState('')
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
      //const username = username.value
      //const password = password.value
      const user = await loginService.login({
        username: username.fields.value,
        password: password.fields.value,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      console.log(user)
    } catch (exception) {
      password.reset()
      setErrorStatus(true)
      setNotificationMessage('Wrong username or password')
      setTimeout(() => {
        setErrorStatus(null)
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  //  ADD BLOG
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.fields.value,
      author: author.fields.value,
      url: url.fields.value,
      likes: 0,
    }

    //console.log(blogObject)
    blogService
      .create(blogObject)
      .then(data => {

        setNotificationMessage('A new blog ' +  blogObject.title + ' by ' +  blogObject.author +  ' added')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setBlogs(blogs.concat(data))
        title.reset()
        author.reset()
        url.reset()
      })
  }

  const likeBlog = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }


    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch (error => {
        console.log(error)
        //setPassword('')
        setErrorStatus(true)
        setNotificationMessage('That blog has already been removed from the server')
        setTimeout(() => {
          setErrorStatus(null)
          setNotificationMessage(null)
        }, 5000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const deleteBlog = (blog) => {
    if(window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + ' ?')){
      if( blog.user.username === user.username){
        blogService
          .remove(blog.id)
          .then( () => {
            setBlogs(blogs.filter(b =>
              b.id !== blog.id
            ))
          })
          .catch(error => {
            console.log(error)
            setErrorStatus(true)
            setNotificationMessage('Information of ' + blog.title + ' has already been removed from server')
            setTimeout(() => {
              setNotificationMessage(null)
              setErrorStatus(null)
            }, 5000)
          })
      }else{
        setErrorStatus(true)
        setNotificationMessage('You can only delete your own posted blogs')
        setTimeout(() => {
          setNotificationMessage(null)
          setErrorStatus(null)
        }, 5000)
      }
    }

  }

  const renderBlogs = () =>
    blogs.sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog.id)}
          deleteBlog={() => deleteBlog(blog)}
          isCurrentUser={ blog.user.username === user.username}
        />
      )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage} error={errorStatus} />
      {user === null ?
        <LoginForm
          onSubmit={handleLogin}
          password={password.fields}
          username={username.fields}
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
              title={title.fields}
              author={author.fields}
              url={url.fields}
            />
          </Togglable>
          {renderBlogs()}
        </div>
      }
    </div>
  )
}


export default App