import { useSelector, useDispatch } from 'react-redux'
import { toggleVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    console.log('AnecdoteList', filter)
    console.log('AnecdoteList filter.value', filter.value)

    if (filter.value === 'ALL') {
      return anecdotes
    } else {
      const filteredNotes = anecdotes.filter((note) =>
        note.content.includes(filter.value)
      )
      return filteredNotes
    }
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(toggleVote(anecdote.id))
    dispatch(setNotification(anecdote.content, 10))

    /*
    setTimeout(() => {
      console.log('hide notification')
      dispatch(clearNotification())
    }, 5000)
    */
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}
