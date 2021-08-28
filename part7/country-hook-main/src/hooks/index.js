import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)
  useEffect(() => {
    if(countryName === ''){
      return null
    }
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
    .then(response => {
      setCountry(response.data[0])
    })
    .catch((err) => {
      console.error(err)
      setCountry('err')
    })
  }, [countryName])

  return{
    country,
    setCountry
  }
}
