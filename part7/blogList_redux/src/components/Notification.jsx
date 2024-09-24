import PropTypes from 'prop-types'

const Notification = ({ errorMessage, message }) => {
    if (errorMessage !== null)
        return (
            <div className={errorMessage !== null ? 'error' : 'hide'}>
                {errorMessage}
            </div>
        )

    if (message !== null) {
        return (
            <div className={message !== null ? 'success' : 'hide'}>
                {message}
            </div>
        )
    }
}

Notification.propTypes = {
    errorMessage: PropTypes.string,
    message: PropTypes.string,
}

export default Notification
