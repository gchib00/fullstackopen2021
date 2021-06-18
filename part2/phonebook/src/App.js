import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filteredArray, setFilteredArray ] = useState([])

  const existingNames = persons.map(person => person.name)

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = () => {
    if (existingNames.includes(newName)) {
      return alert(`Name '${newName}' already exists!`)
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    return setPersons(persons.concat(newPerson))
  }

  const filterList = (event) => {
    setFilter(event.target.value)
    const filteredNames = existingNames.filter(name => name.includes(filter))
    const filteredObjects = persons.filter(person => filteredNames.includes(person.name))
    setFilteredArray(filteredObjects)
    
    if (event.target.value === "") { ///need to empty the filteredArray if input is empty, otherwise it retains previous values
      setFilteredArray([])
    }

  }
  console.log("filtered Array", filteredArray)
  console.log("normal Array", persons)

  return (
    <div>
      <h2>Phonebook</h2>
        <div>Filter contact list: <input value={filter} onChange={filterList} /> </div>
      <h2>Add New</h2>
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {(filteredArray.length > 0) ? 
          filteredArray.map(person => <li key={person.name}>{person.name} - {person.number}</li>)
        :
          persons.map(person => <li key={person.name}>{person.name} - {person.number}</li>)
        }
      </ul>
    </div>
  )
}

export default App