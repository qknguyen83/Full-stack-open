const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SETBLOGS':
      return action.payload
    default:
      return state
  }
}

export const setBlogs = (payload) => {
  return {
    type: 'SETBLOGS',
    payload: payload
  }
}

export default blogReducer
