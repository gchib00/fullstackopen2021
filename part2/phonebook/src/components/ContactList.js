
const ContactList = ({ filteredArray, persons }) => {


    return(
        <ul>
            {(filteredArray.length > 0) ? 
                filteredArray.map(person => <li key={person.name}>{person.name} - {person.number}</li>)
            :
                persons.map(person => <li key={person.name}>{person.name} - {person.number}</li>)
            }
      </ul>
    )
}

export default ContactList