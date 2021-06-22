import React, { useState } from 'react'
import contactList from '../services/contacts'

const AddContact = ({ persons,setPersons, existingNames }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')


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
      if (existingNames.includes(newName.toLowerCase())) {            
            alert(`Name '${newName}' already exists!`)
        } else {
          const newPerson = {
              name: newName,
              number: newNumber
          }
          contactList.addPerson(newPerson)
          setPersons(persons.concat(newPerson))
        }
    }



    return(
      <form onSubmit={handleSubmit}>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form>
    )

}

export default AddContact