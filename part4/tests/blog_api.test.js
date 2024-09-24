const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token = ''
let userId = ''

jest.useRealTimers()

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root12', passwordHash })

  await user.save()

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user.id })
  )

  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)

  const blogsAtStart = await helper.blogsInDb()

  // console.log('init user', user)

  //update blogs in user

  user.blogs = user.blogs.concat(blogsAtStart[0].id)
  user.blogs = user.blogs.concat(blogsAtStart[1].id)

  await user.save()

  // console.log('after user', user)

  userId = user.id

  await api
    .post('/api/login')
    .send({ username: 'root12', password: 'sekret' })
    .then((data) => {
      //  console.log('data from login...', data.body.token)
      token = data.body.token
    })
})

describe('when there is initially one user in db', () => {
  test('blogs are returned as json', async () => {
    console.log('entered test')

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toEqual(helper.initialBlogs.length)
  })

  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((e) => e.title)
    expect(titles).toContain('test title1')
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Adden Trump',
      url: '111.111.com',
      user: userId,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).toContain('async/await simplifies making async calls')

    const likes = blogsAtEnd.map((r) => r.likes)

    expect(likes).toContain(0)
  })

  test('a invalid token blog cannot be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Adden Trump',
      url: '111.111.com',
      user: userId,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer null`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('invalid token')
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: '',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body.title).toEqual(blogToView.title)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toEqual(blogToDelete.title)
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length - 1)

    const userAtDb = await helper.usersInDb()
    const blogs = userAtDb[0].blogs

    expect(blogs).not.toContain(blogToDelete.id)
  })

  test('a valid blog can be update ', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const newBlog = {
      title: 'test title1 is update',
      author: blogToView.author,
      url: blogToView.url,
      likes: blogToView.likes,
    }

    await api
      .put(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).toContain('test title1 is update')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
