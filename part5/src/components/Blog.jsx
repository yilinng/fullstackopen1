import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteItem }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLike = (blog) => {
    console.log('updateLike')
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = (blog) => {
    console.log(' deleteBlog')

    deleteItem(blog)
  }

  return (
    <div className='blog' style={blogStyle}>
      <p className='title'>{blog.title}</p>
      <Togglable buttonLabelH='view' buttonLabelS='hide'>
        <p className='url'>{blog.url}</p>

        <p className='likes_text'>
          likes {blog.likes}
          <button className='likeBtn' onClick={() => updateLike(blog)}>
            like
          </button>
        </p>

        <p className='author'>{blog.author}</p>
        <p>
          <button className='deleteBtn' onClick={() => deleteBlog(blog)}>
            remove
          </button>
        </p>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default Blog
