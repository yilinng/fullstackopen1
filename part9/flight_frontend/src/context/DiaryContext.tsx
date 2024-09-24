import { createContext, useReducer } from 'react'
import { ActionEntry, DiaryContextType, MessageEntry } from '../types/types'

//https://blog.logrocket.com/how-to-use-react-context-typescript/
//https://stackoverflow.com/questions/65889422/context-provider-in-typescript
const initState: MessageEntry = {
  message: null,
  error: null
}

const diraryReducer = (state: MessageEntry, action: ActionEntry): MessageEntry => {
  switch (action.type) {
  case "SUCCESS":
      return {error: null , message: action.payload}
  case "FAIL":
      return {message: null, error: action.payload }  
  case "CLEAN":
     return { message: null, error: null }  
  default:
    return state  
  }
    
}

const DiaryContext = createContext<DiaryContextType | null>(null)

export const DiaryContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
  const [info, infoDispatch] = useReducer(diraryReducer, initState)

  const successAction = (info: MessageEntry): void => infoDispatch({ type: "SUCCESS", payload: info.message })
  
  const failAction = (info: MessageEntry): void => infoDispatch({ type: "FAIL", payload: info.error })
  
  const cleanAction =  (info: MessageEntry): void => infoDispatch({ type: "CLEAN", payload: info.message })

  return (
    <DiaryContext.Provider value={{ info, successAction, failAction,  cleanAction }}>
       {props.children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext