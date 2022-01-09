import React, { useState, useEffect } from 'react'
import Add from './Components/Add'
import Display from './Components/Display'
import Filter from './Components/Filter'
import Notification from './Components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToDisplay(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicate = persons.filter((per) => per.name === newName)
    if (duplicate.length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicate[0], newNumber)
          .then(response => {
            setPersons(persons.map(per => per.id === duplicate[0].id ? { ...per, number: newNumber } : per))
            setPersonsToDisplay(persons.map(per => per.id === duplicate[0].id ? { ...per, number: newNumber } : per))
            setMessage(`Updated ${newName}'s phone number successfully`)
            setTimeout(() => setMessage(null), 3000)
          })
          .catch(error => {
            setMessage(error.response.data)
            setTimeout(() => setMessage(null), 3000)
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setPersonsToDisplay(persons.concat(newPerson))
          setMessage(`Added ${newName}`)
          setTimeout(() => setMessage(null), 3000)
        })
        .catch(error => {
          setMessage(error.response.data)
          setTimeout(() => setMessage(null), 3000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .del(person.id)

      setPersons(persons.filter(per => per.id !== person.id))
      setPersonsToDisplay(persons.filter(per => per.id !== person.id))
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value.length === 0) {
      setPersonsToDisplay(persons)
    }
    else {
      setPersonsToDisplay(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={[newFilter, handleNewFilter]}/>
      <h2>Add contacts</h2>
      <Add addPerson={addPerson} name={[newName, handleNewName]} number={[newNumber, handleNewNumber]}/>
      <h2>Contacts</h2>
      <Display personsToDisplay={personsToDisplay} deletePerson={deletePerson}/>
    </div>
  )
}

export default App