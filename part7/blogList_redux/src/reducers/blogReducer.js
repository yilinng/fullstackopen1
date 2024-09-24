import blogService from '../services/blogs'
import { createSlice, current } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            console.log('append blog', current(state))
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },

        toggleLikes(state, action) {
            const id = action.payload
            const blogToChange = state.find((n) => n.id === id)
            console.log('blogToChange', blogToChange)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1,
            }

            console.log(' togglelikes', current(state))

            const updateState = state.map((blog) =>
                blog.id !== id ? blog : changedBlog,
            )
            return updateState.sort((a, b) => b.likes - a.likes)
        },
        deleteBlog(state, action) {
            const id = action.payload
            let filteredBlogs = state.filter((item) => item.id !== id)
            return filteredBlogs
        },
    },
})

/*
const blogReducer = (state = [], action) => {
    switch (action) {
        case 'ADD':
            return state.concat(action.payload)
        case 'GET':
            return action.payload
        case 'UPDATE':
            return state
        case 'DELETE':
            return state
        default:
            return state
    }
}
*/
export const initialBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (obj) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(obj)
        console.log('newblog', newBlog)
        dispatch(appendBlog(newBlog))
    }
}

export const updateBlog = (id, obj) => {
    return async (dispatch) => {
        await blogService.update(id, obj)
        dispatch(toggleLikes(id))
    }
}

export const deleteAction = (id) => {
    return async (dispatch) => {
        await blogService.deleteItem(id)
        dispatch(deleteBlog(id))
    }
}

export const sortBlogs = (...blogs) => {
    const sorted = blogs.sort((item1, item2) => item2.likes - item1.likes)
    return sorted[0]
}

export const { appendBlog, setBlogs, toggleLikes, deleteBlog } =
    blogSlice.actions

export default blogSlice.reducer
