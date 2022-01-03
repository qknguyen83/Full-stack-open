import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Add from './Components/Add'
import Display from './Components/Display'
import Filter from './Components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsToDisplay(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter((person) => person.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setPersonsToDisplay(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
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
      <Filter filter={[newFilter, handleNewFilter]}/>
      <h2>Add contacts</h2>
      <Add addPerson={addPerson} name={[newName, handleNewName]} number={[newNumber, handleNewNumber]}/>
      <h2>Contacts</h2>
      <Display personsToDisplay={personsToDisplay}/>
    </div>
  )
}

export default App