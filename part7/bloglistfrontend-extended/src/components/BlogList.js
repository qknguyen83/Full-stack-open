import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import CreateForm from '../components/CreateForm'
import Notification from './Notification'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Notification message={notification}/>
      <h1>blogs</h1>
      <Togglable buttonLabel='create new blog'>
        <CreateForm/>
      </Togglable>
      <div id='listOfBlogs'>
        {blogs.map(blog => {
          return (
            <div key={blog.id} className='blog' style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BlogList
