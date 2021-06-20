import React, { useEffect, useState } from 'react'
import AddContact from './components/AddContact'
import Filter from './components/Filter'
import ContactList from './components/ContactList'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filteredArray, setFilteredArray ] = useState([])

  const existingNames = persons.map(person => person.name.toLowerCase())  


  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

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