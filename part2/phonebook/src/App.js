import React, { useState, useEffect  } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(null)

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
          setNotificationMessage("Added " + personObject.name)
          setTimeout(() => {
            setNotificationMessage(null)
            setErrorStatus(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorStatus(true)
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
            setErrorStatus(null)
          }, 5000)
        })

    }else{
      if(window.confirm(personObject.name + ' is already added to the phonebook, replace the old number with a new one?')){
        const id = persons.find(person => person.name === personObject.name).id
        personService
          .update(id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.name === personObject.name ? personObject : person))
            setNotificationMessage("Changed number of " + personObject.name)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          }) 
          .catch(error => {
            setErrorStatus(true)
            setNotificationMessage("Information of " + personObject.name + " has already been removed from server")
            setTimeout(() => {
              setNotificationMessage(null)
              setErrorStatus(null)
            }, 5000)
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
        .catch(error => {            
          setErrorStatus(true)
          setNotificationMessage("Information of " + person.name + "has already been removed from server")
          setTimeout(() => {
            setNotificationMessage(null)
            setErrorStatus(null)
          }, 5000)
        })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} error={errorStatus} />

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