import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(!persons.map(person => person.name).includes(personObject.name)){
      setPersons(persons.concat(personObject))
    }else{
      alert(personObject.name + ' is already added to the phonebook')
    }
    setNewName('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const personRows = () =>  persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())  
  ).map (person =>
    <Person key={person.name} person={person} />
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with: 
          <input
            value={filter}
            onChange={handleFilterChange}
           />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>Name: 
          <input
            value={newName}
            onChange={handleNameChange}
           />
        </div>
        <div>Number: 
          <input
            value={newNumber}
            onChange={handleNumberChange}
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