import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
      blogsService.setToken(loggedInUser.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      const getBlogs = async () => setBlogs(await blogsService.getAll())
      getBlogs()
    }
    else {
      setBlogs([])
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({
        username: username,
        password: password
      })
  
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(response)
      )
  
      blogsService.setToken(response.token)
  
      setUser(response)
      
      setNotification('login successfully')
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      setUsername('')
      setPassword('')
    }
    catch (error) {
      setNotification('wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedInUser')

    setUser(null)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogsService.create({
        ...title !== '' && {title: title},
        ...url !== '' && {url: url},
        author: author
      })
  
      setBlogs(blogs.concat(newBlog))

      setNotification(`a new blog ${newBlog.title} by ${newBlog.author !== '' ? newBlog.author : 'unknown author'} added successfully`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)

      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch (error) {
      setNotification('missing title and/or url')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  return (
    <div>
      {user !== null
        ?
          <div>
            <h1>blogs</h1>
            <Notification message={notification}/>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
            <h1>create new</h1>
            <form onSubmit={handleCreate}>
              title <input value={title} onChange={handleTitleChange}/> <br/>
              author <input value={author} onChange={handleAuthorChange}/> <br/>
              url <input value={url} onChange={handleUrlChange}/> <br/>
              <button type='submit'>create</button>
            </form>
            {blogs.map(blog =>
              <p key={blog.id}>{blog.title} by {blog.author !== '' ? blog.author : 'unknown author'}</p>
            )}
          </div>
        :
          <div>
            <h1>login to application</h1>
            <Notification message={notification}/>
            <form onSubmit={handleLogin}>
              username <input value={username} onChange={handleUsernameChange}/> <br/>
              password <input value={password} onChange={handlePasswordChange}/> <br/>
              <button type='submit'>login</button>
            </form>
          </div>
      }
    </div>
  )
}

export default App
