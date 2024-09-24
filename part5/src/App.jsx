import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      console.log('loading blogs', blogs)
      console.log('sortedblog', sortBlogs(blogs))

      setBlogs(blogs.length > 1 ? sortBlogs(blogs) : blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('expection', exception.response.data.error)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      console.log('blog', blog)
      setBlogs(blogs.concat(blog))

      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('add failed expection', exception.response)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUpdate = async (id, blogObject) => {
    try {
      console.log('handleUpdate')
      let updateBlog = await blogService.update(id, blogObject)

      console.log('updateblog', updateBlog)
      //update blogs
      let updatedBlogs = blogs.map((blog) => {
        if (blog.id === id) {
          return updateBlog
        } else {
          return blog
        }
      })

      setBlogs(sortBlogs(updatedBlogs))

      setMessage(`a blog ${blogObject.title} by ${blogObject.author} updated`)

      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('expection', exception)
      // setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        console.log('handleDelete')

        await blogService.deleteItem(blog.id)

        let filteredBlogs = blogs.filter((item) => item.id !== blog.id)

        setBlogs(sortBlogs(filteredBlogs))

        setMessage(`a blog ${blog.title} by ${blog.author} is deleted`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        console.log('expection', exception)
        // setErrorMessage(exception.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const sortBlogs = (...blogs) => {
    const sorted = blogs.sort((item1, item2) => item2.likes - item1.likes)
    return sorted[0]
  }

  const loginForm = () => (
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )

  const blogForm = () => {
    return (
      <div className='blogForm'>
        <Togglable
          buttonLabelH='create new blog'
          buttonLabelS='cancel'
          ref={blogFormRef}
        >
          <h2>create new</h2>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const blogsList = () => (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={handleUpdate}
          deleteItem={handleDelete}
        />
      ))}
    </div>
  )

  const userInfo = () => (
    <p>
      {user.username} logged in
      <button className='logoutBtn' onClick={handleLogout}>
        logout
      </button>
    </p>
  )

  return (
    <div>
      <h1>blogs</h1>
      <Notification errorMessage={errorMessage} message={message} />
      {user === null && loginForm()}
      {user !== null && userInfo()}
      {user !== null && blogForm()}
      {user !== null && blogs.length && blogsList()}
    </div>
  )
}

export default App
