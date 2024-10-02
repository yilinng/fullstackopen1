import { useState, useEffect } from 'react'
import { USER } from '../queries'
import { useQuery } from '@apollo/client'

const BooksList = ({ books }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {books.map((a) => (
          <tr key={a.id}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Recommendations({ show }) {
  const [books, setBooks] = useState([])

  const result = useQuery(USER, {
    pollInterval: 2000,
  })

  console.log(result)

  useEffect(() => {
    if (result.data && result.data.me?.favoriteBook) {
      console.log('Recommendations result', result.data.me.favoriteBook)
      setBooks(result.data.me.favoriteBook)
    }
  }, [result.data])

  if (result.loading) {
    return 'data loading...'
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      {books.length ? (
        <BooksList books={books} />
      ) : (
        <p>"no books recommend can see"</p>
      )}
    </div>
  )
}
