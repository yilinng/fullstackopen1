import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const Blog = ({ blogs, updateBlog, deleteItem, handleComment }) => {
  const comments = useField('text')

  const navigate = useNavigate()
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log('blog', blog)

  const updateLike = (blog) => {
    console.log('updateLike')
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = (blog) => {
    console.log(' deleteBlog')

    deleteItem(blog)
    navigate('/')
  }

  const commentAction = (event) => {
    event.preventDefault()
    handleComment({ ...blog, comments: comments.value })
    comments.onReset()
  }

  if (!blog) {
    return 'blog is undefind'
  }

  return (
    <div className='blog_div'>
      <div className='blog' style={blogStyle}>
        <h4 className='title'>{blog.title}</h4>
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

      <div className='comments_list'>
        <h4>comments</h4>
        <form onSubmit={commentAction}>
          <div className='input_comment'>
            <input {...comments} />
          </div>

          <button type='submit'>add comment</button>
        </form>

        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default Blog
