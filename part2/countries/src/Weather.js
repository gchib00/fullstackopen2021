import { useEffect, useState } from "react"
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
    const [location] = useState(country)
    const [loading, setLoading] = useState(true)

    let [capital, setCapital] = useState('')
    let [temperature, setTemperature] = useState('')
    let [imageIcon, setImageIcon] = useState('')



    useEffect( () => {    
        axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+location)
        .then(response => {
            setCapital(response.data.location.name)
            setTemperature(response.data.current.temperature)
            setImageIcon(response.data.current.weather_icons[0])
            setLoading(false)
        }).catch(error => {
            console.log(error);
        });
    }, [])
    
    

    if (loading === true) {
        return <p>Loading weather data....</p>
    }
    return(  
        <div>
           <h3>Weather in {location}</h3>
            <p>Temperature in {capital}: {temperature}</p>
            <img src={imageIcon} />
        </div>  
    )
}

export default Weather