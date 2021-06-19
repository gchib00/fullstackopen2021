import React, { useState } from 'react'

const Filter = ({ persons, existingNames, setFilteredArray }) => {
    const [ filter, setFilter ] = useState('')

    const filterList = (event) => {
        setFilter(event.target.value) 
        const filteredNames = existingNames.filter(name => name.includes(filter.toLowerCase()))  
        const filteredObjects = persons.filter(person => filteredNames.includes(person.name.toLowerCase()))   
        setFilteredArray(filteredObjects)
        if (event.target.value === "") {    ///need to empty the filteredArray if input is empty, otherwise it retains previous values
          setFilteredArray([])
        }
    
    }



    return(
        <div>
            Filter contact list: <input value={filter} onChange={filterList} /> 
        </div>
    )
}

export default Filter