import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('../services/__mocks__/blogs')
import App from '../App'

afterEach(cleanup)

describe('<App />', () => {

    let component

    beforeEach(() => {
        component = render(
            <App />
        )
    })


  test('if no user logged, blogs are not rendered', async () => {
    await waitForElement(
      () => component.getByText('login')
    ) 

    const element = component.getByText('login')

    expect(element).toBeDefined()

    const blogs = component.container.querySelectorAll('.titleAndAuthor')
    expect(blogs.length).toBe(0) 

  })


})