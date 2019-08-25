import React from 'react'

const Total = ({course}) => {
    const exercises = () => course.parts.map(part =>
        part.exercises
    )
    
    const total = exercises().reduce( (s, p) => {
        return s+p
      })

    return(
        <p>Total of {total} exercises</p>
    )
}

export default Total