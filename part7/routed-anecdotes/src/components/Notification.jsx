import React from 'react'

export default function Notification({ notification }) {
  const style = {
    display: notification ? 'block' : 'none',
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>a new anecdote {notification} created</div>
}
