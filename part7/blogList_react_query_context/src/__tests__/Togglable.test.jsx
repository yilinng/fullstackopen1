import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Togglable from '../components/Togglable'
import { render, screen } from '@testing-library/react'

describe('<Togglable />', () => {
  // const toggleVisibility = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabelH='show...' buttonLabelS='hide...'>
        <div className='testDiv'>togglable content</div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})
