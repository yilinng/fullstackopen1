import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import { ALL_RESULTS, BOOK_ADD } from './queries'
import Notify from './components/Notify'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useEffect } from 'react'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    console.log('allbooks, ', allBooks)
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const result = useQuery(ALL_RESULTS, {
    pollInterval: 2000,
  })

  useSubscription(BOOK_ADD, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      //notify(`${addedBook.title} added`)
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_RESULTS }, addedBook)

      client.cache.updateQuery({ query: ALL_RESULTS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    },
  })

  const client = useApolloClient()

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
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const getToken = localStorage.getItem('user_token')
    if (getToken) setToken(getToken)
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
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

      <Books
        show={page === 'books'}
        books={result.data.allBooks}
        token={token}
        setError={notify}
      />

      {token ? (
        <>
          <NewBook show={page === 'add'} setError={notify} />
          <Recommendations
            show={page === 'recommendations'}
            books={result.data.allBooks}
          />
        </>
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
