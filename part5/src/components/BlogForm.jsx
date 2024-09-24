import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          className='title_input'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          type='text'
          className='author_input'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type='text'
          className='url_input'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className='createBtn' type='submit'>
        create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
