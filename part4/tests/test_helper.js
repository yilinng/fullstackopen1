const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'test title1',
    author: 'Aden Phon',
    url: '123@1243.com',
    likes: 5,
  },
  {
    title: 'test title2',
    author: 'Ben Tile',
    url: '222@1243.com',
    likes: 7,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'test title' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
