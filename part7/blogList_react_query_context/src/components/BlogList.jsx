import { useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

export default function BlogList({ blogs, user, addBlog }) {
  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <div className='blogForm'>
        <Togglable
          buttonLabelH='create new blog'
          buttonLabelS='cancel'
          ref={blogFormRef}
        >
          <h2>create new</h2>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      {user !== null && blogForm()}
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}
