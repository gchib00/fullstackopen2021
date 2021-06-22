import React, { useEffect, useState } from 'react'

const Filter = ({ persons, existingNames, setFilteredArray }) => {
    const [ filter, setFilter ] = useState('')
    
    const filteredNames = existingNames.filter(name => name.includes(filter.toLowerCase())) 
    const filteredObjects = persons.filter(person => filteredNames.includes(person.name.toLowerCase()))  
    
    const handleChange = (event) => {
        setFilter(event.target.value) 
    } 

    useEffect(() => {
        setFilteredArray(filteredObjects)
        if (filter === "") {    ///need to empty the filteredArray if input is empty, otherwise it retains previous values
            setFilteredArray([])
        }
    }, [filter, setFilteredArray])


    return(
        <div>
            Filter contact list: <input value={filter} onChange={handleChange} /> 
        </div>
    )
}
    

export default Filter