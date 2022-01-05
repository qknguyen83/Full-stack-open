import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    else if (message.substring(0,5) === 'Added') {
        return (
            <div className='Added'>
                {message}
            </div>
        )
    }
    else {
        return (
            <div className='Alert'>
                {message}
            </div>
        )
    }
}

export default Notification