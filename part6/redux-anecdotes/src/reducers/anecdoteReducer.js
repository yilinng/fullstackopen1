import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleVote(state, action) {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        votes: noteToChange.votes + 1,
      }

      console.log(' toggleVote', current(state))

      const updateState = state.map((note) =>
        note.id !== id ? note : changedNote
      )
      return updateState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

/*
const reducer = (state = initialState, action) => {
  console.log('state now init: ', state)
  console.log('action', action)

  // console.log('sortNote', state)

  switch (action.type) {
    case 'VOTE':
      const updateState = state.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, votes: obj.votes + 1 }
        } else {
          return obj
        }
      })
      return updateState.sort((a, b) => b.votes - a.votes)

    case 'NEW_NOTE':
      return state.concat(action.payload)
    default:
      return state
  }
}

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      id: getId(),
      votes: 0,
    },
  }
}

export const toggleVote = (id) => {
  return {
    type: 'VOTE',
    payload: { id },
  }
}
*/
export const { toggleVote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
