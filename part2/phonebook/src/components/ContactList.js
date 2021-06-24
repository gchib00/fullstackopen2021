import contactList from '../services/contacts' 

const ContactList = ({ filteredArray, persons, setPersons, setFilteredArray }) => {

    const deleteContact = (person) => {
        const id = person.id
        const name=person.name
        if (window.confirm(`Delete ${name}?`)) {
            contactList.removePerson(id) //removes contact from db.json
            //update arrays:
            setPersons(persons.filter(person => person.id !== id)) 
            if (filteredArray.map(persons => persons.id === id)) {
                setFilteredArray(filteredArray.filter(person => person.id !== id))
            }
        }
    }


    return(
        <ul>
            {(filteredArray.length > 0) ? 
                filteredArray.map(person => 
                    <div key={person.name} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <li>{person.name} - {person.number}</li>
                        <button onClick={() => deleteContact(person)}>delete</button>
                    </div>)
            :
                persons.map(person => 
                    <div key={person.name} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <li>{person.name} - {person.number}</li>
                        <button onClick={() => deleteContact(person)}>remove</button>
                    </div>)
            }
      </ul>
    )
}

export default ContactList