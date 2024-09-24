const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id,
    })

    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog._id)
    await user.save()

    response.status(201).json(saveBlog)
  }
)

blogsRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body
    const user = request.user

    console.log('user.blogs update')

    if (user.blogs.includes(request.params.id)) {
      console.log('user.blogs.includes(request.params.id)')
      const updateBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
      )

      response.json(updateBlog)
    } else {
      console.log('user.blogs not includes(request.params.id)')

      response.status(400).json({ message: 'invalid user cannot update.' })
    }
  }
)

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    // get user from request object
    const user = request.user

    //  console.log('user blogs', user.blogs)
    //  console.log('user blogs', user.blogs.includes(request.params.id))

    const filterBlogs = user.blogs.filter(
      (blogId) => blogId.toString() !== request.params.id
    )

    //  console.log('filterBlogs', filterBlogs)

    if (user.blogs.includes(request.params.id)) {
      await Blog.findByIdAndDelete(request.params.id)
      await User.findByIdAndUpdate(user.id, { ...user, blogs: filterBlogs })
      response.status(204).end()
    } else {
      response.status(400).json({ message: 'invalid user cannot delete.' })
    }
  }
)

blogsRouter.put('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const { comments } = request.body
  blog.comments = blog.comments.concat(comments)

  const saveBlog = await blog.save()

  response.json(saveBlog)
})

module.exports = blogsRouter
