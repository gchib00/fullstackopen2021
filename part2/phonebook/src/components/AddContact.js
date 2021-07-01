import React, { useEffect, useState } from 'react'
import Notification from './Notification'
import contactList from '../services/contacts'

const AddContact = ({ persons, setPersons, existingNames }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ notification_added, setNotification_added ] = useState(false)
    const [ notification_numChanged, setNotification_numChanged ] = useState(false)
    let [ notification_userDeleted, setNotification_userDeleted ] = useState('')
    let [ notification_inputIssue, setNotification_inputIssue] = useState('')

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
            contactList.updateNumber(object) 
              .then(response => {
                if (persons.length > response.length){ 
                  //if response array is smaller, it means that 'updateNumber()' has caught an error and one item got excluded from persons array
                  setNotification_userDeleted(true)
                }
                setPersons(response) //update the persons array
              })
              .catch(error => console.log(error.response.data)) 
            console.log(notification_userDeleted)
            if (notification_userDeleted === false){
              setNotification_numChanged(true)
              setTimeout(() => {
                setNotification_numChanged(false)
              }, 4000)
            } else {
              setTimeout(() => {
                setNotification_userDeleted(false)
              }, 5000)
            }
          }
        }
      } else {
        const newPerson = {
            name: newName,
            number: newNumber
        }
        contactList.addPerson(newPerson)
          .then(response => {
            setPersons(response)

            setNotification_added(true)
            setTimeout( () => {
              setNotification_added(false)
            }, 4000)
        })
        .catch(error => {
          setNotification_inputIssue(error.response.data.error)
          setTimeout( () => {
            setNotification_inputIssue('')
          }, 10000)
        })
    }
  }


    return(
      <div>
        <form onSubmit={handleSubmit}>
          <div>name: <input value={newName} onChange={handleNameChange} /></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
          <div>
            <button type="submit" onClick={addName}>add</button>
          </div>
        </form>
        <div>
          {notification_added === true ? 
            <Notification content={`${newName} has been added`} />
          :
            null
          }
          {notification_numChanged === true ? 
            <Notification content={`Number has been changed to ${newNumber}`} />
          :
            null
          }
          {notification_userDeleted === true ?
            <Notification content={'Unable to update, contact no longer exists'} />
          :
            null
          }
          {notification_inputIssue !== '' ?
            <Notification content={notification_inputIssue} />
          :
            null
          }
        </div>
      </div>
    )

}

export default AddContact