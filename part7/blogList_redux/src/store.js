import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        notification: notificationReducer,
    },
})

export default store
