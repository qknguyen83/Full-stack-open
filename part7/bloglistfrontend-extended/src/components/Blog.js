import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'
import { Form, Button, Row, Col } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id

  const blogs = useSelector(state => state.blogs)
  const blog = blogs.reduce((result, current) => current.id === id ? current : result, null)

  const updateLike = async () => {
    try {
      const response = await blogsService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      })

      const newBlogs = blogs.map(blog => blog.id !== response.id ? blog : { ...blog, likes: response.likes })

      dispatch(setBlogs(newBlogs.sort((a, b) => a.likes > b.likes ? -1 : 1)))
    }
    catch (error) {
      dispatch(setNotification(error.message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  const addComment = async (event) => {
    event.preventDefault()

    const newComment = event.target.commentInput.value

    event.target.commentInput.value = ''

    try {
      const response = await blogsService.comment({
        ...blog,
        comments: [ ...blog.comments, newComment ],
        user: blog.user.id
      })

      const newBlogs = blogs.map(blog => blog.id !== response.id ? blog : { ...blog, comments: response.comments })

      dispatch(setBlogs(newBlogs))
    }
    catch (error) {
      dispatch(setNotification(error.message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  const deleteBlog = async (theBlog) => {
    try {
      if (window.confirm(`delete blog ${theBlog.title} by ${theBlog.author !== '' ? theBlog.author : 'unknown author'}`)) {
        await blogsService.remove(theBlog)

        const newBlogs = blogs.filter(blog => blog.id !== theBlog.id)

        dispatch(setBlogs(newBlogs))

        navigate('/blogs')

        dispatch(setNotification(`blog ${theBlog.title} by ${theBlog.author !== '' ? theBlog.author : 'unknown author'} deleted successfully`))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 3000)
      }
    }
    catch (error) {
      dispatch(setNotification(error.message))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  return (
    <div>
      {blog &&
        <div>
          <h1 className='title'>
            {`${blog.title} ${blog.author}`}
          </h1>
          <p className='url'>
            url: {blog.url}
          </p>
          <p className='likes'>
            likes: {blog.likes} <Button className='like' size='sm' onClick={updateLike} onMouseDown={event => event.preventDefault()}>like</Button>
          </p>
          <p className='addedBy'>
            added by: {blog.user.name}
          </p>
          {blog.user !== undefined && blog.user.length !== 0 &&
            <Button className='delete' size='sm' onClick={() => deleteBlog(blog)} onMouseDown={event => event.preventDefault()}>delete</Button>
          }
          <h4>comments</h4>
          <Form onSubmit={addComment}>
            <Form.Group as={Row}>
                <Col>
                  <Form.Control name='commentInput'/>
                </Col>
                <Col>
                  <Button type='submit' onMouseDown={event => event.preventDefault()}>add comment</Button>
                </Col>
            </Form.Group>
          </Form>
          {blog.comments &&
            <ul>
              {blog.comments.map((comment, index) =>
                <li key={index}>{comment}</li>
              )}
            </ul>
          }
        </div>
      }
    </div>
  )
}

export default Blog
