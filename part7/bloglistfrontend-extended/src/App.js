import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import blogsService from './services/blogs'
import LoginLogout from './components/LoginLogout'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(loggedInUser))
      blogsService.setToken(loggedInUser.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user !== null) {
      const getBlogs = async () => {
        const listOfBlogs = await blogsService.getAll()
        dispatch(setBlogs(listOfBlogs.sort((a, b) => a.likes > b.likes ? -1 : 1)))
      }
      getBlogs()
    }
    else {
      dispatch(setBlogs([]))
    }
  }, [user])

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      {window.localStorage.getItem('loggedInUser')
        ?
          <div>
            <Link style={padding} to='/blogs'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            <LoginLogout/>
            <Routes>
              <Route path='/' element={<Navigate to='/blogs'/>}/>
              <Route path='/users' element={<Users/>}/>
              <Route path='/users/:id' element={<User/>}/>
              <Route path='/blogs' element={<BlogList/>}/>
              <Route path='/blogs/:id' element={<Blog/>}/>
              <Route path='*' element={<h1>404 page not found</h1>}/>
            </Routes>
          </div>
        :
          <div>
            <Link style={padding} to='/login'>login</Link>
            <Routes>
              <Route path='/' element={<Navigate to='/login'/>}/>
              <Route path='/login' element={<LoginLogout/>}/>
              <Route path='*' element={<h1>404 page not found</h1>}/>
            </Routes>
          </div>
      }
    </div>
  )
}

export default App
