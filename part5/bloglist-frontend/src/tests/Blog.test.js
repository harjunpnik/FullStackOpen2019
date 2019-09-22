import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from '@testing-library/react'
import Blog from '../components/Blog'

afterEach(cleanup)

describe('Blog', () => {

    let component

    beforeEach(() => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            url: "www.temporaryUrl.com",
            author: "Martin Reactsson",
            likes: 5
        }
        component = render(
            <Blog blog={blog}/>
        )
    })

    test('renders title and author and info is hidden from start', () => {
        component.debug()
        component.container.querySelector('.testDiv')

        expect(component.container).toHaveTextContent(
            'Component testing is done with react-testing-library'
        )

        expect(component.container).toHaveTextContent(
            'Martin Reactsson'
        )

        const div = component.container.querySelector('.togglableContent')
    
        expect(div).toHaveStyle('display: none')

    })

    test('When post is clicked show other info', () => {
        const divToClick = component.container.querySelector('.titleAndAuthor')
        fireEvent.click(divToClick)

        const div = component.container.querySelector('.togglableContent')
    
        expect(div).not.toHaveStyle('display: none')

    })
    


})
