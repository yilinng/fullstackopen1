import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

export default function CreateNew(props) {
  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
    navigate('/')
  }

  const handleReset = () => {
    console.log('handleReset..')
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  )
}
