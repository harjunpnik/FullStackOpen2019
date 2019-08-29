import React, { useState, useEffect  } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
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
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })

    }else{
      if(window.confirm(personObject.name + ' is already added to the phonebook, replace the old number with a new one?')){
        const id = persons.find(person => person.name === personObject.name).id
        personService
          .update(id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.name === personObject.name ? personObject : person))
          })
      }
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

  const handlePersonDeletion = (person) => {
    if(window.confirm("Delete " + person.name + " ?")){
      personService
        .deletePerson(person.id)
        .then(response => {
          setPersons(persons.filter(pers =>
            person.id !== pers.id
          ))
        })
    }

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

      <Persons persons={persons} filter={filter} deletePerson={handlePersonDeletion}/>
    </div>
  )
}

export default App