import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}>/></Filter>
      
      <h3>Add a new</h3>

      <PersonForm onSubmit={addPerson} 
        nameValue={newName} 
        handleNameChange={handleNameChange} 
        numberValue={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App