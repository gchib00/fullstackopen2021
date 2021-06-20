import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryInfo from './CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setLoading(false)
      })
  },[])

  const handleChange = (event) => {
    let input = event.target.value

    if (input === "") {
      setFilteredList([])
    } else {
      filterCountries()
    }
    setSearch(input)
  }
  const filterCountries = () => {
    const countryNames = countries.map(country => country.name)
    setFilteredList(countryNames.filter(country => country.includes(search)))
  }


  if (loading) {  //Will make input field invisible until the API is loaded
    return(
      <p>Wait...</p>
    )
  }
  return(
    <div>
      <div>
        Search Country: <input value={search} onChange={handleChange}  />
      </div>
      {(filteredList.length===1) ? //If only 1 country matches the search, show some facts about that country. Else just list the country name
          <CountryInfo country={filteredList[0]} fullList={countries} />
      : 
        <ul> 
          {filteredList.map(country => <li>{country}</li>)}   
        </ul>
      }
    </div> 
  )
}

export default App;
