import React from 'react'

export default function Notification({ message, haveError }) {
  if (message === '') {
    return null
  }
  console.log('message', message)
  console.log('haveError', haveError)
  return <div className={haveError ? 'error' : 'success'}>{message}</div>
}
