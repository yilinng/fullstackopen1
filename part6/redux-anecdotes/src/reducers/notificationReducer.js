import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    value: null,
  },
  reducers: {
    voteAction(state, action) {
      state.value = action.payload
      return state
    },
    clearNotification(state) {
      state.value = null
      return state
    },
  },
})

export const { voteAction, clearNotification } = notificationSlice.actions

export const setNotification = (content, second) => {
  return (dispatch) => {
    dispatch(voteAction(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, second * 100)
  }
}

export default notificationSlice.reducer
