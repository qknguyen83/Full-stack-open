const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SETUSER':
      return action.payload
    case 'REMOVEUSER':
      return null
    default:
      return state
  }
}

export const setUser = (payload) => {
  return {
    type: 'SETUSER',
    payload: payload
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVEUSER'
  }
}

export default userReducer
