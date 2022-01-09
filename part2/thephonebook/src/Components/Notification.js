import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    else if (message.substring(0,5) === 'Added' || message.substring(0,7) === 'Updated') {
        return (
            <div className='Green'>
                {message}
            </div>
        )
    }
    else {
        return (
            <div className='Red'>
                {message}
            </div>
        )
    }
}

export default Notification