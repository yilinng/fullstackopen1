const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log('action', action)

  switch (action.type) {
    case 'GOOD':
      console.log('state good', state)
      return { ...state, good: state.good + 1 }
    //return state
    case 'OK':
      console.log('state ok', state)
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      console.log('state bad', state)
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      console.log('state zero', state)
      return { good: 0, ok: 0, bad: 0 }
    default:
      console.log('state default', state)
      return state
  }
}

export default counterReducer
