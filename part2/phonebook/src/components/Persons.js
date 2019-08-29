import React from 'react'
import Person from './Person'

const Persons = ({persons, filter, deletePerson}) => {

    const personRows = () =>  persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())  
      ).map (person =>
        <Person key={person.name} person={person} deletePerson={deletePerson} />
      )

    return(
        <div>
            {personRows()}
        </div>
    )
}

export default Persons