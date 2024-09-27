import { useState, useEffect } from 'react'

const Books = ({ show, books }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState()

  const styleBtn = {
    color: genre ? 'green' : 'black',
  }

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

  useEffect(() => {
    genresSplit()
  }, [])

  /*
  const genres = new Set()
  */

  const filtered = () => {
    if (!genre) return books
    return books.filter((book) => book.genres.includes(genre))
  }

  // console.log('filtered ', filtered())

  // console.log('filtered refactoring', filtered('refactoring'))

  console.log('genres', genres)
  console.log('genre', genre)
  console.log('books', books)
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
          </tr>
          {filtered().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
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
