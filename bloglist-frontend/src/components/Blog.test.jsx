import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

test('renders content', () => {
  const blog = {
    title: "Updated Blog Test",
    author: "Erik Supertramp",
    url: "testweb.com",
  }

  const handleLikes = () => {}
  const handleDelete = () => {}

  render(<Blog blog={blog} addLike={() => handleLikes(blog)} deleteBlog={() => handleDelete(blog)} />)

  const element = screen.getByText('Updated Blog Test')
  expect(element).toBeDefined()
})

test('After clicking the view button, info is displayed', async () => {
  let container

  container = render(
      <Togglable buttonLabel1="view" buttonLabel2="hide">
      <div className="testDiv" >
          togglable content
      </div>
      </Togglable>
    ).container


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')

})

test('Cliking like button 2 times', async () => {

  const blog = {
    title: "Updated Blog Test",
    author: "Erik Supertramp",
    url: "testweb.com",
  }

  const mockHandler = vi.fn()

  const handleDelete = () => {}

  render(<Blog blog={blog} addLike={mockHandler} deleteBlog={() => handleDelete(blog)} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})