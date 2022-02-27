import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser, removeUser } from '../reducers/userReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from './Notification'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'

const LoginLogout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.usernameInput.value
    const password = event.target.passwordInput.value

    event.target.usernameInput.value = ''
    event.target.passwordInput.value = ''

    try {
      const response = await loginService.login({
        username: username,
        password: password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(response)
      )

      blogsService.setToken(response.token)

      dispatch(setUser(response))

      navigate('/')

      dispatch(setNotification('login successfully'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
    catch (error) {
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(removeUser())
    navigate('/')
  }

  if (user !== null) {
    return (
      <em>
        {user.name} logged in <Button id='logout' variant='outline-primary' size='sm' onClick={handleLogout} onMouseDown={event => event.preventDefault()}>logout</Button>
      </em>
    )
  }

  return (
    <div>
      <h1>login to application</h1>
      <Notification message={notification}/>
      <Form id='loginForm' onSubmit={handleLogin}>
        <Row>
          <Col xs={6}>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control id='username' name='usernameInput'/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <Form.Label>username</Form.Label>
              <Form.Control id='password' name='passwordInput' type='password'/>
            </FormGroup>
          </Col>
        </Row>
        <Button className='mt-2' id='login' type='submit' onMouseDown={event => event.preventDefault()}>login</Button>
      </Form>
    </div>
  )
}

export default LoginLogout
