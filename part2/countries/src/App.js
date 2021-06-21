import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryInfo from './CountryInfo'
import Weather from './Weather'

// const api_key = process.env.REACT_APP_API_KEY
// const location = ''

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

  // useEffect( () => {
  //   // const axios = require('axios');

    
  //   axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+location)
  //     .then(response => {
  //       const apiResponse = response.data;
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() =>{
    const filterCountries = () => {
      const countryNames = countries.map(country => country.name)
      setFilteredList(countryNames.filter(country => country.toLowerCase().includes(search.toLowerCase())))
    }
    if (search === "") {
      setFilteredList([])
    } else {
      filterCountries()
    }
  }, [search, countries])

  const showInfo = (country) => {  //removes the list of countries and instead shows info about the selected country
    setFilteredList(filteredList.filter(item => item === country))
  }




  if (loading) {  //Will make input field invisible until the API is loaded
    return(
      <p>Wait...</p>
    )
  }

  return(
    <div>
      <div>
        Search Country: <input onChange={handleChange}  />
      </div>

      {(filteredList.length > 10) ?
        <p>Too many matches, specify another filter</p>
      :
        <div>
        {(filteredList.length===1) ? //If only 1 country matches the search, show some facts about that country. Else just list the country names
          <div>
            <CountryInfo country={filteredList[0]} fullList={countries} />
            <Weather country={filteredList[0]} />
          </div>
        : 
          <ul> 
              {filteredList.map(country => 
                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <li>{country}</li>
                <button onClick={() => showInfo(country)}>show</button>
                <br />
                </div>)
              }
         </ul>
        }
        </div>  
      }
      </div> 
  )
}

export default App;
