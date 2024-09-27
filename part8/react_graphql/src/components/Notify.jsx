const Notify = ({ errorMessage }) => {
  console.log('errorMsg', errorMessage)
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default Notify
