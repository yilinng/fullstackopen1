import React from 'react'
import { useParams, Link } from 'react-router-dom'

export default function User({ users, blogs }) {
  const id = useParams().id
  const user = users.find((n) => n.id === id)

  const filteredeBlogs = blogs.filter((blog) => user.blogs.includes(blog.id))

  console.log('user', user)
  return (
    <div>
      User
      <h2>added blogs</h2>
      <ul>
        {filteredeBlogs.map((blog) => (
          <li>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
