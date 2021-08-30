/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('Blog title doesnt contain the url, but only name and author', () => {

  const fakeBlog = {
    title: 'Fake Blog Title',
    author: 'Fake Author',
    url: 'www.fakeWeb.com',
    likes: 12
  }

  let component = render(
    <Blog blog={fakeBlog} />
  )
  expect(component.container.querySelector('.blogTitle')).not.toHaveTextContent('www.fakeWeb.com')
  expect(component.container.querySelector('.blogTitle')).not.toHaveTextContent(12)
})


