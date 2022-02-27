import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      {visibility === true
        ?
        <div>
          {props.children}
          <Button className='mb-2' size='sm' onClick={toggleVisibility}>cancel</Button>
        </div>
        :
        <div>
          <Button className='mb-2' size='sm' onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
