import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

//https://github.com/vitest-dev/vitest/issues/3160
//https://github.com/fullstack-hy2020/part2-notes-frontend/blob/part5-8/src/components/NoteForm.test.js
test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()

  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={addBlog} />)

  const title = container.querySelector('.title_input')
  const author = container.querySelector('.author_input')
  const url = container.querySelector('.url_input')

  const sendButton = screen.getByText('create')

  await user.type(title, 'testing a title...')
  await user.type(author, 'testing a author')
  await user.type(url, 'test@test.com')

  await user.click(sendButton)

  console.log('addBlog.mock.calls', addBlog.mock)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a title...')
})
