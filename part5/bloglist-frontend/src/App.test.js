import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

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

  test('if user is logged in, show blogs', async () => {
    
    // Log in
    const user = {
      name: "Edgar Martionsson",
      token: "12345564",
      username: "testUser"
    }
  
      // console.log('logging in')
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  
   component = render(
      <App />
    )
    
    component.rerender(<App />)
    
    await waitForElement(
      () => component.getByText('login')
    )
    

    component.debug()

    await waitForElement(
        () => component.getByText('New blog')
    ) 
    const element = component.getByText('New blog')

    expect(element).toBeDefined()

    const blogs = component.container.querySelectorAll('.titleAndAuthor')
    expect(blogs.length).toBe(7) 


  })


})