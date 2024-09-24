import { createContext, useReducer } from 'react'

const initState = {
  message: null,
  errorMessage: null,
  user: null,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SUCCESS':
      return { ...state, message: action.payload }
    case 'INITIAL_MEG':
      return { ...state, message: null, errorMessage: null }
    case 'ERROR':
      return { ...state, errorMessage: action.payload }
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload }
    case 'LOGOUT_SUCCESS':
      return { ...state, user: null }
    case 'SET_USER':
      return { ...state, user: action.payload }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initState
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
