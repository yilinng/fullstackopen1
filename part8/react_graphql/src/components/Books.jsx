import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  FIND_BOOK,
  ADD_BOOK_TO_FAVORITE,
  ALL_RESULTS,
  USER,
  REMOVE_BOOK_FROM_FAVORITE,
} from '../queries'

const Books = ({ show, books, token, setError }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(undefined)
  const [likes, setLikes] = useState([])

  const result = useQuery(FIND_BOOK, {
    variables: { genres: genre },
    skip: !genre,
  })

  const result_user = useQuery(USER, {
    pollInterval: 2000,
  })

  const [addBookToFavorite] = useMutation(ADD_BOOK_TO_FAVORITE, {
    refetchQueries: [{ query: ALL_RESULTS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log('error', messages)
      setError(messages)
    },
    onCompleted: (res) => {
      console.log('oncomplete', res)
    },
  })

  const [removeBookFromFavorite] = useMutation(REMOVE_BOOK_FROM_FAVORITE, {
    refetchQueries: [{ query: ALL_RESULTS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n')
      console.log('error', messages)
      setError(messages)
    },
    onCompleted: (res) => {
      console.log('oncomplete', res)
    },
  })

  const genresSplit = () => {
    books.map((book) =>
      book.genres.map((item) => {
        if (!genres.includes(item)) {
          genres.push(item)
          setGenres(genres)
        }
      })
    )
  }

  const findLikeBook = (id) => {
    return likes.find((like) => like.id === id)
  }

  const handleAdd = (id) => {
    console.log('handleAdd', id)
    if (findLikeBook(id)) {
      console.log('remove book from favorite')
      removeBookFromFavorite({
        variables: { id },
      })
    } else {
      console.log('add book to favorite')
      addBookToFavorite({
        variables: { id },
      })
    }
  }

  useEffect(() => {
    genresSplit()
  }, [books])

  useEffect(() => {
    if (result_user.data && result_user.data.me?.favoriteBook) {
      console.log('user result', result_user.data.me.favoriteBook)
      setLikes(result_user.data.me.favoriteBook)
    } else {
      setLikes([])
    }
  }, [result_user.data])

  if (genre && result.data) {
    console.log('genres', result.data.findBooks)
    books = result.data.findBooks
  }

  /*
  const filtered = () => {
    if (!genre) return books
    return books.filter((book) => book.genres.includes(genre))
  }
  */

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            {token && <th>like</th>}
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              {token && (
                <td>
                  <button onClick={() => handleAdd(a.id)}>
                    {findLikeBook(a.id) ? 'liked' : 'like'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='genresList'>
        {genres.map((item) => (
          <button
            className={genre === item ? 'selectBtn' : 'unselectBtn'}
            key={item}
            onClick={() => setGenre(genre === item ? undefined : item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
