import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setSuccessNotification,
    setFailsNotification,
} from './reducers/notificationReducer'
import { createBlog, initialBlogs } from './reducers/blogReducer'
import { loginAction, checkToken, logoutAction } from './reducers/userReducer'

import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

function App() {
    const dispatch = useDispatch()

    const reducerState = useSelector((state) => state)
    // const [user, setUser] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initialBlogs())
        /*
        blogService.getAll().then((blogs) => {
            console.log('loading blogs', blogs)
            setBlogs(blogs.length > 1 ? sortBlogs(blogs) : blogs)
        })
        */
    }, [])

    useEffect(() => {
        dispatch(checkToken())
        /*
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
        */
    }, [])

    useEffect(() => {
        console.log('reducerState', reducerState)
    }, [reducerState])

    const handleLogin = async (loginObject) => {
        try {
            dispatch(loginAction(loginObject))
            /*
            const user = await loginService.login(loginObject)

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user),
            )

            blogService.setToken(user.token)
            setUser(user)
            */
        } catch (exception) {
            console.log('expection', exception.response.data.error)
            dispatch(setFailsNotification(exception.response.data.error, 100))
        }
    }

    const handleLogout = () => {
        console.log('handleLogout')

        dispatch(logoutAction())
        /*
        window.localStorage.clear()
        setUser(null)
        */
    }

    const addBlog = async (blogObject) => {
        try {
            blogFormRef.current.toggleVisibility()
            //  const blog = await blogService.create(blogObject)
            // setBlogs(blogs.concat(blog))
            dispatch(createBlog(blogObject))
            dispatch(
                setSuccessNotification(
                    `a new blog ${blogObject.title} by ${blogObject.author} added`,
                    100,
                ),
            )
        } catch (exception) {
            console.log('add failed expection', exception.response)
            dispatch(setFailsNotification(exception.response.data.error, 100))
        }
    }

    const loginForm = () => (
        <div className="loginForm">
            <h2>Log in to application</h2>
            <LoginForm handleLogin={handleLogin} />
        </div>
    )

    const blogForm = () => {
        return (
            <div className="blogForm">
                <Togglable
                    buttonLabelH="create new blog"
                    buttonLabelS="cancel"
                    ref={blogFormRef}
                >
                    <h2>create new</h2>
                    <BlogForm createBlog={addBlog} />
                </Togglable>
            </div>
        )
    }

    const userInfo = () => (
        <p>
            {reducerState.user.user.username} logged in
            <button className="logoutBtn" onClick={handleLogout}>
                logout
            </button>
        </p>
    )

    return (
        <div>
            <h1>blogs</h1>
            <Notification
                errorMessage={reducerState.notification.errorMessage}
                message={reducerState.notification.message}
            />
            {reducerState.user.user === null && loginForm()}
            {reducerState.user.user !== null && userInfo()}
            {reducerState.user.user !== null && blogForm()}
            {reducerState.user.user !== null && <BlogList />}
        </div>
    )
}

export default App
