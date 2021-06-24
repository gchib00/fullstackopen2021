import React, { useEffect, useState } from 'react'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'

import contacts from './services/contacts'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filteredArray, setFilteredArray ] = useState([])

  const existingNames = persons.map(person => person.name.toLowerCase())  

  useEffect( () => {
    contacts.getAll()
      .then(response => {
        setPersons(response)
      })
  },[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} existingNames={existingNames} setFilteredArray={setFilteredArray} />
      <h2>Add New</h2>
      <AddContact persons={persons} setPersons={setPersons} existingNames={existingNames} />
      <h2>Numbers</h2>
      <ContactList persons={persons} setPersons={setPersons} filteredArray={filteredArray} setFilteredArray={setFilteredArray} />
    </div>
  )
}

export default App