import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

//https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd
test('renders title', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author_test',
    url: 'test.test.com',
  }

  const updateBlog = jest.fn()

  const deleteItem = jest.fn()

  render(<Blog blog={blog} updateBlog={updateBlog} deleteItem={deleteItem} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()
})

test('after clicking the view button, children are displayed', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author_test',
    url: 'test.test.com',
  }

  const updateBlog = jest.fn()

  const deleteItem = jest.fn()

  const { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} deleteItem={deleteItem} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogDiv = container.querySelector('.blog')

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')

  expect(blogDiv).toHaveStyle('display: block')
  expect(title).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(author).toHaveTextContent('author_test')
})

test('after clicking the likes button twice, the event handler the component received as props is called twice.', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'author_test',
    url: 'test.test.com',
  }

  const updateLike = jest.fn()

  const deleteBlog = jest.fn()

  const { container } = render(
    <Blog blog={blog} updateBlog={updateLike} deleteItem={deleteBlog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveStyle('display: block')

  const likeBtn = screen.getByText('like')
  await user.click(likeBtn)
  await user.click(likeBtn)

  console.log('update.mock.calls', updateLike.mock)

  expect(updateLike.mock.calls).toHaveLength(2)
})
