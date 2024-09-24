import PropTypes from 'prop-types'
import { useField } from '../hooks/useField'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })

    handleReset()
  }

  const handleReset = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input {...title} />
      </div>

      <div>
        author:
        <input {...author} />
      </div>

      <div>
        url:
        <input {...url} />
      </div>
      <div className='button_list'>
        <button className='createBtn' type='submit'>
          create
        </button>
        <button className='resetBtn' type='reset' onClick={handleReset}>
          reset
        </button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
