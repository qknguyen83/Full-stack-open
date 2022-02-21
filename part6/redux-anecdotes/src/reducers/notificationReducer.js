import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return ''
    }
  }
})

export const { set, remove } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(set(message))
    setTimeout(() => dispatch(remove()), duration * 1000)
  }
}

export default notificationSlice.reducer
