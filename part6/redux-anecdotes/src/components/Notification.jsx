import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    console.log('notification', notification)
    if (notification.value !== null) return notification.value
  })

  //notification default is undefind
  //console.log('notification', notification)
  const style = {
    display: notification ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return <div style={style}>{notification}</div>
}

export default Notification
