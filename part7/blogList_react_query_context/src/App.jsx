import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import LoginPage from './components/LoginPage'

function App() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [notification, dispatch] = useContext(NotificationContext)

  const newBlogMutaion = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      /*
      const blogList = queryClient.getQueryData({ queryKey: ['blogs'] })
      console.log('blogList', blogList)
      queryClient.setQueryData(
        { queryKey: ['blogs'] },
        blogList.concat(newBlog)
      )
        */
      dispatch({
        type: 'ADD_SUCCESS',
        payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
    onError: (exception) => {
      console.log('add failed expection', exception)
      dispatch({ type: 'ERROR', payload: exception.response.data.error })

      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
  })

  console.log('notification', notification)

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })

      dispatch({
        type: 'ADD_SUCCESS',
        payload: `a blog ${res.title} by ${res.author} updated`,
      })
      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
    onError: (exception) => {
      console.log('add failed expection', exception)
      dispatch({ type: 'ERROR', payload: exception.response.data.error })

      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
  })

  const deleteBlogMuation = useMutation({
    mutationFn: blogService.deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      /*
      dispatch({
        type: 'ADD_SUCCESS',
        payload: `a blog ${blog.title} by ${blog.author} is deleted`,
      })
      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
      */
    },
    onError: (exception) => {
      console.log('add failed expection', exception)
      dispatch({ type: 'ERROR', payload: exception.response.data.error })

      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
  })

  const loginMuation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      console.log('init users ', newUser)
      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
    },
    onError: (exception) => {
      console.log('add failed expection', exception)
      dispatch({ type: 'ERROR', payload: exception.response.data.error })

      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
  })

  const addCommentMuation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({
        type: 'ADD_SUCCESS',
        payload: `a blog comment${res.title} is added`,
      })
      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
    onError: (exception) => {
      console.log('add failed expection', exception)
      dispatch({ type: 'ERROR', payload: exception.response.data.error })

      setTimeout(() => {
        dispatch({ type: 'INITIAL_MEG' })
      }, 5000)
    },
  })

  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers(),
  })

  console.log('usersResult', JSON.parse(JSON.stringify(usersResult)))

  const blogFormRef = useRef()

  const blogsResult = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })
  console.log('blogResult', JSON.parse(JSON.stringify(blogsResult)))

  //https://stackoverflow.com/questions/63972318/rendered-more-hooks-than-during-the-previous-render-using-useeffect
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  if (blogsResult.isLoading) {
    return <div>loading blogs data...</div>
  }

  if (usersResult.isLoading) {
    return <div>loading users data...</div>
  }

  const users = usersResult.data

  const blogs = blogsResult.data

  const handleLogin = async (loginObject) => {
    loginMuation.mutate(loginObject)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT_SUCCESS' })
  }

  const addBlog = async (blogObject) => {
    console.log('add blogs', blogObject)
    newBlogMutaion.mutate(blogObject)
  }

  const handleUpdate = async (blogObject) => {
    updateBlogMutation.mutate({ ...blogObject })
  }

  const handleDelete = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      console.log('handleDelete')
      deleteBlogMuation.mutate(blog.id)
    }
  }

  const handleComment = (obj) => {
    console.log('handleComment ', obj)
    addCommentMuation.mutate(obj)
  }

  const sortBlogs = (...blogs) => {
    const sorted = blogs.sort((item1, item2) => item2.likes - item1.likes)
    return sorted[0]
  }

  const userInfo = () => (
    <p className='logged_div'>
      {notification.user.username} logged in
      <button className='logoutBtn' onClick={handleLogout}>
        logout
      </button>
    </p>
  )

  const padding = {
    padding: 5,
  }
  /*

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((blog) => blog.id === Number(match.params.id))
    : null

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((user) => user.id === Number(match.params.id))
    : null
  */
  return (
    <>
      <div className='navDiv'>
        <Link style={padding} to='/'>
          home
        </Link>
        <Link style={padding} to='/users'>
          UserList
        </Link>
        {notification.user !== null ? (
          userInfo()
        ) : (
          <Link style={padding} to='login' />
        )}
      </div>

      <h1>blogs</h1>
      <Notification
        errorMessage={notification.errorMessage}
        message={notification.message}
      />

      <Routes>
        <Route
          path='/blogs/:id'
          element={
            <Blog
              blogs={blogs}
              updateBlog={handleUpdate}
              deleteItem={handleDelete}
              handleComment={handleComment}
            />
          }
        />
        <Route
          path='/users/:id'
          element={<User users={users} blogs={blogs} />}
        />
        <Route
          path='/users'
          element={
            notification.user !== null ? (
              <UserList users={users} />
            ) : (
              <Navigate replace to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage user={notification.user} handleLogin={handleLogin} />
          }
        />

        <Route
          path='/'
          element={
            <BlogList
              blogs={blogs}
              user={notification.user}
              addBlog={addBlog}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
