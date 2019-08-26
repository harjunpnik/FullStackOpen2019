import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target.input)
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const personRows = () => persons.map (person =>
    <Person key={person.name} person={person} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input
            value={newName}
            onChange={handleNameChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personRows()}
    </div>
  )
}

export default App