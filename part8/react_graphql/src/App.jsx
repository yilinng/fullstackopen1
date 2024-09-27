import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_RESULTS } from './queries'
import Notify from './components/Notify'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_RESULTS, {
    pollInterval: 2000,
  })

  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  console.log('page', page)
  console.log(result)
  //{allAuthors: Array(5), allBooks: Array(7)}
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  /*
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <Login setToken={setToken} setError={notify} />
      </div>
    )
  }
  */
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        setError={notify}
      />

      <Books show={page === 'books'} books={result.data.allBooks} />

      {token ? (
        <NewBook show={page === 'add'} setError={notify} />
      ) : (
        <Login
          show={page === 'login'}
          setPage={setPage}
          setToken={setToken}
          setError={notify}
        />
      )}
    </div>
  )
}

export default App
