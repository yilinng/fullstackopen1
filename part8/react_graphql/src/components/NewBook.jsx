import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_RESULTS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // const [error, setError] = useState(null)

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_RESULTS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log('error', messages)
      props.setError(messages)
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_RESULTS }, ({ allBooks }) => {
        console.log('allBooks', allBooks)
        console.log(response)

        return {
          allBooks: allBooks.push(response.data.addBook),
        }
      })
    },
  })

  /*
  const result = useQuery(ADD_BOOK, {
    variables: { title, author, published, genre },
    skip: !title,
  })
  */
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    if (!title) {
      props.setError('title cannot be emtpy')
      return
    }

    if (!published) {
      props.setError('published cannot be emtpy')
      return
    }

    if (!author) {
      props.setError('author cannot be emtpy')
      return
    }

    if (!genres.length) {
      props.setError('genres cannot be emtpy')
      return
    }

    if (isNaN(Number(published))) {
      props.setError('published should be year.')
      // setError('published should be year.')
      return
    }

    addBook({
      variables: { title, author, published: Number(published), genres },
    })

    props.setError(null)
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
