import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Notification from './components/Notification'
import CountryPage from './components/CountryPage'
import Note from './components/Note'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        anecdotes
      </Link>
      <Link to='/create_new' style={padding}>
        create new
      </Link>
      <Link to='/about' style={padding}>
        about
      </Link>
      <Link to='/country_page' style={padding}>
        countryPage
      </Link>
      <Link to='/note' style={padding}>
        note
      </Link>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification()
    }, 5000)
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification notification={notification} />

        <Routes>
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/create_new' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
          <Route path='/country_page' element={<CountryPage />} />
          <Route path='/note' element={<Note />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
