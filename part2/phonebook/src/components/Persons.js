import React from 'react'
import Person from './Person'

const Persons = ({persons, filter}) => {

    const personRows = () =>  persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())  
      ).map (person =>
        <Person key={person.name} person={person} />
      )

    return(
        <div>
            {personRows()}
        </div>
    )
}

export default Persons