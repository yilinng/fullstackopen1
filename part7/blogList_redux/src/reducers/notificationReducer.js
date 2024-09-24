import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: null,
        errorMessage: null,
    },
    reducers: {
        successAction(state, action) {
            state.message = action.payload
            return state
        },
        failAction(state, action) {
            state.errorMessage = action.payload
            return state
        },
        clearNotification(state) {
            return { message: null, errorMessage: null }
        },
    },
})

/*
const initialState = {
    message: null,
    errorMessage: null,
}

const notificationReducer = (state = initialState, action) => {
    console.log('action', action)
    switch (action.type) {
        case 'SUCCESS':
            return { ...state, message: action.payload.txt }
        case 'ERROR':
            return { ...state, errorMessage: action.payload.txt }
        case 'CLEAN':
            console.log('clean', state)
            return { message: null, errorMessage: null }
        default:
            return state
    }
}
*/
export const { successAction, failAction, clearNotification } =
    notificationSlice.actions

export const setSuccessNotification = (content, second) => {
    return (dispatch) => {
        dispatch(successAction(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, second * 100)
    }
}

export const setFailsNotification = (content, second) => {
    return (dispatch) => {
        dispatch(failAction(content))
        setTimeout(() => {
            dispatch(clearNotification())
        }, second * 100)
    }
}

export default notificationSlice.reducer
