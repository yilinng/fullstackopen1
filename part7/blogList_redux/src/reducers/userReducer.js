import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSlice, current } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
            return state
        },
        initialUser(state, action) {
            state.user = null
            return state
        },
    },
})

export const loginAction = (obj) => {
    return async (dispatch) => {
        const user = await loginService.login(obj)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

        blogService.setToken(user.token)
        dispatch(setUser(user))
    }
}

export const checkToken = () => {
    return (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        console.log('logoutAction')
        window.localStorage.clear()
        dispatch(initialUser())
    }
}

export const { setUser, initialUser } = userSlice.actions

export default userSlice.reducer
