import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {
    const courseRows = () =>courses.map(course =>
        <Course 
        key={course.id}
        course={course}/>

    )

    return (
    <div>
        <h1>Web development curriculum</h1>
        {courseRows()}
    </div>
    )
}


export default App