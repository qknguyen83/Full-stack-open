import React, { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({
        temperature: 0,
        wind: 0,
        icon: null
    })

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => {
                const newWeather = {...weather}
                newWeather.temperature = response.data.main.temp - 273.15
                newWeather.wind = response.data.wind.speed
                newWeather.icon = "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                setWeather(newWeather)
            })
            .catch(error => console.log(error))
    })

    return (
        <div>
            <h1>Weather in {city}</h1>
            <p>Temperature: {weather.temperature} celcius</p>
            <img src={weather.icon} alt="Weather icon"/>
            <p>Wind: {weather.wind} meter/sec</p>
        </div>
    )
}

const Details = ({ country, showDetails }) => {
    if (showDetails === false) {
        return null
    }

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map(language => <li key={language.substring(0,3)}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`}/>
            <Weather city={country.capital}/>
        </div>
    )
}

export default Details