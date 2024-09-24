
import { MessageEntry } from '../types/types'

export default function Info(props: MessageEntry) {

  if (props.message === null && props.error === null) {
    return null
  }

  const style = {
    color: props.error ? "red" : "green"
  }

  return (
    <div className='info' style={style}>
      <p>{ props.error? props.error : props.message}</p>
    </div>
  )
}
