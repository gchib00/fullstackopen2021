import React, { useState } from 'react'
import contactList from '../services/contacts'

const AddContact = ({ persons, setPersons, existingNames }) => {
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
        if (persons.some(person => person.number === newNumber)){
          alert(`'${newName}' is already added to the phonebook!`)
        } else {
          if (window.confirm(`${newName} is already added to the phonebook. Would you like to replace the old phone number with the new one?`)) {
            //Find the object that needs to be updated:
            let object = persons.find(person => person.name === newName)
            //Update the object
            object.number = newNumber
            //Pass the updated object to db in order to update the json file
            contactList.updateNumber(object).then(response => {
              setPersons(response)
            })
          }
        }
      } else {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        contactList.addPerson(newPerson).then(response => {
          setPersons(response)
        })
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