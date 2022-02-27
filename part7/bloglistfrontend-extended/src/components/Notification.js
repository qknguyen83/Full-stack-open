import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  if (message !== null) {
    if (message.includes('successfully')) {
      return <Alert className='mt-3' variant='success'>{message}</Alert>
    }

    return <Alert className='mt-3' variant='danger'>{message}</Alert>
  }

  return null
}

export default Notification
