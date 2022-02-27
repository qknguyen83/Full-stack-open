const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SETNOTI':
      return action.payload
    case 'REMOVENOTI':
      return null
    default:
      return state
    }
}

export const setNotification = (payload) => {
  return {
    type: 'SETNOTI',
    payload: payload
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVENOTI'
  }
}

export default notificationReducer
