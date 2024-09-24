import { createSlice, current } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: 'ALL' },
  reducers: {
    filterChange(state, action) {
      console.log('filterSlice -> toggleVote ', action.payload)

      if (action.payload.length) {
        state.value = action.payload
        console.log('filterSlice -> toggleVote > 0', current(state))
        return state
      } else {
        state.value = 'ALL'
        console.log('filterSlice -> toggleVote', current(state))
        return state
      }
    },
  },
})

/*
const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      console.log('state', state)
      console.log('action.payload', action.payload)

      return action.payload
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReducer
*/
export const { filterChange } = filterSlice.actions

export default filterSlice.reducer
