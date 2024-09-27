import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_RESULTS } from '../queries'

export default function AuthorForm(props) {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_RESULTS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      setError(messages)
    },
  })

  useEffect(() => {
    console.log('result', result)
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found')
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    if (!name) {
      props.setError('name cannot be emtpy')
      return
    }

    if (!born) {
      props.setError('born cannot be emtpy')
      return
    }

    if (isNaN(Number(born))) {
      props.setError('born should be year.')
      // setError('published should be year.')
      return
    }

    editAuthor({
      variables: { name, born: Number(born) },
    })

    props.setError(null)
    setName('')
    setBorn('')
  }

  const handleName = (event) => {
    console.log(event.target.value)
    const targetName = props.authors.find(
      (author) => author.name === event.target.value
    )
    if (targetName) {
      setName(targetName.name)
    }
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select name='name' onChange={handleName}>
            {props.authors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}
