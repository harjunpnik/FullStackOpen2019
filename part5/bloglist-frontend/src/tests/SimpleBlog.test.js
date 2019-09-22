import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from '@testing-library/react'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "React AB",
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog}/>
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  expect(component.container).toHaveTextContent(
    'React AB'
  )

  expect(component.container).toHaveTextContent(
    5
  )
   
})


test('Button is clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "React AB",
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  component.debug()

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
   
})