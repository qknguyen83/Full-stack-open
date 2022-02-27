import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import blogsService from '../services/blogs'
import { Form, Button, Row, Col } from 'react-bootstrap'

const CreateForm = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const addBlog = async (theBlog) => {
    try {
      const response = await blogsService.create(theBlog)

      console.log(theBlog)
      console.log(response)

      dispatch(setBlogs(blogs.concat(response).sort((a, b) => a.likes > b.likes ? -1 : 1)))

      dispatch(setNotification(`a new blog ${response.title} by ${response.author !== '' ? response.author : 'unknown author'} added successfully`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
    catch (error) {
      dispatch(setNotification('missing title and/or url'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()

    const title = event.target.titleInput.value
    const author = event.target.authorInput.value
    const url = event.target.urlInput.value

    event.target.titleInput.value = ''
    event.target.authorInput.value = ''
    event.target.urlInput.value = ''

    const newBlog = {
      ...title !== '' && { title: title },
      ...url !== '' && { url: url },
      author: author
    }

    addBlog(newBlog)
  }

  return (
    <div>
      <h5>create new</h5>
      <Form onSubmit={handleCreate}>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={1}>
            title
          </Form.Label>
          <Col sm={6}>
            <Form.Control className='title' name='titleInput'/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={1}>
            author
          </Form.Label>
          <Col sm={6}>
            <Form.Control className='author' name='authorInput'/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-2'>
          <Form.Label column sm={1}>
            url
          </Form.Label>
          <Col sm={6}>
            <Form.Control className='url' name='urlInput'/>
          </Col>
        </Form.Group>
        <Button className='mb-2' size='sm' type='submit' onMouseDown={event => event.preventDefault()}>create</Button>
      </Form>
    </div>
  )
}

export default CreateForm
