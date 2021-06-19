import React, { useState } from 'react'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ filteredArray, setFilteredArray ] = useState([])

  const existingNames = persons.map(person => person.name.toLowerCase())  


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} existingNames={existingNames} setFilteredArray={setFilteredArray} />
      <h2>Add New</h2>
      <AddContact persons={persons} setPersons={setPersons} existingNames={existingNames} />
      <h2>Numbers</h2>
      <ContactList persons={persons} filteredArray={filteredArray} />
    </div>
  )
}

export default App